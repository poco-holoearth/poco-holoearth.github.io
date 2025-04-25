document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggle-theme');
  const body = document.body;
  const clock = document.getElementById('clock');
  if (!toggleBtn || !clock) return;

  // テーマの状態をlocalStorageで保存・復元
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    body.classList.add('dark');
    toggleBtn.textContent = '☀️';
  }

  function handleThemeToggle() {
    const isDark = body.classList.toggle('dark');
    const newIcon = isDark ? '☀️' : '🌙';
    if (toggleBtn.textContent !== newIcon) {
      toggleBtn.textContent = newIcon;
    }
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }
  toggleBtn.addEventListener('click', handleThemeToggle);

  // 時計の更新（setTimeoutで1秒ごとに限定）
  const daysOfWeek = ["日", "月", "火", "水", "木", "金", "土"];
  function updateClock() {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const h = now.getHours().toString().padStart(2, '0');
    const m = now.getMinutes().toString().padStart(2, '0');
    const s = now.getSeconds().toString().padStart(2, '0');
    const dayOfWeek = daysOfWeek[now.getDay()];
    const newText = `${year}/${month}/${day} (${dayOfWeek}) ${h}:${m}:${s}`;
    if (clock.textContent !== newText) {
      clock.textContent = newText;
    }
    setTimeout(updateClock, 1000 - now.getMilliseconds());
  }
  updateClock();
});
