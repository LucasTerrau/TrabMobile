import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Screen } from '@/src/components/Screen';
import { encyclopediaTopics } from '@/src/data/encyclopedia';
import { colors, spacing } from '@/src/theme/theme';

export default function EncyclopediaScreen() {
  function openTopic(id: string) {
    router.push({
      pathname: '/enciclopedia/[id]',
      params: {
        id,
      },
    });
  }

  return (
    <Screen
      title="Enciclopédia"
      subtitle="Explicações rápidas para ajudar na interpretação."
    >
      {encyclopediaTopics.map((topic) => (
        <Pressable
          key={topic.id}
          onPress={() => openTopic(topic.id)}
          style={styles.card}
        >
          <Ionicons
            name="book-outline"
            size={25}
            color={colors.primary}
          />

          <Text style={styles.title}>
            {topic.title}
          </Text>

          <Ionicons
            name="chevron-forward"
            size={22}
            color={colors.textMuted}
          />
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontSize: 17,
    fontWeight: '700',
    marginHorizontal: spacing.md,
  },
});