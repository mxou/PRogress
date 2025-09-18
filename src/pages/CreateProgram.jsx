import Header from "../components/Header";
import CreateForm from "../components/CreateForm";

export default function CreateProgram() {
  return (
    <main>
      <Header HeaderTitle={"Creer un programme"} Return={true} />
      <CreateForm />
    </main>
  );
}
