<script lang="ts">
  import Button from "../ui/Button.svelte";

  export let amount: number;
  export let owedTo: string;
  export let perHourRate: number;
  export let time: number;
</script>

<div class="container">
  <p>thanks for helping {owedTo}</p>
  <div class="content">
    <p>
      we've done the calculations for you, all you need to do is hit the send
      button and {owedTo} will have 3 working days to pay you.
    </p>

    <p>
      {owedTo} will be charged <input class="input" value={amount} /> feel free to
      edit the amount
    </p>

    <p>how did we work this out? your per hour rate is set to {perHourRate}</p>
    <p>your collaboration session lasted 16 minutes 32 seconds</p>
  </div>
  <code>(75 / 60) * 16.32 = 20.40</code>
  <p>total: £20.40</p>
  <p>edit sub total <input class="input" value={amount} /></p>
  <Button type="button" text="submit invoice" />
</div>

<style>
  .container {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
  .input {
    display: inline;
    width: 70px;
  }
</style>
