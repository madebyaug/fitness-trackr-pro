import { useParams } from "react-router-dom";
import useQuery from "../api/useQuery";
import useMutation from "../api/useMutation";
import { useAuth } from "../auth/AuthContext";

/** Shows single activity. */
export default function Activity() {
  const { id } = useParams();

  const {
    data: activity,
    loading,
    error,
  } = useQuery(`/activities/${id}`, ["activities"]);

  if (loading || !activity) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return <ActivityItem activity={activity} />;
}

/** Shows a single activity. Logged-in users will also see a delete button. */
function ActivityItem({ activity }) {
  const { token } = useAuth();

  const {
    mutate: deleteActivity,
    loading,
    error,
  } = useMutation("DELETE", `/activities/${activity.id}`, ["activities"]);

  return (
    <section>
      <h1>{activity.name}</h1>
      <i>By: {activity.creatorName}</i>
      <p>{activity.description}</p>
      {token && (
        <button onClick={() => deleteActivity()}>
          {loading ? "Deleting" : error ? error : "Delete"}
        </button>
      )}
    </section>
  );
}
