# PaperAudit v0.4.1 首次发布指南（只用浏览器也可以）

**先决条件：** 请确认拥有 `wcwce00-glitch` GitHub 账户控制权，且尚未有同名项目。项目将公开，先检查源码和开源协议。

## 步骤 1 — 创建公开仓库
1. 登录 https://github.com/，在右上角 `+` 选择 **New repository**。
2. Owner 选择 `wcwce00-glitch`；Repository name 输入 `PaperAudit`。
3. 选择 **Public**，不勾选 "Add README" 和其他自动初始化选项（源码已包含）。
4. 点击 **Create repository**。若同名仓库已存在，不要覆盖，先检查。

## 步骤 2 — 上传项目源码
1. **解压源码 ZIP**，打开解压后的 PaperAudit 项目文件夹。
2. 在 GitHub 仓库首页点 **uploading an existing file** 或 `Add file` → `Upload files`。
3. 把项目文件夹**内部**的源码文件和子目录拖入上传区域，必须保留 `index.html`、`js/`、`assets/`、`vendor/`、`data/`、`.github/`、`tests/`、`scripts/` 的层级关系。不要把整个 ZIP 当普通文件上传。也不要意外多套一层项目目录。
4. 浏览待提交文件清单，确认没有私密论文、令牌，点击 **Commit changes**。如果浏览器拖放没保留隐藏 `.github`，使用 VS Code Git/已授权 Codex 推送或网页逐个创建工作流文件。

## 步骤 3 — 开启 GitHub Pages
1. 在仓库进入 **Settings** → 左侧 **Pages**。
2. 在 **Build and deployment** → **Source** 选择 **GitHub Actions**。
3. 打开仓库 **Actions** 页，查看 `PaperAudit tests` 和 `Publish verified PaperAudit Web` 记录。
4. **只有 verify 全部通过后**，`deploy` 才会发布；若红叉请打开失败日志，修复后再提交。切勿绕过测试。

## 步骤 4 — 核实站点
预计网址形式：`https://wcwce00-glitch.github.io/PaperAudit/`（**仅在 Pages 成功发布后才会有效**）。
使用示例 DOCX 验证 4 条警告、上传模板进行对照、检查个人模板保存/刷新/删除、导出 HTML 与 JSON、点击社区投稿检查 Issue Form。

**隐私与授权：** 不得在公开 Issues 中提交未发表论文或无权转载的模板。链接收录仍需人工审核。网页扫描没有提供学术准确性与全部期刊要求认证。
