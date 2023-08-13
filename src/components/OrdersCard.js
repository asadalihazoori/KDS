import { Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from 'react-native-vector-icons/FontAwesome6';

const OrdersCard = ({ order }) => {
    // console.log('card rendered');
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [disabled, setDisable] = useState(false);
    const [color, setColor] = useState('blue');

    const [running, setRunning] = useState(false);
    const [timeElapsed, setTimeElapsed] = useState(0);
    const [intervalId, setIntervalId] = useState(null);

    useEffect(() => {
        toggleTimer();
    }, [])

    const toggleTimer = () => {
        if (running) {
            clearInterval(intervalId);
            setRunning(false);
        } else {
            const id = setInterval(() => {
                setTimeElapsed(prevTime => prevTime + 1000); // Increment time by 1 second
            }, 1000); // Update every second
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

        AsyncStorage.getItem('orders', (err, orders) => {
            if (err) {
                console.error('Error fetching customers from local storage:', err);
                return;
            }

            let parsedorders = [];

            if (orders) {
                parsedorders = JSON.parse(orders);
            }
            console.log(parsedorders)

            parsedorders.push(order);

            AsyncStorage.setItem('orders', JSON.stringify(parsedorders))
                .then(() => {
                    console.log('Order added successfully:');
                    setIsConfirmed(true);
                    setDisable(true);
                    setColor('green');
                    toggleTimer();
                })
                .catch(error => {
                    console.log('Error saving order:', error);
                });
        });

    };

    const handleCancel = () => {
        setDisable(true);
        setColor('red');
        toggleTimer();
    }

    const Products = ({ product }) => {

        return (
            <View style={styles.productView}>
                <View style={styles.producHeadertView}>
                    <Text style={styles.productHeaderText}>{product.qty}</Text>
                    <Text style={styles.productHeaderText}>  {product.name}</Text>
                </View>

                <View style={styles.modifierView}>
                    <Text style={styles.modifiersText}>{product.modifiers}</Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <View style={styles.headerView}>
                <TouchableOpacity style={[styles.statusDot, { backgroundColor: color }]} />
                <Text style={styles.orderNoText}>RPZ : {order.order_no}</Text>
                <View style={styles.callerIDview}>
                    <Text style={styles.callIdText}>CALL ID: {order.call_id} </Text>
                    <Text style={styles.callIdText} >{formatTime(Math.floor(timeElapsed / 1000))}</Text>
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
                        <Icons name="check" color={color} size={scale(20)}/>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default OrdersCard;


const styles = StyleSheet.create({

    container: {
        // flex: 1,
        backgroundColor: "white",
        margin: scale(3),
        borderRadius: scale(12),
        paddingVertical: scale(8),
        paddingHorizontal: scale(10),
        width: '32.3%'
    },

    headerView: {
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
        fontSize: scale(10),
        color: 'black',
        fontWeight: 'bold',
    },

    callIdText: {
        fontWeight: 'bold',
        fontSize: scale(10),
        color: 'black'
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

    productHeaderText: {
        color: 'black',
        fontSize: scale(10)
    },

    modifierView: {

    },
    modifiersText: {
        color: 'grey',
        fontSize: scale(10)
    },

    buttonsView: {
        marginTop: verticalScale(4),
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

})
