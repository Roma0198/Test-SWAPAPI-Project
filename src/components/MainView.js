import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

import { colors } from '@extra/colors';
import { images } from '@assets/images';

export const MainView = ({ children, withGoBack, headerText, navigation }) => (
  <View style={styles.mainBox}>
    <View style={styles.headerBox}>
      {!!withGoBack && (
        <TouchableOpacity onPress={navigation.goBack}>
          <Image source={images.back} style={styles.back} />
        </TouchableOpacity>
      )}

      <Text style={styles.headerText}>{headerText}</Text>
    </View>

    {children}
  </View>
);

const styles = StyleSheet.create({
  mainBox: {
    flex: 1,
    backgroundColor: colors.MAIN,
    paddingVertical: 32,
  },
  headerBox: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.SECOND,
  },
  back: {
    height: 20,
    width: 20,
    marginRight: 16,
  },
});
