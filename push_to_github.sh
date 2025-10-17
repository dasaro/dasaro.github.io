#!/bin/bash

# Git Push Script for dasaro.github.io
# This script will initialize git (if needed) and push to GitHub

echo "🚀 Setting up git repository and pushing to GitHub..."
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository already exists"
fi

# Check if remote exists
if ! git remote | grep -q 'origin'; then
    echo "🔗 Adding remote repository..."
    git remote add origin https://github.com/dasaro/dasaro.github.io.git
    echo "✅ Remote added"
else
    echo "✅ Remote already configured"
    echo "   Current remote: $(git remote get-url origin)"
fi

# Ensure we're on main branch
echo ""
echo "🌿 Checking branch..."
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")
if [ -z "$CURRENT_BRANCH" ]; then
    echo "📝 Creating main branch..."
    git checkout -b main
elif [ "$CURRENT_BRANCH" != "main" ]; then
    echo "🔄 Switching to main branch..."
    git checkout -b main 2>/dev/null || git checkout main
fi

# Stage all changes
echo ""
echo "📁 Staging all files..."
git add .
echo "✅ Files staged"

# Show status
echo ""
echo "📊 Git status:"
git status --short

# Commit
echo ""
read -p "Enter commit message (or press Enter for default): " COMMIT_MSG
if [ -z "$COMMIT_MSG" ]; then
    COMMIT_MSG="Update website: animations, content, and styling improvements"
fi

echo "💾 Committing changes..."
git commit -m "$COMMIT_MSG"

# Push
echo ""
echo "⬆️  Pushing to GitHub..."
if git push -u origin main 2>&1 | tee /tmp/git_push.log; then
    echo ""
    echo "✅ Successfully pushed to GitHub!"
    echo ""
    echo "🌐 Your site will be live at: https://dasaro.github.io"
    echo "   (may take a few minutes to deploy)"
else
    echo ""
    echo "❌ Push failed. Check the error above."
    echo ""
    echo "Common fixes:"
    echo "1. If authentication failed:"
    echo "   - Run: gh auth login"
    echo "   - Or set up SSH keys: ssh-keygen -t ed25519 -C \"your_email@example.com\""
    echo ""
    echo "2. If branch exists remotely:"
    echo "   - Run: git pull origin main --allow-unrelated-histories"
    echo "   - Then run this script again"
    echo ""
    echo "3. If permission denied:"
    echo "   - Make sure you're authenticated with GitHub"
    echo "   - Run: gh auth status"
fi
