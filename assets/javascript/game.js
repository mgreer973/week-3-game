var wordlist = [],
        targetWord = '',
        maxLives = 6,
        targetWordLetters = [],
        imgGuess = '',
        wins= 0,
        loses=0,
        timesThru = 0;

var ranNum = 0;

var userGuesses = [];
newWord();
document.querySelector("#imgGuess").innerHTML = "<img src='assets/images/2007Giants.jpg' alt='giants style='width:355px;height:228px'>";

 
document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.keyCode).toLowerCase();
    
     if (/^[a-zA-Z]*$/.test(userGuess))  {
        timesThru++;
        var addToArray = 'Y';
        if (userGuesses.length == 0) {
           userGuesses.push(userGuess);
           startGame();
        }

        for (var i=0; i < userGuesses.length ; i++) {
            if (userGuess == userGuesses[i]) {
                addToArray = 'N';
            }
        }
        if (addToArray == 'Y') { 
           userGuesses.push(userGuess);
           startGame();
        }
     } else {
        alert('userGuess is not a letter');
     }
}

function startGame() {
    drawWord();
    drawGuesses();
    reviewLives();
    checkIfWon();
}

function checkIfWon() {
    if (renderedWord() == targetWord) {
        alert('you won the name was ' + targetWord);
        var displayGuess = "<img src=" + imgGuess + " alt='giant player' style='width:355px;height:228px'>";
        wins++;
        document.querySelector("#wins").innerHTML = wins;
        document.querySelector("#imgGuess").innerHTML = displayGuess;
        resetGame();
    }
}

function drawWord() {
    while (targetWord == '') {
        newWord();
    }
    document.querySelector('#targetWord').innerHTML = renderedWord();
}

function drawGuesses() {
      document.querySelector('#previousGuesses').innerHTML = userGuesses.join(', ');
}

function newWord() {
    wordlist = ['ross', 'pierce', 'cofield',
'blackburn', 'webster', 'kiwanuka', 'strahan', 'umenyiora', 'bradshaw',
'jacobs', 'diehl', 'tyree', 'manning', 'boss', 'burress', 'seubert'];
    ranNum = Math.floor(Math.random() * wordlist.length);
    targetWord = wordlist[ranNum];

    imgList = ['aaron-ross.jpg', 'antonio_pierce.jpg', 'barry-cofield.jpg', 'Chase_Blackburn.jpg', 
    'coreyWebster.jpg', 'mathiasKiwanuka.jpg',
'michael-strahan.jpg',  'osi-umenyiora.jpg', 'Ahmad-Bradshaw.jpg', 'brandonJacobs.jpg', 'davidDiehl.jpg',
'David-Tyree.jpg', 'eliManning.jpg',  'KevinBoss.jpg',  'plaxico-burress.jpg', 'richSeubert.jpg'
]
    targetWordLetters = targetWord.split('');
//    alert("targerWord is " + targetWord);

    imgGuess = 'assets/images/' + imgList[ranNum];
//    alert('imgGuess' + imgGuess);

    document.querySelector('#targetWord').innerHTML = '________';   
}  

function renderedWord() {
    var rendWord = '';
    for (var i = 0; i < targetWord.length; i++) {
        if (userGuesses.indexOf(targetWord[i].toLowerCase(), 0) == -1) {
            rendWord += '_';
        } else {
            rendWord += targetWord[i];
        }
    }
    return rendWord;
}

function resetGame() {
    setImage(0);
    targetWord = '';
    userGuesses = [];
    maxLives = 6;
    targetWordLetters = [];
    timesThru = 0;
    newWord();
    drawWord();
    document.querySelector('#previousGuesses').innerHTML = 'nothing yet... guess a letter';
}

function reviewLives() {
    var livesRemaining = maxLives,
            string = targetWord.toLowerCase();

    for (var i = 0; i < userGuesses.length; i++) {
        if (string.indexOf(userGuesses[i], 0) == -1) {
            livesRemaining--;
        }
    }

    if (livesRemaining <= 0) {
//        setImage(6);
        alert('you lost the correct name was ' + targetWord);
        document.querySelector("#imgGuess").innerHTML = '';
        loses++;
        document.querySelector("#loses").innerHTML = loses;
         document.querySelector("#imgGuess").innerHTML = "<img src='assets/images/2007Giants.jpg' alt='hangman_pic style='width:355px;height:228px'>";

        resetGame();
    }

    setImage(maxLives - livesRemaining);
}

function setImage(number) {

switch(number) {
    case 0:
        var displayHangman = "<img src='assets/images/sprite2_cr0.png' alt='hangman_pic'>";
        break;
    case 1:
        var displayHangman = "<img src='assets/images/sprite2_cr1.png' alt='hangman_pic'>";
        break;
    case 2:
        var displayHangman = "<img src='assets/images/sprite2_cr2.png' alt='hangman_pic'>";
        break;
    case 3:
        var displayHangman = "<img src='assets/images/sprite2_cr3.png' alt='hangman_pic'>";
        break;
    case 4:
        var displayHangman = "<img src='assets/images/sprite2_cr4.png' alt='hangman_pic'>";
        break;
    case 5:
        var displayHangman = "<img src='assets/images/sprite2_cr5.png' alt='hangman_pic'>";
        break;
    case 6:
        var displayHangman = "<img src='assets/images/sprite2_cr6.png' alt='hangman_pic'>";
        break;
}

    document.querySelector("#hangman_pic").innerHTML = displayHangman;
}

