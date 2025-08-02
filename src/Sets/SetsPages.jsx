import { useRoutine } from "../routines/RoutineItem";

// COMPONENTS
import SetForm from "./SetsForm";
import SetList from "./SetsList";

export default function SetsPage() {
  const routine = useRoutine();

  console.log(routine);

  return (
    <>
      <section>
        <h3>Sets</h3>
        {routine.sets.map((set, i) => (
          <SetList key={i} sets={set} />
        ))}
      </section>
      <section>
        <SetForm />
      </section>
    </>
  );
}
