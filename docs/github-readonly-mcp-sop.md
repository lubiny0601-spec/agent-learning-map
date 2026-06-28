# SOP：试用 GitHub 只读 MCP

## 适合谁

这篇 SOP 适合想理解 MCP 怎么帮助 Agent 读取 GitHub 信息的 AI 初学者。你不需要一开始掌握 MCP 的完整原理，只需要先知道：MCP 可以让 Agent 连接外部工具，而 GitHub MCP 可以让 Agent 更方便地读取仓库、README、Issue、PR 等信息。

当前阶段建议只使用“只读权限”，不要一开始给 Agent 修改仓库、创建 Issue、创建 PR 或删除文件的权限。

## 你将完成什么

你将理解 GitHub MCP 的作用、接入前需要准备什么、如何用只读方式测试，以及如何判断它是否真正生效。

当前环境暂未连接 GitHub MCP，因此这篇 SOP 是接入前的准备和测试说明。等你在 TRAE 或其他 MCP Host 中添加 GitHub MCP 后，可以按这里的测试 Prompt 验证。

## 前置准备

| 项目 | 说明 |
|---|---|
| GitHub 账号 | 需要有一个 GitHub 账号 |
| 测试仓库 | 建议先使用公开仓库或你自己的测试仓库 |
| MCP Host | 需要一个支持 MCP 的工具，例如 TRAE、Claude Code、Cursor、VS Code 等，具体支持方式以对应产品为准 |
| GitHub Token | 如果使用本地 MCP Server，通常需要 GitHub Personal Access Token |
| 权限原则 | 优先只读，权限越小越好 |

## GitHub MCP 是什么

GitHub MCP Server 的作用是把 AI 工具直接连接到 GitHub 平台，让 Agent 可以读取仓库和代码文件、管理 Issue 和 PR、分析代码、自动化工作流等。对 `Agent 学习地图` 项目来说，第一阶段只需要读取仓库、README 和目录结构即可。

## 为什么先用只读

只读 MCP 的目标是：

```text
让 Agent 看 GitHub 信息，但不让它改 GitHub 内容。
```

这适合新手理解 MCP，因为风险低。你可以先让 Agent 做这些事：

- 读取 README
- 解释仓库目录
- 判断项目是否适合新手
- 总结 Issue 中的常见问题
- 查看 Release 说明

暂时不要做这些事：

- 自动创建 Issue
- 自动提交 PR
- 自动修改仓库文件
- 自动关闭 Issue
- 自动发布 Release

## 操作步骤

### 步骤 1：确认当前是否已经连接 GitHub MCP

**你要做什么：**

在当前 Agent 环境里查看 MCP 列表，确认是否存在类似：

```text
github
github-mcp-server
```

**为什么要这样做：**

只有 MCP Server 已经接入，Agent 才能通过 MCP 读取 GitHub 信息。

**成功后你应该看到：**

MCP 列表中出现 GitHub 相关服务，并且能看到它提供的工具。

**如果失败：**

说明当前还没有接入 GitHub MCP。此时 Agent 仍然可以通过普通网页读取公开 GitHub 页面，但这不等于 MCP 已接入。

### 步骤 2：选择 GitHub MCP 方式

**你要做什么：**

GitHub 官方 MCP Server 通常有两类使用方式：

| 方式 | 新手理解 | 适合情况 |
|---|---|---|
| Remote GitHub MCP Server | 由 GitHub 托管的远程 MCP 服务 | MCP Host 支持远程 MCP 时更方便 |
| Local GitHub MCP Server | 在本机或容器中运行 GitHub MCP Server | 需要 Docker 或本地运行环境 |

**为什么要这样做：**

不同 Agent 工具对 MCP 的配置方式不一样。你需要先确认当前工具支持远程 MCP，还是只能配置本地 MCP。

**成功后你应该知道：**

你准备使用远程方式还是本地方式。

**如果失败：**

先不要配置 Token。先查看当前工具的 MCP 设置页面或官方文档。

### 步骤 3：准备低权限 GitHub Token

**你要做什么：**

如果当前 MCP 接入方式需要 GitHub Personal Access Token，建议创建一个权限尽量小的 Token。

新手原则：

```text
只给需要的权限，不要勾选全部权限。
```

**为什么要这样做：**

Token 可以理解成“给工具访问你 GitHub 账号的钥匙”。权限越大，风险越高。

**成功后你应该看到：**

你获得一串 Token，但不要把它粘贴到公开文档、GitHub 仓库、截图或聊天记录里。

**如果失败：**

如果你不知道该选哪些权限，先停下来，不要创建高权限 Token。可以先只使用公开仓库测试，或查对应 MCP Host 的说明。

