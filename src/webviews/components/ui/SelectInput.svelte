<script lang="ts">
  export let id: string;
  export let label: string | false = false;
  export let handler: (event: any | null) => void;
  export let values: string[] | number[];
  export let valuePrefix: string | false = false;
</script>

{#if label}<label for={id}>{label}</label>{/if}

<select name={id} {id} on:input={handler}>
  {#each values as value}
    <option {value}
      >{#if valuePrefix}{valuePrefix}{/if}{value}</option
    >
  {/each}
</select>

<style>
</style>
