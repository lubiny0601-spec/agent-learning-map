# OpenAI Codex (OpenAI 代码模型 API 调用)：新手学习页

## 一句话解释

OpenAI Codex 是驱动早期 GitHub Copilot 的底层 AI 代码生成大模型。它不直接提供像网页聊天那样的图形界面，而是通过 **API**（Application Programming Interface，应用程序接口，即软件与软件之间沟通的桥梁）向其他编辑器插件或自定义程序提供强大的代码生成与理解能力。

---

## 适合谁

* **数字化运营/市场部成员**：需要批量处理 Excel 表格数据、自动提取分析报告、或使用 Python 脚本进行自动化排班等日常重复工作。
* **数据分析爱好者**：希望直接输入中文，让 AI 自动生成 SQL 数据库查询语句进行数据拉取。
* **技术发烧友**：希望将 AI 接入企业内部钉钉、企业微信机器人，编写自定义智能客服。

## 不适合谁

* **纯代码小白（无意愿编写任何脚本）**：Codex 没有像 ChatGPT 那样的聊天网页，如果没有代码运行环境或插件载体，它无法独立使用。这类同学建议优先学习 [Cursor](./cursor-beginner-guide.md) 或 [Trae](./trae-guide.md)。

---

## 它能帮你做什么

| 能力 | 新手理解 | 示例任务 |
| :--- | :--- | :--- |
| **注释转代码** | 你用中文写出逻辑注释，它自动把注释翻译成可运行的 Python、JS 或 SQL 代码。 | 输入：“读取当前文件夹下的 Excel 文件，筛选出销售额大于 10 万的行并保存为新表”，自动吐出 Python 代码。 |
| **代码大白话翻译** | 把一段冷冰冰的复杂代码翻译成人类能听懂的业务逻辑步骤。 | 将一段包含 100 行的遗留数据库查询代码翻译成：“这串代码是在查询上个月购买超过3次的老客户列表”。 |
| **代码纠错与补全** | 识别代码中的拼写错误、括号漏写，并给出修改建议。 | 自动修复 Python 脚本运行时报出的 `SyntaxError`（语法错误）。 |

---

## 使用前准备

| 准备项 | 是否必须 | 说明 |
| :--- | :--- | :--- |
| **OpenAI 开发者账号** | 是 | 需要在 OpenAI 开发者平台（platform.openai.com）注册账号。 |
| **API Key（密钥）** | 是 | 一串以 `sk-` 开头的长字符密码，用于授权你的本地程序调用大模型。 |
| **Node.js 或 Python 环境** | 是 | 用于运行调用 API 的本地脚本。新手建议安装 Python 3.10+。 |
| **海外网络环境与账单额度** | 是 | 接口调用会根据消耗的 Token（字符单位）数量进行扣费，需要绑定海外信用卡或拥有赠送额度。 |

> ⚠️ **重要技术说明**：OpenAI 官方已将最初命名的 `Codex` 专用模型下线，其代码生成能力已完全融入性能更强、价格更低的 `gpt-4o`、`gpt-4o-mini` 以及 `o3-mini` 模型中。目前我们通过 API 进行代码生成开发时，直接调用上述最新模型即可。

---

## 第一次使用流程

