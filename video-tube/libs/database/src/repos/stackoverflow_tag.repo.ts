import { eq } from "drizzle-orm";
import { db } from "../lib/database.js";
import {
  StackOverflowTagInsertType,
  StackOverflowTagTable,
  StackOverflowTagUpdateType,
} from "../schema/stackoverflow_tags.schema.js";

export async function getStackOverflowTagDetails({ id }: { id: string | number }) {
  const [tag] = await db
    .select()
    .from(StackOverflowTagTable)
    .where(eq(StackOverflowTagTable.id, Number(id)));

  return tag;
}

export async function getAllStackOverflowTags() {
  const tags = await db.select().from(StackOverflowTagTable);

  return tags;
}

export async function updateStackOverflowTag({
  id,
  data,
}: {
  id: string | number;
  data: StackOverflowTagUpdateType;
}) {
  const [tag] = await db
    .update(StackOverflowTagTable)
    .set(data)
    .where(eq(StackOverflowTagTable.id, Number(id)))
    .returning();

  return tag;
}

export async function createStackOverflowTag({
  data,
}: {
  data: StackOverflowTagInsertType;
}) {
  const [tag] = await db.insert(StackOverflowTagTable).values(data).returning();

  return tag;
}

export async function bulkInsertStackOverflowTags({
  data,
}: {
  data: StackOverflowTagInsertType[];
}) {
  const tags = await db.insert(StackOverflowTagTable).values(data).returning();

  return tags;
}

export async function deleteStackOverflowTag({ id }: { id: string | number }) {
  const [tag] = await db
    .delete(StackOverflowTagTable)
    .where(eq(StackOverflowTagTable.id, Number(id)))
    .returning();

  return tag;
}
