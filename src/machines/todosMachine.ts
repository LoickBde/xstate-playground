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
      events: {} as
        | { type: "CREATE_NEW" }
        | {
            type: "FORM_INPUT_CHANGED";
            value: string;
          },
    },
    context: {
      todos: [] as string[],
      errorMessage: undefined as string | undefined,
      newTodoFormInput: "",
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
      todosLoaded: {
        on: {
          CREATE_NEW: { target: "creatingTodos" },
        },
      },
      todosFailed: {},
      creatingTodos: {
        initial: "displayFormInput",
        states: {
          displayFormInput: {
            on: {
              FORM_INPUT_CHANGED: {
                target: "displayFormInput",
                actions: "assignNewTodoToCtx",
              },
            },
          },
        },
      },
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
      assignNewTodoToCtx: assign((context, event) => {
        return {
          newTodoFormInput: event.value,
        };
      }),
    },
  }
);
