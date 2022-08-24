//********************************//ADDED-CODE//*******************************//

//ALL HTML ELEMENTS DEFINED//

var ol = document.querySelector('ol');
var li = document.querySelector('li');
var h1 = document.querySelector('h1');
var p = document.querySelector('p');
var startBtn = document.querySelector('#start');
var hr = document.querySelector('hr');
var h2 = document.querySelector('h2');
var startMessage = document.querySelector('.startMessage');
var comeback = document.querySelector('#comeBack');
var scoreButtons = document.querySelector('.scores');
var form = document.querySelector('.form');
var submitBtn = document.querySelector('.submit');

//HTML INPUT SELECTOR//

var input = document.querySelector('.done');

//HTML BOX SELECTOR//

var item = document.getElementsByClassName('listItem');
var questionsIndex = 0;
var answersIndex = 0;
var userPoints = 0;
var id;
var scores = [];
var index;
var currentPlayerIndex = [];
var clock = 60;

//LOCAL STORAGE SCORES READ/INITIALIZATION//

createArray();

//Q&A VAR ARRAYS//

var questions = [
    ["What is JavaScript?"], 
    ["Which of the following are correct about JavaScript?"], 
    ["Among the given statements, which statement defines closures in JavaScript?"], 
    ["Arrays in JavaScript are defined by which of the following statement(s)?"],
    ["Will the JavaScript code in the brackets [var js = (function(x) {return x*x;}(10)] work?"], 
    // ["Which of the following are NOT JavaScript data types?"], 
    // ["Where is client-side JavaScript code embedded within HTML documents?"], 
    // ["Which of the following objects is the main entry point to all client-side JavaScript features and APIs?"], 
    // ["Which of the following can be used to call a JavaScript Code Snippet?"],
    // ["Which of the following scoping types does JavaScript use?"],
    // ["What is the basic difference between JavaScript and JAVA?"], 
    // ["Why is a JavaScript Engine required?"],
    // ["Which of the following methods/operations does JavaScript use instead of == and !=?"], 
    // ["What will be the result or type of error if 'p' in this JavaScript code snippet [Jconsole.log(p)] is NOT defined?"], 
    // ["What is the prototype represented in the following JavaScript code snippet [function javascript() {}]?"], 
    // ["Why are event handlers needed in JavaScript?"], 
    // ["Which of the following is NOT a framework?"],
    // ["Which of the following properties are triggered in response to JavaScript errors?"]
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
    // [
    //     "Null type", 
    //     "Undefined type", 
    //     "Number type", 
    //     "All of the mentioned"
    // ],
    // [
    //     "A URL that uses the special javascript:code", 
    //     "A URL that uses the special javascript:protocol", 
    //     "A URL that uses the special javascript:encoding", 
    //     "A URL that uses the special javascript:stack"
    // ],
    // [
    //     "Position", 
    //     "Window", 
    //     "Standard", 
    //     "Location"
    // ],
    // [
    //     "Function/Method", 
    //     "Preprocessor", 
    //     "Triggering Event", 
    //     "RMI"
    // ],
    // [
    //     "Sequential", 
    //     "Segmental", 
    //     "Lexical", 
    //     "Literal"
    //     ],
    //     [
    //         "Functions are considered as fields", 
    //         "Functions are values, and there is no hard distinction between methods and fields", 
    //         "Variables are specific", 
    //         "There is no difference"
    //     ],
    //     [
    //         "Both Compiling & Interpreting the JavaScript", 
    //         "Parsing the javascript", 
    //         "Interpreting the JavaScript", 
    //         "Compiling the JavaScript"
    //     ],
    //     [
    //         "JavaScript uses equalto()", 
    //         "JavaScript uses equals() and notequals() instead", 
    //         "JavaScript uses bitwise checking", 
    //         "JavaScript uses === and !== instead"
    //     ],
    //     [
    //         "Not valid", 
    //         "Prototype of a function", 
    //         "Function javascript", 
    //         "A custom constructor"
    //     ],
    //     [
    //         "Value not found Error", 
    //         "Reference Error", 
    //         "Null", 
    //         "Zero"
    //     ],
    //     [
    //         "Allows JavaScript code to alter the behaviour of windows", 
    //         "Adds innerHTML page to the code", 
    //         "Change the server location", 
    //         "Performs handling of exceptions and occurrences" 
    //     ],
    //     [
    //         "JavaScript .NET", 
    //         "JavaScript", 
    //         "Cocoa JS", 
    //         "jQuery" 
    //     ],
    //     [
    //         "onclick", 
    //         "onerror", 
    //         "onmessage", 
    //         "onexception" 
    //     ],
    ];

var correctAnswersId = [0, 1, 0, 3, 3] //1, 1, 1, 0, 2, 1, 2, 3, 1, 3, 0, 1, 1]//


//FUNCTIONS//
//READ LOCAL STORAGE TO STRING ELEMENT & CONVERT TO ARRAY//

function createArray() {
    var list = localStorage.getItem('Scores');
   
    if(list === null){
        scores = [];
    } else {
      
        scores = list.split(',');
    }
    return;
}

//TIMER CONTROL//

function startTimer() {
    // initiate timer    
    var countDown = setInterval(function() {
       
        if(clock === -1) {
            document.getElementById('timer').innerHTML = "Timer";
            clearInterval(countDown);
            return;
        }
        if(clock > 0) {
            clock += -1;
            document.getElementById('timer').innerHTML = "Time Remaining:  " + clock;

        } else {
            // stop clock
            clearInterval(countDown);
            gameOver();
        }
    }, 1000);
   
}

//RESET QUESTION COUNTER & RETURN TO FIRST//

