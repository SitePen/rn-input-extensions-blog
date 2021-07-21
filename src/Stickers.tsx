import React, {FunctionComponent, useCallback} from 'react';
import {
  FlatList,
  Image,
  ListRenderItemInfo,
  NativeModules,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {MessagesModule} = NativeModules;

type Sticker = {name: string; source: number};

const stickers: Sticker[] = [
  {name: 'apple', source: require('./stickers/apple.png')},
  {name: 'avocado', source: require('./stickers/avocado.png')},
  {name: 'banana', source: require('./stickers/banana.png')},
  {name: 'blueberries', source: require('./stickers/blueberries.png')},
  {name: 'cherries', source: require('./stickers/cherries.png')},
  {name: 'coconut', source: require('./stickers/coconut.png')},
  {name: 'grapes', source: require('./stickers/grapes.png')},
  {name: 'lemon', source: require('./stickers/lemon.png')},
  {name: 'mango', source: require('./stickers/mango.png')},
  {name: 'melon', source: require('./stickers/melon.png')},
  {name: 'olive', source: require('./stickers/olive.png')},
  {name: 'pear', source: require('./stickers/pear.png')},
  {name: 'pineapple', source: require('./stickers/pineapple.png')},
  {name: 'strawberry', source: require('./stickers/strawberry.png')},
  {name: 'tangerine', source: require('./stickers/tangerine.png')},
  {name: 'tomato', source: require('./stickers/tomato.png')},
];

const Stickers: FunctionComponent = () => {
  const sendSticker = useCallback(async (sticker: Sticker) => {
    const {uri} = Image.resolveAssetSource(sticker.source);
    try {
      await MessagesModule.insertSticker(uri);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderSticker = useCallback(
    (info: ListRenderItemInfo<Sticker>) => {
      return (
        <Pressable onPress={() => sendSticker(info.item)}>
          <Image source={info.item.source} style={styles.image} />
        </Pressable>
      );
    },
    [sendSticker],
  );

  const getKey = useCallback((sticker: Sticker) => {
    return sticker.name;
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Vegtastick</Text>
      </View>
      <FlatList
        data={stickers}
        renderItem={renderSticker}
        keyExtractor={getKey}
        numColumns={4}
        showsVerticalScrollIndicator={false}
        testID="pack-details-stickers"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#34c759',
  },
  image: {
    width: 90,
    height: 90,
  },
});

export default Stickers;
