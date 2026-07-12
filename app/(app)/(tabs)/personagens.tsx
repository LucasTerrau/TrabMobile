import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { useSQLiteContext } from 'expo-sqlite';
import { useCallback, useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { CharacterCard } from '@/src/components/CharacterCard';
import { Screen } from '@/src/components/Screen';
import {
  Character,
  listCharacters,
  toggleCharacterFavorite,
} from '@/src/database/database';
import { colors, spacing } from '@/src/theme/theme';


export default function CharactersScreen() {
  const database = useSQLiteContext();

  const [characters, setCharacters] = useState<Character[]>([]);
  const [search, setSearch] = useState('');

 

 useFocusEffect(
  useCallback(() => {
    async function load() {
      try {
        const result = await listCharacters(
          database,
          search,
        );

        setCharacters(result);
      } catch (error) {
        console.error(error);

        Alert.alert(
          'Erro',
          'Não foi possível carregar os personagens.',
        );
      }
    }

    load();
  }, [database, search]),
);

  function searchCharacters(text: string) {
    setSearch(text);
  }

  function openCharacter(character: Character) {
    router.push({
      pathname: '/personagem/[id]',
      params: {
        id: String(character.id),
      },
    });
  }

async function favoriteCharacter(character: Character) {
  try {
    await toggleCharacterFavorite(
      database,
      character.id,
    );

    const result = await listCharacters(
      database,
      search,
    );

    setCharacters(result);
  } catch (error) {
    console.error(error);

    Alert.alert(
      'Erro',
      'Não foi possível alterar o favorito.',
    );
  }
}
  return (
    <Screen
      title="Meus personagens"
      subtitle="Pesquise ou abra um personagem salvo."
    >
      <View style={styles.search}>
        <Ionicons
          name="search-outline"
          size={20}
          color={colors.textMuted}
        />

        <TextInput
          value={search}
          onChangeText={searchCharacters}
          placeholder="Pesquisar personagem"
          placeholderTextColor={colors.textMuted}
          style={styles.input}
        />
      </View>

      <AppButton
        label="Criar personagem"
        onPress={() => router.push('/criar/basico')}
        style={styles.createButton}
      />

      {characters.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyTitle}>
            Nenhum personagem encontrado
          </Text>

          <Text style={styles.emptyText}>
            Crie um personagem ou tente outra pesquisa.
          </Text>
        </View>
      ) : (
        characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onPress={() => openCharacter(character)}
            onDoubleTap={() =>
              favoriteCharacter(character)
            }
          />
        ))
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    minHeight: 48,
    color: colors.text,
    fontSize: 15,
    marginLeft: spacing.sm,
  },
  createButton: {
    marginBottom: spacing.lg,
  },
  empty: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.lg,
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '700',
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});