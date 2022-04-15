<script lang="ts">
  import type { TeacherFilters } from "../../types";
  import SelectInput from "./ui/SelectInput.svelte";

  export let teacherFilters: TeacherFilters;
  export let handleProficiencyInput: any;
  export let handleMinStarRating: any;
  export let handleTeacherMaxPrice: any;
  export let advancedSearch: boolean;
</script>

{#if advancedSearch}
  <div class="advanced-option-container">
    <p>for each technology tell us how proficient the teacher needs to be</p>
    <ul>
      {#each teacherFilters.technologies as technology}
        <div class="flex">
          <li>{technology.type}</li>
          <li>{technology.proficency}</li>
          <SelectInput
            id="technology-proficiency"
            handler={(event) => handleProficiencyInput(event, technology.type)}
            values={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]}
          />
        </div>
      {/each}
    </ul>

    <SelectInput
      label="only show me search results for teachers that have a minimum star rating of"
      id="star-rating"
      handler={handleMinStarRating}
      values={[0, 1, 2, 3, 4, 5]}
    />

    <SelectInput
      label="only show me search results for teachers whos per hour rate is less than"
      id="teacher-price"
      handler={handleTeacherMaxPrice}
      values={[0, 10, 50, 75, 100, 125, 150, 175, 200]}
      valuePrefix="£"
    />
  </div>
{/if}

<style>
  .advanced-option-container {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
</style>
