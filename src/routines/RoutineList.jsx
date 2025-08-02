import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";

import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

/** Shows a list of routines. */
export default function RoutineList() {
  const {
    data: routines,
    loading,
    error,
  } = useQuery("/routines", ["routines"]);

  if (loading || !routines) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {routines.map((routine) => (
        <RoutineListItem key={routine.id} routine={routine} />
      ))}
    </ul>
  );
}

/** Shows a single routine. Logged-in users will also see a delete button. */
function RoutineListItem({ routine }) {
  const { token } = useAuth();

  const {
    mutate: deleteRoutine,
    loading,
    error,
    // https://fitnesstrac-kr.herokuapp.com/docs/#tag/Routines/paths/~1routines~1%7Bid%7D/delete
  } = useMutation("DELETE", `/routines/${routine.id}`, ["routines"]);

  return (
    <li>
      <Link to={`/Routines/${routine.id}`}>
        <p>{routine.name}</p>
      </Link>
      {token && (
        <button onClick={() => deleteRoutine()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}
