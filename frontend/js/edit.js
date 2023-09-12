function editTask(task_id) {
    OpenEditTask()
    sendRequest('GET', `${taskRequestURL + task_id}/`)
        .then(dataTask => {

            selectEmployee(dataTask)

            let date = new Date(dataTask.deadline);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            date = `${year}-${month}-${day}`;

            let editBtn = document.querySelector('#edit__btn');

            let deleteBtn = document.querySelector('#delete__btn');


            console.log(dataTask)
            document.querySelector('#taskTitleEdit').value = dataTask.title
            document.querySelector('#taskDeadlineEdit').value = date
            document.querySelector('#taskStatusEdit').value = dataTask.status


            editBtn.addEventListener('click', () => putTask(dataTask));
            deleteBtn.addEventListener('click', () => deleteTask(dataTask));

        })
        .catch(err => console.log(err))
}

function OpenEditTask() {
    document.getElementsByClassName('modal__edit')[0].classList.toggle('modal__edit__active')
}


function CloseEditTask() {
    document.getElementsByClassName('modal__edit')[0].classList.toggle('modal__edit__active')
}


function putTask(dataTask) {
    let taskTitle = document.querySelector('#taskTitleEdit').value
    let taskDeadline = document.querySelector('#taskDeadlineEdit').value
    let taskStatus = document.querySelector('#taskStatusEdit').value
    let taskAssignee = document.querySelector('#taskAssigneeEdit').value
    let parent_id = dataTask.parent_id

    let body = {
        title: `${taskTitle}`,
        parent_id: parent_id,
        assignee_id: taskAssignee,
        deadline: `${taskDeadline}`,
        status: `${taskStatus}`
    }

    sendRequest('PUT', `${taskRequestURL + dataTask.id}/`, body)
        .then(data => {
            console.log(data)
            location.reload()
            alert('Задача изменена')

        })
        .catch(err => console.log(err))
}


function deleteTask(dataTask) {
    let res = confirm("Подтвердите удаление")
    if (res) {
        sendRequest('DELETE', `${taskRequestURL + dataTask.id}/`)
            .then(data => {
                    console.log(data)
                    location.reload()
                    alert('Задача удалена')
                }
            )
            .catch(err => console.log(err))
    }
}

function editEmployee() {
    OpenEditEmployee()
    selectEmployee()
    let employeeSelector = document.querySelector('#employeeAssigneeEdit')
    let editBtn = document.querySelector('#edit__btn__employee');
    let deleteBtn = document.querySelector('#delete__btn__employee');

    function getIdEmployee() {
        let employee_id = document.querySelector('#employeeAssigneeEdit').value

        return employee_id
    }

    employeeSelector.addEventListener('change', () => {
        sendRequest('GET', `${EmployeeRequestURL + getIdEmployee()}/`)
            .then(data => {
                console.log(data)
                document.querySelector('#employeeFullNameEdit').value = data.full_name
                document.querySelector('#employeePositionEdit').value = data.position
            })
            .catch(err => console.log(err))
    })


    editBtn.addEventListener('click', () => {
        sendRequest('GET', `${EmployeeRequestURL + getIdEmployee()}/`)
            .then(data => {
                putEmployee(data)
            })
            .catch(err => console.log(err))
    });

    deleteBtn.addEventListener('click', () => {
        sendRequest('GET', `${EmployeeRequestURL + getIdEmployee()}/`)
            .then(data => {
                deleteEmployee(data)
            })
            .catch(err => console.log(err))
    });
}


function putEmployee(data) {
    let fullName = document.querySelector('#employeeFullNameEdit').value
    let position = document.querySelector('#employeePositionEdit').value

    let body = {
        full_name: `${fullName}`,
        position: `${position}`
    }

    sendRequest('PUT', `${EmployeeRequestURL + data.id}/`, body)
        .then(data => {
            console.log(data)
            location.reload()
            alert(`Данные сотрудника - ${data.full_name} (id:${data.id}) изменены`)

        })
        .catch(err => console.log(err))
}

function deleteEmployee(data) {
    let res = confirm(`Подтвердите удаление сотрудника ${data.full_name} (id:${data.id})`)
    if (res) {
        sendRequest('DELETE', `${EmployeeRequestURL + data.id}/`)
            .then(data => {
                    console.log(data)
                    location.reload()
                    alert(`Cотрудник ${data.full_name} (id:${data.id}) удален`)
                }
            )
            .catch(err => console.log(err))
    }
}


function OpenEditEmployee() {
    document.getElementsByClassName('modal__edit__employee')[0].classList.toggle('modal__edit__active')
}


function CloseEditEmployee() {
    document.getElementsByClassName('modal__edit__employee')[0].classList.toggle('modal__edit__active')
}