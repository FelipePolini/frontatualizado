const quizData = [
    {
        question: "1. O que é educação financeira?",
        answers: [
            {option: "Um curso sobre economia global", correct: false},
            {option: "A habilidade de ganhar dinheiro rapidamente", correct: false},
            {option: "O conhecimento para gerenciar recursos financeiros e tomar decisões informadas", correct: true},
            {option: "Um programa de governo para aumento de impostos", correct: false},
        ],
    },
    {
        question: "2. Qual é a primeira etapa do planejamento financeiro pessoal?",
        answers: [
            {option: "Investir em ações", correct: false},
            {option: " Definir metas financeiras", correct: true},
            {option: "Comprar um carro", correct: false},
            {option: "Gastar menos que a renda", correct: false},
        ],
    },
    {
        question: "3. O que caracteriza o crédito responsável?",
        answers: [
            {option: "Usar o cartão de crédito sem limites", correct: false},
            {option: "Pagar apenas o valor mínimo da fatura", correct: false},
            {option: "Fazer compras apenas com recursos que podem ser pagos na data de vencimento", correct: true},
            {option: "Não usar o cartão de crédito", correct: false},
        ],
    },
    {
        question: "4. Qual é a principal função de uma reserva de emergência?",
        answers: [
            {option: "Financiar uma viagem", correct: false},
            {option: "Comprar um novo carro", correct: false},
            {option: "Investir em ações de alto risco", correct: false},
            {option: "Cobrir despesas inesperadas sem endividar-se", correct: true},
        ],
    },
    {
        question: "5. O que é CDB?",
        answers: [
            {option: "Um título de dívida emitido por bancos para captação de recursos", correct: false},
            {option: "Um tipo de conta bancária", correct: false},
            {option: "Um tipo de ação", correct: false},
            {option: "Um investimento em imóveis", correct: false},
        ],
    },
];

let currentQuestionIndex = 0;
let correctAnswers = 0;
const questionElement = document.querySelector('.question');
const answersElement = document.querySelector('.answers');
const spnQtd = document.querySelector('.spnQtd');
const finishElement = document.querySelector('.finish');
const resultsElement = document.querySelector('.results');
const feedbackElement = document.querySelector('.feedback');
const reiniciarButton = document.querySelector('.reiniciar');

function loadQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    answersElement.innerHTML = '';
    feedbackElement.innerHTML = '';
    spnQtd.innerText = `Pergunta ${currentQuestionIndex + 1} de ${quizData.length}`;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement('button');
        button.innerText = answer.option;
        button.classList.add('btn', 'btn-light', 'mb-2');
        button.onclick = () => checkAnswer(answer.correct, answer.option);
        answersElement.appendChild(button);
    });
}

function checkAnswer(isCorrect, selectedOption) {
    // Impede novas respostas para a mesma pergunta
    answersElement.querySelectorAll('button').forEach(button => button.disabled = true);

    feedbackElement.innerHTML = isCorrect
        ? `<div class="alert alert-success">Correto! Você escolheu: ${selectedOption}</div>`
        : `<div class="alert alert-danger">Incorreto! A resposta correta é: ${quizData[currentQuestionIndex].answers.find(a => a.correct).option}</div>`;

    if (isCorrect) {
        correctAnswers++;
    }

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Próxima Pergunta';
    nextButton.classList.add('btn', 'btn', 'mt-2');
    nextButton.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            loadQuestion();
        } else {
            showResults();
        }
    };
    answersElement.appendChild(nextButton);

    // Tentar novamente
    const retryButton = document.createElement('button');
    retryButton.innerText = 'Tentar Novamente';
    retryButton.classList.add('btn', 'btn', 'mt-2');
    retryButton.onclick = () => loadQuestion();
    answersElement.appendChild(retryButton);
}

function showResults() {
    questionElement.innerText = '';
    answersElement.innerHTML = '';
    feedbackElement.innerHTML = '';
    finishElement.style.display = 'block';
    resultsElement.innerHTML = `
        Você acertou ${correctAnswers} de ${quizData.length} perguntas.
    `;
}

reiniciarButton.onclick = () => {
    currentQuestionIndex = 0;
    correctAnswers = 0;
    finishElement.style.display = 'none';
    loadQuestion();
};

loadQuestion();