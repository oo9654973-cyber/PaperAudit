/** Local-only, opt-in template collection. IndexedDB stores bytes on the user's own device. */
const DB_NAME='paperaudit-local-templates';
const DB_VERSION=1;
const STORE='templates';
export const LOCAL_LIMIT=30*1024*1024;
function openDatabase(){
  return new Promise((resolve,reject)=>{
    if(!('indexedDB' in window)){reject(Error('此浏览器未提供 IndexedDB 本地存储'));return;}
    const req=indexedDB.open(DB_NAME,DB_VERSION);
    req.onupgradeneeded=()=>{const db=req.result;if(!db.objectStoreNames.contains(STORE))db.createObjectStore(STORE,{keyPath:'id'});};
    req.onsuccess=()=>resolve(req.result);
    req.onerror=()=>reject(req.error||Error('无法打开本地模板库'));
  });
}
function transact(db,mode,callback){
  return new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE,mode),store=tx.objectStore(STORE);
    const request=callback(store);
    request.onsuccess=()=>resolve(request.result);
    request.onerror=()=>reject(request.error||Error('本地数据库操作失败'));
    tx.onerror=()=>reject(tx.error||Error('本地事务失败'));
  });
}
export async function digestFile(file){
  if(!crypto?.subtle)throw Error('文件去重要求 HTTPS 或 localhost 等安全环境');
  const hash=await crypto.subtle.digest('SHA-256',await file.arrayBuffer());
  return Array.from(new Uint8Array(hash)).map(x=>x.toString(16).padStart(2,'0')).join('');
}
export function checkLocalTemplate(file){
  if(!file||!/^.+\.(docx|dotx|txt|md)$/i.test(file.name))throw Error('只允许保存 DOCX、DOTX、TXT 或 MD 模板');
  if(file.size>LOCAL_LIMIT)throw Error('单个模板不得超过 30 MB');
  if(file.size===0)throw Error('不能保存空文件');
}
export async function saveLocalTemplate(file,metadata){
  checkLocalTemplate(file);
  const journal=String(metadata.journal||'').trim();
  if(!journal||journal.length>140)throw Error('请填写期刊或会议名称（不超过 140 字符）');
  const hash=await digestFile(file),db=await openDatabase();
  try{
    const record={id:hash,filename:file.name,journal,discipline:String(metadata.discipline||'general'),
      language:String(metadata.language||'zh'),version:String(metadata.version||'').slice(0,80),
      sourceUrl:String(metadata.sourceUrl||'').slice(0,1500),savedAt:new Date().toISOString(),
      byteSize:file.size,mimeType:file.type||'application/octet-stream',blob:file};
    // The content hash is the unique key. Updating the same binary keeps one entry.
    await transact(db,'readwrite',s=>s.put(record));
    return record;
  }finally{db.close();}
}
export async function listLocalTemplates(){
  const db=await openDatabase();
  try{const records=await transact(db,'readonly',s=>s.getAll());
    return records.sort((a,b)=>b.savedAt.localeCompare(a.savedAt));
  }finally{db.close();}
}
export async function getLocalTemplate(id){
  const db=await openDatabase();
  try{return await transact(db,'readonly',s=>s.get(id));}finally{db.close();}
}
export async function removeLocalTemplate(id){
  const db=await openDatabase();
  try{await transact(db,'readwrite',s=>s.delete(id));}finally{db.close();}
}
