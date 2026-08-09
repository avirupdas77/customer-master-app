-- ===================================================
-- Customer Master Module Database Setup Script
-- Database: inventory_db
-- ===================================================

CREATE DATABASE IF NOT EXISTS inventory_db;
USE inventory_db;

-- Exact customermaster table structure
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

-- Sample Data Inserts for initial testing
INSERT INTO customermaster (CustomerCode, CustomerName, Email, MobileNo, Address, City, State, Status, CreatedDate) 
VALUES 
('CUST001', 'Acme Corporation', 'contact@acme.com', '9876543210', '100 Industrial Parkway', 'Mumbai', 'Maharashtra', 'Active', CURDATE()),
('CUST002', 'Global Logistics Ltd', 'info@globallogistics.org', '9123456789', '45 Trade Center', 'Bengaluru', 'Karnataka', 'Active', CURDATE()),
('CUST003', 'Apex Retail Solutions', 'support@apexretail.com', '9988776655', '12 Commercial Street', 'Delhi', 'Delhi', 'Inactive', CURDATE())
ON DUPLICATE KEY UPDATE CustomerCode=CustomerCode;