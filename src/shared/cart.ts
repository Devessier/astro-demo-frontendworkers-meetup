import { assign, createMachine, interpret } from "xstate";
import type { CartCookieContent } from "../types";

/** @xstate-layout N4IgpgJg5mDOIC5QGECGAnALgAgLaoGMALASwDswBiAVQAcJVMxsCNMBtABgF1FRaA9rBKYSAsnxAAPRAEYArAGYAdABYAnACYAHNtX7OAdkP75AGhABPRAFpZi+cvkA2bfM7r1z1dsXbDAL4BFmhYeISkFMoAkhAANlQACugCEACuBDioEBCQ2JgCLGxcvEgggsKi4pIyCJqGssp6zvKymjqcipqyhhbWCM6NhpycqorjGn7OHkEhbOHE5GDKAIJkJPiiZFBFWJRSsJiMy6gAZkzoABSaI5wAlJShOPiLUWsbjOQ7rFglkhUiMQSMq1bTqZR+FzTWSyMGGRSqcxWRDtZzKbzyQwuBEmBTqbRBYIgMipOCSJ4LSJgf5CQHVEG2bqaZRtfGyThg9ScdycZx9RmOZzeTwNZyKbzc+SzEAUl5UmLxallAFVYGgWp2bwszRsjmebkjPnIhAw8HyfwwwzebSS6WyiJLVbrTZfXaYGmVIE1FHuZSaPzdbRCjSGdRtfkmhpqXS8kyh-zOTSqQkBIA */
const cartMachine = createMachine(
  {
    id: "Cart machine",
    tsTypes: {} as import("./cart.typegen").Typegen0,

    schema: {
      context: {} as {
        cart: CartCookieContent | undefined;
      },
      events: {} as
        | {
            type: "Update cart";
            cart: CartCookieContent;
          }
        | { type: "Product added to cart"; cart: CartCookieContent },
    },

    context: {
      cart: undefined,
    },

    on: {
      "Update cart": {
        target: "#Cart machine",
        internal: true,
        actions: "Assign cart to context",
      },
    },

    predictableActionArguments: true,

    states: {
      Idle: {
        on: {
          "Product added to cart": {
            target: "Animating cart",
            actions: "Assign cart to context",
          }
        },
      },

      "Animating cart": {
        after: {
          "2000": "Idle",
        },
      }
    },

    initial: "Idle",
  },
  {
    actions: {
      "Assign cart to context": assign({
        cart: (_context, event) => event.cart,
      }),
    },
  }
);

export const cartService = interpret(cartMachine).start();
