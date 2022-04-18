<script lang="ts">
  import type { User } from "../../types";
  import Button from "./ui/Button.svelte";
  import yn from "yn";
  import Selectinput from "./ui/SelectInput.svelte";

  export let user: User;
  export let accessToken: string;

  let technolgiesSelected: string[] = [];
  let payload: User = {
    avatar_url: user?.avatar_url,
    github_id: user?.github_id,
    username: user?.username,
    bio: user?.bio,
    phone_number: user?.phone_number,
    email_marketing_consent: user?.email_marketing_consent,
    text_message_consent: user?.text_message_consent,
    teacher: user?.teacher,
    stripe_client_id: user?.stripe_client_id,
    crypto_wallet_address: "wodssssjwdowdowdk",
    has_completed_onboarding: "true",
    per_hour_rate: user?.per_hour_rate,
    html: user?.html,
    javascript: user?.javascript,
    node: user?.node,
    postgres: user?.postgres,
    python: user?.python,
    react: user?.react,
    css: user?.css,
    svelte: user?.svelte,
    tensorflow: user?.tensorflow,
    dynamo_db: user?.dynamo_db,
  };

  const handleUsername = (event: any) => {
    payload.username = event?.target?.value;
  };

  const handleBio = (event: any) => {
    payload.bio = event?.target?.value;
  };

  const handlePhoneNumber = (event: any) => {
    payload.phone_number = event?.target?.value;
  };

  const handleEmailMarketing = (event: any) => {
    payload.email_marketing_consent = event?.target?.value;
  };

  const handleTextConsent = (event: any) => {
    payload.text_message_consent = event?.target?.value;
  };

  const handleTeacherConsent = (event: any) => {
    payload.teacher = event?.target?.value;
  };

  const handlePerHourRate = () => {
    const perHourRateSelected: any = document.getElementById("per-hour-rate");
    payload.per_hour_rate = perHourRateSelected.value;
  };

  const handleTechnology = () => {
    const technologySelected: any = document.getElementById("technologies");
    technolgiesSelected.push(technologySelected.value);
    technolgiesSelected = technolgiesSelected;
    console.log("technolgiesSelected", technolgiesSelected);
  };

  const handleTechnologyProficiency = (technology: string) => {
    const technologyProficiencySelected: any = document.getElementById(
      "technology-proficiency"
    );

    // @ts-ignore
    payload[technology] = Number(technologyProficiencySelected.value);
    console.log("payload", payload);
  };

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    console.log("puting om");
    const response = await fetch(`${apiBaseUrl}/ammendProfile`, {
      method: "PUT",
      body: JSON.stringify(payload),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken} `,
      },
    });

    const resp = await response.json();
    console.log("resp", resp);
  };
</script>

<form on:submit={handleFormSubmit}>
  <div class="input-wrapper">
    <label for="username">change username</label>
    <input
      on:input={handleUsername}
      name="username"
      id="bio"
      value={user?.username}
    />
  </div>

  <div class="input-wrapper">
    <label for="bio">add bio</label>
    <textarea on:input={handleBio} name="bio" maxlength="200" type="text" />
  </div>

  <div class="input-wrapper">
    <p>occasional marketing emails?</p>
    <div>
      <label for="email_marketing">true</label>
      <input
        on:input={handleEmailMarketing}
        type="radio"
        name="email_marketing"
        value="true"
        checked={!!user?.email_marketing_consent}
      />
      <label for="email_marketing">false</label>
      <input
        on:input={handleEmailMarketing}
        type="radio"
        name="email_marketing"
        value="false"
        checked={!!user?.email_marketing_consent}
      />
    </div>
  </div>

  <div class="input-wrapper">
    <p>would you like a text before your appointment?</p>
    <div>
      <label for="text_message_consent">true</label>
      <input
        on:input={handleTextConsent}
        type="radio"
        name="text_message_consent"
        value="true"
        checked={!!user?.text_message_consent}
      />
      <label for="text_message_consent">false</label>
      <input
        on:input={handleTextConsent}
        type="radio"
        name="text_message_consent"
        value="false"
        checked={!!user?.text_message_consent}
      />
    </div>
  </div>

  {#if yn(payload.text_message_consent)}
    <div class="input-wrapper">
      <label for="phone_number">add phone number</label>
      <p>so that we can text you before yourds appintments</p>
      <input on:input={handlePhoneNumber} name="phone_number" type="number" />
    </div>
  {/if}

  <div class="input-wrapper">
    <p>are you signing up to be a teacher</p>
    <p>allow people to contact you to get help with their projects</p>

    <div>
      <label for="teacher">true</label>
      <input
        on:input={handleTeacherConsent}
        type="radio"
        name="teacher"
        value="true"
        checked={!!user?.teacher}
      />
      <label for="teacher">false</label>
      <input
        on:input={handleTeacherConsent}
        type="radio"
        name="teacher"
        value="false"
        checked={!!user?.teacher}
      />
    </div>
  </div>

  {#if yn(payload.teacher)}
    <div class="input-wrapper">
      <Selectinput
        label="what is your per hour rate?"
        id="per-hour-rate"
        handler={handleTechnology}
        values={[
          1, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150,
          160, 170, 180, 190, 200,
        ]}
      />
    </div>

    <div class="input-wrapper">
      <Selectinput
        label="what technologies do you know? (the more niche the better)"
        id="technologies"
        handler={handleTechnology}
        values={[
          "javascript",
          "html",
          "css",
          "node",
          "python",
          "react",
          "svelte",
          "postgres",
          "dynamo_db",
          "tensorflow",
        ]}
      />
    </div>
    <ul>
      {#each technolgiesSelected as technology}
        <div class="flex">
          <p>for each technology rate how proficient you are</p>
          <li>{technology}</li>
          <Selectinput
            id="technology-proficiency"
            handler={() => handleTechnologyProficiency(technology)}
            values={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          />
        </div>
      {/each}
    </ul>
  {/if}
  <Button type="submit" text="submit changes" />
</form>

<style>
  .input-wrapper {
    margin-bottom: 24px;
  }
</style>
