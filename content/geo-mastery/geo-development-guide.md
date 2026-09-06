# GEO 监测工具实操开发指南

## 一句话解释

用 Vibe Coding 开发一个完整的 GEO 答案监测工具：从生成前端页面到接入 DeepSeek Responses API，实现同一道问题 3 次独立联网调用，观察品牌提及差异。含 Node.js 版和 JS 直连版两个技术路径的完整提示词、安全规则和排错指南。

## 适合谁

* 想用 Vibe Coding 方式开发第一个端到端 AI 项目的业务同事。
* 有 HTML 页面开发基础，想接入真实 AI API 的人。
* 课堂实操中遇到 CORS、空回答、来源缺失等问题需要排查的人。

---

## Part 1：今天要完成什么

在自己的电脑上完成一个 GEO 监测工具：用页面提交问题，调用 DeepSeek Responses API，让 deepseek-v4-flash 执行服务端联网搜索，并展示回答、来源和品牌提及情况。

最终产物：

```
我的GEO工具/
├── index.html          （前端页面）
├── server.js           （Node 版需要，JS 直连版不需要）
├── 启动GEO工具.command   （Node 版需要，Mac）
├── 启动GEO工具.bat       （Node 版需要，Windows）
└── 04-GEO页面需求.md
```

---

## Part 2：两个技术路径对比

本节课有两个实操版本，区别在于 API Key 怎么保护：

| 维度 | Node.js 版（正式版） | JS 直连版（课堂简化版） |
|---|---|---|
| 后端 | 创建 server.js，用 Node 内置模块 | 不创建任何后端 |
| Key 保护 | Key 只存在 Node 进程内存，关闭服务即清除 | Key 在浏览器 JS 内存中，刷新页面即清除 |
| 启动方式 | 双击 .command / .bat | 直接用浏览器打开 HTML |
| 复杂度 | 高（CORS 处理、连续请求、完成标记逻辑） | 低（适合 1h45min 课堂完成） |
| 适用场景 | 正式产品级实现 | 课堂快速体验 |
| 安全性 | 后端保护 Key | 浏览器开发者工具可查看请求 |

> JS 直连版明确告知：浏览器直接调用 API 时，具备开发经验的人仍可能通过开发者工具查看请求信息。此方案只用于本地课堂体验，不用于正式产品。

### 两个版本的共同前提

* DeepSeek 个人账号和临时 API Key
* Codex 或 Antigravity 打开本地文件夹
* 稳定网络或手机热点

---

## Part 3：API Key 安全规则

两个版本都适用的安全规则：

* 不把 Key 粘贴给 Codex、Antigravity 或其他 Agent
* 不把 Key 写进 HTML、JavaScript、Markdown 或启动文件
* 不使用 localStorage、sessionStorage、IndexedDB、Cookie 长期保存
* 不在群聊、邮件、截图或共享文档中展示 Key
* 只在已运行的 GEO 工具"设置"页输入 Key
* 怀疑泄露时，立即到 DeepSeek 平台删除并重新创建
* 课程结束后删除临时 Key

---

## Part 4：阶段一——生成前端页面（约 30 分钟）

两个版本共用这一步。

```text
请完整阅读当前文件夹中的《04-GEO页面需求.md》，按照文档
创建 GEO 监测工具页面。

本阶段只完成前端页面和模拟交互：
1. 使用 HTML、CSS 和原生 JavaScript；
2. 主文件命名为 index.html；
3. 完成设置、问题库和监测记录三个页面；
4. 页面显示模型 deepseek-v4-flash 和 Responses API；
5. 明确页面阶段为模拟状态，接入后每次监测强制使用 web_search；
6. 保留三次独立调用、来源、品牌提及和 API 观察台；
7. 不创建 Node 服务，不接入真实 API；
8. 完成后启动预览并检查主要交互。

请直接开始制作；发现报错请自行修复。
```

### 阶段一成功标准

* 项目中出现 index.html
* 页面可以预览
* 设置、问题库、监测结果可以切换
* 可以选择或新增一道问题
* 页面显示"1 个问题，共 3 次调用"
* 点击模拟"启动监测"后可以看到三张独立结果卡片
* API Key 不会显示在页面其他位置

---

## Part 5：阶段二——接入真实 API

