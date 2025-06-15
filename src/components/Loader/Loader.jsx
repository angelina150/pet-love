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
    } else if (!loading && counter < 100) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(() => {
          setCounter(prev => {
            if (prev < 100) {
              return prev + 1;
            } else {
              clearInterval(intervalRef.current);
              return 100;
            }
          });
        }, 5);
      }
    } else if (!loading && counter === 100) {
      const timeout = setTimeout(() => {
        setIsVisible(false);
      }, 300);
      return () => clearTimeout(timeout);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [loading, counter]);

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
