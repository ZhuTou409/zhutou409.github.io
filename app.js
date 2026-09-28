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
  function setToggle(video) {
    const toggle = video.closest('.media-wrap')?.querySelector('.motion-toggle');
    if (!toggle) return;
    toggle.firstElementChild.textContent = video.paused ? '▶' : 'Ⅱ';
    toggle.setAttribute('aria-label', video.paused ? '播放动态预览' : '暂停动态预览');
    toggle.setAttribute('aria-pressed', String(!video.paused));
  }
  function syncPreview(video) {
    if (inView.get(video) && !manuallyPaused.get(video) && !document.hidden && !dialog.open) {
      loadVideo(video);
      video.play().catch(() => setToggle(video));
    } else video.pause();
    setToggle(video);
  }
  const previewObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => { inView.set(entry.target,entry.isIntersecting); syncPreview(entry.target); });
  }, {threshold:0.15});
  previews.forEach(video => {
    manuallyPaused.set(video,reducedMotion.matches);
    video.addEventListener('play',() => setToggle(video));
    video.addEventListener('pause',() => setToggle(video));
    const toggle = video.closest('.media-wrap').querySelector('.motion-toggle');
    toggle.addEventListener('click',() => {
      manuallyPaused.set(video,!video.paused);
      syncPreview(video);
    });
    previewObserver.observe(video);
  });
  reducedMotion.addEventListener('change',() => {
    previews.forEach(video => {manuallyPaused.set(video,reducedMotion.matches);syncPreview(video);});
  });
  document.addEventListener('visibilitychange',() => {
    previews.forEach(syncPreview);
    if(document.hidden) gallery.querySelectorAll('video').forEach(v => v.pause());
  });

  const detailObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const video = entry.target;
      if (entry.isIntersecting) loadVideo(video);
      else video.pause();
    });
  }, {root:dialog,rootMargin:'150px'});

  function createItem(item) {
    const figure = document.createElement('figure');
    if (item.video) {
      const video = document.createElement('video');
      video.poster = `media/image${item.id}.webp`;
      video.dataset.src = `media/image${item.id}.mp4`;
      video.controls = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.preload = 'none';
      video.setAttribute('aria-label',item.alt);
      video.style.setProperty('--ratio',item.ratio);
      video.addEventListener('pointerdown',() => loadVideo(video),{once:true});
      video.addEventListener('focus',() => loadVideo(video),{once:true});
      video.addEventListener('error',() => {
        if(figure.querySelector('.media-error'))return;
        const message=document.createElement('p');message.className='media-error';message.textContent='视频加载失败，请重新打开作品。';figure.append(message);
      });
      figure.append(video);
    } else {
      const img = document.createElement('img');
      img.src = `media/image${item.id}.webp`;
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
    gallery.replaceChildren();
    document.getElementById('detail-category').textContent=project.category;
    document.getElementById('detail-title').textContent=project.title;
    document.getElementById('detail-description').textContent=project.description;
    project.sections.forEach(section => {
      const el = document.createElement('section');el.className='detail-section';
      const h3 = document.createElement('h3');h3.textContent=section.title;
      const items = document.createElement('div');items.className='detail-items'+(section.pair?' pair':'');
      section.items.forEach(item => items.append(createItem(item)));
      el.append(h3,items);gallery.append(el);
    });
    dialog.showModal();
    dialog.scrollTop=0;
    document.documentElement.classList.add('modal-open');
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
    gallery.querySelectorAll('video').forEach(v => v.pause());
    gallery.replaceChildren();
    document.documentElement.classList.remove('modal-open');
    previews.forEach(syncPreview);
    lastTrigger?.focus({preventScroll:true});
  });
})();
