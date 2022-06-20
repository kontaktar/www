import { Experiences } from "types";

type ExperienceSearchResult = { userName: string } & Experiences;

export const mapSearchResult = (dataFromPrisma): ExperienceSearchResult => {
  return dataFromPrisma.map((data) => {
    return {
      experienceId: data.id,
      years: data.years,
      months: data.months,
      order: data.order,
      title: data.title,
      description: data.description,
      editedAt: data.editedAt,
      published: data.published,
      userId: data.userId,
      userName: data.User.userName,
      firstName: data.User?.firstName,
      lastName: data.User?.lastName
    };
  });
};
