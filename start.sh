#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")" && pwd)"
NODE_DIR="$ROOT/node-v22.16.0-darwin-arm64/bin"
NODE="$NODE_DIR/node"

if [[ ! -x "$NODE" ]]; then
  echo "Node не найден: $NODE" >&2
  echo "Сайт нельзя открыть напрямую через index.html — нужен dev-сервер Vite." >&2
  exit 1
fi

export PATH="$NODE_DIR:$PATH"

echo "Запуск сайта: http://127.0.0.1:5173"
echo "Остановка: Ctrl+C"

exec "$NODE" "$ROOT/node_modules/vite/bin/vite.js" --host 127.0.0.1 --port 5173 "$@"