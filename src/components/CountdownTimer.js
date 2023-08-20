import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { FontStyle } from '../theme/FontStyle';

const CountdownTimer = ({ initialTime, running }) => {
  const [remainingTime, setRemainingTime] = useState(initialTime);

  useEffect(() => {

    if (!running) {
      return;
    }

    const interval = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [remainingTime, running]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <Text style={FontStyle.Bold12}>{formatTime(remainingTime)}</Text>
  );
};

export default CountdownTimer;


// use like this 

//{/* <CountdownTimer initialTime={order.time * 60} running={running} /> */}