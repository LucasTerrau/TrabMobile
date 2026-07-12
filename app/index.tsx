import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { useAuth } from '@/src/contexts/AuthContext';
import { homeImage } from '@/src/data/images';
import { colors, spacing } from '@/src/theme/theme';

export default function LoginScreen() {
  const { user, loading: authLoading, signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [entering, setEntering] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      if (user.emailVerified) {
        router.replace('/home');
      } else {
        router.replace('/verificar-email');
      }
    }
  }, [authLoading, user]);

  async function login() {
    if (!email.trim() || !password) {
      Alert.alert(
        'Dados incompletos',
        'Preencha o e-mail e a senha.',
      );
      return;
    }

    try {
      setEntering(true);

      await signIn(
        email.trim().toLowerCase(),
        password,
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Não foi possível entrar',
        'Confira o e-mail, a senha e sua conexão.',
      );
    } finally {
      setEntering(false);
    }
  }

  if (authLoading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />

        <Text style={styles.loadingText}>
          Carregando...
        </Text>
      </View>
    );
  }

  return (
    <Screen>
      <Image
        source={homeImage}
        style={styles.image}
      />

      <Text style={styles.title}>
        Pathfinder Backstory
      </Text>

      <Text style={styles.description}>
        Crie uma base simples para interpretar seu personagem.
      </Text>

      <Text style={styles.label}>E-mail</Text>

      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder="seuemail@exemplo.com"
        placeholderTextColor={colors.textMuted}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        style={styles.input}
      />

      <Text style={styles.label}>Senha</Text>

      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder="Digite sua senha"
        placeholderTextColor={colors.textMuted}
        secureTextEntry
        autoCapitalize="none"
        style={styles.input}
        onSubmitEditing={login}
      />

      <AppButton
        label={entering ? 'Entrando...' : 'Entrar'}
        onPress={login}
        disabled={entering}
        style={styles.button}
      />

      <AppButton
        label="Criar uma conta"
        onPress={() => router.push('/cadastro')}
        variant="secondary"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    color: colors.textMuted,
    marginTop: spacing.md,
  },
  image: {
    width: '100%',
    height: 190,
    resizeMode: 'cover',
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.xs,
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
    fontSize: 15,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  button: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
});