import type { User } from "@auth0/auth0-spa-js";
import { writable, type Writable } from "svelte/store";

export const user: Writable<User> = writable();
export const token: Writable<string> = writable();
