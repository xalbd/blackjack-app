import { AuthContext } from "./components/AuthContext";
import Game from "./components/Game";
import useFirebase from "./hooks/firebase";

function App() {
  const user = useFirebase();

  return (
    <AuthContext.Provider value={user}>
      <Game />
    </AuthContext.Provider>
  );
}

export default App;
