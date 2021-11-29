function getChangeArray(change = 0, coins = []) {
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
      return { coin, amount: amountOfCoinInChange };
    })
    .filter((change) => change);
}

try {
  console.log(getChangeArray(85, [5, 100, 20, 50]));
} catch (error) {
  console.log(error);
}
