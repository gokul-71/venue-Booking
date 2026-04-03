# 🤝 Team Collaboration Guide - CorpVenue

## Team Members, Branches & Roles

| Person       | Role       | Branch Name | Works On           |
|-------------|------------|-------------|---------------------|
| **Gokul**   | User Side  | `gokul`     | All user pages       |
| **Varatha**  | Owner Side | `varatha`   | All owner pages      |
| **Fami**     | Admin Side | `fami`      | All admin pages      |

> ⚠️ **Nobody pushes directly to `main`.** Always work in your own branch.

---

## 📂 File Assignments - WHO EDITS WHAT

### 🟢 Gokul (User Side)
Only Gokul should edit these files:
```
user_dashboard.html
user_listing.html
user_details.html
user_booking_request.html
user_booking_status.html
user_booking_status_approved.html
user_booking_status_rejected.html
user_booking_confirmed.html
user_payment_advance.html
```

### 🔵 Varatha (Owner Side)
Only Varatha should edit these files:
```
owner_dashboard.html
owner_add_venue.html
owner_bookings.html
owner_invoices.html
owner_manage_venue.html
js/add-venue.js
```

### 🟠 Fami (Admin Side)
Only Fami should edit these files:
```
admin_dashboard.html
admin_approvals.html
admin_bookings.html
admin_disputes.html
admin_users_owners.html
```

### 🔴 Shared Files (Ask Gokul Before Editing)
These files are shared. **Talk to the team before changing them:**
```
server.js         ← Backend API (Gokul manages, others can request changes)
index.html        ← Landing page
login.html        ← Login page
signup.html       ← Signup page
css/style.css     ← Styles
js/main.js        ← Shared JavaScript
.env              ← Environment variables (DO NOT push this to GitHub)
init.sql          ← Database schema
package.json      ← Dependencies
```

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

### Step 3: Create a `.env` file (ask Gokul for the values)
```
DATABASE_URL=ask_gokul_for_this
PORT=3000
JWT_SECRET=ask_gokul_for_this
```

### Step 4: Switch to YOUR branch
```bash
# Varatha:
git checkout varatha

# Fami:
git checkout fami
```

### Step 5: Run the project
```bash
node server.js
```
Open http://localhost:3000 in your browser.

---

## 📅 Daily Workflow

### ☀️ Before you start working (every day):
```bash
# 1. Switch to main and get latest code
git checkout main
git pull origin main

# 2. Switch back to your branch
git checkout your-branch-name

# 3. Get the latest main code into your branch
git merge main
```

### 🌙 After you finish working:
```bash
# 1. Save your changes
git add .
git commit -m "describe what you changed"

# 2. Push your branch
git push origin your-branch-name
```

### 🔀 To merge your work into main (when your feature is ready):
1. Go to https://github.com/gokul-71/venue-Booking
2. Click **"Pull requests"** → **"New pull request"**
3. Set: `base: main` ← `compare: your-branch-name`
4. Click **"Create pull request"**
5. Team reviews it → Click **"Merge"**

---

## 🔗 How Server.js Works for Each Role

The `server.js` file has API endpoints for all 3 roles:

| Your Role | API Endpoints You'll Use |
|-----------|--------------------------|
| **User (Gokul)** | `GET /api/venues`, `POST /api/bookings`, `GET /api/bookings?user_id=` |
| **Owner (Varatha)** | `POST /api/venues`, `GET /api/venues?owner_id=`, `GET /api/bookings?owner_id=`, `PATCH /api/bookings/:id/status` |
| **Admin (Fami)** | `GET /api/admin/venues/pending`, `PATCH /api/admin/venues/:id/status`, `GET /api/admin/users`, `PATCH /api/admin/users/:id/status` |

If you need a **new API endpoint**, tell Gokul and he will add it to `server.js`.

---

## ⚠️ Golden Rules

1. ✅ **Only edit YOUR assigned files** - never touch someone else's files
2. ✅ **Always `git pull` before you start working**
3. ✅ **Push your work at the end of the day**
4. ✅ **Ask Gokul before editing shared files** (server.js, css, etc.)
5. ❌ **Never push `.env` file to GitHub** - it has secret keys
