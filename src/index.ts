import { interpret } from "xstate";
import { promiseMachine } from "./machines/promiseMachine";

const promiseService = interpret(promiseMachine).onTransition((state) =>
  console.log(state.value)
);

// Start the service
promiseService.start();

// send an event
promiseService.send({ type: "RESOLVE" });
