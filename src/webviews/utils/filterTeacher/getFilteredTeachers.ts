import type { TeacherFilters } from "../../../types";

export const getFilteredTeachers = async ({
  teacherFilters,
  accessToken,
}: {
  teacherFilters: TeacherFilters;
  accessToken: string;
}) =>
  (
    await fetch(`${apiBaseUrl}/getTeachers`, {
      method: "POST",
      body: JSON.stringify(teacherFilters),
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${accessToken} `,
      },
    })
  ).json();
