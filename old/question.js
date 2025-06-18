

export class Question{

    constructor(tcodeName,chapterId,exercise,questionNo,questionType, questionPart = "") {
        this.tcodeName = tcodeName;
        this.chapterId = chapterId;
        this.exercise = exercise;
        this.questionNo = questionNo;
        this.questionType = questionType;
        this.questionPart = questionPart;
        
        this.stringName = this.tcodeName +" "+ this.chapterId +" "+ this.exercise +" "+ this.questionNo +" "+ this.questionPart;  
        this.questionName = null;  
      }
      tcodeUrl() {
        const safeExercise = this.exercise.replace(/\./g, "_"); // file-safe
        const suffix = this.questionPart ? `${this.questionNo}${this.questionPart}` : `${this.questionNo}`;
        return `filename=${this.tcodeName}-chapter-${this.chapterId}-ex${safeExercise}-q${suffix}`;
      }
      
      
      
}