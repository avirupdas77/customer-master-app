# Beginner's Guide to Uploading Project to GitHub

Follow this simple step-by-step guide to upload your Customer Master project to GitHub.

---

## 📌 Part 1: Create a Repository on GitHub

1. Open your web browser and go to [https://github.com](https://github.com).
2. Log in (or Sign Up for a free account if you don't have one).
3. In the top-right corner, click the **`+`** icon and select **New repository**.
4. Fill in the details:
   - **Repository name**: `customer-master-app`
   - **Description**: `Full Stack Customer Master Module (React + Node.js + Express + MySQL)`
   - Choose **Public** or **Private**
   - ⚠️ **Important**: Leave "Add a README file", "Add .gitignore", and "Choose a license" **UNCHECKED** (we already have them).
5. Click **Create repository**.
6. Copy the repository URL (e.g. `https://github.com/YOUR_USERNAME/customer-master-app.git`).

---

## 📌 Part 2: Upload Using PowerShell / Terminal (Command Method)

Open PowerShell at your project folder (`C:\Projects\customer-master-app`):

```bash
# 1. Initialize Git in the project
git init

# 2. Add all project files
git add .

# 3. Commit files with a message
git commit -m "Initial commit of Customer Master Module"

# 4. Set main branch
git branch -M main

# 5. Link your local project to your GitHub repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/customer-master-app.git

# 6. Upload (push) your code to GitHub
git push -u origin main
```

---

## 📌 Part 3: Alternative - Using GitHub Desktop (Graphical App)

If you prefer a visual click-and-drag app without typing commands:

1. Download **[GitHub Desktop](https://desktop.github.com)** and install it.
2. Sign in with your GitHub account.
3. Click **File** ➔ **Add Local Repository...**.
4. Choose folder: `C:\Projects\customer-master-app`.
5. Click **Add Repository**.
6. Click **Publish repository** in the top right corner.
