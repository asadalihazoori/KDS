import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/FontAwesome6';
import { FontStyle } from '../theme/FontStyle';
import { useDispatch } from 'react-redux';
import { complete_order, remove_order } from '../redux/action';
import Timer, { formatTime } from './Timer';

const OrdersCard = ({ order }) => {

    const [color, setColor] = useState('#1089FF');
    const [orderStatus, setOrderStatus] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        if (order.orderStatus == undefined) {
            setOrderStatus(true);
        }
        else {
            order.orderStatus == 'completed' ? setColor('green') : setColor('red')
        }
    }, [])



    const handleConfirm = () => {
        const newOrder = { ...order, orderStatus: 'completed', }
        dispatch(complete_order(newOrder));
        dispatch(remove_order(order));
    };

    const handleCancel = () => {
        const newOrder = { ...order, orderStatus: 'cancelled', }
        dispatch(complete_order(newOrder));
        dispatch(remove_order(order));
    }

    const Products = ({ product }) => {

        const modifiers = product?.modifier_list?.length != 0 ? product?.modifier_list?.filter(item => item?.count != 0)?.map(item => `${item?.count}x ${item?.name}`) : []

        return (
            <View style={styles.productView}>
                <View style={styles.producHeadertView}>
                    <Text style={FontStyle.Regular14}>{product.qty}</Text>
                    <Text style={FontStyle.Regular14}>  {product?.title} {product?.arabic_name}</Text>
                </View>
                {(modifiers && modifiers?.length != 0) &&
                    <View>
                        <Text style={[FontStyle.Regular14, { color: 'grey' }]}>{modifiers?.toString()}</Text>
                    </View>
                }
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View >
                <TouchableOpacity style={[styles.statusDot, { backgroundColor: color }]} />
                <Text style={[styles.orderNoText, FontStyle.Bold14]}>Transaction # : {order?.transactionNo}</Text>
                <View style={styles.callerIDview}>
                    <Text style={FontStyle.Bold14}>CALL ID: {order?.callNo} </Text>
                    {orderStatus ?
                        <Timer callNo={order.callNo} />
                        :
                        <Text style={FontStyle.Bold12}>{formatTime(order.time)}</Text>

                    }
                </View>
            </View>


            <View style={styles.bodyView}>

                <FlatList
                    data={order?.products}
                    renderItem={({ item }) => <Products product={item} />}
                    keyExtractor={item => item.id}
                />

            </View>

            {orderStatus &&
                <View style={styles.buttonsView}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleCancel}
                        style={styles.iconsView}>

                        <Icons name="xmark" color={color} size={scale(10)} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleConfirm}
                        style={[styles.iconsView, { alignItems: 'flex-end', }]}>
                        <Icons name="check" color={color} size={scale(10)} />
                    </TouchableOpacity>
                </View>
            }
        </View >
    )
}

export default OrdersCard;


const styles = StyleSheet.create({

    container: {
        width: '31.7%',
        backgroundColor: "white",
        borderRadius: 12,
        paddingVertical: 10,
        paddingHorizontal: 14,
        margin: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.13,
        shadowRadius: 2,
        elevation: 2
    },

    statusDot: {
        width: moderateScale(12),
        height: moderateScale(12),
        borderRadius: moderateScale(17),
        marginBottom: verticalScale(4),
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
        flex: 1
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

    iconsView: {
        width: moderateScale(15),
        height: moderateScale(15),
        justifyContent: 'center',
    },

})
