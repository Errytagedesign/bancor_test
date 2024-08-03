import { useState } from 'react';

export const useGlobalHooks = () => {
  const [loading, setLoading] = useState<{ [key: string | number]: boolean }>(
    {},
  );
  const [errors, setErrors] = useState({ error: false, errMessage: '' });

  const formatDate = (dateString: Date) => {
    const date = new Date(dateString);

    const options: Intl.DateTimeFormatOptions = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    };

    const formattedDate = date.toLocaleString('en-US', options);

    return formattedDate;
  };

  const formatTime = (TimeString: Date) => {
    const Time = new Date(TimeString);
    const hours = Time.getHours();
    const minutes = Time.getMinutes();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    const formattedHours = hours % 12 || 12;

    const timePart = `${formattedHours}:${minutes} ${amOrPm}`;

    return timePart;
  };

  return {
    loading,
    setLoading,
    errors,
    setErrors,
    formatDate,
    formatTime,
  };
};
