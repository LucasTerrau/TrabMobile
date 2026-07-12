import Ionicons from '@expo/vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import { Alert, Image, StyleSheet, Text, View } from 'react-native';

import { AppButton } from '@/src/components/AppButton';
import { colors, radius, spacing } from '@/src/theme/theme';

type PortraitPickerProps = {
  value: string;
  onChange: (uri: string) => void;
};

export function PortraitPicker({
  value,
  onChange,
}: PortraitPickerProps) {
  async function takePhoto() {
    const permission =
      await ImagePicker.requestCameraPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Autorize o acesso à câmera para tirar uma foto.',
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      onChange(result.assets[0].uri);
    }
  }

  async function chooseFromGallery() {
    const permission =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      Alert.alert(
        'Permissão necessária',
        'Autorize o acesso às imagens do celular.',
      );
      return;
    }

    const result =
      await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

    if (!result.canceled && result.assets.length > 0) {
      onChange(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Retrato do personagem
      </Text>

      <View style={styles.preview}>
        {value ? (
          <Image
            source={{ uri: value }}
            style={styles.image}
          />
        ) : (
          <View style={styles.placeholder}>
            <Ionicons
              name="person-outline"
              size={64}
              color={colors.textMuted}
            />

            <Text style={styles.placeholderText}>
              Nenhuma imagem selecionada
            </Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <AppButton
          label="Tirar foto"
          onPress={takePhoto}
          variant="secondary"
          style={styles.button}
        />

        <AppButton
          label="Abrir galeria"
          onPress={chooseFromGallery}
          variant="secondary"
          style={styles.button}
        />
      </View>

      {value ? (
        <AppButton
          label="Remover foto"
          onPress={() => onChange('')}
          variant="danger"
          style={styles.removeButton}
        />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
    marginBottom: spacing.sm,
  },
  preview: {
    width: '100%',
    height: 220,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  placeholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderText: {
    color: colors.textMuted,
    fontSize: 14,
    marginTop: spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  button: {
    flex: 1,
  },
  removeButton: {
    marginTop: spacing.sm,
  },
});