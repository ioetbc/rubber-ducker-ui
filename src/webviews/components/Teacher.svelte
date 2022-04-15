<script lang="ts">
  import type { User, Review, ReviewStarRating } from "../../types";
  import { onMount } from "svelte";

  import Avatar from "./Avatar.svelte";
  import StarRating from "./StarRating.svelte";
  import Reviews from "./Reviews.svelte";
  import SelectInput from "./ui/SelectInput.svelte";

  import { getReviews } from "../utils/getReviews";
  import { postReview } from "../utils/postReview";

  export let teacher: User;
  export let accessToken: string;

  let reviews: { averageStarRating: number; reviews: string[] };
  let showReviewInput: boolean = false;
  let review: Review = { message: "", stars: 0 };
  let chatMessage: any = [];

  onMount(async () => {
    reviews = await getReviews({
      teacherGithubId: teacher.github_id,
      accessToken,
    });
  });

  const handleSendMessage = (event: any) => {
    event.preventDefault();
  };

  const handleReview = (event: any) => {
    review.message = event?.target?.value;
  };

  const handleStarRating = () => {
    const starRating = (<HTMLInputElement>(
      document.getElementById("star-rating")
    )).value;
    review.stars = <ReviewStarRating>Number(starRating);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    reviews = await postReview({
      teacherGithubId: teacher.github_id,
      accessToken,
      review,
    });
  };
</script>

<Avatar handleTeacher={null} user={teacher} />
<h2>bio</h2>
<p>{teacher.bio}</p>
{#if reviews}
  <StarRating rating={reviews.averageStarRating} />
  <Reviews reviews={reviews.reviews} />
{/if}
<form on:submit={handleSendMessage}>
  <textarea type="text" on:input={() => null} />
  <button type="submit">send</button>
</form>

<button on:click={() => (showReviewInput = true)}>leave a review</button>

{#if showReviewInput}
  <form on:submit={handleFormSubmit}>
    <label for="review-message">write review</label>
    <textarea
      on:input={handleReview}
      name="review-message"
      maxlength="200"
      type="text"
    />

    <!-- new component for buttons -->
    <!-- new component for text area -->

    <SelectInput
      id="star-rating"
      label="how may stars would you rate them?"
      handler={handleStarRating}
      values={["0", "1", "2", "3", "4", "5"]}
    />

    <button type="submit">submit review</button>
  </form>
{/if}
<button>send a screen recording</button>

<ul>
  {#each chatMessage as message}
    <li>
      {message}
    </li>
  {/each}
</ul>

<style>
</style>
