const questions=[
    {
        question:'Your instinct during tension in a room is…',
        answers:[
            {text:'Calm everyone’s energy', correct:true},
            {text:'Observe quietly', correct:false},
            {text:'Hold the room with your presence', correct:false},
        ]
    },
    {
        question:'When someone raises their voice at you…',
        answers:[
            {text:'You stay neutral', correct:false},
            {text:'You shrink but stay sof', correct:true},
            {text:'Your energy becomes sharp instantly', correct:false},
        ]
    },
    {
        question:'Your natural emotional rhythm:',
        answers:[
            {text:'Deep, intense feelings you understand', correct:true},
            {text:'Balanced emotions', correct:false},
            {text:'Controlled and unreadable', correct:false},
        ]
    },
    {
        question:'How do you protect people you care about?',
        answers:[
            {text:'Soft emotional protection (checking in, comforting)', correct:true},
            {text:'Practical protection', correct:false},
            {text:'Silent, distant protection', correct:false},
        ]
    },
    {
        question:'Someone flirts with you. Your reaction?',
        answers:[
            {text:'Blush + awkward sweetness', correct:true},
            {text:'Flirt back a little', correct:false},
            {text:'Smirk with confidence', correct:false},
        ]
    },
    {
    question: 'Your way of handling conflict is…',
    answers: [
        {text: 'Diffuse it gently and keep everyone comfortable', correct:true},
        {text: 'Stand your ground and argue your point', correct:false},
        {text: 'Withdraw and avoid confrontation', correct:false},
    ]
},
{
    question: 'When someone shares their problems with you…',
    answers: [
        {text: 'You listen deeply and offer comfort', correct:true},
        {text: 'Give quick practical advice', correct:false},
        {text: 'Tell them to handle it themselves', correct:false},
    ]
},
{
    question: 'Your social energy in a new group is…',
    answers: [
        {text: 'Calm, approachable, and reassuring', correct:true},
        {text: 'Dominant and attention-grabbing', correct:false},
        {text: 'Reserved and quiet', correct:false},
    ]
},
{
    question: 'When someone needs help unexpectedly…',
    answers: [
        {text: 'You step in quietly and support them', correct:true},
        {text: 'You wait to see if they can manage', correct:false},
        {text: 'You offer help but only if it benefits you', correct:false},
    ]
},
{
    question: 'Your emotional style is best described as…',
    answers: [
        {text: 'Gentle yet steady, empathetic', correct:true},
        {text: 'Explosive and intense', correct:false},
        {text: 'Detached and analytical', correct:false},
    ]
}


];

const questionElement=document.getElementById('question');
const optionButton=document.getElementById('options');
const nextButton=document.getElementById('next-btn');

let currentQuestionIndex=0;
let score=0;


function start(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML='Next';
    showQuestion();
}

function showQuestion(){
    reset();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo= currentQuestionIndex + 1;
    questionElement.innerHTML=questionNo + '. ' + currentQuestion.question;
// showed the question

    currentQuestion.answers.forEach(answer => {
        const button= document.createElement('button');
        button.innerHTML=answer.text;
        button.classList.add('btn'); //as buttons have this class name in html
        optionButton.appendChild(button);

        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener('click',selectAnswer);
    });

}

function reset(){
    nextButton.style.display='none';
    while(optionButton.firstChild){
        optionButton.removeChild(optionButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect= selectedBtn.dataset.correct == 'true';
    if(isCorrect){
        selectedBtn.classList.add('correct');
        score++;
    }
    else{
        selectedBtn.classList.add('incorrect');
    }
    Array.from(optionButton.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct');
        }
        button.disabled= true;
    });
    nextButton.style.display='block';
}


function showScore(){
    reset();

    nextButton.innerHTML='Play Again';
    nextButton.style.display='block';

    let message = '';

    if(score <= 3){
        message = "You’re barely an Omega. You rely more on other social instincts.";
        questionElement.style.color = '#d9534f'; // red for low score
    } else if(score <= 7){
        message = "You’re moderately Omega. You have some omega traits, but there’s room to grow.";
        questionElement.style.color = '#1614b9ff'; // orange for medium score
    } else {
        message = "You’re a true Omega! Calm, empathetic, and emotionally steady.";
        questionElement.style.color = '#5cb85c'; // green for high score
    }

    questionElement.style.textAlign = 'center';
    questionElement.style.fontSize = '1.5rem';
    questionElement.style.backgroundColor = '#f0f8ff';
    questionElement.style.padding = '20px';
    questionElement.style.borderRadius = '12px';
    questionElement.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
    
    questionElement.innerHTML = `Your Omega score: ${score}/10 <br>${message}`;
}


function handleNext(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener('click',()=>{
    if(currentQuestionIndex < questions.length){
        handleNext();
    }
    else{
        start();
    }
})
start();
