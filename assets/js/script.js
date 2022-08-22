//***********************************************ADDED CODE**************************************************//

//ALL variables for existing HTML elements//

var ol = document.querySelector("ol");
var li = document.querySelector("li");
var h1 = document.querySelector("h1");
var p = document.querySelector("p");
var startBtn = document.querySelector("#start");
var hr = document.querySelector("hr");
var h2 = document.querySelector("h2");
var startMessage = document.querySelector(".startMessage");
var comeback = document.querySelector("#comeBack");
var scoreBtn = document.querySelector(".scores");
var form = document.querySelector(".form");
var submitBtn = document.querySelector(".submit");

//var input label//

var input = document.querySelector(".done");

//var boxname labels//

var item = document.getElementsByClassName("listItem");
var questionsIndex = 0;
var answersIndex = 0;
var userPoints = 0;
var id;
var scores = [];
var index;
var currentPlayerIndex = [];

//timer values for START & STOP//

var clock = 55;

//read scores from local storage and scores arrays//

createArray();

//arrays for the question & answer banks//

var questions = [
    ["What is JavaScript?"], ["Which of the following is correct about Javascript?"], 
    ["Among the given statements, which statement defines closures in JavaScript?"], 
    ["Arrays in JavaScript are defined by which of the following statements?"],
    ["Will this [var js = (function(x) {return x*x;}(10)] JavaScript code work?"], 
    ["Which of the following is NOT javascript data types?"], ["Where is Client-side JavaScript code is embedded within HTML documents?"], 
    ["Which of the following object is the main entry point to all client-side JavaScript features and APIs?"], 
    ["Which of the following can be used to call a JavaScript Code Snippet?"],
    ["Which of the following scoping type does JavaScript use?"],
    ["What is the basic difference between JavaScript and Java?"], ["Why JavaScript Engine is needed?"],
    ["Which of the following methods/operation does javascript use instead of == and !=?"], 
    ["What will be the result or type of error if 'p' in this JavaScript code snippet [Jconsole.log(p)] is NOT defined?"], 
    ["What is the prototype represented in the following JavaScript code snippet [function javascript() {}]?"], 
    ["Why are event handlers needed in JavaScript?"], ["Which of the following is NOT a framework?"],
    ["Which of the following properties are triggered in response to JavaScript errors?"]
];

var answers = [
    [
        "JavaScript is a scripting language used to make the website interactive", 
        "JavaScript is an assembly language used to make the website interactive", 
        "JavaScript is a compiled language used to make the website interactive",
        "None of the mentioned"
    ],
    [
        "JavaScript is an Object-Based language", 
        "JavaScript is Assembly-language", 
        "JavaScript is an Object-Oriented language", 
        "JavaScript is a High-level language"
    ],
    [
        "JavaScript is a function that is enclosed with references to its inner function scope", 
        "JavaScript is a function that is enclosed with references to its lexical environment", 
        "JavaScript is a function that is enclosed with the object to its inner function scope", 
        "None of the mentioned"
    ],
    [
        "It is an ordered list of values", 
        "It is an ordered list of objects", 
        "It is an ordered list of string", 
        "It is an ordered list of functions"
    ],
    [
        "Exception will be thrown", 
        "Memory leak", 
        "Error", 
        "Yes, perfectly"
    ],
    [
        "Null type", 
        "Undefined type", 
        "Number type", 
        "All of the mentioned"
    ],
    [
        "A URL that uses the special javascript:code", 
        "A URL that uses the special javascript:protocol", 
        "A URL that uses the special javascript:encoding", 
        "A URL that uses the special javascript:stack"
    ],
    [
        "Position", 
        "Window", 
        "Standard", 
        "Location"
    ],
    [
        "Function/Method", 
        "Preprocessor", 
        "Triggering Event", 
        "RMI"
    ],
    [
        "Sequential", 
        "Segmental", 
        "Lexical", 
        "Literal"
        ],
        [
            "Functions are considered as fields", 
            "Functions are values, and there is no hard distinction between methods and fields", 
            "Variables are specific", 
            "There is no difference"
        ],
        [
            "Both Compiling & Interpreting the JavaScript", 
            "Parsing the javascript", 
            "Interpreting the JavaScript", 
            "Compiling the JavaScript"
        ],
        [
            "JavaScript uses equalto()", 
            "JavaScript uses equals() and notequals() instead", 
            "JavaScript uses bitwise checking", 
            "JavaScript uses === and !== instead"
        ],
        [
            "Not valid", 
            "Prototype of a function", 
            "Function javascript", 
            "A custom constructor"
        ],
        [
            "Value not found Error", 
            "Reference Error", 
            "Null", 
            "Zero"
        ],
        [
            "Allows JavaScript code to alter the behaviour of windows", 
            "Adds innerHTML page to the code", 
            "Change the server location", 
            "Performs handling of exceptions and occurrences" 
        ],
        [
            "JavaScript .NET", 
            "JavaScript", 
            "Cocoa JS", 
            "jQuery" 
        ],
        [
            "onclick", 
            "onerror", 
            "onmessage", 
            "onexception" 
        ],
    ];

var correctAnswersId = [1, 1, 2, 1, 4, 4, 2, 2, 1, 3, 2, 3, 4, 2, 4, 1, 2, 2]


//ALL FUNCTIONS//

//read local storage to string element & convert to array//

function createArray() {
    var list = localStorage.getItem("Scores");
    
    if(list === null){
        scores = [];
    } else {
      
        scores = list.split(',');
    }
    return;
}

//Start & Stop the timer conditional//

