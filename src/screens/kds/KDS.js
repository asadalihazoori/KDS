import { View, Text } from 'react-native'
import React from 'react'
import styles from './styles'
import { FontStyle } from '../../theme/FontStyle'
import { TabBar, TabView } from 'react-native-tab-view';
import FilterOrdersRunning from '../../components/FilterOrdersRunning'
import FilterOrdersComplete from '../../components/FilterOrdersComplete'

const KDS = ({ navigation }) => {



    const [index, setIndex] = React.useState(0);

    const [routes] = React.useState([
        { key: 'first', title: "Running" },
        { key: 'second', title: "Complete" }
    ]);


    const renderTabBar = propss => (
        <TabBar
            {...propss}
            indicatorStyle={styles.TabViewCreateIndicator}
            style={styles.TabViewCreateContainer}
            activeColor="#000"
            inactiveColor="#7A7578"
            getLabelText={({ route }) => route.title}

        />
    );


    const RenderScene = (e, navigation) => {

        switch (e.route.key) {
            case 'first':
                return <FilterOrdersRunning navigation={navigation} />;
            case 'second':
                return <FilterOrdersComplete navigation={navigation} />;
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={[ FontStyle.Bold18, {color: '#848484'}]}>KDS</Text>
            </View>


            <TabView
                navigationState={{ index, routes }}
                renderScene={(e) => RenderScene(e, navigation)}
                onIndexChange={setIndex}
                renderTabBar={renderTabBar}
            />

        </View>
    )
}

export default KDS;