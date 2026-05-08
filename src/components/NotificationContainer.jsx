import { useContext } from "react";
import { NotificationContext } from "../contexts/NotificationContext";
import "./notification.css";

function NotificationContainer() {
  const { notifications, removeNotification } = useContext(NotificationContext);

  return (
    <div className="notification-container">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
        >
          <div className="notification-content">
            <span className="notification-message">{notification.message}</span>
            <button
              className="notification-close"
              onClick={() => removeNotification(notification.id)}
              aria-label="Close notification"
            >
              ×
            </button>
          </div>
          <div className="notification-progress">
            <div
              className="notification-progress-bar"
              style={{
                animation: "progress 4s linear forwards",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationContainer;
