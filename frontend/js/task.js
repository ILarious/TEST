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
            alert('Задача создана')
            location.reload()
        })
        .catch(err => console.log(err))

    document.querySelector('#taskTitle').value = ''
    document.querySelector('#taskAssignee').value = ''
    document.querySelector('#taskDeadline').value = ''
    document.querySelector('#taskStatus').value = ''

}

function buildTree(dataTasks, dataEmployee) {
    const treeRoot = document.getElementById('tree__root');


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
            let assignee = dataEmployee.filter(item => item.id === task.assignee_id)

            if (assignee.length === 0) {
                assignee = 'Не назначен'
            } else {
                assignee = assignee[0].full_name
            }
            let edit = document.createElement('img');

            let date = new Date(task.deadline);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            date = `${day}.${month}.${year}`;

            let status = task.status

            edit.src = 'static/edit.png';
            edit.alt = 'edit';
            edit.onclick = () => editTask(task.id);
            edit.classList.add('edit');
            div.classList.add('task__content');
            li.id = task.id;
            li.draggable = true;
            li.classList.add('li__task');
            line.classList.add('line');


            h3.textContent =
`Задача: ${task.title}
Сотрудник: ${assignee}
Дедлайн: ${date}
Статус: ${status}`


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