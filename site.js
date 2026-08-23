(async () => {
  const page = document.body.dataset.page;
  const base = window.BASE_PATH ?? (page === 'home' ? '.' : '..');
  const getJson = path => fetch(path).then(response => {
    if (!response.ok) throw Error('Content failed to load');
    return response.json();
  });
  const p = await getJson(window.CONTENT_PATH);
  const aboutData = page === 'home' ? await getJson('./content/about.json') : page === 'about' ? p : null;
  const sectionsData = page === 'home' ? await getJson('./content/sections.json') : null;
  const root = document.querySelector('#app');
  const esc = value => String(value ?? '').replace(/[&<>\"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
  const asset = path => /^(https?:|data:|\/)/.test(path) ? path : `${base}/${String(path).replace(/^\.\.\//, '')}`;
  const media = (path, alt = '', className = '') => path
    ? `<img class="${className}" src="${esc(asset(path))}" alt="${esc(alt)}" loading="lazy">`
    : `<div class="media-placeholder ${className}" role="img" aria-label="图片占位符"><span>Image placeholder</span></div>`;

  const aboutHtml = aboutData ? `<section class="about-section" id="about">
    <header class="about-heading"><p>( ${esc(aboutData.kicker)} )</p><h2>${esc(aboutData.title)}</h2></header>
    <div class="about-intro">${media(aboutData.portrait, 'Ma ZiYu')}<div class="about-copy-cn">${aboutData.intro.map(item => `<p>${esc(item)}</p>`).join('')}</div></div>
    <section class="resume-block"><h3 class="resume-label">Experience</h3><div class="experience-list">${aboutData.experience.map(item => `<article class="experience-row"><h3>${esc(item.company)}</h3><p>${esc(item.role)}</p><time>${esc(item.period)}</time><p class="summary">${esc(item.summary)}</p></article>`).join('')}</div></section>
    <section class="resume-block"><h3 class="resume-label">Profile</h3><div class="resume-grid"><article class="resume-card"><h3>Education</h3>${aboutData.education.map(item => `<p><strong>${esc(item.school)}</strong><br>${esc(item.major)}<br>${esc(item.period)}<br>${esc(item.detail)}</p>`).join('')}</article><article class="resume-card"><h3>Language</h3><ul>${aboutData.languages.map(item => `<li>${esc(item)}</li>`).join('')}</ul></article></div></section>
  </section>` : '';

  const sectionsHtml = sectionsData ? `<div class="site-sections">
    <section class="capabilities-section" id="capabilities"><header class="section-heading"><p>( ${esc(sectionsData.capabilities.kicker)} )</p><h2>${esc(sectionsData.capabilities.intro)}</h2></header>${media(sectionsData.capabilities.image, 'Capabilities', 'section-feature-image')}<div class="capability-list">${sectionsData.capabilities.items.map(item => `<article class="capability-item"><h3>${esc(item.title)}</h3><div><p>${esc(item.description)}</p><ul>${item.services.map(service => `<li>${esc(service)}</li>`).join('')}</ul><small>${sectionsData.capabilities.tools.map(tool => esc(tool)).join(' · ')}</small></div></article>`).join('')}</div></section>
    <section class="testimonials-section"><header class="section-heading"><p>( ${esc(sectionsData.testimonials.kicker)} )</p><h2>${esc(sectionsData.testimonials.intro)}</h2></header><div class="testimonial-grid">${sectionsData.testimonials.items.map(item => `<article class="testimonial-card">${media(item.image, item.name)}<blockquote>${esc(item.quote)}</blockquote><p>${esc(item.name)}<br><span>${esc(item.role)}</span></p></article>`).join('')}</div></section>
    <section class="awards-section"><header class="section-heading"><p>( ${esc(sectionsData.awards.kicker)} )</p><h2>Selected awards and recognitions.</h2></header><div class="awards-list">${sectionsData.awards.items.map(item => `<article><h3>${esc(item.award)} · ${esc(item.recognition)}</h3><p>${esc(item.project)}</p><time>${esc(item.year)}</time></article>`).join('')}</div></section>
    <section class="values-section"><header class="section-heading"><p>( ${esc(sectionsData.values.kicker)} )</p><h2>Principles behind the work.</h2></header><div class="values-list">${sectionsData.values.items.map((item, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><h3>${esc(item.title)}</h3><p>${esc(item.body)}</p></article>`).join('')}</div></section>
    <section class="closing-cta"><p>Have a project in mind?</p><a href="${base}/${esc(sectionsData.cta.href)}">${esc(sectionsData.cta.title)}</a></section>
    <footer class="site-footer"><a href="${base}/">${esc(sectionsData.footer.name)}</a><p>Shanghai, China</p><nav>${sectionsData.footer.links.map(item => `<a href="${esc(item.href)}">${esc(item.label)}</a>`).join('')}</nav><small>© 2026</small></footer>
  </div>` : '';

  const nav = `<header class="nav"><a class="brand" href="${base}/">Ma ZiYu</a><nav><a href="${base}/">Home</a><a href="${base}/works/">Works</a><a href="${page === 'home' ? '#about' : `${base}/#about`}">About</a></nav><a href="${base}/contact/">Let’s talk</a><button class="menu" aria-label="Open menu">Menu</button></header>`;

  if (page === 'home') root.innerHTML = `${nav}<main><section class="home" style="--hero:url('${esc(p.background)}')"><div class="cursor-trail" aria-hidden="true"></div><div class="hero-title" aria-label="${esc(p.hero)}">${[...p.hero].map((character, index) => `<span style="--i:${index}">${esc(character)}</span>`).join('')}</div><p class="intro">${esc(p.intro)}</p><p class="location">${esc(p.location)}</p><a class="down" href="#selected-work" aria-label="View works">↓</a></section><section class="home-projects" id="selected-work"><div class="projects-head"><p>Selected work</p><span>${p.projects.length} projects · 2026</span></div><div class="projects-grid">${p.projects.map((item, index) => `<a class="project-card ${item.wide ? 'wide' : ''}" href="${esc(item.href)}"><div class="project-media"><img src="${esc(asset(item.image))}" alt="${esc(item.title)}" loading="lazy"></div><div class="project-meta"><h2>${esc(item.title)}</h2><p>${esc(item.tags)}</p><span>${String(index + 1).padStart(2, '0')}</span></div></a>`).join('')}</div></section>${aboutHtml}${sectionsHtml}</main>`;
  if (page === 'works') root.innerHTML = `${nav}<main class="page works"><div class="page-head"><p>Works</p><h1>${esc(p.title)}</h1><span>${esc(p.intro)}</span></div><div class="grid">${p.projects.map((item, index) => `<a class="card" href="${esc(item.href)}"><div><img src="${esc(asset(item.image))}" alt=""><span>${String(index + 1).padStart(2, '0')}</span></div><h2>${esc(item.title)}</h2><p>${esc(item.tags)}</p></a>`).join('')}</div></main>`;
  if (page === 'about') root.innerHTML = `${nav}<main>${aboutHtml}</main>`;
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
    const about = document.querySelector('#about');
    const setNav = () => navElement.classList.toggle('over-projects', scrollY >= work.offsetTop - 20 && scrollY < about.offsetTop - 20);
    addEventListener('scroll', setNav, { passive: true }); setNav();
    if (matchMedia('(pointer:fine)').matches && !matchMedia('(prefers-reduced-motion:reduce)').matches) {
      const hero = document.querySelector('.home');
      const trail = document.querySelector('.cursor-trail');
      const sources = p.projects.map(item => asset(item.image));
      sources.forEach(src => { const image = new Image(); image.src = src; });
      let index = 0, lastX = -100, lastY = -100;
      hero.addEventListener('pointermove', event => {
        if (Math.hypot(event.clientX - lastX, event.clientY - lastY) < 100) return;
        lastX = event.clientX; lastY = event.clientY;
        const image = document.createElement('img'); const box = hero.getBoundingClientRect();
        image.className = 'trail-image'; image.src = sources[index % sources.length]; image.style.cssText = `left:${event.clientX}px;top:${event.clientY - box.top}px`;
        trail.append(image); index++; image.addEventListener('animationend', () => image.remove(), { once: true });
      });
    }
  }
})().catch(() => { document.querySelector('#app').innerHTML = '<main class="error"><h1>Content unavailable.</h1></main>'; });
