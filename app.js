(() => {
  'use strict';
  const projects = window.PORTFOLIO_PROJECTS;
  const dialog = document.getElementById('project-dialog');
  const gallery = document.getElementById('detail-gallery');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const previews = [...document.querySelectorAll('.preview-video')];
  const inView = new WeakMap();
  const manuallyPaused = new WeakMap();
  let lastTrigger;

  function loadVideo(video) {
    if (!video.getAttribute('src') && video.dataset.src) video.src = video.dataset.src;
  }

  function syncVideo(video,shouldPlay) {
    // Enable autoplay before assigning src, so lazy-loaded videos start without a click.
    video.autoplay = shouldPlay;
    if (!shouldPlay) {video.pause();return;}
    video.defaultMuted = true;
    video.muted = true;
    loadVideo(video);
    if (!video.paused) return;
    video.play().then(() => {
      // Loading can finish after the slide changes or the dialog closes.
      if (!video.autoplay || !video.isConnected) video.pause();
    }).catch(() => {}); // Keep the poster and manual controls if autoplay is blocked.
  }

  // The cover only plays its active video, and suspends offscreen or behind a dialog.
  const hero = document.querySelector('.hero');
  const slides = [...hero.querySelectorAll('.hero-slide')];
  const dots = [...hero.querySelectorAll('.hero-dot')];
  const heroPause = hero.querySelector('.hero-pause');
  document.getElementById('hero-total').textContent = String(slides.length).padStart(2,'0');
  let activeSlide = 0;
  let heroVisible = false;
  let heroPaused = false;
  let heroRotationPaused = reducedMotion.matches;
  let heroTimer;
  const heroCanPlay = () => heroVisible && !heroPaused && !document.hidden && !dialog.open;

  function syncHero() {
    window.clearTimeout(heroTimer);
    const playing = heroCanPlay();
    slides.forEach((slide,index) => {
      const video = slide.querySelector('video');
      if (!video) return;
      syncVideo(video,index === activeSlide && playing);
    });
    const rotationPaused = heroPaused || heroRotationPaused;
    heroPause.setAttribute('aria-label',rotationPaused ? '播放轮播' : '暂停轮播');
    heroPause.setAttribute('aria-pressed',String(rotationPaused));
    heroPause.firstElementChild.textContent = rotationPaused ? '▶' : 'Ⅱ';
    if (playing && !rotationPaused) heroTimer = window.setTimeout(() => showSlide(activeSlide + 1),6500);
  }

  function showSlide(index) {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide,i) => slide.classList.toggle('is-active',i === activeSlide));
    dots.forEach((dot,i) => {
      dot.classList.toggle('is-active',i === activeSlide);
      dot.setAttribute('aria-pressed',String(i === activeSlide));
    });
    hero.querySelector('.hero-slide-label').textContent = slides[activeSlide].dataset.label;
    document.getElementById('hero-current').textContent = String(activeSlide + 1).padStart(2,'0');
    syncHero();
  }

  dots.forEach(dot => dot.addEventListener('click',() => showSlide(Number(dot.dataset.slide))));
  hero.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click',() => showSlide(activeSlide + Number(button.dataset.direction)));
  });
  heroPause.addEventListener('click',() => {
    heroPaused = !(heroPaused || heroRotationPaused);
    heroRotationPaused = false;
    syncHero();
  });
  hero.addEventListener('keydown',event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    heroRotationPaused = true;
    showSlide(activeSlide + (event.key === 'ArrowRight' ? 1 : -1));
  });
  // Keep a selected slide stable for keyboard users while its video plays automatically.
  hero.addEventListener('focusin',event => {
    if (event.target !== heroPause && event.target.matches(':focus-visible')) {heroRotationPaused = true;syncHero();}
  });
  let touchStart;
  hero.addEventListener('touchstart',event => {
    if (event.touches.length !== 1 || event.target.closest('a,button')) {touchStart = null;return;}
    touchStart = {x:event.touches[0].clientX,y:event.touches[0].clientY};
  },{passive:true});
  hero.addEventListener('touchend',event => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) showSlide(activeSlide + (dx < 0 ? 1 : -1));
  },{passive:true});
  hero.addEventListener('touchcancel',() => {touchStart = null;},{passive:true});
  const heroObserver = new IntersectionObserver(entries => {
    heroVisible = entries[0].isIntersecting;
    syncHero();
  },{threshold:0});
  heroObserver.observe(hero);
  reducedMotion.addEventListener('change',() => {heroRotationPaused = reducedMotion.matches;syncHero();});
  document.addEventListener('visibilitychange',syncHero);

  const collections = [...document.querySelectorAll('.portfolio')];
  const timelineLinks = [...document.querySelectorAll('.timeline-entry')];
  let timelineFrame = 0;
  function updateTimeline() {
    timelineFrame = 0;
    const marker = Math.min(window.innerHeight * 0.3,240);
    let current = collections[0];
    collections.forEach(section => {
      if (section.getBoundingClientRect().top <= marker) current = section;
    });
    // A short final project may never reach the marker before the page ends.
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) current = collections.at(-1);
    timelineLinks.forEach(link => {
      if (link.hash === `#${current.id}`) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }
  function scheduleTimelineUpdate() {
    if (!timelineFrame) timelineFrame = window.requestAnimationFrame(updateTimeline);
  }
  window.addEventListener('scroll',scheduleTimelineUpdate,{passive:true});
  window.addEventListener('resize',scheduleTimelineUpdate);
  window.addEventListener('load',scheduleTimelineUpdate);
  updateTimeline();

  function setToggle(video) {
    const toggle = video.closest('.media-wrap')?.querySelector('.motion-toggle');
    if (!toggle) return;
    toggle.firstElementChild.textContent = video.paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', video.paused ? '播放动态预览' : '暂停动态预览');
    toggle.setAttribute('aria-pressed', String(!video.paused));
  }
  function syncPreview(video) {
    syncVideo(video,!!inView.get(video) && !manuallyPaused.get(video) && !document.hidden && !dialog.open);
    setToggle(video);
  }
  const previewObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { inView.set(entry.target,entry.isIntersecting); syncPreview(entry.target); });
  }, {threshold:0.15});
  previews.forEach(video => {
    manuallyPaused.set(video,false);
    video.addEventListener('play',() => setToggle(video));
    video.addEventListener('pause',() => setToggle(video));
    const toggle = video.closest('.media-wrap').querySelector('.motion-toggle');
    toggle.addEventListener('click',() => {
      manuallyPaused.set(video,!video.paused);
      syncPreview(video);
    });
    previewObserver.observe(video);
  });
  document.addEventListener('visibilitychange',() => {
    previews.forEach(syncPreview);
    gallery.querySelectorAll('video').forEach(syncDetail);
  });

  function syncDetail(video) {
    syncVideo(video,dialog.open && !!inView.get(video) && !document.hidden);
  }
  const detailObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      inView.set(video,entry.isIntersecting);
      syncDetail(video);
    });
  }, {root:dialog,threshold:0.05});

  function createItem(item,mediaPath) {
    const figure = document.createElement('figure');
    const mediaBase = `${mediaPath}/${item.file}`;
    if (item.video) {
      const video = document.createElement('video');
      video.poster = `${mediaBase}.webp`;
      video.dataset.src = `${mediaBase}.mp4`;
      video.controls = true;
      video.loop = true;
      video.muted = true;
      video.defaultMuted = true;
      video.autoplay = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('aria-label',item.alt);
      video.style.setProperty('--ratio',item.ratio);
      video.addEventListener('error',() => {
        if(figure.querySelector('.media-error'))return;
        const message=document.createElement('p');message.className='media-error';message.textContent='视频加载失败，请重新打开作品。';figure.append(message);
      });
      figure.append(video);
    } else {
      const img = document.createElement('img');
      img.src = `${mediaBase}.webp`;
      img.alt = item.alt;
      img.loading = 'lazy';
      img.decoding = 'async';
      figure.append(img);
    }
    if(item.caption) {
      const caption = document.createElement('figcaption');
      caption.textContent = item.caption;
      figure.append(caption);
    }
    return figure;
  }

  function openProject(id,trigger) {
    const project = projects[id];
    if(!project)return;
    lastTrigger = trigger;
    detailObserver.disconnect();
    gallery.querySelectorAll('video').forEach(v => syncVideo(v,false));
    gallery.replaceChildren();
    const collectionName = trigger.closest('.portfolio')?.querySelector('.works-heading h2')?.textContent;
    document.getElementById('detail-category').textContent=[collectionName,project.category].filter(Boolean).join(' / ');
    document.getElementById('detail-title').textContent=project.title;
    document.getElementById('detail-description').textContent=project.description;
    project.sections.forEach(section => {
      const el = document.createElement('section');el.className='detail-section';
      const h3 = document.createElement('h3');h3.textContent=section.title;
      const items = document.createElement('div');items.className='detail-items'+(section.pair?' pair':'');
      section.items.forEach(item => items.append(createItem(item,project.mediaPath)));
      el.append(h3,items);gallery.append(el);
    });
    dialog.showModal();
    dialog.scrollTop=0;
    document.documentElement.classList.add('modal-open');
    syncHero();
    previews.forEach(syncPreview);
    gallery.querySelectorAll('video').forEach(v => detailObserver.observe(v));
    document.querySelector('.close-dialog').focus({preventScroll:true});
  }
  document.querySelectorAll('[data-project]').forEach(trigger => {
    trigger.addEventListener('click',() => openProject(trigger.dataset.project,trigger));
  });
  document.querySelector('.close-dialog').addEventListener('click',() => dialog.close());
  dialog.addEventListener('click',event => {
    if(event.target!==dialog)return;
    const rect=dialog.getBoundingClientRect();
    if(event.clientX<rect.left||event.clientX>rect.right||event.clientY<rect.top||event.clientY>rect.bottom)dialog.close();
  });
  dialog.addEventListener('close',() => {
    detailObserver.disconnect();
    gallery.querySelectorAll('video').forEach(v => syncVideo(v,false));
    gallery.replaceChildren();
    document.documentElement.classList.remove('modal-open');
    syncHero();
    previews.forEach(syncPreview);
    lastTrigger?.focus({preventScroll:true});
  });
})();
