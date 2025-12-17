import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter } from "react-router-dom";
function App() {
  return (
    <HashRouter>
      <RouterProvider router={router} />
      <ToastContainer />
    </HashRouter>
  );
}
export default App;
