(async () => {
  const page = document.body.dataset.page;
  const base = window.BASE_PATH ?? (page === 'home' ? '.' : '..');
  const getJson = path => fetch(path).then(response => {
    if (!response.ok) throw Error('Content failed to load');
    return response.json();
  });
  const p = await getJson(window.CONTENT_PATH);
  const root = document.querySelector('#app');
  const esc = value => String(value ?? '').replace(/[&<>\"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
  const asset = path => /^(https?:|data:|\/)/.test(path) ? path : `${base}/${String(path).replace(/^\.\.\//, '')}`;
  const media = (path, alt = '', className = '') => path
    ? `<img class="${className}" src="${esc(asset(path))}" alt="${esc(alt)}" loading="lazy">`
    : `<div class="media-placeholder ${className}" role="img" aria-label="图片占位符"><span>Image placeholder</span></div>`;

  const aboutPageHtml = page === 'about' ? `<main class="about-page">
    <section class="about-opening"><header><h1>${esc(p.introduction.heading)}</h1></header><div class="about-primary zh" lang="zh-CN">${p.introduction.zh.map(text => `<p>${esc(text)}</p>`).join('')}</div><div class="about-media-row"><div class="about-translation">${p.introduction.en.map(text => `<p>${esc(text)}</p>`).join('')}</div>${media(p.introduction.portrait, 'Ma Ziyu portrait', 'about-portrait')}${media(p.introduction.detailImage, 'Design detail', 'about-detail')}</div></section>
    <section class="about-resume"><header><p>( 01 )</p><h2>Experience<span lang="zh-CN">工作经历</span></h2></header><div class="resume-experience">${p.experience.map(item => `<article><div class="resume-role"><h3>${esc(item.company)}<span>${esc(item.companyEn)}</span></h3><p>${esc(item.role)}<span>${esc(item.roleEn)}</span></p><time>${esc(item.years)}</time></div><div class="resume-highlights">${item.highlights.map(point => `<div><h4>${esc(point.title)}<span>${esc(point.titleEn)}</span></h4><p class="zh" lang="zh-CN">${esc(point.zh)}</p><p class="en">${esc(point.en)}</p></div>`).join('')}</div></article>`).join('')}</div></section>
    <section class="about-resume about-education"><header><p>( 02 )</p><h2>Education<span lang="zh-CN">教育与荣誉</span></h2></header><div><article class="education-row"><h3>${esc(p.education.school)}<span>${esc(p.education.schoolEn)}</span></h3><p>${esc(p.education.degree)}<span>${esc(p.education.degreeEn)}</span></p><time>${esc(p.education.years)}</time><ul>${p.education.details.map((item, index) => `<li>${esc(item)}<span>${esc(p.education.detailsEn[index])}</span></li>`).join('')}</ul></article><div class="recognition-list">${p.recognition.map(item => `<article><h3>${esc(item.title)}<span>${esc(item.titleEn || item.title)}</span></h3><p class="zh" lang="zh-CN">${esc(item.zh)}</p><p class="en">${esc(item.en)}</p></article>`).join('')}</div></div></section>
    <section class="about-resume about-skills"><header><p>( 03 )</p><h2>Capabilities<span lang="zh-CN">核心能力</span></h2></header><div class="skills-list">${p.skills.map(group => `<article><h3>${esc(group.group)}<span>${esc(group.groupEn)}</span></h3><ul>${group.items.map((item, index) => `<li>${esc(item)}<span>${esc(group.itemsEn[index])}</span></li>`).join('')}</ul></article>`).join('')}</div></section>
    <section class="about-closing"><a href="${base}/contact/"><span>${esc(p.cta.label)}</span><small lang="zh-CN">${esc(p.cta.labelZh)}</small></a></section>
  </main>` : '';

  const nav = `<header class="nav"><a class="brand" href="${base}/">Ma ZiYu</a><nav><a href="${base}/">Home</a><a href="${base}/works/">Works</a><a href="${base}/about/">About</a></nav><a href="${base}/contact/">Let’s talk</a><button class="menu" aria-label="Open menu">Menu</button></header>`;

  if (page === 'home') root.innerHTML = `${nav}<main><section class="home" style="--hero:url('${esc(p.background)}')"><div class="cursor-trail" aria-hidden="true"></div><div class="hero-title" aria-label="${esc(p.hero)}">${[...p.hero].map((character, index) => `<span style="--i:${index}">${esc(character)}</span>`).join('')}</div><p class="intro">${esc(p.intro)}</p><p class="location">${esc(p.location)}</p><a class="down" href="#selected-work" aria-label="View works">↓</a></section><section class="home-projects" id="selected-work"><div class="projects-head"><p>Selected work</p><span>${p.projects.length} projects · 2026</span></div><div class="projects-grid">${p.projects.map((item, index) => `<a class="project-card ${item.wide ? 'wide' : ''}" href="${esc(item.href)}"><div class="project-media"><img src="${esc(asset(item.image))}" alt="${esc(item.title)}" loading="lazy"></div><div class="project-meta"><h2>${esc(item.title)}</h2><p>${esc(item.tags)}</p><span>${String(index + 1).padStart(2, '0')}</span></div></a>`).join('')}</div></section></main>`;
  if (page === 'works') root.innerHTML = `${nav}<main class="page works"><div class="page-head"><p>Works</p><h1>${esc(p.title)}</h1><span>${esc(p.intro)}</span></div><div class="grid">${p.projects.map((item, index) => `<a class="card" href="${esc(item.href)}"><div><img src="${esc(asset(item.image))}" alt=""><span>${String(index + 1).padStart(2, '0')}</span></div><h2>${esc(item.title)}</h2><p>${esc(item.tags)}</p></a>`).join('')}</div></main>`;
  if (page === 'about') root.innerHTML = `${nav}${aboutPageHtml}`;
  if (page === 'contact') root.innerHTML = `${nav}<main class="contact-page"><section class="contact-hero"><a class="contact-title" href="mailto:${esc(p.email)}">${esc(p.title)}</a><div class="contact-actions"><button class="copy-mail" type="button" data-email="${esc(p.email)}">${esc(p.copyLabel)}</button><button class="wechat-toggle" type="button" aria-expanded="false">${esc(p.wechatLabel)}</button></div><a class="contact-email" href="mailto:${esc(p.email)}">${esc(p.email)}</a></section><section class="wechat-panel" hidden>${p.wechatImage ? `<img src="${esc(asset(p.wechatImage))}" alt="WeChat QR code">` : `<div class="qr-placeholder">${esc(p.wechatPlaceholder)}</div>`}</section></main>`;
  if (page === 'project') root.innerHTML = `${nav}<main class="project-detail"><header class="project-detail-head"><p>${esc(p.number)} / ${esc(p.year)}</p><h1>${esc(p.title)}</h1><div><span>${esc(p.subtitle)}</span><small>${p.services.map(item => esc(item)).join('<br>')}</small></div></header>${media(p.hero, p.title, 'project-hero')}<section class="project-overview"><p>( Overview )</p><h2>${esc(p.overview || '项目说明待编辑')}</h2></section>${p.sections.map((section, index) => `<section class="project-chapter"><header><span>${String(index + 1).padStart(2, '0')}</span><h2>${esc(section.heading)}</h2></header><p>${esc(section.body || '正文待编辑')}</p>${media(section.image, section.heading)}</section>`).join('')}<section class="project-gallery">${p.gallery.map((image, index) => media(image, `${p.title} gallery ${index + 1}`)).join('')}</section><a class="next-project" href="${esc(p.next.href)}"><span>Next project</span><strong>${esc(p.next.title)}</strong></a></main>`;

  document.querySelector('.menu')?.addEventListener('click', () => document.querySelector('.nav').classList.toggle('open'));
  if (page === 'contact') {
    const copy = document.querySelector('.copy-mail');
    const toggle = document.querySelector('.wechat-toggle');
    const panel = document.querySelector('.wechat-panel');
    copy.addEventListener('click', async () => { try { await navigator.clipboard.writeText(copy.dataset.email); copy.textContent = 'Copied!'; } catch { copy.textContent = copy.dataset.email; } });
    toggle.addEventListener('click', () => { panel.hidden = !panel.hidden; toggle.setAttribute('aria-expanded', String(!panel.hidden)); if (!panel.hidden) panel.scrollIntoView({ behavior: 'smooth', block: 'center' }); });
  }
  if (page === 'home') {
    const cards = document.querySelectorAll('.project-card');
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.target.classList.toggle('visible', entry.isIntersecting)), { threshold: .12 });
    cards.forEach(card => observer.observe(card));
    const navElement = document.querySelector('.nav');
    const work = document.querySelector('#selected-work');
    const setNav = () => navElement.classList.toggle('over-projects', scrollY >= work.offsetTop - 20);
    addEventListener('scroll', setNav, { passive: true }); setNav();
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
      const hero = document.querySelector('.home');
      const trail = document.querySelector('.cursor-trail');
      const sources = p.projects.map(item => asset(item.image));
      sources.forEach(src => { const image = new Image(); image.src = src; });
      let index = 0, lastX = -100, lastY = -100, touchStart;
      const spawnTrail = event => {
        const distance = event.pointerType === 'touch' ? 70 : 100;
        if (Math.hypot(event.clientX - lastX, event.clientY - lastY) < distance) return;
        lastX = event.clientX; lastY = event.clientY;
        const image = document.createElement('img'); const box = hero.getBoundingClientRect();
        image.className = 'trail-image'; image.src = sources[index % sources.length]; image.style.cssText = `left:${event.clientX}px;top:${event.clientY - box.top}px`;
        trail.append(image); index++; image.addEventListener('animationend', () => image.remove(), { once: true });
      };
      hero.addEventListener('pointerdown', event => {
        if (event.pointerType === 'touch') touchStart = { x: event.clientX, y: event.clientY };
      }, { passive: true });
      hero.addEventListener('pointermove', event => {
        if (event.pointerType === 'touch' && (!touchStart || Math.abs(event.clientX - touchStart.x) < Math.abs(event.clientY - touchStart.y))) return;
        spawnTrail(event);
      }, { passive: true });
      ['pointerup', 'pointercancel'].forEach(type => hero.addEventListener(type, () => { touchStart = undefined; lastX = lastY = -100; }, { passive: true }));
    }
  }
})().catch(() => { document.querySelector('#app').innerHTML = '<main class="error"><h1>Content unavailable.</h1></main>'; });
