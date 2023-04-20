import { createMachine } from "xstate";

export const todosMachine = createMachine({
  id: "todos",
  predictableActionArguments: true,
  initial: "loadingTodos",
  schema: {
    // events: {} as
    //   | { type: "loadingTodosCompleted"; todos: string[] }
    //   | { type: "loadingTodosFailed"; errorMessage: string },
    services: {} as {
      loadTodos: {
        data: string[];
      };
    },
  },
  tsTypes: {} as import("./todosMachine.typegen").Typegen0,
  states: {
    loadingTodos: {
      invoke: {
        src: "loadTodos",
        onDone: [
          {
            target: "todosLoaded",
          },
        ],
        onError: [
          {
            target: "todosFailed",
          },
        ],
      },
    },
    todosLoaded: {},
    todosFailed: {},
  },
});
