<script lang="ts">
  import { onMount } from "svelte";
  import type { User, Screens } from "../../types";
  import { isEmpty } from "lodash";

  import FindTeacher from "./FindTeacher.svelte";
  import Profile from "./Profile.svelte";
  import Teacher from "./Teacher.svelte";
  import InvoiceScreen from "./screens/InvoiceScreen.svelte";
  import MessageScreen from "./screens/MessageScreen.svelte";

  let todos: Array<{ text: string; completed: boolean }> = [];
  let user: User | null = null;
  let teacher: User | null = null;
  let accessToken: string = "";
  let page: Screens = tsvscode.getState()?.page || "homepage";
  $: tsvscode.setState({ page });

  onMount(async () => {
    window.addEventListener("message", async (event) => {
      const message = event.data;

      switch (message.type) {
        case "newTodo":
          todos = [{ text: message.text, completed: false }, ...todos];
          break;
        case "token":
          accessToken = message.value;
          const response = await fetch(`${apiBaseUrl}/checkUserLoggedIn`, {
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          });
          const data = await response.json();
          user = data.user;
          break;
      }
    });
    tsvscode.postMessage({ type: "getToken", value: undefined });
  });

  const handlePageSelection = (newPage: Screens) => {
    page = newPage;
  };

  const handleUserSelection = (selectedTeacher: User) => {
    teacher = selectedTeacher;
  };
</script>

{#if isEmpty(user)}
  <button
    on:click={() => {
      tsvscode.postMessage({ type: "authenticate", value: undefined });
    }}>login with github</button
  >
{:else if page === "homepage" && user}
  <FindTeacher {handlePageSelection} {handleUserSelection} {accessToken} />
{:else if page === "profile" && user}
  <Profile {user} {accessToken} />
{:else if page === "teacher" && user && teacher}
  <Teacher {teacher} {accessToken} />
{:else if page === "invoice" && user}
  <InvoiceScreen amount={23.58} owedTo="ioetbc" perHourRate={50} time={23.57} />
{:else if page === "messages" && user && teacher}
  <MessageScreen {accessToken} {teacher} {user} />
{/if}

<div style="position: fixed; bottom: 16px">
  <button on:click={() => handlePageSelection("homepage")}>home</button>
  <button on:click={() => handlePageSelection("profile")}>profile</button>
  <button on:click={() => handlePageSelection("invoice")}>invoice</button>

  <button
    on:click={() => {
      accessToken = "";
      user = null;
      tsvscode.postMessage({ type: "logout", value: undefined });
    }}>logout</button
  >
</div>