### Node.js 版提示词

```text
请检查当前 GEO 页面，并为它创建本机 Node 服务，接入
DeepSeek Responses API。

要求：
1. 只使用 Node.js 内置模块，不安装第三方依赖；
2. 创建 server.js，服务只监听 127.0.0.1:3000；
3. 识别当前实际 HTML 文件，由 Node 同时提供该页面和本地 API；
4. 创建 POST /api/connect，验证 Key 后只保存在当前 Node 进程内存；
5. 创建 POST /api/monitor，每次只执行一次 DeepSeek 请求；
6. 上游接口使用 POST https://api.deepseek.com/responses；
7. 模型使用 deepseek-v4-flash；
8. 请求包含 tools: [{"type":"web_search"}]；
9. 使用 tool_choice: {"type":"web_search"} 强制每次监测联网；
10. 使用 reasoning: {"effort":"high"}，max_output_tokens 设为 12000，
    上游超时设为 120 秒；
11. 系统指令要求完成搜索和资料阅读后直接给出最终答案，
    不得只返回"让我继续搜索"等过程性计划；
12. 解析 output 中的 web_search_call、output_text、响应状态、
    token 用量和 url_citation，并从回答中的 HTTP(S) 链接补充来源；
13. 注意 responseStatus=completed 只表示接口结束，不代表答案写完；
    要求模型仅在完整答案末尾输出 [[GEO_FINAL_COMPLETE]]，
    页面展示前移除该标记；
14. 若缺少完成标记、回答为空或只有检索计划，将原问题和上一轮
    完整 output 作为下一次 input 回传，让模型从头重写完整答案；
    已成功搜索时续写请求使用 tool_choice:auto，
    搜索失败时仍强制 web_search；
15. 最多尝试两次；只有完成标记存在、正文合格且至少一次
    web_search_call 为 completed 时才标记成功；
16. 页面显示搜索状态、完整回答、来源、耗时、尝试次数、
    是否连续请求、品牌提及和首次出现位置；
17. 页面启动监测时，对同一道问题顺序发起三次独立 /api/monitor 请求，
    避免同时占用个人热点和 API 并发；
18. API 观察台显示 POST /api/monitor - POST /responses 和脱敏结果；
19. Key 不得写入文件、日志、页面返回或 API 观察台；
20. 将搜索失败、缺少结束标记、incomplete、空回答和常见错误
    转换成易懂的中文提示；
21. 修改 server.js 后必须停止旧 Node 进程，再启动新服务并测试。

不要向我索要 API Key，也不要让我把 Key 粘贴到对话中。
```

### JS 直连版提示词

```text
请检查当前 GEO 前端页面，并在不创建任何后端服务的前提下，
用浏览器端原生 JavaScript 直接接入 DeepSeek API。

这是课堂简化实操方案，只用于本地测试。

要求：
1. 不创建 Node、Python、Flask 或其他后端服务；
2. 不安装第三方依赖；
3. API Key 只能由用户在"设置"页的密码输入框中手动输入；
4. 不得把 API Key 写进 HTML、JavaScript、Markdown、配置文件或日志；
5. 不得使用 localStorage、sessionStorage、IndexedDB 或 Cookie
   持久保存 API Key；
6. Key 只保留在当前页面运行期间的 JavaScript 内存中；
7. "保存并测试连接"应直接从浏览器向 DeepSeek 发起真实请求；
8. 监测请求使用 DeepSeek Responses API，模型使用 deepseek-v4-flash；
9. 每次监测请求使用 web_search；
10. 点击"启动监测"时，对同一道问题发起 3 次相互独立的真实 API 请求；
11. 三次调用必须分别显示"等待中、调用中、成功或失败"，
    哪个先返回就只更新自己的卡片；
12. 成功结果显示回答、来源、耗时、是否提及目标产品、
    匹配到的产品名或别名、首次出现位置；
13. 英文产品名和别名匹配时忽略大小写；
14. 提及率只使用成功调用作为分母；
    如果三次全部失败，显示"提及率暂不可用"；
15. 失败卡片支持"单独重试"，只重新发起该次请求；
16. 页面中的 API 调用信息不得显示 API Key 或 Authorization；
17. 将常见 API 错误转换成容易理解的中文提示。

不要向我索要 API Key，也不要让我把 Key 粘贴到对话中。
```

