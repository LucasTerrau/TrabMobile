import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSQLiteContext } from 'expo-sqlite';

import { AppButton } from '@/src/components/AppButton';
import { Screen } from '@/src/components/Screen';
import { useCharacterDraft } from '@/src/contexts/CharacterDraftContext';
import { createCharacter } from '@/src/database/database';
import { colors, spacing } from '@/src/theme/theme';

function createBackstory(
  name: string,
  region: string,
  origin: string,
  virtue: string,
  flaw: string,
  goal: string,
  fear: string,
  bond: string,
  adventureReason: string,
) {
  return `${name} veio de ${region} e cresceu em ${origin}. Sua principal qualidade é ${virtue}, embora ${flaw} frequentemente complique suas decisões. Seu maior objetivo é ${goal}, mas teme ${fear}. Seu vínculo mais importante é ${bond}. Começou sua vida de aventuras porque ${adventureReason}.`;
}

function createTips(
  virtue: string,
  flaw: string,
  fear: string,
  bond: string,
) {
  const tips = [
    `Mostre ${virtue} quando alguém precisar de ajuda.`,
    `Em momentos de pressão, deixe ${flaw} influenciar suas decisões.`,
    `Demonstre desconforto quando surgir algo relacionado a ${fear}.`,
    `Trate assuntos ligados a ${bond} como algo pessoal.`,
  ];

  return tips;
}

export default function SummaryStepScreen() {
  const database = useSQLiteContext();
  const { draft, resetDraft } = useCharacterDraft();

  const [saving, setSaving] = useState(false);

  const backstory = createBackstory(
    draft.name,
    draft.region,
    draft.origin,
    draft.virtue,
    draft.flaw,
    draft.goal,
    draft.fear,
    draft.bond,
    draft.adventureReason,
  );

  const tips = createTips(
    draft.virtue,
    draft.flaw,
    draft.fear,
    draft.bond,
  );

  async function saveCharacter() {
    if (saving) {
      return;
    }

    try {
      setSaving(true);

      await createCharacter(database, {
        name: draft.name,
        pronouns: draft.pronouns,
        appearance: draft.appearance,
        portraitUri: draft.portraitUri,
        region: draft.region,
        origin: draft.origin,
        virtue: draft.virtue,
        flaw: draft.flaw,
        goal: draft.goal,
        fear: draft.fear,
        bond: draft.bond,
        adventureReason: draft.adventureReason,
        backstory,
      });

      resetDraft();

      Alert.alert(
        'Personagem salvo',
        'O personagem foi salvo no celular.',
        [
          {
            text: 'Ver personagens',
            onPress: () =>
              router.replace('/personagens'),
          },
        ],
      );
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar o personagem.',
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <Screen>
      <Text style={styles.step}>ETAPA 5 DE 5</Text>

      <Text style={styles.title}>{draft.name}</Text>

      <Text style={styles.subtitle}>
        {draft.region} • {draft.origin}
      </Text>

      {draft.portraitUri ? (
        <Image
          source={{ uri: draft.portraitUri }}
          style={styles.portrait}
        />
      ) : (
        <View style={styles.noPortrait}>
          <Text style={styles.noPortraitText}>
            Sem retrato
          </Text>
        </View>
      )}

      <View style={styles.block}>
        <Text style={styles.blockTitle}>
          História do personagem
        </Text>

        <Text style={styles.text}>{backstory}</Text>
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>
          Como interpretar
        </Text>

        {tips.map((tip) => (
          <Text key={tip} style={styles.tip}>
            • {tip}
          </Text>
        ))}
      </View>

      <View style={styles.block}>
        <Text style={styles.blockTitle}>
          Resumo rápido
        </Text>

        <Text style={styles.line}>
          Virtude: {draft.virtue}
        </Text>

        <Text style={styles.line}>
          Falha: {draft.flaw}
        </Text>

        <Text style={styles.line}>
          Objetivo: {draft.goal}
        </Text>

        <Text style={styles.line}>
          Medo: {draft.fear}
        </Text>
      </View>

      <View style={styles.buttons}>
        <AppButton
          label="Voltar"
          onPress={() => router.back()}
          variant="secondary"
          style={styles.button}
        />

        <AppButton
          label={saving ? 'Salvando...' : 'Salvar'}
          onPress={saveCharacter}
          disabled={saving}
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
    fontSize: 28,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.xs,
    marginBottom: spacing.md,
  },
  portrait: {
    width: '100%',
    height: 250,
    marginBottom: spacing.md,
  },
  noPortrait: {
    height: 120,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  noPortraitText: {
    color: colors.textMuted,
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
  text: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
  },
  tip: {
    color: colors.text,
    fontSize: 15,
    lineHeight: 23,
    marginBottom: spacing.xs,
  },
  line: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  buttons: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  button: {
    flex: 1,
  },
});