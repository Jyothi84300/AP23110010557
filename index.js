// 3. Simplify Logging Middleware
export const Log = async (stack, level, packageName, message) => {
  try {
    const accessToken = localStorage.getItem("access_token");
    
    // If token is missing, log an error and return
    if (!accessToken) {
      console.error("Log failed: access_token is missing in localStorage");
      return;
    }

    // Send POST request to logging API
    await fetch("http://20.207.122.201/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      body: JSON.stringify({
        stack,
        level,
        package: packageName,
        message
      })
    });
  } catch (error) {
    console.error("Log API failed", error);
  }
};
