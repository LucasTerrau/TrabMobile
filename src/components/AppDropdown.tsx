import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import {
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, radius, spacing } from '@/src/theme/theme';

export type DropdownOption = {
  label: string;
  value: string;
};

type AppDropdownProps = {
  label: string;
  placeholder: string;
  value: string;
  options: DropdownOption[];
  onChange: (value: string) => void;
};

export function AppDropdown({
  label,
  placeholder,
  value,
  options,
  onChange,
}: AppDropdownProps) {
  const [visible, setVisible] = useState(false);

  const selectedOption = options.find(
    (option) => option.value === value,
  );

  function selectOption(option: DropdownOption) {
    onChange(option.value);
    setVisible(false);
  }

  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        onPress={() => setVisible(true)}
        style={({ pressed }) => [
          styles.selector,
          pressed && styles.pressed,
        ]}
      >
        <Text
          style={[
            styles.value,
            !selectedOption && styles.placeholder,
          ]}
        >
          {selectedOption?.label || placeholder}
        </Text>

        <Ionicons
          name="chevron-down"
          size={20}
          color={colors.textMuted}
        />
      </Pressable>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <Pressable
            style={StyleSheet.absoluteFill}
            onPress={() => setVisible(false)}
          />

          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>

              <Ionicons
                name="close"
                size={24}
                color={colors.text}
                onPress={() => setVisible(false)}
              />
            </View>

            <ScrollView>
              {options.map((option) => {
                const selected = option.value === value;

                return (
                  <Pressable
                    key={option.value}
                    onPress={() => selectOption(option)}
                    style={[
                      styles.option,
                      selected && styles.selectedOption,
                    ]}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        selected && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>

                    {selected ? (
                      <Ionicons
                        name="checkmark"
                        size={22}
                        color={colors.primary}
                      />
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  selector: {
    minHeight: 52,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pressed: {
    opacity: 0.75,
  },
  value: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  placeholder: {
    color: colors.textMuted,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: spacing.lg,
  },
  modalContent: {
    maxHeight: '70%',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.lg,
    padding: spacing.md,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  modalTitle: {
    color: colors.text,
    fontSize: 21,
    fontWeight: '900',
  },
  option: {
    minHeight: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingHorizontal: spacing.sm,
  },
  selectedOption: {
    backgroundColor: colors.surfaceRaised,
  },
  optionText: {
    flex: 1,
    color: colors.textMuted,
    fontSize: 16,
  },
  selectedOptionText: {
    color: colors.primary,
    fontWeight: '800',
  },
});