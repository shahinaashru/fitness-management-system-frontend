import Layout from "../layout/Layout";
import Login from "../pages/shared/Login";
// import { createBrowserRouter } from "react-router-dom";
import { createHashRouter } from "react-router-dom";
import SignUp from "../pages/shared/SignUp";
import Dashboard from "../pages/admin/Dashboard";
import UserDashboard from "../pages/users/Dashboard";
import TrainerDashboard from "../pages/trainers/Dashboard";
import User from "../pages/users/User";
import Clients from "../pages/trainers/Users";
import Profile from "../pages/users/Profile";
import TrainerProfile from "../pages/trainers/Profile";
import AssignedTrainers from "../pages/users/Trainers";
import Trainers from "../pages/trainers/Trainers";
import FitnessPrograms from "../pages/users/FitnessPrograms";
import CreateUser from "../pages/admin/CreateUser";
import PrivateRoute from "../components/PrivateRoute";
import AdminLayout from "../layout/Layout";
import DailyActivity from "../pages/users/DailyActivity";
import DailyStatusCard from "../pages/users/DailyStatusCard";
import CreateFitnessProgram from "../pages/admin/CreateFitnessProgram";
import CreateTrainer from "../pages/admin/CreateTrainer";
import AddWeeklyPlan from "../pages/trainers/AddWeeklyPlan";
import UsersDailyStatus from "../pages/trainers/UsersDailyStatus";
import CreateProfile from "../pages/users/CreateProfile";
import OrderSuccess from "../pages/users/OrderSuccess";
import OrderDetails from "../pages/users/OrderList";
import CreaterainerProfile from "../pages/trainers/CreateProfile";
import WeeklyActivityPlans from "../pages/fitness/WeeklyActivityPlans";
import BookPersonalSession from "../pages/users/BookPersonalSession";
import MyBookedSessions from "../pages/users/MyBookedSessions";
import TrainerSessionPage from "../pages/trainers/TrainerSessionPage";
import OrderFailed from "../pages/users/OrderFailed";
import SesionSuccess from "../pages/users/SessionSuccess";
import SessionDetails from "../pages/users/SessionDetails";
import SelectedProgram from "../pages/users/SelectedProgram";
import MyProgram from "../pages/users/MyProgram";
import TrainerOrdersTable from "../pages/trainers/TrainerOrdersTable";
import EditProfile from "../pages/users/EditProfile";
import EditTrainerProfile from "../pages/trainers/EditTrainerProfile";
export const router = createHashRouter(
  [
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/signup",
      element: <SignUp />,
    },
    {
      path: "/auth",
      element: <PrivateRoute />,
      children: [
        {
          path: "admin",
          element: <AdminLayout />,
          children: [
            {
              path: "dashboard",
              element: <Dashboard />,
            },
            {
              path: "user",
              element: <User />,
            },
            {
              path: "create-user",
              element: <CreateUser />,
            },
            {
              path: "create-trainer",
              element: <CreateTrainer />,
            },
            {
              path: "trainer",
              element: <Trainers />,
            },
            {
              path: "fitness-programs",
              element: <FitnessPrograms />,
            },
            {
              path: "./daily-status-card",
              element: <DailyStatusCard />,
            },
            {
              path: "users-daily-status",
              element: <UsersDailyStatus />,
            },
            {
              path: "create-fitness-program",
              element: <CreateFitnessProgram />,
            },
          ],
        },
        {
          path: "user",
          element: <Layout />,
          children: [
            {
              path: "dashboard",
              element: <UserDashboard />,
            },
            {
              path: "profile",
              element: <Profile />,
            },
            {
              path: "create-profile",
              element: <CreateProfile />,
            },
            {
              path: "edit-profile",
              element: <EditProfile />,
            },
            {
              path: "trainer",
              element: <AssignedTrainers />,
            },
            {
              path: "daily-status-card",
              element: <DailyStatusCard />,
            },
            {
              path: "daily-activity",
              element: <DailyActivity />,
            },
            {
              path: "fitness-programs",
              element: <FitnessPrograms />,
            },
            {
              path: "payment/success",
              element: <OrderSuccess />,
            },
            {
              path: "session/success",
              element: <SesionSuccess />,
            },
            {
              path: "payment/failed",
              element: <OrderFailed />,
            },
            {
              path: "order-details",
              element: <OrderDetails />,
            },
            {
              path: "book-session",
              element: <BookPersonalSession />,
            },
            {
              path: "my-booked-sessions",
              element: <MyBookedSessions />,
            },
            {
              path: "session-details/:id",
              element: <SessionDetails />,
            },
            {
              path: "selected-program/:id",
              element: <SelectedProgram />,
            },
            {
              path: "my-programs",
              element: <MyProgram />,
            },
          ],
        },
        {
          path: "trainer",
          element: <Layout />,
          children: [
            {
              path: "dashboard",
              element: <TrainerDashboard />,
            },
            {
              path: "profile",
              element: <TrainerProfile />,
            },
            {
              path: "fitness-programs",
              element: <FitnessPrograms />,
            },
            {
              path: "create-profile",
              element: <CreaterainerProfile />,
            },
            {
              path: "edit-profile",
              element: <EditTrainerProfile />,
            },
            {
              path: "add-weeklyplan",
              element: <AddWeeklyPlan />,
            },
            {
              path: "users-daily-status",
              element: <UsersDailyStatus />,
            },
            {
              path: "user",
              element: <Clients />,
            },
            {
              path: "create-fitness-program",
              element: <CreateFitnessProgram />,
            },
            {
              path: "weekly-activity-plans",
              element: <WeeklyActivityPlans />,
            },
            {
              path: "trainer-orders-details",
              element: <TrainerOrdersTable />,
            },
            {
              path: "session-request",
              element: <TrainerSessionPage />,
            },
          ],
        },
        {
          path: "*",
          element: <div>404 - Page Not Found</div>,
        },
      ],
    },
  ]
  // {
  //   basename: "/fitness-management-system-frontend/",
  // }
);
