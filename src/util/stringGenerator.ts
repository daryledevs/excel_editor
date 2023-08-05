export const createStringIdGenerator = (chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ") => {
  let nextId = ["A"];

  const incrementId = () => {
    for (let i = nextId.length - 1; i >= 0; i--) {
      const charIdx = chars.indexOf(nextId[i]);
      if (charIdx === chars.length - 1) {
        nextId[i] = chars[0];
      } else {
        nextId[i] = chars[charIdx + 1];
        return;
      }
    }
    nextId.unshift(chars[0]);
  };

  const next = () => {
    const r = nextId.join("");
    incrementId();
    return r;
  };

  return {
    next,
    [Symbol.iterator]: function* () {
      while (true) {
        yield next();
      }
    },
  };
};
