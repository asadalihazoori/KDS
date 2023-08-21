import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import Icons from 'react-native-vector-icons/FontAwesome6';
import { FontStyle } from '../theme/FontStyle';
import { useDispatch } from 'react-redux';
import { complete_order, remove_order } from '../redux/action';

const OrdersCard = ({ order }) => {

    const [disabled, setDisable] = useState(false);
    const [color, setColor] = useState('blue');
    const [orderStatus, setOrderStatus] = useState(false);

    const [running, setRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        if (order.orderStatus == undefined) {
            setOrderStatus(true);
            toggleTimer();
        }
        else {
            order.orderStatus == 'completed' ? setColor('green') : setColor('red')
        }
    }, [])


    const toggleTimer = () => {
        if (running) {
            clearInterval(intervalId);
            setRunning(false);
        } else {
            const id = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1000);
            }, 1000);
            setIntervalId(id);
            setRunning(true);
        }
    };

    const formatTime = timeInSeconds => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    const handleConfirm = () => {
        const newOrder = { ...order, orderStatus: 'completed', time: formatTime(Math.floor(timeElapsed / 1000)) }
        dispatch(complete_order(newOrder));
        dispatch(remove_order(order));

        toggleTimer();
    };

    const handleCancel = () => {
        const newOrder = { ...order, orderStatus: 'cancelled', time: formatTime(Math.floor(timeElapsed / 1000)) }
        dispatch(complete_order(newOrder));
        dispatch(remove_order(order));

        toggleTimer();
    }

    const Products = ({ product }) => {

        const modifiers = product?.modifier_list?.length != 0 ? product?.modifier_list?.filter(item => item?.count != 0)?.map(item => `${item?.count}x ${item?.name}`) : []

        return (
            <View style={styles.productView}>
                <View style={styles.producHeadertView}>
                    <Text style={FontStyle.Regular12}>{product.qty}</Text>
                    <Text style={FontStyle.Regular12}>  {product?.title} {product?.arabic_name}</Text>
                </View>
                {(modifiers && modifiers?.length != 0) &&
                    <View>
                        <Text style={[FontStyle.Regular12, { color: 'grey' }]}>{modifiers?.toString()}</Text>
                    </View>
                }
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View >
                <TouchableOpacity style={[styles.statusDot, { backgroundColor: color }]} />
                <Text style={[styles.orderNoText, FontStyle.Bold12]}>Transaction # : {order?.transactionNo}</Text>
                <View style={styles.callerIDview}>
                    {/* {console.log(order?.modifier_list)} */}
                    <Text style={FontStyle.Bold12}>CALL ID: {order?.callNo} </Text>
                    {orderStatus ?
                        <Text style={FontStyle.Bold12}>{formatTime(Math.floor(timeElapsed / 1000))}</Text>
                        :
                        <Text style={FontStyle.Bold12}>{order.time}</Text>

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
                        disabled={disabled}
                        style={styles.iconsView}>

                        <Icons name="xmark" color={color} size={scale(10)} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={handleConfirm}
                        disabled={disabled}
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
        // flex: 1
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
