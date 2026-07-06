# Agent 学习地图 - 静态网站托管部署指南

「Agent 学习地图」是一个完全由 HTML、CSS 和 JavaScript 组成的纯静态前端项目。它不需要复杂的服务器端环境，可以直接托管在各大免费的静态网页托管平台。

本指南提供了在 **GitHub Pages**、**Vercel**、**Netlify** 和 **Cloudflare Pages** 这四大主流托管平台上的详细部署步骤与避坑指南。

---

## 目录
1. [GitHub Pages 部署指南](#1-github-pages-部署指南)
2. [Vercel 部署指南](#2-vercel-部署指南)
3. [Netlify 部署指南](#3-netlify-部署指南)
4. [Cloudflare Pages 部署指南](#4-cloudflare-pages-部署指南)

---

## 1. GitHub Pages 部署指南

### 适用场景
代码已托管在 GitHub，希望直接使用 GitHub 提供的免费二级域名和自动化构建流水线。

### 🛠️ 操作步骤
1. **进入设置**：登录 GitHub，进入您的 `agent-learning-map` 仓库，点击页面右上角的 **`Settings`**（设置）按钮。
2. **选择 Pages 服务**：在左侧导航栏中，找到 **`Code and automation`** 区域，点击 **`Pages`**。
3. **配置构建分支**：
   * 在 **`Build and deployment`** 选项下的 **`Source`** 下拉菜单中，选择 **`Deploy from a branch`**。
   * 在其下方的 **`Branch`** 选择框中，将分支从 `None` 改为您的主分支（通常为 **`main`** 或 **`master`**）。
   * 目录选择框保持默认的 **`/(root)`** 目录。
   * 点击 **`Save`** 保存配置。
4. **监控构建状态**：
   * 保存后，点击仓库顶部的 **`Actions`** 选项卡。
   * 您会看到一个名为 `pages-build-deployment` 的工作流已自动触发。
   * 等待 1-2 分钟，当工作流图标变成绿色对勾（Success）时，即表示编译和部署完成。
5. **获取在线链接**：
   * 再次回到 **`Settings` -> `Pages`** 页面。
   * 页面顶部会显示您的专属在线网址，格式通常为：`https://<您的GitHub用户名>.github.io/<仓库名称>/`。

### 🚨 避坑要点
* **`.nojekyll` 编译冲突**：GitHub Pages 默认会运行 Jekyll 静态网站生成器。由于项目中存在以 `---` 开头的 Markdown 文件或包含 `{{ ... }}` 的代码片段，这会导致 Jekyll 编译失败（出现 404 错误）。**解决方案**：在仓库根目录添加一个名为 `.nojekyll` 的空文件以彻底关闭 Jekyll 编译。
* **资源路径问题**：GitHub Pages 默认的 URL 是带有项目名称的二级目录（例如 `/agent-learning-map/`）。请在引用资源（CSS、JS、图片）时，使用相对路径（如 `./style.css` 或 `style.css`），避免使用绝对根路径（如 `/style.css`），否则会导致资源加载失败。

---

## 2. Vercel 部署指南

### 适用场景
希望在国内拥有更快的访问速度、极其丝滑的自动化部署体验，以及支持分支预览等高级功能。

### 🛠️ 操作步骤
1. **账号登录**：访问 [Vercel 官网 (vercel.com)](https://vercel.com/)，点击登录并选择使用 **GitHub 账号** 进行绑定授权。
2. **导入项目**：
   * 进入 Vercel 控制台（Dashboard），点击右上角的 **`Add New...`**，选择 **`Project`**。
   * 在 Git 仓库导入列表中找到您的 `agent-learning-map` 仓库，点击 **`Import`**。
3. **配置部署参数**：
   * **Framework Preset**（框架预设）：由于项目是纯静态的，请选择 **`Other`**。
   * **Root Directory**（根目录）：保持默认的 **`./`** 不变。
   * **Build and Output Settings**（构建和输出设置）：不需要进行任何修改，保持所有选项关闭即可。
4. **触发部署**：
   * 点击页面下方的 **`Deploy`** 按钮。
   * Vercel 会在 10-20 秒内自动拉取代码并部署完毕。
   * 部署完成后，系统会生成一个免费的 `*.vercel.app` 域名供您在线访问。
5. **绑定自定义域名**（可选）：
   * 在项目详情页点击 **`Settings` -> `Domains`**。
   * 输入您的独立域名，并按照指示在您的 DNS 服务商处添加对应的 A 记录或 CNAME 记录即可。

### 🚨 避坑要点
* Vercel 对纯静态 HTML 文件的托管非常友好。每次您向 GitHub 的 `main` 分支提交（git push）代码时，Vercel 都会自动触发重新部署，无需手动干预。

---

## 3. Netlify 部署指南

### 适用场景
简单易用，国内访问速度稳定，提供强大的重定向配置（Redirects）和表单收集等开箱即用功能。

### 🛠️ 操作步骤
1. **登录注册**：访问 [Netlify 官网 (netlify.com)](https://www.netlify.com/)，选择用 **GitHub** 账户快捷注册/登录。
2. **新建站点**：
   * 在控制台主页点击 **`Add new site`**，选择 **`Import an existing project`**。
   * 在底部的 Git 提供商中选择 **`GitHub`**，授权并找到 `agent-learning-map` 仓库。
3. **填写构建配置**：
   * **Branch to deploy**：选择部署主分支 **`main`**。
   * **Base directory**：留空。
   * **Build command**（构建命令）：留空。
   * **Publish directory**（发布目录）：输入 **`.`**（代表将根目录下的 HTML 部署出去）。
4. **一键部署**：
   * 点击 **`Deploy site`** 按钮。
   * Netlify 会自动初始化构建。部署完成后，您会在项目头部看到一个类似 `https://xxxx.netlify.app` 的随机网址，点击即可访问。
5. **修改域名**（可选）：
   * 在 Site settings -> Domain management 下可以修改 Netlify 提供的随机子域名，或者绑定您自有的独立域名。

---

## 4. Cloudflare Pages 部署指南

### 适用场景
依托 Cloudflare 全球边缘网络，国内访问极其迅速且稳定，免费额度几乎无上限。

### 🛠️ 操作步骤
1. **登录控制台**：登录 [Cloudflare 控制台](https://dash.cloudflare.com/)，在左侧导航栏中点击 **`Workers & Pages`**。
2. **创建 Pages 应用**：
   * 点击 **`Create application`** 按钮，切换到 **`Pages`** 标签页。
   * 点击 **`Connect to Git`** 按钮。
3. **关联仓库**：
   * 授权 Cloudflare 访问您的 GitHub，并从列表中选择 `agent-learning-map` 仓库，点击 **`Begin setup`**。
4. **设置构建选项**：
   * **Project name**（项目名称）：保持默认或自定义。
   * **Production branch**（生产分支）：选择 **`main`**。
   * **Framework preset**（框架预设）：选择 **`None`**（纯静态 HTML 模式）。
   * **Build command**（构建命令）：留空。
   * **Build output directory**（输出目录）：留空（表示部署根目录）。
5. **部署发布**：
   * 点击 **`Save and Deploy`**。
   * Cloudflare 将在 30 秒内完成全球节点的同步与分发，并为您分配一个 `*.pages.dev` 域名。

### 🚨 避坑要点
* Cloudflare Pages 提供了极快的全球部署和自带的免费 SSL 证书，是静态项目部署的最佳选择之一。如果国内访问遇到卡顿，可考虑绑定已接入 Cloudflare CDN 的自定义域名。
