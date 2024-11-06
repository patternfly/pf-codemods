import { Answers } from "./answers";

export const getDirectionMap = (direction: Answers["directionalStyles"]) => {
  const directionMapLTR = {
    Left: "InlineStart",
    Right: "InlineEnd",
    Top: "BlockStart",
    Bottom: "BlockEnd",
  };
  const directionMapRTL = {
    Left: "InlineEnd",
    Right: "InlineStart",
    Top: "BlockStart",
    Bottom: "BlockEnd",
  };
  const directionMapTTB = {
    Left: "BlockStart",
    Right: "BlockEnd",
    Top: "InlineStart",
    Bottom: "InlineEnd",
  };

  switch (direction) {
    case "ltr":
      return directionMapLTR;
    case "rtl":
      return directionMapRTL;
    case "ttb":
      return directionMapTTB;
  }

  return directionMapLTR;
};
