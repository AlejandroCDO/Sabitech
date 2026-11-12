import { list } from "../api/charlasApi";

export function ListarCharlasButton() {
  async function listarCharlas() {
    console.log("listar charlas");
    await list();
    console.log("charlas listadas");
  }
  return (
    <>
      <button onClick={listarCharlas}>Listar Charlas</button>
    </>
  );
}
