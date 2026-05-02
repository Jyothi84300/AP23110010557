# 📢 Campus Notification System

A responsive frontend application built using React that helps users manage and track campus notifications efficiently. The system fetches real-time notifications from an API and presents them in a structured and user-friendly interface.

---

## 🎯 Project Overview

This application focuses on improving how users view and prioritize notifications such as:

- 📌 Placements  
- 📊 Results  
- 🎉 Events  

It provides both a complete notification list and a **Priority Inbox** to highlight important updates.

---

## 🚀 Key Features

- View all notifications with pagination  
- Filter notifications by type (Event, Result, Placement)  
- Priority Inbox (Top N important notifications)  
- Read / Unread status tracking  
- Responsive UI (Desktop + Mobile)  
- API-based data fetching  
- Loading & error handling  

---

## 🧠 Priority Logic

Notifications are sorted based on:

- Type Priority:  
  Placement > Result > Event  

- Recency:  
  Latest notifications appear first  

---

## 🏗️ Project Structure

```
<your_roll_number>/
├── logging_middleware/
├── notification_app_fe/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.jsx
│   └── package.json
├── notification_system_design.md
└── .gitignore
```

---

## ⚛️ Tech Stack

- React  
- JavaScript  
- Fetch API  
- Material UI / CSS  

---

## 🔌 API Details

Endpoint:
```
http://20.207.122.201/evaluation-service/notifications
```

Query Parameters:
- limit  
- page  
- notification_type  

---

## 📱 Application Pages

### All Notifications
- Displays all notifications  
- Supports filtering and pagination  

### Priority Inbox
- Shows top N important notifications  
- Sorted using priority logic  

---

## ⚙️ How to Run

```
npm install
npm run dev
```

Open:
```
http://localhost:3000
```

---

## 🧪 Features Implemented

- API integration  
- Filtering & pagination  
- Priority sorting logic  
- Read / unread UI handling  
- Responsive design  

---

## 🎯 Goal

The goal of this project is to provide a simple and efficient way to manage notifications by organizing, filtering, and prioritizing them without overwhelming the user.

---

## 👩‍💻 Author

Developed as part of a frontend assessment.
