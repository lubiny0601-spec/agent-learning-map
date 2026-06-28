---
name: "github-project-reader-skill"
description: "Explains GitHub repositories for beginners. Invoke when analyzing README, repo structure, releases, issues, setup, or project suitability."
---

# GitHub Project Reader Skill

## Purpose

This skill reads and explains a GitHub repository in beginner-friendly language for the `Agent 学习地图` project. It helps users understand what a repository does, whether it is safe and suitable for them, how to read the README, how to install or run it, and how to ask an Agent for help.

Use this skill when the user provides or asks about:

- A GitHub repository link
- A README file
- A project folder copied from GitHub
- A GitHub Release page
- An Issue or error report
- A Skill repository
- An open-source AI tool or Agent project

## Safety First

Never tell a beginner to run unknown scripts blindly.

Always look for and explain risks such as:

- API Key exposure
- Unknown install scripts
- Commands that delete, overwrite, or upload files
- Requests for unnecessary permissions
- Unclear license
- Abandoned repository
- Missing setup instructions
- Hardcoded secrets

If safety cannot be determined, write `[风险待确认]`.

## Input Requirements

Useful inputs include:

- GitHub URL
- Local repository folder
- README content
- User's operating system
- User's goal
- Error message
- Whether the user wants to learn, run, modify, or install the project

If repository content is unavailable, ask the user to provide the link or README content.

## Analysis Dimensions

Analyze the repository across these dimensions:

- Project purpose
- Target users
- Main features
- Repository freshness
- README completeness
- Install and run steps
- Required environment
- Project structure
- Beginner difficulty
- Risks and warnings
- License and usage constraints
- Recommended Agent Prompt
- Next learning step

## Output Structure

Use this structure unless the user asks for another format:

```markdown
# GitHub 项目新手解读

## 这个项目是做什么的

用 2-4 句话说明项目用途。

## 适合谁

## 不适合谁

## 新手难度

| 维度 | 判断 | 说明 |
|---|---|---|
| README 清晰度 | 高/中/低/待确认 | 说明原因 |
| 安装难度 | 高/中/低/待确认 | 说明原因 |
| 运行风险 | 高/中/低/待确认 | 说明原因 |
| 维护状态 | 活跃/一般/不活跃/待确认 | 说明原因 |

## README 应该重点看哪里

## 如何下载这个项目

解释 Download ZIP、Clone、Release 的适用情况。

## 如何运行或使用

不要跳步。说明环境、依赖、命令和成功标志。

## 项目目录怎么理解

| 目录或文件 | 新手解释 | 是否需要先看 |
|---|---|---|

## 需要注意的风险

## 可以问 Agent 的 Prompt

## 下一步建议
```

## Repository Structure Explanation

When explaining files and folders, use beginner language.

Examples:

- `README.md`: “项目说明书，通常告诉你怎么安装、怎么运行、这个项目能做什么。”
- `package.json`: “Node.js 项目的配置文件，里面通常写着依赖和可运行命令。”
- `requirements.txt`: “Python 项目需要安装的工具包列表。”
- `src/`: “主要源代码目录，很多功能代码会放在这里。”
- `.env.example`: “环境变量示例文件，通常用来告诉你需要配置哪些密钥或参数。”

## Agent Prompt Templates

When useful, provide prompts like:

```text
请你阅读这个项目的 README 和目录结构，用新手能理解的语言告诉我：
1. 这个项目是做什么的
2. 我需要先看哪些文件
3. 如何安装和运行
4. 有哪些风险需要注意
5. 如果我要修改一个小功能，应该从哪里开始
```

```text
请你先不要修改代码。请根据当前报错信息判断：
1. 报错含义
2. 最可能原因
3. 需要检查的文件
4. 建议修改步骤
5. 修改前需要我确认的问题
```

## Quality Standards

Before finalizing, check:

- The user can understand what the repository does without reading the full README.
- Setup steps are not oversimplified.
- Risk reminders are specific, not generic.
- Commands are explained before use.
- Any unverified claims are marked `[待确认]`.
- The final recommendation is practical: learn, run, avoid, or ask for more information.

## Example Request

```text
请使用 github-project-reader-skill，分析这个 GitHub 仓库是否适合 AI 初学者学习。
```

## Example Output Style

Use plain Chinese for `Agent 学习地图` content unless the user requests another language. The tone should be patient, concrete, and protective of beginner users.
