$(document).ready(function(){
    console.log("ready");

    // this is the array for the answer question keys.
    const questionsAnswers = [
        {question: 1, answer: 'a'},
        {question: 2, answer: 'c'},
        {question: 3, answer: 'b'},
        {question: 4, answer: 'b'},
        {question: 5, answer: 'd'},
        {question: 6, answer: 'a'},
        {question: 7, answer: 'd'},
        {question: 8, answer: 'b'},
        {question: 9, answer: 'a'},
        {question: 10, answer: 'c'}
    ];

    //initila variable for score
    let score = 0;

    //Answered Questions
    let answeredQuestions = 0;


    //Answer on click function
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
                $(this).css("background-color", "#219419");
                $(this).css("color", "#fff");
                score++;
                //if current question and answer is incorrect turn click to red and show correct answer
            } else if (currentQuestion === question && answer !== correctAnswer) {
                $(this).css("background-color", "#ba0707");
                $(this).css("color", "#fff");
                const wrongX = " \u2718";
                $(this).append(wrongX);
                //get all siblings of clicked answer
                const siblings = $(this).siblings();
                // loop through all siblings
                for (j = 0; j < siblings.length; j++) {
                    //get data attribute for the siblings
                    const findAnswer = siblings[j].getAttribute('data-answer');
                    //match correct answer and turn text green.
                    if(findAnswer === correctAnswer){
                        siblings[j].style.backgroundColor = "#219419";
                        siblings[j].style.color = "#fff";
                        const checkMark = " \u2714";
                        siblings[j].textContent += checkMark;

                    }
                } 
            }
        }
        // This turns off clicking after after determining right or wrong. **StackOverflow FTW!
        $(`.answer${currentQuestion}`).attr("disabled", "disabled").off("click");   
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
            //Print score message
            if( score <= 5){
                //Bleh
                $(".scoreText").text("You're out of the race!");
            } else if ( score <= 9 && score > 5){
                //Bleh
                $(".scoreText").text("Wow! You know your stuff!");
            } else if (score === 10){
                //Blehhhh
                $(".scoreText").text("You're a champ!");
            }
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
            alert("You have unanswered questions!");
        }

    })
})