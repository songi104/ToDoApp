const createBtn = document.getElementById('create-btn');
const list = document.getElementById('list');

let todos = [];
createBtn.onclick = createNewTodo;


function createNewTodo() {
    console.log('click!');

    // Data 생성하기
    const item = {
        id: new Date().getTime(),
        text: '',
        complete: false
    }
    todos.unshift(item);

    // 요소 생성하기
    const {itemEl, inputEl, editBtnEl, removeBtnEl} = createTodoElment(item);

    //리스트 요소에 방금 생성한 아이템 추가
    list.prepend(itemEl);

    inputEl.removeAttribute('disabled');
    inputEl.focus();

    // local database에 저장
    saveToLocalStorage();

}

function createTodoElment(item) {
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const checkboxEl = document.createElement('input');
    checkboxEl.type = 'checkbox';
    checkboxEl.checked = item.complete;

    if (item.complete) {
        itemEl.classList.add('complete');
    }

    const inputEl = document.createElement('input');
    inputEl.type= 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const editBtnEl = document.createElement('button');
    editBtnEl.classList.add('material-icons');
    editBtnEl.innerText = 'edit';

    const removeBtnEl = document.createElement('button');
    removeBtnEl.classList.add('material-icons', 'remove-btn');
    removeBtnEl.innerText = 'remove_circles';

    // input 적을 시 내용 변경
    inputEl.addEventListener('input', () => {
        item.text = inputEl.value;
        saveToLocalStorage();
    })
    inputEl.addEventListener('blur', () => {
        inputEl.setAttribute('disabled', '');
    })

    // check박스
    checkboxEl.addEventListener('change', () => {
        item.complete = checkboxEl.checked;
        if (item.complete) {
            itemEl.classList.add('complete');
        } else {
            itemEl.classList.remove('complete');
        }
        saveToLocalStorage();
    })

    // actions 함수
    editBtnEl.addEventListener('click', () => {
        inputEl.removeAttribute('disabled');
        inputEl.focus();
        saveToLocalStorage();
    })

    removeBtnEl.addEventListener('click', () => {
        // id가 다른 것만 배열로 새롭게 반환
        todos = todos.filter(t => t.id !== item.id);
        itemEl.remove();
        saveToLocalStorage();
    })

    // class 구조 정리
    itemEl.append(checkboxEl);
    itemEl.append(inputEl);
    actionsEl.append(editBtnEl);
    actionsEl.append(removeBtnEl);
    itemEl.append(actionsEl);

    return {itemEl, inputEl, editBtnEl, removeBtnEl}
}

function saveToLocalStorage() {
    const data = JSON.stringify(todos);
    window.localStorage.setItem('my_todos', data);
}

function loadFromLocalStorage() {
    const data = localStorage.getItem('my_todos');
    if (data) {
        todos = JSON.parse(data);
    }
}

function displayTodos() {
    loadFromLocalStorage();
    for (let todo of todos) {
        const {itemEl} = createTodoElment(todo);
        list.append(itemEl);
    }
}

displayTodos();