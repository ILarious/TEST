const taskRequestURL = 'http://127.0.0.1:8000/tasks/'
const treeContainer = document.getElementById('tree-container');

function getTasks() {
    sendRequest('GET', taskRequestURL)
        .then(data => {
            console.log(data)
            buildTree(data, treeContainer, null)
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


function buildTree(data) {
    const treeRoot = document.getElementById('tree-root');


    function buildLevel(parentId, parentElement) {
        const childTasks = data.filter(task => task.parent_id === parentId);

        if (childTasks.length === 0) {
            return;
        }

        const ul = document.createElement('ul');
        parentElement.appendChild(ul);

        childTasks.forEach(task => {
            const li = document.createElement('li');
            const div = document.createElement('div');
            const h3 = document.createElement('h3');
            const line = document.createElement('div');
            const date = new Date(task.deadline);
            const assignee = sendRequest('GET', `${EmployeeRequestURL + task.assignee_id}`)
                .then(response => console.log(response))
                .catch(err => console.log(err));

            console.log(assignee.full_name)

            div.classList.add('task__content');
            line.classList.add('line');

            h3.textContent =
                `Задача: ${task.title} 
Сотрудник: ${assignee}
Дедлайн: ${date.getDay()}.${date.getMonth()}.${date.getFullYear()}`
            ul.appendChild(li);
            li.appendChild(div);
            div.appendChild(h3);

            // Рекурсивно вызываем функцию для построения подзадач
            buildLevel(task.id, li);
        });
    }

    // Начинаем с корневого уровня (если у вас есть корневая задача)
    buildLevel(null, treeRoot);
}