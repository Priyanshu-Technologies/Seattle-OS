(() => {
  'use strict';

  const PROFILE = window.SEATTLE_PROFILE;
  const PROJECTS = window.SEATTLE_PROJECTS;
  const allowedThemes = ['aubergine', 'midnight', 'sand'];
  let savedTheme = 'aubergine';
  try { savedTheme = localStorage.getItem('seattle-os-theme') || 'aubergine'; } catch (_) {}
  const state = { windows: [], z: 20, id: 0, theme: allowedThemes.includes(savedTheme) ? savedTheme : 'aubergine', filePath: ['home', 'priyanshu'] };
  const appMeta = {
    about: { title: 'About Priyanshu Sharma', width: 700, height: 640 },
    files: { title: 'File Manager', width: 870, height: 585 },
    terminal: { title: 'Terminal', width: 770, height: 455 },
    projects: { title: 'Projects', width: 900, height: 625 },
    resume: { title: 'Resume & Experience', width: 880, height: 720 },
    contact: { title: 'Contact', width: 640, height: 535 },
    settings: { title: 'Settings', width: 660, height: 590 }
  };

  const fsRoot = {
    name: 'home', type: 'folder', children: [{
      name: 'priyanshu', type: 'folder', children: [
        { name: 'Desktop', type: 'folder', children: [{ name: 'Welcome.txt', type: 'file', content: 'Welcome to Seattle OS. Explore projects, learn about the work, or open the terminal to discover the workspace.' }] },
        { name: 'Documents', type: 'folder', children: [{ name: 'README.txt', type: 'file', content: 'Seattle OS is an interactive workspace for exploring Priyanshu Sharma’s engineering projects, experience, education and technical interests.' }, { name: 'Priyanshu_Sharma_CV.pdf', type: 'file', content: 'Priyanshu Sharma — Machine Learning, Computer Vision, RAG & Applied AI. Download the verified CV using the button below.', downloadUrl: PROFILE.resume }] },
        { name: 'Projects', type: 'folder', children: PROJECTS.map((project) => ({
          name: project.folder, type: 'folder', projectId: project.id, children: [
            { name: 'README.md', type: 'file', content: project.description, projectId: project.id },
            { name: 'project-info.txt', type: 'file', content: project.details, projectId: project.id }
          ]
        })) },
        { name: 'Pictures', type: 'folder', children: [{ name: 'wallpaper-library', type: 'folder', children: [] }] }
      ]
    }]
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const escapeHTML = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const slug = (value) => String(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  function nodeAt(parts) {
    let current = fsRoot;
    for (const part of parts.slice(1)) {
      current = current.children?.find((node) => node.name.toLowerCase() === part.toLowerCase());
      if (!current) return undefined;
    }
    return current;
  }

  function projectById(id) { return PROJECTS.find((project) => project.id === id); }

  function showBoot() {
    const lines = [
      'Initializing Seattle core services',
      'Mounting virtual home directory',
      'Loading application registry',
      'Starting window compositor',
      'Preparing desktop environment'
    ];
    const log = $('#boot-log');
    const bar = $('#boot-progress-bar');
    const percent = $('#boot-percent');
    let progress = 4;
    let line = 0;
    const interval = window.setInterval(() => {
      progress = Math.min(progress + 19, 100);
      line = Math.min(line + 1, lines.length);
      bar.style.width = `${progress}%`;
      percent.textContent = `${progress}%`;
      log.innerHTML = lines.slice(0, line).map((text) => `<div class="boot-log-line"><span class="boot-ok">✧ [ OK ]</span> ${escapeHTML(text)}</div>`).join('');
      if (line < lines.length) log.innerHTML += `<div class="boot-log-line boot-current">[···] ${escapeHTML(lines[line])}</div>`;
      if (progress >= 100) {
        window.clearInterval(interval);
        window.setTimeout(() => {
          $('#boot-screen').hidden = true;
          $('#desktop-shell').hidden = false;
          $('#desktop-shell').className = `desktop-shell theme-${state.theme}`;
          updateClock();
          window.setInterval(updateClock, 30_000);
        }, 480);
      }
    }, 390);
  }

  function updateClock() {
    const now = new Date();
    $('#panel-date').textContent = now.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
    $('#panel-time').textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  function openApp(appId, projectId = '') {
    const identity = `${appId}:${projectId}`;
    const existing = state.windows.find((item) => item.identity === identity);
    if (existing) {
      existing.minimized = false;
      existing.el.hidden = false;
      focusWindow(existing);
      updateDock();
      $('#welcome-widget').hidden = true;
      return existing;
    }
    const meta = appMeta[appId];
    if (!meta) return null;
    const mobile = window.matchMedia('(max-width: 700px)').matches;
    const offset = (state.windows.length % 5) * 24;
    const width = Math.min(meta.width, window.innerWidth - 28);
    const height = Math.min(meta.height, window.innerHeight - 110);
    const win = {
      id: ++state.id, identity, appId, projectId, title: projectId ? `Projects — ${projectById(projectId)?.name ?? projectId}` : meta.title,
      x: mobile ? 0 : Math.max(12, (window.innerWidth - width) / 2 + offset),
      y: mobile ? 42 : Math.max(50, (window.innerHeight - height) / 2 + offset - 13),
      width, height, zIndex: ++state.z, minimized: false, maximized: false, el: null
    };
    const el = document.createElement('section');
    el.className = 'app-window';
    el.dataset.windowId = String(win.id);
    el.style.cssText = `left:${win.x}px;top:${win.y}px;width:${win.width}px;height:${win.height}px;z-index:${win.zIndex}`;
    el.innerHTML = `
      <div class="window-titlebar">
        <div class="window-traffic-lights">
          <button class="traffic close" data-window-action="close" aria-label="Close window">×</button>
          <button class="traffic minimize" data-window-action="minimize" aria-label="Minimize window">−</button>
          <button class="traffic maximize" data-window-action="maximize" aria-label="Maximize window">□</button>
        </div>
        <div class="window-title">${escapeHTML(win.title)}</div>
        <button class="window-title-action" data-window-action="maximize" aria-label="Toggle maximize">⛶</button>
      </div>
      <div class="window-body">${renderApp(win)}</div>
      <div class="window-resize-handle" aria-label="Resize window"></div>`;
    win.el = el;
    $('#desktop-workspace').appendChild(el);
    state.windows.push(win);
    attachWindowEvents(win);
    attachAppEvents(win);
    focusWindow(win);
    $('#welcome-widget').hidden = true;
    updateDock();
    return win;
  }

  function focusWindow(win) {
    win.zIndex = ++state.z;
    win.el.style.zIndex = String(win.zIndex);
    $('#active-app-label').textContent = win.title;
    state.windows.forEach((item) => item.el.classList.toggle('window-focused', item.id === win.id));
    updateDock();
  }

  function closeWindow(win) {
    win.el.remove();
    state.windows = state.windows.filter((item) => item.id !== win.id);
    const top = state.windows.filter((item) => !item.minimized).sort((a, b) => b.zIndex - a.zIndex)[0];
    if (top) focusWindow(top);
    else {
      $('#active-app-label').textContent = 'Desktop';
      $('#welcome-widget').hidden = false;
    }
    updateDock();
  }

  function minimizeWindow(win) {
    win.minimized = true;
    win.el.hidden = true;
    const top = state.windows.filter((item) => !item.minimized).sort((a, b) => b.zIndex - a.zIndex)[0];
    $('#active-app-label').textContent = top?.title ?? 'Desktop';
    updateDock();
  }

  function maximizeWindow(win) {
    win.maximized = !win.maximized;
    win.el.classList.toggle('is-maximized', win.maximized);
    if (win.maximized) {
      win.el.style.left = ''; win.el.style.top = ''; win.el.style.width = ''; win.el.style.height = '';
    } else {
      win.el.style.left = `${win.x}px`; win.el.style.top = `${win.y}px`;
      win.el.style.width = `${win.width}px`; win.el.style.height = `${win.height}px`;
    }
    focusWindow(win);
  }

  function attachWindowEvents(win) {
    const header = $('.window-titlebar', win.el);
    const resizeHandle = $('.window-resize-handle', win.el);
    let drag = null;
    let resize = null;

    header.addEventListener('pointerdown', (event) => {
      if (event.target.closest('button') || win.maximized || window.matchMedia('(max-width: 700px)').matches) return;
      drag = { x: event.clientX, y: event.clientY, originX: win.x, originY: win.y };
      header.setPointerCapture(event.pointerId);
      focusWindow(win);
    });
    header.addEventListener('pointermove', (event) => {
      if (!drag) return;
      win.x = Math.max(8, Math.min(drag.originX + event.clientX - drag.x, window.innerWidth - 180));
      win.y = Math.max(43, Math.min(drag.originY + event.clientY - drag.y, window.innerHeight - 110));
      win.el.style.left = `${win.x}px`; win.el.style.top = `${win.y}px`;
    });
    const stopDrag = () => { drag = null; };
    header.addEventListener('pointerup', stopDrag);
    header.addEventListener('pointercancel', stopDrag);

    resizeHandle.addEventListener('pointerdown', (event) => {
      if (win.maximized || window.matchMedia('(max-width: 700px)').matches) return;
      event.stopPropagation();
      resize = { x: event.clientX, y: event.clientY, width: win.width, height: win.height };
      resizeHandle.setPointerCapture(event.pointerId);
      focusWindow(win);
    });
    resizeHandle.addEventListener('pointermove', (event) => {
      if (!resize) return;
      win.width = Math.min(Math.max(360, resize.width + event.clientX - resize.x), window.innerWidth - win.x - 12);
      win.height = Math.min(Math.max(280, resize.height + event.clientY - resize.y), window.innerHeight - win.y - 90);
      win.el.style.width = `${win.width}px`; win.el.style.height = `${win.height}px`;
    });
    const stopResize = () => { resize = null; };
    resizeHandle.addEventListener('pointerup', stopResize);
    resizeHandle.addEventListener('pointercancel', stopResize);
    win.el.addEventListener('pointerdown', () => focusWindow(win));
  }

  function updateDock() {
    $$('.dock-item').forEach((button) => {
      const appId = button.dataset.openApp;
      const running = state.windows.some((win) => win.appId === appId);
      button.classList.toggle('is-running', running);
      const indicator = $('i', button);
      if (indicator) indicator.style.display = running ? 'block' : 'none';
    });
  }

  function renderApp(win) {
    switch (win.appId) {
      case 'about': return renderAbout();
      case 'files': return renderFileManager(['home', 'priyanshu']);
      case 'terminal': return renderTerminal();
      case 'projects': return win.projectId ? renderProjectDetail(win.projectId) : renderProjects();
      case 'resume': return renderResume();
      case 'contact': return renderContact();
      case 'settings': return renderSettings();
      default: return '<div class="app-surface app-padding">Application not found.</div>';
    }
  }

  function renderAbout() {
    return `<div class="about-app app-surface">
      <div class="about-cover"><div class="about-avatar about-avatar-photo"><img src="${escapeHTML(PROFILE.avatar)}" alt="Portrait of Priyanshu Sharma" loading="lazy"></div><div class="about-code">PROFILE / NEW DELHI, IN</div></div>
      <div class="about-content"><div class="eyebrow">THE PERSON BEHIND THE WORKSPACE</div>
        <h2>${escapeHTML(PROFILE.name)}<span class="verified-dot" title="Profile owner"></span></h2><h3>${escapeHTML(PROFILE.headline)}</h3>
        <p>${escapeHTML(PROFILE.description)}</p>
        <div class="about-meta"><span>⌖ ${escapeHTML(PROFILE.location)}</span><span>▤ ${escapeHTML(PROFILE.educationStatus)}</span><span>⌘ ${escapeHTML(PROFILE.publicRepoCount)} public repositories</span></div>
        <div class="about-divider"></div><h4>Areas I enjoy exploring</h4>
        <div class="interest-list">${PROFILE.interests.map((item) => `<span>${escapeHTML(item)}</span>`).join('')}</div>
        <div class="about-links"><a class="text-link" href="${escapeHTML(PROFILE.github)}" target="_blank" rel="noreferrer">⌘ GitHub ↗</a><a class="text-link" href="${escapeHTML(PROFILE.linkedin)}" target="_blank" rel="noreferrer">in LinkedIn ↗</a><a class="text-link" href="${escapeHTML(PROFILE.resume)}" download>⇩ Download CV</a></div>
      </div></div>`;
  }

  function renderProjects() {
    const icons = ['⌘', '▦', '⬡', '◉', '∿', '◎', '⌁'];
    const colors = ['#72539a', '#4f89a7', '#608c70', '#c28a63', '#9d7a4f', '#7867a7', '#4b8c87'];
    const ordered = [...PROJECTS].sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return `<div class="projects-app app-surface"><div class="app-heading-row"><div><div class="eyebrow">/home/priyanshu/Projects</div><h2>Project workspace</h2><p>Systems, experiments and tools built across AI, engineering and scientific computing.</p></div><span class="project-count">✧ ${PROJECTS.length} projects</span></div>
      <div class="projects-grid">${ordered.map((project, index) => `<button class="project-card ${project.featured ? 'project-featured' : ''}" data-open-project="${escapeHTML(project.id)}"><div class="project-cover"><img src="${escapeHTML(project.cover)}" alt="${escapeHTML(project.name)} project cover" loading="lazy" width="800" height="450"></div><div class="project-card-top"><span class="project-symbol" style="background:${colors[index % colors.length]}">${icons[index % icons.length]}</span><span class="project-open">↗</span></div><div class="project-category">${escapeHTML(project.category)}</div><h3>${escapeHTML(project.name)}</h3><p>${escapeHTML(project.description)}</p><div class="project-tags">${project.stack.slice(0, 3).map((tag) => `<span>${escapeHTML(tag)}</span>`).join('')}</div><div class="project-status"><span></span>${escapeHTML(project.status)}</div></button>`).join('')}</div>
      <div class="app-footnote">Select any project to open its application window. Repository and live-demo links are available where published.</div></div>`;
  }

  function renderProjectDetail(id) {
    const project = projectById(id);
    if (!project) return '<div class="app-surface app-padding">Project not found.</div>';
    const links = [
      project.demo ? `<a class="primary-link" href="${escapeHTML(project.demo)}" target="_blank" rel="noopener noreferrer">Open live application ↗</a>` : '',
      project.github ? `<a class="secondary-link" href="${escapeHTML(project.github)}" target="_blank" rel="noreferrer">View source on GitHub ↗</a>` : '',
      project.paper ? `<a class="secondary-link" href="${escapeHTML(project.paper)}" target="_blank" rel="noreferrer">Read technical paper ↗</a>` : ''
    ].filter(Boolean).join('');
    const metrics = (project.metrics ?? []).map((metric) => `<div class="metric-card"><strong>${escapeHTML(metric.value)}</strong><span>${escapeHTML(metric.label)}</span></div>`).join('');
    const highlights = (project.highlights ?? []).map((item) => `<li>${escapeHTML(item)}</li>`).join('');
    const files = (project.files ?? []).map((file) => `<div><span class="file-dot ${file.endsWith('/') ? 'folder-dot' : ''}"></span>${escapeHTML(file)}</div>`).join('');
    const experiments = (project.experiments ?? []).map((experiment) => `<div class="experiment-row"><strong>${escapeHTML(experiment.label)}</strong><span>${escapeHTML(experiment.summary)}</span></div>`).join('');
    return `<div class="project-detail app-surface"><div class="detail-hero"><div class="eyebrow">PROJECT / ${escapeHTML(project.category.toUpperCase())}</div><h2>${escapeHTML(project.name)}</h2><p>${escapeHTML(project.description)}</p><span class="detail-status"><span></span>${escapeHTML(project.status)}</span></div>
      <section class="detail-visual"><figure class="detail-cover"><img data-detail-image src="${escapeHTML(project.cover)}" alt="${escapeHTML(project.name)} project visual" width="800" height="450"><figcaption data-detail-caption>${escapeHTML(project.name)} · ${escapeHTML(project.category)}</figcaption></figure></section>
      ${metrics ? `<section class="detail-metrics">${metrics}</section>` : ''}
      <section class="detail-section"><h3>Overview</h3><p>${escapeHTML(project.details)}</p></section>
      ${highlights ? `<section class="detail-section"><h3>Engineering highlights</h3><ul class="detail-highlights">${highlights}</ul></section>` : ''}
      ${experiments ? `<section class="detail-section"><h3>Evaluation experiments</h3><div class="experiment-list">${experiments}</div></section>` : ''}
      <section class="detail-section"><h3>Technology stack</h3><div class="detail-tags">${project.stack.map((tag) => `<span>${escapeHTML(tag)}</span>`).join('')}</div></section>
      ${files ? `<section class="detail-section"><h3>Repository structure</h3><div class="detail-file-list">${files}</div></section>` : ''}<div class="detail-links"><span class="detail-links-label">Explore this project</span>${links || '<span class="detail-note">Public repository link not listed.</span>'}</div></div>`;
  }

  function renderFileManager(parts, preview = null) {
    const current = nodeAt(parts);
    const items = current?.children ?? [];
    const breadcrumbs = parts.map((part, index) => `<button class="breadcrumb" data-breadcrumb="${index}">${escapeHTML(part)}</button>${index < parts.length - 1 ? '<span>›</span>' : ''}`).join('');
    const fileItems = items.map((node) => {
      const projectId = node.projectId ? `data-open-project="${escapeHTML(node.projectId)}"` : '';
      const folderAction = node.type === 'folder' && !node.projectId ? `data-navigate="${escapeHTML([...parts, node.name].join('/'))}"` : '';
      const fileAction = node.type === 'file' ? `data-preview="${escapeHTML(node.name)}"` : '';
      return `<button class="file-item" ${projectId || folderAction || fileAction}><span class="file-art ${node.type}">${node.type === 'folder' ? '▰' : '▤'}</span><span class="file-name">${escapeHTML(node.name)}${node.type === 'folder' ? '/' : ''}</span></button>`;
    }).join('');
    const previewNode = preview ? items.find((node) => node.name === preview) : null;
    const previewPanel = previewNode ? `<div class="file-preview"><div class="preview-title">▤ ${escapeHTML(previewNode.name)}<button data-close-preview>×</button></div><p>${escapeHTML(previewNode.content ?? '')}</p>${previewNode.downloadUrl ? `<a class="primary-link file-download-link" href="${escapeHTML(previewNode.downloadUrl)}" download>Download PDF ↧</a>` : ''}</div>` : '';
    const pathLabel = `/${parts.join('/')}`;
    return `<div class="file-manager app-surface"><div class="file-toolbar"><div class="file-nav-buttons"><button data-go-up ${parts.length <= 1 ? 'disabled' : ''} aria-label="Go up">←</button><button data-go-home aria-label="Home">⌂</button></div><div class="file-path">${breadcrumbs}</div><label class="file-search">⌕ <input data-file-search placeholder="Search this folder"></label></div>
      <div class="file-manager-layout"><aside class="file-sidebar"><p>PLACES</p><button class="sidebar-place selected" data-shortcut="home">⌂ Home</button><button class="sidebar-place" data-shortcut="Desktop">▰ Desktop</button><button class="sidebar-place" data-shortcut="Documents">▤ Documents</button><button class="sidebar-place" data-shortcut="Projects">▣ Projects</button></aside>
      <div class="file-content"><div class="file-content-heading"><div><strong>${escapeHTML(parts[parts.length - 1])}</strong><span>${items.length} items</span></div><button class="icon-quiet" data-go-up ${parts.length <= 1 ? 'disabled' : ''}>↗</button></div>
      ${items.length ? `<div class="file-grid">${fileItems}</div>` : '<div class="empty-folder">▱<span>This folder is empty</span></div>'}${previewPanel}<div class="file-path-status">${escapeHTML(pathLabel)}</div></div></div></div>`;
  }

  function renderTerminal() {
    return `<div class="terminal-app"><div class="terminal-toolbar"><div>›_ <span>Terminal</span></div><span class="terminal-session">seattle shell · user session</span></div><div class="terminal-output"><div class="terminal-log"><div class="terminal-line success">SEATTLE TERMINAL 1.0</div><div class="terminal-line muted">Welcome. Explore the workspace from the command line.</div><div class="terminal-line muted">Type <code>help</code> to see available commands.</div><div class="terminal-line">&nbsp;</div></div><form class="terminal-input-row"><span class="terminal-prompt">priyanshu@seattle:~$</span><input class="terminal-command" autocomplete="off" spellcheck="false" aria-label="Terminal command"><span class="terminal-caret"></span></form></div></div>`;
  }

  function renderResume() {
    const groups = PROFILE.skillGroups ?? [];
    const experience = PROFILE.experience ?? [];
    const education = PROFILE.education ?? [];
    const deployed = PROJECTS.filter((project) => project.demo).length;
    const stats = [
      { value: String(experience.length), label: experience.length === 1 ? 'Internship' : 'Roles held' },
      { value: String(PROJECTS.length), label: 'Projects built' },
      { value: String(deployed), label: 'Live deployments' },
      { value: String(groups.reduce((total, group) => total + group.items.length, 0)), label: 'Skills & tools' }
    ];
    const experienceCards = experience.map((item) => `<article class="resume-card resume-experience-item">
        <div class="resume-timeline-dot"></div>
        <div class="resume-experience-head"><div class="resume-role"><strong>${escapeHTML(item.role)}</strong><span class="resume-org">${escapeHTML(item.organization)}</span></div><span class="resume-period">${escapeHTML(item.period)}</span></div>
        <p>${escapeHTML(item.summary)}</p>
        <ul class="resume-points">${item.contributions.map((line) => `<li>${escapeHTML(line)}</li>`).join('')}</ul>
        ${item.link ? `<a class="resume-inline-link" href="${escapeHTML(item.link)}" target="_blank" rel="noopener noreferrer">${escapeHTML(item.linkLabel || 'Related repository')} ↗</a>` : ''}
      </article>`).join('');
    const educationCards = education.map((item) => `<article class="resume-card resume-education-item">
        <div class="resume-edu-mark">⌂</div>
        <div class="resume-edu-body"><strong>${escapeHTML(item.institution)}</strong><span>${escapeHTML(item.qualification)}</span><span class="resume-edu-spec">${escapeHTML(item.specialization)}</span></div>
        <span class="resume-period">${escapeHTML(item.period)}</span>
      </article>`).join('');
    const skillCards = groups.map((group) => `<div class="resume-skill-group">
        <strong>${escapeHTML(group.title)}</strong>
        <div class="resume-skill-chips">${group.items.map((entry) => `<span>${escapeHTML(entry)}</span>`).join('')}</div>
      </div>`).join('');
    const workRows = PROJECTS.map((project) => `<button class="resume-work-row" data-open-project="${escapeHTML(project.id)}">
        <span class="resume-work-name"><strong>${escapeHTML(project.name)}</strong><small>${escapeHTML(project.category)}</small></span>
        <span class="resume-work-note">${escapeHTML(project.status)}</span>
        <b>↗</b>
      </button>`).join('');
    const contacts = [
      { label: PROFILE.email, href: `mailto:${PROFILE.email}`, external: false },
      { label: 'GitHub', href: PROFILE.github, external: true },
      { label: 'LinkedIn', href: PROFILE.linkedin, external: true }
    ];
    return `<div class="resume-app app-surface">
      <header class="resume-hero">
        <div class="resume-identity">
          <div class="resume-photo"><img src="${escapeHTML(PROFILE.avatar)}" alt="Portrait of ${escapeHTML(PROFILE.name)}" loading="lazy" width="460" height="460"></div>
          <div>
            <div class="eyebrow">CURRICULUM VITAE / PROFESSIONAL PROFILE</div>
            <h2>${escapeHTML(PROFILE.name)}</h2>
            <p class="resume-headline">${escapeHTML(PROFILE.headline)}</p>
            <div class="resume-chips"><span>⌖ ${escapeHTML(PROFILE.location)}</span><span>▤ ${escapeHTML(PROFILE.educationStatus)}</span><span>◈ ${escapeHTML(PROFILE.role)}</span></div>
          </div>
        </div>
        <div class="resume-hero-actions">
          <a class="primary-link resume-download" href="${escapeHTML(PROFILE.resume)}" download>Download CV PDF ↧</a>
          <a class="secondary-link" href="${escapeHTML(PROFILE.github)}" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
          <a class="secondary-link" href="${escapeHTML(PROFILE.linkedin)}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        </div>
      </header>
      <div class="resume-stats">${stats.map((stat) => `<div class="resume-stat"><strong>${escapeHTML(stat.value)}</strong><span>${escapeHTML(stat.label)}</span></div>`).join('')}</div>
      <section class="resume-section"><h3><span>▤</span> Professional experience</h3><div class="resume-timeline">${experienceCards}</div></section>
      <section class="resume-section"><h3><span>⌂</span> Education</h3><div class="resume-education">${educationCards}</div></section>
      <section class="resume-section"><h3><span>⌘</span> Technical toolkit</h3><div class="resume-skills-grid">${skillCards}</div></section>
      <section class="resume-section"><h3><span>▦</span> Selected engineering work</h3><div class="resume-work-list">${workRows}</div><p class="resume-hint">Select any project to open its window inside Seattle OS.</p></section>
      <footer class="resume-footer">
        <div class="resume-contact-line">${contacts.map((contact) => `<a href="${escapeHTML(contact.href)}"${contact.external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHTML(contact.label)}</a>`).join('')}</div>
        <span class="resume-footer-note">Verified profile · updated November 2026</span>
      </footer>
    </div>`;
  }

  function renderContact() {
    const items = [
      { label: 'Email', detail: PROFILE.email, href: `mailto:${PROFILE.email}`, icon: '✉', kind: 'email' },
      { label: 'GitHub', detail: 'Repositories, source code and experiments', href: PROFILE.github, icon: '⌘', kind: 'github' },
      { label: 'LinkedIn', detail: 'Professional profile and connections', href: PROFILE.linkedin, icon: 'in', kind: 'linkedin' }
    ];
    return `<div class="contact-app app-surface"><div class="contact-hero"><div class="contact-orbit">✉</div><div class="eyebrow">COMMUNICATIONS</div><h2>Let's connect.</h2><p>Have an interesting problem, a collaboration idea, or a question about one of the projects? I'd be glad to hear from you.</p></div><div class="contact-options">${items.map((item) => `<a class="contact-option" href="${escapeHTML(item.href)}" ${item.kind === 'email' ? '' : 'target="_blank" rel="noreferrer"'}><span class="contact-option-icon ${item.kind}">${item.icon}</span><span><strong>${escapeHTML(item.label)}</strong><small>${escapeHTML(item.detail)}</small></span><b>↗</b></a>`).join('')}</div><a class="contact-compose" href="mailto:${escapeHTML(PROFILE.email)}?subject=Hello%20Priyanshu">Compose a message <span>↗</span></a></div>`;
  }

  function renderSettings() {
    const themes = [
      ['aubergine', 'Aubergine', 'Seattle’s signature purple atmosphere', ['#171321', '#5b3d7e', '#b79bd9']],
      ['midnight', 'Midnight', 'Cool, deep blue-grey tones', ['#101722', '#28445d', '#8cb5d5']],
      ['sand', 'Sandstone', 'Warm light desktop surfaces', ['#28251f', '#a17d50', '#e0c79f']]
    ];
    return `<div class="settings-app app-surface"><div class="settings-heading"><div class="settings-main-icon">⚙</div><div><div class="eyebrow">SYSTEM PREFERENCES</div><h2>Personalize Seattle</h2><p>Choose a desktop atmosphere.</p></div></div>
      <section class="settings-section"><h3>◉ Appearance</h3><div class="theme-options">${themes.map(([id, name, description, colors]) => `<button class="theme-option ${state.theme === id ? 'selected' : ''}" data-theme="${id}"><span class="theme-swatch">${colors.map((color) => `<i style="background:${color}"></i>`).join('')}</span><span><strong>${name}</strong><small>${description}</small></span><span class="theme-radio"></span></button>`).join('')}</div></section>
      <section class="settings-section"><h3>◐ Environment</h3><div class="settings-info-row"><span>☼ Workspace</span><strong>Seattle desktop</strong></div><div class="settings-info-row"><span>▣ Layout</span><strong>Responsive</strong></div><div class="settings-info-row"><span>◉ Version</span><strong>1.0.0</strong></div></section>
      <p class="settings-footnote">Your appearance preference is saved on this device.</p></div>`;
  }

  function attachAppEvents(win) {
    const body = $('.window-body', win.el);
    body.addEventListener('click', (event) => {
      const target = event.target.closest('[data-open-project], [data-navigate], [data-breadcrumb], [data-shortcut], [data-go-up], [data-go-home], [data-preview], [data-close-preview], [data-theme]');
      if (!target) return;
      if (target.dataset.openProject) {
        openApp('projects', target.dataset.openProject);
      } else if (target.dataset.navigate) {
        const path = target.dataset.navigate.split('/');
        rerenderFileManager(win, path);
      } else if (target.dataset.breadcrumb !== undefined) {
        const index = Number(target.dataset.breadcrumb);
        rerenderFileManager(win, state.filePath.slice(0, index + 1));
      } else if (target.dataset.shortcut) {
        const dest = target.dataset.shortcut === 'home' ? ['home', 'priyanshu'] : ['home', 'priyanshu', target.dataset.shortcut];
        rerenderFileManager(win, dest);
      } else if (target.hasAttribute('data-go-up')) {
        if (state.filePath.length > 1) rerenderFileManager(win, state.filePath.slice(0, -1));
      } else if (target.hasAttribute('data-go-home')) {
        rerenderFileManager(win, ['home', 'priyanshu']);
      } else if (target.dataset.preview) {
        const current = nodeAt(state.filePath);
        const selected = current?.children?.find((node) => node.name === target.dataset.preview);
        if (selected) {
          const panel = $('.file-preview', body);
          if (panel) panel.remove();
          const next = document.createElement('div');
          next.className = 'file-preview';
          next.innerHTML = `<div class="preview-title">▤ ${escapeHTML(selected.name)}<button data-close-preview>×</button></div><p>${escapeHTML(selected.content ?? '')}</p>${selected.downloadUrl ? `<a class="primary-link file-download-link" href="${escapeHTML(selected.downloadUrl)}" download>Download PDF ↧</a>` : ''}`;
          $('.file-content', body).appendChild(next);
        }
      } else if (target.hasAttribute('data-close-preview')) {
        target.closest('.file-preview')?.remove();
      } else if (target.dataset.theme) {
        state.theme = target.dataset.theme;
        try { localStorage.setItem('seattle-os-theme', state.theme); } catch (_) {}
        $('#desktop-shell').className = `desktop-shell theme-${state.theme}`;
        const currentScroll = body.scrollTop;
        body.innerHTML = renderSettings();
        body.scrollTop = currentScroll;
      }
    });

    attachFileSearch(body);

    const form = $('.terminal-input-row', body);
    if (form) {
      const input = $('.terminal-command', form);
      const log = $('.terminal-log', body);
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const raw = input.value.trim();
        if (!raw) return;
        runCommand(raw, log);
        input.value = '';
        $('.terminal-output', body).scrollTop = $('.terminal-output', body).scrollHeight;
      });
      body.addEventListener('click', () => input.focus());
      window.setTimeout(() => input.focus(), 100);
    }
  }

  function attachFileSearch(body) {
    const search = $('[data-file-search]', body);
    if (search) search.addEventListener('input', () => {
      const term = search.value.toLowerCase();
      $$('.file-item', body).forEach((item) => { item.hidden = !item.textContent.toLowerCase().includes(term); });
    });
  }

  function rerenderFileManager(win, path) {
    state.filePath = path;
    const body = $('.window-body', win.el);
    body.innerHTML = renderFileManager(path);
    attachFileSearch(body);
  }

  function printTerminalLine(log, text, kind = '') {
    const line = document.createElement('div');
    line.className = `terminal-line ${kind}`;
    line.textContent = text || '\u00a0';
    log.appendChild(line);
  }

  function runCommand(raw, log) {
    const [verb, ...parts] = raw.split(/\s+/);
    const target = parts.join(' ').toLowerCase();
    if (verb.toLowerCase() === 'clear') { log.innerHTML = ''; return; }
    printTerminalLine(log, `priyanshu@seattle:~$ ${raw}`, 'command');
    const out = (text, kind = '') => printTerminalLine(log, text, kind);
    switch (verb.toLowerCase()) {
      case 'help':
        out('Available commands:');
        out('  help                 show this help');
        out('  whoami               identify the developer');
        out('  pwd                  print current directory');
        out('  ls                   list home folders');
        out('  ls projects          list project directories');
        out('  tree                 show the project tree');
        out('  open <app|project>   launch an application or project');
        out('  github               open the GitHub profile');
        out('  linkedin             open the LinkedIn profile');
        out('  email                compose an email');
        out('  resume               download the CV');
        out('  date                 show local date and time');
        out('  clear                clear the terminal');
        break;
      case 'whoami': out(`${PROFILE.name} — ${PROFILE.role}`); break;
      case 'pwd': out('/home/priyanshu'); break;
      case 'ls':
        out(target === 'projects' ? PROJECTS.map((project) => `${project.folder}/`).join('   ') : 'Desktop/   Documents/   Pictures/   Projects/');
        break;
      case 'tree':
        out('/home/priyanshu'); out('├── Desktop/'); out('├── Documents/'); out('├── Pictures/'); out('└── Projects/');
        PROJECTS.forEach((project, index) => out(`    ${index === PROJECTS.length - 1 ? '└──' : '├──'} ${project.folder}/`));
        break;
      case 'date': out(new Date().toString()); break;
      case 'github': out('Opening GitHub profile…', 'success'); window.open(PROFILE.github, '_blank', 'noopener,noreferrer'); break;
      case 'linkedin': out('Opening LinkedIn profile…', 'success'); window.open(PROFILE.linkedin, '_blank', 'noopener,noreferrer'); break;
      case 'email': out('Opening email composer…', 'success'); window.location.href = `mailto:${PROFILE.email}`; break;
      case 'resume': out('Opening your CV…', 'success'); window.open(PROFILE.resume, '_blank', 'noopener,noreferrer'); break;
      case 'about': out(PROFILE.description); break;
      case 'open': {
        const project = PROJECTS.find((item) => item.id === target || slug(item.name) === slug(target) || slug(item.folder) === slug(target));
        if (project) { out(`Launching ${project.name}…`, 'success'); openApp('projects', project.id); break; }
        const aliases = { about: 'about', files: 'files', filemanager: 'files', terminal: 'terminal', projects: 'projects', resume: 'resume', contact: 'contact', settings: 'settings', home: 'files' };
        if (aliases[target]) { out(`Launching ${target}…`, 'success'); openApp(aliases[target]); }
        else out(`Application or project not found: ${target || '(empty)'}`, 'error');
        break;
      }
      default: out(`Command not found: ${verb}. Type 'help' for available commands.`, 'error');
    }
    printTerminalLine(log, '');
  }

  // Global launch actions make desktop icons, dock items and app links behave consistently.
  document.addEventListener('click', (event) => {
    const launch = event.target.closest('[data-open-app]');
    if (launch) {
      openApp(launch.dataset.openApp);
      $('#system-menu').hidden = true; $('#quick-menu').hidden = true; $('#popover-dismiss').hidden = true;
      return;
    }
    const action = event.target.closest('[data-window-action]');
    if (action) {
      const win = state.windows.find((item) => item.id === Number(action.closest('.app-window').dataset.windowId));
      if (!win) return;
      if (action.dataset.windowAction === 'close') closeWindow(win);
      if (action.dataset.windowAction === 'minimize') minimizeWindow(win);
      if (action.dataset.windowAction === 'maximize') maximizeWindow(win);
    }
  });

  function togglePopover(which) {
    const system = $('#system-menu');
    const quick = $('#quick-menu');
    const dismiss = $('#popover-dismiss');
    const openSystem = which === 'system' && system.hidden;
    const openQuick = which === 'quick' && quick.hidden;
    system.hidden = !openSystem;
    quick.hidden = !openQuick;
    dismiss.hidden = !(openSystem || openQuick);
  }
  $('#system-menu-button').addEventListener('click', () => togglePopover('system'));
  $('#quick-settings-button').addEventListener('click', () => togglePopover('quick'));
  $('#clock-button').addEventListener('click', () => togglePopover('quick'));
  $('#popover-dismiss').addEventListener('click', () => { $('#system-menu').hidden = true; $('#quick-menu').hidden = true; $('#popover-dismiss').hidden = true; });
  $('#about-system-button').addEventListener('click', () => { $('#system-menu').hidden = true; $('#popover-dismiss').hidden = true; window.alert('Seattle OS — a personal computing environment by Priyanshu Sharma. Explore the applications to discover projects, experience, research and ways to connect.'); });

  window.addEventListener('resize', () => {
    if (!window.matchMedia('(max-width: 700px)').matches) return;
    state.windows.forEach((win) => {
      if (!win.maximized) { win.el.style.left = '0'; win.el.style.top = '42px'; win.el.style.width = ''; win.el.style.height = ''; }
    });
  });

  $$('[data-profile-name]').forEach((item) => { item.textContent = PROFILE.name; });
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./sw.js').catch(() => {}));
  }
  showBoot();
})();