---

## Part 6：Node 版的额外步骤——一键启动文件

```text
请在当前文件夹创建两个一键启动文件：
1. Mac 使用"启动GEO工具.command"；
2. Windows 使用"启动GEO工具.bat"。

两个文件都要检查 Node.js，并从当前项目目录运行 server.js。
只有新 Node 服务成功监听 127.0.0.1:3000 后才能自动打开浏览器；
如果端口 3000 已被占用，应提示我关闭之前的 GEO 启动窗口后重试。
不得包含 API Key。请为 Mac 文件设置可执行权限。
```

启动后浏览器地址：http://127.0.0.1:3000

---

## Part 7：运行第一次真实监测

1. 进入"问题库"
2. 选择一道预置问题，或新增一道自己的问题
3. 只启用这一道问题
4. 确认目标产品和别名
5. 点击"启动监测"
6. 等待三次独立调用完成

三次结果可能不同，也可能有一次失败；失败不应覆盖其他成功结果。

---

## Part 8：观察结果时检查什么

* 模型名称 deepseek-v4-flash
* Responses API 和 web_search
* web_search_call 是否完成
* 三次回答及来源链接
* 目标产品是否被提及
* 匹配到的产品名或别名
* 首次出现位置和提及率
* Node 版额外检查：semanticCompleted 为 true；continued: true 表示曾自动连续生成
* API 观察台显示 POST /api/monitor - POST /responses
* 结果中不包含 API Key 或 Authorization

---

## Part 9：常见问题排错

不要一遇到问题就让 Agent 重新生成整个页面。先对照以下情况。

### 问题 1：Failed to fetch / CORS 跨域

现象：点击测试连接或启动监测后没有结果，出现 Failed to fetch，浏览器 Console 出现 CORS 字样。

可能原因：浏览器把网页直接访问 API 的请求拦住了（JS 直连版常见）。

处理：把不包含 API Key 的错误信息交给 Agent 确认是否为 CORS。

```text
页面调用 DeepSeek 时出现 Failed to fetch。
请检查浏览器 Console 和 Network，判断是否属于 CORS / 跨域问题。
不要向我索要 API Key，只告诉我判断结果和报错原因。
```

### 问题 2：API 一直报错

可能原因：Agent 把 Responses API 和 Chat Completions API 混用了。两套接口请求地址和格式不同。

处理：让 Agent 回到阶段二提示词，重新核对接口。

```text
请检查当前代码是否严格按照本课提示词使用 DeepSeek Responses API。
不要改成 Chat Completions，也不要混用两套请求格式。
发现不一致请直接修复并重新测试。
```

### 问题 3：调用成功但没有回答

可能原因：API 返回的是 JSON 数据包，页面没有从正确字段找到最终回答。

处理：让 Agent 检查这次返回的 JSON，根据真实结构找到回答字段。

```text
API 已经调用成功，但页面没有显示回答。
请检查这次返回的脱敏 JSON，找到最终回答对应的字段并修复解析逻辑。
不要只假设固定字段，不要把 reasoning 内容当成最终回答。
```

### 问题 4：回答正常但来源为 0

回答和来源是两件不同的事。有来源就显示，没有就显示 0，不要因此把整次调用判为失败。

```text
回答已经正常返回，但来源显示为 0。
请检查这次 API 返回中是否包含搜索或来源字段。
有则正确展示，没有则保留"0 来源"，不要因此把整次调用判定为失败。
```

---

## Part 10：课后维护

* 每次启动后重新输入 API Key（两个版本都是）
* 关闭启动窗口或按 Control+C / Ctrl+C 停止 Node 服务
* 修改 server.js 后必须关闭旧启动窗口并重新启动，不能只刷新浏览器
* 出现端口占用提示时只保留一个 GEO 启动窗口
* 课程结束后删除临时 API Key

---

## 推荐 Prompt

```text
请检查我当前 GEO 监测工具的运行状态：
1. page 页面是否正常打开
2. API 连接是否成功
3. 一道问题能否完成三次独立调用
4. 结果是否显示品牌提及、来源和提及率
如果发现问题，请先诊断原因，不要直接重新生成整个页面。
```
