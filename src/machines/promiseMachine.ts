import { createMachine } from "xstate";

export const promiseMachine = createMachine({
  predictableActionArguments: true,
  id: "promise",
  initial: "pending",
  states: {
    pending: {
      on: {
        RESOLVE: { target: "resolved" },
        REJECT: { target: "rejected" },
      },
    },
    resolved: { type: "final" },
    rejected: { type: "final" },
  },
});
