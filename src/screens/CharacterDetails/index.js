import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { observer } from 'mobx-react-lite';

import { MainView } from '@components/MainView';

import { colors } from '@extra/colors';
import { images } from '@assets/images';
import { useStore } from '@stores/index';

export const CharacterDetails = observer(({ navigation, route }) => {
  const { character } = route.params;

  const {
    globalStore: { _favorites, handleAddToFavorite },
  } = useStore();

  const isInFav = !!_favorites.find(i => i.name === character.name);

  const details = [
    { id: 1, title: 'Name', value: character.name },
    { id: 2, title: 'Birth year', value: character.birth_year },
    { id: 3, title: 'Gender', value: character.gender },
    { id: 4, title: 'Hair color', value: character.hair_color },
    { id: 5, title: 'Mass', value: character.mass },
  ];

  return (
    <MainView headerText="Character details" withGoBack navigation={navigation}>
      <View style={styles.boxForBtn}>
        <TouchableOpacity
          onPress={() => handleAddToFavorite(character, isInFav)}
        >
          <Image
            source={isInFav ? images.activeHeart : images.inactiveHeart}
            style={styles.heart}
          />
        </TouchableOpacity>
      </View>

      {details.map(i => (
        <View style={styles.itemBox} key={i.id}>
          <Text style={styles.title}>{i.title}</Text>

          <Text style={styles.value}>{i.value}</Text>
        </View>
      ))}
    </MainView>
  );
});

const styles = StyleSheet.create({
  itemBox: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    marginTop: 16,
  },
  title: {
    flex: 1,
    fontSize: 14,
    color: colors.SECOND,
    fontWeight: 'bold',
  },
  boxForBtn: {
    width: '100%',
    alignItems: 'center',
    marginTop: 16,
  },
  value: {
    flex: 1,
    fontSize: 14,
    color: colors.SECOND,
  },
  heart: {
    height: 24,
    width: 24,
  },
});
