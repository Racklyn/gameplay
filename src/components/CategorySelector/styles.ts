
import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
  container: {
    minHeight: 120,
    maxHeight: 120,
    paddingLeft: 24,
  },
  isEmptyStyle: {
    borderColor: theme.colors.primary,
    borderWidth: 2,
    borderRadius: 8,
    paddingLeft: 22,
  }
});