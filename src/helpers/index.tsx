import _ from "lodash";
import { tokens } from "../constants/tokens";

export function hasDuplicates(arr: string | any[]) {
  return _.uniq(arr).length !== arr.length;
}

export function tokenSet(isBoard?: boolean) {
  let tokenSet = tokens.map((token) => {
    return { gem: token.gem, qty: isBoard ? determineQty(token.gem) : 0 };
  });
  return tokenSet;
}

function determineQty(gem: string) {
  if (gem === "GOLD") {
    return 4;
  } else {
    return 6;
  }
}

export function countOccurrences(arr: any[], val: any) {
  return arr.reduce((a, v) => (v === val ? a + 1 : a), 0);
}
