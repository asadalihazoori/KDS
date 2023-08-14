import { View, Text, FlatList } from 'react-native'
import React, { useEffect } from 'react'
import OrdersCard from '../../components/OrdersCard'
import styles from './styles'
import { FontStyle } from '../../theme/FontStyle'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { add_order } from '../../redux/action'

const KDS = () => {
    // const orders = useSelector((state) => state.addOrderReducer);
    // const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(add_order(
    //         {
    //             order_no: 'A 25486665',
    //             call_id: 2246,
    //             products: [
    //                 {
    //                     id: 1,
    //                     qty: 2,
    //                     name: 'Latte',
    //                     modifiers: 'To Go, Colombia Las Milagros, Low Fat Milk, No Sugar'
    //                 },
    //                 {
    //                     id: 2,
    //                     qty: 4,
    //                     name: 'Cappuccino',
    //                     modifiers: 'Costa Rica Encinos, Full Fat Milk'
    //                 }]
    //         },
    //     ))
    // }, [])

    const orders = [
        {
            order_no: 'A 25486665',
            call_id: 2246,
            time: '00:34',
            products: [
                {
                    id: 1,
                    qty: 2,
                    name: 'Latte',
                    modifiers: 'To Go, Colombia Las Milagros, Low Fat Milk, No Sugar'
                },
                {
                    id: 2,
                    qty: 4,
                    name: 'Cappuccino',
                    modifiers: 'Costa Rica Encinos, Full Fat Milk'
                }]
        },
        {
            order_no: 'A 25486677',
            call_id: 225,
            time: '01:22',
            products: [
                {
                    id: 1,
                    qty: 2,
                    name: 'Latte',
                    modifiers: 'To Go, Colombia Las Milagros, Low Fat Milk, No Sugar'
                },
                {
                    id: 2,
                    qty: 4,
                    name: 'Cappuccino',
                    modifiers: 'Costa Rica Encinos, Full Fat Milk'
                }]
        },
        {
            order_no: 'A 25486698',
            call_id: 226,
            time: '12:44',
            products: [
                {
                    id: 1,
                    qty: 2,
                    name: 'Latte',
                    modifiers: 'To Go, Colombia Las Milagros, Low Fat Milk, No Sugar'
                },
                {
                    id: 2,
                    qty: 4,
                    name: 'Cappuccino',
                    modifiers: 'Costa Rica Encinos, Full Fat Milk'
                }]
        },
        {
            order_no: 'A 25486645',
            call_id: 229,
            time: '12:44',
            products: [
                {
                    id: 1,
                    qty: 2,
                    name: 'Latte',
                    modifiers: 'To Go, Colombia Las Milagros, Low Fat Milk, No Sugar'
                },
                {
                    id: 2,
                    qty: 4,
                    name: 'Cappuccino',
                    modifiers: 'Costa Rica Encinos, Full Fat Milk'
                }]
        },
        {
            order_no: 'A 25486640',
            call_id: 232,
            time: '12:44',
            products: [
                {
                    id: 1,
                    qty: 2,
                    name: 'Latte',
                    modifiers: 'To Go, Colombia Las Milagros, Low Fat Milk, No Sugar'
                },
                {
                    id: 2,
                    qty: 4,
                    name: 'Cappuccino',
                    modifiers: 'Costa Rica Encinos, Full Fat Milk'
                }]
        },
        {
            order_no: 'A 25486390',
            call_id: 233,
            time: '12:44',
            products: [
                {
                    id: 1,
                    qty: 2,
                    name: 'Latte',
                    modifiers: 'To Go, Colombia Las Milagros, Low Fat Milk, No Sugar'
                },
                {
                    id: 2,
                    qty: 4,
                    name: 'Cappuccino',
                    modifiers: 'Costa Rica Encinos, Full Fat Milk'
                }]
        },
        {
            order_no: 'A 25486492',
            call_id: 243,
            time: '12:44',
            products: [
                {
                    id: 1,
                    qty: 2,
                    name: 'Latte',
                    modifiers: 'To Go, Colombia Las Milagros, Low Fat Milk, No Sugar'
                },
                {
                    id: 2,
                    qty: 4,
                    name: 'Cappuccino',
                    modifiers: 'Costa Rica Encinos, Full Fat Milk'
                }]
        },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[styles.headerText, FontStyle.Bold18]}>KDS</Text>
            </View>

            <View style={styles.ordersView}>
                <FlatList
                    data={orders}
                    renderItem={({ item }) => <OrdersCard order={item} />}
                    keyExtractor={(_, index) => index.toString()}
                    numColumns={3}
                    columnWrapperStyle={{
                        justifyContent: 'space-around',
                    }}
                />

            </View>

        </View>
    )
}

export default KDS