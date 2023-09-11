const EmployeeRequestURL = 'http://127.0.0.1:8000/employees/'

function sendRequest(method, url, body = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.open(method, url)

        xhr.responseType = 'json'
        xhr.setRequestHeader('Content-Type', 'application/json')

        xhr.onload = () => {
            if (xhr.status >= 400) {
                reject(xhr.response)
            } else {
                resolve(xhr.response)
            }
        }

        xhr.onerror = () => {
            reject(xhr.response)
        }

        xhr.send(JSON.stringify(body))
    })
}

function createEmployee() {
    let EmployeeName = document.querySelector('#employeeFullName').value
    let EmployeePosition = document.querySelector('#employeePosition').value

    let body = {
        full_name: `${EmployeeName}`,
        position: `${EmployeePosition}`
    }

    console.log(JSON.stringify(body))

    sendRequest('POST', EmployeeRequestURL, body)
        .then(data => console.log(data))
        .catch(err => console.log(err))

    document.querySelector('#employeeFullName').value = ''
    document.querySelector('#employeePosition').value = ''
}


function selectEmployee() {
    sendRequest('GET', EmployeeRequestURL)
        .then(data => {

            let options = data.map(item => `${item.full_name} (id:${item.id})`)
            let id = data.map(item => item.id)


            function populateSelectWithOptions(selectElement, options, ids) {
                while (selectElement.options.length > 0) {
                    selectElement.options.remove(0);
                }

                for (let i = 0; i < options.length; i++) {
                    let option = document.createElement('option');
                    option.value = ids[i];
                    option.text = options[i];
                    selectElement.options.add(option);
                }
            }

            // Применяем функцию для select0
            let select0 = document.getElementsByClassName('taskAssignee')[0];
            populateSelectWithOptions(select0, options, id);

            // Применяем функцию для select1
            let select1 = document.getElementsByClassName('taskAssignee')[1];
            populateSelectWithOptions(select1, options, id);


        })
        .catch(err => console.log(err))
}