// URL для отправки запросов на сервер для создания сотрудников
const EmployeeRequestURL = 'http://127.0.0.1:8000/employees/';

// Функция для создания нового сотрудника
function createEmployee() {
    // Получаем значения полей ввода из формы
    let EmployeeName = document.querySelector('#employeeFullName').value;
    let EmployeePosition = document.querySelector('#employeePosition').value;

    // Создаем тело запроса, содержащее имя и должность сотрудника
    let body = {
        full_name: `${EmployeeName}`,
        position: `${EmployeePosition}`
    }

    // Отправляем POST-запрос на сервер для создания сотрудника
    sendRequest('POST', EmployeeRequestURL, body)
        .then(data => {
            // Выводим данные о созданном сотруднике в консоль и всплывающем окне
            console.log(data);
            alert(`Сотрудник ${data.full_name} (id:${data.id}) создан`);
        })
        .catch(err => console.log(err));

    // Очищаем поля ввода после отправки запроса
    document.querySelector('#employeeFullName').value = '';
    document.querySelector('#employeePosition').value = '';
}

// Функция для заполнения выпадающего списка сотрудников
function populateSelectWithOptions(selectElement, options, id, defaultValue) {
    // Удаляем существующие опции из выпадающего списка
    while (selectElement.options.length > 0) {
        selectElement.options.remove(0);
    }

    // Создаем новые опции на основе переданных данных
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

// Функция для выбора сотрудника из выпадающего списка
function selectEmployee(dataTask = null) {
    // Отправляем GET-запрос на сервер для получения данных о сотрудниках
    sendRequest('GET', EmployeeRequestURL)
        .then(data => {
            // Создаем массив опций и массив идентификаторов сотрудников из полученных данных
            let options = data.map(item => `${item.full_name} (id:${item.id})`);
            let id = data.map(item => item.id);

            // Получаем ссылки на выпадающие списки и заполняем их опциями
            let select0 = document.getElementsByClassName('taskAssignee')[0];
            populateSelectWithOptions(select0, options, id);

            let select1 = document.getElementsByClassName('taskAssignee')[1];
            populateSelectWithOptions(select1, options, id, dataTask ? dataTask.assignee_id : null);

            let select2 = document.getElementsByClassName('taskAssignee')[2];
            populateSelectWithOptions(select2, options, id);
        })
        .catch(err => console.log(err));
}
