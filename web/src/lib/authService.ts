import { User, createAuth0Client } from "@auth0/auth0-spa-js";
import config from "../auth_config";
import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";

let user: Writable<User> = writable()
let token: Writable<string> = writable()
export function withAuth(): {
  user: Writable<User>;
  token: Writable<string>;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUser: () => Promise<void>
} {

  function getClient() {
    return createAuth0Client({
      domain: config.domain,
      clientId: config.clientId,
      authorizationParams: {
        redirect_uri: window.location.href,
      },
    });
  }


  async function login() {
    const client = await getClient();
    client.loginWithRedirect()
  }

  async function logout() {
    const client = await getClient();
    client.logout();
  }

  async function getUser(): Promise<void> {
    const client = await getClient();
    try {
      const accessToken = await client.getTokenSilently()
      token.set(accessToken)

      const userDetails = await client.getUser()
      user.set(userDetails)

    } catch (e) {
      console.warn("SOMETHING WENT WRONG", e);
    }
  }
  if (browser) {
    getUser()
  }
  return {
    getUser,
    user,
    token,
    logout,
    login,
  };
}
