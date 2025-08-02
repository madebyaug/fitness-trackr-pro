import { useAuth } from "../auth/AuthContext";

import RoutineForm from "./RoutineForm";
import RoutineList from "./RoutineList";

/**
 * All users can see a list of activities.
 * If they are logged in, they will also see a form to create an activity.
 */
export default function RoutinesPage() {
  const { token } = useAuth();

  return (
    <>
      <section>
        <h1>Routines</h1>
        <RoutineList />
      </section>
      <section>{token && <RoutineForm />}</section>
    </>
  );
}
