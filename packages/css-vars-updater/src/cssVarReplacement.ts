import {
  globalNonColorCssVarNamesMap,
  oldCssVarNames,
  oldGlobalColorCssVarNames,
  oldGlobalNonColorCssVarNames,
  v6DirectionCssVars,
} from "shared-helpers";
import { Answers } from "./answers";
import { getDirectionMap } from "./directionStyles";

export type CssVarReplacement = {
  newVar?: string;
  varWasRemoved?: boolean;
  directionReplacementExists?: boolean;
} | null;

const getGlobalNonColorVarReplacement = (
  oldCssVar: string,
  shouldReplace: boolean
): CssVarReplacement => {
  const newCssVar =
    globalNonColorCssVarNamesMap[
      oldCssVar as keyof typeof globalNonColorCssVarNamesMap
    ];
  if (newCssVar === "SKIP") {
    return { varWasRemoved: true };
  }
  if (shouldReplace) {
    return { newVar: newCssVar };
  }
  return null;
};

const getGlobalColorVarReplacement = (
  oldCssVar: string,
  shouldReplace: boolean
): CssVarReplacement => {
  if (shouldReplace) {
    return {
      newVar: `--pf-t--temp--dev--tbd /* CODEMODS: original v5 color was:${oldCssVar} */`,
    };
  }
  return null;
};

const getDirectionVarReplacement = (
  oldCssVar: string,
  direction: Answers["direction"]
): CssVarReplacement => {
  const directionMap = getDirectionMap(direction);
  const directions = Object.keys(directionMap);

  if (directions.some((dir) => oldCssVar.endsWith(dir))) {
    const newCssVar = oldCssVar
      .replace(
        /(Left|Right|Top|Bottom)$/,
        (match) => directionMap[match as keyof typeof directionMap]
      )
      .replace("v5", "v6");

    if (v6DirectionCssVars.has(newCssVar)) {
      if (direction === "none") {
        return { directionReplacementExists: true };
      }
      return { newVar: newCssVar };
    }
  }
  return null;
};

export const getCssVarReplacement = (
  oldCssVar: string,
  answers: Answers
): CssVarReplacement => {
  if (oldGlobalNonColorCssVarNames.has(oldCssVar)) {
    return getGlobalNonColorVarReplacement(
      oldCssVar,
      answers.replaceGlobalVars
    );
  }

  if (oldGlobalColorCssVarNames.has(oldCssVar)) {
    return getGlobalColorVarReplacement(
      oldCssVar,
      answers.replaceGlobalColorsWithPink
    );
  }

  if (oldCssVarNames.has(oldCssVar)) {
    return (
      getDirectionVarReplacement(oldCssVar, answers.direction) ?? {
        varWasRemoved: true,
      }
    );
  }

  return { newVar: oldCssVar.replace("v5", "v6") };
};
