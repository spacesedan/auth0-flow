<script lang="ts">
  import type { User } from "@auth0/auth0-spa-js";
  import { withAuth } from "../lib/authService";
  import { onMount } from "svelte";

  const auth = withAuth();

  let user: User;

  auth.user.subscribe((userAuth) => {
    console.log(userAuth)
    user = userAuth;
  });

  let token = "";
  auth.token.subscribe((t) => {
    console.log("Token",t)
    token = t;
  });

</script>

<h1>Welcome to SvelteKit</h1>
<p>
  Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation
</p>
<button on:click={auth.login}>Login</button>
<button on:click={auth.logout}>Logout</button>
<pre>{JSON.stringify(user, null, 2)}</pre>
