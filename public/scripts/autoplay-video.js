class AutoplayVideo extends HTMLElement {
  constructor() {
    super();
    this.orientationQuery = window.matchMedia('(orientation: portrait)');
    this.reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.onOrientationChange = this.onOrientationChange.bind(this);
    this.onReducedMotionChange = this.onReducedMotionChange.bind(this);
  }

  connectedCallback() {
    this.update();

    if (typeof this.orientationQuery.addEventListener === 'function') {
      this.orientationQuery.addEventListener('change', this.onOrientationChange);
    } else if (typeof this.orientationQuery.addListener === 'function') {
      this.orientationQuery.addListener(this.onOrientationChange);
    }

    if (typeof this.reducedMotionQuery.addEventListener === 'function') {
      this.reducedMotionQuery.addEventListener('change', this.onReducedMotionChange);
    } else if (typeof this.reducedMotionQuery.addListener === 'function') {
      this.reducedMotionQuery.addListener(this.onReducedMotionChange);
    }
  }

  disconnectedCallback() {
    if (typeof this.orientationQuery.removeEventListener === 'function') {
      this.orientationQuery.removeEventListener('change', this.onOrientationChange);
    } else if (typeof this.orientationQuery.removeListener === 'function') {
      this.orientationQuery.removeListener(this.onOrientationChange);
    }

    if (typeof this.reducedMotionQuery.removeEventListener === 'function') {
      this.reducedMotionQuery.removeEventListener('change', this.onReducedMotionChange);
    } else if (typeof this.reducedMotionQuery.removeListener === 'function') {
      this.reducedMotionQuery.removeListener(this.onReducedMotionChange);
    }
  }

  onOrientationChange() {
    this.update();
  }

  onReducedMotionChange() {
    this.update();
  }

  async update() {
    const useMobile = this.orientationQuery.matches;
    const activeKind = useMobile ? 'mobile' : 'desktop';
    const fallbackKind = useMobile ? 'desktop' : 'mobile';

    const videos = Array.from(this.querySelectorAll('[data-video]'));
    const posters = Array.from(this.querySelectorAll('[data-poster]'));

    const activePoster =
      this.querySelector(`[data-poster="${activeKind}"]`) ||
      this.querySelector(`[data-poster="${fallbackKind}"]`) ||
      posters[0] ||
      null;

    posters.forEach((poster) => {
      poster.classList.toggle('is-active', poster === activePoster);
    });

    const activeVideo =
      this.querySelector(`[data-video="${activeKind}"]`) ||
      this.querySelector(`[data-video="${fallbackKind}"]`) ||
      videos[0] ||
      null;

    videos.forEach((video) => {
      const isActive = video === activeVideo;
      video.classList.toggle('is-active', isActive);
      video.classList.remove('is-playing');

      const source = video.querySelector('source');
      if (!source) return;

      const shouldUseVideo = isActive && !this.reducedMotionQuery.matches;
      const nextSrc = shouldUseVideo ? source.dataset.src : '';
      if (source.getAttribute('src') !== nextSrc) {
        if (nextSrc) {
          source.setAttribute('src', nextSrc);
        } else {
          source.removeAttribute('src');
        }
        video.load();
      }

      if (!isActive) {
        video.pause();
        video.currentTime = 0;
      }
    });

    if (!activeVideo || this.reducedMotionQuery.matches) return;

    try {
      const onMediaFailure = () => {
        activeVideo.classList.remove('is-playing');
      };
      activeVideo.addEventListener('error', onMediaFailure, { once: true });
      activeVideo.addEventListener('stalled', onMediaFailure, { once: true });

      const playAttempt = activeVideo.play();
      if (playAttempt && typeof playAttempt.then === 'function') {
        await playAttempt;
      }
      activeVideo.classList.add('is-playing');
    } catch {
      // Keep poster visible when autoplay is blocked (e.g. low power mode).
      activeVideo.classList.remove('is-playing');
    }
  }
}

if (!customElements.get('autoplay-video')) {
  customElements.define('autoplay-video', AutoplayVideo);
}
