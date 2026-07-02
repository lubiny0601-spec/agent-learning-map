---
name: "mcp-helper-skill"
description: "撰写分步安装和配置 MCP 服务器的指南。在帮助用户在 Cursor、Claude Desktop 或 Antigravity 中配置 Git、文件系统、搜索、数据库或其他 MCP 服务器时调用此 Skill。"
---

# MCP 配置助手 (MCP Helper Skill)

## 目标

此 Skill 用于引导 Agent 撰写适合初学者的 MCP（Model Context Protocol，模型上下文协议）服务器安装和配置说明，供 `Agent 学习地图` 项目使用。MCP 是一个强大的通信标准，它允许 AI Agent 连接到外部数据源和工具（如本地工作区目录、GitHub 仓库、数据库或网络搜索接口）。然而，对于初学者来说，编辑 JSON 配置文件、设置可执行文件路径往往非常容易出错。

在用户请求编写、更新或排查以下领域的 MCP 指南时调用此 Skill：
- 配置 MCP 客户端（如 Cursor、Claude Desktop、Antigravity 等）
- 安装具体的 MCP 服务器（如 `@modelcontextprotocol/server-github`、`@modelcontextprotocol/server-postgres` 或本地自定义脚本）
- 编辑客户端的 JSON 配置文件（如 `mcpTools.json` 或 `claude_desktop_config.json`）
- 解决常见的 MCP 连接故障（如找不到 node 命令、缺失环境变量、网络代理拦截等）

## 输入要求

在撰写指南之前，尽可能收集以下信息。如果某些细节未知，请使用 `[待确认]` 标注或默认使用最常用的平台配置：
- **目标客户端**：Cursor、Claude Desktop 或 Antigravity（默认值：Cursor）
- **目标服务器**：MCP 服务器的名称、官方来源链接或 npm 包名称
- **操作系统**：Windows、macOS 或 Linux（默认值：Windows）
- **必需的敏感密钥**：该服务器所需的 API Key、数据库密码或 GitHub 个人访问令牌（PAT）
- **命令行运行时**：Node.js、Python、Docker 或独立二进制文件

## 撰写原则

撰写时需假定读者是完全不懂 JSON 语法、从未用过终端控制台、也不知道配置文件藏在哪里的初学者。

每一篇 MCP 配置指南必须：
- 解释**为什么**用户需要这个特定的服务器（例如：“这将允许 Cursor 直接读取你本地文件夹中的文件”）。
- 根据不同的客户端和操作系统，给出**精确的配置文件绝对路径**。
- 提供**完整的、可一键复制的 JSON 配置块**，而不是零碎的片段，并高亮标出他们需要替换自己密钥的占位符。
- 解释 JSON 的基本格式规则（例如：“确保使用双引号，且每项配置之间要用逗号隔开，最后一项后不要加逗号”）。
- 特别强调 Windows 环境下的**可执行文件绝对路径规则**（例如：如果简单的 `node` 报错找不到，应改为使用双反斜杠的绝对路径如 `C:\\Program Files\\nodejs\\node.exe`）。
- 包含关于 API Key 密钥妥善保存的安全防线提醒。

## 输出结构

除非用户另有要求，否则请使用以下结构：

```markdown
# MCP 配置指南：[MCP 服务器名称]

## 适合谁

说明前置条件（如：已安装 Node.js、拥有 GitHub 账号等）。

## 这个服务器能帮你做什么

用大白话解释该 MCP 服务器赋予 Agent 的新能力。

## 前置准备

| 项目 | 说明 |
|---|---|
| 客户端 | 哪个 IDE 或 Chat 工具 |
| 依赖环境 | 是否需要 Node.js、Python 或 Docker |
| 权限/密钥 | 需要申请什么密钥（如 GitHub Token），并提醒不要公开 |

## 配置步骤

### 步骤 1：获取或生成密钥 (如适用)

引导用户到官方页面获取 API Key 或 Token，说明需要勾选哪些最小权限。

### 步骤 2：定位配置文件

列出不同操作系统下的路径：
* **Windows**: `[填具体路径]`
* **macOS/Linux**: `[填具体路径]`

### 步骤 3：修改配置文件内容

提供完整的 JSON 配置示例，例如：

```json
{
  "mcpServers": {
    "my-server-name": {
      "command": "node",
      "args": [
        "path/to/server"
      ],
      "env": {
        "API_KEY": "YOUR_API_KEY_HERE"
      }
    }
  }
}
```

**💡 避坑提醒**：
1. 替换 `YOUR_API_KEY_HERE` 为你真实的密钥。
2. Windows 用户注意：路径中的斜杠需要双写，如 `C:\\Users\\...`。

### 步骤 4：重启客户端并测试

说明如何重启客户端，以及如何验证 Agent 是否已经识别到了新工具。

## 常见错误与排错

| 报错现象 | 可能原因 | 解决方法 |
|---|---|---|
| 工具栏显示灰色或未连接 | 1. 配置文件 JSON 格式错误<br>2. 找不到 `node` 命令 | 1. 将 JSON 贴到在线格式化网站检查逗号<br>2. 将 `"command": "node"` 改为 node 的绝对路径 |

## 安全提醒

* **绝对安全规则**：不要将写有真实 API Key 的配置文件上传到 GitHub。
* 如果要在多台电脑同步配置，建议使用 `.env` 文件配合系统环境变量，而不是硬编码在 JSON 中。
```

## 质量标准

在输出前，对照检查：
- 提供的 JSON 模板在语法上是合法的。
- Windows 路径双反斜杠格式（`\\`）已经解释清楚。
- 绝不引导用户下载未经官方验证的第三方脚本。
- 确保输出使用简体中文，排版清晰易读。
