// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.todos.loadingTodos:invocation[0]": {
      type: "done.invoke.todos.loadingTodos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.todos.loadingTodos:invocation[0]": {
      type: "error.platform.todos.loadingTodos:invocation[0]";
      data: unknown;
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    loadTodos: "done.invoke.todos.loadingTodos:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: "loadTodos";
  };
  eventsCausingActions: {
    assignErrorToContext: "error.platform.todos.loadingTodos:invocation[0]";
    assignNewTodoToCtx: "FORM_INPUT_CHANGED";
    assignTodosToContext: "done.invoke.todos.loadingTodos:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {
    loadTodos: "xstate.init";
  };
  matchesStates:
    | "creatingTodos"
    | "creatingTodos.displayFormInput"
    | "loadingTodos"
    | "todosFailed"
    | "todosLoaded"
    | { creatingTodos?: "displayFormInput" };
  tags: never;
}
