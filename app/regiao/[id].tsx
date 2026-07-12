import { router, useLocalSearchParams } from 'expo-router';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import {
  initialCharacterDraft,
  useCharacterDraft,
} from '@/src/contexts/CharacterDraftContext';
import { regionImages } from '@/src/data/images';
import { findRegionById } from '@/src/data/regions';
import { colors, spacing } from '@/src/theme/theme';

export default function RegionDetailsScreen() {
  const params = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const id = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const region = id
    ? findRegionById(id)
    : undefined;

  const { loadDraft } = useCharacterDraft();

  if (!region) {
    return (
      <Screen>
        <Text style={styles.title}>
          Região não encontrada
        </Text>

        <AppButton
          label="Voltar"
          onPress={() => router.replace('/explorar')}
        />
      </Screen>
    );
  }
  const selectedRegion = region;
  function startCharacter() {
  loadDraft({
    ...initialCharacterDraft,
    region: selectedRegion.name,
  });
    router.push('/criar/basico');
  }

  return (
    <Screen>
      <Image
        source={regionImages[region.name]}
        style={styles.image}
      />

      <Text style={styles.title}>{region.name}</Text>

      <Text style={styles.description}>
        {region.description}
      </Text>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>
          Trabalhos comuns
        </Text>

        {region.occupations.map((occupation) => (
          <Text key={occupation} style={styles.item}>
            • {occupation}
          </Text>
        ))}
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>
          Ideias de personagem
        </Text>

        {region.characterIdeas.map((idea) => (
          <Text key={idea} style={styles.item}>
            • {idea}
          </Text>
        ))}
      </View>

      <AppButton
        label="Criar personagem desta região"
        onPress={startCharacter}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 230,
    resizeMode: 'cover',
    borderColor: colors.border,
    borderWidth: 1,
  },
  title: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
    marginTop: spacing.md,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  block: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  blockTitle: {
    color: colors.primary,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  item: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
  },
});