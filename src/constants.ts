export const PathNames = {
  HOME: "/",
  FEED: "/feed",
  SOCIAL: "/social",
  TASK: "/t/",
  CREATE: "/create",
};

enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  BLURRED = "BLURRED",
}

export const PageVisibility: {
  [key in keyof typeof PathNames]: keyof typeof Visibility;
} = {
  HOME: "PUBLIC",
  FEED: "BLURRED",
  CREATE: "PRIVATE",
  SOCIAL: "PRIVATE",
  TASK: "PRIVATE",
};
