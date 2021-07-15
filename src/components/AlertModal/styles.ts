import { StyleSheet } from 'react-native';
import { theme } from '../../global/styles/theme';

export const styles = StyleSheet.create({
    container: {
        height: 200,
        width: '90%',
    },
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.55)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    title:{
        fontFamily: theme.fonts.title700,
        fontSize: 24,
        color: theme.colors.heading,
        textAlign: 'center',
        paddingTop: 30,
        paddingBottom: 10
    },
    alertContainer:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingHorizontal: 20,
    }
});