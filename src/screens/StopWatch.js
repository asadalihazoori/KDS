import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Stopwatch = () => {
  const [running, setRunning] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const toggleTimer = () => {
    if (running) {
      clearInterval(intervalId);
      setRunning(false);
    } else {
      const id = setInterval(() => {
        setTimeElapsed(prevTime => prevTime + 1000); // Increment time by 1 second
      }, 1000); // Update every second
      setIntervalId(id);
      setRunning(true);
    }
  };

  const formatTime = timeInSeconds => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Stopwatch Timer</Text>
      <Text style={styles.timer}>{formatTime(Math.floor(timeElapsed / 1000))}</Text>
      <Button title={running ? 'Stop' : 'Start'} onPress={toggleTimer} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
  },
  timer: {
    fontSize: 40,
    marginBottom: 20,
  },
});

export default Stopwatch;
