<div align="center">

# ✳ Seattle OS

### *A little environment for big ideas.*

**An interactive, desktop-style portfolio by [Priyanshu Sharma](https://github.com/Priyanshu-Technologies)**
Machine learning · Computer vision · RAG systems · Computational experiments

<br />

[![Live Demo](https://img.shields.io/badge/🚀_Live_Demo-Open_Seattle_OS-6B4C9A?style=for-the-badge)](https://seattle-os.princesharma99876.workers.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-Priyanshu--Technologies-171321?style=for-the-badge&logo=github)](https://github.com/Priyanshu-Technologies)

![Vanilla JS](https://img.shields.io/badge/Vanilla-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)
![Offline Ready](https://img.shields.io/badge/PWA-offline_ready-5A0FC8?style=flat-square)
![Cloudflare](https://img.shields.io/badge/Hosted_on-Cloudflare-F38020?style=flat-square&logo=cloudflare&logoColor=white)

</div>

---

##  Welcome!

Most portfolios are a scroll. **This one is a computer.**

Seattle OS turns my portfolio into a tiny desktop environment that lives in your browser. You can open windows, drag them around, poke through a file system, type commands into a terminal, and switch themes, all while learning about my work in machine learning, computer vision and retrieval-augmented generation.

> 💡 **First time here?** Open the [live site](https://seattle-os.princesharma99876.workers.dev/), wait for the boot sequence to finish, then open the **Terminal** and type `help`.

---

## 🧭 Table of Contents

- [ Highlights](#-highlights)
- [ Meet the Apps](#️-meet-the-apps)
- [ Try the Terminal](#️-try-the-terminal)
- [ Themes](#-themes)
- [ Window Management](#-window-management)
- [ Mobile Experience](#-mobile-experience)
- [ Run It Locally](#-run-it-locally)
- [ Make It Your Own](#️-make-it-your-own)
- [ Deploy](#️-deploy)
- [ Project Structure](#️-project-structure)
- [ Tech Notes](#-tech-notes)
- [ Get in Touch](#-get-in-touch)

---

## ✨ Highlights

| | Feature | What it means for you |
|---|---|---|
| 🪟 | **Real window system** | Focus, drag, resize, minimize, maximize and close |
| 💻 | **Working terminal** | Navigate my portfolio with real-feeling commands |
| 📁 | **Virtual file manager** | Browse a home directory and project folders |
| 🎨 | **Three themes** | Aubergine, Midnight and Sandstone, saved between visits |
| 📴 | **Offline-friendly** | A service worker caches the shell and CV after the first load |
| 📱 | **Touch-ready** | Windows become full-screen panels on small screens |
| ⚡ | **Zero dependencies** | No Node packages and no build step |

---

## 🖥️ Meet the Apps

Click a section to expand it.

<details>
<summary><b> About</b> — who I am</summary>

<br />

My profile, areas of interest and social links. Start here for the short version.

</details>

<details>
<summary><b> Projects</b> — the main event</summary>

<br />

Seven detailed project views. Each one includes:

-  Cover artwork
-  Technology stack
-  Engineering highlights
-  Available metrics
-  Repository links and live demos

</details>

<details>
<summary><b>📁 File Manager</b> — explore like it's your own machine</summary>

<br />

Browse a virtual home directory and project folders, and download my CV straight from the file system.

</details>

<details>
<summary><b> Terminal</b> — for the keyboard-first crowd</summary>

<br />

A command-line interface for getting around the portfolio. See [Try the Terminal](#️-try-the-terminal) below.

</details>

<details>
<summary><b>📄 Resume</b> — the professional snapshot</summary>

<br />

- Profile header with portrait and quick stats
- Experience timeline
- Education
- Skills inventory
- Clickable selected work
- Downloadable PDF

</details>

<details>
<summary><b>✉️ Contact</b> — say hello</summary>

<br />

Email, GitHub and LinkedIn, all in one window.

</details>

<details>
<summary><b>⚙️ Settings</b> — make it yours</summary>

<br />

Pick a theme. Your choice is saved in local storage, so it will be waiting for you next time.

</details>

---

## ⌨️ Try the Terminal

Open the **Terminal** app and give these a go:

| Command | What it does |
|---|---|
| `help` | Lists everything available |
| `whoami` | A quick introduction |
| `pwd` | Shows where you are |
| `ls` | Lists the current directory |
| `tree` | Shows the directory tree |
| `open` | Opens an app or project |
| `github` | Takes you to my GitHub |
| `linkedin` | Takes you to my LinkedIn |
| `email` | Starts an email to me |
| `resume` | Opens my resume |
| `date` | Prints the date |
| `clear` | Clears the screen |

```bash
$ whoami
$ ls
$ tree
$ open projects
```

>  **Tip:** Start with `help`, then `tree` to get a map of the whole portfolio.

---

## 🎨 Themes

Switch themes in **Settings**.

| Theme | Vibe |
|---|---|
|  **Aubergine** | Deep purple, the default. Cozy and focused |
|  **Midnight** | Dark and calm, easy on the eyes late at night |
|  **Sandstone** | Warm and light, for daytime browsing |

---

## 🪟 Window Management

Every app opens in its own window:

- 🎯 **Focus** — click a window to bring it to the front
- ✋ **Drag** — move windows by their title bars
- ↔️ **Resize** — pull the edges to fit your layout
- ➖ **Minimize** — tuck a window away
- ⬜ **Maximize** — give it the whole screen
- ❌ **Close** — done with it

---

## 📱 Mobile Experience

On smaller screens, each application opens as a **full-screen panel** and the desktop layout adapts for touch. You get the same content without wrestling with tiny windows.

---

## 🚀 Run It Locally

Seattle OS is **dependency-free**. There is no `npm install` and no build step.

```bash
# 1. Clone the repo
git clone https://github.com/Priyanshu-Technologies/Seattle-OS.git

# 2. Move into the folder
cd Seattle-OS

# 3. Start any static server
python3 -m http.server 4173
```

Then open **<http://localhost:4173>** in your browser. 🎉

> **Why a server?** Opening `index.html` directly with `file://` won't register the service worker. A local static server gives you the real experience.

---

## 🛠️ Make It Your Own

Want to use this as a template for your own portfolio? Here's where things live.

<details>
<summary><b>📝 Change the content</b></summary>

<br />

Everything about the profile, internship, education, skills and projects lives in **`portfolio.js`**. Each project record has a `cover` image that appears on its card and at the top of its project window.

</details>

<details>
<summary><b> Change the artwork and CV</b></summary>

<br />

- `assets/projects/` holds the project cover artwork (SVG)
- `assets/Priyanshu_Sharma_CV.pdf` is the downloadable résumé. Swap in your own file

</details>

<details>
<summary><b> Change the look</b></summary>

<br />

Styling and themes are in **`styles.css`**. Window behavior and app logic are in **`app.js`**.

</details>

<details>
<summary><b>⚠️ Don't forget the cache!</b></summary>

<br />

`sw.js` caches files for offline use. **Bump `CACHE_NAME` in `sw.js` whenever you change** `styles.css`, `app.js`, `portfolio.js` or `assets/projects/`. Otherwise returning visitors will keep seeing the old version.

</details>

<details>
<summary><b> About the avatar</b></summary>

<br />

The profile avatar is loaded from the public GitHub avatar endpoint, so it stays in sync with your GitHub profile picture.

</details>

---

## ☁️ Deploy

Seattle OS is a **static site**. Upload the folder to any static host. No server-side runtime is needed.

<details>
<summary><b>☁️ Cloudflare (current host)</b></summary>

<br />

1. Connect the repository to Cloudflare
2. Choose **None** as the framework preset
3. Leave the build command blank
4. Set the build output directory to `/`
5. Deploy

</details>

<details>
<summary><b>🐙 GitHub Pages</b></summary>

<br />

1. Create a public repository
2. Commit the project files to the repository root
3. Open **Settings → Pages**
4. Select **Deploy from a branch**, choose `main` and `/ (root)`, then save
5. Wait for the deployment and open the URL shown in the Pages settings

</details>

<details>
<summary><b>🟢 Netlify</b></summary>

<br />

1. Import the repository, or drag the folder into Netlify Drop
2. Set the publish directory to `.` and leave the build command empty
3. Deploy

</details>

### ✅ Pre-launch checklist

- [ ] Confirm CV facts, contact details and project availability are current
- [ ] Test every hosted demo from a fresh browser session
- [ ] Add a canonical URL and a sitemap once the final domain is chosen
- [ ] Check the mobile layout on a real phone
- [ ] Bump `CACHE_NAME` in `sw.js` after any content change

---

## 🗂️ Project Structure

```
Seattle-OS/
├── index.html           # App shell and boot screen
├── styles.css           # Layout, windows and themes
├── app.js               # Window manager, apps and terminal
├── portfolio.js         # Profile, experience, skills and project data
├── sw.js                # Service worker for offline caching
├── site.webmanifest     # Install and PWA metadata
├── favicon.svg          # Site icon
├── _headers             # Static host response headers
├── robots.txt           # Crawler rules
├── assets/
│   ├── Priyanshu_Sharma_CV.pdf
│   └── projects/        # Project cover artwork (SVG)
└── README.md
```

---

##  Tech Notes

- **Stack:** plain HTML, CSS and JavaScript, with no frameworks and no bundler
- **Persistence:** theme preference is stored in local storage
- **Offline:** a service worker caches the desktop shell and CV after the first successful load
- **Fallback:** if JavaScript is disabled, visitors see a message with a link to my GitHub profile
- **Accessibility and SEO:** descriptive meta tags, Open Graph and Twitter card metadata, and a web manifest

---

## 🤝 Feedback & Contributions

Found a bug, a typo or a rough edge? Ideas are welcome.

1. 🍴 Fork the repo
2. 🌿 Create a branch: `git checkout -b feature/my-idea`
3. 💾 Commit your changes
4. 📬 Open a pull request, or just [open an issue](https://github.com/Priyanshu-Technologies/Seattle-OS/issues)

If you borrow the idea for your own portfolio, I'd love to see what you build. ⭐ A star on the repo is always appreciated!

---

## 📬 Get in Touch

<div align="center">

**Let's build something interesting together.**

[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-6B4C9A?style=for-the-badge&logo=cloudflare&logoColor=white)](https://seattle-os.princesharma99876.workers.dev/)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-171321?style=for-the-badge&logo=github)](https://github.com/Priyanshu-Technologies)

*Built with curiosity by **Priyanshu Sharma** ✳*

</div>