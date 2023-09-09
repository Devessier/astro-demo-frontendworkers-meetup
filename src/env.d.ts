/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user:
      | {
          name: string;
        }
      | undefined;
    isAuthenticated: boolean;
  }
}
