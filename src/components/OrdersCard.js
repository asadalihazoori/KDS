import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/FontAwesome6';
import { FontStyle } from '../theme/FontStyle';
import { useDispatch } from 'react-redux';
import { complete_order } from '../redux/action';
import { useSelector } from 'react-redux';
import CountdownTimer from '../screens/CountdownTimer';

const OrdersCard = ({ order }) => {

    const [disabled, setDisable] = useState(false);
    const [running, setRunning] = useState(true);
    const [color, setColor] = useState('blue');

    const dispatch = useDispatch();

    // const data = useSelector((state) => state.completedOrders); // to get data

    const handleConfirm = () => {
        const newOrder = { ...order, orderStatus: 'completed', }
        dispatch(complete_order(newOrder));

        setDisable(true);
        setColor('green');
        setRunning(false);
    };

    const handleCancel = () => {
        const newOrder = { ...order, orderStatus: 'cancelled', }
        dispatch(complete_order(newOrder));

        setDisable(true);
        setColor('red');
        setRunning(false);
    }

    const Products = ({ product }) => {

        const modifiers = product?.modifier_list?.length != 0 ? product?.modifier_list?.filter(item => item?.count != 0)?.map(item => `${item?.count}x ${item?.name}`) : []

        return (
            <View style={styles.productView}>
                <View style={styles.producHeadertView}>
                    <Text style={FontStyle.Regular12}>{product.qty}</Text>
                    <Text style={FontStyle.Regular12}>  {product?.title} {product?.arabic_name}</Text>
                </View>
                <View>
                    <Text style={[FontStyle.Regular12, { color: 'grey' }]}>{(modifiers && modifiers?.length != 0) ? modifiers?.toString() : ''}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View >
                <TouchableOpacity style={[styles.statusDot, { backgroundColor: color }]} />
                <Text style={[styles.orderNoText, FontStyle.Bold12]}>Transaction # : {order?.transactionNo}</Text>
                <View style={styles.callerIDview}>
                    {console.log(order?.modifier_list)}
                    <Text style={FontStyle.Bold12}>CALL ID: {order?.callNo} </Text>
                    {/* <CountdownTimer initialTime={order.time * 60} running={running} /> */}
                </View>
            </View>


            <View style={styles.bodyView}>

                <FlatList
                    data={order?.products}
                    renderItem={({ item }) => <Products product={item} />}
                    keyExtractor={item => item.id}
                />

                <View style={styles.buttonsView}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleCancel}
                        disabled={disabled}>

                        <Icons name="xmark" color={color} size={scale(20)} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleConfirm}
                        disabled={disabled}>
                        <Icons name="check" color={color} size={scale(20)} />
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default OrdersCard;


const styles = StyleSheet.create({

    container: {
        backgroundColor: "white",
        margin: scale(3),
        borderRadius: scale(12),
        paddingVertical: scale(8),
        paddingHorizontal: scale(10),
        width: '32.3%'
    },

    statusDot: {
        width: moderateScale(17),
        height: moderateScale(17),
        borderRadius: moderateScale(17),
    },

    callerIDview: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    orderNoText: {
        marginTop: verticalScale(4),
    },

    bodyView: {
        backgroundColor: '#fff',
    },

    productView: {
        marginTop: verticalScale(4)
    },

    producHeadertView: {
        flexDirection: 'row'
    },

    buttonsView: {
        marginTop: verticalScale(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})
