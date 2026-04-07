export type CursorType = {
  //   column: string;
  op: "eq" | "gt" | "gte" | "lt" | "lte";
  value: string;
};

export function isValidCursor<K extends string>(
  sortBy: [K, any][],
  cursor: Partial<Record<K, CursorType>> | Record<string, CursorType>,
): cursor is Record<K, CursorType> {
  const cursorKeys = Object.keys(cursor);
  if (sortBy.length !== cursorKeys.length) return false;

  for (const [key] of sortBy) {
    if (!cursor[key as K]) return false;
  }

  return true;
}
