import {
  createContext,
  PropsWithChildren,
  useContext,
  useState,
} from 'react';

export type CharacterDraft = {
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
};

export const initialCharacterDraft: CharacterDraft = {
  name: '',
  pronouns: '',
  appearance: '',
  portraitUri: '',
  region: '',
  origin: '',
  virtue: '',
  flaw: '',
  goal: '',
  fear: '',
  bond: '',
  adventureReason: '',
};

type CharacterDraftContextType = {
  draft: CharacterDraft;
  updateDraft: (
    changes: Partial<CharacterDraft>,
  ) => void;
  resetDraft: () => void;
  loadDraft: (character: CharacterDraft) => void;
};

const CharacterDraftContext =
  createContext<CharacterDraftContextType | undefined>(
    undefined,
  );

export function CharacterDraftProvider({
  children,
}: PropsWithChildren) {
  const [draft, setDraft] = useState(
    initialCharacterDraft,
  );

  function updateDraft(
    changes: Partial<CharacterDraft>,
  ) {
    setDraft((current) => ({
      ...current,
      ...changes,
    }));
  }

  function resetDraft() {
    setDraft(initialCharacterDraft);
  }

  function loadDraft(character: CharacterDraft) {
    setDraft(character);
  }

  return (
    <CharacterDraftContext.Provider
      value={{
        draft,
        updateDraft,
        resetDraft,
        loadDraft,
      }}
    >
      {children}
    </CharacterDraftContext.Provider>
  );
}

export function useCharacterDraft() {
  const context = useContext(CharacterDraftContext);

  if (!context) {
    throw new Error(
      'CharacterDraftProvider não encontrado.',
    );
  }

  return context;
}