const quizData = [
    {
        question: "Qual é o principal objetivo dos governos ao cobrar impostos?",
        answers: [
            {option: "Financiar festas e eventos públicos", correct: false},
            {option: "Incentivar o turismo local", correct: false},
            {option: "Coletar recursos para financiar serviços públicos e infraestrutura", correct: true},
            {option: "Aumentar os salários dos políticos", correct: false},
            {option: "Reduzir a quantidade de dinheiro em circulação", correct: false},
        ],
    },
    {
        question: "Qual desses tipos de impostos é cobrado diretamente sobre a renda de uma pessoa?",
        answers: [
            {option: "Imposto sobre Valor Agregado (IVA)", correct: false},
            {option: "Imposto sobre a Renda de Pessoa Física (IRPF)", correct: true},
            {option: "Imposto Predial e Territorial Urbano (IPTU)", correct: false},
            {option: "Imposto sobre Produtos Industrializados (IPI)", correct: false},
            {option: "Imposto de Importação (II)", correct: false},
        ],
    },
    {
        question: "Qual imposto é geralmente utilizado para financiar a previdência social em muitos países?",
        answers: [
            {option: "Imposto sobre Grandes Fortunas", correct: false},
            {option: "Imposto sobre Transmissão Causa Mortis e Doação (ITCMD)", correct: false},
            {option: "Contribuição para o Financiamento da Seguridade Social (Cofins)", correct: false},
            {option: "Contribuição Previdenciária", correct: true},
            {option: "Imposto sobre Propriedade de Veículos Automotores (IPVA)", correct: false},
        ],
    },
    {
        question: "Qual é o imposto que incide sobre a propriedade de veículos automotores, como carros e motos?",
        answers: [
            {option: "Imposto sobre a Propriedade Predial e Territorial Urbana (IPTU)", correct: false},
            {option: "Imposto sobre a Propriedade de Veículos Automotores (IPVA)", correct: true},
            {option: "Imposto sobre Importação (II)", correct: false},
            {option: "Imposto sobre Operações Financeiras (IOF)", correct: false},
            {option: "Imposto de Renda de Pessoa Jurídica (IRPJ)", correct: false},
        ],
    },
    {
        question: "Qual é o nome do imposto que é cobrado quando uma pessoa recebe uma herança ou uma doação?",
        answers: [
            {option: "Imposto sobre Produtos Industrializados (IPI)", correct: false},
            {option: "Imposto de Renda Retido na Fonte (IRRF)", correct: false},
            {option: "Imposto sobre Valor Agregado (IVA)", correct: false},
            {option: "Contribuição Social sobre o Lucro Líquido (CSLL)", correct: false},
            {option: "Imposto sobre Transmissão Causa Mortis e Doação (ITCMD)", correct: true},
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