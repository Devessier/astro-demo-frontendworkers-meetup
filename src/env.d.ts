/// <reference types="astro/client" />

declare namespace App {
  interface Locals {
    user:
      | {
          email: string;
        }
      | undefined;
    isAuthenticated: boolean;
  }
}
