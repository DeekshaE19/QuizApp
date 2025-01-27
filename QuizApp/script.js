const start_btn = document.querySelector(".start_quiz");
const quiz_box = document.querySelector(".quiz-box");
const que_text = quiz_box.querySelector(".que_text");
const options_box = quiz_box.querySelector(".options");
const next_btn = document.querySelector(".next-btn");
const total_q = document.querySelector(".quiz-footer .total_que");
const count_que = document.querySelector(".quiz-footer .count_que");
const result_box = document.querySelector(".result-box");

const total_que_r = document.querySelector(".total-que span");
const right_ans_r = document.querySelector(".right-ans span");
const wrong_ans_r = document.querySelector(".wrong-ans span");
const percentage = document.querySelector(".percentage span");

const again_quiz = document.querySelector(".result-footer .again-quiz");
const exit = document.querySelector(".result-footer .exit");

const mark_wrong = '<i class="fa fa-times"></i>';
const mark_check = '<i class="fa fa-check"></i>';

let questions = [
    {
        num: 1,
        question: "What does HTML stand for?",
        answer: "Hyper Text Markup Language",
        options: [
            "Hyper Text Multiple Language",
            "Hyper Text Preprocessor",
            "Hyper Tool Multi Language",
            "Hyper Text Markup Language"
        ]
    },
    {
        num: 2,
        question: "What does CSS stand for?",
        answer: "Cascading Style Sheet",
        options: [
            "Computer Style Sheet",
            "Cascading Style Sheet",
            "Colorful Style Sheet",
            "Common Style Sheet"
        ]
    },
    {
        num: 3,
        question: "What does PHP stand for?",
        answer: "Hypertext Preprocessor",
        options: [
            "Hypertext Preprocessor",
            "Hypertext Programming",
            "Hometext Preprocessor",
            "Hypertext Preprogramming"
        ]
    },
    {
        num: 4,
        question: "What does XML stand for?",
        answer: "eXtensible Markup Language",
        options: [
            "eXTra Multi-Program Language",
            "eXecutable Multiple Language",
            "eXtensible Markup Language",
            "eXamine Multiple Language"
        ]
    },
    {
        num: 5,
        question: "What does SQL stand for?",
        answer: "Structured Query Language",
        options: [
            "Statement Question Language",
            "Stylesheet Query Language",
            "Stylish Question Language",
            "Structured Query Language"
        ]
    }
];

total_q.innerText = questions.length;
total_que_r.innerText = questions.length;

let que_index = 0;
let right_answers = 0;
let wrong_answers = 0;
count_que.innerText = que_index + 1;
ShowQuestion(que_index);

start_btn.onclick = () => {
    quiz_box.classList.remove("inactive");
    start_btn.classList.add("inactive");
};

next_btn.onclick = () => {
    que_index++;

    if (questions.length > que_index) {
        count_que.innerText = que_index + 1;
        ShowQuestion(que_index);
    } else {
        quiz_box.classList.add("inactive");
        result_box.classList.remove("inactive");
        right_ans_r.innerText = right_answers;
        wrong_ans_r.innerText = wrong_answers;
        percentage.innerText = ((right_answers * 100) / questions.length).toFixed(2) + "%";
    }

    if (questions.length - 1 === que_index) {
        next_btn.innerText = "Finish";
    }
};

function ShowQuestion(q_index) {
    que_text.innerText = questions[q_index].num + ". " + questions[q_index].question;
    let option_statement = "";
    for (let i = 0; i < questions[q_index].options.length; i++) {
        option_statement += `<div class="option">${questions[q_index].options[i]}</div>`;
    }

    options_box.innerHTML = option_statement;

    const AllOptions = options_box.querySelectorAll(".option");
    for (let j = 0; j < AllOptions.length; j++) {
        AllOptions[j].setAttribute("onclick", "UserAnswer(this)");
    }
    next_btn.classList.add("inactive");
}

function UserAnswer(answer) {
    const userAns = answer.innerText;
    const correctAns = questions[que_index].answer;
    const AllOptions = options_box.querySelectorAll(".option");

    next_btn.classList.remove("inactive");
    if (userAns === correctAns) {
        answer.classList.add("correct");
        answer.insertAdjacentHTML("beforeend", mark_check);
        right_answers++;
    } else {
        answer.classList.add("incorrect");
        answer.insertAdjacentHTML("beforeend", mark_wrong);
        wrong_answers++;

        for (let i = 0; i < AllOptions.length; i++) {
            if (AllOptions[i].innerText === correctAns) {
                AllOptions[i].classList.add("correct");
                AllOptions[i].insertAdjacentHTML("beforeend", mark_check);
            }
        }
    }

    for (let j = 0; j < AllOptions.length; j++) {
        AllOptions[j].classList.add("disabled");
    }
}

again_quiz.onclick = () => {
    quiz_box.classList.remove("inactive");
    result_box.classList.add("inactive");
    reset();
};

exit.onclick = () => {
    start_btn.classList.remove("inactive");
    result_box.classList.add("inactive");
    reset();
};

function reset() {
    que_index = 0;
    right_answers = 0;
    wrong_answers = 0;
    next_btn.innerText = "Next Question";
    count_que.innerText = que_index + 1;
    ShowQuestion(que_index);
}