const input = document.querySelector('input');
const submitBtn = document.querySelector('.submitBtn');

const toDo = {
    button: document.querySelector(`.toDo button`),
    selectAll: document.querySelector('.toDo img'),
    ul: document.querySelector('.toDo ul'),
    label: document.querySelector('.toDo label'),
    liList: [...document.querySelectorAll('.toDo li')],
    updateLiList: function () {
        return this.liList = [...document.querySelectorAll('.toDo ul li')];
    },
    showListElements: function () {
        if (this.liList.length) {
            this.label.style.display = "none";
            this.selectAll.classList.add('activeImg');
        } else {
            this.label.style.display = "inline-block";
            this.selectAll.classList.remove('activeImg');
        }
    },
    areAllActiveBoolean: false,
    areAllActive: function () {
        this.areAllActiveBoolean = true;
        this.liList.forEach(li => {
            if (!li.classList.contains('active')) {
                this.areAllActiveBoolean = false;
            }
        })
        return this.areAllActiveBoolean;
    },
    selectAllToggle: function () {
        if (this.areAllActiveBoolean) {
            this.selectAll.classList.add('activeImg');
            this.selectAll.classList.remove('allSelectedImg');
        } else {
            this.selectAll.classList.add('allSelectedImg');
            this.selectAll.classList.remove('activeImg');
        }
    },
    isAnyActiveBoolean: false,
    isAnyActive: function () {
        this.isAnyActiveBoolean = false;
        this.liList.forEach(li => {
            if (li.classList.contains('active')) {
                this.isAnyActiveBoolean = true;
            }
        });
        return this.isAnyActiveBoolean;
    },

};

const done = {
    button: document.querySelector(`.done button`),
    selectAll: document.querySelector('.done img'),
    ul: document.querySelector('.done ul'),
    label: document.querySelector('.done label'),
    liList: [...document.querySelectorAll('.done li')],
    updateLiList: function () {
        return done.liList = [...document.querySelectorAll('.done ul li')];
    },
    showListElements: function () {
        if (this.liList.length) {
            this.label.style.display = "none";
            this.selectAll.classList.add('activeImg');
        } else {
            this.label.style.display = "inline-block";
            this.selectAll.classList.remove('activeImg');
        }
    },
    areAllActiveBoolean: false,
    areAllActive: function () {
        this.areAllActiveBoolean = true;
        this.liList.forEach(li => {
            if (!li.classList.contains('active')) {
                this.areAllActiveBoolean = false;
            }
        })
        return this.areAllActiveBoolean;
    },
    selectAllToggle: function () {
        if (this.areAllActiveBoolean) {
            this.selectAll.classList.add('activeImg');
            this.selectAll.classList.remove('allSelectedImg');
        } else {
            this.selectAll.classList.add('allSelectedImg');
            this.selectAll.classList.remove('activeImg');
        }
    },
    isAnyActiveBoolean: false,
    isAnyActive: function () {
        this.isAnyActiveBoolean = false;
        this.liList.forEach(li => {
            if (li.classList.contains('active')) {
                this.isAnyActiveBoolean = true;
            }
        });
        return this.isAnyActiveBoolean;
    },
}

// activation of submit button
input.addEventListener('input', (e) => {
    e.target.value ? submitBtn.classList.add('activeBtn') : submitBtn.classList.remove('activeBtn');
})

// adding new case
function submit() {
    if (!input.value) {
        return alert("You have to write the thing to do first!");
    } else {
        // thingsToDo.push(input.value);
        // const index = thingsToDo.findIndex(item => item === input.value);
        const thingToDo = document.createElement('li');
        // thingToDo.textContent = thingsToDo[index];
        thingToDo.textContent = input.value;
        toDo.ul.appendChild(thingToDo);
        input.value = "";
        toDo.updateLiList();
    }
    submitBtn.classList.remove('activeBtn');
    toDo.showListElements();
    toDo.areAllActive();
    toDo.selectAllToggle();
}

function enterSubmit(e) {
    if (e.keyCode === 13) {
        submit();
    }
}

submitBtn.addEventListener('click', submit);
input.addEventListener('keypress', enterSubmit);

// activation of things to do
toDo.ul.addEventListener('click', (e) => {
    if (e.target !== toDo.ul) {
        e.target.classList.toggle('active');
        toDo.updateLiList();
        toDo.showListElements();
        toDo.areAllActive();
        toDo.selectAllToggle();
        toDo.isAnyActive() ? toDo.button.classList.add('activeBtn') : toDo.button.classList.remove('activeBtn');
    }
})

done.ul.addEventListener('click', (e) => {
    if (e.target !== done.ul) {
        e.target.classList.toggle('active');
        done.updateLiList();
        done.showListElements();
        done.areAllActive();
        done.selectAllToggle();
        done.isAnyActive() ? done.button.classList.add('activeBtn') : done.button.classList.remove('activeBtn');
    }
})

// selecting all
toDo.selectAll.addEventListener('click', function (e) {
    if (toDo.areAllActive()) {
        toDo.liList.forEach(li => li.classList.remove('active'));
        toDo.button.classList.remove('activeBtn');
    } else {
        toDo.liList.forEach(li => li.classList.add('active'));
        toDo.button.classList.add('activeBtn');
    };
    toDo.areAllActive();
    toDo.selectAllToggle();
})

done.selectAll.addEventListener('click', function (e) {
    if (done.areAllActive()) {
        done.liList.forEach(li => li.classList.remove('active'));
        done.button.classList.remove('activeBtn');
    } else {
        done.liList.forEach(li => li.classList.add('active'));
        done.button.classList.add('activeBtn');
    };
    done.areAllActive();
    done.selectAllToggle();
})

// making things "done"
toDo.button.addEventListener("click", function (e) {
    if (!toDo.liList.length) {
        return alert('There are no cases to be done!');
    } else if (!(this.classList.contains('activeBtn'))) {
        return alert('You need to tick the case first!');
    };
    toDo.liList.forEach(li => {
        if (li.classList.contains('active')) {
            const newLi = document.createElement('li');
            newLi.textContent = li.textContent;
            newLi.style.textDecoration = "line-through";
            done.ul.appendChild(newLi);
            // thingsDone.push(newLi.textContent);
            done.updateLiList();
            // const index = thingsToDo.findIndex(item => item === li.textContent);
            // thingsToDo.splice(index, 1);
            li.remove();
            this.classList.remove('activeBtn');
        }
    })
    toDo.updateLiList();
    done.updateLiList();
    toDo.showListElements();
    done.showListElements();
    done.areAllActive();
    done.selectAllToggle();
    if (!toDo.liList.length) {
        toDo.selectAll.classList.remove('activeImg');
        toDo.selectAll.classList.remove('allSelectedImg');
    }
})

// deleting done things
done.button.addEventListener("click", function (e) {
    if (!done.liList.length) {
        return alert('There are no cases done to be deleted!');
    } else if (!(this.classList.contains('activeBtn'))) {
        return alert('You need to tick the case first!')
    };
    done.liList.forEach(li => {
        if (li.classList.contains('active')) {
            // const index = thingsDone.findIndex(item => item === li.textContent);
            // thingsDone.splice(index, 1);
            li.remove();
            done.button.classList.remove('activeBtn');
        }
    })
    done.updateLiList();
    done.showListElements();
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