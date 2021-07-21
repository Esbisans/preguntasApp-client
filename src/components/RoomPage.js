import {useContext, useEffect, useState} from "react";
import {SocketContext} from "../context/SocketContext";

export const RoomPage = ({location}) => {

    const [users, setUsers] = useState([]);
    const [preguntas, setPreguntas] = useState([]);
    const {socket} = useContext(SocketContext);
    const [play, setPlay] = useState(false);
    const [actual, setActual] = useState(null);

    const handleIniciar = (e) => {
        e.preventDefault();
        socket.emit('iniciar', play);
        console.log(actual)
        console.log(preguntas.length)
        //setActual(preguntas.find(pregunta => pregunta.id === 1))
    }


    useEffect(() => {
        socket.on('current-users', (users) => {
            setUsers(users);
        })
        socket.on('current-preguntas', (preguntas) => {
            setPreguntas(preguntas);
        })

        socket.on('show', (iniciar) => {
            setPlay(true);
        })
        socket.on('current-question', (question) => {
            setActual(question)
        })

        return () => {
            socket.off('current-users');
            socket.off('current-preguntas')
            //socket.emit('remove-user', location.state);
        }
    }, [socket])


    return(
        <>
            <div className="col-2">
                <table className="table table-stripped">
                    <thead>
                    <tr>
                        <th>Usuarios conectados</th>
                        <th>Puntuación</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user => (
                                <tr key={user.name}>
                                    {
                                        user.name === location.state
                                            ?
                                                <td className="text-success">
                                                    {user.name}
                                                </td>


                                            :
                                                <td>
                                                    {user.name}
                                                </td>

                                    }
                                    <td>{user.score}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
                <div className="row">
                    <div className="col d-grid gap-2">
                        <button
                            className="btn btn-primary mb-4"
                            onClick={handleIniciar}
                        >
                            Iniciar
                        </button>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="modal-dialog text-center">
                    {
                        play
                            ?
                                    preguntas.length === 0
                                        ? <h1>Cargando ... </h1>
                                        :
                                    <div className="card" >
                                    <div className="card-body">
                                        <h3>{preguntas[1].descripcion}</h3>
                                    </div>
                                    <ul className="list-group list-group-flush ">
                                        <li className="list-group-item d-grid gap-2">
                                            <button
                                                className="btn btn-primary"
                                            >
                                                {preguntas[1].resIncorrecta1}
                                            </button>
                                        </li>
                                        <li className="list-group-item d-grid gap-2"><button
                                            className="btn btn-primary"
                                        >
                                            {preguntas[1].resIncorrecta2}
                                        </button>
                                        </li>
                                        <li className="list-group-item d-grid gap-2"><button
                                            className="btn btn-primary"
                                        >
                                            {preguntas[1].resIncorrecta3}
                                        </button></li>
                                        <li className="list-group-item d-grid gap-2"><button
                                            className="btn btn-primary"
                                        >
                                            {preguntas[1].resCorrecta}
                                        </button></li>
                                    </ul>
                                </div>

                            :   <h1>Presione iniciar para jugar</h1>
                    }
                </div>
            </div>
        </>
    );
}