import type { Review } from "../../types";

export const postReview = async ({
  teacherGithubId,
  accessToken,
  review,
}: {
  teacherGithubId: string;
  accessToken: string;
  review: Review;
}) =>
  await (
    await fetch(`${apiBaseUrl}/postReview?teacher_id=${teacherGithubId}`, {
      method: "POST",
      body: JSON.stringify(review),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken} `,
      },
    })
  ).json();
