import React, {FunctionComponent} from 'react';
import {
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';

const green = '#34c759';

const App: FunctionComponent = () => {
  return (
    <>
      <View style={styles.header}>
        <StatusBar
          translucent={Platform.OS === 'ios'}
          backgroundColor={green}
          barStyle={'light-content'}
        />
        <Text style={styles.headerText}>Vegtastick</Text>
      </View>
      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionHeader}>Food Fact</Text>
          </View>
          <Text>Did you know that tomatoes are a fruit?</Text>
          <Image
            source={require('./stickers/tomato.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionHeader}>Recipe of the Day</Text>
          </View>
          <Text>It's summer! Time for a delicious mango sorbet!</Text>
          <Image
            source={require('./stickers/mango.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionHeader}>Health Tip</Text>
          </View>
          <Text>
            Have you ever heard that an apple a day keeps the doctor away? Learn
            the truth behind the adage!
          </Text>
          <Image
            source={require('./stickers/apple.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.section}>
          <View>
            <Text style={styles.sectionHeader}>Forums</Text>
          </View>
          <Text>
            Join the community and share your love of fruits and vegetables!
          </Text>
          <View style={styles.images}>
            <Image
              source={require('./stickers/banana.png')}
              style={styles.image}
            />
            <Image
              source={require('./stickers/blueberries.png')}
              style={styles.image}
            />
            <Image
              source={require('./stickers/grapes.png')}
              style={styles.image}
            />
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    backgroundColor: green,
  },
  header: {
    backgroundColor: green,
    color: 'white',
    height: Platform.select({ios: 90, default: undefined}),
    justifyContent: 'flex-end',
    paddingBottom: 10,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  content: {
    paddingHorizontal: 10,
    marginBottom: Platform.select({ios: 30, default: undefined}),
  },
  contentContainer: {
    paddingVertical: 10,
  },
  section: {
    margin: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#aaaaaa',
    paddingVertical: 8,
    paddingHorizontal: 10,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginTop: 10,
  },
  images: {
    flexDirection: 'row',
  },
});

export default App;
