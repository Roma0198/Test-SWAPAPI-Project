import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { MainView } from '@components/MainView';

import { api } from '@api/index';
import { endpoints } from '@api/endpoints';
import { colors } from '@extra/colors';
import { images } from '@assets/images';
import { screens } from '@router/screens';
import { useStore } from '@stores/index';

const genderTypes = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'n/a',
};

export const Home = observer(({ navigation }) => {
  const {
    globalStore: { _favorites, handleAddToFavorite, setData },
  } = useStore();

  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [isPagesEnded, setIsPagesEnded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    if (isLoading) {
      return;
    }

    try {
      setIsLoading(true);
      const res = (await api.get(endpoints.people(page))).data;
      setCharacters(prevData => [...prevData, ...res.results]);
      if (res.next) {
        setPage(prevPage => prevPage + 1);
      } else {
        setIsPagesEnded(true);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  const getCount = genType =>
    _favorites.filter(i => i.gender === genType).length;

  const genders = [
    {
      id: 1,
      name: 'Male',
      color: colors.MALE,
      count: getCount(genderTypes.MALE),
    },
    {
      id: 2,
      name: 'Female',
      color: colors.FEMALE,
      count: getCount(genderTypes.FEMALE),
    },
    {
      id: 3,
      name: 'Other',
      color: colors.OTHER,
      count: getCount(genderTypes.OTHER),
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.favoritesText}>Favorites:</Text>

      <View style={styles.genderBox}>
        {genders.map(item => (
          <Text
            key={item.id}
            style={[styles.genderText, { color: item.color }]}
          >
            {item.name}: {item.count}
          </Text>
        ))}
      </View>

      <TouchableOpacity
        style={styles.clearBtn}
        onPress={() => setData('_favorites', [])}
      >
        <Text style={styles.clearBtnText}>Clear favorites</Text>
      </TouchableOpacity>
    </View>
  );

  const renderItem = ({ item }) => {
    const isInFav = !!_favorites.find(i => i.name === item.name);

    return (
      <Pressable
        onPress={() =>
          navigation.navigate(screens.HomeStack.CharacterDetails.name, {
            character: item,
          })
        }
        style={styles.itemBox}
      >
        <Text style={styles.itemText}>{item.name}</Text>

        <TouchableOpacity onPress={() => handleAddToFavorite(item, isInFav)}>
          <Image
            source={
              _favorites.find(i => i.name === item.name)
                ? images.activeHeart
                : images.inactiveHeart
            }
            style={styles.heart}
          />
        </TouchableOpacity>
      </Pressable>
    );
  };

  const renderFooter = () =>
    !!isLoading && (
      <ActivityIndicator
        size="large"
        color={colors.SECOND}
        style={styles.footer}
      />
    );

  return (
    <MainView headerText="Star Wars characters">
      {renderHeader()}

      <FlatList
        data={characters}
        keyExtractor={item => item.name}
        renderItem={renderItem}
        onEndReached={async () => {
          if (!isPagesEnded) {
            await fetchData();
          }
        }}
        onEndReachedThreshold={0.2}
        ListFooterComponent={renderFooter}
        style={styles.flatList}
        contentContainerStyle={styles.contentContainerStyle}
      />
    </MainView>
  );
});

export const styles = StyleSheet.create({
  flatList: {
    flex: 1,
  },
  itemBox: {
    padding: 16,
    width: '100%',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.SECOND,
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heart: {
    height: 20,
    width: 20,
  },
  itemText: {
    fontSize: 16,
    color: colors.SECOND,
  },
  contentContainerStyle: {
    paddingHorizontal: 16,
  },
  footer: {
    marginTop: 16,
  },
  favoritesText: {
    fontSize: 18,
    color: colors.SECOND,
    marginTop: 8,
  },
  header: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  genderBox: {
    width: '100%',
    paddingLeft: 16,
  },
  genderText: {
    fontSize: 16,
    marginTop: 8,
  },
  clearBtn: {
    width: '100%',
    padding: 12,
    borderWidth: 1,
    borderColor: colors.SECOND,
    borderRadius: 10,
    marginVertical: 16,
    alignItems: 'center',
  },
  clearBtnText: {
    fontSize: 16,
    color: colors.SECOND,
    fontWeight: 'bold',
  },
});
