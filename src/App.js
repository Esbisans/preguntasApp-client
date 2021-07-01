import {SocketProvider} from "./context/SocketContext";
import {AppRouter} from "./routers/AppRouter";

function App() {
  return (
      <SocketProvider>
          <AppRouter/>
      </SocketProvider>
  );
}

export default App;
