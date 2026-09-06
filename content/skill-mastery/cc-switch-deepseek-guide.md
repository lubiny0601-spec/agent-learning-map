# Claude Desktop 利用 CC Switch 接入 DeepSeek 模型

## 一句话解释

通过 CC Switch 软件，把 DeepSeek 模型接入 Claude Desktop，实现不依赖单一模型厂家、在不同模型之间灵活切换的多模型 Agent 工作方式。

## 适合谁

* 想在 Claude Desktop 中使用 DeepSeek 等非 Anthropic 模型的人。
* 想在多个模型之间灵活切换、对比效果的人。
* 想实践"多模型 Agent Shell"理念——把不同模型放进同一个工作台的人。

---

## Part 1：为什么需要多模型切换

不同模型各有优势：
* Claude：推理、长文本理解强
* DeepSeek：性价比高，中文理解好
* GPT：生态丰富，工具调用多

实际业务中，你可能需要根据任务类型选择最合适的模型。CC Switch 让你在一个入口（Claude Desktop）中切换不同模型，而不用来回切换软件。

---

## Part 2：前提准备

1. **Claude Desktop**：从 https://claude.com/download 下载安装对应系统版本
2. **CC Switch 软件**：用于模型切换的第三方工具
3. **DeepSeek API Key**：从 DeepSeek 开放平台获取

---

## Part 3：操作步骤

### Step 1：安装 Claude Desktop

打开下载页面 https://claude.com/download ，根据电脑系统下载并安装对应版本。

### Step 2：安装 CC Switch

获取并安装 CC Switch 软件。

### Step 3：配置 DeepSeek 模型

在 CC Switch 中添加 DeepSeek 模型配置：
* 填入 DeepSeek API Key
* 选择需要使用的 DeepSeek 模型版本（如 deepseek-chat、deepseek-reasoner）
* 配置 API 端点

### Step 4：切换模型

通过 CC Switch 在 Claude 模型和 DeepSeek 模型之间切换。切换后在 Claude Desktop 的对话中即可使用当前选中的模型。

### Step 5：验证

发送一条测试消息，确认当前使用的是 DeepSeek 模型。

---

## Part 4：注意事项

* CC Switch 是第三方工具，使用前确认来源可靠
* API Key 不要泄露或写入公开代码
* 不同模型的 Context Window 和能力不同，切换后注意调整 Prompt
* DeepSeek 的 API 调用需要消耗费用，注意用量控制

---

## 推荐 Prompt

```text
请检查当前 Claude Desktop 使用的是哪个模型，
并告诉我当前模型的上下文窗口大小和支持的能力。
```