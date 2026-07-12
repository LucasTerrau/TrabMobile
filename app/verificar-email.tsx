import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { useAuth } from '@/src/contexts/AuthContext';
import { colors, spacing } from '@/src/theme/theme';

export default function VerifyEmailScreen() {
  const {
    user,
    refreshUser,
    resendVerificationEmail,
    signOut,
  } = useAuth();

  const [loading, setLoading] = useState(false);

  async function checkEmail() {
    try {
      setLoading(true);

      const verified = await refreshUser();

      if (verified) {
        router.replace('/home');
        return;
      }

      Alert.alert(
        'Ainda não confirmado',
        'Abra o link enviado para seu e-mail.',
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível verificar a conta.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function resend() {
    try {
      setLoading(true);

      await resendVerificationEmail();

      Alert.alert(
        'E-mail enviado',
        'Confira também a pasta de spam.',
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Não foi possível reenviar',
        'Aguarde um pouco e tente novamente.',
      );
    } finally {
      setLoading(false);
    }
  }

  async function changeAccount() {
    await signOut();
    router.replace('/');
  }

  return (
    <Screen>
      <View style={styles.content}>
        <Ionicons
          name="mail-outline"
          size={70}
          color={colors.primary}
        />

        <Text style={styles.title}>
          Confirme seu e-mail
        </Text>

        <Text style={styles.email}>
          {user?.email}
        </Text>

        <Text style={styles.description}>
          Abra a mensagem enviada pelo Firebase e clique no link de
          confirmação.
        </Text>

        <AppButton
          label={
            loading
              ? 'Verificando...'
              : 'Já confirmei'
          }
          onPress={checkEmail}
          disabled={loading}
          style={styles.button}
        />

        <AppButton
          label="Reenviar e-mail"
          onPress={resend}
          disabled={loading}
          variant="secondary"
          style={styles.button}
        />

        <AppButton
          label="Usar outra conta"
          onPress={changeAccount}
          disabled={loading}
          variant="secondary"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingTop: spacing.xl,
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
    marginTop: spacing.lg,
  },
  email: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
    marginTop: spacing.sm,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
    marginVertical: spacing.lg,
  },
  button: {
    width: '100%',
    marginBottom: spacing.sm,
  },
});