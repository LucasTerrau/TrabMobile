import Ionicons from '@expo/vector-icons/Ionicons';
import { Redirect } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native';

import { useAuth } from '@/src/contexts/AuthContext';
import { colors } from '@/src/theme/theme';

export default function AppLayout() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator
          size="large"
          color={colors.primary}
        />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/" />;
  }

  return (
    <Drawer
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        drawerStyle: {
          backgroundColor: colors.surface,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.textMuted,
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          title: 'Aplicativo',
          headerShown: false,
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="home-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="enciclopedia"
        options={{
          title: 'Enciclopédia',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="book-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="sobre"
        options={{
          title: 'Sobre',
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name="information-circle-outline"
              color={color}
              size={size}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="criar"
        options={{
          drawerItemStyle: {
            display: 'none',
          },
          headerShown: false,
        }}
      />
    </Drawer>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
});