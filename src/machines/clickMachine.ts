import { createMachine } from "xstate";

export const clickMachine = createMachine({
  predictableActionArguments: true,
  id: "click",
  initial: "notClicked",
  states: {
    notClicked: {
      on: {
        PRESS: {
          target: "clicked",
        },
      },
    },
    clicked: {
      on: {
        PRESS: {
          target: "notClicked",
        },
      },
    },
  },
});
