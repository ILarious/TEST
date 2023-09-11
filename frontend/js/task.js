const taskRequestURL = 'http://127.0.0.1:8000/tasks/'

function getTasks() {
    sendRequest('GET', taskRequestURL)
        .then(dataTasks => {
            sendRequest('GET', EmployeeRequestURL).then( dataEmployee => {
                buildTree(dataTasks, dataEmployee)
            })
        })
        .catch(err => console.log(err))
}

function createTask() {
    let TaskTitle = document.querySelector('#taskTitle').value
    let TaskAssignee = document.querySelector('#taskAssignee').value
    let TaskDeadline = document.querySelector('#taskDeadline').value
    let TaskStatus = document.querySelector('#taskStatus').value

    let body = {
        title: `${TaskTitle}`,
        assignee_id: `${TaskAssignee}`,
        parent_id: null,
        deadline: `${TaskDeadline}`,
        status: `${TaskStatus}`
    }

    sendRequest('POST', taskRequestURL, body)
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))

    document.querySelector('#taskTitle').value = ''
    document.querySelector('#taskAssignee').value = ''
    document.querySelector('#taskDeadline').value = ''
    document.querySelector('#taskStatus').value = ''

}

function editTask(task_id) {
    sendRequest('GET', `${taskRequestURL+task_id}`)
        .then(dataTask => {

        })
        .catch(err => console.log(err))
}


function buildTree(dataTasks, dataEmployee) {
    const treeRoot = document.getElementById('tree-root');


    function buildLevel(parentId, parentElement) {
        let childTasks = dataTasks.filter(task => task.parent_id === parentId);

        if (childTasks.length === 0) {
            return;
        }

        let ul = document.createElement('ul');
        parentElement.appendChild(ul);

        childTasks.forEach(task => {

            let li = document.createElement('li');
            let div = document.createElement('div');
            let h3 = document.createElement('h3');
            let line = document.createElement('div');
            let date = new Date(task.deadline);
            let assignee = dataEmployee.filter(item => item.id === task.assignee_id)
            let edit = document.createElement('img');

            edit.src = 'static/edit.png';
            edit.alt = 'edit';
            edit.onclick = () => editTask(task.id);
            edit.classList.add('edit');
            div.classList.add('task__content');
            line.classList.add('line');

            h3.textContent =
`Задача: ${task.title} 
Сотрудник: ${assignee[0].full_name}
Дедлайн: ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`

            ul.appendChild(li);
            li.appendChild(div);
            li.appendChild(line);
            div.appendChild(h3);
            div.appendChild(edit);

            // Рекурсивно вызываем функцию для построения подзадач
            buildLevel(task.id, li);
        });
    }

    // Начинаем с корневого уровня (если у вас есть корневая задача)
    buildLevel(null, treeRoot);
}


getTasks();