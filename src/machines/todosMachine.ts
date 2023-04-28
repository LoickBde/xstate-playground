import { createMachine, assign } from "xstate";

export const todosMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QBcD2FWwHQBtUEMIBLAOygBV1MBiDEsLUgN1QGsG0Ns9DSKrYCZqgDG+ZEVQkA2gAYAunPmJQAB0xEJUlSAAeiAEwBWA1iMB2ABwBGAwDY7tgCxPZdgMwAaEAE9E7uyMsAE4jd1sw2UsA6IBfWO9OTFwCYjJKLmowACds1GysVRxxADN8gFssJO5UvgzMIRIWMS0ZBSUddVhNSRIdfQQDJ1MLG3tHIdcPbz8EGywnYKXgyydrJ0tLY3jEgSqBABlUyGoAYQAlAFEAQXJLgH0AOUuAdQ6kEC6e7Q+Bx3cQm5jJYHLIjFFrDN-JZzAsDME7KE7LJ3JsDEMdiBqlgRNkwOI6ntiLAivgfAAxCoASRIqgArshqOSAPLnACy9ypjwACgBVcj3U4ACWujwA4pcACLvNQaVr9RCWWSw1bucweIzgzUmKEIVxOLB2cwIzbmTXWC3uTHY3H4iTpIlEEnFCnU2kM6gAZV5ACE2VTyDLPnLegqENZZC4sLJgmrzK4rE4jLHdUZrADzNZ-gis5YwkZrXtbQSHVwsLB8ExCRhaFIGMJ2Psy8X7fwyxWq6XUI1mgSpEog195b9DCYzFZbA5nFM7Lr0Rn7EZHCCs8ZUYXm3iS23kh3q6gsrl8oVisgytlKjat636tg912e6I+21FApOiGfqABhGozG4wnVmTLxfEQYZZCwex3FkWxzAMdwAnMcx4gSEASHQOAdGqd9umHL9EAAWlnECEEIjdkh4NId3gD4h1DEc9QMXV3DWLAlScREjH1TNNTI7BqiOQhIGw74+no9iDXcAwxlCYJ1nsSwmJhEJ4SNDw3HcIDeKbTByXwIgcCEmiP1EvC9ScFVgnUlFrE4sF011CMAXMwJFjWKTzA06wtJbfdqNlHC6NMs1glYpw1Q1LVNUY4jwlhaxjSNIwQXMKIHG869fKwYlSVdC8aXpZBhNwvRFQ0kIwnTPMDHjSxQlTNwsHTKSoiXOwXHcYJ0rtTL7x3IrApK8MhhCqZqsQmxhlRXVzNheFghcOwpIMdZzOQ2IgA */
    id: "todos",
    predictableActionArguments: true,
    tsTypes: {} as import("./todosMachine.typegen").Typegen0,
    schema: {
      services: {} as {
        loadTodos: {
          data: string[];
        };
        saveTodo: {
          data: void;
        };
        deleteTodo: {
          data: void;
        };
      },
      events: {} as
        | {
            type: "CREATE_NEW";
          }
        | {
            type: "FORM_INPUT_CHANGED";
            value: string;
          }
        | {
            type: "SUBMIT";
          }
        | {
            type: "DELETE";
            todo: string;
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
          DELETE: { target: "deletingTodo" },
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
              SUBMIT: {
                target: "savingTodo",
              },
            },
          },
          savingTodo: {
            invoke: {
              src: "saveTodo",
              onDone: [
                {
                  target: "#todos.loadingTodos",
                  actions: "resetFormInput",
                },
              ],
              onError: [
                {
                  target: "displayFormInput",
                  actions: "assignErrorToContext",
                },
              ],
            },
          },
        },
      },
      deletingTodo: {
        invoke: {
          src: "deleteTodo",
          onDone: [
            {
              target: "loadingTodos",
            },
          ],
          onError: [
            {
              target: "deletingTodoError",
              actions: "assignErrorToContext",
            },
          ],
        },
      },
      deletingTodoError: {},
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
      resetFormInput: assign((context, event) => {
        return {
          newTodoFormInput: "",
        };
      }),
    },
  }
);
