import { useParams } from "react-router-dom";
import { useContext, createContext } from "react";
import { useAuth } from "../auth/AuthContext";

import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

// COMPONENT
import SetsPage from "../Sets/SetsPages";

export const RoutineContext = createContext(); // forgot I could use this to pass props.

/** Shows single activity. */
export default function Routine() {
  const { id } = useParams();

  const {
    data: routine,
    loading,
    error,
  } = useQuery(`/routines/${id}`, ["routines"]);

  if (loading || !routine) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <RoutineContext.Provider value={{ routine }}>
      <RoutineItem />
    </RoutineContext.Provider>
  );
}

/** Shows a single routine. Logged-in users will also see a delete button. */
function RoutineItem() {
  const { token } = useAuth();
  const routine = useRoutine();

  const {
    mutate: deleteRoutine,
    loading,
    error,
  } = useMutation("DELETE", `/routines/${routine.id}`, ["routines"]);

  return (
    <>
      <section>
        <h1>{routine.name}</h1>
        <i>By: {routine.creatorName}</i>
        <p>{routine.goal}</p>
      </section>
      {token && (
        <button onClick={() => deleteRoutine()}>
          {loading ? "Deleting" : error ? error : "Delete Routine"}
        </button>
      )}
      {token && <SetsPage routine={routine} />}
    </>
  );
}

export function useRoutine() {
  const context = useContext(RoutineContext);
  if (!context)
    throw new Error("useRoutine must be used within RoutineProvider");
  return context.routine;
}
