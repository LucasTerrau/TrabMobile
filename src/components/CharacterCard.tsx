import Ionicons from '@expo/vector-icons/Ionicons';
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  Gesture,
  GestureDetector,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { Character } from '@/src/database/database';
import { defaultCharacterImage } from '@/src/data/images';
import { colors, spacing } from '@/src/theme/theme';

type CharacterCardProps = {
  character: Character;
  onPress: () => void;
  onDoubleTap: () => void;
};

export function CharacterCard({
  character,
  onPress,
  onDoubleTap,
}: CharacterCardProps) {
  const size = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: size.value,
        },
      ],
    };
  });

  function animate() {
    size.value = withTiming(1.04, {
      duration: 120,
    });

    setTimeout(() => {
      size.value = withTiming(1, {
        duration: 120,
      });
    }, 130);

    onDoubleTap();
  }

  const oneTap = Gesture.Tap().onEnd(
    (_event, success) => {
      if (success) {
        runOnJS(onPress)();
      }
    },
  );

  const twoTaps = Gesture.Tap()
    .numberOfTaps(2)
    .onEnd((_event, success) => {
      if (success) {
        runOnJS(animate)();
      }
    });

  const gesture = Gesture.Exclusive(
    twoTaps,
    oneTap,
  );

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          styles.card,
          character.isFavorite &&
            styles.favoriteCard,
          animatedStyle,
        ]}
      >
        <Image
          source={
            character.portraitUri
              ? {
                  uri: character.portraitUri,
                }
              : defaultCharacterImage
          }
          style={styles.image}
        />

        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.name}>
              {character.name}
            </Text>

            <Ionicons
              name={
                character.isFavorite
                  ? 'star'
                  : 'star-outline'
              }
              size={24}
              color={
                character.isFavorite
                  ? colors.primary
                  : colors.textMuted
              }
            />
          </View>

          <Text style={styles.origin}>
            {character.region} • {character.origin}
          </Text>

          <Text
            style={styles.backstory}
            numberOfLines={3}
          >
            {character.backstory}
          </Text>

          <Text style={styles.help}>
            Toque para abrir. Toque duas vezes para favoritar.
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    marginBottom: spacing.md,
  },
  favoriteCard: {
    borderColor: colors.primary,
    borderWidth: 2,
  },
  image: {
    width: '100%',
    height: 165,
    resizeMode: 'cover',
  },
  content: {
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    color: colors.text,
    fontSize: 20,
    fontWeight: '700',
  },
  origin: {
    color: colors.textMuted,
    fontSize: 13,
    marginTop: spacing.xs,
  },
  backstory: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 20,
    marginTop: spacing.md,
  },
  help: {
    color: colors.textMuted,
    fontSize: 11,
    marginTop: spacing.md,
  },
});