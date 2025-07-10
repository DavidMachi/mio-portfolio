const button = document.getElementById('start');
const questionContainer = document.getElementById('question');
const answersContainer = document.getElementById('answers');

//  Variabili per gestire le domande
let questions = []; // Array che conterrà tutte le domande ricevute dall'API
let currentIndex = 0; // Indice della domanda attuale, parte da 0
let score = 0;
let questionsNumber = 10;

//  Funzione che scarica le domande dall'API
const getTrivia = async () => {
    try {
        // Fa una richiesta HTTP all'API di OpenTDB per ottenere 10 domande casuali
        const response = await fetch(
            `https://opentdb.com/api.php?amount=${questionsNumber}`
        );
        const data = await response.json();
        console.log('data.results', data.results);
        questions = data.results; //l'array con tutti gli oggetti
        currentIndex = 0; // Resetta l'indice alla prima domanda
        showQuestion(); // Mostra la prima domanda
        button.style.display = 'none'; // faccio scomparire il bottone
    } catch (error) {
        console.log('Errore:', error);
    }
};

const showQuestion = () => {
    if (currentIndex >= questions.length) {
        questionContainer.innerHTML = `Hai finito il Trivia! il tuo punteggio è ${score}/${questionsNumber}`;
        answersContainer.innerHTML = '';
        button.style.display = 'block'; // faccio riapparire il bottone
        return;
    }

    const currentQuestion = questions[currentIndex]; //dico che l'array è assegnato all'indice corrente

    questionContainer.innerHTML = `Categoria: ${currentQuestion.category} <br> Difficoltà: ${currentQuestion.difficulty} <br> <strong>${currentQuestion.question}</strong>`;

    const shuffledAnswers = [
        currentQuestion.correct_answer,
        ...currentQuestion.incorrect_answers,
    ].sort(() => Math.random() - 0.5);

    answersContainer.innerHTML = '';

    shuffledAnswers.forEach(answer => {
        const btn = document.createElement('button');
        btn.textContent = answer;
        btn.classList.add('answerButton');
        btn.addEventListener('click', () => {
            if (answer == currentQuestion.correct_answer) {
                score++;
            }
            currentIndex++;
            showQuestion(); // Chiama di nuovo la funzione per mostrare la nuova domanda
        });
        answersContainer.appendChild(btn);
    });
};

button.addEventListener('click', getTrivia);
