// ==================== بيانات الحيوانات والأسئلة ====================

const animals = [
    { id: 'lion', name: 'الأسد', emoji: '🦁' },
    { id: 'elephant', name: 'الفيل', emoji: '🐘' },
    { id: 'monkey', name: 'القرد', emoji: '🐵' },
    { id: 'giraffe', name: 'الزرافة', emoji: '🦒' },
    { id: 'zebra', name: 'الحمار الوحشي', emoji: '🦓' },
    { id: 'tiger', name: 'النمر', emoji: '🐯' },
    { id: 'bear', name: 'الدب', emoji: '🐻' },
    { id: 'penguin', name: 'البطريق', emoji: '🐧' },
    { id: 'duck', name: 'البطة', emoji: '🦆' },
    { id: 'rabbit', name: 'الأرنب', emoji: '🐰' },
    { id: 'dog', name: 'الكلب', emoji: '🐕' },
    { id: 'cat', name: 'القطة', emoji: '🐱' }
];

const questions = [
    {
        id: 'q1',
        text: 'أي حيوان هو ملك الغابة؟',
        options: ['الأسد', 'النمر', 'الدب', 'الفيل'],
        correctAnswer: 'الأسد',
        animalId: 'lion'
    },
    {
        id: 'q2',
        text: 'أي حيوان له خرطوم طويل؟',
        options: ['الفيل', 'الزرافة', 'الحمار الوحشي', 'الأسد'],
        correctAnswer: 'الفيل',
        animalId: 'elephant'
    },
    {
        id: 'q3',
        text: 'أي حيوان يتسلق الأشجار ويأكل الموز؟',
        options: ['القرد', 'الدب', 'القطة', 'الأرنب'],
        correctAnswer: 'القرد',
        animalId: 'monkey'
    },
    {
        id: 'q4',
        text: 'أي حيوان له رقبة طويلة جداً؟',
        options: ['الزرافة', 'الحمار الوحشي', 'الفيل', 'النعامة'],
        correctAnswer: 'الزرافة',
        animalId: 'giraffe'
    },
    {
        id: 'q5',
        text: 'أي حيوان له خطوط سوداء وبيضاء؟',
        options: ['الحمار الوحشي', 'النمر', 'البطريق', 'البقرة'],
        correctAnswer: 'الحمار الوحشي',
        animalId: 'zebra'
    },
    {
        id: 'q6',
        text: 'أي حيوان له خطوط برتقالية وسوداء؟',
        options: ['النمر', 'الأسد', 'الحمار الوحشي', 'الزرافة'],
        correctAnswer: 'النمر',
        animalId: 'tiger'
    },
    {
        id: 'q7',
        text: 'أي حيوان يعيش في الأماكن الباردة ويأكل السمك؟',
        options: ['البطريق', 'البطة', 'الدب', 'الأرنب'],
        correctAnswer: 'البطريق',
        animalId: 'penguin'
    },
    {
        id: 'q8',
        text: 'أي حيوان يقول "كواك كواك"؟',
        options: ['البطة', 'الدجاجة', 'الإوزة', 'البجعة'],
        correctAnswer: 'البطة',
        animalId: 'duck'
    },
    {
        id: 'q9',
        text: 'أي حيوان له آذان طويلة ويقفز؟',
        options: ['الأرنب', 'الكلب', 'القطة', 'السنجاب'],
        correctAnswer: 'الأرنب',
        animalId: 'rabbit'
    },
    {
        id: 'q10',
        text: 'أي حيوان هو حيوان أليف وينبح؟',
        options: ['الكلب', 'القطة', 'الأرنب', 'الطائر'],
        correctAnswer: 'الكلب',
        animalId: 'dog'
    }
];

// ==================== متغيرات الحالة ====================

let currentQuestionIndex = 0;
let score = 0;
let isAnswered = false;
let selectedAnswer = null;

// ==================== عناصر DOM ====================

const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');

const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');

const animalsGrid = document.getElementById('animalsGrid');
const questionText = document.getElementById('questionText');
const answersGrid = document.getElementById('answersGrid');
const feedback = document.getElementById('feedback');
const questionCounter = document.getElementById('questionCounter');
const progressFill = document.getElementById('progressFill');
const currentScoreDisplay = document.getElementById('currentScore');
const resultsCard = document.getElementById('resultsCard');

// ==================== وظائف الصوت ====================

function playSound(type = 'success') {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        if (type === 'success') {
            // صوت النجاح - نغمة عالية
            oscillator.frequency.value = 800;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.3);
        } else if (type === 'error') {
            // صوت الخطأ - نغمة منخفضة
            oscillator.frequency.value = 300;
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.5);
        } else if (type === 'click') {
            // صوت النقر
            oscillator.frequency.value = 600;
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
        }
    } catch (e) {
        console.log('Audio context not available:', e);
    }
}

// ==================== وظائف إنشاء الواجهة ====================

