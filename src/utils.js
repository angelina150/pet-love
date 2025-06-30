import { useEffect, useState } from 'react';

export const formatDate = isoDate => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
export const formatDatePetsList = isoDate => {
  const date = new Date(isoDate);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};
export const formatPhoneNumber = phone => {
  const cleaned = phone.replace(/[^\d+]/g, '');

  return cleaned.replace(
    /^(\+380)(\d{2})(\d{3})(\d{2})(\d{2})$/,
    '$1 $2 $3 $4 $5'
  );
};

const useWindowWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export default useWindowWidth;
export const getTokenExpiration = token => {
  if (!token) return null;

  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) return null;

    const payload = JSON.parse(atob(payloadBase64));

    if (payload && typeof payload.exp === 'number') {
      return payload.exp * 1000;
    }

    return null;
  } catch (e) {
    console.error('Ошибка при разборе токена:', e);
    return null;
  }
};
