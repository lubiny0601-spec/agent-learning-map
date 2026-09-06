# 数据分析 Agent Skills 工作流

## 一句话解释

一套系统化的 Data Analytics 技能路由框架：先判断任务是否需要数据分析，再确认数据来源和质量，然后选择最小 skill 组合完成分析，最后验证并交付可复用的报告。

## 适合谁

* 拥有结构化数据（Excel/CSV/SQL），想让 AI Agent 用专业流程做数据分析的人。
* 想用 Skills 方式组织数据分析工作流，而不是让 AI 随意"看数据并总结"的人。
* 需要做 KPI 指标体系、市场估算、Dashboard 或分析报告，且要求结论可追溯、可验证的人。

---

## Part 1：总指令——这不是普通"看数据并总结"

Data Analytics 的核心逻辑：

1. 先判定任务是否真的需要结构化数据、量化证据、指标定义、业务判断或可视化交付
2. 先做 source-of-truth 识别，确认数据来源、粒度、时间窗、指标定义、过滤条件和缺口
3. 根据任务选择最小可用 skill 组合，不要把所有 skill 机械跑一遍
4. 只要产生结论、诊断、对比、推荐、KPI readout、市场估算或数据质量判断，默认形成可复用交付物（通常是 report）
5. 任何重要数字都要能回到数据、查询、notebook、截图、表格或来源说明
6. 在最终交付前执行 validate-data 式检查

---

## Part 2：运行入口——index 路由

每个 Data Analytics 任务都先执行以下入口动作：

### 2.1 Eligibility Gate（准入判断）

如果任务满足任一条件，进入 Data Analytics 流程：
* 需要分析结构化记录、表格、CSV、SQL 查询结果、dashboard 数据或业务指标
* 需要 KPI、metric definition、guardrail、target、scorecard
* 需要解释指标变化、异常、差异、分群、漏斗、留存、转化、收入、成本、市场规模
* 需要源支持的报告、仪表盘、notebook、图表、可复用语义层
* 需要基于数据给出产品、业务、增长、运营或战略建议

如果只是纯文本润色、格式转换、普通写作、代码语法修复、没有数据证据的定性说明，不进入。

### 2.2 Source Gate（数据来源确认）

在分析前必须回答：
* 数据在哪里：上传文件、粘贴表格、SQL 结果、warehouse、BI dashboard、spreadsheet、文档或截图
* 是否有明确 source of truth
* 数据粒度是什么：一行代表用户、事件、订单、账户、日期、渠道、地区还是聚合指标
* 时间窗是什么，是否有 timezone、partial period、backfill、late-arriving data 风险
* 指标定义是什么：分子、分母、过滤、去重、归因、单位、币种
* 有无重复来源或冲突来源，哪个更权威，为什么

> 如果缺少必要数据，不能用弱替代源冒充权威源。必须让用户提供数据，或明确使用 synthetic/sample data 只演示流程，不能回答真实业务问题。

### 2.3 默认响应模式

| 模式 | 何时使用 |
|---|---|
| **report**（默认） | 有发现、解释、对比、推荐、诊断、KPI readout、市场估算或数据质量结论 |
| **inline** | 用户明确要简短 chat answer，或只是一个边界清晰的单值查询、单个计算、schema 问题 |
| **dashboard** | 用户要持续监控、探索过滤、运营看板、scorecard |
| **notebook** | 用户需要可复现 SQL/Python、复杂计算、审计轨迹、模型或统计验证 |

---

## Part 3：14 个 Skill 路由表

| Skill | 触发场景 | 常见配套 | 默认交付 |
|---|---|---|---|
| **gather-business-context** | 不清楚业务背景、指标含义、来源、owner、历史决策 | 后接具体分析 skill | report |
| **create-data-context** | 创建或维护语义层、保存数据上下文 | analyze-data-quality | 文档/包 |
| **design-kpis** | 设计 KPI、指标体系、guardrail、target | analyze-data-quality | report |
| **kpi-reporting** | KPI 周报、月报、QBR、scorecard、目标进度 | metric-diagnostics, visualize-data | report |
| **metric-diagnostics** | 解释指标为什么涨跌、异常、gap、variance | analyze-data-quality, visualize-data | report |
| **product-business-analysis** | 产品/业务决策、优先级、launch/hold、细分机会 | gather-business-context, visualize-data | report |
| **market-sizing** | TAM/SAM/SOM、机会规模、收入池、敏感性 | gather-business-context, jupyter-notebooks | report |
| **analyze-data-quality** | 数据质量、source 冲突、freshness、grain、null、duplicate、join 风险 | jupyter-notebooks, validate-data | quality assessment 或 report |
| **build-dashboard** | 建 dashboard、监控页、scorecard、BI 视图 | analyze-data-quality, visualize-data | dashboard |
| **build-report** | 建正式分析报告 | validate-data, publish-artifact-to-sites | report |
| **visualize-data** | 做图、改图、图表 QA | build-report, build-dashboard | chart spec/rendered |
| **jupyter-notebooks** | 复现计算、SQL/Python 分析、审计 notebook | validate-data | notebook |
| **validate-data** | 审查分析是否可信、能否分享 | analyze-data-quality, visualize-data | validation report |
| **publish-artifact-to-sites** | 发布已验证 report/dashboard 到 Sites | build-report 或 build-dashboard | Sites snapshot |

