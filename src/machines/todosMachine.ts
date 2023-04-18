import { createMachine } from "xstate";

export const todosMachine = createMachine(
  {
    id: "todos",
    predictableActionArguments: true,
    initial: "loadingTodos",
    schema: {
      events: {} as
        | { type: "loadingTodosCompleted"; todos: string[] }
        | { type: "loadingTodosFailed"; errorMessage: string },
    },
    tsTypes: {} as import("./todosMachine.typegen").Typegen0,
    states: {
      loadingTodos: {
        on: {
          loadingTodosCompleted: { target: "todosLoaded", actions: "logTodos" },
          loadingTodosFailed: { target: "todosFailed" },
        },
      },
      todosLoaded: {},
      todosFailed: {},
    },
  },
  {
    actions: {
      logTodos: (context, event) => {
        console.log(JSON.stringify(event.todos));
      },
    },
  }
);
