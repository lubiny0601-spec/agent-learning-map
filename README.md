# Agent 学习地图

面向 AI 初学者的 Agent 工具学习地图，包含工具教程、GitHub SOP、Prompt 模板、可点击首页原型和可复用 Agent Skills。

## 项目简介

`Agent 学习地图` 是一个帮助 AI 初学者学习 Agent 工具和工作流的轻量级内容产品。它不直接替代 Cursor、Codex、Claude Code、Antigravity 等工具，而是帮助用户理解这些工具怎么用、什么时候用、如何从 GitHub 获取项目、如何让 Agent 解读项目，以及如何安全地完成第一个任务。

当前仓库是 MVP 初版，重点验证三件事：

- 新手是否能看懂 AI 工具教程。
- 新手是否能按 SOP 完成 GitHub 项目下载和 Cursor 打开流程。
- Agent Skills 是否能稳定生成统一风格的教程、SOP 和项目解读内容。

## 在线体验与原型

本项目已通过 GitHub Pages 开启在线体验。您可以在电脑或手机浏览器中直接点击打开交互式原型：

👉 **[在线直达链接](https://lubiny0601-spec.github.io/agent-learning-map/)**

若需本地查看，也可以直接用浏览器打开项目中的：`prototype/index.html`。

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
│   ├── content-data.js
│   └── _shared/
│       └── fonts/
├── content/
│   ├── beginner-guides/
│   │   ├── ai-glossary.md
│   │   ├── gemini-sop.md
│   │   ├── notebooklm-sop.md
│   │   └── ai-prd-guide.md
│   ├── ai-applications/
│   │   ├── ai-poster-guide.md
│   │   ├── ai-ppt-guide.md
│   │   ├── ai-video-guide.md
│   │   ├── ai-dashboard-guide.md
│   │   ├── ai-research-guide.md
│   │   └── ai-market-analysis-guide.md
│   ├── tool-pages/
│   │   ├── cursor-beginner-guide.md
│   │   ├── claude-code-guide.md
│   │   ├── trae-guide.md
│   │   ├── codex-guide.md
│   │   ├── workbuddy-guide.md
│   │   ├── antigravity-guide.md
│   │   └── lovable-guide.md
│   ├── sops/
│   │   └── github-download-open-with-cursor-sop.md
│   ├── github-guides/
│   │   └── github-repo-beginner-analysis-template.md
│   ├── uiux/
│   │   ├── prd-to-ui-guide.md
│   │   ├── call-insight-stitch-workshop.md
│   │   ├── uiux-tools-map.md
│   │   └── call-insight-stitch-brief.md
│   ├── data-analytics/
│   │   ├── data-analytics-skill-workflow.md
│   │   └── non-codex-analytics-prompt.md
│   ├── deployment/
│   │   ├── static-hosting-guide.md
│   │   └── wechat-sharing-guide.md
│   ├── deployment-advanced/
│   │   └── dashboard-deploy-full-guide.md
│   ├── geo-mastery/
│   │   ├── geo-concept-intro.md
│   │   ├── geo-tool-requirements.md
│   │   └── geo-development-guide.md
│   ├── skill-mastery/
│   │   ├── skill-theory-and-agent-classification.md
│   │   ├── skill-acquisition-guide.md
│   │   ├── meeting-minutes-skill-case.md
│   │   └── cc-switch-deepseek-guide.md
│   ├── video-generation/
│   │   ├── ai-video-workflow.md
│   │   └── video-case-sifuno.md
│   ├── mcp/
│   │   └── mcp-guide.md
│   └── security/
│       └── data-security-and-compliance.md
├── skills/
│   ├── sop-writer-skill/
│   │   └── SKILL.md
│   ├── tool-research-skill/
│   │   └── SKILL.md
│   ├── github-project-reader-skill/
│   │   └── SKILL.md
│   ├── mcp-helper-skill/
│   │   └── SKILL.md
│   ├── prompt-optimizer-skill/
│   │   └── SKILL.md
│   ├── error-troubleshooter-skill/
│   │   └── SKILL.md
│   ├── risk-safety-review-skill/
│   │   └── SKILL.md
│   └── prompt-template-skill/
│       └── SKILL.md
└── docs/
    └── skill-examples/
```

## 内容清单

当前已包含 40 篇内容，按学习主题分为八类。

### 入门与基础

| 内容 | 文件位置 | 用途 |
|---|---|---|
| AI 核心名词大白话手册（15 个词条） | `content/beginner-guides/ai-glossary.md` | 涵盖 LLM、Prompt、Agent、MCP、Tool Use、推理模型、Vibe Coding 等核心概念 |
| Gemini 医药实战 SOP | `content/beginner-guides/gemini-sop.md` | 网页端 AI 实战使用指南 |
| NotebookLM 全能工作流 SOP | `content/beginner-guides/notebooklm-sop.md` | 文献阅读与工作流（测验/PPT/海报/播客） |
| AI 协同写 PRD 实战指南 | `content/beginner-guides/ai-prd-guide.md` | 产品思维与六轮对话写 PRD 实操指南 |
| MCP 入门指南 | `content/mcp/mcp-guide.md` | 理解 MCP 是什么、为什么重要、怎么连接外部工具 |
| 数据安全与合规指南 | `content/security/data-security-and-compliance.md` | AI 使用中的数据脱敏、合规出境、密钥保护 |

### 工具学习页

| 内容 | 文件位置 | 用途 |
|---|---|---|
| Cursor 新手学习页 | `content/tool-pages/cursor-beginner-guide.md` | 编辑器内人机协作修改项目 |
| Claude Code 学习指南 | `content/tool-pages/claude-code-guide.md` | 命令行 Agent 终端助手使用指南 |
| Trae 学习指南 | `content/tool-pages/trae-guide.md` | 中文 AI IDE 与 Builder 自动构建指南 |
| OpenAI Codex 学习指南 | `content/tool-pages/codex-guide.md` | OpenAI 官方 Agent：IDE / 终端 / 云端三种形态 |
| Workbuddy 学习指南 | `content/tool-pages/workbuddy-guide.md` | 医药企业内网智能办公助理指南 |
| Google Antigravity 学习指南 | `content/tool-pages/antigravity-guide.md` | Google 原生 Agent 编程环境 |
| Lovable 学习指南 | `content/tool-pages/lovable-guide.md` | 用自然语言直接生成 Web 应用的 Vibe Coding 工具 |

### AI 应用实战

| 内容 | 文件位置 | 用途 |
|---|---|---|
| AI 制作海报指南 | `content/ai-applications/ai-poster-guide.md` | 医药疾病宣传海报制作 SOP |
| AI 制作 PPT 指南 | `content/ai-applications/ai-ppt-guide.md` | 学术科室会 PPT 自动生成 SOP |
| AI 制作视频指南 | `content/ai-applications/ai-video-guide.md` | 患教与内训短视频制作 SOP |
| AI 制作数据看板 | `content/ai-applications/ai-dashboard-guide.md` | 学术会议医生参会看板制作 SOP |
| AI 检索医学资料 | `content/ai-applications/ai-research-guide.md` | 临床数据与学术文献精准检索 SOP |
| AI 市场准入竞品分析 | `content/ai-applications/ai-market-analysis-guide.md` | 国采/集采竞品 SWOT 定位分析 SOP |

### Skill 进阶与数据分析

| 内容 | 文件位置 | 用途 |
|---|---|---|
| Skill 理论知识：从 Prompt 到 Skill | `content/skill-mastery/skill-theory-and-agent-classification.md` | Agent 两大流派分类与好 Skill 六要素 |
| 高质量 Skill 获取方法 | `content/skill-mastery/skill-acquisition-guide.md` | 用 GitHub CLI 搜索、筛选、验证 Skill |
| 会议纪要 Skill 实操案例 | `content/skill-mastery/meeting-minutes-skill-case.md` | 普通 Prompt 与 Skill Prompt 的输出对比 |
| Claude Desktop 接入 DeepSeek | `content/skill-mastery/cc-switch-deepseek-guide.md` | 多模型切换工具 CC Switch 使用指南 |
| 数据分析 Agent Skills 工作流 | `content/data-analytics/data-analytics-skill-workflow.md` | 14 个数据分析 skill 的路由框架 |
| 非 Codex 环境的数据分析提示词 | `content/data-analytics/non-codex-analytics-prompt.md` | 在普通网页端复现 Skills 工作流 |

### UI/UX 实战

| 内容 | 文件位置 | 用途 |
|---|---|---|
| UI/UX Part A：从 PRD 迈向 UI | `content/uiux/prd-to-ui-guide.md` | 从需求到 UI 设计与开发交付 |
| UI/UX Part B：Call Insight × Stitch | `content/uiux/call-insight-stitch-workshop.md` | 移动端高保真 UI 实操闭环 |
| UI/UX Part C：工具地图 | `content/uiux/uiux-tools-map.md` | 四类 UI/UX 工具的选择方法 |
| Call Insight Stitch 设计简报 | `content/uiux/call-insight-stitch-brief.md` | Part B 的完整参考材料 |
| 课堂演示源文件 | `content/uiux/part-a-source.md` | Part A 的原始课堂材料 |

### GEO 与视频专题

| 内容 | 文件位置 | 用途 |
|---|---|---|
| GEO 概念入门 | `content/geo-mastery/geo-concept-intro.md` | 从搜索结果到 AI 答案，GEO 四问框架 |
| GEO 监测工具页面需求 | `content/geo-mastery/geo-tool-requirements.md` | 单页 GEO 监测工具的功能与设计 |
| GEO 监测工具开发指南 | `content/geo-mastery/geo-development-guide.md` | 从页面到 API 的端到端 Vibe Coding 实战 |
| AI 视频生成工作流 | `content/video-generation/ai-video-workflow.md` | 从需求到成片的闭环全流程 |
| 思福诺暖场视频实战 Case | `content/video-generation/video-case-sifuno.md` | Gemini + Kling + 剪映完整实战记录 |

### 部署与交付

| 内容 | 文件位置 | 用途 |
|---|---|---|
| 静态网站托管部署指南 | `content/deployment/static-hosting-guide.md` | GitHub Pages / Vercel / Netlify / Cloudflare 部署 |
| 微信分享与部署诊断指南 | `content/deployment/wechat-sharing-guide.md` | 微信卡片配置与 404 故障排查 |
| Dashboard 部署实战 | `content/deployment-advanced/dashboard-deploy-full-guide.md` | CHECK → DEPLOY → VERIFY → PEER TEST 四步交付 |

### 操作 SOP 与模板

| 内容 | 文件位置 | 用途 |
|---|---|---|
| GitHub 下载项目 SOP | `content/sops/github-download-open-with-cursor-sop.md` | 从 GitHub 下载并打开项目的完整流程 |
| GitHub 仓库新手解读模板 | `content/github-guides/github-repo-beginner-analysis-template.md` | 解读任意 GitHub 项目的通用模板 |

## 推荐学习路径

不同基础的人可以从不同入口开始。以下三条路径覆盖主要使用场景。

### 路径一：零基础入门（约 1 周）

1. 先读 `content/beginner-guides/ai-glossary.md` 建立词汇基础。
2. 用 `content/beginner-guides/gemini-sop.md` 和 `content/beginner-guides/notebooklm-sop.md` 体验网页端 AI。
3. 按 `content/sops/github-download-open-with-cursor-sop.md` 学会获取项目。
4. 用 `content/tool-pages/cursor-beginner-guide.md` 或 `content/tool-pages/trae-guide.md` 完成第一次 AI 编程。
5. 读 `content/security/data-security-and-compliance.md` 建立安全意识。

### 路径二：应用落地（约 2 周）

1. 用 `content/ai-applications/` 下的指南制作海报、PPT、视频、数据看板。
2. 用 `content/ai-applications/ai-research-guide.md` 和 `content/ai-applications/ai-market-analysis-guide.md` 做检索与市场分析。
3. 按 `content/deployment-advanced/dashboard-deploy-full-guide.md` 把成果发布上线。

### 路径三：进阶能力（约 3-4 周）

1. 读 `content/skill-mastery/skill-theory-and-agent-classification.md` 理解 Prompt → Skill → Agent。
2. 用 `content/skill-mastery/skill-acquisition-guide.md` 建立自己的 Skill 库。
3. 学习 `content/mcp/mcp-guide.md` 连接外部工具与数据源。
4. 用 `content/geo-mastery/geo-concept-intro.md` 和 `content/geo-mastery/geo-development-guide.md` 做一个完整项目。

## Agent Skills

当前已包含 8 个 Skill：

| Skill | 文件位置 | 作用 |
|---|---|---|
| `sop-writer-skill` | `skills/sop-writer-skill/SKILL.md` | 把复杂操作写成新手能照着做的 SOP |
| `tool-research-skill` | `skills/tool-research-skill/SKILL.md` | 研究 AI 工具并生成新手学习页 |
| `github-project-reader-skill` | `skills/github-project-reader-skill/SKILL.md` | 解读 GitHub 仓库并判断是否适合新手 |
| `mcp-helper-skill` | `skills/mcp-helper-skill/SKILL.md` | 指导 Agent 编写适合新手的 MCP 服务器安装与配置指南 |
| `prompt-optimizer-skill` | `skills/prompt-optimizer-skill/SKILL.md` | 将初学者模糊的指令转化为结构清晰、逻辑严密的高质量 AI Prompt |
| `error-troubleshooter-skill` | `skills/error-troubleshooter-skill/SKILL.md` | 分析新手的运行报错，提供平民化原理解释和安全的排错指令 |
| `risk-safety-review-skill` | `skills/risk-safety-review-skill/SKILL.md` | 排查代码、指令或工具，规避合规、扣费与安全泄露风险 |
| `prompt-template-skill` | `skills/prompt-template-skill/SKILL.md` | 根据具体业务或学术任务，自动定制符合 CO-STAR 结构的高质量 Prompt |

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

本轮内容更新已完成：

- [x] Codex 新手学习页
- [x] Claude Code 新手学习页
- [x] Antigravity 新手学习页
- [x] Lovable 新手学习页
- [x] MCP 入门指南
- [x] 数据安全与合规指南
- [x] AI 术语表扩充至 15 个词条
- [x] Trae / Workbuddy 内容深度补齐
- [x] README 内容清单与学习路径同步

建议下一批内容继续补齐：

- [ ] API Key 配置 SOP
- [ ] 让 Agent 读懂项目结构 SOP
- [ ] AI 搜索工具对比指南
- [ ] AI 音频与播客生成指南

建议下一批 Skill 增加：

- `beginner-explainer-skill`
- `ai-news-digest-skill`
- `data-analytics-skill`

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
