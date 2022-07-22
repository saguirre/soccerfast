import { useState } from 'react';
import { Notification } from '@models';

export const useNotification = () => {
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [notification, setNotification] = useState<Notification>();
  const duration = notification?.duration || 5000;

  const createNotification = (notification: Notification) => {
    setNotification(notification);
    setShowNotification(true);
    startTimer();
  };

  const startTimer = (timerDuration: number = duration) => {
    setTimeout(() => {
      closeNotification();
    }, timerDuration);
  };

  const closeNotification = () => {
    setShowNotification(false);
  };

  return { createNotification, closeNotification, notification, showNotification };
};
