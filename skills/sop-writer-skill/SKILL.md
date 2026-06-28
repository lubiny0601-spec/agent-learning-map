---
name: "sop-writer-skill"
description: "Writes beginner-friendly SOP tutorials. Invoke when creating step-by-step AI tool, GitHub, Agent, Skill, API Key, or setup instructions."
---

# SOP Writer Skill

## Purpose

This skill converts a technical operation into a beginner-friendly SOP that users can follow step by step. It is designed for the `Agent 学习地图` project, where the core content is not abstract explanation but practical guidance that helps a new learner complete a real task.

Use this skill when the user asks to write, rewrite, standardize, or improve an SOP for:

- AI Agent usage
- Cursor, Codex, Claude Code, Antigravity, or other AI tools
- GitHub project download, clone, README reading, issue submission, or release usage
- Skill installation or import
- API Key configuration
- MCP setup
- Project running, dependency installation, or basic troubleshooting

## Input Requirements

Ask for missing information only when it materially changes the SOP. If details are unknown, mark them as `[待确认]` instead of inventing them.

Useful inputs include:

- Target task
- Target tool or platform
- User skill level
- Operating system, if relevant
- Required account, API Key, or permissions
- Source link, file, or repository
- Expected final result
- Known errors or risks

## Writing Principles

Write for a user who may not understand GitHub, terminal commands, environment variables, or Agent terminology.

Every SOP must:

- Start with the task goal
- Explain who it is for
- State prerequisites
- Break the process into small steps
- Tell the user what to click, copy, paste, or check
- Include the expected result after each major step
- Include common failure points
- Include safety reminders when keys, scripts, permissions, or local files are involved
- End with a clear success standard

Avoid vague instructions like:

- "配置环境"
- "运行项目"
- "参考 README"
- "安装依赖"
- "自行检查报错"

Replace them with concrete actions, examples, and expected outputs.

## Output Structure

Use this structure unless the user asks for another format:

```markdown
# SOP 标题

## 适合谁

说明适用用户、前置能力和不适用情况。

## 你将完成什么

用 2-3 句话说明最终结果。

## 前置准备

| 项目 | 说明 |
|---|---|
| 账号 | 需要哪些账号 |
| 工具 | 需要安装哪些工具 |
| 文件 | 需要准备哪些文件 |
| 权限 | 是否需要 API Key、仓库权限或本地目录权限 |

## 操作步骤

### 步骤 1：步骤名称

**你要做什么：**
写清楚用户动作。

**为什么要这样做：**
用新手能理解的语言解释原因。

**成功后你应该看到：**
描述页面、文件、命令输出或 Agent 回复。

**如果失败：**
列出最常见原因和处理方式。

## 常见问题

## 安全提醒

## 完成标准
```

## Quality Standards

Before finalizing, check:

- The SOP can be followed without prior expert knowledge.
- Every command has a short explanation.
- Every step has a visible success indicator.
- The user is warned before running unknown scripts or exposing API Keys.
- Any uncertain path, command, or platform-specific behavior is marked `[待确认]`.
- The SOP avoids unsupported claims and does not pretend to have verified a step unless verification was actually performed.

## Example Request

```text
请把“从 GitHub 下载项目并用 Cursor 打开”写成 AI 初学者可以照着做的 SOP。
```

## Example Output Style

The final output should be practical, calm, and specific. Prefer plain Chinese for `Agent 学习地图` content unless the user requests another language.
