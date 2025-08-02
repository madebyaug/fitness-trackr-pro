// ROUTERS, ROUTER
import { Routes, Route } from "react-router-dom";

// COMPONENTS
import ActivitiesPage from "./activities/ActivitiesPage";
import ActivityPage from "./activities/ActivityItem.jsx";
import RoutinesPage from "./routines/RoutinesPage";
import RoutinePage from "./routines/RoutineItem.jsx";
import SetsPage from "./Sets/SetsPages.jsx";
import Error404 from "./Error404.jsx";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Layout from "./layout/Layout.jsx";

/**
 * Fitness Trackr is a platform where fitness enthusiasts can share their workouts and
 * discover new routines. Anyone can browse the site and make an account, and users with an
 * account will be able to upload and manage their own activities.
 */
export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route index path={`/activities`} element={<ActivitiesPage />} />
          <Route path={`/activities/:id`} element={<ActivityPage />} />
          <Route path="/routines/" element={<RoutinesPage />} />
          <Route path={`/routines/:id`} element={<RoutinePage />} />
          <Route path="/auth/register" element={<Register />} />{" "}
          <Route path="/auth/login" element={<Login />} />
          <Route path="*" element={<Error404 />} />
        </Route>
      </Routes>
    </>
  );
}
