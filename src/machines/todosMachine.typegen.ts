// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  "@@xstate/typegen": true;
  internalEvents: {
    "done.invoke.todos.creatingTodos.savingTodo:invocation[0]": {
      type: "done.invoke.todos.creatingTodos.savingTodo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.todos.deletingTodo:invocation[0]": {
      type: "done.invoke.todos.deletingTodo:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "done.invoke.todos.loadingTodos:invocation[0]": {
      type: "done.invoke.todos.loadingTodos:invocation[0]";
      data: unknown;
      __tip: "See the XState TS docs to learn how to strongly type this.";
    };
    "error.platform.todos.creatingTodos.savingTodo:invocation[0]": {
      type: "error.platform.todos.creatingTodos.savingTodo:invocation[0]";
      data: unknown;
    };
    "error.platform.todos.deletingTodo:invocation[0]": {
      type: "error.platform.todos.deletingTodo:invocation[0]";
      data: unknown;
    };
    "error.platform.todos.loadingTodos:invocation[0]": {
      type: "error.platform.todos.loadingTodos:invocation[0]";
      data: unknown;
    };
    "xstate.after(2500)#todos.deletingTodoError": {
      type: "xstate.after(2500)#todos.deletingTodoError";
    };
    "xstate.init": { type: "xstate.init" };
  };
  invokeSrcNameMap: {
    deleteTodo: "done.invoke.todos.deletingTodo:invocation[0]";
    loadTodos: "done.invoke.todos.loadingTodos:invocation[0]";
    saveTodo: "done.invoke.todos.creatingTodos.savingTodo:invocation[0]";
  };
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: "deleteTodo" | "loadTodos" | "saveTodo";
  };
  eventsCausingActions: {
    assignErrorToContext:
      | "error.platform.todos.creatingTodos.savingTodo:invocation[0]"
      | "error.platform.todos.deletingTodo:invocation[0]"
      | "error.platform.todos.loadingTodos:invocation[0]";
    assignNewTodoToCtx: "FORM_INPUT_CHANGED";
    assignTodosToContext: "done.invoke.todos.loadingTodos:invocation[0]";
    resetFormInput: "done.invoke.todos.creatingTodos.savingTodo:invocation[0]";
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {
    hasTodos: "done.invoke.todos.loadingTodos:invocation[0]";
  };
  eventsCausingServices: {
    deleteTodo: "DELETE";
    loadTodos:
      | "done.invoke.todos.creatingTodos.savingTodo:invocation[0]"
      | "done.invoke.todos.deletingTodo:invocation[0]"
      | "xstate.init";
    saveTodo: "SUBMIT";
  };
  matchesStates:
    | "creatingTodos"
    | "creatingTodos.displayFormInput"
    | "creatingTodos.savingTodo"
    | "deletingTodo"
    | "deletingTodoError"
    | "loadingTodos"
    | "todosFailed"
    | "todosLoaded"
    | { creatingTodos?: "displayFormInput" | "savingTodo" };
  tags: never;
}