function renderAnimalsGrid() {
    animalsGrid.innerHTML = '';
    animals.forEach(animal => {
        const card = document.createElement('div');
        card.className = 'animal-card';
        card.innerHTML = `
            <span class="animal-emoji">${animal.emoji}</span>
            <div class="animal-name">${animal.name}</div>
        `;
        card.addEventListener('click', () => {
            playSound('click');
            card.style.animation = 'bounce 0.6s ease-out';
            setTimeout(() => {
                card.style.animation = '';
            }, 600);
        });
        animalsGrid.appendChild(card);
    });
}

function renderQuestion() {
    const question = questions[currentQuestionIndex];
    questionText.textContent = question.text;
    questionCounter.textContent = `السؤال ${currentQuestionIndex + 1} من ${questions.length}`;
    
    // تحديث شريط التقدم
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFill.style.width = progress + '%';
    
    // تحديث النقاط
    currentScoreDisplay.textContent = score;
    
    // إعادة تعيين الحالة
    isAnswered = false;
    selectedAnswer = null;
    feedback.innerHTML = '';
    
    // إنشاء أزرار الإجابات
    answersGrid.innerHTML = '';
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'answer-button';
        button.textContent = option;
        button.addEventListener('click', () => handleAnswer(option, button));
        answersGrid.appendChild(button);
    });
}

function handleAnswer(selectedOption, buttonElement) {
    if (isAnswered) return;
    
    isAnswered = true;
    selectedAnswer = selectedOption;
    const question = questions[currentQuestionIndex];
    const isCorrect = selectedOption === question.correctAnswer;
    
    // تحديث الأزرار
    const allButtons = document.querySelectorAll('.answer-button');
    allButtons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === question.correctAnswer) {
            btn.classList.add('correct');
        } else if (btn.textContent === selectedOption && !isCorrect) {
            btn.classList.add('incorrect');
        }
    });
    
    // تشغيل الصوت والتأثير
    if (isCorrect) {
        playSound('success');
        score++;
        showFeedback('🎉', 'إجابة صحيحة! ممتاز! 🌟');
    } else {
        playSound('error');
        showFeedback('😊', 'حاول مرة أخرى! 💪');
    }
    
    // الانتقال للسؤال التالي
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            renderQuestion();
        } else {
            showResults();
        }
    }, 1500);
}

function showFeedback(emoji, message) {
    feedback.innerHTML = `
        <div class="feedback-emoji">${emoji}</div>
        <div class="feedback-text">${message}</div>
    `;
}

function showResults() {
    const percentage = Math.round((score / questions.length) * 100);
    let rewardEmoji = '🏆';
    let rewardMessage = 'أنت نجم! إجابات مثالية!';
    
    if (percentage === 100) {
        rewardEmoji = '🏆';
        rewardMessage = 'أنت نجم! إجابات مثالية!';
    } else if (percentage >= 80) {
        rewardEmoji = '⭐';
        rewardMessage = 'عمل رائع جداً!';
    } else if (percentage >= 60) {
        rewardEmoji = '👏';
        rewardMessage = 'عمل جيد!';
    } else {
        rewardEmoji = '💪';
        rewardMessage = 'استمر في المحاولة!';
    }
    
    const stars = Array.from({ length: Math.ceil(percentage / 25) })
        .map(() => '<span class="star">⭐</span>')
        .join('');
    
    resultsCard.innerHTML = `
        <div class="results-emoji">${rewardEmoji}</div>
        <h1 class="results-message">${rewardMessage}</h1>
        <div class="results-score-box">
            <p class="results-score-label">نتيجتك</p>
            <p class="results-score-value">${score}/${questions.length}</p>
            <p class="results-percentage">${percentage}%</p>
        </div>
        <div class="results-stars">${stars}</div>
    `;
    
    switchScreen('results');
}

// ==================== إدارة الشاشات ====================

function switchScreen(screenName) {
    startScreen.classList.remove('active');
    quizScreen.classList.remove('active');
    resultsScreen.classList.remove('active');
    
    if (screenName === 'start') {
        startScreen.classList.add('active');
    } else if (screenName === 'quiz') {
        quizScreen.classList.add('active');
    } else if (screenName === 'results') {
        resultsScreen.classList.add('active');
    }
}

function startQuiz() {
    playSound('click');
    currentQuestionIndex = 0;
    score = 0;
    isAnswered = false;
    selectedAnswer = null;
    switchScreen('quiz');
    renderQuestion();
}

function restartQuiz() {
    playSound('click');
    switchScreen('start');
}

// ==================== معالجات الأحداث ====================

startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', restartQuiz);

// ==================== التهيئة ====================

document.addEventListener('DOMContentLoaded', () => {
    renderAnimalsGrid();
    switchScreen('start');
});

// ==================== معالجة اللمس للأجهزة المحمولة ====================

document.addEventListener('touchstart', function() {
    // تفعيل الأصوات على الأجهزة المحمولة
}, { passive: true });

// ==================== دعم لوحة المفاتيح ====================

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        if (startScreen.classList.contains('active')) {
            startQuiz();
        } else if (resultsScreen.classList.contains('active')) {
            restartQuiz();
        }
    }
});
