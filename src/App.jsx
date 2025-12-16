import { RouterProvider } from "react-router/dom";
import { router } from "./routes/router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  return (
    <BrowserRouter basename="/fitness-management-system-frontend">
      <RouterProvider router={router} />
      <ToastContainer />
    </BrowserRouter>
  );
}
export default App;
