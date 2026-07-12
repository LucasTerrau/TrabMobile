import Ionicons from '@expo/vector-icons/Ionicons';
import { router } from 'expo-router';
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { Screen } from '@/src/components/Screen';
import { regionImages } from '@/src/data/images';
import { regions } from '@/src/data/regions';
import { colors, spacing } from '@/src/theme/theme';

export default function ExploreScreen() {
  function openRegion(id: string) {
    router.push({
      pathname: '/regiao/[id]',
      params: {
        id,
      },
    });
  }

  return (
    <Screen
      title="Regiões"
      subtitle="Escolha uma região para conhecer algumas ideias."
    >
      {regions.map((region) => (
        <Pressable
          key={region.id}
          onPress={() => openRegion(region.id)}
          style={({ pressed }) => [
            styles.card,
            pressed && styles.pressed,
          ]}
        >
          <Image
            source={regionImages[region.name]}
            style={styles.image}
          />

          <View style={styles.bottom}>
            <View style={styles.textArea}>
              <Text style={styles.name}>
                {region.name}
              </Text>

              <Text
                style={styles.description}
                numberOfLines={2}
              >
                {region.shortDescription}
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={23}
              color={colors.primary}
            />
          </View>
        </Pressable>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.75,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  bottom: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
  },
  textArea: {
    flex: 1,
    marginRight: spacing.sm,
  },
  name: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.xs,
  },
});