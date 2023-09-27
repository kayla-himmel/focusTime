import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/colors';
import { RoundedButton } from '../components/RoundedButton';
import { spacing, fontSizes } from '../utils/sizes';

export const FocusInput = ({ addSubject }) => {
  const [subject, setSubject] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          onChangeText={setSubject}
          selectionColor={colors.darkPurple}
          label="What are you working on?"
        />
        <View style={styles.buttonWrapper}>
          <RoundedButton
            title="+"
            onPress={() => addSubject(subject)}
            style={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  buttonWrapper: {
    justifyContent: 'center',
  },
  button: {
    flex: 1,
    paddingHorizontal: spacing.md,
    width: spacing.xxxl,
  },
  textInput: {
    flex: 1,
    marginRight: spacing.sm,
    height: spacing.xxxl,
  },
  inputContainer: {
    padding: spacing.lg,
    justifyContent: 'top',
    flexDirection: 'row',
  },
});
