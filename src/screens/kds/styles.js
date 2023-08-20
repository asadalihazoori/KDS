import { scale, verticalScale } from "react-native-size-matters";
const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f2f2',
        flex: 1
    },

    header: {
        marginTop: '3%',
        justifyContent: 'center',
        alignItems: 'center'
    },

    ordersView: {
        marginHorizontal: scale(7),
        marginBottom: verticalScale(50)
    },



    TabViewCreateContainer: {
        backgroundColor: 'white',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: '2%',
        elevation: 10,
        // ...NewTheme.Shadow
    },
    TabViewCreateIndicator: {
        // backgroundColor: Theme.colors.blackcolor,
        backgroundColor: 'black',
        width: '45%',
        marginHorizontal: 10
    },


})


export default styles;