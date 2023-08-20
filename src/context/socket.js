import React, { useEffect } from "react";
import TcpSocket from 'react-native-tcp-socket';
import { useDispatch } from "react-redux";
import { add_order } from "../redux/action";

const SocketContext = React.createContext(null)

export const useSocket = () => {
    return React.useContext(SocketContext)
}

export const SocketProvider = (props) => {

    const dispatch = useDispatch()

    const kdsPort = 3399;

    useEffect(() => {

        TcpSocket.createServer(function (socket) {


            socket.on('data', (data) => {
                const order = JSON.parse(data)
                // console.log(order);
                dispatch(add_order(order))
            });

            socket.on('error', (error) => {
                console.log('An error ocurred with client socket ', error);
            });

            socket.on('close', () => {
                console.log('Closed connection with ', socket.address());
            });

        }).listen({ port: kdsPort, host: '0.0.0.0' });

    }, [])


    return (
        <SocketContext.Provider value={{}}>
            {props.children}
        </SocketContext.Provider>
    );
}