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

    //Answered Questions
    let answeredQuestions = 0;


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
        //make sure keep record of answered questions.
        answeredQuestions++;
    });

//On click function for btnNext
    $(".btnNext").on("click", function(){
        //get the button number
        const btnNum = $(this).data("btn");
        //get the next question area number for scroll
        const nextQuestion = btnNum + 1;
        //scroll to next section 1 sec
        $("html, body").animate({
            scrollTop: $(`.qc${nextQuestion}`).offset().top 
        }, 1000);
    })

    //Get final results.
    $(".btnFinal").on("click", function(){
        //check for user to have answered all questions
        if(answeredQuestions === questionsAnswers.length){
            //print the score
            $(".score").text(`${score}/${questionsAnswers.length}`);
            //unhide the results section
            $(".resultsContainer").css("display", "flex");
            //scroll to the results section
            $("html, body").animate({
                scrollTop: $(".resultsContainer").offset().top
            }, 1000);
            //setTimeout for all question containers to hide once scroll has been completed
            setTimeout (function(){
                $(".questionContainer").hide();
            }, 1000);
            //alert user if they havent completed all questions
        } else {
            alert("finish the quiz!");
        }

    })
})