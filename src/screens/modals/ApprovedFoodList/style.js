import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    listContainer: {
        flex: 1,
        backgroundColor: '#d6e0f0',
    },
    closeSection: {
        marginLeft: 5,
        marginTop: 30
    },
    close: {
        width: 25,
        height: 25
    },
    headingSection: {
        width: '100%',
        marginTop: 20,
        marginBottom: 20
    },
    headingText: {
        fontSize: 26,
        fontWeight: '700'
    },
    searchBoxContainer: {
        justifyContent: 'center'
    },
    searchButtonContainer: {
        justifyContent: 'center'
    },
    searchIcon: {
        width: 30,
        height: 30
    },
    searchContainer: {
        padding: 0,
        marginLeft: 5
    },
    searchSection: {
        width: '100%',
        backgroundColor: '#e5ecf9',
        borderWidth: 1,
        borderColor: '#e5e5e5',
        flexDirection: 'row',
        paddingHorizontal: 15,
        borderRadius: 4,
        marginTop: 10,
        paddingVertical: 5
    }
});