import React, { useState } from 'react';
import { View, StyleSheet, Text, Platform, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { spacing, fontSizes } from '../utils/sizes';
import { colors } from '../utils/colors';
import { Timing } from './Timing';

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {
  useKeepAwake();
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);
  const [minutes, setMinutes] = useState(0.1);

  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgress(1);
    reset();
    onTimerEnd(focusSubject);
  };

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={setProgress}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xl }}>
          <Text style={styles.title}>Currently, you are focusing on:</Text>
          <Text style={styles.task}>{focusSubject}</Text>
        </View>
      </View>

      {!isStarted ? (
        <View style={styles.chooseTimeWrapper}>
          <View style={styles.timingTextWrapper}>
            <Text style={styles.timingText}>
              How many minutes are you focusing on this?
            </Text>
          </View>
          <View style={styles.timingButtonWrapper}>
            <Timing onChangeTime={setMinutes} />
          </View>
        </View>
      ) : (
        <View style={{ paddingTop: spacing.sm }}>
          <ProgressBar
            progress={progress}
            color={colors.darkPurple}
            style={{ height: spacing.sm }}
          />
        </View>
      )}

      <View style={styles.buttonWrapper}>
        {!isStarted ? (
          <RoundedButton
            title="start"
            onPress={() => setIsStarted(true)}
            style={styles.startButton}
          />
        ) : (
          <RoundedButton
            title="pause"
            onPress={() => setIsStarted(false)}
            style={styles.pauseButton}
          />
        )}
      </View>

      <View style={styles.clearSubjectWrapper}>
        <RoundedButton
          title="Start Over"
          onPress={clearSubject}
          style={styles.clearButton}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
  countdown: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chooseTimeWrapper: {
    flex: 0.1,
    flexDirection: 'col',
    padding: spacing.lg,
  },
  timingButtonWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    padding: 0,
  },
  timingTextWrapper: {
    paddingVertical: spacing.md,
    flexWrap: 'wrap',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    paddingTop: spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: colors.green,
    fontSize: fontSizes.xxxl,
  },
  pauseButton: {
    backgroundColor: colors.purple,
    marginTop: 64,
  },
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 0.1,
  },
  clearButton: {
    backgroundColor: colors.red,
    width: 'auto',
    height: 'auto'
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: fontSizes.md,
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontSize: fontSizes.lg,
    fontWeight: 'bold',
  },
  timingText: {
    fontSize: fontSizes.md,
    color: colors.white,
    textAlign: 'center',
    paddingHorizontal: spacing.sm,
  },
});
