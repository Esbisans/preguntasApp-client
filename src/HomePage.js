import {useContext} from "react";
import {SocketContext} from "./context/SocketContext";
import {useForm} from "./hooks/useForm";

export const HomePage = ({history}) => {

    const [formValues, handleInputChange] = useForm({
        user: ''
    });
    const {user} = formValues;

    const {online, socket} = useContext(SocketContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.trim().length > 0){
            socket.emit('add-user', {name:user});
            history.push(
                {
                    pathname: '/room',
                    state: user
                }
            );
        }
    }
    return (
        <div className="container">
            <div className="alert">
                <p>
                    Service status:
                    {
                        online
                            ? <span className="text-success"> Online</span>
                            : <span className="text-danger"> Offline</span>
                    }

                </p>
            </div>

            <div className="modal-dialog text-center">
                <div className="modal-content">
                    <h2 className="mt-3">Nombre de jugador</h2>
                    <form className="container" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="my-4">

                                <input
                                    className="form-control"
                                    autoComplete="off"
                                    type="text"
                                    placeholder="Usuario"
                                    name="user"
                                    value={user}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col d-grid gap-2">
                                <button className="btn btn-primary mb-4">
                                    Jugar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>

        </div>
    );
}

export default HomePage;