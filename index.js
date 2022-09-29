console.log("hello, vanilla.");

const input = document.querySelector('.input-form')

const inputNumber = document.querySelector(".inputNumber");
const countAttempt = input.querySelector('span');
const submitContent = document.querySelector('.information');
const submitStrikeBall = document.querySelector('.information span');
const startBtn = document.querySelector('#gamestart');
const replaytBtn = document.querySelector('.replay');

let numberArray = [0,1,2,3,4,5,6,7,8,9];
let answerNum = [];
let count = 0;



// 중복숫자 발생하지 않도록 3자리 숫자 뽑고 answerNum 에 넣어준다.
function answernumb(){
    for (let i = 0; i < 3; i++){

        let numbers = numberArray.splice(Math.floor(Math.random() * (numberArray.length-i)),1)[0];
        answerNum.push(numbers);

    }
    alert('⚾');
    console.log(answerNum);
}


//  input 창의 입력값이 3자리가 아니면 알림창을 띄워주고 
//  3자리라면 displayInput을 실행한다.
//  Play 버튼을 누르기 전이라면 누르고 게임이 진행될 수 있도록 알림창을 띄워준다.
//  총 기회는 10번.
function handleSubmit(event){
    let inputValue = inputNumber.value;
    //input창 초기화 
    inputNumber.value = "";
    event.preventDefault();

    while(count < 10){
        if(inputValue.length !== 3) {
            alert('3자리 숫자를 입력하세요');
        }
        else if (Array.isArray(answerNum) && answerNum.length === 0){
            alert('Start 버튼을 먼저 누르시오')
            inputValue = "";
        }
        else {
            count ++;
            displayInput(inputValue);
            countAttempt.textContent = `총 ${count}번 시도하셨습니다.`;
        }
        break;

    }

    if (count >= 10){
        countAttempt.textContent = `😭기회를 모두 사용했습니다😭 정답은 ${answerNum.join('')}`;
        submitContent.textContent = `REPLAY 버튼을 눌러주세요`;
        submitContent.style.color = "red";
      }
}

// input 입력값을 화면에 나타내주는 함수.
function displayInput(items){

    const number = document.createElement('p');
    submitContent.appendChild(number);
    number.innerText = `${items}`;
    const num = items.split('');
    displayHint(num);

}

//strike와 ball의 갯수를 보여주는 힌트를 화면에 출력해준다.
function displayHint(num){

    let strikes = 0;
    let balls = 0;

    for(let i =0; i < answerNum.length; i++){
        for(let j =0; j< num.length; j++){
            if((answerNum[i] == num[j]) && (i == j)){
                strikes++;
            }
            else if((answerNum[i] == num[j]) && (i != j)){
                balls++;
            }

        } submitStrikeBall.textContent = `${strikes} Strike ${balls} Ball`;

    }

    if(strikes === 3){
        const answer = answerNum.join('');
        alert(`정답은 ${answer} 홈런입니다👏👏👏`)
        window.location.reload();
    }
}


function init(){
    startBtn.addEventListener('click',answernumb,{once:true});
    input.addEventListener('submit',handleSubmit);
    replaytBtn.addEventListener('click',function(){
    window.location.reload();})
}

init();





