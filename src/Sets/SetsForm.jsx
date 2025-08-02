import useMutation from "../api/useMutation";

/** Users can create new routines with a name and goal. */
export default function SetForm() {
  const {
    mutate: add,
    loading,
    error,
  } = useMutation("POST", "/sets", ["sets"]);

  const addSet = (formData) => {
    const name = formData.get("name");
    const count = formData.get("count");
    add({ name, count });
  };

  return (
    <>
      <h2>Add New Set</h2>
      <form action={addSet}>
        <label>
          Select Activity
          <select name="name" id="ActivityList">
            {/* {activities.map((items, index) => {
              <option key={index}>{items.name}</option>;
            })} */}
          </select>
        </label>
        <label>
          Count
          <input type="text" name="count" />
        </label>
        <button>{loading ? "Adding..." : "Add Set"}</button>
        {error && <output>{error}</output>}
      </form>
    </>
  );
}
