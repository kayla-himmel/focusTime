import React from 'react';
import { View, StyleSheet } from 'react-native';
import { RoundedButton } from '../components/RoundedButton';
import { colors } from '../utils/colors';

export const Timing = ({ onChangeTime }) => {
  return (
    <>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="3"
          onPress={() => onChangeTime(3)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="15"
          onPress={() => onChangeTime(15)}
        />
      </View>
      <View style={styles.timingButton}>
        <RoundedButton
          size={75}
          title="25"
          onPress={() => onChangeTime(25)}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  timingButton: {
    flex: 1,
    alignItems: 'center',
  }
});
