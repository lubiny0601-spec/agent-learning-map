---
name: "tool-research-skill"
description: "Researches AI tools and creates beginner learning pages. Invoke when explaining Cursor, Codex, Claude Code, Antigravity, or similar tools."
---

# Tool Research Skill

## Purpose

This skill researches an AI tool and turns the findings into a beginner-friendly learning page for the `Agent 学习地图` project. The goal is to help new users understand what the tool is, whether they should use it, how to start, and what task they can complete first.

Use this skill when the user asks to create or update a learning page for tools such as:

- Cursor
- Codex
- Claude Code
- Antigravity
- ChatGPT, Claude, Gemini, DeepSeek, Kimi, or similar large model tools
- Dify, Coze, n8n, Zapier AI, Manus, or Agent workflow platforms
- Ollama, LM Studio, or local model tools
- MCP clients, plugins, or developer assistants

## Source Rules

For fast-changing product details, use official documentation, product pages, release notes, or repository README files when available. Do not invent:

- Pricing
- Supported models
- Availability
- Platform support
- Exact UI names
- Feature limits
- Roadmap claims

If the information is not confirmed, write `[待确认]`.

## Input Requirements

Useful inputs include:

- Tool name
- Target user level
- Official website or GitHub repository
- Desired output format
- Whether the page is for introduction, comparison, or tutorial
- Whether the tool should be compared with other tools

If the user only gives a tool name, produce a general beginner learning page and mark uncertain details.

## Research Dimensions

Research and explain the tool across these dimensions:

- What the tool is
- What problem it solves
- Who it is suitable for
- Who it is not suitable for
- Core capabilities
- Setup or access method
- Basic usage flow
- Typical beginner tasks
- Common mistakes
- Safety or cost concerns
- Similar tools and differences
- Recommended first task

## Output Structure

Use this structure unless the user asks for another format:

```markdown
# 工具名称：新手学习页

## 一句话解释

用一句新手能理解的话解释这个工具。

## 适合谁

## 不适合谁

## 它能帮你做什么

| 能力 | 新手理解 | 示例任务 |
|---|---|---|

## 使用前准备

| 准备项 | 是否必须 | 说明 |
|---|---|---|

## 第一次使用流程

### 步骤 1：进入或安装工具
### 步骤 2：打开或创建项目
### 步骤 3：给 AI 一个明确任务
### 步骤 4：检查 AI 的结果
### 步骤 5：保存或回退修改

## 推荐新手任务

## 常见错误

| 问题 | 可能原因 | 解决方法 |
|---|---|---|

## 推荐 Prompt

## 和同类工具的区别

## 学完后下一步
```

## Beginner Explanation Rules

Explain technical terms inline when they first appear.

Examples:

- `Repository` should be explained as “GitHub 上存放一个项目的地方”.
- `Clone` should be explained as “把 GitHub 项目复制到你的电脑上”.
- `API Key` should be explained as “一串用于证明你有权限调用服务的密钥”.
- `Dependency` should be explained as “项目运行时需要的工具包”.

## Quality Standards

Before finalizing, check:

- The first paragraph explains why the tool matters to a beginner.
- The page helps a user decide whether to learn the tool.
- The setup flow is concrete enough to follow.
- The first task is small and realistic.
- The content does not exaggerate the tool's abilities.
- Risk reminders are included for code execution, billing, API Keys, and local file changes.
- Fast-changing claims are either sourced or marked `[待确认]`.

## Example Request

```text
请使用 tool-research-skill，为 Cursor 写一篇适合 AI 初学者的工具学习页。
```

## Example Output Style

Write in plain Chinese for `Agent 学习地图` unless the user requests another language. Avoid marketing tone. Focus on clarity, decisions, and first-use success.
