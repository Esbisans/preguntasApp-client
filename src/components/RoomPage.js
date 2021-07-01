import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../context/SocketContext";

export const RoomPage = () => {

    const [users, setUsers] = useState([]);
    const {socket} = useContext(SocketContext);



    useEffect(() => {
        socket.on('current-users', (users) => {
            setUsers(users);
        })
        return () => socket.off('current-users');
    }, [socket])

    return(
        <>
            <div>
                <table className="table table-stripped">
                    <thead>
                    <tr>
                        <th>Usuarios conectados</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.name}>
                                    <td>
                                        {user.name}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </>
    );
}