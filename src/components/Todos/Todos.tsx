import { useMachine } from "@xstate/react";
import { todosMachine } from "../../machines/todosMachine";

export const Todos = () => {
  const [stateTodos, sendTodos] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return ["Learn xtstate", "Drink beers"];
      },
    },
  });
  return (
    <>
      <h2>Todos</h2>
      <p>{JSON.stringify(stateTodos.value)}</p>
      <button
        onClick={() =>
          sendTodos({ type: "loadingTodosCompleted", todos: ["Learn xstate"] })
        }
      >
        Todos Loading OK
      </button>
      <button
        onClick={() =>
          sendTodos({
            type: "loadingTodosFailed",
            errorMessage: "Error occured",
          })
        }
      >
        Todos Loading FAILED
      </button>
    </>
  );
};
