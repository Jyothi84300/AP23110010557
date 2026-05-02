/**
 * Stage 1: Priority Inbox
 * Script to fetch notifications and print the top 10 most important ones.
 * Priority: Placement > Result > Event
 * Recency: Newer timestamp wins if types are the same.
 */

const ACCESS_CODE = "QkbpxH"; // Replace with your access code
let ACCESS_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJqeW90aGlzYWlwcml5YTIuc3VnZ3VsYUBnbWFpbC5jb20iLCJleHAiOjE3Nzc3MDY1MDUsImlhdCI6MTc3NzcwNTYwNSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6ImI4Y2JmY2UyLWNlYTItNGVlNy04ZTllLTQxOTJmZjgyNzA3OSIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6Imp5b3RoaSBzYWkgcHJpeWEgc3VnZ3VsYSIsInN1YiI6ImQwN2ZiM2Q5LTAyNmQtNGZhZi04YTkwLTM1YzliMzRkMTVhYiJ9LCJlbWFpbCI6Imp5b3RoaXNhaXByaXlhMi5zdWdndWxhQGdtYWlsLmNvbSIsIm5hbWUiOiJqeW90aGkgc2FpIHByaXlhIHN1Z2d1bGEiLCJyb2xsTm8iOiJhcDIzMTEwMDEwNTU3IiwiYWNjZXNzQ29kZSI6IlFrYnB4SCIsImNsaWVudElEIjoiZDA3ZmIzZDktMDI2ZC00ZmFmLThhOTAtMzVjOWIzNGQxNWFiIiwiY2xpZW50U2VjcmV0IjoiTUdoRUdWSnlTY3RaSGRRVSJ9.iTNI4ukhqGQnz6xn9uZXmMpPR5rrJf7S2Zh5HHUVc3A"; // You can manually paste your token here if needed
const API_URL = "http://20.207.122.201/evaluation-service/notifications";

const weightMap = {
  "Placement": 3,
  "Result": 2,
  "Event": 1
};

async function fetchAndPrioritizeNotifications() {
  try {
    if (!ACCESS_TOKEN) {
      console.error("Error: ACCESS_TOKEN is missing. Please paste your token in the script.");
      console.log(`Note: Your ACCESS_CODE is: ${ACCESS_CODE}`);
      return;
    }
    console.log("Fetching notifications from API...\n");
    
    // 1. Fetch Notifications
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${ACCESS_TOKEN}`,
        "Content-Type": "application/json"
      }
    });

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const notifications = data.notifications || [];

    console.log(`Successfully fetched ${notifications.length} notifications.`);
    console.log("Sorting based on priority (Placement > Result > Event) and recency...\n");

    // 2. Sort Notifications
    notifications.sort((a, b) => {
      const weightA = weightMap[a.Type] || 0;
      const weightB = weightMap[b.Type] || 0;
      
      // Compare Weights
      if (weightA !== weightB) {
        return weightB - weightA; // Descending order (higher weight first)
      }
      
      // Compare Timestamps (Recency)
      const timeA = new Date(a.Timestamp).getTime();
      const timeB = new Date(b.Timestamp).getTime();
      
      return timeB - timeA; // Descending order (newer first)
    });

    // 3. Extract Top 10
    const top10 = notifications.slice(0, 10);

    // 4. Print Results
    console.log("=== TOP 10 PRIORITY INBOX ===\n");
    top10.forEach((notif, index) => {
      console.log(`${index + 1}. [${notif.Type.toUpperCase()}] - ${notif.Message}`);
      console.log(`   Time: ${notif.Timestamp}`);
      console.log(`   ID: ${notif.ID}\n`);
    });

  } catch (error) {
    console.error("Failed to process priority inbox:", error);
  }
}

fetchAndPrioritizeNotifications();
