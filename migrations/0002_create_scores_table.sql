-- Migration number: 0002 	 2024-12-28T10:00:00.000Z
CREATE TABLE IF NOT EXISTS scores (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    score INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Insert some dummy scores for testing the admin panel
INSERT INTO scores (name, score) VALUES ('Alice', 85);
INSERT INTO scores (name, score) VALUES ('Bob', 70);
INSERT INTO scores (name, score) VALUES ('Charlie', 95);
