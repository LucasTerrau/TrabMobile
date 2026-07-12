import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { colors, spacing } from '@/src/theme/theme';

export default function NotFoundScreen() {
  return (
    <Screen>
      <View style={styles.content}>
        <Text style={styles.number}>404</Text>

        <Text style={styles.title}>
          Página não encontrada
        </Text>

        <Text style={styles.text}>
          O endereço acessado não existe.
        </Text>

        <AppButton
          label="Voltar para o início"
          onPress={() => router.replace('/home')}
          style={styles.button}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    minHeight: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  number: {
    color: colors.primary,
    fontSize: 54,
    fontWeight: '800',
  },
  title: {
    color: colors.text,
    fontSize: 23,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  text: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.sm,
  },
  button: {
    width: '100%',
    marginTop: spacing.lg,
  },
});