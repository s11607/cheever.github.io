(() => {
  const root = document.documentElement;
  const themeKey = 'resume-theme';
  const langKey = 'resume-lang';
  const toggle = document.getElementById('themeToggle');
  const printBtn = document.getElementById('printBtn');
  const langToggle = document.getElementById('langToggle');
  const lastUpdated = document.getElementById('lastUpdated');
  const yearEl = document.getElementById('year');
  const jobTitle = document.getElementById('jobTitle');
  const footerUpdatedLabel = document.getElementById('footerUpdatedLabel');

  // 初始化主题
  const preferDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem(themeKey);
  const current = saved || (preferDark ? 'dark' : 'light');
  if (current === 'dark') root.setAttribute('data-theme', 'dark');

  // 切换主题
  toggle?.addEventListener('click', () => {
    const on = root.getAttribute('data-theme') === 'dark';
    if (on) {
      root.removeAttribute('data-theme');
      localStorage.setItem(themeKey, 'light');
    } else {
      root.setAttribute('data-theme', 'dark');
      localStorage.setItem(themeKey, 'dark');
    }
  });

  // 打印 / 下载 PDF（浏览器打印为 PDF）
  printBtn?.addEventListener('click', () => window.print());

  // 页脚信息
  try {
    const d = new Date(document.lastModified);
    lastUpdated && (lastUpdated.textContent = `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`);
  } catch {}
  yearEl && (yearEl.textContent = String(new Date().getFullYear()));

  // 语言切换：默认中文
  const mainZh = document.getElementById('main-zh');
  const mainEn = document.getElementById('main-en');

  function applyLang(lang) {
    const isZh = lang !== 'en';
    document.documentElement.lang = isZh ? 'zh-CN' : 'en';
    mainZh?.toggleAttribute('hidden', !isZh);
    mainEn?.toggleAttribute('hidden', isZh);
    // 更新页眉职位 & 页脚文案
    if (jobTitle) {
      const zh = jobTitle.getAttribute('data-i18n-zh');
      const en = jobTitle.getAttribute('data-i18n-en');
      jobTitle.textContent = isZh ? zh : en;
    }
    if (footerUpdatedLabel) {
      const zh = footerUpdatedLabel.getAttribute('data-i18n-zh');
      const en = footerUpdatedLabel.getAttribute('data-i18n-en');
      footerUpdatedLabel.textContent = isZh ? zh : en;
    }
    if (langToggle) langToggle.textContent = isZh ? 'EN' : '中文';
    // 更新标题
    document.title = isZh ? '杨掌州 · 个人简历' : 'Zhangzhou Yang · Resume';
    localStorage.setItem(langKey, isZh ? 'zh' : 'en');
  }

  const savedLang = localStorage.getItem(langKey) || 'zh';
  applyLang(savedLang);
  langToggle?.addEventListener('click', () => {
    const next = (localStorage.getItem(langKey) || 'zh') === 'zh' ? 'en' : 'zh';
    applyLang(next);
  });
})();
