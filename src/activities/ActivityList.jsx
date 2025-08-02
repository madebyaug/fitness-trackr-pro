import { useAuth } from "../auth/AuthContext";
import { Link } from "react-router-dom";
import { createContext, useContext } from "react";

import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";

export const ActivitiesContext = createContext();

/** Shows a list of activities. */
export default function Activities() {
  const {
    data: activities,
    loading,
    error,
  } = useQuery("/activities", ["activities"]);

  if (loading || !activities) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return (
    <ul>
      {activities.map((activity) => (
        <ActivitiesList key={activity.id} activity={activity} />
      ))}
    </ul>
  );
}

/** Shows a single activity. Logged-in users will also see a delete button. */
function ActivitiesList({ activity }) {
  const { token } = useAuth();

  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", `/activities/${activity.id}`, ["activities"]);

  if (loading || !deleteActivity) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  // NEEDED HELP HERE
  // KEPT ON FUCKING UP HERE ADDING THE ":" BEFORE "${activity.id}"
  return (
    <li key={activity.id}>
      <Link to={`/Activities/${activity.id}`}>
        <p>{activity.name}</p>
      </Link>
      {token && (
        <button onClick={() => deleteActivity()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </li>
  );
}

export function useActivities() {
  const context = useContext(ActivitiesContext);
  if (!context)
    throw new Error(
      "useActivities must be used within ActivitiesContext.Provider"
    );
  return context.activities;
}