---

## Part 4：通用动作流

所有任务先执行：

1. 读取用户问题和数据上下文
2. 执行 Eligibility Gate
3. 执行 Source Gate
4. 选择 response mode: report / inline / dashboard / notebook
5. 选择最小 skill 组合
6. 按 skill 顺序完成分析
7. 执行 validate-data 式终检
8. 交付结论、证据、caveats、可复现路径、下一步

---

## Part 5：推荐 Skill 组合（常见场景）

### 场景 1：一份新数据，用户没给具体问题

`index → analyze-data-quality → product-business-analysis → visualize-data → build-report → validate-data`

用途：自动给出数据可信度、关键发现、业务机会和下一步。

### 场景 2：用户问"发生了什么变化，为什么"

`index → gather-business-context（如需要）→ analyze-data-quality（如需要）→ metric-diagnostics → visualize-data → build-report → validate-data`

### 场景 3：用户问"我们应该怎么做"

`index → gather-business-context → product-business-analysis → metric-diagnostics（如需要）→ visualize-data → build-report → validate-data`

### 场景 4：用户要 KPI 体系

`index → gather-business-context → analyze-data-quality（如需要）→ design-kpis → build-report → validate-data`

### 场景 5：用户要 KPI 周报/月报

`index → kpi-reporting → metric-diagnostics（如需要）→ visualize-data → build-report → validate-data`

### 场景 6：用户要 Dashboard

`index → gather-business-context（如需要）→ design-kpis（如需要）→ analyze-data-quality → build-dashboard → visualize-data → validate-data`

### 场景 7：用户要市场规模

`index → gather-business-context → market-sizing → jupyter-notebooks（如需要审计）→ visualize-data → build-report → validate-data`

### 场景 8：用户要审查已有分析

`index → validate-data → analyze-data-quality（如需要）→ visualize-data（如需要）`

### 场景 9：用户要可复现分析

`index → jupyter-notebooks → analyze-data-quality → selected primary analysis skill → visualize-data → build-report（如需要）→ validate-data`

### 场景 10：用户要保存给未来 agent 使用

`index → create-data-context → analyze-data-quality（如需要）→ design-kpis（如需要）`

---

## Part 6：核心 Skill 动作流详解

### analyze-data-quality（数据质量检查）

1. 明确数据用途、预期粒度、主键候选、时间窗、业务规则
2. 生成数据 profile：row_count, column_count, type, min/max date, null rate, distinct count, duplicate rate
3. 做核心检查：completeness, uniqueness, validity, consistency, integrity, timeliness, volume, shape
4. 按数据形态追加检查：event, dimension, fact, ML feature, experiment
5. 若有历史，做趋势和分布漂移检查
6. 把每个问题映射到分析风险和可能原因
7. 给出修复建议或自动化测试建议
8. 若结论面向 stakeholder，接 build-report

### metric-diagnostics（指标诊断）

1. 定义诊断问题：metric, time window, baseline, segment, expected vs actual
2. 验证 metric definition 和 source
3. 描述整体模式：level, trend, timing, affected population, magnitude
4. 制定 decomposition plan：segment, channel, cohort, geography, platform, lifecycle, mix shift
5. 分解 drivers 并验证：contribution, rate vs volume, mix vs behavior, artifact vs real change
6. 标注确定性：confirmed, likely, possible, ruled out, unknown
7. 用 visualize-data 表示贡献结构或趋势
8. 默认接 build-report

> 不要把相关性写成因果，除非有实验、准实验或强设计支持。

### product-business-analysis（产品/业务分析）

