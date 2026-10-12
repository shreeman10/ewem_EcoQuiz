import fs from "fs";
import path from "path";
import { QuestionSchema } from "../lib/types";

function validateQuestionBank() {
  const filePath = path.join(__dirname, "../data/questions.json");
  if (!fs.existsSync(filePath)) {
    console.error("❌ questions.json does not exist at:", filePath);
    process.exit(1);
  }

  const rawData = fs.readFileSync(filePath, "utf-8");
  const questions = JSON.parse(rawData);

  console.log(`🔍 Validating ${questions.length} questions...`);

  if (!Array.isArray(questions)) {
    console.error("❌ questions.json must contain a JSON array!");
    process.exit(1);
  }

  if (questions.length !== 1000) {
    console.error(`❌ Expected exactly 1000 questions, but found ${questions.length}`);
    process.exit(1);
  }

  const idSet = new Set<string>();
  const questionTextSet = new Set<string>();

  let mythCount = 0;
  let mcqCount = 0;
  const categoryCounts: Record<string, number> = {
    general: 0,
    device_based: 0,
    environmental: 0,
  };
  const diffCounts: Record<string, number> = {
    easy: 0,
    medium: 0,
    hard: 0,
  };

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    // Schema validation using Zod
    const parseRes = QuestionSchema.safeParse(q);
    if (!parseRes.success) {
      console.error(`❌ Validation failed for question at index ${i} (ID: ${q?.id}):`);
      console.error(parseRes.error.format());
      process.exit(1);
    }

    // Unique ID check
    if (idSet.has(q.id)) {
      console.error(`❌ Duplicate question ID found: ${q.id} at index ${i}`);
      process.exit(1);
    }
    idSet.add(q.id);

    // Mode-specific checks
    if (q.mode === "myth_vs_facts") {
      mythCount++;
      if (q.options.length !== 2 || !q.options.includes("Myth") || !q.options.includes("Fact")) {
        console.error(`❌ Myth vs Fact question ${q.id} must have exactly ["Myth", "Fact"] options`);
        process.exit(1);
      }
    } else if (q.mode === "general") {
      mcqCount++;
      if (q.options.length !== 4) {
        console.error(`❌ MCQ question ${q.id} must have exactly 4 options`);
        process.exit(1);
      }
      // Ensure all 4 options are distinct
      const uniqueOpts = new Set(q.options);
      if (uniqueOpts.size !== 4) {
        console.error(`❌ MCQ question ${q.id} contains duplicate options:`, q.options);
        process.exit(1);
      }
    }

    // Correct answer membership
    if (!q.options.includes(q.correctAnswer)) {
      console.error(`❌ Question ${q.id} correct answer '${q.correctAnswer}' is not present in options!`);
      process.exit(1);
    }

    categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
    diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
  }

  console.log("✅ ALL 1,000 QUESTIONS PASSED VALIDATION!");
  console.log("-----------------------------------------");
  console.log(`Total questions: ${questions.length}`);
  console.log(`- Myth vs Facts: ${mythCount}`);
  console.log(`- General MCQs:  ${mcqCount}`);
  console.log("Category breakdown:");
  Object.entries(categoryCounts).forEach(([k, v]) => console.log(`  - ${k}: ${v}`));
  console.log("Difficulty breakdown:");
  Object.entries(diffCounts).forEach(([k, v]) => console.log(`  - ${k}: ${v}`));
  console.log("-----------------------------------------");
}

validateQuestionBank();
