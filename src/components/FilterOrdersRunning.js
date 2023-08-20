import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import OrdersCard from './OrdersCard'
import { useSelector } from 'react-redux';

const FilterOrdersRunning = () => {
  var orders = useSelector((state) => state.addOrder.data);
  // const orders = [
  //   {
  //     transactionNo: 'A 25486665',
  //     callNo: 224,
  //     products: [
  //       {
  //         id: 1,
  //         qty: 2,
  //         title: 'Latte',
  //         arabic_name: 'لاتيه',
  //         modifier_list: [
  //           {
  //             count: 2,
  //             name: 'Colombia Las Milagros',
  //           },
  //           {
  //             count: 1,
  //             name: 'Fat Milk',
  //           },
  //         ]
  //       },
  //       {
  //         id: 2,
  //         qty: 4,
  //         title: 'Cappuccino',
  //         arabic_name: 'كابتشينو',
  //         modifiers: 'Costa Rica Encinos, Full Fat Milk',
  //         modifier_list: [
  //           {
  //             count: 1,
  //             name: 'Costa Rica Encinos',
  //           },
  //           {
  //             count: 3,
  //             name: 'Sugar',
  //           },
  //         ]
  //       }]
  //   },
  // ];


  return (
    <View style={newStyle.container}>
      <FlatList
        data={orders}
        renderItem={({ item }) => <OrdersCard order={item} />}
        keyExtractor={(_, index) => index.toString()}
        numColumns={3}
        columnWrapperStyle={newStyle.cardsGap}
        contentContainerStyle={newStyle.rowGap}
      />
    </View>
  )
}


const newStyle = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    alignSelf: "center",
    marginTop: 5,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardsGap: {
    columnGap: 10,
  },
  rowGap: {
    rowGap: 10,
  },
  cardContainer: {
    maxWidth: "32.5%"
  }
})

export default FilterOrdersRunning