import { scale, verticalScale } from "react-native-size-matters";
const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#c9cdcc',
    },

    header: {
        marginVertical: verticalScale(12),
        justifyContent: 'center'
    },

    headerText: {
        color: 'black',
        textAlign: 'center'
    },

    ordersView: {
        marginHorizontal: scale(7),
        marginBottom: verticalScale(97)
    },

})


export default styles;