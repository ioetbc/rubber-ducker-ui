<script lang="ts">
  import { onMount } from "svelte";
  import type {
    User,
    Page,
    TechnologyTypes,
    TeacherFilters,
    Message,
    TeacherPrice,
  } from "../../types";
  import {
    handleTechnologyType,
    handleTechnologyProficiency,
  } from "../utils/filterTeacher/index";
  import ActiveUsers from "./ActiveUsers.svelte";
  import Messages from "./Messages.svelte";
  import TechnologyFilter from "./TechnologFilter.svelte";
  import AdvancedFiltering from "./AdvancedFiltering.svelte";
  import Pill from "./Pill.svelte";
  import { getFilteredTeachers } from "../utils/filterTeacher/getFilteredTeachers";

  export let accessToken: string;
  export let handlePageSelection: (arg0: Page) => void;
  export let handleUserSelection: (arg0: User) => void;

  let teacherFilters: TeacherFilters = {
    minStarRating: 1,
    technologies: [],
    teacherPrice: 200,
  };
  let users: User[] = [];
  let messages: Message[] = [];
  let advancedSearch: boolean = false;

  onMount(async () => {
    getAllUsers();
    getAllMessages();
  });

  const getAllUsers = async () => {
    users = await (
      await fetch(`${apiBaseUrl}/getAllUsers`, {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();
  };

  const getAllMessages = async () => {
    messages = await (
      await fetch(`${apiBaseUrl}/getAllMessages`, {
        headers: {
          authorization: `Bearer ${accessToken} `,
        },
      })
    ).json();
  };

  const handleFormChange = async () => {
    users = await getFilteredTeachers({ teacherFilters, accessToken });
  };

  const handleProficiencyInput = (event: any, technology: TechnologyTypes) => {
    teacherFilters = handleTechnologyProficiency({
      value: event.target.value,
      technology,
      currentFilters: teacherFilters,
    });
    handleFormChange();
  };

  const handleTeacher = (selectedTeacher: User) => {
    handleUserSelection(selectedTeacher);
    handlePageSelection("teacher");
  };

  const handleMinStarRating = () => {
    const minStarRating = (<HTMLInputElement>(
      document.getElementById("star-rating")
    )).value;
    teacherFilters.minStarRating = Number(minStarRating);
  };

  const handleTeacherMaxPrice = () => {
    const teacherPrice = (<HTMLInputElement>(
      document.getElementById("teacher-price")
    )).value;
    teacherFilters.teacherPrice = <TeacherPrice>Number(teacherPrice);
  };

  const handleTechnologyInput = async (event: any) => {
    teacherFilters = handleTechnologyType({
      teacherFilters,
      value: event?.target?.value,
    });
    await handleFormChange();
  };

  const removeTechnologyType = async (technology: string) => {
    teacherFilters.technologies = teacherFilters.technologies.filter(
      (tech) => tech.type !== technology
    );

    if (teacherFilters.technologies.length > 0) {
      await handleFormChange();
    } else {
      await getAllUsers();
    }
  };
</script>

<div class="filter-container">
  <TechnologyFilter {handleTechnologyInput} />
  <div
    class="advanced-search"
    on:click={() => (advancedSearch = !advancedSearch)}
  >
    <p>advanced</p>
  </div>
</div>
{#if advancedSearch}
  <AdvancedFiltering
    {teacherFilters}
    {handleProficiencyInput}
    {handleMinStarRating}
    {handleTeacherMaxPrice}
    {advancedSearch}
  />
{/if}
{#each teacherFilters.technologies as technology}
  <Pill label={technology.type} {removeTechnologyType} />
{/each}

<ActiveUsers {users} {handleTeacher} />
<Messages {handlePageSelection} {messages} />

<style>
  .advanced-search {
    cursor: pointer;
    background: blue;
    padding: 4px;
    color: white;
  }
  .filter-container {
    display: flex;
    align-items: center;
    gap: 16px;
  }
</style>
