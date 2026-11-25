# dsh-fake-logos

[English](README.md) | 中文

一个轻量级的 [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/deepseek-harness) Web UI 插件，用于将界面上的 DeepSeek Harness 侧边栏 Logo、文字标和首页标题图标替换为其他 AI 编程产品、自定义 SVG/图片与文字，或完全隐藏。

## 功能特性

- **内置 13 款常见产品 Logo 预设**（均包含矢量图标彩色/单色版及文字标）：
  - **Codex**、**Claude**、**Claude Code**、**OpenCode**、**Antigravity**、**Cursor**、**OpenAI**、**Gemini**、**GitHub Copilot**、**Windsurf**、**Cline**、**Kiro**、**Trae**
- **无（隐藏）模式**：移除侧边栏 Logo、文字标与首页图标；当侧边栏折叠为窄轨时会自动保留一个中性展开图标，不影响点击展开。
- **默认（DSH）模式**：无需卸载插件即可随时切回原生 DeepSeek Harness 品牌样式。
- **完全自定义（Custom）**：
  - 自定义侧边栏品牌文字（留空则仅显示图标）
  - 支持直接粘贴 `<svg>` 矢量代码、填写 `https://` 图片链接，或上传本地 SVG / PNG / JPEG / WebP / GIF 图片（最大 64 KB）
  - 粘贴或上传的 SVG 均会经过严格的元素与属性白名单净化后再渲染和保存
- **独立显示开关**：
  - 替换侧边栏 Logo
  - 替换首页标题图标
  - 关闭首页空白处点击触发的像素鲸鱼动画
  - 单色图标模式（图标自动跟随当前明暗主题的文字颜色）
- **实时生效与持久化**：所有配置通过 DSH 官方配置通道（`ctx.configForms`）持久化到当前 profile，修改即时生效，无需重启服务；关闭或卸载插件后自动恢复原生品牌标识。

## 安装方式

### 通过 npm 安装（推荐）

在 DeepSeek Harness Web 界面中：

1. 打开左侧边栏的 **插件（Plugins）**。
2. 点击 **添加插件（Add plugin）**，输入 `dsh-fake-logos` 并安装。
3. 启用 **品牌 Logo 替换**（若客户端未自动热加载，刷新一次浏览器页面即可）。

或通过命令行安装：

```bash
dsh plugin add dsh-fake-logos
```

### 通过 GitHub 安装

在 **插件 → 添加插件** 中输入：

```text
github:RickT34/dsh-fake-logos
```

### 本地目录开发安装

```bash
git clone git@github.com:RickT34/dsh-fake-logos.git
```

在 **插件 → 添加插件** 中填入本地克隆目录的绝对路径即可。

## 使用方法

- 在左侧栏打开 **插件 → 品牌 Logo 替换**，即可选择预设、配置自定义图标/文字或调整各项开关。
- 也可以在 **设置 → 通用 → 品牌 Logo 替换** 中点击 **配置** 快捷跳转。

### 配置项说明（`cordis.patch.yml`）

所有配置项均为实时（volatile）字段，既可在界面中修改，也可在 profile 的 `cordis.patch.yml` 中声明：

| 字段 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `preset` | `'default' \| 'none' \| 'codex' \| 'claude' \| 'claudecode' \| 'opencode' \| 'antigravity' \| 'cursor' \| 'openai' \| 'gemini' \| 'copilot' \| 'windsurf' \| 'cline' \| 'kiro' \| 'trae' \| 'custom'` | `'codex'` | 当前启用的品牌预设 |
| `monochrome` | `boolean` | `false` | 预设图标是否以单色（`currentColor`）渲染 |
| `replaceSidebar` | `boolean` | `true` | 是否替换侧边栏图标与文字标 |
| `replaceHero` | `boolean` | `true` | 是否替换首页标题图标 |
| `hideHomeWhale` | `boolean` | `true` | 是否关闭首页空白处点击触发的像素鲸鱼画布 |
| `customName` | `string` | `''` | 自定义侧边栏文字（仅在 `preset: 'custom'` 时生效） |
| `customIcon` | `string` | `''` | 自定义净化后的 `<svg>`、`https://` 或 `data:image/...` 图标（仅在 `preset: 'custom'` 时生效） |

## 兼容性与已知限制

- 适配 DeepSeek Harness Web UI（`>=0.2.2-rc.1 <0.3.0`）与 Node.js `>=20`。
- 浏览器标签页标题（`document.title`）由 DSH 构建参数 `DSH_CLIENT_TITLE` 控制，本插件不修改标签页标题。
- 自定义上传的图片以 Data URL 形式保存在 profile 配置中，建议使用轻量图片（最大 64 KB）。

## 开源协议与第三方版权说明

- 本插件代码基于 [MIT License](LICENSE) 开源。
- 内置产品矢量 Logo 图标来源为 [`@lobehub/icons-static-svg`](https://github.com/lobehub/lobe-icons)（`v1.94.0`，MIT 协议），完整声明见 [LICENSE-THIRD-PARTY.md](LICENSE-THIRD-PARTY.md)。
- 所有产品名称、Logo 与商标均归其各自所有者所有，仅用于个人界面自定义展示。