### 步骤 4：把 Token 放到安全位置

**你要做什么：**

不要把 Token 写进公开仓库。推荐放到环境变量或本地配置中。

常见变量名可能是：

```text
GITHUB_PERSONAL_ACCESS_TOKEN
```

或者：

```text
GITHUB_PAT
```

具体名称以你的 MCP 配置要求为准。

**为什么要这样做：**

GitHub MCP Server 文档建议安全处理 PAT，避免提交到版本控制，并使用最小权限、不同项目使用不同 Token、定期轮换。

**成功后你应该看到：**

Token 不出现在 `README.md`、代码文件或公开配置文件中。

**如果失败：**

如果 Token 已经上传到 GitHub，应该立刻删除并重新生成新的 Token。

### 步骤 5：接入 GitHub MCP

**你要做什么：**

在支持 MCP 的工具里添加 GitHub MCP Server。不同工具配置方式不同，可能需要填写：

```text
server name
command 或 url
environment variables
token
tool permissions
```

**为什么要这样做：**

这一步是让 Agent 知道“可以通过 GitHub MCP 读取 GitHub 信息”。

**成功后你应该看到：**

MCP 工具列表里出现 GitHub 相关工具。

**如果失败：**

检查：

- MCP Host 是否支持 GitHub MCP。
- Token 是否正确。
- Docker 是否已运行。
- 网络是否能访问 GitHub。
- 当前工具是否需要重启。

### 步骤 6：用公开仓库做只读测试

**你要做什么：**

先不要测试私有仓库。选择一个公开仓库，然后问：

```text
请通过 GitHub MCP 读取这个仓库的 README，并告诉我：
1. 这个项目是做什么的
2. README 是否适合新手
3. 项目目录里有哪些关键文件
4. 是否有运行风险
5. 是否建议 AI 初学者学习

仓库链接：
[粘贴 GitHub URL]
```

**为什么要这样做：**

公开仓库风险更低，适合确认 MCP 是否能正常读取信息。

**成功后你应该看到：**

Agent 能基于仓库 README 和目录结构回答，而不是只根据仓库名猜测。

**如果失败：**

如果 Agent 说无法访问仓库，说明 MCP 可能未连接成功、Token 权限不足，或当前工具没有调用 MCP。

### 步骤 7：和普通网页读取做对比

**你要做什么：**

对同一个仓库做两次分析：

```text
不用 MCP，直接根据网页公开信息分析这个仓库。
```

再问：

```text
请通过 GitHub MCP 分析这个仓库。
```

**为什么要这样做：**

这样你能直观看到 MCP 的价值：它不是普通网页搜索，而是让 Agent 通过标准接口读取结构化的 GitHub 信息。

**成功后你应该理解：**

MCP 更适合做稳定、可重复、结构化的仓库读取。

## 常见问题

### MCP 和 Skill 有什么区别

Skill 是“告诉 Agent 怎么做”；MCP 是“让 Agent 能连接外部工具和数据”。

例如：

```text
github-project-reader-skill
```

负责规定“怎么写 GitHub 仓库新手解读”。

```text
GitHub MCP
```

负责让 Agent 读取 GitHub 仓库信息。

两者可以配合使用。

### GitHub MCP 是不是一定要 Token

很多本地 MCP Server 场景需要 Token。远程 OAuth 场景可能通过授权登录完成。具体取决于你的 MCP Host 和接入方式。

### 只读是不是绝对安全

不是绝对安全，但比写入权限低风险。只读也可能读取到私有仓库信息，所以仍然要注意授权范围。

### 能不能直接给写入权限

新手阶段不建议。等你理解权限、Token、回滚和审计后，再考虑写入类操作。

## 安全提醒

- 不要把 GitHub Token 上传到 GitHub。
- 不要在截图里暴露 Token。
- 不要给 Agent 全账号写入权限。
- 不要一开始测试私有仓库。
- 不要让 Agent 自动创建 PR、删除分支或修改文件。
- 不确定权限时，先只用公开仓库测试。
- Token 泄露后要立刻撤销并重新生成。

## 完成标准

完成这篇 SOP 后，你应该能说清楚：

- GitHub MCP 是让 Agent 连接 GitHub 的方式。
- Skill 是工作方法，MCP 是外部数据和工具连接。
- 只读 MCP 适合新手先试。
- Token 要用最小权限，不能上传到 GitHub。
- 接入成功后，可以让 Agent 读取 README、目录、Issue、Release 等信息。
- 对 `Agent 学习地图` 项目来说，GitHub MCP 最适合配合 `github-project-reader-skill` 使用。