1. 从决策开始，而不是从可用数据开始
2. 收集决策相关上下文：business goal, constraints, users, risks, prior decisions, metric framework
3. 框定分析：hypotheses, required cuts, success metric, guardrails, comparison baseline
4. 做聚焦的定量分析
5. 将证据转成决策含义：recommended action, tradeoffs, confidence, risks, next tests
6. 用 visualize-data 呈现关键证据
7. 默认接 build-report

> 输出必须回答"所以该怎么做"，并区分证据、判断、假设和下一步验证。

### market-sizing（市场估算）

1. 定义市场边界：customer, geography, category, time horizon, product scope
2. 选择 sizing 方法：top-down, bottom-up, value-based, comparable benchmark
3. 收集输入来源
4. 区分事实和假设
5. 建模型：base case, low case, high case
6. 做敏感性分析：adoption, price, penetration, frequency, conversion, churn
7. 给出估算范围和最重要验证项
8. 默认接 build-report

> 不要给单点精确答案。必须给范围、假设、敏感性和优先验证项。

### validate-data（验证终检）

1. 盘点 artifact 和 claims
2. 验证问题、方法、假设是否匹配决策
3. 检查数据选择和质量风险
4. 独立复算最高影响数字
5. 检查 reasonableness 和 common traps
6. 检查图表是否误导
7. 评估 narrative 和 recommendation 是否证据支持
8. 给出 confidence：Ready to share / Share with caveats / Needs revision

---

## Part 7：Agent I/O 协议

### 每次运行前建立 analysis_manifest

包含：user_question, decision_or_use_case, response_mode, audience, data_sources（含 name/type/path/owner/freshness/grain/trust_level）, metric_definitions, selected_skills, assumptions, known_gaps, output_contract

### 每个 skill 输出 skill_result

包含：skill, status（complete/blocked/partial）, inputs_used, evidence（claim + source + calculation）, findings, caveats, handoff_to_next_skill, recommended_next

### 最终交付必须包含

* **Answer first**：直接回答用户问题
* **Evidence**：关键数字、图表或表格，带来源和时间窗
* **Method**：简短说明计算、分解、模型或验证方法
* **Caveats**：影响结论的缺口和限制
* **Confidence**：结论可信度和原因
* **Next actions**：可执行建议或后续验证
* **Artifact links**：report/dashboard/notebook/HTML/Sites 路径或链接

---

## Part 8：质量门槛 Checklist

在最终回复前，必须逐项检查：

- 问题没有被替换成更容易回答的相邻问题
- 数据来源、粒度、时间窗、过滤条件、单位明确
- 关键指标定义可解释，可复算
- 没有把 partial period 当完整周期比较
- 没有把相关性写成因果
- 重要结论都有证据，不只是观察或猜测
- 图表的轴、单位、排序、颜色、标题不误导
- 缺失数据、source 冲突、刷新延迟、样本偏差已说明
- 若选择 report 模式，确实生成 report 或记录明确 blocker
- 若选择 dashboard，指标、过滤器、布局、source notes、刷新逻辑完整
- 若选择 notebook，notebook 可复现，并包含验证单元
- 若发布 Sites，明确说明发布的是 snapshot，不是 live connection

---

## Part 9：最简决策树

```
用户请求
├── 没有数据/来源，但任务需要数据? → 要求用户上传/粘贴，或用 synthetic sample 演示
├── 要保存上下文/语义层? → create-data-context
├── 要 dashboard? → build-dashboard + visualize-data + validate-data
├── 要 report 或产生决策型发现? → 先选主分析 skill → visualize-data → build-report → validate-data
├── 要 KPI 定义? → design-kpis
├── 要 KPI readout? → kpi-reporting
├── 要解释变化? → metric-diagnostics
├── 要业务/产品建议? → product-business-analysis
├── 要市场规模? → market-sizing
├── 要检查数据可信度? → analyze-data-quality
├── 要审查已有分析? → validate-data
└── 要复现代码/notebook? → jupyter-notebooks
```

---

## Part 10：图表选择规则

| 分析场景 | 推荐图表 |
|---|---|
| 时间趋势 | line |
| 类别对比和排名 | bar |
| 构成 | stacked bar/area（pie 仅用于少量切片粗读） |
| 分布 | histogram 或 box plot |
| 两变量关系 | scatter |
| cohort/matrix | heatmap |
| driver 加总桥接 | waterfall |
| 漏斗阶段 | funnel 或 stage bar |
