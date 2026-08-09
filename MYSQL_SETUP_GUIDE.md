# Beginner's Step-by-Step Guide to MySQL Setup

This guide will walk you through installing MySQL and running `database_setup.sql` step by step.

---

## 📌 Method 1: Official MySQL Workbench (Recommended)

### Step 1: Download MySQL Installer
1. Open your web browser and go to: [https://dev.mysql.com/downloads/installer/](https://dev.mysql.com/downloads/installer/)
2. Click the **Download** button next to `mysql-installer-community-8.x.x.x.msi` (the larger file ~300 MB).
3. Click **"No thanks, just start my download"** at the bottom of the page.

### Step 2: Install MySQL
1. Double-click the downloaded file (`mysql-installer-community...msi`) to open it.
2. Select **Developer Default** and click **Next**.
3. Click **Execute** to download and install components, then click **Next**.
4. When you reach **Accounts and Roles**, set a password for the `root` user (for example: `root` or `admin123`).  
   ⚠️ **Important**: Remember this password!

### Step 3: Run `database_setup.sql` in MySQL Workbench
1. Open **MySQL Workbench** from your Windows Start Menu.
2. Click on **Local instance MySQL80** under MySQL Connections.
3. Enter your `root` password when prompted.
4. Click **File** ➔ **Open SQL Script...** (or press `Ctrl + O`).
5. Select `C:\Projects\customer-master-app\database_setup.sql`.
6. Click the ⚡ **Lightning Bolt icon** on the toolbar to run the script.
7. Look at the Action Output at the bottom — you will see green checkmarks ✅ for `CREATE DATABASE` and `CREATE TABLE`.

---

## 📌 Method 2: XAMPP / phpMyAdmin (Easiest Web Interface)

If you prefer a web interface:

### Step 1: Install XAMPP
1. Download XAMPP from [https://www.apachefriends.org](https://www.apachefriends.org)
2. Run the installer and finish setup with default options.

### Step 2: Start MySQL Service
1. Search for **XAMPP Control Panel** in Start Menu and open it.
2. Click **Start** next to **MySQL**.
3. Once it turns green, click the **Admin** button next to MySQL (or open `http://localhost/phpmyadmin` in your web browser).

### Step 3: Import SQL Script
1. In phpMyAdmin, click on the **Import** tab at the top.
2. Click **Choose File** and select `C:\Projects\customer-master-app\database_setup.sql`.
3. Scroll to the bottom and click **Import** (or **Go**).

---

## ⚙️ Final Step: Update Credentials in `.env`

Open `C:\Projects\customer-master-app\backend\.env` in Notepad and set your password:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD_HERE
DB_NAME=inventory_db
DB_PORT=3306
```

---

## 🚀 Run Your App

Open PowerShell / Command Prompt at `C:\Projects\customer-master-app`:
```bash
npm start
```
Your app will launch automatically on `http://localhost:3000`!
