# Notification System & Logging Middleware

## Stage 1: Priority Inbox

### Objective
The goal is to maintain a Priority Inbox that displays the top 'N' (e.g., 10) most important unread notifications. Priority is determined by:
1. **Weight**: Placement > Result > Event
2. **Recency**: Newer timestamps have higher priority.

### Implementation Details
The script (`priority_inbox.js`) fetches notifications from the protected API and sorts them in descending order based on the custom priority rules, extracting only the top 10 for display.

### Efficiently Maintaining Top 10 (Streaming Data Approach)
When dealing with a static array, a simple `$O(N \log N)$` sorting algorithm works fine. However, in a real-world scenario where **new notifications keep coming in**, sorting the entire array every time is inefficient.

To maintain the top 10 efficiently:
* **Algorithm / Data Structure**: Use a **Min-Heap** (Priority Queue) of size $K=10$.
* **How it works**:
  1. Initialize an empty Min-Heap. The comparison function of the heap should place the *least* important notification (lowest weight/oldest time) at the top of the heap.
  2. As a new notification comes in, add it to the heap.
  3. If the heap size exceeds $K=10$, extract (remove) the minimum element from the top.
  4. This ensures that the 10 elements left in the heap are always the 10 *most* important notifications seen so far.
* **Time Complexity**: Inserting a new notification into a heap of size $K$ takes **$O(\log K)$** time. Since $K=10$ is a constant, processing each new notification happens in $O(1)$ time. This is vastly more efficient than re-sorting $O(N \log N)$ as the dataset grows.


---

## Frontend Flow (Logging Middleware)

1. **Initialization**: On page load, the application stores a predefined `access_token` in `localStorage`.
2. **Components**:
   - `Header`: Displays the application title and logs a "page load" event.
   - `ActionButtons`: Contains buttons that manually trigger explicit log events (info, debug, error).
   - `NotificationList`: Fetches notifications asynchronously and logs the start, success, and failure of the API request.
   - `StatusMessage`: Displays simple UI feedback.

## Logging Middleware (`Log`)

The `Log(stack, level, packageName, message)` function is a lightweight, reusable utility.
- It reads the `access_token` strictly from `localStorage`.
- If the token is missing, it logs a local error and exits.
- Otherwise, it sends a `POST` request to the central logging service with the structured payload.
- It uses a `try-catch` block to handle any network errors gracefully without crashing the application.
