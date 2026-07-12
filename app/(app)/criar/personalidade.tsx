import { router } from 'expo-router';
import {
  Alert,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { ChoiceCard } from '@/src/components/ChoiceCard';
import { Screen } from '@/src/components/Screen';
import { useCharacterDraft } from '@/src/contexts/CharacterDraftContext';
import {
  flaws,
  virtues,
} from '@/src/data/appData';
import { colors, spacing } from '@/src/theme/theme';

export default function PersonalityStepScreen() {
  const { draft, updateDraft } = useCharacterDraft();

  function continueCreation() {
    if (!draft.virtue || !draft.flaw) {
      Alert.alert(
        'Escolhas incompletas',
        'Escolha uma virtude e uma falha.',
      );
      return;
    }

    router.push('/criar/historia');
  }

  return (
    <Screen>
      <Text style={styles.step}>ETAPA 3 DE 5</Text>

      <Text style={styles.title}>
        Como ele costuma agir?
      </Text>

      <Text style={styles.sectionTitle}>
        Principal qualidade
      </Text>

      {virtues.map((virtue) => (
        <ChoiceCard
          key={virtue.value}
          title={virtue.label}
          description={virtue.description}
          selected={draft.virtue === virtue.value}
          onPress={() =>
            updateDraft({
              virtue: virtue.value,
            })
          }
        />
      ))}

      {draft.virtue ? (
        <>
          <Text style={styles.sectionTitle}>
            Principal problema
          </Text>

          {flaws.map((flaw) => (
            <ChoiceCard
              key={flaw.value}
              title={flaw.label}
              description={flaw.description}
              selected={draft.flaw === flaw.value}
              onPress={() =>
                updateDraft({
                  flaw: flaw.value,
                })
              }
            />
          ))}
        </>
      ) : null}

      {draft.virtue && draft.flaw ? (
        <View style={styles.preview}>
          <Text style={styles.previewTitle}>
            Durante o jogo
          </Text>

          <Text style={styles.previewText}>
            O personagem demonstra {draft.virtue}, mas pode causar
            problemas por causa de {draft.flaw}.
          </Text>
        </View>
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
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  preview: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  previewTitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: '700',
  },
  previewText: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: spacing.sm,
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