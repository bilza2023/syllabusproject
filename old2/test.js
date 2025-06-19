
// index.js

// import Tcode from "./Tcode.js";
import { questionTypes } from "./src/enums.js";
import Tcode  from "./src/Tcode.js";

// export {
//   Tcode,
//   questionTypes
// };

const tcode = new Tcode("fbise9physics");

// Add Chapter
const ch1 = tcode.addChapter({ name: "Kinematics" });

// Add Exercise to Chapter
const ex1 = ch1.addExercise({ name: "Introduction" });

// Add Questions to Exercise
ex1.addQuestion({ name: "Define velocity", type: "md", questionNo: 1 });
ex1.addQuestion({ name: "Give examples of uniform motion", type: "md", questionNo: 2, questionPart: "a" });

// Add Another Chapter and Exercise
const ch2 = tcode.addChapter({ name: "Dynamics" });
const ex2 = ch2.addExercise({ name: "Newton's Laws" });

ex2.addQuestion({ name: "State Newton's Second Law", type: "slide", questionNo: 1 });

// Output Full Nested Structure
console.log(JSON.stringify(tcode.getNestedView(), null, 2));
