import { bulkInsertStackOverflowTags } from "@video-tube/database/repos";
import csvParser from "csv-parser";
import { createReadStream, existsSync } from "fs";
import path from "path";
import { StackOverflowTagInsertType } from "@video-tube/database/schema";

async function populateStackOverflowTags() {
  const filePath = path.join(
    "/Users/neer",
    "Downloads",
    "archive",
    "stackoverflow_tags.csv",
  );

  const fileExists = existsSync(filePath);

  if (!fileExists) {
    console.log("File not found");
    return;
  }

  console.log("File exists");

  const stream = createReadStream(filePath).pipe(csvParser());

  const batch: StackOverflowTagInsertType[] = [];

  stream
    .on("data", async (row) => {
      const tag: StackOverflowTagInsertType = {
        tag: row.Tag,
        stackOverflowId: row.Id,
      };

      batch.push(tag);
      //   console.log(tag);

      if (batch.length === 100) {
        stream.pause();
        await bulkInsertStackOverflowTags({ data: batch });
        batch.length = 0;
        stream.resume();
      }
    })
    .on("end", () => {
      console.log("Done");
    })
    .on("error", (error) => {
      console.log(error);
    });
}

populateStackOverflowTags();
