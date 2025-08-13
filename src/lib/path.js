export const withBase = (p) =>
  `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${p}`;
