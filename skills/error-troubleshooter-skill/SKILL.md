---
name: "error-troubleshooter-skill"
description: "Analyzes terminal or application errors for beginners and provides step-by-step resolution. Invoke when a user reports build, install, environment, or execution errors."
---

# Error Troubleshooter Skill

## Purpose

This skill guides an Agent in analyzing terminal or application errors for beginners in the `Agent 学习地图` project. It aims to demystify cryptic error logs and provide safe, step-by-step instructions to resolve them. 

Beginners often panic when they see red text in a terminal. They might copy-paste random suggestions from the web, which can lead to package version conflicts, broken system environments, or data loss. This skill focuses on delivering a calm, structured, and protective debugging experience.

Use this skill when the user:
- Pastes terminal output containing errors or warnings (e.g., `npm ERR!`, `ModuleNotFoundError`, `command not found`).
- Reports that their page or application is blank, frozen, or behaving unexpectedly.
- Asks for help resolving dependency installation, version, or build issues.

## Input Requirements

To provide an accurate diagnostic report, try to obtain:
- **Exact Error Message**: The raw terminal text or log files (if too long, the last 20 lines).
- **Environment**: OS (Windows, macOS, Linux), Node.js/Python version.
- **Previous Action**: What command or action triggered the error (e.g., "I ran `npm run dev` after cloning").
- **Configuration Files**: Relevant files like `package.json`, `requirements.txt`, or `.env`.

If details are missing, proceed with diagnosing the most probable cause based on the error signature and use placeholders `[待确认]`.

## Analysis Principles

1. **Categorize the Error**:
   - **Environment/Path Errors** (e.g., `'git' is not recognized`): The tool is not installed or not in the system PATH.
   - **Dependency Errors** (e.g., `Cannot find module`): Required packages are missing.
   - **Syntax/Code Errors** (e.g., `Unexpected token`): Typos or broken code syntax.
   - **Network/API Errors** (e.g., `ETIMEDOUT`): Proxy, VPN, or server outage.
   - **Permission Errors** (e.g., `EACCES` or `Access Denied`): Running commands without administrative privileges, or file lock.
2. **Translate Jargon to Real-World Analogies**:
   - Explain *Module not found* as: "就像食谱里写着需要胡椒粉，但你的调料架上还没有买胡椒粉。"
   - Explain *Command not found* as: "你的电脑不知道这个工具的名字。这通常是因为你还没买（安装）它，或者它放在抽屉里电脑找不到（没加到环境变量）。"
3. **Enforce Safety Guards**:
   - **Never** instruct a user to delete files or run `rm -rf` without a backup warning.
   - **Never** suggest `--force` or `sudo` flags unless absolutely necessary, and explain the side effects.
   - Suggest temporary local fixes over global system changes.

## Output Structure

Use this structure unless the user requests another format:

```markdown
# 报错排查报告：[简明报错名称]

## 🔴 报错大白话解释

用极其通俗的语言解释这个报错在说什么，避免直接堆砌技术术语。如果可能，用生活中的类比。

## 🔍 可能的原因

按可能性从高到低列出 2-3 个原因。

| 序号 | 可能性原因 | 新手理解 |
|---|---|---|
| 1 | [原因 1] | [通俗解释] |
| 2 | [原因 2] | [通俗解释] |

## 💡 安全备份提醒 (如有必要)

如果接下来的步骤涉及修改配置文件、安装新依赖或删除代码，在此处提醒用户如何进行备份（如：复制一份文件重命名为 `.bak`）。

## 🛠️ 解决步骤

步骤必须小且具体。每个命令前说明“为什么要执行它”，并列出“执行后应该看到什么”。

### 步骤 1：第一阶段操作

**你要做什么：**
提供具体的终端命令或操作。

**为什么这样做：**
通俗解释。

**成功后的控制台输出：**
展示成功的迹象。

### 步骤 2：第二阶段操作

...

## 常见排错失败情况

如果在上述步骤中又遇到了新的报错，应该怎么办：
- *如果显示 A 报错*：[说明解决方法]
- *如果显示 B 报错*：[说明解决方法]

## 验证是否修复成功

如何确认问题已经完全解决（如：重新运行 `npm run dev`，打开浏览器看到页面显示正常）。
```

## Quality Standards

Before finalizing, check:
- Is the tone encouraging and calm?
- Are the terminal commands safe to copy-paste?
- Did you mention operating-system-specific variations if they exist (e.g., Powershell vs Bash)?
- Are placeholders like directories written as generic templates (e.g., `[你的项目路径]`) rather than hardcoded usernames?
