const requestURL = 'http://127.0.0.1:8000/employees/'

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

    console.log(EmployeeName, EmployeePosition)

    let body = {
        full_name: `${EmployeeName}`,
        position: `${EmployeePosition}`
    }

    console.log(JSON.stringify(body))

    sendRequest('POST', requestURL, body)
        .then(data => console.log(data))
        .catch(err => console.log(err))

    document.querySelector('#employeeFullName').value = ''
    document.querySelector('#employeePosition').value = ''
}