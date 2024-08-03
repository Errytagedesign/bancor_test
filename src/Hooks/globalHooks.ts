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

  return {
    loading,
    setLoading,
    errors,
    setErrors,
    formatDate,
  };
};
