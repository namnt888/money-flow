#!/bin/sh
set -eu
nohup '/Users/namnguyen/Library/Mobile Documents/com~apple~CloudDocs/Github Nov25/money-flow-3/Start Antigravity (CDP 9001).command' --remote-debugging-port=9000 "$@" >/dev/null 2>&1 &
