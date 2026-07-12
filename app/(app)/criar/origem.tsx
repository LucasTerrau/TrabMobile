import { router } from 'expo-router';
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  originImages,
  regionImages,
} from '@/src/data/images';

import { AppButton } from '@/src/components/AppButton';
import { ChoiceCard } from '@/src/components/ChoiceCard';
import { Screen } from '@/src/components/Screen';
import { useCharacterDraft } from '@/src/contexts/CharacterDraftContext';
import {
  origins,
  regions,
} from '@/src/data/appData';
import { colors, spacing } from '@/src/theme/theme';

export default function OriginStepScreen() {
  const { draft, updateDraft } = useCharacterDraft();

  function continueCreation() {
    if (!draft.region || !draft.origin) {
      Alert.alert(
        'Escolhas incompletas',
        'Escolha uma região e uma origem.',
      );
      return;
    }

    router.push('/criar/personalidade');
  }

  return (
    <Screen>
      <Text style={styles.step}>ETAPA 2 DE 5</Text>

      <Text style={styles.title}>
        De onde ele veio?
      </Text>

      <Text style={styles.description}>
        Escolha uma região.
      </Text>

      {regions.map((region) => (
        <ChoiceCard
          key={region.value}
          title={region.label}
          description={region.description}
          imageSource={regionImages[region.value]}
          selected={draft.region === region.value}
          onPress={() =>
            updateDraft({
              region: region.value,
            })
          }
        />
      ))}

      {draft.region ? (
        <>
          <Text style={styles.sectionTitle}>
            Como ele cresceu?
          </Text>

          <Text style={styles.description}>
            Escolha uma origem.
          </Text>

        {origins.map((origin) => (
          <ChoiceCard
            key={origin.value}
            title={origin.label}
            description={origin.description}
            imageSource={originImages[origin.value]}
            selected={draft.origin === origin.value}
            onPress={() =>
              updateDraft({
                origin: origin.value,
              })
            }
          />
        ))}
        </>
      ) : null}

      <View style={styles.buttons}>
        <AppButton
          label="Voltar"
          onPress={() => router.back()}
          variant="secondary"
          style={styles.button}
        />

        <AppButton
          label="Continuar"
          onPress={continueCreation}
          style={styles.button}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  step: {
    color: colors.primary,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: colors.text,
    fontSize: 25,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  description: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
    marginTop: spacing.lg,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  button: {
    flex: 1,
  },
});