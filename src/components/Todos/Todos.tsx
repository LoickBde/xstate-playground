import { useMachine } from "@xstate/react";
import { todosMachine } from "../../machines/todosMachine";

const todos = new Set<string>(["Learn xstate", "Drink beers"]);

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
        console.log(event.todo);
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
        {/* {stateTodos.context.todos.map(todo => {})} */}
        {stateTodos.context.todos.map((todo) => {
          return (
            <div key={todo} style={{ display: "flex", alignItems: "center" }}>
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

        {stateTodos.matches("todosLoaded") && (
          <button onClick={() => sendTodos({ type: "CREATE_NEW" })}>
            Create new
          </button>
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
      </div>
    </>
  );
};
