import { router } from 'expo-router';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { ChoiceCard } from '@/src/components/ChoiceCard';
import { Screen } from '@/src/components/Screen';
import { useCharacterDraft } from '@/src/contexts/CharacterDraftContext';
import {
  adventureReasons,
  bonds,
  fears,
  goals,
} from '@/src/data/appData';
import { colors, spacing } from '@/src/theme/theme';

export default function HistoryStepScreen() {
  const { draft, updateDraft } = useCharacterDraft();

  function continueCreation() {
    if (
      !draft.goal ||
      !draft.fear ||
      !draft.bond ||
      !draft.adventureReason
    ) {
      Alert.alert(
        'Escolhas incompletas',
        'Escolha uma opção em cada parte.',
      );
      return;
    }

    router.push('/criar/resumo');
  }

  return (
    <Screen>
      <Text style={styles.step}>ETAPA 4 DE 5</Text>

      <Text style={styles.title}>
        O que move o personagem?
      </Text>

      <Text style={styles.help}>
        Escolha uma opção em cada parte.
      </Text>

      <Text style={styles.sectionTitle}>
        Qual é seu objetivo?
      </Text>

      {goals.map((option) => (
        <ChoiceCard
          key={option.value}
          title={option.label}
          description={option.description}
          selected={draft.goal === option.value}
          onPress={() =>
            updateDraft({
              goal: option.value,
            })
          }
        />
      ))}

      {draft.goal ? (
        <>
          <Text style={styles.sectionTitle}>
            Qual é seu maior medo?
          </Text>

          {fears.map((option) => (
            <ChoiceCard
              key={option.value}
              title={option.label}
              description={option.description}
              selected={draft.fear === option.value}
              onPress={() =>
                updateDraft({
                  fear: option.value,
                })
              }
            />
          ))}
        </>
      ) : null}

      {draft.fear ? (
        <>
          <Text style={styles.sectionTitle}>
            Qual é seu principal vínculo?
          </Text>

          {bonds.map((option) => (
            <ChoiceCard
              key={option.value}
              title={option.label}
              description={option.description}
              selected={draft.bond === option.value}
              onPress={() =>
                updateDraft({
                  bond: option.value,
                })
              }
            />
          ))}
        </>
      ) : null}

      {draft.bond ? (
        <>
          <Text style={styles.sectionTitle}>
            Por que começou a se aventurar?
          </Text>

          {adventureReasons.map((option) => (
            <ChoiceCard
              key={option.value}
              title={option.label}
              description={option.description}
              selected={
                draft.adventureReason === option.value
              }
              onPress={() =>
                updateDraft({
                  adventureReason: option.value,
                })
              }
            />
          ))}
        </>
      ) : null}

      {draft.adventureReason ? (
        <View style={styles.preview}>
          <Text style={styles.previewTitle}>
            Resumo das escolhas
          </Text>

          <Text style={styles.previewText}>
            Quer {draft.goal}, teme {draft.fear}, possui
            ligação com {draft.bond} e começou sua jornada
            porque {draft.adventureReason}.
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
          label="Ver personagem"
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
  help: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  preview: {
    backgroundColor: colors.surface,
    borderColor: colors.primary,
    borderWidth: 1,
    padding: spacing.md,
    marginTop: spacing.lg,
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