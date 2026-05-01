export const BUTTON_TYPE = {
  EDIT: "EDIT",
  DELETE: "DELETE",
  SAVE: "SAVE",
} as const;

export type ButtonType = (typeof BUTTON_TYPE)[keyof typeof BUTTON_TYPE];