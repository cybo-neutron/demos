import { eq } from "drizzle-orm";
import { db } from "../lib/database.js";
import {
  StackOverflowAnswerInsertType,
  StackOverflowAnswerTable,
  StackOverflowAnswerUpdateType,
} from "../schema/stackoverflow_answers.schema.js";

export async function getStackOverflowAnswerDetails({
  id,
}: {
  id: string | number;
}) {
  const [answer] = await db
    .select()
    .from(StackOverflowAnswerTable)
    .where(eq(StackOverflowAnswerTable.id, Number(id)));

  return answer;
}

export async function getAllStackOverflowAnswers() {
  const answers = await db.select().from(StackOverflowAnswerTable);

  return answers;
}

export async function updateStackOverflowAnswer({
  id,
  data,
}: {
  id: string | number;
  data: StackOverflowAnswerUpdateType;
}) {
  const [answer] = await db
    .update(StackOverflowAnswerTable)
    .set(data)
    .where(eq(StackOverflowAnswerTable.id, Number(id)))
    .returning();

  return answer;
}

export async function createStackOverflowAnswer({
  data,
}: {
  data: StackOverflowAnswerInsertType;
}) {
  const [answer] = await db
    .insert(StackOverflowAnswerTable)
    .values(data)
    .returning();

  return answer;
}

export async function bulkInsertStackOverflowAnswers({
  data,
}: {
  data: StackOverflowAnswerInsertType[];
}) {
  const answers = await db
    .insert(StackOverflowAnswerTable)
    .values(data)
    .returning();

  return answers;
}

export async function deleteStackOverflowAnswer({ id }: { id: string | number }) {
  const [answer] = await db
    .delete(StackOverflowAnswerTable)
    .where(eq(StackOverflowAnswerTable.id, Number(id)))
    .returning();

  return answer;
}
