
use myapp;
CREATE TABLE User (
  userId INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  enabled BOOLEAN DEFAULT true
);

CREATE TABLE MyGroup (
  id INT AUTO_INCREMENT PRIMARY KEY,
  groupName VARCHAR(50) NOT NULL,
  groupType VARCHAR(50) NOT NULL,
  groupBudget DECIMAL(10,2) DEFAULT 0.00
);
CREATE TABLE User_Group (
  userId INT NOT NULL,
  groupId INT NOT NULL,
  PRIMARY KEY (userId, id),
  FOREIGN KEY (userId) REFERENCES User(userId),
  FOREIGN KEY (id) REFERENCES MyGroup(id)
);

CREATE TABLE Expense (
  expId INT AUTO_INCREMENT PRIMARY KEY,
  expName VARCHAR(50) NOT NULL,
  expAmt DECIMAL(10,2) NOT NULL,
  expPaidBy INT NOT NULL,
  expGrp INT NOT NULL,
  FOREIGN KEY (expPaidBy) REFERENCES User(userId),
  FOREIGN KEY (expGrp) REFERENCES MyGroup(id)
);

CREATE TABLE Expense_User (
  expId INT NOT NULL,
  userId INT NOT NULL,
  PRIMARY KEY (expId, userId),
  FOREIGN KEY (expId) REFERENCES Expense(expId),
  FOREIGN KEY (userId) REFERENCES User(userId)
);

CREATE TABLE FinalSplit (
  finalSplitld INT AUTO_INCREMENT PRIMARY KEY,
  finalPayTo INT NOT NULL,
  finalPayBy INT NOT NULL,
  finalAmt DECIMAL(10,2) NOT NULL,
  expId INT NOT NULL,
  FOREIGN KEY (finalPayTo) REFERENCES User(userId),
  FOREIGN KEY (finalPayBy) REFERENCES User(userId),
  FOREIGN KEY (expId) REFERENCES Expense(expId)
);