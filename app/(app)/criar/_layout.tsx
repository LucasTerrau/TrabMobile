import { Stack } from 'expo-router';

import { colors } from '@/src/theme/theme';

export default function CreateCharacterLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="basico" options={{ title: 'Criar personagem' }} />
      <Stack.Screen name="origem" options={{ title: 'Origem' }} />
      <Stack.Screen name="personalidade" options={{ title: 'Personalidade' }} />
      <Stack.Screen name="historia" options={{ title: 'Motivações' }} />
      <Stack.Screen name="resumo" options={{ title: 'Resumo' }} />
    </Stack>
  );
}
