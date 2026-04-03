# 🤝 Team Collaboration Guide

## Team Members & Branches

| Person   | Branch Name | 
|----------|-------------|
| Gokul    | `gokul`     |
| Friend 1 | `friend1`   |
| Friend 2 | `friend2`   |

> ⚠️ **Nobody pushes directly to `main`.** Always work in your own branch.

---

## 🚀 First Time Setup (One Time Only)

### Step 1: Clone the project
```bash
git clone https://github.com/gokul-71/venue-Booking.git
cd venue-Booking
```

### Step 2: Install dependencies
```bash
npm install
```

### Step 3: Switch to YOUR branch
```bash
# If you are Friend 1:
git checkout friend1

# If you are Friend 2:
git checkout friend2

# If you are Gokul:
git checkout gokul
```

### Step 4: Create a `.env` file with these values (ask Gokul for the actual values):
```
DATABASE_URL=your_database_url
PORT=3000
JWT_SECRET=your_secret
```

---

## 📅 Daily Workflow

### Before you start working:
```bash
# 1. Switch to main and get latest code
git checkout main
git pull origin main

# 2. Switch back to your branch
git checkout your-branch-name

# 3. Get the latest main code into your branch
git merge main
```

### After you finish working:
```bash
# 1. Save your changes
git add .
git commit -m "describe what you changed"

# 2. Push your branch
git push origin your-branch-name
```

### To merge your work into main (when your feature is ready):
1. Go to https://github.com/gokul-71/venue-Booking
2. Click **"Pull requests"** → **"New pull request"**
3. Set: `base: main` ← `compare: your-branch-name`
4. Click **"Create pull request"**
5. Team reviews it → Click **"Merge"**

---

## 📋 Quick Reference

| Action | Command |
|--------|---------|
| Get latest code | `git pull origin main` |
| Switch branch | `git checkout branch-name` |
| See which branch you're on | `git branch` |
| Save your work | `git add .` then `git commit -m "message"` |
| Push your work | `git push origin your-branch-name` |
| Merge main into your branch | `git checkout your-branch` then `git merge main` |

---

## ⚠️ Golden Rules

1. **Always work on YOUR branch** - never push to `main` directly
2. **Pull latest code every morning** before you start working
3. **Communicate** with your team about which files you're editing
4. **Merge to main via Pull Requests** on GitHub so everyone can review
