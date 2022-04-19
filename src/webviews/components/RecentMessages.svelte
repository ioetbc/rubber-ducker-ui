<script lang="ts">
  import type { Message } from "../../types";

  export let messages: any[];
  export let handleNewScreen: any;
</script>

<div class="container">
  {#each messages as message}
    <div class="pill" on:click={() => handleNewScreen(message, "messages")}>
      <img
        class="avatar"
        src={message.avatar_url}
        alt={`${message.username} avatar`}
      />
      <div class="content">
        <p class="username">{message.username}</p>
        <p class="intro">{message.text}</p>
      </div>
    </div>
  {/each}
</div>

<style>
  .container {
    height: 500px;
    overflow-y: scroll;
    margin-top: 24px;
  }
  .pill {
    background: green;
    display: flex;
    gap: 14px;
    padding: 8px;
    margin-bottom: 24px;
    border-radius: 8px;
    cursor: pointer;
  }

  .pill:hover {
    background: #5eac5e;
  }

  .avatar {
    background: blue;
    border-radius: 50%;
    width: 65px;
  }

  .content {
  }

  .username {
    margin-bottom: 8px;
  }
</style>
