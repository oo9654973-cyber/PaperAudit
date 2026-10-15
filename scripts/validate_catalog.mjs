/** Guardrails for pull requests editing the reviewed public template-link catalog. */
import fs from 'node:fs';
const file='data/approved-catalog.json';
const input=JSON.parse(fs.readFileSync(file,'utf8'));
if(!Array.isArray(input))throw Error('Catalog must be a JSON array');
const known=new Set(),fields=['name','language','discipline','url','source','reviewedAt'];
for(const [i,entry] of input.entries()){
  for(const key of fields)if(typeof entry[key]!=='string'||!entry[key].trim())throw Error(`Entry ${i}: missing ${key}`);
  if(entry.status!=='approved')throw Error(`Entry ${i}: only manually approved entries may be published`);
  if(!['zh','en'].includes(entry.language))throw Error(`Entry ${i}: invalid language`);
  if(!['electrical','optics','physics','computer','medicine','general'].includes(entry.discipline))throw Error(`Entry ${i}: invalid discipline`);
  const url=new URL(entry.url);
  if(url.protocol!=='https:'||url.username||url.password||['localhost','127.0.0.1'].includes(url.hostname))throw Error(`Entry ${i}: unsafe URL`);
  if(!/^\d{4}-\d{2}-\d{2}$/.test(entry.reviewedAt))throw Error(`Entry ${i}: reviewedAt should be ISO date`);
  const key=entry.url.toLowerCase();if(known.has(key))throw Error(`Entry ${i}: repeated URL`);known.add(key);
}
console.log(`Verified community index schema: ${input.length} approved entries. Human link/permission review is still required.`);
