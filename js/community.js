/** Community submissions are metadata-only by default: no user file uploads. */
export const SUBMISSION_REPOSITORY='wcwce00-glitch/PaperAudit'; // Maintainer sets owner/repo after creating a public GitHub repository.
export const APPROVED_CATALOG='data/approved-catalog.json';
const HTTPS=/^https:\/\//i;
export function validateContribution(details){
  const name=String(details.journal||'').trim(),source=String(details.sourceUrl||'').trim();
  const version=String(details.version||'').trim();
  if(!name||name.length>140)throw Error('投稿前必须填写期刊或会议名称（不超过 140 字符）');
  if(!HTTPS.test(source)||source.length>1500)throw Error('公共投稿必须提供 HTTPS 来源链接（最长 1500 字符）');
  let u;try{u=new URL(source);}catch{throw Error('来源网址无效');}
  if(u.username||u.password||u.hostname==='localhost'||u.hostname==='127.0.0.1')throw Error('来源网址不能包含凭据或指向本机');
  if(!['source-link','permission'].includes(details.rights))throw Error('请选择提交方式和转载权限');
  if(details.rights==='permission'&&!String(details.permissionNote||'').trim())throw Error('如希望申请托管文件，请提供明确的授权依据');
  if(!details.confirmed)throw Error('请确认没有提交私人论文或未经授权公开的内容');
  return {schemaVersion:1,status:'pending_review',journal:name,language:details.language==='en'?'en':'zh',
    discipline:['electrical','optics','physics','computer','medicine','general'].includes(details.discipline)?details.discipline:'general',
    version:version.slice(0,80),sourceUrl:u.href,submissionType:details.rights,
    permissionNote:details.rights==='permission'?String(details.permissionNote||'').trim().slice(0,400):'',
    note:String(details.note||'').trim().slice(0,700), submittedAt:new Date().toISOString(),
    reminder:'待维护者核实来源、适用稿件类型和授权情况；此信息未被自动公开收录。'};
}
export function makeIssueBody(payload){
  // All text is intentionally escaped as fenced-free Markdown lines.
  const clean=x=>String(x??'').replace(/[\r\n|]/g,' ').slice(0,800);
  return ['### PaperAudit 社区投稿（待人工审核）','',`期刊或会议：${clean(payload.journal)}`,
    `研究方向：${clean(payload.discipline)}`,`语言：${clean(payload.language)}`,`版本/年份：${clean(payload.version)}`,
    `官方或授权来源：${clean(payload.sourceUrl)}`,`分享方式：${clean(payload.submissionType)}`,
    `授权说明：${clean(payload.permissionNote||'仅分享来源链接，不托管文件')}`,
    `补充说明：${clean(payload.note)}`,'',
    '- [ ] 我已确认这不是私人或未发表论文，也未包含敏感信息',
    '- [ ] 我理解投稿不代表审核通过；期刊要求以官方网站的最新说明为准',
    '', '默认仅推荐官方来源链接；请不要在 Issue 直接上传未经授权的模板副本。'].join('\n');
}
export function makeIssueUrl(payload,repo=SUBMISSION_REPOSITORY){
  if(!/^[\w.-]+\/[\w.-]+$/.test(repo))return null;
  // GitHub Issue Forms have structured fields. Do NOT insert a prefilled classic issue body.
  const params=new URLSearchParams({template:'template-contribution.yml',title:`[Template submission] ${payload.journal}`});
  return `https://github.com/${repo}/issues/new?${params.toString()}`;
}
export async function loadApprovedCatalog(){
  const response=await fetch(APPROVED_CATALOG,{cache:'no-store'});
  if(!response.ok)throw Error('公共模板索引尚未加载');
  const raw=await response.json();
  if(!Array.isArray(raw))throw Error('公共模板索引格式错误');
  return raw.filter(r=>r.status==='approved'&&typeof r.name==='string'&&typeof r.url==='string'&&HTTPS.test(r.url)&&
    ['zh','en'].includes(r.language)&&['electrical','optics','physics','computer','medicine','general'].includes(r.discipline))
    .map(r=>({name:r.name,url:r.url,language:r.language,discipline:r.discipline,
      kind:'社区贡献 · 已人工审核来源',desc:r.desc||'用户贡献的来源信息；请核对最新官方投稿指南。',
      provenance:'community',reviewedAt:r.reviewedAt||'',source:r.source||''}));
}