### 步骤 1：获取你的 API Key 密匙
1. 打开浏览器登录 [OpenAI 开发者平台](https://platform.openai.com/)。
2. 导航到 **API Keys** 页面，点击 **Create new secret key**（创建新密钥）。
3. 复制生成的以 `sk-` 开头的密钥。**注意：这串密钥只显示一次，请必须保存在本地记事本中！**

### 步骤 2：在 OpenAI Playground 免代码测试
1. 在开发者平台顶部点击 **Playground**（游乐场，一个在线的可调参测试网页）。
2. 在模式（Mode）中选择 **Complete**（补全）或 **Chat**（对话）。
3. 选择最新的模型（如 `gpt-4o-mini`）。
4. 在输入框中输入中文注释，点击运行，观察 AI 如何自动补全出可运行的脚本。

### 步骤 3：本地 Python 脚本调用（最简实操）
1. 在你的电脑中安装 Python 调用库：在终端运行 `pip install openai`。
2. 新建一个 `test_openai.py` 文件，写入以下极简调用代码：

```python
import os
from openai import OpenAI

# 初始化客户端，会自动读取你系统环境变量中的 OPENAI_API_KEY
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY", "你的真实密钥-临时测试用"))

response = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "user", "content": "请写一个 Python 脚本，功能为将当前目录下的 'data.xlsx' 转为 PDF。"}
    ]
)

print("AI 生成的代码：")
print(response.choices[0].message.content)
```

3. 运行该文件，控制台即刻吐出完整的 Python 脚本。

---

## 推荐新手任务

### 任务：自动生成 SQL 查询语句
* **任务目标**：不用学复杂的 SQL 语法，让 AI 帮我们提取出需要的数据。
* **操作方式**：在 Playground 中输入以下 Prompts：
  ```text
  你是一个数据分析专家。请根据以下表结构：
  表名：orders
  字段：order_id, customer_id, amount, order_date, status
  
  任务：生成一个 SQL 语句，查询 2025 年 1 月份所有 status 为 'completed' 且金额 amount 大于 500 元的订单，并按金额降序排列。
  ```
* **预期效果**：AI 1秒内准确输出 `SELECT * FROM orders WHERE ...` 语句。

---

## 常见错误与防护

| 报错现象/常见错误 | 可能原因 | 解决方法 |
| :--- | :--- | :--- |
| **API Key 硬编码泄露** | 直接把 `sk-...` 密钥写死在公开的代码文件里，并上传到了 GitHub 仓库。 | **绝对禁止！** GitHub 拥有自动检测机制，一旦检测到密钥会立即作废。请必须使用环境变量或 `.env` 隔离文件读取密钥。 |
| **API 额度耗尽 (Rate Limit / Insufficient Quota)** | 1. 账号中没有充值金额；<br>2. 免费赠送的 5 美元额度到期。 | 登录 OpenAI 开发者后台的 Billing 页面，充值 5 美元即可重新激活 API。 |
| **直接执行未经审核的 AI 代码** | 信任大模型输出的系统操作代码，使用 `eval()` 自动执行。 | AI 可能会在幻觉中生成包含格式化磁盘（如 `rm -rf /`）的代码，**在执行任何 AI 生成的代码前，必须由人工或安全 Skill 进行逐行静态审查**。 |

---

## 推荐 Prompt

### 让 AI 帮你设计数据表字段及 SQL 查询
```text
你是一个数据库专家。我想做一个“医院抗感染药品库存管理系统”。
1. 请帮我设计一个最基础的 MySQL 数据库表结构，包含字段名、类型和大白话中文注释。
2. 写出一个 SQL 语句，用于查询目前库存余量少于 10 盒的所有药品名称和具体科室。
```

---

## 和同类工具的区别

* **vs. ChatGPT 网页版**：ChatGPT 适合聊天、润色文章、发散思考；而 **OpenAI API (Codex)** 适合作为幕后发动机，塞进你的自动化脚本或企业内网小工具里，实现“静默式自动处理”。
* **vs. Cursor 编程工具**：Cursor 提供了开箱即用的前端交互界面，适合人机协作修改大型项目；而 **API 接口** 适合需要批量化、自动化处理特定简单数据的轻量脚本场景。

---

## 学完后下一步

1. 阅读 [Gemini 医药实战 SOP](../beginner-guides/gemini-sop.md) 了解网页端的高效调教逻辑。
2. 学习 [把 Skill 与 MCP 服务导入 Agent](../../skills/mcp-helper-skill/SKILL.md) SOP，尝试用 API 让你的 Agent 连接更多外部工具。
