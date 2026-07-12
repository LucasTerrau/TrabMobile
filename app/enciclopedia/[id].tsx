import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { findEncyclopediaTopic } from '@/src/data/encyclopedia';
import { colors, spacing } from '@/src/theme/theme';

export default function EncyclopediaTopicScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const topic = id
    ? findEncyclopediaTopic(id)
    : undefined;

  if (!topic) {
    return (
      <Screen>
        <Text style={styles.title}>
          Assunto não encontrado
        </Text>

        <AppButton
          label="Voltar"
          onPress={() =>
            router.replace('/enciclopedia')
          }
        />
      </Screen>
    );
  }

  return (
    <Screen title={topic.title}>
      <View style={styles.block}>
        <Text style={styles.text}>
          {topic.introduction}
        </Text>
      </View>

      <Text style={styles.section}>
        Como utilizar
      </Text>

      <View style={styles.block}>
        {topic.tips.map((tip) => (
          <Text key={tip} style={styles.item}>
            • {tip}
          </Text>
        ))}
      </View>

      <Text style={styles.section}>
        Exemplos
      </Text>

      <View style={styles.block}>
        {topic.examples.map((example) => (
          <Text key={example} style={styles.item}>
            • {example}
          </Text>
        ))}
      </View>

      <AppButton
        label="Criar personagem"
        onPress={() => router.push('/criar/basico')}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
  },
  section: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  block: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  text: {
    color: colors.textMuted,
    fontSize: 15,
    lineHeight: 23,
  },
  item: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
});