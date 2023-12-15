import { useState } from "react";
import "./utils/interceptor";
import "./App.css";
import UserForm from "./components/UserForm";
import Layout from "./pages/Layout";
import { ToastContainer } from "react-toastify";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Layout />
    </div>
  );
}

export default App;
