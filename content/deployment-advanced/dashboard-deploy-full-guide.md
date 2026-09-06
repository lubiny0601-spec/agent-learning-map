# Dashboard 部署实战：从本地 HTML 到公开 URL

## 一句话解释

把一个只存在于自己电脑里的 HTML 看板，真正交付成其他人可以打开并使用的 Web Application——完整经历 CHECK → DEPLOY → VERIFY → PEER TEST 四步。

## 适合谁

* 已经有了一个本地可运行的 Dashboard（单文件 HTML），想把它发布到互联网上让同事使用的人。
* 想理解"一个 URL 背后到底发生了什么"的 AI 工具使用者。
* 需要选择部署平台但不确定哪个适合自己的初学者。

---

## Part 1：为什么需要部署

### 本地 vs 在线的区别

| 阶段 | 本地（当前） | 在线（部署后） |
|---|---|---|
| 打开方式 | 自己的电脑打开 HTML | 任何人通过 URL 打开 |
| 用户操作 | 打开本地文件 → 上传 Excel/CSV → 使用 | 打开 URL → 上传 Excel/CSV → 使用 |
| 关键区别 | 页面只在我的电脑里，别人看不到 | 页面变成公开地址，别人也能访问 |

部署的本质就是：**把一个只在自己电脑打开的页面，变成所有人都可访问的公开地址。**

---

## Part 2：理解 URL 背后的世界

当你在浏览器输入一个网址并打开页面时，背后发生了这些事：

### 一次请求的完整旅程

1. **浏览器输入地址** → 用户在浏览器中输入 URL
2. **DNS 定位** → DNS 把域名翻译成服务器地址（相当于查通讯录找到对方的门牌号）
3. **Hosting 找到页面** → 服务器找到你部署的 HTML 文件并返回内容
4. **Server 处理** → 服务器把网页内容、图片和按钮等资源传输给浏览器
5. **浏览器渲染** → 浏览器接收数据并显示给用户

### 六个关键概念

| 概念 | 业务类比 | 作用 |
|---|---|---|
| **Domain（域名）** | 你开的店名 | 地址中好记的部分，如 `mydashboard.com` |
| **DNS** | 通讯录 | 把域名翻译成服务器 IP 地址 |
| **Hosting（托管）** | 店铺的仓库 | 存放网页文件（HTML/CSS/JS）的地方 |
| **Server** | 柜台与店员 | 当有人来访问时，把文件传给浏览器 |
| **HTTPS** | 安保标签 | 保证浏览器和站点之间的数据传输是加密安全的 |
| **CDN** | 连锁分店 | 把网页分发到离用户更近的节点，加速访问 |

> 你不需要记住这些技术名词。部署平台会自动帮你处理 DNS、Hosting、HTTPS 和 CDN——你只需要给它一个 HTML 文件，它给你一个 URL。

---

## Part 3：谁来做这些事

### 方式 A：自己准备一切（自力更生）

* 自己控制一切，但也需要自己负责
* 需要自己：准备 Dashboard、确保地址和申请安全证书、日常维护

### 方式 B：让平台帮忙（推荐 Demo 和小范围使用）

* 适合 Demo 和小范围使用
* 你只需要：准备 Dashboard、选择平台
* 平台直接提供：安全证书、HTTPS、CDN、可分享地址、托管
* 你负责更新：修改页面后重新部署即可

---

## Part 4：平台怎么选

首先看两件事：**能不能稳定打开、地址能不能长期使用。**

| 平台 | 特点 | 大陆访问 | Agent 支持 | 适合场景 |
|---|---|---|---|---|
| **Vercel** | 性能强，现代 Web 应用 | 需 VPN | Agent 协议 + Skills/MCP/CLI | 前沿 Web 应用 |
| **Netlify** | 简单易用，适合静态站 | 偶有不稳定 | Agent 协议 + Skills/MCP/CLI | 静态网站 |
| **Cloudflare Workers/Pages** | 全球平台，性能好 | 访问稳定 | Agent 协议 + Skills/MCP/CLI | 需要全球加速 |
| **EdgeOne Makers** | Web/Agent 平台 | 预置地址只用 3 小时 | Agent 协议 + MCP/CLI | 临时预览 |
| **CloudBase** | 腾讯云，大陆友好 | 不需 VPN，地址可长期使用 | Agent 协议 + Skills/MCP/CLI | 课堂/Demo/小范围实战 |

### 为什么课程选择 CloudBase

* 只需要一步：部署一个网页，就能获得可以稳定打开的地址
* 大陆登录友好，地址可长期使用，配置简单
* 支持 AI Agent 工具链（MCP + Skills）

> 对于课堂和实际使用中的 Demo 部署，CloudBase 是平衡大陆访问性和易用性的最佳选择。Vercel、Netlify 和 Cloudflare 在大陆访问时网络可能不稳定或需要 VPN。

---

## Part 5：部署前要想清楚的问题

不要一连接平台就马上部署。先问自己两个问题：

### 问题 1：需要后台吗

| 场景 | 需要后台？ | 适合的部署方式 |
|---|---|---|
| 1A：只展示页面，数据和交互在本地完成 | 不需要 | 只要把网页变成可打开的地址 |
| 1B：需要后端帮助（登录、存数据等） | 需要 | 网页 + 后台 + 数据库，平台同时托管 |

