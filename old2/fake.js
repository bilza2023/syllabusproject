
// scripts/fakeSyllabus.js
import { Tcode } from "../index.js";

const tcode = new Tcode("fbise9physics");

// Chapter 1: Kinematics
const ch1 = tcode.addChapter({ name: "Kinematics" });
const ex1 = ch1.addExercise({ name: "Introduction" });

ex1.addQuestion("md", "Define velocity", 1);
ex1.addQuestion("md", "Give examples of uniform motion", 2, "a", { tags: ["motion", "examples"] });

// Chapter 2: Dynamics
const ch2 = tcode.addChapter({ name: "Dynamics" });
const ex2 = ch2.addExercise({ name: "Newton's Laws" });

ex2.addQuestion("slide", "State Newton's Second Law", 1);
ex2.addQuestion("md", "Derive F = ma", 2, "", { tags: ["derivation", "laws"] });

// Output full nested view
console.log(JSON.stringify(tcode.getNestedView(), null, 2));
