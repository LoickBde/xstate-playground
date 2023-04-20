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
      <div>
        {stateTodos.matches("todosLoaded") && (
          <button onClick={() => sendTodos({ type: "CREATE_NEW" })}>
            Create new
          </button>
        )}
        {stateTodos.matches("creatingTodos.displayFormInput") && (
          <input
            onChange={(e) => {
              sendTodos({
                type: "FORM_INPUT_CHANGED",
                value: e.target.value,
              });
            }}
          ></input>
        )}
      </div>
    </>
  );
};
