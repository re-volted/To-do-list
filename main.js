const thingsToDo = [];
const thingsDone = [];

const input = document.querySelector('input');
const submitBtn = document.querySelector('.submitBtn');
const doneBtn = document.querySelector('button.doneBtn');
const deleteBtn = document.querySelector('button.deleteBtn');
const ulToDo = document.querySelector('#ulToDo');
const ulDone = document.querySelector('#ulDone');

const labelToDo = document.querySelector('.todo label');
const labelDone = document.querySelector('.done label');
let liToDoList = [...document.querySelectorAll('#ulToDo li')];
let liDoneList = [...document.querySelectorAll('#ulDone li')];


function updateLiToDoList() {
    liToDoList = [...document.querySelectorAll('#ulToDo li')];
}

function updateLiDoneList() {
    liDoneList = [...document.querySelectorAll('#ulDone li')];
}

input.addEventListener('input', (e) => {
    e.target.value ? submitBtn.classList.add('activeBtn') : submitBtn.classList.remove('activeBtn');
})

// adding new case
function submit() {
    if (!input.value) {
        return alert("You have to write the thing to do first!");
    } else {
        thingsToDo.push(input.value);
        const index = thingsToDo.findIndex(item => item === input.value);
        const thingToDo = document.createElement('li');
        thingToDo.textContent = thingsToDo[index];
        ulToDo.appendChild(thingToDo);
        input.value = "";
        liToDoList = [...document.querySelectorAll('#ulToDo li')];
    }
    submitBtn.classList.remove('activeBtn');
    liToDoList.length ? labelToDo.style.display = "none" : labelDone.style.display = "inline-block";
}

function enterSubmit(e) {
    if (e.keyCode === 13) {
        submit();
    }
}

submitBtn.addEventListener('click', submit);
input.addEventListener('keypress', enterSubmit);

// activation of things to do
ulToDo.addEventListener('click', (e) => {
    let isAnyActive = false;
    if (e.target !== ulToDo) {
        e.target.classList.toggle('active');
        updateLiToDoList();
        for (let i = 0; i < liToDoList.length; i++) {
            if (liToDoList[i].classList.contains('active')) {
                isAnyActive = true;
            }
        }
        isAnyActive ? doneBtn.classList.add('activeBtn') : doneBtn.classList.remove('activeBtn');

    }
})


// activation of things done
ulDone.addEventListener('click', (e) => {
    let isAnyActive = false;
    if (e.target !== ulDone) {
        e.target.classList.toggle('active');
        updateLiDoneList();
        for (let i = 0; i < liDoneList.length; i++) {
            if (liDoneList[i].classList.contains('active')) {
                isAnyActive = true;
            }
        }
        isAnyActive ? deleteBtn.classList.add('activeBtn') : deleteBtn.classList.remove('activeBtn');
    };

})

// clicking inactive button

doneBtn.addEventListener('click', function () {
    if (!liToDoList.length) {
        alert('There are no cases to be done!');
    } else if (!(this.classList.contains('activeBtn'))) {
        alert('You need to tick the case first!')
    };
})

deleteBtn.addEventListener('click', function () {
    if (!liDoneList.length) {
        alert('There are no cases done to be deleted!');
    } else if (!(this.classList.contains('activeBtn'))) {
        alert('You need to tick the case first!')
    };
})

// making things "done"
doneBtn.addEventListener("click", (e) => {
    liToDoList.forEach(li => {
        if (li.classList.contains('active')) {
            const newLi = document.createElement('li');
            newLi.textContent = li.textContent;
            newLi.style.textDecoration = "line-through";
            ulDone.appendChild(newLi);
            thingsDone.push(newLi.textContent);
            updateLiDoneList();
            const index = thingsToDo.findIndex(item => item === li.textContent);
            thingsToDo.splice(index, 1);
            li.remove();
            doneBtn.classList.toggle('activeBtn');
        }
    })
    updateLiToDoList();
    updateLiDoneList();
    liToDoList.length ? labelToDo.style.display = "none" : labelToDo.style.display = "inline-block";
    liDoneList.length ? labelDone.style.display = "none" : labelDone.style.display = "inline-block";
})

// deleting done things
deleteBtn.addEventListener("click", (e) => {
    liDoneList.forEach(li => {
        if (li.classList.contains('active')) {
            const index = thingsDone.findIndex(item => item === li.textContent);
            thingsDone.splice(index, 1);
            li.remove();
            deleteBtn.classList.toggle('activeBtn');
        }
    })
    updateLiDoneList();
    liDoneList.length ? labelDone.style.display = "none" : labelDone.style.display = "inline-block";
})

// // input width
// let containerWidth = document.querySelector('.container').getBoundingClientRect().width;
// let inputLabelWidth = document.querySelector('.desc label').getBoundingClientRect().width + 16;
// let submitButtonWidth = addCaseBtn.getBoundingClientRect().width;
// let inputWidth = containerWidth - inputLabelWidth - submitButtonWidth - 16;
// input.style.width = `${inputWidth}px`;

// window.addEventListener('resize', () => {
//     containerWidth = document.querySelector('.container').getBoundingClientRect().width;
//     inputLabelWidth = document.querySelector('.desc label').getBoundingClientRect().width + 16;
//     submitButtonWidth = addCaseBtn.getBoundingClientRect().width;
//     inputWidth = containerWidth - inputLabelWidth - submitButtonWidth - 16;
//     console.log(inputWidth);
//     input.style.width = `${inputWidth}px`;
// })