#!/bin/sh
set -eu
nohup '/Applications/Antigravity.app/Contents/MacOS/Electron' --remote-debugging-port=9001 "$@" >/dev/null 2>&1 &