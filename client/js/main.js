import { api } from './api.js';
import { Engine } from './game/engine.js';
const btnHistory = document.getElementById('btn-play-history');
const btnBattle = document.getElementById('btn-play-battle');
const btnLeaderboard = document.getElementById('btn-leaderboard');
const screens = { menu: document.getElementById('menu-screen'), game: document.getElementById('game-screen'), leaderboard: document.getElementById('leaderboard-screen') };
const canvas = document.getElementById('game-canvas');

let engine;

btnHistory.addEventListener('click', () => startMode('history'));
btnBattle.addEventListener('click', () => startMode('battle'));
btnLeaderboard.addEventListener('click', showLeaderboard);
document.getElementById('btn-exit').addEventListener('click', () => { engine.stop(); showScreen('menu'); });

function showScreen(name) {
  Object.values(screens).forEach(s => s.classList.add('hidden'));
  if (name === 'menu') screens.menu.classList.remove('hidden');
  if (name === 'game') screens.game.classList.remove('hidden');
  if (name === 'leaderboard') screens.leaderboard.classList.remove('hidden');
}

async function showLeaderboard() {
  showScreen('leaderboard');
  const res = await api('/game/leaderboard');
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = '';
  if (res.success && res.data) {
    res.data.forEach(r => {
      const el = document.createElement('div');
      el.textContent = `${r.name || r.email} — ${r.total_score}`;
      list.appendChild(el);
    });
  } else {
    list.textContent = 'No data';
  }
  document.getElementById('btn-back').onclick = () => showScreen('menu');
}

function startMode(mode) {
  showScreen('game');
  engine = new Engine(canvas, mode, () => {
    // on game end save score
    fetch('/api/game/score', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({ score: engine.score, mode }) });
  });
  engine.start();
}

showScreen('menu');
