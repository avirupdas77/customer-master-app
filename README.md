# Inventory Management System - Customer Master Module

A production-ready Customer Master Module built with **React.js**, **Node.js (Express.js)**, **MySQL**, and **Bootstrap 5**.

Location: `C:\Projects\customer-master-app\`

---

## ⚡ Setup & Run Instructions

### 1. Database Setup
Execute [`database_setup.sql`](file:///C:/Projects/customer-master-app/database_setup.sql) in your MySQL server (MySQL Workbench / Command Line):
```sql
CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

CREATE TABLE IF NOT EXISTS customermaster (
    CustomerId INT(11) NOT NULL AUTO_INCREMENT,
    CustomerCode VARCHAR(20) NOT NULL,
    CustomerName VARCHAR(100) NOT NULL,
    Email VARCHAR(100) DEFAULT NULL,
    MobileNo VARCHAR(15) DEFAULT NULL,
    Address VARCHAR(200) DEFAULT NULL,
    City VARCHAR(50) DEFAULT NULL,
    State VARCHAR(50) DEFAULT NULL,
    Status VARCHAR(10) DEFAULT NULL,
    CreatedDate DATE DEFAULT NULL,
    PRIMARY KEY (CustomerId),
    UNIQUE KEY CustomerCode (CustomerCode)
);
```

### 2. Environment Configuration
Check or update your database password in [`backend/.env`](file:///C:/Projects/customer-master-app/backend/.env):
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=inventory_db
DB_PORT=3306
```

### 3. Install & Start Application

In PowerShell / Command Prompt at `C:\Projects\customer-master-app`:

```bash
# 1. Install all dependencies (automatically sets up backend & frontend)
npm install

# 2. Start both Backend & Frontend simultaneously
npm start
```

- **Backend Express API**: `http://localhost:5000/customers`
- **Frontend React App**: Opens automatically at `http://localhost:3000`
