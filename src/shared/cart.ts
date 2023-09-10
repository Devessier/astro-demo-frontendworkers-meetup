import { assign, createMachine, interpret } from "xstate";
import type { CartCookieContent } from "../types";

/** @xstate-layout N4IgpgJg5mDOIC5QGECGAnALgAgLaoGMALASwDswBiAVQAcJVMxsCNMBtABgF1FRaA9rBKYSAsnxAAPRAEYAHAHYAdABYArAE4AbOoDMixRoBMneXoA0IAJ6IAtOuPLZnTcaOy92z7MMBfAKsyAQg4STQsPEJSCklBYVFxSRkEWVllTXljNO1tTUVdX2NtK1tU9Py9Mz1VTQM9RwCAoA */
const cartMachine = createMachine(
  {
    id: "Cart machine",

    tsTypes: {} as import("./cart.typegen").Typegen0,

    schema: {
      context: {} as {
        cart: CartCookieContent | undefined;
      },
      events: {} as {
        type: "Update cart";
        cart: CartCookieContent;
      },
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
