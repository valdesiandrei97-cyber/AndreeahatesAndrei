document.addEventListener('DOMContentLoaded', () => {

  const INSTAGRAM_URL = 'https://www.instagram.com/andreigheo/';

  /* ---------- ambient bubbles ---------- */

  const bubblesEl = document.getElementById('bubbles');
  for (let i = 0; i < 16; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    b.style.setProperty('--size', `${3 + Math.random() * 6}px`);
    b.style.setProperty('--x', `${Math.random() * 100}%`);
    b.style.setProperty('--dur', `${9 + Math.random() * 10}s`);
    b.style.setProperty('--delay', `${Math.random() * 12}s`);
    b.style.setProperty('--drift', `${(Math.random() - 0.5) * 60}px`);
    bubblesEl.appendChild(b);
  }

  /* ---------- screen flow ---------- */

  const screens = Array.from(document.querySelectorAll('.screen'));
  function goTo(name) {
    screens.forEach(s => s.classList.toggle('is-active', s.dataset.screen === name));
  }

  /* ---------- screen 1: the dodging "No" ---------- */

  const yesBtn = document.getElementById('yesBtn');
  const noBtn = document.getElementById('noBtn');
  const noHint = document.getElementById('noHint');

  const dodgeLines = [
    "That button is on a break.",
    "Nice try. Wrong gate.",
    "Declining is not available on this route.",
    "The universe says: click the other one.",
    "That seat is taken.",
    "Even the dogs would say yes.",
    "Pairs well with a glass of wine. Click yes.",
  ];

  let dodgeActive = false;

  function dodgeNoButton() {
    const rect = noBtn.getBoundingClientRect();
    if (!dodgeActive) {
      noBtn.style.position = 'fixed';
      noBtn.style.left = `${rect.left}px`;
      noBtn.style.top = `${rect.top}px`;
      noBtn.style.margin = '0';
      dodgeActive = true;
      noBtn.offsetWidth; // force reflow so the first move animates too
    }
    const margin = 20;
    const maxX = window.innerWidth - rect.width - margin;
    const maxY = window.innerHeight - rect.height - margin;
    noBtn.style.left = `${margin + Math.random() * Math.max(0, maxX - margin)}px`;
    noBtn.style.top = `${margin + Math.random() * Math.max(0, maxY - margin)}px`;

    noHint.textContent = dodgeLines[Math.floor(Math.random() * dodgeLines.length)];
    noHint.hidden = false;
  }

  document.addEventListener('mousemove', (e) => {
    if (!document.querySelector('[data-screen="invite"]').classList.contains('is-active')) return;
    const rect = noBtn.getBoundingClientRect();
    const dist = Math.hypot(e.clientX - (rect.left + rect.width / 2), e.clientY - (rect.top + rect.height / 2));
    if (dist < 85) dodgeNoButton();
  });

  noBtn.addEventListener('touchstart', (e) => { e.preventDefault(); dodgeNoButton(); }, { passive: false });
  noBtn.addEventListener('click', (e) => { e.preventDefault(); dodgeNoButton(); });

  yesBtn.addEventListener('click', () => goTo('ticket'));

  /* ---------- screen 2: continue -> Instagram ---------- */

  const continueBtn = document.getElementById('continueBtn');
  const boardingMsg = document.getElementById('boardingMsg');

  continueBtn.addEventListener('click', () => {
    continueBtn.disabled = true;
    boardingMsg.hidden = false;
    setTimeout(() => { window.location.href = INSTAGRAM_URL; }, 900);
  });

});
