<script lang="ts">
  export let handleTechnologyInput: any;
</script>

<select
  class="select"
  name="technologies"
  id="technologies"
  on:input={handleTechnologyInput}
>
  <option value="none" selected disabled hidden>select technologies</option>
  <option value="javascript">javascript</option>
  <option value="html">html</option>
  <option value="css">css</option>
  <option value="node">node</option>
  <option value="python">python</option>
  <option value="react">react</option>
  <option value="svelte">svelte</option>
  <option value="postgres">postgres</option>
  <option value="dynamo_db">dynamo_db</option>
  <option value="tensorflow">tensorflow</option>
</select>
