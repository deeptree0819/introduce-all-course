#!/bin/bash

STARTER_DIR_PATH="$(cd "$(dirname "$0")" && pwd -P)"

echo "[INFO] Starter directory path: ${STARTER_DIR_PATH}"

#
# Read Inputs..
#
read -rp "Project name: " prjName
if ! [[ $prjName =~ ^[a-z]+([-_]+[a-z0-9]+)*$ ]]; then
  echo "[ERROR] 올바른 형식이 아닙니다."
  exit 1
fi

# Reset git
rm -rf .git

#
# Setup project-web
#
cd "$STARTER_DIR_PATH/starter-web"
cp .env.example .env

#
# Rename starter to project name
#
cd "$STARTER_DIR_PATH"
LC_CTYPE=C find . -type f ! -path "**/node_modules/*" ! -path "./.git/*" ! -name "README.md" ! -name "setup.sh" ! -name "*.svg" ! -name "*.png" ! -name "*.ico" -exec sed -i "" "s/starter/${prjName}/" {} \;
mv starter-web "$prjName-web"

# Git Setup
repoUrl="https://github.com/dolphin-in-cali/${prjName}.git"
git init
git add .
git commit -m "Project init"
git branch -M main
git remote add origin "$repoUrl"
gh repo create "dolphin-in-cali/$prjName" --private --team core
git push origin main
git checkout -B dev
git push origin dev

echo "[INFO] 스타터 설정 완료"
