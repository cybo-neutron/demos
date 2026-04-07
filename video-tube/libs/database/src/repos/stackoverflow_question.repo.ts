import { eq } from "drizzle-orm";
import { db } from "../lib/database.js";
import {
  StackOverflowQuestionInsertType,
  StackoverflowQuestionsTable,
  StackOverflowQuestionUpdateType,
} from "../schema/stackoverflow_questions.schema.js";

export async function getStackOverflowQuestionDetails({
  id,
}: {
  id: string | number;
}) {
  const [question] = await db
    .select()
    .from(StackoverflowQuestionsTable)
    .where(eq(StackoverflowQuestionsTable.id, Number(id)));

  return question;
}

export async function getAllStackOverflowQuestions() {
  const questions = await db.select().from(StackoverflowQuestionsTable);

  return questions;
}

export async function updateStackOverflowQuestion({
  id,
  data,
}: {
  id: string | number;
  data: StackOverflowQuestionUpdateType;
}) {
  const [question] = await db
    .update(StackoverflowQuestionsTable)
    .set(data)
    .where(eq(StackoverflowQuestionsTable.id, Number(id)))
    .returning();

  return question;
}

export async function createStackOverflowQuestion({
  data,
}: {
  data: StackOverflowQuestionInsertType;
}) {
  const [question] = await db
    .insert(StackoverflowQuestionsTable)
    .values(data)
    .returning();

  return question;
}

export async function bulkInsertStackOverflowQuestions({
  data,
}: {
  data: StackOverflowQuestionInsertType[];
}) {
  const questions = await db
    .insert(StackoverflowQuestionsTable)
    .values(data)
    .returning();

  return questions;
}

export async function deleteStackOverflowQuestion({
  id,
}: {
  id: string | number;
}) {
  const [question] = await db
    .delete(StackoverflowQuestionsTable)
    .where(eq(StackoverflowQuestionsTable.id, Number(id)))
    .returning();

  return question;
}
