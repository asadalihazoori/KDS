import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome6';
import { fonts } from '../theme/fonts';
import { FontStyle } from '../theme/FontStyle';
import { useDispatch } from 'react-redux';
import { complete_order } from '../redux/action';
import { useSelector } from 'react-redux';

const OrdersCard = ({ order }) => {
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [disabled, setDisable] = useState(false);
    const [color, setColor] = useState('blue');

    const [running, setRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    const dispatch = useDispatch();
    // const data = useSelector((state) => state.completedOrders);

    useEffect(() => {
        toggleTimer();
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
    };

    const handleConfirm = () => {
        const newOrder = { ...order, orderStatus: 'completed', time: formatTime(Math.floor(timeElapsed / 1000)) }
        dispatch(complete_order(newOrder));

        setIsConfirmed(true);
        setDisable(true);
        setColor('green');
        toggleTimer();
    };

    const handleCancel = () => {
        const newOrder = { ...order, orderStatus: 'cancelled', time: formatTime(Math.floor(timeElapsed / 1000)) }
        dispatch(complete_order(newOrder));

        setDisable(true);
        setColor('red');
        toggleTimer();
    }

    const Products = ({ product }) => {

        return (
            <View style={styles.productView}>
                <View style={styles.producHeadertView}>
                    <Text style={FontStyle.Regular12}>{product.qty}</Text>
                    <Text style={FontStyle.Regular12}>  {product.name}</Text>
                </View>

                <View>
                    <Text style={[FontStyle.Regular12, { color: 'grey' }]}>{product.modifiers}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View >
                <TouchableOpacity style={[styles.statusDot, { backgroundColor: color }]} />
                <Text style={[styles.orderNoText, FontStyle.Bold12]}>RPZ : {order.order_no}</Text>
                <View style={styles.callerIDview}>
                    <Text style={FontStyle.Bold12}>CALL ID: {order.call_id} </Text>
                    <Text style={FontStyle.Bold12} >{formatTime(Math.floor(timeElapsed / 1000))}</Text>
                </View>
            </View>


            <View style={styles.bodyView}>

                <FlatList
                    data={order.products}
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
