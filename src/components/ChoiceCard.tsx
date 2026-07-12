import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, spacing } from '@/src/theme/theme';

type ChoiceCardProps = {
  title: string;
  description: string;
  selected: boolean;
  onPress: () => void;
  imageSource?: ImageSourcePropType;
};

export function ChoiceCard({
  title,
  description,
  selected,
  onPress,
  imageSource,
}: ChoiceCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.selectedCard,
      ]}
    >
      {imageSource ? (
        <Image
          source={imageSource}
          style={styles.image}
        />
      ) : null}

      <View style={styles.textArea}>
        <Text style={styles.title}>{title}</Text>

        <Text style={styles.description}>
          {description}
        </Text>
      </View>

      <Ionicons
        name={
          selected
            ? 'checkmark-circle'
            : 'ellipse-outline'
        }
        size={25}
        color={
          selected
            ? colors.primary
            : colors.textMuted
        }
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  selectedCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  image: {
    width: 78,
    height: 68,
    marginRight: spacing.md,
  },
  textArea: {
    flex: 1,
    marginRight: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '700',
  },
  description: {
    color: colors.textMuted,
    fontSize: 13,
    lineHeight: 18,
    marginTop: spacing.xs,
  },
});