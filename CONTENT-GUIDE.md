# 首页项目编辑指南

## About 页面

打开 Pages CMS 后选择“关于”。About 已是独立页面：`/about/`，首页不再重复显示 About 相关板块。

页面内容按以下节点独立编辑：About Hero、About 介绍、工作经历、合作品牌、核心能力、从概念到量产、我的价值、设计原则、奖项与成果、工具与方法、联系 CTA。英文是主要视觉层，中文是次级翻译层；增删数组条目后页面会按 CMS 中的顺序自动更新。

合作品牌使用纯文字展示，并保留 WWP Beauty 任职期间参与项目的说明。不要把该板块改写为“客户”，以免暗示直接雇佣关系。

## 后台编辑

打开 https://app.pagescms.org，使用 GitHub 登录，选择 `mzy-design/maziyu-portfolio-cms` → `首页`。

- 新增项目：在“首页项目”末尾添加一项。
- 调整顺序：拖动项目条目；保存后的数组顺序就是网页顺序。
- 修改文字：编辑“项目名”和“分类”。
- 替换图片：编辑“封面”。
- 横版大图：打开“横跨整行”；关闭时为双列竖图。
- GIF：上传 `.gif` 后会保留动画，不要转成 WebP。

首页鼠标拖尾会自动读取同一个“首页项目”列表：拖动项目顺序后，鼠标跟随图片的播放顺序也会同步改变，不需要编辑代码。

## 文件路径

每个项目使用独立目录：`images/projects/项目英文名/`。

静态封面命名为 `cover.webp`，动态封面命名为 `cover.gif`。建议竖图 `1200 × 1400`，横图 `1600 × 1000`。

## 完整首页板块

在 Pages CMS 中选择“首页完整板块”，可分别编辑：

- Capabilities：能力分类、服务项目、工具与板块图片。
- 评价：姓名、职位、评价和图片；当前图片为空时显示占位符。
- Awards：奖项、结果、项目与年份。
- Values：标题和说明。
- CTA 与页脚：标题和链接。

Clients 板块已按要求排除。About 只保留个人介绍、工作经历、教育和语言；能力与工具归入 Capabilities，荣誉归入 Awards，避免重复。

## 11 个独立项目页面

在 Pages CMS 中选择“作品详情（11 个独立页面）”，每个 JSON 文件就是一个可独立编辑的页面：

- `hourglass.json` → `/works/hourglass/`
- `wwp-beauty.json` → `/works/wwp-beauty/`
- `wwp-keychain.json` → `/works/wwp-keychain/`
- `precision-dispensing.json` → `/works/precision-dispensing/`
- `heaven-pink-lipstick.json` → `/works/heaven-pink-lipstick/`
- `heaven-pink-palette.json` → `/works/heaven-pink-palette/`
- `rare-beauty.json` → `/works/rare-beauty/`
- `mansion.json` → `/works/mansion/`
- `schwan.json` → `/works/schwan/`
- `mario.json` → `/works/mario/`
- `zhiben.json` → `/works/zhiben/`

所有页面共用 `project-framework.css` 和 `site.js` 的版式与交互，但标题、年份、服务、概述、章节、图片画廊和下一项目链接均来自各自 JSON。空图片会显示占位符；上传图片后自动替换，不需要改代码。
