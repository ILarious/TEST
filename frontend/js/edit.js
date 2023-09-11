function editTask(task_id) {
    OpenEditTask()
    sendRequest('GET', `${taskRequestURL+task_id}/`)
        .then(dataTask => {
            selectEmployee()

            let date = new Date(dataTask.deadline);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');

            date = `${year}-${month}-${day}`;

            console.log(dataTask)
            document.querySelector('#taskTitleEdit').value = dataTask.title
            document.querySelector('#taskDeadlineEdit').value = date
            document.querySelector('#taskStatusEdit').value = dataTask.status
            document.querySelector('#taskAssigneeEdit').value = test(dataTask.assignee_id)

        })
        .catch(err => console.log(err))
}

function OpenEditTask() {
    document.getElementsByClassName('modal__edit')[0].classList.toggle('modal__edit__active')
}


function CloseEditTask() {
    document.getElementsByClassName('modal__edit')[0].classList.toggle('modal__edit__active')
}

function test(id) {
    select1 = document.getElementsByClassName('taskAssignee')[1];
    for (let i = 0; i < select1.options.length; i++) {
    if (select1.options[i].value === id) {
        select1.options[i].selected = true;
        break;
    }
}
}