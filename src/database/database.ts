import { type SQLiteDatabase } from 'expo-sqlite';

export const DATABASE_NAME = 'pathfinder_backstory.db';

export type Character = {
  id: number;
  name: string;
  pronouns: string;
  appearance: string;
  portraitUri: string;
  region: string;
  origin: string;
  virtue: string;
  flaw: string;
  goal: string;
  fear: string;
  bond: string;
  adventureReason: string;
  backstory: string;
  isFavorite: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CreateCharacterInput = {
  name: string;
  pronouns: string;
  appearance: string;
  portraitUri: string;
  region: string;
  origin: string;
  virtue: string;
  flaw: string;
  goal: string;
  fear: string;
  bond: string;
  adventureReason: string;
  backstory: string;
  isFavorite?: boolean;
};

export type UpdateCharacterInput =
  Partial<CreateCharacterInput>;

type CharacterRow = {
  id: number;
  name: string;
  pronouns: string;
  appearance: string;
  portrait_uri: string;
  region: string;
  origin: string;
  virtue: string;
  flaw: string;
  goal: string;
  fear: string;
  bond: string;
  adventure_reason: string;
  backstory: string;
  is_favorite: number;
  created_at: string;
  updated_at: string;
};

function convertRow(row: CharacterRow): Character {
  return {
    id: row.id,
    name: row.name,
    pronouns: row.pronouns,
    appearance: row.appearance,
    portraitUri: row.portrait_uri || '',
    region: row.region,
    origin: row.origin,
    virtue: row.virtue,
    flaw: row.flaw,
    goal: row.goal,
    fear: row.fear,
    bond: row.bond,
    adventureReason: row.adventure_reason,
    backstory: row.backstory,
    isFavorite: row.is_favorite === 1,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function initializeDatabase(
  database: SQLiteDatabase,
) {
  await database.execAsync(`
    PRAGMA journal_mode = WAL;

    CREATE TABLE IF NOT EXISTS characters (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      pronouns TEXT NOT NULL DEFAULT '',
      appearance TEXT NOT NULL DEFAULT '',
      portrait_uri TEXT NOT NULL DEFAULT '',
      region TEXT NOT NULL DEFAULT '',
      origin TEXT NOT NULL DEFAULT '',
      virtue TEXT NOT NULL DEFAULT '',
      flaw TEXT NOT NULL DEFAULT '',
      goal TEXT NOT NULL DEFAULT '',
      fear TEXT NOT NULL DEFAULT '',
      bond TEXT NOT NULL DEFAULT '',
      adventure_reason TEXT NOT NULL DEFAULT '',
      backstory TEXT NOT NULL DEFAULT '',
      is_favorite INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
  `);

  const columns = await database.getAllAsync<{
    name: string;
  }>('PRAGMA table_info(characters)');

  const hasPortrait = columns.some(
    (column) => column.name === 'portrait_uri',
  );

  if (!hasPortrait) {
    await database.execAsync(`
      ALTER TABLE characters
      ADD COLUMN portrait_uri TEXT NOT NULL DEFAULT '';
    `);
  }
}

export async function createCharacter(
  database: SQLiteDatabase,
  character: CreateCharacterInput,
) {
  const date = new Date().toISOString();

  const result = await database.runAsync(
    `
      INSERT INTO characters (
        name,
        pronouns,
        appearance,
        portrait_uri,
        region,
        origin,
        virtue,
        flaw,
        goal,
        fear,
        bond,
        adventure_reason,
        backstory,
        is_favorite,
        created_at,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
    character.name.trim(),
    character.pronouns.trim(),
    character.appearance.trim(),
    character.portraitUri.trim(),
    character.region.trim(),
    character.origin.trim(),
    character.virtue.trim(),
    character.flaw.trim(),
    character.goal.trim(),
    character.fear.trim(),
    character.bond.trim(),
    character.adventureReason.trim(),
    character.backstory.trim(),
    character.isFavorite ? 1 : 0,
    date,
    date,
  );

  return result.lastInsertRowId;
}

export async function listCharacters(
  database: SQLiteDatabase,
  search = '',
) {
  const text = `%${search.trim()}%`;

  const rows = await database.getAllAsync<CharacterRow>(
    `
      SELECT *
      FROM characters
      WHERE name LIKE ? COLLATE NOCASE
         OR region LIKE ? COLLATE NOCASE
         OR origin LIKE ? COLLATE NOCASE
      ORDER BY is_favorite DESC, updated_at DESC
    `,
    text,
    text,
    text,
  );

  return rows.map(convertRow);
}

export async function findCharacterById(
  database: SQLiteDatabase,
  id: number,
) {
  const row = await database.getFirstAsync<CharacterRow>(
    `
      SELECT *
      FROM characters
      WHERE id = ?
    `,
    id,
  );

  if (!row) {
    return null;
  }

  return convertRow(row);
}

export async function updateCharacter(
  database: SQLiteDatabase,
  id: number,
  changes: UpdateCharacterInput,
) {
  const current = await findCharacterById(database, id);

  if (!current) {
    return false;
  }

  const updated = {
    ...current,
    ...changes,
  };

  const date = new Date().toISOString();

  const result = await database.runAsync(
    `
      UPDATE characters
      SET
        name = ?,
        pronouns = ?,
        appearance = ?,
        portrait_uri = ?,
        region = ?,
        origin = ?,
        virtue = ?,
        flaw = ?,
        goal = ?,
        fear = ?,
        bond = ?,
        adventure_reason = ?,
        backstory = ?,
        is_favorite = ?,
        updated_at = ?
      WHERE id = ?
    `,
    updated.name.trim(),
    updated.pronouns.trim(),
    updated.appearance.trim(),
    updated.portraitUri.trim(),
    updated.region.trim(),
    updated.origin.trim(),
    updated.virtue.trim(),
    updated.flaw.trim(),
    updated.goal.trim(),
    updated.fear.trim(),
    updated.bond.trim(),
    updated.adventureReason.trim(),
    updated.backstory.trim(),
    updated.isFavorite ? 1 : 0,
    date,
    id,
  );

  return result.changes > 0;
}

export async function deleteCharacter(
  database: SQLiteDatabase,
  id: number,
) {
  const result = await database.runAsync(
    'DELETE FROM characters WHERE id = ?',
    id,
  );

  return result.changes > 0;
}

export async function toggleCharacterFavorite(
  database: SQLiteDatabase,
  id: number,
) {
  const character = await findCharacterById(
    database,
    id,
  );

  if (!character) {
    return false;
  }

  return updateCharacter(database, id, {
    isFavorite: !character.isFavorite,
  });
}
export async function findMostRecentCharacter(
  database: SQLiteDatabase,
) {
  const row = await database.getFirstAsync<CharacterRow>(
    `
      SELECT *
      FROM characters
      ORDER BY created_at DESC
      LIMIT 1
    `,
  );

  if (!row) {
    return null;
  }

  return convertRow(row);
}