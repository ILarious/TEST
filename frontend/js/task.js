const taskRequestURL = 'http://127.0.0.1:8000/tasks/'


function getTasks() {
    sendRequest('GET', taskRequestURL)
        .then(data => {
            console.log(data)
            buildTree(data)
        })
        .catch(err => console.log(err))
}


function buildTree(data) {
    const treeRoot = document.getElementById('tree-root')

    function buildLevel(parentId, parentElement) {
        const childTasks = data.filter(task => task.parent_id === parentId);

        if (childTasks.length === 0) {
            return;
        }

        const ul = document.createElement('ul');
        parentElement.appendChild(ul);

        childTasks.forEach(task => {
            const li = document.createElement('li');
            li.textContent = task.title;
            ul.appendChild(li);

            // Рекурсивно вызываем функцию для построения подзадач
            buildLevel(task.id, li);
        });
    }

    buildLevel(null, treeRoot)
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