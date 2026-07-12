import Ionicons from '@expo/vector-icons/Ionicons';
import {
  router,
  useLocalSearchParams,
} from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { AppModal } from '@/src/components/AppModal';
import { Screen } from '@/src/components/Screen';
import { defaultCharacterImage } from '@/src/data/images';
import {
  Character,
  deleteCharacter,
  findCharacterById,
  toggleCharacterFavorite,
} from '@/src/database/database';
import { colors, spacing } from '@/src/theme/theme';


export default function CharacterDetailsScreen() {
  const database = useSQLiteContext();

  const params = useLocalSearchParams<{
    id?: string | string[];
  }>();

  const idText = Array.isArray(params.id)
    ? params.id[0]
    : params.id;

  const characterId = Number(idText);

  const [character, setCharacter] =
    useState<Character | null>(null);

  const [loading, setLoading] = useState(true);
  const [showDelete, setShowDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
  async function load() {
    try {
      setLoading(true);

      const result = await findCharacterById(
        database,
        characterId,
      );

      setCharacter(result);
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível carregar o personagem.',
      );
    } finally {
      setLoading(false);
    }
  }

  if (Number.isInteger(characterId)) {
    load();
  } else {
    setLoading(false);
    setCharacter(null);
  }
}, [database, characterId]);

  async function favorite() {
    if (!character) {
      return;
    }

    await toggleCharacterFavorite(
      database,
      character.id,
    );

    setCharacter({
      ...character,
      isFavorite: !character.isFavorite,
    });
  }

  async function remove() {
    if (!character) {
      return;
    }

    try {
      setDeleting(true);

      await deleteCharacter(
        database,
        character.id,
      );

      setShowDelete(false);
      router.replace('/personagens');
    } catch (error) {
      console.error(error);

      Alert.alert(
        'Erro',
        'Não foi possível excluir o personagem.',
      );
    } finally {
      setDeleting(false);
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

  if (!character) {
    return (
      <Screen>
        <Text style={styles.name}>
          Personagem não encontrado
        </Text>

        <AppButton
          label="Voltar"
          onPress={() =>
            router.replace('/personagens')
          }
          style={styles.button}
        />
      </Screen>
    );
  }

  return (
    <>
      <Screen>
        <Image
          source={
            character.portraitUri
              ? { uri: character.portraitUri }
              : defaultCharacterImage
          }
          style={styles.image}
        />

        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.name}>
              {character.name}
            </Text>

            <Text style={styles.subtitle}>
              {character.region} • {character.origin}
            </Text>
          </View>

          <Ionicons
            name={
              character.isFavorite
                ? 'star'
                : 'star-outline'
            }
            size={32}
            color={
              character.isFavorite
                ? colors.primary
                : colors.textMuted
            }
            onPress={favorite}
          />
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>
            História
          </Text>

          <Text style={styles.text}>
            {character.backstory}
          </Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>
            Como interpretar
          </Text>

          <Text style={styles.item}>
            • Mostre {character.virtue} quando alguém precisar de
            ajuda.
          </Text>

          <Text style={styles.item}>
            • Sob pressão, deixe {character.flaw} afetar suas
            decisões.
          </Text>

          <Text style={styles.item}>
            • Reaja a situações relacionadas a {character.fear}.
          </Text>

          <Text style={styles.item}>
            • Trate {character.bond} como algo importante.
          </Text>
        </View>

        <View style={styles.block}>
          <Text style={styles.blockTitle}>
            Resumo
          </Text>

          <Text style={styles.line}>
            Objetivo: {character.goal}
          </Text>

          <Text style={styles.line}>
            Medo: {character.fear}
          </Text>

          <Text style={styles.line}>
            Vínculo: {character.bond}
          </Text>
        </View>

        <AppButton
          label={
            character.isFavorite
              ? 'Remover favorito'
              : 'Adicionar favorito'
          }
          onPress={favorite}
          variant="secondary"
          style={styles.button}
        />

        <AppButton
          label="Editar"
          onPress={() =>
            router.push({
              pathname: '/personagem/editar/[id]',
              params: {
                id: String(character.id),
              },
            })
          }
          style={styles.button}
        />

        <AppButton
          label="Excluir"
          onPress={() => setShowDelete(true)}
          variant="danger"
        />
      </Screen>

      <AppModal
        visible={showDelete}
        title="Excluir personagem"
        message={`Deseja excluir ${character.name}?`}
        confirmLabel="Excluir"
        destructive
        loading={deleting}
        onConfirm={remove}
        onClose={() => setShowDelete(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  image: {
    width: '100%',
    height: 260,
    resizeMode: 'cover',
    borderColor: colors.border,
    borderWidth: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  name: {
    color: colors.text,
    fontSize: 27,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs,
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
  item: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: spacing.xs,
  },
  line: {
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 22,
  },
  button: {
    marginBottom: spacing.sm,
  },
});