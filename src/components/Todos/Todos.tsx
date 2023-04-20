import { useMachine } from "@xstate/react";
import { todosMachine } from "../../machines/todosMachine";

export const Todos = () => {
  const [stateTodos, sendTodos] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return ["Learn xstate", "Drink beers"];
      },
    },
  });
  return (
    <>
      <h2>Todos</h2>
      <p>{JSON.stringify(stateTodos.value)}</p>
      <p>{JSON.stringify(stateTodos.context)}</p>
    </>
  );
};
