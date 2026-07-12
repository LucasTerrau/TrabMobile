import { router } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { useAuth } from '@/src/contexts/AuthContext';
import { homeImage } from '@/src/data/images';
import { colors, spacing } from '@/src/theme/theme';

export default function HomeScreen() {
  const { user } = useAuth();

  const username =
    user?.email?.split('@')[0] || 'aventureiro';

  return (
    <Screen>
      <Image
        source={homeImage}
        style={styles.hero}
      />

      <View style={styles.introduction}>
        <Text style={styles.welcome}>
          Olá, {username}
        </Text>

        <Text style={styles.description}>
          Crie rapidamente a história e a personalidade de um
          personagem de RPG.
        </Text>
      </View>

      <Text style={styles.title}>
        O que deseja fazer?
      </Text>

      <AppButton
        label="Criar personagem"
        onPress={() => router.push('/criar/basico')}
        style={styles.button}
      />

      <AppButton
        label="Meus personagens"
        onPress={() => router.push('/personagens')}
        variant="secondary"
        style={styles.button}
      />

      <AppButton
        label="Explorar regiões"
        onPress={() => router.push('/explorar')}
        variant="secondary"
        style={styles.button}
      />

      <View style={styles.help}>
        <Text style={styles.helpTitle}>
          Como funciona?
        </Text>

        <Text style={styles.helpText}>
          Escolha um nome e clique nas opções que combinam com sua
          ideia. No final, o aplicativo monta uma história e algumas
          dicas de interpretação.
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
    borderColor: colors.border,
    borderWidth: 1,
  },
  introduction: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderTopWidth: 0,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  welcome: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  button: {
    marginBottom: spacing.sm,
  },
  help: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  helpTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '700',
  },
  helpText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
});