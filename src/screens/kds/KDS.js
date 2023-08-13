import { View, Text, FlatList } from 'react-native'
import React from 'react'
import OrdersCard from '../../components/OrdersCard'
import styles from './styles'

const KDS = () => {

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
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>KDS</Text>
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