大多数课堂 Dashboard 是单文件 HTML + 本地 Excel 读取，属于 1A 场景，只需静态托管。

### 问题 2：会不会长期给真实用户使用

* 如果只是 Demo 和课堂演示：静态托管足够
* 如果是真实用户、业务系统、正式产品：需要考虑安全权限、隐私合规和正式运维

---

## Part 6：60 分钟实操流程

### Step 1：准备部署环境（10 min）

1. **检查 Node.js**：CloudBase 的 AI 工具链需要 Node.js ≥ 18.15.0
   * 在 Agent 中输入：`请检查当前电脑是否已经安装 Node.js，并告诉我版本。现在只检查，不要修改项目文件。`
   * 如果没有安装，到 https://nodejs.org/ 下载 LTS 版本
2. **登录并开通 CloudBase**
   * 打开 https://tcb.cloud.tencent.com/
   * 使用腾讯云账号登录（没有就注册）
   * 完成服务角色授权
   * 开通可用环境

### Step 2：连接 CloudBase（10 min）

**MCP**：让 Agent 获得"操作 CloudBase"的工具连接
**Skills**：给 Agent 一套 CloudBase 的专业操作说明和最佳实践

#### Codex 配置方式
1. 点击右上角 `+`，选择"添加插件市场"
2. Source: `TencentCloudBase/CloudBase-MCP`，Git Ref: `main`
3. 安装 `cloudbase` 插件
4. 新开一个 Codex Thread
5. 验证：`检查 CloudBase MCP和Skills是否可用。`

#### Antigravity 配置方式
参考 CloudBase 官方 Antigravity 配置指南：
https://docs.cloudbase.net/ai/cloudbase-ai-toolkit/ide-setup/antigravity

按照官方"手动配置"方式安装 CloudBase MCP 和 Skills。

### Step 3：Deployment Check（10 min）

发布前至少要确认：
- 没有 API Key / Token / Password
- 没有真实敏感业务数据写在代码里
- 页面不依赖只能在自己电脑运行的 localhost 服务
- 没有明显影响中国大陆访问的外部资源
- 当前 HTML 文件本身可以正常打开
- Excel/CSV 仍然是在浏览器本地读取

提示词：
```text
请检查当前 Dashboard 是否适合公开静态部署。
重点检查：API Key / 敏感数据 / 本地服务 / 外部资源 / Excel 本地读取。
如果当前是可独立运行的单文件 HTML，但文件名不是 index.html，
请告诉我需要将它复制为 index.html，不要因此判定为不适合部署。
先不要部署。只告诉我：可以部署，或暂不建议部署 + 原因。
```

### Step 4：Deploy（15 min）

提示词：
```text
请使用已经连接的 CloudBase，把当前 index.html 作为静态网站部署。
保持现有页面和功能不变，不新增 Backend 或数据库。
完成后给我公开访问 URL，并验证首页可以打开。
```

部署阶段不要让 Agent：重做 Dashboard、修改 UI、换框架、增加数据库或 Backend、改写 Excel 处理逻辑。

完成标准：你拿到一个公开访问的 URL。

### Step 5：Verify 自己验证（10 min）

**不要只看 Agent 返回 "Deployment Successful"，必须自己真实使用一次。**

1. 复制 URL，打开新的浏览器窗口或无痕窗口
2. 上传课堂测试 Excel/CSV
3. 至少检查：页面正常加载、布局完整、Excel 可选择、数据可读取、KPI 刷新、图表显示、筛选可用、无明显报错

### Step 6：Peer Test 让别人使用（5 min）

两两配对：
- 学员 A：把 URL 发给学员 B
- 学员 B：只用 URL + 自己的浏览器 + 课堂 Excel，打开并确认 Dashboard 正常显示
- 完成后交换 A/B

---

## 完成标准

- [ ] CloudBase 环境已经开通
- [ ] Agent 可以使用 CloudBase
- [ ] Deployment Check 显示可以部署
- [ ] 已获得公开 Dashboard URL
- [ ] 自己通过 URL 验证成功
- [ ] Excel/CSV 上传后看板正常刷新
- [ ] Peer Test 通过

---

## 今天你真正学会了什么

不是在学习某一个 CloudBase 按钮，而是完整经历：

**CHECK**（部署前检查）→ **DEPLOY**（发布到云端）→ **VERIFY**（自己真实验证）→ **PEER TEST**（让别人真的使用）

也就是说：**把一个只存在于自己电脑里的 HTML，真正交付成其他人可以使用的 Web Application。**

---

## 以后页面修改了怎么办

页面更新后，把最新版本重新部署即可。成熟的开发流程还可以进一步自动化这个过程。

---

## 官方参考

* CloudBase：https://tcb.cloud.tencent.com/
* CloudBase AI 原生开发：https://docs.cloudbase.net/ai/cloudbase-ai-toolkit/
* Codex 配置指南：https://docs.cloudbase.net/ai/cloudbase-ai-toolkit/ide-setup/codex
* Antigravity 配置指南：https://docs.cloudbase.net/ai/cloudbase-ai-toolkit/ide-setup/antigravity
* Node.js：https://nodejs.org/
