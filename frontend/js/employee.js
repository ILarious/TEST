const EmployeeRequestURL = 'http://127.0.0.1:8000/employees/'

function createEmployee() {
    let EmployeeName = document.querySelector('#employeeFullName').value
    let EmployeePosition = document.querySelector('#employeePosition').value

    let body = {
        full_name: `${EmployeeName}`,
        position: `${EmployeePosition}`
    }

    console.log(JSON.stringify(body))

    sendRequest('POST', EmployeeRequestURL, body)
        .then(data => {
            console.log(data)
            alert(`Сотрудник ${data.full_name} (id:${data.id}) создан`)
        })
        .catch(err => console.log(err))

    document.querySelector('#employeeFullName').value = ''
    document.querySelector('#employeePosition').value = ''
}


function populateSelectWithOptions(selectElement, options, id, defaultValue) {
    while (selectElement.options.length > 0) {
        selectElement.options.remove(0);
    }

    for (let i = 0; i < options.length; i++) {
        let option = document.createElement('option');

        option.value = id[i];
        if (defaultValue !== null && defaultValue == id[i]) {
            option.selected = true;
        }
        option.text = options[i];
        selectElement.options.add(option);
    }
}


function selectEmployee(dataTask = null) {
    sendRequest('GET', EmployeeRequestURL)
        .then(data => {

            let options = data.map(item => `${item.full_name} (id:${item.id})`)
            let id = data.map(item => item.id)

            let select0 = document.getElementsByClassName('taskAssignee')[0];
            populateSelectWithOptions(select0, options, id);

            let select1 = document.getElementsByClassName('taskAssignee')[1];
            populateSelectWithOptions(select1, options, id, dataTask ? dataTask.assignee_id : null);

            let select2 = document.getElementsByClassName('taskAssignee')[2];
            populateSelectWithOptions(select2, options, id);

        })
        .catch(err => console.log(err))
}