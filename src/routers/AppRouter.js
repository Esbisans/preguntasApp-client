import {
    BrowserRouter as Router,
    Switch,
    Route, Redirect,
} from "react-router-dom";
import HomePage from "../HomePage";
import {RoomPage} from "../components/RoomPage";

export const AppRouter = () => {
    return(
        <div>
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/home" component={HomePage}/>
                        <Route exact path="/room" component={RoomPage}/>


                        <Redirect to="/home"/>
                    </Switch>
                </div>
            </Router>
        </div>
    );
}