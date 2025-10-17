import { Toaster } from "react-hot-toast";
import Login from "./components/Login";
import Register from "./components/Register";

const App = () => {
  return (
    <div>
      <Toaster />
      <Login />
      <Register />
    </div>
  );
};

export default App;
