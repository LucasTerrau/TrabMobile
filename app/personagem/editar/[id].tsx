import { router, useLocalSearchParams } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppDropdown } from '@/src/components/AppDropdown';
import { ChoiceCard } from '@/src/components/ChoiceCard';
import { PortraitPicker } from '@/src/components/PortraitPicker';
import { RadioCardGroup } from '@/src/components/RadioCardGroup';
import { Screen } from '@/src/components/Screen';
import {
  CharacterDraft,
  initialCharacterDraft,
} from '@/src/contexts/CharacterDraftContext';
import {
  adventureReasons,
  bonds,
  fears,
  flaws,
  goals,
  origins,
  regions,
  virtues,
} from '@/src/data/appData';
import {
  findCharacterById,
  updateCharacter,
} from '@/src/database/database';
import { colors, spacing } from '@/src/theme/theme';

function makeBackstory(character: CharacterDraft) {
  return `${character.name} veio de ${character.region} e cresceu em ${character.origin}. Sua principal qualidade é ${character.virtue}, embora ${character.flaw} frequentemente complique suas decisões. Seu maior objetivo é ${character.goal}, mas teme ${character.fear}. Seu vínculo mais importante é ${character.bond}. Começou sua vida de aventuras porque ${character.adventureReason}.`;
}

export default function EditCharacterScreen() {
  const database = useSQLiteContext();

  const params = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const idText = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const characterId = Number(idText);

  const [form, setForm] = useState<CharacterDraft>(
    initialCharacterDraft,
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [found, setFound] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const character = await findCharacterById(
          database,
          characterId,
        );

        if (!character) {
          setFound(false);
          return;
        }

        setForm({
          name: character.name,
          pronouns: character.pronouns,
          appearance: character.appearance,
          portraitUri: character.portraitUri,
          region: character.region,
          origin: character.origin,
          virtue: character.virtue,
          flaw: character.flaw,
          goal: character.goal,
          fear: character.fear,
          bond: character.bond,
          adventureReason: character.adventureReason,
        });
      } catch (error) {
        console.error(error);
        setFound(false);
      } finally {
        setLoading(false);
      }
    }

    if (Number.isInteger(characterId)) {
      load();
    } else {
      setFound(false);
      setLoading(false);
    }
  }, [characterId, database]);

  function change(changes: Partial<CharacterDraft>) {
    setForm({
      ...form,
      ...changes,
    });
  }

  async function save() {
    if (!form.name.trim()) {
      Alert.alert('Informe o nome do personagem.');
      return;
    }

    try {
      setSaving(true);

      await updateCharacter(
        database,
        characterId,
        {
          ...form,
          backstory: makeBackstory(form),
        },
      );

      router.replace({
        pathname: '/personagem/[id]',
        params: {
          id: String(characterId),
        },
      });
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível salvar as alterações.',
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  if (!found) {
    return (
      <Screen>
        <Text style={styles.title}>
          Personagem não encontrado
        </Text>
      </Screen>
    );
  }

  return (
    <Screen
      title="Editar personagem"
      subtitle="Troque as escolhas e salve novamente."
    >
      <Text style={styles.label}>Nome</Text>

      <TextInput
        value={form.name}
        onChangeText={(name) => change({ name })}
        placeholder="Nome do personagem"
        placeholderTextColor={colors.textMuted}
        style={styles.input}
      />

      <PortraitPicker
        value={form.portraitUri}
        onChange={(portraitUri) =>
          change({ portraitUri })
        }
      />

      <AppDropdown
        label="Região"
        placeholder="Escolha uma região"
        value={form.region}
        options={regions}
        onChange={(region) => change({ region })}
      />

      <AppDropdown
        label="Origem"
        placeholder="Escolha uma origem"
        value={form.origin}
        options={origins}
        onChange={(origin) => change({ origin })}
      />

      <RadioCardGroup
        label="Virtude"
        value={form.virtue}
        options={virtues}
        onChange={(virtue) => change({ virtue })}
      />

      <RadioCardGroup
        label="Falha"
        value={form.flaw}
        options={flaws}
        onChange={(flaw) => change({ flaw })}
      />

      <Text style={styles.section}>Objetivo</Text>

      {goals.map((option) => (
        <ChoiceCard
          key={option.value}
          title={option.label}
          description={option.description}
          selected={form.goal === option.value}
          onPress={() =>
            change({
              goal: option.value,
            })
          }
        />
      ))}

      <Text style={styles.section}>Medo</Text>

      {fears.map((option) => (
        <ChoiceCard
          key={option.value}
          title={option.label}
          description={option.description}
          selected={form.fear === option.value}
          onPress={() =>
            change({
              fear: option.value,
            })
          }
        />
      ))}

      <Text style={styles.section}>Vínculo</Text>

      {bonds.map((option) => (
        <ChoiceCard
          key={option.value}
          title={option.label}
          description={option.description}
          selected={form.bond === option.value}
          onPress={() =>
            change({
              bond: option.value,
            })
          }
        />
      ))}

      <Text style={styles.section}>
        Motivo da aventura
      </Text>

      {adventureReasons.map((option) => (
        <ChoiceCard
          key={option.value}
          title={option.label}
          description={option.description}
          selected={
            form.adventureReason === option.value
          }
          onPress={() =>
            change({
              adventureReason: option.value,
            })
          }
        />
      ))}

      <AppButton
        label={
          saving
            ? 'Salvando...'
            : 'Salvar alterações'
        }
        onPress={save}
        disabled={saving}
        style={styles.saveButton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  title: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '800',
  },
  label: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  input: {
    minHeight: 49,
    color: colors.text,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    fontSize: 15,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  section: {
    color: colors.text,
    fontSize: 19,
    fontWeight: '700',
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
  },
  saveButton: {
    marginTop: spacing.lg,
    marginBottom: spacing.xl,
  },
});