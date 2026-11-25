# dsh-fake-logos

English | [中文](README.zh.md)

A lightweight [DeepSeek Harness (DSH)](https://github.com/deepseek-ai/deepseek-harness) Web UI plugin that replaces the DeepSeek Harness sidebar logo, wordmark, and home hero mark with another AI coding tool's logo, a custom SVG/image and label, or hides the branding completely.

## Features

- **13 built-in brand presets** (vector marks with color and monochrome variants + wordmarks):
  - **Codex**, **Claude**, **Claude Code**, **OpenCode**, **Antigravity**, **Cursor**, **OpenAI**, **Gemini**, **GitHub Copilot**, **Windsurf**, **Cline**, **Kiro**, **Trae**
- **Hide branding (`None`)**: Removes the sidebar logo, sidebar wordmark, and home hero mark. When the sidebar is collapsed to its icon rail, a neutral expand icon stays visible so the toggle button remains usable.
- **Restore default (`Default`)**: Keep the native DeepSeek Harness branding without uninstalling the plugin.
- **Custom brand (`Custom`)**:
  - Set a custom text label (or leave blank for an icon-only look)
  - Paste inline `<svg>` markup, enter an `https://` image URL, or upload an SVG / PNG / JPEG / WebP / GIF file (up to 64 KB)
  - Uploaded and pasted SVGs are sanitized against an element and attribute allowlist before rendering and saving
- **Granular display toggles**:
  - Replace sidebar logo
  - Replace home hero mark
  - Disable the blank-home click-triggered pixel whale animation
  - Monochrome icon mode (inherits the active theme's text color)
- **Instant persistence**: Changes apply immediately through DSH's profile settings document (`ctx.configForms`) with no page reload or server restart required. Disabling or uninstalling the plugin immediately restores the default DeepSeek Harness branding.

## Installation

### From npm (recommended)

In the DeepSeek Harness Web UI:

1. Open **Plugins** in the left sidebar.
2. Click **Add plugin**, enter `dsh-fake-logos`, and install.
3. Enable **Brand logo switcher** (refresh the browser tab once if the UI has not loaded the new client bundle yet).

Or via CLI:

```bash
dsh plugin add dsh-fake-logos
```

### From GitHub

In **Plugins → Add plugin**, enter:

```text
github:RickT34/dsh-fake-logos
```

### From a local checkout

```bash
git clone git@github.com:RickT34/dsh-fake-logos.git
```

In **Plugins → Add plugin**, enter the absolute path to the cloned directory.

## Usage

- Open **Plugins → Brand logo switcher** to pick a preset, customize your icon/text, or adjust display toggles.
- You can also jump there from **Settings → General → Brand logo → Configure**.

### Configuration schema (`cordis.patch.yml`)

All options are volatile and editable in the UI, or declaratively in your profile's `cordis.patch.yml`:

| Field | Type | Default | Description |
| --- | --- | --- | --- |
| `preset` | `'default' \| 'none' \| 'codex' \| 'claude' \| 'claudecode' \| 'opencode' \| 'antigravity' \| 'cursor' \| 'openai' \| 'gemini' \| 'copilot' \| 'windsurf' \| 'cline' \| 'kiro' \| 'trae' \| 'custom'` | `'codex'` | Active brand preset |
| `monochrome` | `boolean` | `false` | Render preset icons in monochrome (`currentColor`) |
| `replaceSidebar` | `boolean` | `true` | Replace the sidebar brand mark and wordmark |
| `replaceHero` | `boolean` | `true` | Replace the home hero brand mark |
| `hideHomeWhale` | `boolean` | `true` | Suppress the blank-home click-triggered pixel whale canvas |
| `customName` | `string` | `''` | Custom sidebar text label (used when `preset` is `'custom'`) |
| `customIcon` | `string` | `''` | Custom sanitized `<svg>`, `https://` URL, or `data:image/...` URL (used when `preset` is `'custom'`) |

## Compatibility & Limitations

- Targets DeepSeek Harness Web UI (`>=0.2.2-rc.1 <0.3.0`) and Node.js `>=20`.
- Browser tab title (`document.title`) is controlled by the DSH build configuration (`DSH_CLIENT_TITLE`) and is not modified by this plugin.
- Custom uploaded images are stored as data URLs in profile configuration; keep files small (max 64 KB).

## License & Third-Party Attribution

- Plugin code is licensed under the [MIT License](LICENSE).
- Built-in product vector logos are sourced from [`@lobehub/icons-static-svg`](https://github.com/lobehub/lobe-icons) (`v1.94.0`, MIT License). See [LICENSE-THIRD-PARTY.md](LICENSE-THIRD-PARTY.md) for full notices.
- All product names, logos, and trademarks belong to their respective owners and are included solely for personal UI customization.
