(function(window, document, undefined) {

    // pane elements
    var rightPane = document.getElementById('right-pane');
    var leftPane = document.getElementById('left-pane');
    // TODO: add other panes here

    // button and input elements
    // TODO: add button/input element selectors here

    // script elements that correspond to Handlebars templates
    var questionFormTemplate = document.getElementById('question-form-template');
    var questionsTemplate = document.getElementById('questions-template');
    var expandedQuestionTemplate = document.getElementById('expanded-question-template');
    // TODO: add other script elements corresponding to templates here

// localStorage.clear();

    // compiled Handlebars templates
    var templates = {
        renderQuestionForm: Handlebars.compile(questionFormTemplate.innerHTML),
        renderQuestions: Handlebars.compile(questionsTemplate.innerHTML),
        renderExpandedQuestion: Handlebars.compile(expandedQuestionTemplate.innerHTML)
        // TODO: add other Handlebars render functions here
    };

function addQuestionListeners(){

        var questionButtons = document.querySelectorAll(".question-info");
        for(var i = 0; i < questionButtons.length; i++){
            questionButtons[i].addEventListener('click', function(){
                
                var selectedQuestion = getStoredQuestionByID(this.id);
                rightPane.innerHTML = templates.renderExpandedQuestion({
                    subject: selectedQuestion.subject,
                    question: selectedQuestion.question,
                    responses: selectedQuestion.responses
                });

                var responseForm = document.getElementById("response-form");
                responseForm.addEventListener("submit", function(e){
                    e.preventDefault();
                    var response = {
                        name: document.getElementById('name').value,
                        response: document.getElementById('response').value
                    }
                    selectedQuestion.responses.push(response);
                    modifyQuestion(selectedQuestion);
                    rightPane.innerHTML = templates.renderExpandedQuestion({
                        subject: selectedQuestion.subject,
                        question: selectedQuestion.question,
                        responses: selectedQuestion.responses
                    });
                    responseForm.reset();
                });

                var resolveButton = document.querySelector(".resolve");
                resolveButton.addEventListener('click', function(){
                    removeQuestion(selectedQuestion);
                    rightPane.innerHTML = templates.renderQuestionForm();
                    leftPane.innerHTML = templates.renderQuestions({questions: getStoredQuestions()});
                    //after hitting resolve dont have listeners on left side
                });

            });   
        }
}

    window.addEventListener('DOMContentLoaded', function(){
        addQuestionListeners();

        var questionForm = document.getElementById('question-form');
        questionForm.addEventListener("submit", function(e){
            e.preventDefault();
            var currQuestion = {
                subject: document.getElementById('subject').value,
                question: document.getElementById('question').value,
                id: Math.random(0, Number.MAX_VALUE),
                responses: [{
                    name: null,
                    response: null
                }]
            };
            var storedQuestions = getStoredQuestions();
            storedQuestions.push(currQuestion);

            var allQuestions = templates.renderQuestions({
                questions: storedQuestions
            });

            leftPane.innerHTML = allQuestions;
            storeQuestions(storedQuestions);
            questionForm.reset();
            addQuestionListeners();
        });




        // var questionButtons = document.querySelectorAll(".question-info");
        // for(var i = 0; i < questionButtons.length; i++){
        //     questionButtons[i].addEventListener('click', function(){
                
        //         var selectedQuestion = getStoredQuestionByID(this.id);
        //         rightPane.innerHTML = templates.renderExpandedQuestion({
        //             subject: selectedQuestion.subject,
        //             question: selectedQuestion.question,
        //             responses: selectedQuestion.responses
        //         });

        //         var responseForm = document.getElementById("response-form");
        //         responseForm.addEventListener("submit", function(e){
        //             e.preventDefault();
        //             var response = {
        //                 name: document.getElementById('name').value,
        //                 response: document.getElementById('response').value
        //             }
        //             selectedQuestion.responses.push(response);
        //             modifyQuestion(selectedQuestion);
        //             rightPane.innerHTML = templates.renderExpandedQuestion({
        //                 subject: selectedQuestion.subject,
        //                 question: selectedQuestion.question,
        //                 responses: selectedQuestion.responses
        //             });
        //             responseForm.reset();
        //         });

        //         var resolveButton = document.querySelector(".resolve");
        //         resolveButton.addEventListener('click', function(){
        //             removeQuestion(selectedQuestion);
        //             rightPane.innerHTML = templates.renderQuestionForm();
        //             leftPane.innerHTML = templates.renderQuestions({questions: getStoredQuestions()});
        //         });

        //     });   
        // }


        var newQuestionButton = document.querySelector("#interactors .btn");
        newQuestionButton.addEventListener('click', function(){
            rightPane.innerHTML = templates.renderQuestionForm();
        });

    });

    /* Returns the questions stored in localStorage. */
    function getStoredQuestions() {
        if (!localStorage.questions) {
            // default to empty array
            localStorage.questions = JSON.stringify([]);
        }

        return JSON.parse(localStorage.questions);
    }

    function getStoredQuestionByID(id){
        if (!localStorage.questions) {
            return null;
        }
        arr = JSON.parse(localStorage.questions);
        for(var i = 0; i < arr.length; i++){
            if(arr[i].id == id)
                return arr[i];
        }

        return null;
    }

    /* Store the given questions array in localStorage.
     *
     * Arguments:
     * questions -- the questions array to store in localStorage
     */
    function storeQuestions(questions) {
        localStorage.questions = JSON.stringify(questions);
    }

    function modifyQuestion(question) {
        var allQuestions = getStoredQuestions();
        for(var i = 0; i < arr.length; i++){
            if(allQuestions[i].id == question.id){
                allQuestions[i] = question;
                break;
            }
        }
        localStorage.questions = JSON.stringify(allQuestions);
    }

    function removeQuestion(question){
        var allQuestions = getStoredQuestions();
        for(var i = 0; i < arr.length; i++){
            if(allQuestions[i].id == question.id){
                allQuestions.splice(i, 1);
                break;
            }
        }
        localStorage.questions = JSON.stringify(allQuestions);
    }

    // TODO: tasks 1-5 and one extension

    // display question form initially
    rightPane.innerHTML = templates.renderQuestionForm();
    leftPane.innerHTML = templates.renderQuestions({questions: getStoredQuestions()});

    // TODO: display question list initially (if there are existing questions)

})(this, this.document);
