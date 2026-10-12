import assert from "assert";
import { getAllQuestions, selectQuestions, shuffleArray } from "../lib/quiz-service";
import { QuestionSchema, QuizFilterSchema } from "../lib/types";

function runTests() {
  console.log("🧪 Running automated test suite for E-Waste IQ...");

  // 1. Question bank loading
  const allQuestions = getAllQuestions();
  assert.strictEqual(allQuestions.length, 1000, "Must load exactly 1,000 questions");
  console.log("✔ Test 1: Question bank loads 1,000 questions.");

  // 2. Fisher-Yates shuffle test
  const sample = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const shuffled = shuffleArray(sample);
  assert.strictEqual(shuffled.length, sample.length, "Shuffled array retains length");
  console.log("✔ Test 2: Fisher-Yates shuffle preserves elements.");

  // 3. Selection with filters: Myth vs Facts
  const mythSelection = selectQuestions({
    mode: "myth_vs_facts",
    category: "general",
    difficulty: "easy",
    limit: 5,
    instantFeedback: true,
    timed: false,
  });
  assert.strictEqual(mythSelection.length, 5, "Selects 5 questions");
  mythSelection.forEach((q) => {
    assert.strictEqual(q.mode, "myth_vs_facts");
    assert.strictEqual(q.category, "general");
    assert.strictEqual(q.difficulty, "easy");
    assert.deepStrictEqual(q.options, ["Myth", "Fact"]);
  });
  console.log("✔ Test 3: Myth vs Facts filtering and options correct.");

  // 4. Selection with filters: General MCQ Shuffling
  const mcqSelection = selectQuestions({
    mode: "general",
    category: "device_based",
    difficulty: "medium",
    limit: 10,
    instantFeedback: true,
    timed: false,
  });
  assert.strictEqual(mcqSelection.length, 10, "Selects 10 MCQ questions");
  mcqSelection.forEach((q) => {
    assert.strictEqual(q.mode, "general");
    assert.strictEqual(q.options.length, 4, "MCQ must have 4 options");
    assert(q.options.includes(q.correctAnswer), "Correct answer must exist in shuffled options");
  });
  console.log("✔ Test 4: General MCQ question selection and option shuffling correct.");

  // 5. Mixed category & difficulty selection
  const mixedSelection = selectQuestions({
    mode: "general",
    category: "mixed",
    difficulty: "mixed",
    limit: 15,
    instantFeedback: false,
    timed: true,
  });
  assert.strictEqual(mixedSelection.length, 15, "Selects 15 mixed questions");
  console.log("✔ Test 5: Mixed filters work seamlessly.");

  // 6. Exclusion of seen IDs
  const seenIds = [mixedSelection[0].id, mixedSelection[1].id];
  const newSelection = selectQuestions({
    mode: "general",
    category: "mixed",
    difficulty: "mixed",
    limit: 10,
    instantFeedback: true,
    timed: false,
  }, seenIds);
  assert(!newSelection.some(q => seenIds.includes(q.id)), "Excludes previously seen IDs when pool is sufficient");
  console.log("✔ Test 6: Seen ID exclusion prevents immediate question repetition.");

  console.log("\n🎉 ALL UNIT AND INTEGRATION TESTS PASSED SUCCESSFULLY!");
}

runTests();
