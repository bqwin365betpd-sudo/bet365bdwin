const themes = [
  { id: '01', name: '深翠绿', label: 'Forest', accent: '#23d464', bg: '#063f24', tint: '#051b12' },
  { id: '02', name: '金橙黄', label: 'Golden', accent: '#ffb629', bg: '#4b2708', tint: '#1c1006' },
  { id: '03', name: '蓝紫彩', label: 'Aurora', accent: '#9b6dff', bg: '#5334a8', tint: '#160f38' },
  { id: '04', name: '纯铂金', label: 'Platinum', accent: '#d8c3ff', bg: '#211456', tint: '#100b25' },
  { id: '05', name: '经典游戏蓝', label: 'Midnight', accent: '#28a4ff', bg: '#071f56', tint: '#06101f' },
  { id: '06', name: '经典游戏绿', label: 'Classic', accent: '#4bea5f', bg: '#086b36', tint: '#041b0e' },
  { id: '07', name: '厂商-游戏蓝', label: 'Studio', accent: '#2f7dff', bg: '#113da1', tint: '#07112f' },
  { id: '08', name: '厂商-绿V01', label: 'Vendor V1', accent: '#43da56', bg: '#0b5a2b', tint: '#06180d' },
  { id: '09', name: '厂商-绿V02', label: 'Vendor V2', accent: '#78ec4a', bg: '#156820', tint: '#071c0a' },
  { id: '10', name: '游戏-海盗蓝V01', label: 'Pirate', accent: '#28b7ff', bg: '#082b75', tint: '#051128' },
  { id: '11', name: '游戏-纯铂紫', label: 'Royal', accent: '#bd77ff', bg: '#3d2088', tint: '#120929' },
];

const providers = ['PG', 'JILI', 'PP', 'FC', 'CQ9', 'MG'];
const games = [
  { title: 'Golden Tiger', tag: 'Hot', icon: '🐯', color: '#ffb12d' },
  { title: 'Dragon Fortune', tag: 'New', icon: '🐉', color: '#f45c42' },
  { title: 'Sugar Spin', tag: 'Mega', icon: '🍭', color: '#ff6cc7' },
  { title: 'Space Rush', tag: 'Jackpot', icon: '🚀', color: '#4f9dff' },
  { title: 'Lucky Panda', tag: 'Top', icon: '🐼', color: '#38d45f' },
  { title: 'Pirate Gold', tag: 'Win', icon: '🏴‍☠️', color: '#ffcf4d' },
  { title: 'Wild Fruits', tag: 'Bonus', icon: '🍒', color: '#ff4d68' },
  { title: 'Royal Wheel', tag: 'VIP', icon: '👑', color: '#af7cff' },
];

let activeId = '06';
const app = document.querySelector('#app');

function icon(name) {
  const icons = {
    bell: '🔔', crown: '♛', flame: '🔥', game: '🎮', gift: '🎁', home: '⌂', menu: '☰',
    search: '⌕', shield: '✓', trophy: '🏆', user: '👤', wallet: '▣', zap: '⚡',
  };
  return `<span class="icon" aria-hidden="true">${icons[name] ?? '•'}</span>`;
}

function getActiveTheme() {
  return themes.find((theme) => theme.id === activeId) ?? themes[0];
}

function phoneMockup(theme, featured = false) {
  const mascot = theme.id === '10' ? '🚀' : theme.id === '07' ? '🎮' : '🦁';
  return `
    <article class="phone ${featured ? 'phone--featured' : ''}" style="--accent: ${theme.accent}; --phone-bg: ${theme.bg}; --phone-tint: ${theme.tint};">
      <div class="phone__status"><span>BDBet</span><span>9:41</span></div>
      <header class="phone__topbar">
        <div class="brand">${icon('crown')} BDBet</div>
        <button class="deposit" type="button">Deposit</button>
      </header>
      <section class="hero-card">
        <div>
          <p>Premium jackpots</p>
          <h3>৳ 1,000,000</h3>
          <button type="button">Play now</button>
        </div>
        <div class="hero-card__mascot">${mascot}</div>
      </section>
      <div class="quick-actions">
        <span>${icon('gift')} Bonus</span>
        <span>${icon('trophy')} Ranking</span>
        <span>${icon('wallet')} Wallet</span>
      </div>
      <nav class="provider-row" aria-label="Providers">
        ${providers.slice(0, 4).map((provider) => `<span>${provider}</span>`).join('')}
      </nav>
      <div class="section-title"><b>Popular</b><small>View all</small></div>
      <div class="game-grid">
        ${games.slice(0, 6).map((game) => `
          <div class="game-card">
            <span class="game-card__badge">${game.tag}</span>
            <span class="game-card__icon" style="background: ${game.color}">${game.icon}</span>
            <b>${game.title}</b>
          </div>
        `).join('')}
      </div>
      <footer class="bottom-nav">${icon('home')}${icon('flame')}${icon('game')}${icon('user')}</footer>
    </article>
  `;
}

function render() {
  const activeTheme = getActiveTheme();
  app.style.setProperty('--active', activeTheme.accent);
  app.style.setProperty('--active-bg', activeTheme.bg);

  app.innerHTML = `
    <section class="hero">
      <div class="hero__copy">
        <p class="eyebrow">${icon('shield')} Secure casino lobby concept</p>
        <h1>Premium mobile gaming UI inspired by multi-theme casino dashboards.</h1>
        <p class="hero__description">
          Choose from 11 polished color systems, preview the active mobile lobby, and launch a vivid iGaming-style experience for Bangladesh-focused audiences.
        </p>
        <div class="hero__actions">
          <a href="#themes" class="primary-action">${icon('zap')} Explore themes</a>
          <a href="#preview" class="secondary-action">Live preview</a>
        </div>
      </div>
      <div class="preview-stack" id="preview">
        <div class="preview-glow"></div>
        ${phoneMockup(activeTheme, true)}
      </div>
    </section>
    <section class="toolbar" aria-label="Lobby controls">
      <button type="button">${icon('menu')} Menu</button>
      <label>${icon('search')}<input type="search" placeholder="Search games, providers, events" /></label>
      <button type="button">${icon('bell')} Alerts</button>
    </section>
    <section class="themes" id="themes">
      <div class="section-heading">
        <p>11 ready-made layouts</p>
        <h2>Theme gallery</h2>
      </div>
      <div class="theme-grid">
        ${themes.map((theme) => `
          <button class="theme-tile ${activeId === theme.id ? 'theme-tile--active' : ''}" data-theme-id="${theme.id}" style="--tile-accent: ${theme.accent};" type="button">
            <span class="theme-tile__number">${theme.id}</span>
            <span class="theme-tile__name">${theme.name}</span>
            ${phoneMockup(theme)}
            <span class="theme-tile__label">${theme.label}</span>
          </button>
        `).join('')}
      </div>
    </section>
  `;

  document.querySelectorAll('[data-theme-id]').forEach((button) => {
    button.addEventListener('click', () => {
      activeId = button.dataset.themeId;
      render();
      document.querySelector('#preview')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  });
}

render();
