import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { useAuth } from '@/src/contexts/AuthContext';
import { colors, spacing } from '@/src/theme/theme';

export default function RegisterScreen() {
  const { signUp } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');
  const [loading, setLoading] = useState(false);

  async function register() {
    if (!email.trim()) {
      Alert.alert('E-mail obrigatório');
      return;
    }

    if (password.length < 6) {
      Alert.alert(
        'Senha muito curta',
        'Use pelo menos seis caracteres.',
      );
      return;
    }

    if (password !== confirmation) {
      Alert.alert(
        'Senhas diferentes',
        'Digite a mesma senha nos dois campos.',
      );
      return;
    }

    try {
      setLoading(true);

      await signUp(
        email.trim().toLowerCase(),
        password,
      );

      router.replace('/verificar-email');
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro no cadastro',
        'Talvez esse e-mail já esteja sendo utilizado.',
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.title}>Criar conta</Text>

      <Text style={styles.description}>
        Use um e-mail real para receber a confirmação.
      </Text>

      <Text style={styles.label}>E-mail</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="seuemail@exemplo.com"
        placeholderTextColor={colors.textMuted}
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.input}
      />

      <Text style={styles.label}>Senha</Text>

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Mínimo de seis caracteres"
        placeholderTextColor={colors.textMuted}
        secureTextEntry
        style={styles.input}
      />

      <Text style={styles.label}>Confirmar senha</Text>

      <TextInput
        value={confirmation}
        onChangeText={setConfirmation}
        placeholder="Digite novamente"
        placeholderTextColor={colors.textMuted}
        secureTextEntry
        style={styles.input}
      />

      <AppButton
        label={loading ? 'Criando...' : 'Criar conta'}
        onPress={register}
        disabled={loading}
        style={styles.button}
      />

      <AppButton
        label="Voltar ao login"
        onPress={() => router.replace('/')}
        variant="secondary"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 26,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  input: {
    minHeight: 49,
    color: colors.text,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    fontSize: 15,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
});