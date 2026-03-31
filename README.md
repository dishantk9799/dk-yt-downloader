```
██████╗ ██╗  ██╗    ██████╗  ██████╗ ██╗    ██╗███╗   ██╗██╗      ██████╗  █████╗ ██████╗ ███████╗██████╗ 
██╔══██╗██║ ██╔╝    ██╔══██╗██╔═══██╗██║    ██║████╗  ██║██║     ██╔═══██╗██╔══██╗██╔══██╗██╔════╝██╔══██╗
██║  ██║█████╔╝     ██║  ██║██║   ██║██║ █╗ ██║██╔██╗ ██║██║     ██║   ██║███████║██║  ██║█████╗  ██████╔╝
██║  ██║██╔═██╗     ██║  ██║██║   ██║██║███╗██║██║╚██╗██║██║     ██║   ██║██╔══██║██║  ██║██╔══╝  ██╔══██╗
██████╔╝██║  ██╗    ██████╔╝╚██████╔╝╚███╔███╔╝██║ ╚████║███████╗╚██████╔╝██║  ██║██████╔╝███████╗██║  ██║
╚═════╝ ╚═╝  ╚═╝    ╚═════╝  ╚═════╝  ╚══╝╚══╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚══════╝╚═╝  ╚═╝
```

<div align="center">

**A retro-terminal styled YouTube downloader — download any video or audio in seconds.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-06B6D4?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Backend](https://img.shields.io/badge/Backend-Railway-7b45e7?style=flat-square)](https://railway.app/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

</div>

---

## ✦ What is this?

**DK Downloader** is a full-stack YouTube downloader with a terminal/ASCII aesthetic UI. Paste any YouTube URL, pick your format, and download — no account needed, no watermarks, no fluff.

---

## ✦ Features

- 🎵 **Audio formats** — MP3, M4A, WAV
- 🎬 **Video formats** — MP4 (best quality), MP4 720p, MP4 480p, WebM
- 🖥️ **ASCII / terminal UI** — retro green-on-black design with box-drawing characters
- ⚡ **Fast** — fetches video metadata instantly before download
- 📱 **Responsive** — works on mobile and desktop
- 🔍 **Video info preview** — shows title, channel, and duration before you commit to downloading

---

## ✦ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Tailwind CSS |
| Backend | Node.js / Express (deployed on Railway) |
| Video processing | yt-dlp |
| Hosting | Railway |

---

## ✦ Getting Started

### Prerequisites

- Node.js `v18+`
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/dk-downloader.git
cd dk-downloader

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at `http://localhost:5173`.

### Environment

The frontend points to the hosted backend by default:

```js
const BASE_URL = "https://backendy2mp3-production.up.railway.app";
```

To run with a local backend instead, change `BASE_URL` in `src/App.jsx`:

```js
const BASE_URL = "http://localhost:8080";
```

---

## ✦ Backend API

The backend exposes two endpoints:

### `POST /info`
Fetches metadata for a YouTube video.

**Request body:**
```json
{ "url": "https://www.youtube.com/watch?v=..." }
```

**Response:**
```json
{
  "title": "Video Title",
  "channel": "Channel Name",
  "duration": "3:45",
  "thumbnail": "https://..."
}
```

---

### `POST /download`
Downloads and streams the video/audio file.

**Request body:**
```json
{
  "url": "https://www.youtube.com/watch?v=...",
  "format": "mp3"
}
```

**Available format values:**

| Value | Description |
|-------|-------------|
| `mp3` | Audio — MP3 |
| `m4a` | Audio — M4A |
| `wav` | Audio — WAV |
| `mp4` | Video — Best quality |
| `mp4_720` | Video — 720p HD |
| `mp4_480` | Video — 480p SD |
| `webm` | Video — WebM |

**Response:** Binary file stream (triggers browser download).

---

## ✦ Project Structure

```
dk-downloader/
├── src/
│   └── App.jsx          # Main component (UI + logic, self-contained)
├── public/
├── index.html
├── tailwind.config.js
├── vite.config.js
└── README.md
```

---

## ✦ How It Works

```
User pastes URL
      │
      ▼
[ POST /info ] ──► Backend fetches metadata via yt-dlp
      │
      ▼
Video info displayed (title, channel, duration)
      │
User selects format
      │
      ▼
[ POST /download ] ──► Backend processes & streams file
      │
      ▼
Browser saves file automatically
```

---

## ✦ Screenshots

> Terminal-style UI with ASCII box components, retro green palette, and responsive layout.

```
┌────────────────────────────────────────┐
[ PASTE VIDEO URL ]──────────────────────
  > https://youtube.com/watch?v=...   █
└────────────────────────────────────────┘

             [ ⌕ SEARCH VIDEO ]

┌────────────────────────────────────────┐
[ VIDEO INFO ]──────────────────────────
  TITLE:    Never Gonna Give You Up
  CHANNEL:  Rick Astley
  DURATION: 3:33
└────────────────────────────────────────┘
```

---

## ✦ Legal Disclaimer

> This tool is built **for educational purposes only.**
> Downloading copyrighted content without permission may violate YouTube's Terms of Service and applicable copyright laws.
> Use responsibly and only download content you have the right to download.

---

## ✦ Contributing

Pull requests are welcome. For major changes, please open an issue first.

1. Fork the repo
2. Create your branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m 'add some feature'`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## ✦ License

[MIT](LICENSE) — © 2026 DK Downloader
