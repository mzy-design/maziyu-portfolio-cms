(async () => {
  const page = document.body.dataset.page;
  const base = window.BASE_PATH ?? (page === 'home' ? '.' : '..');
  const getJson = path => fetch(path, { cache: 'no-store' }).then(response => {
    if (!response.ok) throw Error('Content failed to load');
    return response.json();
  });
  const contentRequest = getJson(window.CONTENT_PATH);
  const aboutRequest = page === 'home' ? getJson(`${base}/content/about.json?v=20260824o`) : contentRequest;
  const worksRequest = page === 'project' ? getJson(`${base}/content/works.json?v=20260903a`) : Promise.resolve(null);
  const [p, about, works] = await Promise.all([contentRequest, aboutRequest, worksRequest]);
  const root = document.querySelector('#app');
  const esc = value => String(value ?? '').replace(/[&<>\"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[character]);
  const asset = path => /^(https?:|data:|\/)/.test(path) ? path : `${base}/${String(path).replace(/^\.\.\//, '')}`;
  const media = (path, alt = '', className = '') => path
    ? `<img class="${className}" src="${esc(asset(path))}" alt="${esc(alt)}" loading="lazy">`
    : `<div class="media-placeholder ${className}" role="img" aria-label="图片占位符"><span>Image placeholder</span></div>`;
  const fanItems = about.carousel;

  const aboutSectionsHtml = (page === 'about' || page === 'home') ? ((p) => `
    <section class="about-opening"><header><h1>${esc(about.introduction.heading)}</h1></header><div class="about-primary zh" lang="zh-CN">${about.introduction.zh.map(text => `<p>${esc(text)}</p>`).join('')}</div><div class="about-media-row"><div class="about-translation">${about.introduction.en.map(text => `<p>${esc(text)}</p>`).join('')}</div>${media(about.introduction.portrait, 'Ma Ziyu portrait', 'about-portrait')}${media(about.introduction.detailImage, 'Design detail', 'about-detail')}</div></section>
    <section class="about-experience"><header><h2>Experience</h2><p>${esc(p.experienceIntro)}</p>${p.experienceImage ? `<img class="experience-image" src="${esc(asset(p.experienceImage))}" alt="WWP Beauty product design" loading="lazy">` : ''}</header><div class="experience-capabilities">${p.experience.map(item => `<article class="experience-capability"><div class="experience-title-row"><div class="experience-company"><div class="experience-reveal"><h3 lang="zh-CN">${esc(item.companyZh)}</h3></div><small>${esc(item.companyEn)}</small></div><div class="experience-role"><strong lang="zh-CN">${esc(item.roleZh)}</strong><small>${esc(item.roleEn)}</small><time>${esc(item.years)}</time></div></div><div class="experience-copy"><p class="zh" lang="zh-CN">${esc(item.zh)}</p><p class="en">${esc(item.en)}</p></div></article>`).join('')}</div><div class="experience-partners"><h2>Clients <span lang="zh-CN">/ 合作品牌</span></h2><div class="partner-marquee"><div class="partner-track">${[...p.brands.logos,...p.brands.logos].map(logo => `<span class="partner-logo"><img src="${esc(asset(logo.image))}" alt="${esc(logo.name)}" loading="lazy"></span>`).join('')}</div></div></div></section>
    <section class="about-awards"><div class="awards-inner"><h2>Awards &amp;<br>Recognitions</h2><div class="awards-grid">${p.recognition.map((item, index) => `<article class="award-card" style="--i:${index}"><header><h3>${esc(item.title)}</h3>${item.result ? `<strong>( ${esc(item.result)} )</strong>` : ''}</header><div class="award-copy"><p>${esc(item.en)}</p><p lang="zh-CN">${esc(item.zh)}</p></div>${item.year ? `<time>${esc(item.year)}</time>` : ''}</article>`).join('')}</div></div></section>
    <section class="about-showcase">${media(p.showcaseImage, 'Cosmetic applicator structure development')}</section>
    <section class="about-fan" aria-label="Drag to browse selected project images"><span class="fan-plus fan-plus-left" aria-hidden="true">＋</span><span class="fan-plus fan-plus-right" aria-hidden="true">＋</span><div class="fan-hint" aria-hidden="true"><svg viewBox="0 0 1024 1024"><path d="M497.066667 896C334.933333 887.466667 200.533333 753.066667 192 590.933333 183.466667 407.466667 330.666667 256 512 256V192C285.866667 192 104.533333 388.266667 130.133333 620.8 149.333333 795.733333 292.266667 938.666667 469.333333 957.866667c219.733333 23.466667 407.466667-136.533333 426.666667-347.733334 2.133333-19.2-12.8-34.133333-32-34.133333-17.066667 0-29.866667 12.8-32 29.866667-17.066667 166.4-162.133333 298.666667-334.933333 290.133333z"/><path d="M554.666667 273.066667l-140.8-140.8c-12.8-12.8-12.8-32 0-44.8 12.8-12.8 32-12.8 44.8 0l110.933333 110.933333c17.066667 17.066667 17.066667 42.666667 0 59.733333l-14.933333 14.933334z"/><path d="M413.866667 324.266667L554.666667 183.466667l14.933333 14.933333c17.066667 17.066667 17.066667 42.666667 0 59.733333l-110.933333 110.933334c-12.8 12.8-32 12.8-44.8 0-12.8-12.8-12.8-34.133333 0-44.8z"/></svg><span>Drag to rotate</span></div><div class="fan-deck"><div class="fan-row" tabindex="0" aria-label="Drag horizontally or use arrow keys to browse projects">${fanItems.map(item => `<figure class="fan-card"><img src="${esc(asset(item.image))}" alt="${esc(item.title)}" draggable="false" loading="lazy" decoding="async"></figure>`).join('')}</div></div></section>
    <section class="about-values"><p class="values-label">( VALUES )</p><span class="values-line" aria-hidden="true"></span><div class="values-list">${p.values.map(item => `<h2>${esc(item.titleEn)}</h2>`).join('')}</div><a class="values-chat" href="${base}/contact/"><img src="${esc(asset(p.introduction.portrait))}" alt="Ma Ziyu"><span>Let's chat</span></a><span class="values-plus values-plus-left" aria-hidden="true">＋</span><span class="values-plus values-plus-right" aria-hidden="true">＋</span></section>
    <section class="about-process about-combined"><header class="about-feature-head"><p>Capabilities &amp; Process</p><h2>From Concept to Production<span lang="zh-CN">从概念到量产</span></h2></header><ol>${p.process.map((item, index) => `<li><span>${String(index + 1).padStart(2, '0')}</span><h3>${esc(item.stageEn)}<small lang="zh-CN">${esc(item.stageZh)}</small></h3><p>${esc(item.keywordsEn)}<small lang="zh-CN">${esc(item.keywordsZh)}</small></p></li>`).join('')}</ol></section>
    <section class="about-closing"><h2>${esc(p.cta.titleEn)}<span lang="zh-CN">${esc(p.cta.titleZh)}</span></h2><footer><a href="${base}/contact/">${esc(p.cta.labelEn)}</a><a href="${base}/contact/">${esc(p.cta.labelZh)}</a></footer></section>
  `)(about) : '';
  const aboutPageHtml = `<main class="about-page" id="about">${aboutSectionsHtml}</main>`;

  const homeHref = page === 'home' ? '#top' : `${base}/`;
  const worksHref = page === 'home' ? '#selected-work' : `${base}/works/`;
  const aboutHref = page === 'home' ? '#about' : `${base}/about/`;
  const nav = `<header class="nav"><a class="brand" href="${homeHref}">Ma ZiYu</a><nav><a href="${homeHref}">Home</a><a href="${worksHref}">Works</a><a href="${aboutHref}">About</a></nav><a href="${base}/contact/">Let’s talk</a><button class="menu" aria-label="Open menu">Menu</button></header>`;

  if (page === 'home') root.innerHTML = `${nav}<main><section class="home" id="top" style="--hero:url('${esc(p.background)}')"><div class="cursor-trail" aria-hidden="true"></div><div class="hero-title" aria-label="${esc(p.hero)}">${[...p.hero].map((character, index) => `<span style="--i:${index}">${esc(character)}</span>`).join('')}</div><p class="intro">${esc(p.intro)}</p><p class="location">${esc(p.location)}</p><a class="down" href="#selected-work" aria-label="View works">↓</a></section><section class="home-projects" id="selected-work"><div class="projects-head"><p>Selected work</p><span>${p.projects.length} projects · 2026</span></div><div class="projects-grid">${p.projects.map((item, index) => { const tag = item.hasDetail ? 'a' : 'article'; const href = item.hasDetail ? ` href="${esc(item.href)}"` : ''; return `<${tag} class="project-card ${item.wide ? 'wide' : ''} ${item.hasDetail ? '' : 'is-static'}"${href}><div class="project-media"><img src="${esc(asset(item.image))}" alt="${esc(item.title)}" loading="lazy" decoding="async"></div><div class="project-meta"><h2>${esc(item.title)}</h2><p>${esc(item.tags)}<small lang="zh-CN">${esc(item.note)}</small></p><span>${String(index + 1).padStart(2, '0')}</span></div></${tag}>`; }).join('')}</div></section><section class="about-page" id="about">${aboutSectionsHtml}</section></main>`;
  if (page === 'works') {
    const projectCard = (item, index) => {
      const tag = item.hasDetail ? 'a' : 'article';
      const href = item.hasDetail ? ` href="${esc(item.href)}"` : '';
      return `<${tag} class="card${item.hasDetail ? '' : ' is-static'}"${href} data-category="${esc(item.category)}"><div><img src="${esc(asset(item.image))}" alt="${esc(item.title)}" loading="lazy" decoding="async"><span>${String(index + 1).padStart(2, '0')}</span></div><h2>${esc(item.title)}</h2><p>${esc(item.tags)}</p><small lang="zh-CN">${esc(item.note)}</small></${tag}>`;
    };
    root.innerHTML = `${nav}<main class="page works"><div class="page-head"><p>Works</p><div class="works-title-marquee" aria-label="${esc(p.title)}"><div>${Array(4).fill(`<h1>${esc(p.title)}&nbsp;·&nbsp;</h1>`).join('')}</div></div><span>${esc(p.intro)}</span></div><div class="works-filters" role="group" aria-label="Filter projects">${p.filters.map((filter, index) => `<button type="button" data-filter="${esc(filter.id)}" aria-pressed="${index === 0}">${esc(filter.label)}</button>`).join('')}</div><div class="grid">${p.projects.map(projectCard).join('')}</div></main>`;
    const cards = [...document.querySelectorAll('.works .card')];
    document.querySelectorAll('.works-filters button').forEach(button => button.addEventListener('click', () => {
      document.querySelectorAll('.works-filters button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
      cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
    }));
  }
  if (page === 'about') root.innerHTML = `${nav}${aboutPageHtml}`;
  if (page === 'contact') root.innerHTML = `${nav}<main class="contact-page"><section class="contact-hero"><a class="contact-title" href="mailto:${esc(p.email)}">${esc(p.title)}</a><div class="contact-actions"><button class="copy-mail" type="button" data-email="${esc(p.email)}">${esc(p.copyLabel)}</button><button class="wechat-toggle" type="button" aria-expanded="false">${esc(p.wechatLabel)}</button></div><a class="contact-email" href="mailto:${esc(p.email)}">${esc(p.email)}</a></section><section class="wechat-panel" hidden>${p.wechatImage ? `<img src="${esc(asset(p.wechatImage))}" alt="WeChat QR code">` : `<div class="qr-placeholder">${esc(p.wechatPlaceholder)}</div>`}</section></main>`;
  if (page === 'project') {
    const displayTitle = p.displayTitle || p.title;
    const currentRoute = location.pathname.split('/').filter(Boolean).pop();
    const detailed = [...new Map(works.projects.filter(item => item.hasDetail && item.href).map(item => [item.href.replace(/\/$/, ''), item])).values()];
    const nextRoute = p.next.href.replace(/^\.\.\//, '').replace(/\/$/, '');
    const moreWorks = detailed.filter(item => item.href.replace(/\/$/, '') !== currentRoute).sort((a, b) => Number(b.href.replace(/\/$/, '') === nextRoute) - Number(a.href.replace(/\/$/, '') === nextRoute)).slice(0, 2);
    root.innerHTML = `${nav}<main class="project-detail"><header class="project-detail-head"><p>${esc(p.number)} / ${esc(p.year)}</p><h1 class="${displayTitle.length > 14 ? 'is-long' : ''}">${esc(displayTitle)}${p.note ? `<small lang="zh-CN">${esc(p.note)}</small>` : ''}</h1><div><span>${esc(p.subtitle)}</span><small>${p.services.map(item => esc(item)).join('<br>')}</small></div></header>${media(p.hero, p.title, 'project-hero')}<section class="project-overview" data-marquee="${esc(p.subtitle)}"><p>( Overview )</p><h2>${esc(p.overview || '项目说明待编辑')}</h2></section>${p.sections.map((section, index) => { const images = section.images || [section.image]; return `<section class="project-chapter${section.layout ? ` is-${esc(section.layout)}` : ''}"><header><span>${String(index + 1).padStart(2, '0')}</span><h2>${esc(section.heading)}</h2></header><p>${esc(section.body || '正文待编辑')}</p><div class="project-chapter-media">${images.map((image, mediaIndex) => media(image, `${section.heading} ${mediaIndex + 1}`)).join('')}</div></section>`; }).join('')}${p.noteBlock ? `<section class="project-note"><header><span>${esc(p.noteBlock.eyebrow)}</span><small>${esc(p.noteBlock.meta)}</small></header><p lang="zh-CN">${esc(p.noteBlock.text)}</p></section>` : ''}<section class="project-gallery">${p.gallery.map((image, index) => media(image, `${p.title} gallery ${index + 1}`)).join('')}</section><section class="project-more"><header><h2>MORE WORKS</h2><a href="${base}/works/">SEE ALL (${detailed.length})</a></header><div class="project-more-grid">${moreWorks.map(item => `<a class="project-more-card" href="${base}/works/${esc(item.href)}"><img src="${esc(asset(item.image))}" alt="${esc(item.title)}" loading="lazy" decoding="async"><div><h3>${esc(item.title)}</h3><p>${esc(item.detailCategory || item.tags)}</p><small lang="zh-CN">${esc(item.note)}</small></div></a>`).join('')}</div></section></main>`;
  }

  document.querySelector('.menu')?.addEventListener('click', () => document.querySelector('.nav').classList.toggle('open'));
  if (page === 'about' || page === 'home') {
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
      const experienceObserver = new IntersectionObserver(entries => entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); experienceObserver.unobserve(entry.target); }
      }), { threshold: .2 });
      document.querySelectorAll('.experience-capability, .award-card, .about-fan, .values-label, .values-line, .values-list, .values-chat, .about-process>ol>li, .about-closing h2, .about-closing footer').forEach(item => experienceObserver.observe(item));
    }
    const navElement = document.querySelector('.nav');
    const showcase = document.querySelector('.about-showcase');
    const fan = document.querySelector('.about-fan');
    const fanRow = fan?.querySelector('.fan-row');
    if (fanRow) {
      const cards = [...fanRow.querySelectorAll('.fan-card')], count = cards.length;
      let position = .5, startX = 0, startPosition = 0, lastX = 0, lastTime = 0, velocity = 0, dragging = false;
      const interpolate = (value, points) => {
        const bounded = Math.max(0, Math.min(points.length - 1, value));
        const index = Math.min(points.length - 2, Math.floor(bounded));
        return points[index] + (points[index + 1] - points[index]) * (bounded - index);
      };
      const renderFan = animate => {
        fanRow.classList.toggle('is-settling', animate);
        const width = fanRow.clientWidth, cardWidth = Math.min(600, width * .308);
        cards.forEach((card, index) => {
          let offset = ((index - position + count / 2) % count + count) % count - count / 2;
          const distance = Math.abs(offset), side = Math.sign(offset) || 1;
          const layer = Math.max(0, distance - .5);
          const x = distance < .5 ? offset * width * .12 : side * width * interpolate(layer, [.06,.145,.173,.19,.205,.22]);
          const tilt = interpolate(layer, [70,35,12,4,0,0]);
          const angle = distance < .5 ? -90 + offset * 40 : side < 0 ? -(180 - tilt) : -tilt;
          const heightScale = interpolate(layer, [1,.94,.8,.73,.7,.68]);
          card.style.cssText = `--card-width:${cardWidth}px;z-index:${100 - Math.round(distance * 10)};opacity:${distance > 3.6 ? 0 : 1};transform:translate(-50%,-50%) translateX(${x}px) rotateY(${angle}deg) scaleY(${heightScale})`;
        });
      };
      renderFan(false);
      fanRow.addEventListener('pointerdown', event => {
        dragging = true; startX = lastX = event.clientX; startPosition = position; lastTime = performance.now(); velocity = 0;
        fanRow.setPointerCapture(event.pointerId); fanRow.classList.add('is-dragging');
      });
      fanRow.addEventListener('pointermove', event => {
        if (!dragging) return;
        const now = performance.now(), elapsed = Math.max(1, now - lastTime);
        const unit = Math.min(180, fanRow.clientWidth * .13);
        velocity = (event.clientX - lastX) / elapsed / unit;
        position = startPosition - (event.clientX - startX) / unit;
        lastX = event.clientX; lastTime = now; renderFan(false);
      });
      const finishFanDrag = () => {
        if (!dragging) return;
        dragging = false; fanRow.classList.remove('is-dragging');
        position -= velocity * 130;
        position = Math.round(position - .5) + .5;
        renderFan(true);
      };
      fanRow.addEventListener('pointerup', finishFanDrag);
      fanRow.addEventListener('pointercancel', finishFanDrag);
      fanRow.addEventListener('keydown', event => {
        if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
        event.preventDefault(); position += event.key === 'ArrowLeft' ? -1 : 1; renderFan(true);
      });
      addEventListener('resize', () => renderFan(false), { passive: true });
    }
    const lightSections = document.querySelectorAll('.home-projects, .about-showcase, .about-fan, .about-values');
    const updateAboutScroll = () => {
      if (showcase) {
        const bounds = showcase.getBoundingClientRect();
        const progress = Math.max(0, Math.min(1, -bounds.top / Math.max(1, bounds.height - innerHeight)));
        showcase.style.setProperty('--progress', progress);
      }
      navElement.classList.toggle('over-projects', [...lightSections].some(section => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= 20 && bounds.bottom > 20;
      }));
    };
    addEventListener('scroll', updateAboutScroll, { passive: true });
    updateAboutScroll();
  }
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
    if (!matchMedia('(prefers-reduced-motion:reduce)').matches) {
      const hero = document.querySelector('.home');
      const trail = document.querySelector('.cursor-trail');
      const sources = p.projects.map(item => asset(item.image));
      sources.slice(0, 3).forEach(src => { const image = new Image(); image.decoding = 'async'; image.src = src; });
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
