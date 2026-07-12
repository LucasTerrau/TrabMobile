import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, radius, spacing } from '@/src/theme/theme';

export type RadioOption = {
  label: string;
  value: string;
  description?: string;
};

type RadioCardGroupProps = {
  label: string;
  value: string;
  options: RadioOption[];
  onChange: (value: string) => void;
};

export function RadioCardGroup({
  label,
  value,
  options,
  onChange,
}: RadioCardGroupProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.groupLabel}>{label}</Text>

      {options.map((option) => {
        const selected = option.value === value;

        return (
          <Pressable
            key={option.value}
            onPress={() => onChange(option.value)}
            style={[
              styles.option,
              selected && styles.selectedOption,
            ]}
          >
            <View
              style={[
                styles.radioOuter,
                selected && styles.selectedRadioOuter,
              ]}
            >
              {selected ? (
                <View style={styles.radioInner} />
              ) : null}
            </View>

            <View style={styles.textArea}>
              <Text
                style={[
                  styles.optionLabel,
                  selected && styles.selectedLabel,
                ]}
              >
                {option.label}
              </Text>

              {option.description ? (
                <Text style={styles.description}>
                  {option.description}
                </Text>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  groupLabel: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  selectedOption: {
    borderColor: colors.primary,
    backgroundColor: colors.surfaceRaised,
  },
  radioOuter: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderColor: colors.textMuted,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.md,
    marginTop: 1,
  },
  selectedRadioOuter: {
    borderColor: colors.primary,
  },
  radioInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  textArea: {
    flex: 1,
  },
  optionLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  selectedLabel: {
    color: colors.primary,
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
});