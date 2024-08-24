import { useContext } from "react";
import { UserContext } from "../context/userContext";

function App() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1 className="text-center">Bake Boutique</h1>
      {user ? (
        <span>Welcome, {user.name}</span>
      ) : (
        <span>Loading user information...</span>
      )}
    </div>
  );
}

export default App;
