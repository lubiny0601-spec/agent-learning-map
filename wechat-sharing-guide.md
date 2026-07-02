# Agent 学习地图 - 微信分享与部署诊断指南

此文件记录了关于「Agent 学习地图」H5 在线网页的部署排卡流程、微信卡片配置原理以及常见 404 故障诊断的完整上下文。

---

## 📱 1. 微信分享卡片配置说明

为使用户在微信中分享该链接时，能够自动生成带 Title、Description 和 Icon 缩略图的**精美分享卡片**，我们已在代码中嵌入了以下底层机制：

### 🏷️ 卡片内容配置
* **卡片标题 (og:title)**：`Agent 学习地图`
* **卡片描述 (og:description)**：`面向 AI 初学者的 Agent 工具学习地图，包含工具教程、GitHub SOP、Prompt 模板和可复用 Agent Skills。`
* **分享缩略图 (og:image)**：
  配置地址指向：`https://lubiny0601-spec.github.io/agent-learning-map/prototype/_shared/share-cover.jpg`
  *该缩略图使用的是高拟真的网页端交互界面原型效果图（16:9比例），视觉效果十分高端。*

### 🛠️ 微信内分享卡片的唤起步骤
微信具有独特的安全分享防刷机制。**如果直接复制网址在聊天框粘贴发送，只会呈现一行纯文本链接**。要呈现卡片，请按照以下标准流程操作：

1. **微信内打开网页**：通过微信对话框点击网址，使用微信内置浏览器打开学习地图。
2. **唤起微信菜单**：点击右上角的 **`···` (三个点)** 按钮。
3. **选择发送渠道**：
   * **分享给好友**：点击 **「发送给朋友」**，即可在聊天框内生成精致的图文卡片。
   * **分享到朋友圈**：点击 **「分享到朋友圈」**，同样会生成带标题和小图标的卡片形式。

---

## 🔍 2. 网站 404 故障诊断与解决方案

在 GitHub Pages 部署静态网页时，如果用户打开一直显示 404，通常属于以下两个深层原因之一：

### 🚨 故障原因 A：Jekyll 编译器冲突导致编译失败
* **故障机制**：GitHub Pages 默认使用 Jekyll 静态站生成器来编译整个仓库。如果仓库中有大量以 `---` 开头的文件（如我们的 Markdown 教程 frontmatter）或包含双大括号 `{{ ... }}`（Liquid 模板引擎的关键字）的文本，Jekyll 在编译时就会抛出致命错误，直接导致生成好的 `index.html` 无法发布，进而引发全站 404。
* **解决方案**：在仓库根目录下新建一个名为 **`.nojekyll`** 的空文件（或写入简单注释）。该文件是 GitHub Pages 的官方白名单指令，会通知服务器**完全跳过 Jekyll 编译流程**，直接将文件按原样作为静态网站输出，从而根治 404 问题。

### 🚨 故障原因 B：GitHub Pages CDN 后台部署死锁 (Stuck Deployment)
* **故障机制**：当之前的某次编译失败时，GitHub Pages CDN 节点有时会卡在“进行中”状态（In Progress）。此时如果再次提交代码或修复文件，新构建的部署任务（Deploy job）在向服务器请求发布时，会报 `Deployment request failed due to in progress deployment. Please cancel first...` 的 API 错误并遭到拒绝。
* **解决方案**：
  使用 GitHub CLI 工具（`gh`）清理云端卡死的队列：
  1. 通过 API 获取当前所有未结清的部署任务 ID：
     ```bash
     gh api repos/{owner}/{repo}/deployments
     ```
  2. 针对卡死的 `deployment_id` 逐个发送 `DELETE` 申请进行物理清除：
     ```bash
     gh api repos/{owner}/{repo}/deployments/{deployment_id} --method DELETE
     ```
  3. 清除所有历史死锁后，重新向 Pages 触发一版干净的手动构建即可：
     ```bash
     gh api repos/{owner}/{repo}/pages/builds --method POST
     ```

---

## 🛠️ 本次所修改的文件列表 (File Diffs)
1. **[.nojekyll](file:///d:/antigravity%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%88%B6%E4%BD%9C/agent-learning-map/.nojekyll) [NEW]**：置于根目录，彻底关闭 Jekyll 限制。
2. **[prototype/_shared/share-cover.jpg](file:///d:/antigravity%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%88%B6%E4%BD%9C/agent-learning-map/prototype/_shared/share-cover.jpg) [NEW]**：微信分享卡片高拟真预览图片。
3. **[index.html](file:///d:/antigravity%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%88%B6%E4%BD%9C/agent-learning-map/index.html) [MODIFY]**：注入 `og:title` / `og:description` / `og:image` 标签，并在 `<body>` 起始处添加隐藏首图用于微信嗅探。
4. **[prototype/index.html](file:///d:/antigravity%E7%AC%AC%E4%B8%80%E6%AC%A1%E5%88%B6%E4%BD%9C/agent-learning-map/prototype/index.html) [MODIFY]**：同步注入 H5 页的分享元数据及隐藏嗅探图片。
