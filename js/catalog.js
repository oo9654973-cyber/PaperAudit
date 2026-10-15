/** Manually verified official author-resource ENTRY pages, not direct downloads or journal rankings. */
export const journalResources = [
 {name:'电力自动化设备',language:'zh',discipline:'electrical',kind:'期刊官网 · 下载中心',url:'https://www.epae.cn/',desc:'官网设有论文模板、投稿须知、图表要求等下载栏目。'},
 {name:'电力系统自动化',language:'zh',discipline:'electrical',kind:'期刊官方页面',url:'https://dlxt1.publish.founderss.cn/zh/home/',desc:'从期刊页面进入作者资源；具体稿件规范请以正式投稿入口为准。'},
 {name:'物理学报',language:'zh',discipline:'physics',kind:'期刊官网 · 作者中心',url:'https://wulixb.iphy.ac.cn/',desc:'作者中心有投稿须知与相关资料下载。'},
 {name:'光子学报',language:'zh',discipline:'optics',kind:'官方作者中心 · 论文模板',url:'https://work.photon.ac.cn/journalx_gzxb/authorLogOn.action',desc:'作者中心提供“投稿须知”和“论文模板”入口。'},
 {name:'中华医学期刊网',language:'zh',discipline:'medicine',kind:'期刊官方投稿导航',url:'https://medjournals.cn/journalContribute/list.do',desc:'按医学专科查找具体刊物；再进入该刊正式作者须知。'},
 {name:'IEEE Journals',language:'en',discipline:'electrical',kind:'IEEE 官方期刊模板选择器',url:'https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/authoring-tools-and-templates/tools-for-ieee-authors/ieee-article-templates/',desc:'按目标 IEEE 期刊选择 Word / LaTeX 模板；不能用一个通用 IEEE 模板代表所有刊物。'},
 {name:'IEEE Author Center',language:'en',discipline:'computer',kind:'IEEE 官方期刊模板与工具',url:'https://journals.ieeeauthorcenter.ieee.org/create-your-ieee-journal-article/authoring-tools-and-templates/',desc:'电气、电子、计算机相关 IEEE 期刊的通用作者工具和模板入口。'},
 {name:'Springer Nature',language:'en',discipline:'physics',kind:'出版社官方模板指引',url:'https://support.nature.com/en/support/solutions/articles/6000081241-templates-and-style-files-for-journal-article-preparation',desc:'并非所有期刊都有模板；优先打开目标刊物的 Submission guidelines。'},
 {name:'Optica Publishing Group（Optics Express / Optica 等）',language:'en',discipline:'optics',kind:'官方 Word / LaTeX 模板中心',url:'https://opg.optica.org/content/author/portal/item/templates-default',desc:'期刊群官方模板入口；部分模板仅为建议排版，投稿前核实具体期刊要求。'},
 {name:'Light: Science & Applications',language:'en',discipline:'optics',kind:'期刊官方作者指南',url:'https://www.nature.com/lsa/authors-and-referees/authors',desc:'官方说明提供作者指南入口；2026 年投稿指南不强制初投稿件采用统一版式。'},
 {name:'Nature Communications',language:'en',discipline:'general',kind:'期刊官方投稿指南',url:'https://www.nature.com/ncomms/submit/how-to-submit',desc:'官方明确说明 Word 文稿不使用固定期刊模板；应按稿件类型遵守提交要求。'},
 {name:'Springer Nature',language:'en',discipline:'optics',kind:'出版社官方投稿格式说明',url:'https://www.springernature.com/gp/authors/campaigns/writing-a-manuscript/formatting',desc:'提醒核对目标刊物的篇幅、结构、图件和声明要求。'},
 {name:'Elsevier',language:'en',discipline:'general',kind:'出版社官方模板规则说明',url:'https://service.elsevier.com/app/answers/detail/a_id/5955/supporthub/publishing/~/is-there-a-template-available-for-my-manuscript-file%3F/',desc:'不少期刊并不强制首投使用模板；具体要求由该刊 Guide for Authors 决定。'},
 {name:'Elsevier LaTeX',language:'en',discipline:'computer',kind:'官方 LaTeX 模板说明',url:'https://www.elsevier.com/en-gb/researcher/author/policies-and-guidelines/latex-instructions',desc:'提供 elsarticle 模板说明；引用风格需按具体期刊判断。'},
 {name:'Springer Nature',language:'en',discipline:'medicine',kind:'作者指南查找指引',url:'https://support.nature.com/en/support/solutions/articles/6000081241-templates-and-style-files-for-journal-article-preparation',desc:'通过各期刊 Submission guidelines 核实是否有模板及医学声明要求。'},
];
let approvedCommunityResources=[];
export function setApprovedResources(entries){approvedCommunityResources=Array.isArray(entries)?entries:[];}
export function selectResources(discipline='all',language='all'){
  return [...journalResources,...approvedCommunityResources].filter(j=>(language==='all'||j.language===language)&&(discipline==='all'||j.discipline===discipline||j.discipline==='general'&&discipline!=='all'));
}
