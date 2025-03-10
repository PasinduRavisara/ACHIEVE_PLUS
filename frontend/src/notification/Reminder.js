import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Reminder = () => {
  const [isActive, setIsActive] = useState(
    JSON.parse(localStorage.getItem("reminderActive") || "true")
  );

  useEffect(() => {
    let interval;

    if (isActive) {
      localStorage.setItem("reminderActive", JSON.stringify(true));

      interval = setInterval(() => {
        const message = "Take a break! You’ve been working for 30 minutes.";
        
        saveNotification(message);
        window.localStorage.removeItem("read")
        
        showNotification(message);

        setTimeout(() => {
          window.location.reload();
        }, 5 * 1000);
      },  1 * 60 * 1000); 
    } else {
      localStorage.setItem("reminderActive", JSON.stringify(false));
    }

    return () => clearInterval(interval);
  }, [isActive]);


  // Function to show toast and desktop notification
  const showNotification = (message) => {
    toast.warn(message);
    if (Notification.permission === "granted") {
      new Notification("Reminder", { body: message });
    }
  };

  // Save notifications in localStorage
  const saveNotification = (message) => {
    const notifications = JSON.parse(localStorage.getItem("notifications") || "[]");
    notifications.push({ message, time: new Date().toLocaleString() });
    localStorage.setItem("notifications", JSON.stringify(notifications));
  };

  
  return (
    <div>
      <ToastContainer position="top-right" autoClose={5000} />
    </div>
  );
};

export default Reminder;
