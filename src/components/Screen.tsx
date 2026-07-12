import { PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, spacing } from '@/src/theme/theme';

type ScreenProps = PropsWithChildren<{
  title?: string;
  subtitle?: string;
}>;

export function Screen({
  title,
  subtitle,
  children,
}: ScreenProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {title ? (
            <View style={styles.header}>
              <Text style={styles.title}>{title}</Text>

              {subtitle ? (
                <Text style={styles.subtitle}>
                  {subtitle}
                </Text>
              ) : null}
            </View>
          ) : null}

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    flex: 1,
  },
  content: {
    flexGrow: 1,
    padding: spacing.md,
    paddingBottom: spacing.xl,
  },
  header: {
    marginBottom: spacing.lg,
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
  },
});