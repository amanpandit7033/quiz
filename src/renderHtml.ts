export function renderHtml(content: string) {
	return `
		<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Computer Fundamentals Quiz</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;700;800&display=swap" rel="stylesheet">
<style>
  :root {
    --bg: #f8fafc;
    --surface: #ffffff;
    --surface2: #f1f5f9;
    --accent: #2563eb;
    --accent2: #7c3aed;
    --accent3: #ea580c;
    --green: #059669;
    --red: #dc2626;
    --text: #0f172a;
    --muted: #64748b;
    --border: #e2e8f0;
    --shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  }

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Syne', sans-serif;
    background: var(--bg);
    color: var(--text);
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 20px;
    background-image: 
      radial-gradient(circle at top left, rgba(37, 99, 235, 0.05), transparent 40%),
      radial-gradient(circle at bottom right, rgba(124, 58, 237, 0.05), transparent 40%);
  }

  #app {
    width: 100%;
    max-width: 720px;
  }

  /* ====== SCREENS ====== */
  .screen { display: none; animation: fadeIn 0.4s ease; }
  .screen.active { display: block; }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ====== START SCREEN ====== */
  #start-screen {
    text-align: center;
    padding: 60px 40px;
    background: var(--surface);
    border-radius: 24px;
    border: 1px solid var(--border);
    position: relative;
    box-shadow: var(--shadow-lg);
  }

  #start-screen::before {
    display: none;
  }

  .logo {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 6px;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 20px;
  }

  h1 {
    font-size: clamp(28px, 5vw, 44px);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 16px;
    background: linear-gradient(135deg, var(--text), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .subtitle {
    color: var(--muted);
    font-size: 16px;
    margin-bottom: 40px;
    line-height: 1.6;
  }

  .stats-row {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  .stat-item {
    text-align: center;
  }

  .stat-num {
    font-size: 32px;
    font-weight: 800;
    color: var(--accent);
    font-family: 'Space Mono', monospace;
    display: block;
  }

  .stat-label {
    font-size: 11px;
    letter-spacing: 2px;
    color: var(--muted);
    text-transform: uppercase;
    margin-top: 4px;
  }

  .btn {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 16px 40px;
    border-radius: 50px;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    border: none;
    text-decoration: none;
  }

  .btn-primary {
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    color: #fff;
    box-shadow: 0 0 30px rgba(0,229,255,0.2);
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px -5px rgba(37, 99, 235, 0.4);
    filter: brightness(1.1);
  }

  .btn-ghost {
    background: transparent;
    color: var(--muted);
    border: 1px solid var(--border);
  }

  .btn-ghost:hover {
    color: var(--text);
    border-color: var(--muted);
  }

  /* ====== INPUTS ====== */
  .input-group {
    margin-bottom: 32px;
    text-align: left;
  }

  .input-label {
    display: block;
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--muted);
    margin-bottom: 12px;
  }

  .input-field {
    width: 100%;
    padding: 16px 20px;
    background: var(--surface2);
    border: 2px solid var(--border);
    border-radius: 12px;
    color: var(--text);
    font-family: 'Syne', sans-serif;
    font-size: 16px;
    font-weight: 600;
    transition: all 0.2s ease;
  }

  .input-field:focus {
    outline: none;
    border-color: var(--accent);
    background: var(--surface);
    box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.1);
  }

  /* ====== LEADERBOARD TABLE ====== */
  .leaderboard-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }

  .leaderboard-table th {
    text-align: left;
    padding: 12px 16px;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: var(--muted);
    border-bottom: 2px solid var(--border);
  }

  .leaderboard-table td {
    padding: 16px;
    border-bottom: 1px solid var(--border);
    font-size: 14px;
    font-weight: 600;
  }

  .leaderboard-table tr:last-child td { border-bottom: none; }

  .rank-badge {
    width: 24px;
    height: 24px;
    border-radius: 6px;
    background: var(--surface2);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    margin-right: 12px;
  }

  .rank-1 .rank-badge { background: #fbbf24; color: #fff; }
  .rank-2 .rank-badge { background: #94a3b8; color: #fff; }
  .rank-3 .rank-badge { background: #b45309; color: #fff; }

  .score-val { color: var(--accent); font-family: 'Space Mono', monospace; font-weight: 700; }


  /* ====== QUIZ SCREEN ====== */
  #quiz-screen {
    background: var(--surface);
    border-radius: 24px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }

  .quiz-header {
    padding: 20px 28px;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }

  .progress-wrap {
    flex: 1;
  }

  .progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: var(--muted);
    margin-bottom: 8px;
    font-family: 'Space Mono', monospace;
  }

  .progress-bar {
    height: 4px;
    background: var(--border);
    border-radius: 2px;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    border-radius: 2px;
    transition: width 0.4s ease;
  }

  .score-badge {
    font-family: 'Space Mono', monospace;
    font-size: 13px;
    color: var(--accent);
    white-space: nowrap;
  }

  .quiz-body {
    padding: 36px 28px;
  }

  .q-num {
    font-family: 'Space Mono', monospace;
    font-size: 11px;
    letter-spacing: 3px;
    color: var(--accent);
    text-transform: uppercase;
    margin-bottom: 16px;
  }

  .q-text {
    font-size: clamp(17px, 2.5vw, 21px);
    font-weight: 700;
    line-height: 1.5;
    margin-bottom: 32px;
    color: var(--text);
  }

  .options-grid {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 28px;
  }

  .option {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 16px 20px;
    background: var(--surface2);
    border: 2px solid var(--border);
    border-radius: 14px;
    cursor: pointer;
    transition: all 0.2s ease;
    font-size: 15px;
    font-weight: 600;
    text-align: left;
  }

  .option:hover:not(.disabled) {
    border-color: var(--accent);
    background: rgba(37, 99, 235, 0.03);
    transform: translateX(4px);
  }

  .option .opt-letter {
    width: 32px;
    height: 32px;
    border-radius: 8px;
    background: var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    font-weight: 700;
    color: var(--muted);
    flex-shrink: 0;
    transition: all 0.2s ease;
  }

  .option:hover:not(.disabled) .opt-letter {
    background: var(--accent);
    color: #fff;
  }

  .option.correct {
    border-color: var(--green);
    background: rgba(16,185,129,0.1);
  }

  .option.correct .opt-letter {
    background: var(--green);
    color: #fff;
  }

  .option.wrong {
    border-color: var(--red);
    background: rgba(239,68,68,0.1);
  }

  .option.wrong .opt-letter {
    background: var(--red);
    color: #fff;
  }

  .option.disabled { cursor: not-allowed; }

  .feedback-box {
    display: none;
    padding: 14px 18px;
    border-radius: 12px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 20px;
    align-items: center;
    gap: 10px;
  }

  .feedback-box.show { display: flex; }
  .feedback-box.correct-fb { background: rgba(16,185,129,0.15); color: var(--green); border: 1px solid rgba(16,185,129,0.3); }
  .feedback-box.wrong-fb { background: rgba(239,68,68,0.1); color: var(--red); border: 1px solid rgba(239,68,68,0.25); }

  .quiz-footer {
    display: flex;
    justify-content: flex-end;
    padding: 0 28px 28px;
  }

  /* ====== RESULT SCREEN ====== */
  #result-screen {
    background: var(--surface);
    border-radius: 24px;
    border: 1px solid var(--border);
    padding: 52px 40px;
    text-align: center;
    box-shadow: var(--shadow-lg);
  }

  .result-emoji {
    font-size: 56px;
    margin-bottom: 20px;
    display: block;
  }

  .result-title {
    font-size: 32px;
    font-weight: 800;
    margin-bottom: 8px;
    background: linear-gradient(135deg, var(--text), var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .result-sub {
    color: var(--muted);
    margin-bottom: 40px;
    font-size: 15px;
  }

  .score-circle {
    width: 160px;
    height: 160px;
    border-radius: 50%;
    background: conic-gradient(var(--accent) var(--pct), var(--border) 0);
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 40px;
    position: relative;
  }

  .score-circle::before {
    content: '';
    position: absolute;
    width: 130px;
    height: 130px;
    border-radius: 50%;
    background: var(--surface);
  }

  .score-inner {
    position: relative;
    z-index: 1;
    text-align: center;
  }

  .score-pct {
    font-size: 36px;
    font-weight: 800;
    font-family: 'Space Mono', monospace;
    color: var(--accent);
    display: block;
  }

  .score-frac {
    font-size: 12px;
    color: var(--muted);
    font-family: 'Space Mono', monospace;
  }

  .result-stats {
    display: flex;
    justify-content: center;
    gap: 32px;
    margin-bottom: 40px;
    flex-wrap: wrap;
  }

  .rs-item {
    text-align: center;
  }

  .rs-val {
    font-size: 26px;
    font-weight: 800;
    font-family: 'Space Mono', monospace;
    display: block;
  }

  .rs-val.g { color: var(--green); }
  .rs-val.r { color: var(--red); }

  .rs-label {
    font-size: 11px;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 2px;
    margin-top: 4px;
  }

  .result-btns {
    display: flex;
    gap: 16px;
    justify-content: center;
    flex-wrap: wrap;
  }

  /* ====== REVIEW SCREEN ====== */
  #review-screen {
    background: var(--surface);
    border-radius: 24px;
    border: 1px solid var(--border);
    box-shadow: var(--shadow-lg);
    overflow: hidden;
  }

  .review-header {
    padding: 24px 28px;
    background: var(--surface2);
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .review-header h2 {
    font-size: 18px;
    font-weight: 800;
  }

  .review-list {
    padding: 24px 28px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-height: 70vh;
    overflow-y: auto;
  }

  .review-item {
    border: 1px solid var(--border);
    border-radius: 14px;
    overflow: hidden;
  }

  .review-q {
    padding: 14px 18px;
    font-weight: 700;
    font-size: 14px;
    display: flex;
    gap: 12px;
    background: var(--surface2);
  }

  .review-q .rq-num {
    color: var(--accent);
    font-family: 'Space Mono', monospace;
    font-size: 12px;
    white-space: nowrap;
  }

  .review-answers {
    padding: 12px 18px;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .ra-row {
    font-size: 13px;
    padding: 6px 10px;
    border-radius: 8px;
  }

  .ra-row.your-ans { background: rgba(239,68,68,0.1); color: var(--red); }
  .ra-row.correct-ans { background: rgba(16,185,129,0.1); color: var(--green); }
  .ra-row.same { background: rgba(16,185,129,0.1); color: var(--green); }

  .tag {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 1px;
    text-transform: uppercase;
    margin-right: 8px;
    opacity: 0.7;
  }

  /* scrollbar */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--surface2); }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 3px; }

  @media (max-width: 480px) {
    #start-screen { padding: 40px 24px; }
    .quiz-body { padding: 28px 20px; }
    .quiz-footer { padding: 0 20px 20px; }
    .stats-row { gap: 20px; }
  }
</style>
</head>
<body>
<div id="app">

  <!-- START -->
  <div id="start-screen" class="screen active">
    <div class="logo">⚡ Quiz Master</div>
    <h1>Computer Fundamentals</h1>
    <p class="subtitle">Test your knowledge with 50 randomly selected questions from a bank of 218 unique MCQs.</p>
    <div class="stats-row">
      <div class="stat-item">
        <span class="stat-num" id="total-q-display">—</span>
        <div class="stat-label">Total Questions</div>
      </div>
      <div class="stat-item">
        <span class="stat-num">50</span>
        <div class="stat-label">Per Session</div>
      </div>
      <div class="stat-item">
        <span class="stat-num" id="best-score-display">—</span>
        <div class="stat-label">Best Score</div>
      </div>
    </div>
    <div class="result-btns">
      <button class="btn btn-ghost" onclick="showLeaderboard()">
        🏆 Leaderboard
      </button>
      <button class="btn btn-primary" onclick="checkNameBeforeStart()">
        Start Quiz →
      </button>
    </div>
  </div>

  <!-- NAME ENTRY -->
  <div id="name-screen" class="screen">
    <div id="name-card" style="background:var(--surface); padding: 52px 40px; border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); text-align: center;">
      <div class="logo">👤 Identifying</div>
      <h2>Student Details</h2>
      <p class="subtitle">Please enter your name to track your progress and enter the global leaderboard.</p>
      
      <div class="input-group">
        <label class="input-label">Your Full Name</label>
        <input type="text" id="student-name-input" class="input-field" placeholder="e.g. John Doe" maxlength="30">
      </div>

      <div style="display: flex; gap: 16px; justify-content: center;">
        <button class="btn btn-ghost" onclick="showScreen('start-screen')">Back</button>
        <button class="btn btn-primary" onclick="confirmName()">Continue →</button>
      </div>
    </div>
  </div>

  <!-- LEADERBOARD -->
  <div id="leaderboard-screen" class="screen">
    <div style="background:var(--surface); border-radius: 24px; border: 1px solid var(--border); box-shadow: var(--shadow-lg); overflow: hidden;">
      <div class="quiz-header" style="justify-content: space-between;">
        <h2 style="font-size: 20px; font-weight: 800;">🏆 Global Leaderboard</h2>
        <button class="btn btn-ghost" onclick="showScreen('start-screen')" style="padding: 10px 20px; font-size: 14px;">← Back</button>
      </div>
      <div style="padding: 24px 28px;">
        <div id="leaderboard-loading" style="text-align: center; padding: 40px; color: var(--muted);">
          Loading scores...
        </div>
        <div id="leaderboard-empty" style="display: none; text-align: center; padding: 40px; color: var(--muted);">
          No scores yet. Be the first to play!
        </div>
        <table class="leaderboard-table" id="leaderboard-list" style="display: none;">
          <thead>
            <tr>
              <th>Rank & Name</th>
              <th style="text-align: right;">Score</th>
            </tr>
          </thead>
          <tbody id="leaderboard-body"></tbody>
        </table>
      </div>
    </div>
  </div>

  <!-- QUIZ -->
  <div id="quiz-screen" class="screen">
    <div class="quiz-header">
      <div class="progress-wrap">
        <div class="progress-info">
          <span id="q-counter">Question 1 of 50</span>
          <span id="time-left"></span>
        </div>
        <div class="progress-bar">
          <div class="progress-fill" id="progress-fill" style="width:2%"></div>
        </div>
      </div>
      <div class="score-badge" id="live-score">✓ 0</div>
    </div>

    <div class="quiz-body">
      <div class="q-num" id="q-num-label">Q1</div>
      <div class="q-text" id="q-text"></div>
      <div class="options-grid" id="options-grid"></div>
      <div class="feedback-box" id="feedback-box"></div>
    </div>

    <div class="quiz-footer">
      <button class="btn btn-primary" id="next-btn" onclick="nextQuestion()" style="display:none">
        Next →
      </button>
    </div>
  </div>

  <!-- RESULT -->
  <div id="result-screen" class="screen">
    <span class="result-emoji" id="result-emoji">🎯</span>
    <div class="result-title" id="result-title">Quiz Complete!</div>
    <div class="result-sub" id="result-sub">Here's how you did</div>
    <div class="score-circle" id="score-circle">
      <div class="score-inner">
        <span class="score-pct" id="score-pct">0%</span>
        <span class="score-frac" id="score-frac">0/50</span>
      </div>
    </div>
    <div class="result-stats">
      <div class="rs-item">
        <span class="rs-val g" id="res-correct">0</span>
        <div class="rs-label">Correct</div>
      </div>
      <div class="rs-item">
        <span class="rs-val r" id="res-wrong">0</span>
        <div class="rs-label">Wrong</div>
      </div>
      <div class="rs-item">
        <span class="rs-val" id="res-best" style="color:var(--accent3)">0%</span>
        <div class="rs-label">Best Score</div>
      </div>
    </div>
    <div class="result-btns">
      <button class="btn btn-ghost" onclick="showReview()">Review Answers</button>
      <button class="btn btn-primary" onclick="startQuiz()">Play Again →</button>
    </div>
  </div>

  <!-- REVIEW -->
  <div id="review-screen" class="screen">
    <div class="review-header">
      <h2>Answer Review</h2>
      <button class="btn btn-ghost" onclick="showResult()" style="padding:10px 20px;font-size:14px">← Back</button>
    </div>
    <div class="review-list" id="review-list"></div>
  </div>

</div>

<script>
let ALL_QUESTIONS = [];
let TOTAL = 50;
const LETTERS = ['A','B','C','D'];
const API_URL = ''; // Leave blank for same-origin (Worker)

let studentName = localStorage.getItem('cf_student_name') || '';

async function initApp() {
  try {
    const res = await fetch('questions.json');
    ALL_QUESTIONS = await res.json();
    document.getElementById('total-q-display').textContent = ALL_QUESTIONS.length;
    updateBestDisplay();
  } catch (err) {
    console.error('Failed to load questions:', err);
  }
}

initApp();

let sessionQuestions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];
let answered = false;

function checkNameBeforeStart() {
  if (!studentName) {
    showScreen('name-screen');
  } else {
    startQuiz();
  }
}

function confirmName() {
  const input = document.getElementById('student-name-input');
  const val = input.value.trim();
  if (val.length < 2) {
    alert('Please enter a valid name (min 2 chars)');
    return;
  }
  studentName = val;
  localStorage.setItem('cf_student_name', studentName);
  startQuiz();
}

async function showLeaderboard() {
  showScreen('leaderboard-screen');
  const loading = document.getElementById('leaderboard-loading');
  const empty = document.getElementById('leaderboard-empty');
  const list = document.getElementById('leaderboard-list');
  const body = document.getElementById('leaderboard-body');

  loading.style.display = 'block';
  empty.style.display = 'none';
  list.style.display = 'none';

  try {
    const res = await fetch(`\${API_URL}/api/leaderboard`);
    if (!res.ok) throw new Error('Failed to fetch');
    const data = await res.json();

    loading.style.display = 'none';
    if (!data || data.length === 0) {
      empty.style.display = 'block';
    } else {
      body.innerHTML = '';
      data.forEach((entry, i) => {
        const row = document.createElement('tr');
        row.className = `rank-${i + 1}`;
        row.innerHTML = `
          <td>
            <span class="rank-badge">${i + 1}</span>
            <span>${entry.name}</span>
          </td>
          <td style="text-align: right;">
            <span class="score-val">${entry.score}%</span>
          </td>
        `;
        body.appendChild(row);
      });
      list.style.display = 'table';
    }
  } catch (err) {
    loading.textContent = 'Unable to load leaderboard. Try again later.';
    console.error(err);
  }
}

async function submitScoreToServer(pct) {
  if (!studentName) return;
  try {
    await fetch(`\${API_URL}/api/score`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: studentName, score: pct })
    });
  } catch (err) {
    console.error('Failed to submit score:', err);
  }
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function getBest() {
  return parseInt(localStorage.getItem('cf_best') || '0');
}

function saveBest(pct) {
  const prev = getBest();
  if (pct > prev) localStorage.setItem('cf_best', pct);
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

function startQuiz() {
  sessionQuestions = shuffle(ALL_QUESTIONS).slice(0, TOTAL);
  currentIndex = 0;
  score = 0;
  userAnswers = [];
  answered = false;
  showScreen('quiz-screen');
  renderQuestion();
  updateBestDisplay();
}

function updateBestDisplay() {
  const b = getBest();
  document.getElementById('best-score-display').textContent = b ? b + '%' : '—';
}

function renderQuestion() {
  answered = false;
  const q = sessionQuestions[currentIndex];
  const num = currentIndex + 1;

  document.getElementById('q-counter').textContent = `Question ${num} of ${TOTAL}`;
  document.getElementById('progress-fill').style.width = `${(num / TOTAL) * 100}%`;
  document.getElementById('live-score').textContent = `✓ ${score}`;
  document.getElementById('q-num-label').textContent = `Q${num}`;
  document.getElementById('q-text').textContent = q.q;

  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  q.options.forEach((opt, i) => {
    const btn = document.createElement('button');
    btn.className = 'option';
    btn.innerHTML = `<span class="opt-letter">${LETTERS[i]}</span><span>${opt}</span>`;
    btn.onclick = () => selectAnswer(i);
    grid.appendChild(btn);
  });

  document.getElementById('feedback-box').className = 'feedback-box';
  document.getElementById('feedback-box').innerHTML = '';
  document.getElementById('next-btn').style.display = 'none';
}

function selectAnswer(chosen) {
  if (answered) return;
  answered = true;

  const q = sessionQuestions[currentIndex];
  const correct = q.answer;
  const options = document.querySelectorAll('.option');

  userAnswers.push({ q, chosen });

  options.forEach((btn, i) => {
    btn.classList.add('disabled');
    if (i === correct) btn.classList.add('correct');
    else if (i === chosen) btn.classList.add('wrong');
  });

  const fb = document.getElementById('feedback-box');
  if (chosen === correct) {
    score++;
    document.getElementById('live-score').textContent = `✓ ${score}`;
    fb.className = 'feedback-box correct-fb show';
    fb.innerHTML = '✅ Correct! Well done.';
  } else {
    fb.className = 'feedback-box wrong-fb show';
    fb.innerHTML = `❌ Wrong. Correct answer: <strong>${LETTERS[correct]}. ${q.options[correct]}</strong>`;
  }

  document.getElementById('next-btn').style.display = 'flex';
  document.getElementById('next-btn').textContent = currentIndex < TOTAL - 1 ? 'Next →' : 'See Results →';
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex >= TOTAL) {
    showResult();
  } else {
    renderQuestion();
  }
}

function showResult() {
  showScreen('result-screen');
  const pct = Math.round((score / TOTAL) * 100);
  saveBest(pct);
  updateBestDisplay();
  submitScoreToServer(pct); // Global high score submission

  document.getElementById('score-circle').style.setProperty('--pct', `${pct * 3.6}deg`);
  document.getElementById('score-pct').textContent = pct + '%';
  document.getElementById('score-frac').textContent = `${score}/${TOTAL}`;
  document.getElementById('res-correct').textContent = score;
  document.getElementById('res-wrong').textContent = TOTAL - score;
  document.getElementById('res-best').textContent = getBest() + '%';

  let emoji, title, sub;
  if (pct >= 90) { emoji = '🏆'; title = 'Outstanding!'; sub = 'You nailed it — top of the class!'; }
  else if (pct >= 75) { emoji = '🎯'; title = 'Great Job!'; sub = 'Strong performance — keep it up!'; }
  else if (pct >= 60) { emoji = '👍'; title = 'Good Effort!'; sub = 'Above average — a little more practice!'; }
  else if (pct >= 40) { emoji = '📚'; title = 'Keep Studying!'; sub = 'You can do better — review and retry!'; }
  else { emoji = '💪'; title = "Don't Give Up!"; sub = 'Practice makes perfect — try again!'; }

  document.getElementById('result-emoji').textContent = emoji;
  document.getElementById('result-title').textContent = title;
  document.getElementById('result-sub').textContent = sub;
}

function showReview() {
  showScreen('review-screen');
  const list = document.getElementById('review-list');
  list.innerHTML = '';

  userAnswers.forEach((item, i) => {
    const { q, chosen } = item;
    const isCorrect = chosen === q.answer;

    const div = document.createElement('div');
    div.className = 'review-item';

    div.innerHTML = `
      <div class="review-q">
        <span class="rq-num">Q${i + 1}</span>
        <span>${q.q}</span>
      </div>
      <div class="review-answers">
        ${isCorrect
          ? `<div class="ra-row same"><span class="tag">✓ Your Answer</span>${LETTERS[chosen]}. ${q.options[chosen]}</div>`
          : `<div class="ra-row your-ans"><span class="tag">✗ Your Answer</span>${LETTERS[chosen]}. ${q.options[chosen]}</div>
             <div class="ra-row correct-ans"><span class="tag">✓ Correct</span>${LETTERS[q.answer]}. ${q.options[q.answer]}</div>`
        }
      </div>
    `;
    list.appendChild(div);
  });
}

// Init
updateBestDisplay();
</script>
</body>
</html>

`;
}