function reset() {
   
    userPoints = 0;
    
    questionsIndex = 0;
    
    clock = 100;
    
    h2.style.display = 'block';

    scoreButtons.style.display = 'none';
    form.style.display = 'none';
    
    displayQuestion();
        
        startTimer();
  
    removeLi();
   
    h1.style.display = 'none';
    p.style.display = 'none';
    startBtn.style.display ='none';
    
    hr.style.display = 'none';
    comeback.style.display = 'none';
   
    h2.innerHTML = questions[questionsIndex];
    
    for(var i = 0; i < 4; i++) {
        
        if(questionsIndex === answers.length){
            removeLi();
            clock = -1;
            document.getElementById('timer').innerHTML = "Timer";
            allDone();
        } else {
            
            var li = document.createElement("li");
            li.setAttribute("id", i);
            li.setAttribute("class", "listItem");
            li.setAttribute("onClick", 'checkAnswer(this.id)');
            li.innerHTML = answers[questionsIndex][i];
            ol.append(li);
        }
    }
    }

//STOP GAME - IF TIMER RUNS OUT//

function gameOver() {
    document.querySelector('.header').style.display = 'block';
    hr.style.display = 'none';
    comeback.style.display = 'none';
    removeLi();

    h1.style.display = 'block';
    h1.style.color = 'red';
    h1.innerHTML = "TIMES UP! GAME OVER!"
    h2.style.color = 'green'
    h2.innerHTML = "Be sure to brush up on your Java$cript knowledge!"

    scoreButtons.style.display = 'block';
}


//ANSWER CHECK - CORRECT & WRONG//

function checkAnswer(id) {
  
    hr.style.display = 'block';
    comeback.style.display = 'block';
    
    if(id == correctAnswersId[questionsIndex]) {
        comeback.style.color = 'green';
        comeback.innerHTML = "CORRECT!";
        userPoints += 10;
    } else {
        comeback.style.color = 'red'
        comeback.innerHTML = "WRONG!";
        userPoints += -2;
        clock += -5;
    }
   
    questionsIndex++;
    
    pause();
}

//DISPLAY Q&A POSSIBILITIES//

function displayQuestion() {
   
    startTimer();
  
    removeLi();
   
    h1.style.display = 'none';
    p.style.display = 'none';
    startBtn.style.display ='none';
    
    hr.style.display = 'none';
    comeback.style.display = 'none';
   
    h2.innerHTML = questions[questionsIndex];
    
    for(var i = 0; i < 4; i++) {
        
        if(questionsIndex === answers.length){
            removeLi();
            clock = -1;
            document.getElementById('timer').innerHTML = "Timer";
            allDone();
        } else {
            
            var li = document.createElement("li");
            li.setAttribute("id", i);
            li.setAttribute("class", "listItem");
            li.setAttribute("onClick", 'checkAnswer(this.id)');
            li.innerHTML = answers[questionsIndex][i];
            ol.append(li);
        }
    }
}    

//DISPLAY FINAL SCORE & ENTER INITIALS//

function allDone() {
   
    p.style.display = 'none';
    hr.style.display = 'none';
    form.style.display = 'block';
    comeback.style.display = 'block';
  
    h2.style.color = 'blue'
    h2.innerHTML = "ALL DONE!";

    comeback.style.color = 'green'
    comeback.innerHTML = "FINAL SCORE:" + userPoints;
  
    input.style.display = 'block';
    scoreButtons.style.display = 'none';
}

//LOCATE ALL SCORES FOR USER//

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

//DISPLAY HIGHSCORES//

function highScores() {
   
    clock = -1;

    removeLi();
    p.style.display = 'block';
    p.innerHTML = "#";
   
        console.log("highest score index:  " + index);
        var highScore = document.createElement('h2');
        highScore.setAttribute("class", "highScore");
        highScore.innerHTML = "Current High Score: " + scores[index];
        document.querySelector('body').appendChild(highScore);

    
//RENDER SCORES FROM PRIOR USER//

    h2.style.display = 'block';
    h2.innerHTML = "Previous Scores" + scores[currentPlayerIndex[0]];
    for(var i = 0; i < currentPlayerIndex.length - 1; i++) {
        var inits = scores[currentPlayerIndex[i]];
        var prevScore = scores[currentPlayerIndex[i] + 1];
        var li = document.createElement("li");
        li.setAttribute("class", "previousScores");
        li.innerHTML = "Player:  " + inits + "   " + "Previous Score:  " + prevScore;
        ol.append(li);
    }
  
    h2.style.display = 'none';
    hr.style.display = 'none';
    comeback.style.display = 'none';
    p.style.display = 'none';
    startBtn.style.display = 'none'
    form.style.display = 'none'
    
    h2.style.display = 'block';
    highScore.setAttribute("id", "scoresList" )
    h2.innerHTML = "Scores List";
  
    highestScore();
    
  
    scoreButtons.style.display = 'block';
}

//SORT ARRAYS FOR HIGHEST SCORE//

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

function clearScores() {
    console.log("in clearScores()");
    localStorage.clear();
    return;
}


function removeLi() {
    while(ol.firstChild) {
        ol.removeChild(ol.firstChild);
    }
    return;
}

function pause() {
    scoreButtons.style.display = 'none';
    h2.style.display = 'block';
    comeback.style.display = 'block';
    var pause = setTimeout('displayQuestion()', 750);
}

//EVENT LISTENERS//

submitBtn.addEventListener("click", function (event){
    event.preventDefault();
  
    var initials = document.querySelector(".box").value;
   
    scores.push(initials, userPoints);
 
    findPlayerScores();
  
    highestScore();
   
    localStorage.setItem("Scores", scores);
   
    highScores();
});

