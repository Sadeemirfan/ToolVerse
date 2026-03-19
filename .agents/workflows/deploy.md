---
description: How to develop and deploy ToolVerse changes
---

# ToolVerse Deploy Workflow

## IMPORTANT RULE
**ALWAYS follow these steps in order. NEVER push to GitHub/Netlify without explicit user approval.**

## Step 1 — Make the code changes
Implement whatever the user has requested.

## Step 2 — Start local dev server
// turbo
Run the local dev server so the user can preview changes:
```
pnpm --dir client dev
```
Or if using npm:
```
npm run dev --prefix client
```
The local server runs at: **http://localhost:5173**

Tell the user: "Local server chal raha hai. http://localhost:5173 par check karein aur jab tayyar hon to bolen 'push karo'."

## Step 3 — Wait for user approval
**DO NOT push to GitHub/Netlify yet.** Wait until the user explicitly says something like:
- "push karo"
- "live karo"
- "deploy karo"
- "theek hai push kar do"

## Step 4 — Push to GitHub and Netlify (only after user approval)
Sync files and push:
```powershell
robocopy "c:\Users\irfan\ToolVerse" "C:\Users\irfan\OneDrive\Documents\GitHub\ToolVerse" /E /XD node_modules .git .netlify /XF .gitignore .gitkeep /MT /R:1 /W:1
git --git-dir="C:\Users\irfan\OneDrive\Documents\GitHub\ToolVerse\.git" --work-tree="C:\Users\irfan\OneDrive\Documents\GitHub\ToolVerse" add .
git --git-dir="C:\Users\irfan\OneDrive\Documents\GitHub\ToolVerse\.git" --work-tree="C:\Users\irfan\OneDrive\Documents\GitHub\ToolVerse" commit -m "Your commit message here"
git --git-dir="C:\Users\irfan\OneDrive\Documents\GitHub\ToolVerse\.git" --work-tree="C:\Users\irfan\OneDrive\Documents\GitHub\ToolVerse" push origin agent-rules-and-push-changes-616a:main
```
Netlify will automatically build and deploy within 2-3 minutes.
