export const generateProfilePic = (name: string) => {
  return new URL(
    "https://api.dicebear.com/8.x/initials/svg?fontSize=40&seed=" + name
  ).toString();
};
