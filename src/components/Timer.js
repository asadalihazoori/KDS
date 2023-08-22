import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';
import { FontStyle } from '../theme/FontStyle';
import { useDispatch, useSelector } from 'react-redux';
import { update_order_time } from '../redux/action';

const Timer = ({ callNo }) => {
    const dispatch = useDispatch();
    var orders = useSelector((state) => state.addOrder.data);
    const matchedOrder = orders.find(order => order.callNo == callNo);
    const [elapsedTime, setElapsedTime] = useState(matchedOrder.time);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedTime(elapsedTime + 1);
            dispatch(update_order_time(callNo, elapsedTime + 1))
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [elapsedTime]);

    return (
        <Text style={FontStyle.Bold12}>{formatTime(matchedOrder.time)}</Text>
    );
};

export default Timer;


export function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

}