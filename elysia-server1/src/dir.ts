export const waitSome = async (some: number) =>
  await new Promise((r) => setTimeout(r, some));
