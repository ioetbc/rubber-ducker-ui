export const getReviews = async ({
  teacherGithubId,
  accessToken,
}: {
  teacherGithubId: string;
  accessToken: string;
}) =>
  await (
    await fetch(`${apiBaseUrl}/getReviews?github_id=${teacherGithubId}`, {
      headers: {
        authorization: `Bearer ${accessToken} `,
      },
    })
  ).json();
