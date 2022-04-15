<script lang="ts">
  export let removeTechnologyType: any;
  export let label: string;
</script>

<div class="pill-container">
  <div class="pill">
    <p><strong>{label}</strong></p>
  </div>
  <div class="remove">
    <p on:click={() => removeTechnologyType(label)}>X</p>
  </div>
</div>

<style>
  .pill-container {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: 16px;
  }

  .pill {
    background: green;
    padding: 4px 12px;
    display: inline-flex;
    text-transform: uppercase;
    font-size: 10px;
    color: white;
    user-select: none;
  }
  .remove {
    display: flex;
    justify-content: center;
    cursor: pointer;
    background: red;
    margin-left: -8px;
  }
</style>
