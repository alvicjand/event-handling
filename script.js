// ============================================================
//  Event Handling Demo — script.js
//  Subtask 4.1 → Access DOM Elements
// ============================================================

const output      = document.getElementById('output');
const clearLogBtn = document.getElementById('clearLog');

// Click card
const clickBtn    = document.getElementById('clickBtn');

// Input / Change card
const textInput   = document.getElementById('textInput');
const livePreview = document.getElementById('livePreview');

// Keyup card
const keyInput    = document.getElementById('keyInput');
const keyBadge    = document.getElementById('keyBadge');

// Focus / Blur card
const focusInput  = document.getElementById('focusInput');
const focusStatus = document.getElementById('focusStatus');

// Hover card
const hoverZone   = document.getElementById('hoverZone');
const hoverLabel  = document.getElementById('hoverLabel');

// Form card
const demoForm    = document.getElementById('demoForm');
const nameInput   = document.getElementById('nameInput');
const emailInput  = document.getElementById('emailInput');
const formResult  = document.getElementById('formResult');

// ============================================================
//  HELPER — log an event to the output panel
// ============================================================
let clickCount = 0;

function logEvent(type, message) {
  // Remove the placeholder paragraph on first log
  const placeholder = output.querySelector('.placeholder');
  if (placeholder) placeholder.remove();

  const now  = new Date();
  const time = now.toLocaleTimeString('en-US', { hour12: false });

  const entry = document.createElement('div');
  entry.className = 'log-entry';
  entry.innerHTML = `
    <span class="ts">${time}</span>
    <span class="tag tag-${type}">${type}</span>
    <span class="msg">${message}</span>
  `;

  output.prepend(entry); // newest entry at the top
}

// ============================================================
//  Clear log button
// ============================================================
clearLogBtn.addEventListener('click', () => {
  output.innerHTML = '<p class="placeholder">Events will appear here…</p>';
});

// ============================================================
//  Subtask 4.2 — click Event
// ============================================================
clickBtn.addEventListener('click', () => {
  clickCount++;
  logEvent('click', `Button clicked — total: ${clickCount}`);
});

// ============================================================
//  Subtask 4.3 — input and change Events
// ============================================================
textInput.addEventListener('input', (e) => {
  const val = e.target.value;
  livePreview.textContent = val.length ? val : '—';
  logEvent('input', `Typing… "${val}"`);
});

textInput.addEventListener('change', (e) => {
  logEvent('change', `Final value: "${e.target.value}"`);
});

// ============================================================
//  Subtask 4.5 — keyup Event
// ============================================================
keyInput.addEventListener('keyup', (e) => {
  const key = e.key === ' ' ? 'Space' : e.key;
  keyBadge.textContent = key;

  // pop animation
  keyBadge.classList.remove('pop');
  void keyBadge.offsetWidth; // force reflow to restart animation
  keyBadge.classList.add('pop');
  setTimeout(() => keyBadge.classList.remove('pop'), 200);

  logEvent('keyup', `Key released: "${key}" (code: ${e.code})`);
});

// ============================================================
//  Subtask 4.7 — focus and blur Events
// ============================================================
focusInput.addEventListener('focus', () => {
  focusInput.classList.add('is-focused');
  focusStatus.textContent = 'focused';
  focusStatus.classList.add('focused');
  logEvent('focus', 'Input gained focus');
});

focusInput.addEventListener('blur', () => {
  focusInput.classList.remove('is-focused');
  focusStatus.textContent = 'unfocused';
  focusStatus.classList.remove('focused');
  logEvent('blur', 'Input lost focus');
});

// ============================================================
//  Subtask 4.6 — mouseover and mouseout Events
// ============================================================
hoverZone.addEventListener('mouseover', () => {
  hoverZone.classList.add('hovered');
  hoverLabel.textContent = '🟡 Mouse is inside!';
  logEvent('mouseover', 'Cursor entered the hover zone');
});

hoverZone.addEventListener('mouseout', () => {
  hoverZone.classList.remove('hovered');
  hoverLabel.textContent = 'Hover here';
  logEvent('mouseout', 'Cursor left the hover zone');
});

// ============================================================
//  Subtask 4.4 — submit Event (prevents page reload)
// ============================================================
demoForm.addEventListener('submit', (e) => {
  e.preventDefault(); // ← prevent default page reload

  const name  = nameInput.value.trim();
  const email = emailInput.value.trim();

  formResult.textContent = `✓ Submitted! Hello, ${name} (${email})`;
  formResult.classList.remove('hidden');

  logEvent('submit', `Form submitted — name: "${name}", email: "${email}"`);

  // Reset after 3 seconds
  setTimeout(() => {
    demoForm.reset();
    formResult.classList.add('hidden');
  }, 3000);
});
