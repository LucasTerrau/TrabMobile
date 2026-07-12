import { router } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { useAuth } from '@/src/contexts/AuthContext';
import { colors, spacing } from '@/src/theme/theme';

export default function AboutScreen() {
  const { signOut } = useAuth();

  async function logout() {
    try {
      await signOut();
      router.replace('/');
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível sair da conta.',
      );
    }
  }

  return (
    <Screen title="Sobre">
      <View style={styles.block}>
        <Text style={styles.title}>
          Pathfinder Backstory
        </Text>

        <Text style={styles.text}>
          Aplicativo criado para ajudar jogadores a montar uma
          história simples e algumas ideias de interpretação para
          personagens de RPG.
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.subtitle}>
          O aplicativo permite
        </Text>

        <Text style={styles.item}>
          • Criar personagens por etapas.
        </Text>

        <Text style={styles.item}>
          • Salvar personagens no celular.
        </Text>

        <Text style={styles.item}>
          • Pesquisar, editar e excluir.
        </Text>

        <Text style={styles.item}>
          • Tirar ou escolher uma foto.
        </Text>

        <Text style={styles.item}>
          • Consultar regiões e dicas.
        </Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.text}>
          Projeto acadêmico desenvolvido com Expo, React Native,
          TypeScript, SQLite e Firebase.
        </Text>
      </View>

      <AppButton
        label="Sair da conta"
        onPress={logout}
        variant="secondary"
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  block: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  subtitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  text: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
  },
  item: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 23,
  },
});