import { router } from 'expo-router';
import { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { PortraitPicker } from '@/src/components/PortraitPicker';
import { Screen } from '@/src/components/Screen';
import { useCharacterDraft } from '@/src/contexts/CharacterDraftContext';
import { randomNames } from '@/src/data/appData';
import { colors, spacing } from '@/src/theme/theme';

export default function BasicStepScreen() {
  const { draft, updateDraft } =
    useCharacterDraft();

  const [lastNameIndex, setLastNameIndex] =
    useState(-1);

  function randomizeName() {
    let newIndex = Math.floor(
      Math.random() * randomNames.length,
    );

    if (newIndex === lastNameIndex) {
      newIndex =
        (newIndex + 1) % randomNames.length;
    }

    setLastNameIndex(newIndex);

    updateDraft({
      name: randomNames[newIndex],
    });
  }

  function continueCreation() {
    if (!draft.name.trim()) {
      Alert.alert(
        'Informe um nome',
        'Digite ou sorteie o nome do personagem.',
      );

      return;
    }

    router.push('/criar/origem');
  }

  return (
    <Screen>
      <Text style={styles.step}>
        ETAPA 1 DE 5
      </Text>

      <Text style={styles.title}>
        Quem é o personagem?
      </Text>

      <Text style={styles.description}>
        Comece escolhendo apenas um nome e, se quiser,
        uma imagem.
      </Text>

      <Text style={styles.label}>
        Nome
      </Text>

      <TextInput
        value={draft.name}
        onChangeText={(name) =>
          updateDraft({ name })
        }
        placeholder="Nome do personagem"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <AppButton
        label="Sortear um nome"
        onPress={randomizeName}
        variant="secondary"
        style={styles.randomButton}
      />

      <PortraitPicker
        value={draft.portraitUri}
        onChange={(portraitUri) =>
          updateDraft({ portraitUri })
        }
      />

      <View style={styles.bottom}>
        <AppButton
          label="Continuar"
          onPress={continueCreation}
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
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  input: {
    minHeight: 50,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
    fontSize: 16,
    paddingHorizontal: spacing.md,
  },
  randomButton: {
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
  },
  bottom: {
    marginTop: spacing.md,
  },
});