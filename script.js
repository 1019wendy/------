// 問題資料庫
const questions = [
    {
        question: "小S最常說的口頭禪是什麼？",
        options: ["老娘今天心情不好", "我跟你講", "是怎樣啦", "救命啊"],
        correct: 1
    },
    {
        question: "蔡康永最常用來形容事物的詞是什麼？",
        options: ["有事嗎", "這樣不好吧", "這太神奇了", "很可以"],
        correct: 2
    },
    {
        question: "康熙來了播出了幾季？",
        options: ["8季", "10季", "12季", "14季"],
        correct: 2
    },
    {
        question: "康熙來了最後一集播出的日期是？",
        options: ["2015年12月31日", "2016年1月15日", "2016年1月30日", "2016年2月5日"],
        correct: 1
    },
    {
        question: "下列哪個不是康熙來了的經典環節？",
        options: ["超級星光大道", "康熙字典", "真心話大冒險", "我猜我猜我猜猜猜"],
        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60;

// DOM 元素
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const resultScreen = document.getElementById('result-screen');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const timerElement = document.getElementById('timer');
const scoreElement = document.getElementById('score');
const finalScoreElement = document.getElementById('final-score');
const startButton = document.getElementById('start-btn');
const restartButton = document.getElementById('restart-btn');

// 開始遊戲
startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    
    startScreen.classList.add('d-none');
    resultScreen.classList.add('d-none');
    gameScreen.classList.remove('d-none');
    
    updateScore();
    showQuestion();
    startTimer();
}

function startTimer() {
    timerElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function showQuestion() {
    const question = questions[currentQuestion];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.addEventListener('click', () => selectAnswer(index));
        optionsContainer.appendChild(button);
    });
}

function selectAnswer(index) {
    const question = questions[currentQuestion];
    const buttons = optionsContainer.querySelectorAll('.option-btn');
    
    buttons.forEach(button => {
        button.disabled = true;
    });
    
    if (index === question.correct) {
        buttons[index].classList.add('correct');
        score += 20;
        updateScore();
        playCorrectSound();
    } else {
        buttons[index].classList.add('wrong');
        buttons[question.correct].classList.add('correct');
        playWrongSound();
    }
    
    setTimeout(() => {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1500);
}

function updateScore() {
    scoreElement.textContent = `分數: ${score}`;
}

function endGame() {
    clearInterval(timer);
    gameScreen.classList.add('d-none');
    resultScreen.classList.remove('d-none');
    finalScoreElement.textContent = score;
    
    // 根據分數顯示不同的結果
    let message = '';
    if (score === 100) {
        message = '太厲害了！你是康熙來了的終極鐵粉！';
    } else if (score >= 60) {
        message = '表現不錯！你對康熙來了很熟悉嘛！';
    } else {
        message = '再多看幾集康熙來了，下次一定會更好！';
    }
    
    Swal.fire({
        title: '遊戲結束！',
        text: message,
        icon: score === 100 ? 'success' : 'info',
        confirmButtonText: '確定'
    });
}

// 音效功能
function playCorrectSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-melodic-bonus-collect-1938.mp3');
    audio.play();
}

function playWrongSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-wrong-answer-buzz-946.mp3');
    audio.play();
}
