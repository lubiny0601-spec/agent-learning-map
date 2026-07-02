---
name: "mcp-helper-skill"
description: "Writes step-by-step guides for installing and configuring MCP servers. Invoke when helping users set up Git, Filesystem, Search, Database, or other MCP servers in Cursor, Claude Desktop, or Antigravity."
---

# MCP Helper Skill

## Purpose

This skill guides an Agent in writing beginner-friendly Model Context Protocol (MCP) server installation and configuration instructions for the `Agent 学习地图` project. MCP is a powerful standard that allows Agents to connect to external data sources and tools (like local directories, GitHub, databases, or search APIs). However, editing JSON configuration files and setting up execution paths is often confusing for beginners.

Use this skill when the user asks to write, update, or troubleshoot instructions for:

- Setting up an MCP client (Cursor, Claude Desktop, Antigravity)
- Installing specific MCP servers (e.g., `@modelcontextprotocol/server-github`, `@modelcontextprotocol/server-postgres`, local scripts)
- Editing client configuration JSON files (`mcpTools.json` or `claude_desktop_config.json`)
- Resolving common MCP connection failures (e.g., node command not found, environment variable missing, network proxy block)

## Input Requirements

Gather the following information before writing the guide. If unknown, use `[待确认]` or default to the most popular platform:

- **Target Client**: Cursor, Claude Desktop, or Antigravity (Default: Cursor)
- **Target Server**: Name of the MCP server and its official source link or npm package
- **Operating System**: Windows, macOS, or Linux (Default: Windows)
- **Required Secrets**: API Keys, database passwords, or personal access tokens needed by the server
- **Command runtime**: Node.js, Python, Docker, or standalone binary

## Writing Principles

Write for a beginner who does not know what JSON syntax is, has never used a terminal, and doesn't know where config files are hidden.

Every MCP guide must:

- Explain **why** the user needs this specific server (e.g., "This lets Cursor read files directly from your workspace").
- Show the **exact file path** where the config JSON is located, depending on the client and OS.
- Provide a **full copy-pasteable JSON block** rather than just a snippet, highlighting where they need to replace placeholder values.
- Explain JSON formatting basics (e.g., "Ensure double quotes are used and commas are placed correctly").
- Highlight the **Absolute Path** rule for executables (e.g., using `C:\\Program Files\\nodejs\\node.exe` instead of just `node` on Windows if path resolution fails).
- Include safety precautions regarding API key storage.

## Output Structure

Use this structure unless requested otherwise:

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

\```json
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
\```

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

## Quality Standards

Before finalizing:

- Confirm the JSON template is syntax-valid.
- Confirm Windows path formatting (double backslashes `\\`) is clearly explained.
- Ensure the user is not instructed to download unverified third-party scripts.
- Ensure the output uses plain Chinese and friendly formatting.
