import useMutation from "../api/useMutation";

export default function SetList({ sets }) {
  const {
    mutate: deleteSet,
    loading,
    error,
  } = useMutation("DELETE", `/sets/${sets.id}`, ["sets"]);

  if (loading || !deleteSet) return <p>Loading...</p>;
  if (error) return <p>Sorry! {error}</p>;

  return <SetItem set={sets} />;
}

function SetItem({ set }) {
  const {
    mutate: deleteSet,
    loading,
    error,
  } = useMutation("DELETE", `/sets/${set.id}`, ["sets"]);

  return (
    <>
      {!set.name ? (
        <p>No Set Data</p>
      ) : (
        <p>
          {set.name} x {set.count}
        </p>
      )}
      <button onClick={() => deleteSet()}>
        {loading ? "Deleting" : error ? error : "Delete Set"}
      </button>
    </>
  );
}
