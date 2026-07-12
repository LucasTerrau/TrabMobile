import { Stack } from 'expo-router';

import { colors } from '@/src/theme/theme';

export default function RegionLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.text,
        headerShadowVisible: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="[id]" options={{ title: 'Detalhes da região' }} />
    </Stack>
  );
}
