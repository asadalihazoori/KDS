
import { View, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import OrdersCard from './OrdersCard'
import { useSelector } from 'react-redux';


const FilterOrdersComplete = () => {

  const orders = useSelector((state) => state.completedOrders.data);

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

export default FilterOrdersComplete