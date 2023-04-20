import { createMachine, assign } from "xstate";

export const todosMachine = createMachine(
  {
    id: "todos",
    predictableActionArguments: true,
    tsTypes: {} as import("./todosMachine.typegen").Typegen0,
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
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
    },
    initial: "loadingTodos",
    states: {
      loadingTodos: {
        invoke: {
          src: "loadTodos",
          onDone: [
            {
              target: "todosLoaded",
              actions: "assignTodosToContext",
            },
          ],
          onError: [
            {
              target: "todosFailed",
              actions: "assignErrorToContext",
            },
          ],
        },
      },
      todosLoaded: {},
      todosFailed: {},
    },
  },
  {
    actions: {
      assignTodosToContext: assign((context, event) => {
        return {
          todos: event.data,
        };
      }),
      assignErrorToContext: assign((context, event) => {
        return {
          errorMessage: (event.data as Error).message,
        };
      }),
    },
  }
);
