<script lang="ts">
  import type { Message } from "../../types";
  import Avatar from "./Avatar.svelte";

  export let messages: Message[];
</script>

<div class="container">
  <Avatar {user} {handleTeacher} />
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
