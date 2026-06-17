# 🧭 付晓康 · 个人作品展示站

> 免费部署，零成本托管，用 GitHub Pages 发布到互联网。

## 目录结构

```
personal-site/
├── index.html        # 主页面
├── css/
│   └── style.css     # 样式文件
├── js/
│   └── script.js     # 交互脚本
└── assets/           # 放你的作品图片
```

---

## 🚀 零基础部署指南

### 第一步：注册 GitHub 账号

1. 打开 [github.com](https://github.com)
2. 点击右上角 **Sign up**
3. 输入邮箱、设置密码、给自己起个用户名（比如 `xiaokang-art`）
4. 验证邮箱

### 第二步：创建仓库（Repository）

1. 登录后，点右上角的 **"+" → "New repository"**
2. **Repository name** 填写：`xiaokang.github.io`  
   （把 `xiaokang` 换成你的 GitHub 用户名，这很重要！）
3. 选 **Public**
4. 勾选 "Add a README file"
5. 点击 **Create repository**

### 第三步：上传网站文件

**方法 A — 直接在网页上传（最简单）**

1. 在你刚创建的仓库页面，点 **Add file → Upload files**
2. 把 `personal-site` 文件夹里的所有文件拖进去
3. 往下翻，点 **Commit changes**

**方法 B — 用 GitHub Desktop（适合后续更新）**

1. 下载安装 [GitHub Desktop](https://desktop.github.com/)
2. 登录你的 GitHub
3. 点 **Clone a repository**，选中刚创建的仓库
4. 把网站文件复制到克隆下来的文件夹里
5. 在 GitHub Desktop 里提交并推送（Commit → Push origin）

### 第四步：开启 GitHub Pages

1. 进入你的仓库，点顶部的 **Settings**
2. 左侧找到 **Pages**
3. **Branch** 选 `main`，文件夹选 `/ (root)`，点 **Save**
4. 等 1-2 分钟，页面上会出现一行字：  
   `Your site is published at https://xiaokang.github.io/`
5. 点击那个链接，你的网站就在线了！🎉

---

## 🖼️ 如何替换内容和作品

### 修改个人信息
- 打开 `index.html`，找到对应的文字直接修改
- 比如你的名字、介绍、联系方式

### 添加作品图片
1. 把图片放到 `assets/` 文件夹里（建议尺寸 800×600 或 400×300）
2. 打开 `index.html`，找到作品卡片区域
3. 把占位符 `<div class="work-card__placeholder">` 替换成：
   ```html
   <img src="assets/你的图片文件名.jpg" alt="作品名称">
   ```
4. 修改卡片标题和描述文字

### 修改联系方式
- 在 `index.html` 里找到 `#contact` 区域，替换占位信息

---

## 💡 进阶（以后可以玩）

- **自定义域名** — 买个域名（比如 `xiaokang.art`），在 GitHub Pages 设置里绑定，免费又专业
- **添加作品详情页** — 点击作品卡片跳转到单独的详情页面
- **集成评论区** — 用 Giscus / Utterances 加上评论区功能

---

有问题随时找我！🧭
