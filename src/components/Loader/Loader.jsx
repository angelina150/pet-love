import React, { useEffect, useRef, useState } from 'react';
import css from './Loader.module.css';

const Loader = ({ loading }) => {
  const [counter, setCounter] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (loading) {
      setCounter(0);
      setIsVisible(true);

      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCounter(prev => {
          if (prev < 100) {
            return prev + 1;
          } else {
            clearInterval(intervalRef.current);
            return 100;
          }
        });
      }, 50);
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCounter(prev => {
          if (prev < 100) {
            return prev + 2;
          } else {
            clearInterval(intervalRef.current);
            setTimeout(() => setIsVisible(false), 300);
            return 100;
          }
        });
      }, 10);
    }

    return () => clearInterval(intervalRef.current);
  }, [loading]);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={css.wrapper}>
      <div className={css.wrapperLoader}>
        <div className={css.loaderWrapper}>
          <img className={css.img} src="/images/loader.svg" alt="loader" />
          <span className={css.text}>{counter}%</span>
        </div>
      </div>
    </div>
  );
};

export default Loader;
