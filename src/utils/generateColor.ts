import { tagColors } from "../global/globalVar";

export const generateColor = (key: number) => {
  return "#" + tagColors[key % tagColors.length];
};
