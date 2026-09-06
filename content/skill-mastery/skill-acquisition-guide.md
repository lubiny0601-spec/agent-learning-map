# 高质量 Skill 获取方法

## 一句话解释

把"搜索、筛选、验证、沉淀"讲成一条可复用路径：用 GitHub CLI 搜索英文关键词，按 stars 二次过滤，用元 Skill 建立判断标准，最终把高价值工作流沉淀成自己的 Skill。

## 适合谁

* 知道 Skill 好用但不知道去哪里找高质量 Skill 的人。
* 想用 GitHub 搜索 Skill 但不确定搜索词和筛选标准的人。
* 想把自己的重复性工作沉淀成 Skill 的人。

---

## Part 1：为什么要获取高质量 Skill

高质量的 Skill 可以帮助 Agent 高质量地完成任务，同时降低 token 消耗。

用 HTML 幻灯生成举例：
* 使用 Skill 生成的界面：审美、结构和视觉完成度更强
* 不使用 Skill 生成的界面：同样 Prompt 下基线水平，明显不如 Skill 版

同样一句 Prompt，有无 Skill 的交付质量差距很大。

---

## Part 2：Skill 获取来源

### 1. 元 Skill：find-skills

当你还不知道该搜什么、如何判断一个 Skill 是否可靠时，先用它建立候选清单和筛选标准。

* 来源：https://github.com/vercel-labs/skills/blob/main/skills/find-skills/SKILL.md
* 适合：作为"找 Skill 的 Skill"

### 2. Skill-Creator

把重复出现的高价值工作流沉淀成自己的 Skill：把任务步骤、判断标准、输入输出和验证方法固定下来，让下一次执行更稳定。

* 来源：https://github.com/anthropics/skills/tree/main/skills/skill-creator
* 适合：自己制作 Skill

### 3. Anthropic 官方 Skill 库

* 来源：https://github.com/anthropics/skills

### 4. GitHub CLI 搜索

GitHub 官方 CLI 提供 `gh skill search` 命令，专门搜索 GitHub 公共仓库里的 SKILL.md 文件，返回 skillName / repo / path / description / stars 等字段。

默认按相关性排，不是按 stars 排，所以必须让 Agent 二次过滤 stars。

---

## Part 3：GitHub CLI 搜索技巧

### 安装和配置

```text
安装 GitHub CLI 到本机，帮我做好登录配置。
```

### 搜索命令

```text
帮我调用本机 GitHub CLI，搜索 xxx skill，
搜索词使用英文，优先匹配搜索词，返回高星结果
```

### 关键经验：用英文搜索词

中文搜索词和英文搜索词的返回结果差异巨大。以"医学文献"类 Skill 搜索为例：

**中文搜索词结果**：命中率低，很多优质 Skill 完全找不到。

**英文搜索词结果**（如 systematic-review、literature-review、citation-verification）：命中率高，能找到大量高质量 Skill，且按 stars 排序后可快速定位最优选项。

`npx skills find` 命令也可用，但实际命中率和数量不如 GitHub CLI 英文搜索。

### 高质量医学文献 Skill 搜索结果示例

| Skill 名称 | 核心功能 | Stars |
|---|---|---|
| deep-research | 13-Agent 深度研究管线：系统综述+Meta+PRISMA+GRADE | 32,019 |
| search (Exa) | Exa 深度研究引擎：多轮文献综述检索 | 4,582 |
| citation-verification | 学术引用真实性校验：防 AI 幻觉引用/撤稿检查 | 4,300+ |
| systematic-literature-review | 检索→去重→评分→选文→写作→校验→PDF/Word | 2,347 |
| systematic-review (beita6969) | PRISMA 2020 全流程：协议→检索→筛选→数据提取→合成 | 848 |
| medical-imaging-review | 医学影像 AI 系统综述（期刊级、防幻觉写作） | 668 |

---

## Part 4：Skill 质量判断框架

获取到候选 Skill 后，按以下维度判断质量：

1. **Stars 数量**：社区认可度的粗筛指标，但不能只看 stars
2. **Install 数量**：实际使用人数，比 stars 更能反映真实价值
3. **功能匹配度**：Skill 的核心功能是否真正解决你的问题
4. **维护状态**：最近更新时间、Issue 响应情况
5. **文档完整度**：SKILL.md 是否清楚说明了 Trigger、Workflow、Output、QA
6. **依赖和兼容性**：是否需要额外工具或环境，是否和你的 Agent 兼容

---

## Part 5：从"找 Skill"到"做 Skill"

如果搜不到满足需求的 Skill，可以用 Skill-Creator 自己制作。

自己制作 Skill 的核心思路就是"好 Skill 六要素"：

1. **Trigger**：什么时候应该调用
2. **Role**：AI 此刻扮演谁
3. **Workflow**：先做什么，后做什么
4. **Resources**：可以参考什么
5. **Output**：最后交付什么
6. **QA / Guardrails**：如何避免翻车

---

## 推荐 Prompt

```text
帮我调用本机 GitHub CLI，搜索 xxx skill，
搜索词使用英文，优先匹配搜索词，返回高星结果。
返回后帮我按 stars 排序，并标注每个 Skill 的
功能、stars、install 数量和最近更新时间。
```