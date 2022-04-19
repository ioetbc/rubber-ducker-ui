<script lang="ts">
  import { onMount } from "svelte";
  import { io } from "socket.io-client";

  import type { User } from "../../../types";

  export let teacher: User;
  export let user: User;
  export let accessToken: string;

  let messages: any = [];
  let message: string = "";
  let socket: any = null;
  const URL = "http://localhost:3002";

  onMount(async () => {
    getAllMessages();
    socket = io(URL, { autoConnect: false });
    socket.auth = { username: user.github_id };
    socket.connect();
  });

  const getAllMessages = async () => {
    messages = await (
      await fetch(`${apiBaseUrl}/getConversation`, {
        method: "POST",
        body: JSON.stringify({ teacher_github_id: teacher.github_id }),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();

    console.log("messages bitch", messages);
  };

  const handleMessage = (event: any) => {
    message = event?.target?.value;
  };

  $: if (socket) {
    socket.on(
      "private message",
      ({ content, from }: { content: string; from: string }) => {
        console.log("receved", content);
        messages.push({
          recipient: from,
          username: user.username,
          text: content,
        });
        messages = messages;
        console.log("me", messages);
      }
    );
  }

  const handleSendMessage = async (event: any) => {
    event.preventDefault();
    socket.emit("private message", {
      content: message,
      to: teacher.github_id,
    });
    await (
      await fetch(`${apiBaseUrl}/postMessage`, {
        method: "POST",
        body: JSON.stringify({
          github_id: user.github_id,
          teacher_github_id: teacher.github_id,
          message,
        }),
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();
  };
</script>

<div class="container">
  {#each messages as message}
    {#if message.recipient !== user.github_id}
      <div class="message-container outgoing">
        <div class="bubble outgoing-message">
          <p>{message.text}</p>
        </div>
        <p class="username">you</p>
      </div>
    {:else}
      <div class="message-container">
        <div class="bubble incoming-message">
          <p>{message.text}</p>
        </div>
        <p class="username">{message.username}</p>
      </div>
    {/if}
  {/each}
</div>
<form on:submit={handleSendMessage}>
  <textarea
    on:input={handleMessage}
    name="message"
    maxlength="200"
    type="text"
  />
  <button type="submit">send</button>
</form>

<style>
  .container {
    height: 500px;
    overflow-y: scroll;
    margin-top: 24px;
  }

  .message-container {
    margin-bottom: 24px;
  }

  .bubble {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 12px;
    margin-bottom: 14px;
  }

  .outgoing-message {
    background: blue;
    text-align: right;
  }

  .incoming-message {
    background: green;
  }

  .outgoing {
    text-align: right;
  }

  .username {
    margin-top: -12px;
    font-size: 10px;
  }
</style>
