
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    width: 62,
    height: 66,
    borderRadius: 8,
    backgroundColor: theme.colors.discord,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', //pra imagem não sobrepor a borda
  },
  image: {
    width: 62,
    height: 66,
  },
});