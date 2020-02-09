$(document).ready(function(){
    console.log("ready");

    // this is the array for the answer question keys.
    const questionsAnswers = [
        {question: 1, answer: 'a'},
        {question: 2, answer: 'c'},
        {question: 3, answer: 'b'}
    ];

    //initila variable for score
    let score = 0;

    //Answeron click function
    //the answer you clicked
    $(".answer").on("click", function(){
        //Get data values for question and answer of clicked property
        const currentQuestion = $(this).data('question');
        const answer = $(this).data('answer');

        //Loop through array to match current question and answer clicked
        for (i = 0; i < questionsAnswers.length; i++){
            //GEt single values of correct answer and question number
            const correctAnswer = questionsAnswers[i].answer;
            const question = questionsAnswers[i].question;
            // If current question and answer are correct change to green and increase score 
            if(currentQuestion === question && answer === correctAnswer) {
                $(this).css("color", "green");
                score++;
                //if current question and answer is incorrect turn click to red and show correct answer
            } else if (currentQuestion === question && answer !== correctAnswer) {
                $(this).css("color", "red");
                //get all siblings of clicked answer
                const siblings = $(this).siblings();
                // loop through all siblings
                for (j = 0; j < siblings.length; j++) {
                    //get data attribute for the siblings
                    const findAnswer = siblings[j].getAttribute('data-answer');
                    //match correct answer and turn text green.
                    if(findAnswer === correctAnswer){
                        siblings[j].style.color = "green";
                    }
                } 
            }
        }
        // This turns off clicking after after determining right or wrong. **StackOverflow FTW!
        $(`.answer-${currentQuestion}`).attr("disabled", "disabled").off("click");   


        console.log(score);

    })

    

    














    
})