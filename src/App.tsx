import { AuthContext } from "./components/AuthContext";
import { Router } from "./components/Router";
import useFirebase from "./hooks/firebase";

function App() {
  const user = useFirebase();

  return (
    <AuthContext.Provider value={user}>
      <div className="bg-zinc-100 p-6 gap-6 flex flex-col h-screen">
        <Router />
      </div>
    </AuthContext.Provider>
  );
}

export default App;
