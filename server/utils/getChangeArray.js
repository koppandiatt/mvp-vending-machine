/**
 * Get the change in an Array of accepted coins.
 * @param change - The string containing the mongoose model name.
 * @param coins - The id of the object to update.
 *
 * @returns Array of dictionaries [{coin: count}]
 */

export function getChangeArray(change = 0, coins = []) {
  if (typeof change !== "number") throw `"change" is not a number`;
  if (!Array.isArray(coins)) throw `"coins" is not an Array`;
  if (!coins.every((item) => typeof item === "number"))
    throw `"coins" contains items which are not a number`;

  coins.sort((a, b) => b - a);

  return coins
    .map((coin) => {
      let amountOfCoinInChange = Math.floor(change / coin);
      if (!amountOfCoinInChange) return null;
      change -= amountOfCoinInChange * coin;
      let pair = {};
      pair[coin] = amountOfCoinInChange;
      return pair;
    })
    .filter((change) => change);
}
