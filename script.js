// script.js

// ページが読み込まれたときに既存のTO DOをロード
document.addEventListener('DOMContentLoaded', () => {
    loadTodos();
});

// 新しいTO DOを追加する関数
function addTodo() {
    const todoText = document.getElementById('todoInput').value; // TO DO のテキストを取得
    const todoColor = document.getElementById('colorPicker').value; // 選択した色を取得
    if (todoText === '') return; // テキストが空の場合は何もしない

    const todo = {
        text: todoText,
        color: todoColor,
        completed: false
    };

    saveTodoToLocalStorage(todo); // ローカルストレージに保存
    appendTodoToDOM(todo); // DOMに追加
    document.getElementById('todoInput').value = ''; // 入力フィールドをクリア
}

// TO DO をローカルストレージに保存する関数
function saveTodoToLocalStorage(todo) {
    const todos = getTodosFromLocalStorage(); // ローカルストレージから既存のTO DOを取得
    todos.push(todo); // 新しいTO DO を追加
    localStorage.setItem('todos', JSON.stringify(todos)); // 更新されたTO DOを保存
}

// ローカルストレージからTO DOを取得する関数
function getTodosFromLocalStorage() {
    const todos = localStorage.getItem('todos'); // ローカルストレージからTO DOを取得
    return todos ? JSON.parse(todos) : []; // TO DOが存在する場合はパースして返す、存在しない場合は空の配列を返す
}

// TO DO をDOMに追加する関数
function appendTodoToDOM(todo) {
    const todoContainer = document.getElementById('todoContainer'); // TO DO コンテナを取得

    const todoCard = document.createElement('div'); // TO DO カードを作成
    todoCard.className = 'todoCard';
    todoCard.style.backgroundColor = todo.color; // カードの背景色を設定

    const todoText = document.createElement('p'); // TO DO テキストを作成
    todoText.textContent = todo.text;
    if (todo.completed) {
        todoCard.classList.add('completed'); // 完了したTO DO のスタイルを適用
    }

    // ボタン用コンテナを作成
    const buttonContainer = document.createElement('div');
    buttonContainer.className = 'todoButtons';

    // 完了ボタンを作成
    const completeBtn = document.createElement('button');
    completeBtn.className = 'completeBtn';
    completeBtn.textContent = 'comp';
    completeBtn.onclick = () => { // 完了ボタンがクリックされたときの処理
        todo.completed = !todo.completed; // 完了状態をトグル
        updateTodoInLocalStorage(todo); // ローカルストレージを更新
        todoCard.classList.toggle('completed'); // カードのスタイルを更新
    };

    // 削除ボタンを作成
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'deleteBtn';
    deleteBtn.textContent = 'del';
    deleteBtn.onclick = () => { // 削除ボタンがクリックされたときの処理
        removeTodoFromLocalStorage(todo); // ローカルストレージから削除
        todoContainer.removeChild(todoCard); // DOMからカードを削除
    };

    buttonContainer.appendChild(completeBtn); // ボタン用コンテナに完了ボタンを追加
    buttonContainer.appendChild(deleteBtn); // ボタン用コンテナに削除ボタンを追加

    todoCard.appendChild(todoText); // カードにテキストを追加
    todoCard.appendChild(buttonContainer); // カードにボタン用コンテナを追加
    todoContainer.appendChild(todoCard); // カードをコンテナに追加
}

// ページロード時にローカルストレージからTO DOを読み込み、DOMに表示する関数
function loadTodos() {
    const todos = getTodosFromLocalStorage(); // ローカルストレージからTO DOを取得
    todos.forEach(todo => appendTodoToDOM(todo)); // 各TO DO をDOMに追加
}

// ローカルストレージのTO DO を更新する関数
function updateTodoInLocalStorage(updatedTodo) {
    const todos = getTodosFromLocalStorage(); // ローカルストレージからTO DOを取得
    const todoIndex = todos.findIndex(todo => todo.text === updatedTodo.text); // 更新するTO DO のインデックスを取得
    if (todoIndex > -1) {
        todos[todoIndex] = updatedTodo; // TO DO を更新
        localStorage.setItem('todos', JSON.stringify(todos)); // 更新されたTO DOを保存
    }
}

// ローカルストレージからTO DO を削除する関数
function removeTodoFromLocalStorage(todoToRemove) {
    let todos = getTodosFromLocalStorage(); // ローカルストレージからTO DOを取得
    todos = todos.filter(todo => todo.text !== todoToRemove.text); // 削除するTO DOをフィルタリング
    localStorage.setItem('todos', JSON.stringify(todos)); // 更新されたTO DOを保存
}