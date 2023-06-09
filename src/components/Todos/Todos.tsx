import { useMachine } from "@xstate/react";
import { todosMachine } from "../../machines/todosMachine";

const todos = new Set<string>([]);

export const Todos = () => {
  const [stateTodos, sendTodos] = useMachine(todosMachine, {
    services: {
      loadTodos: async () => {
        return Array.from(todos);
      },
      saveTodo: async (context, event) => {
        todos.add(context.newTodoFormInput);
      },
      deleteTodo: async (context, event) => {
        // throw new Error("throwing error manually");
        todos.delete(event.todo);
      },
    },
  });
  return (
    <>
      <h2>Todos</h2>
      <p>State machine: {JSON.stringify(stateTodos.value)}</p>
      <p>Ctx machine: {JSON.stringify(stateTodos.context)}</p>
      <div>
        {stateTodos.matches("todosLoaded") && (
          <>
            {stateTodos.context.todos.map((todo) => {
              return (
                <div
                  key={todo}
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <p>{todo}</p>
                  <button
                    onClick={() => {
                      sendTodos({
                        type: "DELETE",
                        todo: todo,
                      });
                    }}
                  >
                    Delete
                  </button>
                </div>
              );
            })}

            <button onClick={() => sendTodos({ type: "CREATE_NEW" })}>
              Create new
            </button>
          </>
        )}
        {stateTodos.matches("creatingTodos.displayFormInput") && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendTodos({
                type: "SUBMIT",
              });
            }}
          >
            <input
              onChange={(e) => {
                sendTodos({
                  type: "FORM_INPUT_CHANGED",
                  value: e.target.value,
                });
              }}
            ></input>
          </form>
        )}
        {stateTodos.matches("deletingTodoError") && (
          <>
            <p>Something went wrong - {stateTodos.context.errorMessage}</p>
            <button
              onClick={() => {
                sendTodos({ type: "GO_BACK_TO_LIST" });
              }}
            >
              Go back to list
            </button>
          </>
        )}
      </div>
    </>
  );
};