function startTimer() {
      
    var countDown = setInterval(function() {
        
        if(clock === -1) {
            document.getElementById("timer").innerHTML = "Timer";
            clearInterval(countDown);
            return;
        }
        if(clock > 0) {
            clock += -1;
            document.getElementById("timer").innerHTML = "Time Remaining:  " + clock;
        } else {
          
            clearInterval(countDown);
            gameOver();
        }
    }, 1000);
   
}
    
//Stop game if the timer expires// 

function gameOver() {
    document.querySelector(".header").style.display = "none";
    hr.style.display = "none";
    comeback.style.display = "none";
    removeLi();
    h1.style.display = "block";
    h1.innerHTML = "Game Over!  The timer ran out."
    h2.innerHTML = "Please try again later after you've had some coffee."
}


//Checking answers for accuracy//

function checkAnswer(id) {
   
    hr.style.display = 'block';
    comeback.style.display = 'block';
   
    if(id == correctAnswersId[questionsIndex]) {
        comeback.innerHTML = "Correct!";
        userPoints += 10;
    } else {
        comeback.innerHTML = "Wrong";
        userPoints += -2;
        clock += -5;
    }
   
    questionsIndex++;

    pause();
}

//Display questions & possible answer options//

function displayQuestion() {
    
    startTimer();
    
    removeLi();
    
    h1.style.display = "none";
    p.style.display = "none"
    startBtn.style.display ="none";

    hr.style.display = "none";
    comeback.style.display = "none";

    h2.innerHTML = questions[questionsIndex];
   
    for(var i = 0; i < 4; i++) {
      
        if(questionsIndex === answers.length){
            removeLi();
            clock = -1;
            document.getElementById("timer").innerHTML = "Timer";
            allDone();
        } else {
           
            var li = document.createElement("li");
            li.setAttribute("id", i);
            li.setAttribute("class", "listItem");
            li.setAttribute("onClick", "checkAnswer(this.id)");
            li.innerHTML = answers[questionsIndex][i];
            ol.append(li);
        }
    }
}    

//Show final score & enter user's initials//

function allDone() {
    
    p.style.display = "none";
    hr.style.display = "none";
    form.style.display = "block";
    comeback.style.display = "block";

    h2.innerHTML = "All done!";
    
    comeback.innerHTML = "Your final score is:  " + userPoints;
 
    input.style.display = "block";
}

//Locate & Display all prior scores//

function findPlayerScores() {
    currentPlayerIndex = [];
    var player = scores[scores.length - 2];
    console.log("player:  " + player);
    for(var i = 0; i < scores.length; i += 2) {
        var previousPlayer = scores[i];
        if(player === previousPlayer){
             currentPlayerIndex.push(i);
        }
    }
    console.log("CPIndex: " + currentPlayerIndex);
    return currentPlayerIndex;
}

//Display high scores//

function highScores() {
    
    clock = -1;
  
    removeLi();
    p.style.display = "block";
    p.innerHTML = "something";
    // if(currentPlayerIndex.length > 0) {
        console.log("highest score index:  " + index);
        var highScore = document.createElement("h2");
        highScore.setAttribute("class", "highScore");
        highScore.innerHTML = "The Current High Score Is: " + scores[index];
        document.querySelector("body").appendChild(highScore);
    // }
    // render a heading for your 'Previous Scores'
    // if(currentPlayerIndex.length > 0) {
    //     h2.style.display = 'block';
    //     h2.innerHTML = "Your Previous Scores";
    // }
    
   //Render prior scores for current user//

    h2.style.display = "block";
    h2.innerHTML = "Previous Scores for " + scores[currentPlayerIndex[0]];
    for(var i = 0; i < currentPlayerIndex.length - 1; i++) {
        var inits = scores[currentPlayerIndex[i]];
        var prevScore = scores[currentPlayerIndex[i] + 1];
        var li = document.createElement("li");
        li.setAttribute("class", "previousScores");
        li.innerHTML = "Player:  " + inits + "   " + "Previous Score:  " + prevScore;
        ol.append(li);
    }
   
    h2.style.display = "none";
    hr.style.display = "none";
    comeback.style.display = 'none';
    p.style.display = "none";
    startBtn.style.display = "none"
    form.style.display = "none"

    h1.style.display = "block";
    h1.innerHTML = "High Scores";
 
    highestScore();
    
    
    scoreButtons.style.display = "inline-block";
}

//Locate highest value via defined arrays//

function highestScore() {
    var best = 0;
    for(var i = 1; i < scores.length; i += 2) {
        var current = scores[i];
        if(current > best){
             best = current;
             index = i;
        }
    }
    
    return index;
}

//Full reset of question, counter & return to first question//

function reset() {
    
    userPoints = 0;

    questionsIndex = 0;
   
    clock = 55;
  
    h2.style.display = "block";
    
    scoreButtons.style.display = "none";
    form.style.display = "none";

    displayQuestion();
}

function clearScores() {
    console.log("in clearScores()");
    localStorage.clear();
    return;
}

//Remove 'li' tags that display answer for previous question//

function removeLi() {
    while(ol.firstChild) {
        ol.removeChild(ol.firstChild);
    }
    return;
}

function pause() {
    scoreButtons.style.display = "none";
    h2.style.display = "block";
    comeback.style.display = "block";
    var pause = setTimeout("displayQuestion()", 750);
}

//Event Listeners//*** 

submitBtn.addEventListener("click", function (event){
    event.preventDefault();
   
    var initials = document.querySelector(".box").value;
    
    scores.push(initials, userPoints);
   
    findPlayerScores();

    highestScore();

    localStorage.setItem("Scores", scores);
   
    highScores();
});
