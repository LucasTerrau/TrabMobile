import { Stack } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

import { AuthProvider } from '@/src/contexts/AuthContext';
import { CharacterDraftProvider } from '@/src/contexts/CharacterDraftContext';
import {
  DATABASE_NAME,
  initializeDatabase,
} from '@/src/database/database';
import { colors } from '@/src/theme/theme';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SQLiteProvider
        databaseName={DATABASE_NAME}
        onInit={initializeDatabase}
      >
        <AuthProvider>
          <CharacterDraftProvider>
            <StatusBar style="light" />

            <Stack
              screenOptions={{
                headerStyle: {
                  backgroundColor: colors.background,
                },
                headerTintColor: colors.text,
                contentStyle: {
                  backgroundColor: colors.background,
                },
              }}
            >
              <Stack.Screen
                name="index"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="cadastro"
                options={{
                  title: 'Criar conta',
                }}
              />

              <Stack.Screen
                name="verificar-email"
                options={{
                  title: 'Verificar e-mail',
                }}
              />

              <Stack.Screen
                name="(app)"
                options={{
                  headerShown: false,
                }}
              />

              <Stack.Screen
                name="personagem/[id]"
                options={{
                  title: 'Personagem',
                }}
              />

              <Stack.Screen
                name="personagem/editar/[id]"
                options={{
                  title: 'Editar personagem',
                }}
              />

              <Stack.Screen
                name="regiao/[id]"
                options={{
                  title: 'Região',
                }}
              />

              <Stack.Screen
                name="enciclopedia/[id]"
                options={{
                  title: 'Enciclopédia',
                }}
              />

              <Stack.Screen
                name="+not-found"
                options={{
                  title: 'Página não encontrada',
                }}
              />
            </Stack>
          </CharacterDraftProvider>
        </AuthProvider>
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}