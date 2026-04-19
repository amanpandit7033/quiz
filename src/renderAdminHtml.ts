export function renderAdminHtml() {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quiz Master | Admin Dashboard</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --bg: #0f172a;
            --surface: #1e293b;
            --surface-light: #334155;
            --accent: #3b82f6;
            --accent-glow: rgba(59, 130, 246, 0.5);
            --text-main: #f8fafc;
            --text-muted: #94a3b8;
            --success: #10b981;
            --border: rgba(255, 255, 255, 0.1);
            --sidebar-width: 260px;
        }

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            font-family: 'Inter', sans-serif;
            background: var(--bg);
            color: var(--text-main);
            min-height: 100vh;
            display: flex;
        }

        /* Sidebar */
        .sidebar {
            width: var(--sidebar-width);
            background: var(--surface);
            border-right: 1px solid var(--border);
            display: flex;
            flex-direction: column;
            padding: 24px;
            position: fixed;
            height: 100vh;
            z-index: 100;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 800;
            font-size: 20px;
            margin-bottom: 48px;
            color: var(--accent);
        }

        .nav-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px 16px;
            border-radius: 12px;
            color: var(--text-muted);
            text-decoration: none;
            font-weight: 500;
            transition: all 0.2s;
            margin-bottom: 8px;
        }

        .nav-item:hover, .nav-item.active {
            color: var(--text-main);
            background: var(--surface-light);
        }

        .nav-item.active {
            color: var(--accent);
            background: rgba(59, 130, 246, 0.1);
        }

        /* Main Content */
        .main {
            margin-left: var(--sidebar-width);
            flex: 1;
            padding: 40px;
        }

        .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 40px;
        }

        h1 { font-size: 32px; font-weight: 800; }

        /* Stats Grid */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
            gap: 24px;
            margin-bottom: 48px;
        }

        .stat-card {
            background: var(--surface);
            padding: 24px;
            border-radius: 24px;
            border: 1px solid var(--border);
            position: relative;
            overflow: hidden;
        }

        .stat-card::after {
            content: '';
            position: absolute;
            top: 0; right: 0;
            width: 100px; height: 100px;
            background: radial-gradient(circle at center, var(--accent-glow), transparent 70%);
            opacity: 0.1;
            transform: translate(30%, -30%);
        }

        .stat-label { font-size: 14px; color: var(--text-muted); margin-bottom: 8px; }
        .stat-value { font-size: 32px; font-weight: 800; font-family: 'Space Mono', monospace; }

        /* Table */
        .table-container {
            background: var(--surface);
            border-radius: 24px;
            border: 1px solid var(--border);
            overflow: hidden;
        }

        .table-header {
            padding: 24px;
            border-bottom: 1px solid var(--border);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th {
            text-align: left;
            padding: 16px 24px;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            color: var(--text-muted);
            background: rgba(255,255,255,0.02);
        }

        td {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border);
            font-size: 14px;
        }

        .user-cell { display: flex; align-items: center; gap: 12px; font-weight: 600; }
        .avatar {
            width: 32px; height: 32px;
            border-radius: 8px;
            background: var(--surface-light);
            display: flex; align-items: center; justify-content: center;
            font-size: 14px;
            color: var(--accent);
        }

        .score-badge {
            background: rgba(16, 185, 129, 0.1);
            color: var(--success);
            padding: 4px 12px;
            border-radius: 100px;
            font-family: 'Space Mono', monospace;
            font-weight: 700;
        }

        @media (max-width: 768px) {
            .sidebar { display: none; }
            .main { margin-left: 0; padding: 24px; }
        }
    </style>
</head>
<body>
    <div class="sidebar">
        <div class="logo">
            <span>⚡</span> Quiz Master Admin
        </div>
        <a href="/admin" class="nav-item active">Dashboard</a>
        <a href="#" class="nav-item">Questions</a>
        <a href="#" class="nav-item">Settings</a>
        <div style="margin-top: auto;">
            <a href="/" class="nav-item">View Site ↗</a>
        </div>
    </div>

    <div class="main">
        <div class="header">
            <div>
                <h1>Admin Dashboard</h1>
                <p style="color: var(--text-muted); margin-top: 4px;">Manage your quiz metrics and players.</p>
            </div>
            <button style="background: var(--accent); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 600; cursor: pointer;">
                Export Data
            </button>
        </div>

        <div class="stats-grid">
            <div class="stat-card">
                <div class="stat-label">Total Participants</div>
                <div class="stat-value" id="stat-total">--</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Average Score</div>
                <div class="stat-value" id="stat-avg">--%</div>
            </div>
            <div class="stat-card">
                <div class="stat-label">Top Performance</div>
                <div class="stat-value" id="stat-top">--%</div>
            </div>
        </div>

        <div class="table-container">
            <div class="table-header">
                <h3 style="font-size: 18px;">Recent Scores</h3>
                <div style="font-size: 14px; color: var(--text-muted);">Showing last 10 submissions</div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Player</th>
                        <th>Score</th>
                        <th>Date</th>
                    </tr>
                </thead>
                <tbody id="scores-body">
                    <tr>
                        <td colspan="3" style="text-align: center; color: var(--text-muted); padding: 48px;">
                            Loading data...
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <script>
        async function loadStats() {
            try {
                const res = await fetch('/api/leaderboard');
                const data = await res.json();
                
                if (data && data.length > 0) {
                    const total = data.length;
                    const top = data[0].score;
                    const avg = Math.round(data.reduce((acc, curr) => acc + curr.score, 0) / total);

                    document.getElementById('stat-total').textContent = total;
                    document.getElementById('stat-top').textContent = top + '%';
                    document.getElementById('stat-avg').textContent = avg + '%';

                    const body = document.getElementById('scores-body');
                    body.innerHTML = '';
                    data.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = \`
                            <td>
                                <div class="user-cell">
                                    <div class="avatar">\${item.name[0].toUpperCase()}</div>
                                    \${item.name}
                                </div>
                            </td>
                            <td><span class="score-badge">\${item.score}%</span></td>
                            <td style="color: var(--text-muted)">Recent</td>
                        \`;
                        body.appendChild(row);
                    });
                } else {
                    document.getElementById('scores-body').innerHTML = '<tr><td colspan="3" style="text-align: center; padding: 48px;">No data yet.</td></tr>';
                }
            } catch (err) {
                console.error(err);
            }
        }

        loadStats();
    </script>
</body>
</html>
    `;
}
