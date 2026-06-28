# Agent 学习地图

面向 AI 初学者的 Agent 工具学习地图，包含工具教程、GitHub SOP、Prompt 模板、可点击首页原型和可复用 Agent Skills。

## 项目简介

`Agent 学习地图` 是一个帮助 AI 初学者学习 Agent 工具和工作流的轻量级内容产品。它不直接替代 Cursor、Codex、Claude Code、Antigravity 等工具，而是帮助用户理解这些工具怎么用、什么时候用、如何从 GitHub 获取项目、如何让 Agent 解读项目，以及如何安全地完成第一个任务。

当前仓库是 MVP 初版，重点验证三件事：

- 新手是否能看懂 AI 工具教程。
- 新手是否能按 SOP 完成 GitHub 项目下载和 Cursor 打开流程。
- Agent Skills 是否能稳定生成统一风格的教程、SOP 和项目解读内容。

## 在线原型

当前原型是一个静态 HTML 页面，可以直接用浏览器打开：

```text
prototype/index.html
```

原型包含：

- 首页 Hero
- 新手路径
- 工具库卡片
- SOP 流程卡片
- Prompt 模板区
- 内容详情页切换

## 仓库结构

```text
agent-learning-map/
├── README.md
├── .gitignore
├── prototype/
│   ├── index.html
│   └── _shared/
│       └── fonts/
├── content/
│   ├── tool-pages/
│   │   └── cursor-beginner-guide.md
│   ├── sops/
│   │   └── github-download-open-with-cursor-sop.md
│   └── github-guides/
│       └── github-repo-beginner-analysis-template.md
├── skills/
│   ├── sop-writer-skill/
│   │   └── SKILL.md
│   ├── tool-research-skill/
│   │   └── SKILL.md
│   └── github-project-reader-skill/
│       └── SKILL.md
└── docs/
    └── skill-examples/
```

## 内容样稿

当前已包含 3 篇内容：

| 内容 | 文件位置 | 用途 |
|---|---|---|
| Cursor 新手学习页 | `content/tool-pages/cursor-beginner-guide.md` | 工具学习页样稿 |
| GitHub 下载项目 SOP | `content/sops/github-download-open-with-cursor-sop.md` | 操作流程样稿 |
| GitHub 仓库新手解读模板 | `content/github-guides/github-repo-beginner-analysis-template.md` | 项目解读模板 |

## Agent Skills

当前已包含 3 个 Skill：

| Skill | 文件位置 | 作用 |
|---|---|---|
| `sop-writer-skill` | `skills/sop-writer-skill/SKILL.md` | 把复杂操作写成新手能照着做的 SOP |
| `tool-research-skill` | `skills/tool-research-skill/SKILL.md` | 研究 AI 工具并生成新手学习页 |
| `github-project-reader-skill` | `skills/github-project-reader-skill/SKILL.md` | 解读 GitHub 仓库并判断是否适合新手 |

这些 Skill 本质上是给 Agent 使用的能力说明文件。它们不是传统软件代码，但可以被支持 Skill 的 Agent 读取，用来指导 Agent 按统一标准生成内容。

## 为什么 GitHub 可以放 Skill

GitHub 不只能放已经完成的软件，也可以放文档、教程、模板、配置文件和 Skill。

Skill 通常就是一个目录和一个 `SKILL.md` 文件，例如：

```text
skills/
└── sop-writer-skill/
    └── SKILL.md
```

`SKILL.md` 会告诉 Agent：

- 这个 Skill 是做什么的
- 什么时候应该调用
- 输入需要什么
- 输出格式是什么
- 内容质量标准是什么

所以 Skill 可以像普通项目文件一样上传到 GitHub，方便版本管理、分享和复用。

## 推荐使用方式

### 查看首页原型

直接打开：

```text
prototype/index.html
```

### 查看内容样稿

打开 `content/` 目录下的 Markdown 文件。

### 使用 Skills

如果你的 Agent 支持 Skills，可以将某个 Skill 目录复制到对应的 Skills 目录中。不同 Agent 的安装位置可能不同，请以对应产品文档为准。

示例结构：

```text
.trae/
└── skills/
    └── sop-writer-skill/
        └── SKILL.md
```

## 下一步计划

建议下一批内容先补齐：

- Codex 新手学习页
- Claude Code 新手学习页
- Antigravity 新手学习页
- Skill 导入 Agent SOP
- API Key 配置 SOP
- 让 Agent 读懂项目结构 SOP

建议下一批 Skill 增加：

- `prompt-template-skill`
- `beginner-explainer-skill`
- `risk-safety-review-skill`
- `ai-news-digest-skill`

## 仓库描述建议

GitHub 仓库名称：

```text
agent-learning-map
```

英文描述：

```text
A beginner-friendly learning map for AI Agent tools, GitHub workflows, SOP tutorials, and reusable Agent skills.
```

中文描述：

```text
面向 AI 初学者的 Agent 工具学习地图，包含工具教程、GitHub SOP、Prompt 模板和可复用 Agent Skills。
```

## 许可证

当前尚未指定开源许可证。正式公开前建议选择一种许可证，例如：

- `MIT License`：适合希望别人自由使用和修改。
- `CC BY 4.0`：适合以教程、文档内容为主，要求署名。
- 暂不添加许可证：默认保留全部权利，不建议他人直接复用。

如果你还不确定，MVP 阶段可以先不添加 `LICENSE` 文件。
