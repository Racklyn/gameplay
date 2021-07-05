 
import { StyleSheet } from 'react-native';
//Barrinha inferior de navegação que tem no IPhone
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  banner: {
    width: '100%',
    height: 234
  },
  bannerContent: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 24,
    marginBottom: 30,
    position: 'relative'
  },
  deleteButton:{
    position: 'absolute',
    bottom: 0,
    right: 24,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.title700,
    color: theme.colors.heading
  },
  subtitle: {
    fontSize: 13,
    fontFamily: theme.fonts.text400,
    color: theme.colors.heading,
    lineHeight: 21
  },
  members: {
    marginLeft: 24,
    marginTop: 27
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    marginBottom: getBottomSpace(),
  },
  unavailable:{
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  unavailableText:{
    color: theme.colors.primary,
    marginTop: 16,
    fontSize: 20,
    textAlign: 'center',
    fontFamily: theme.fonts.text500,
  }
});