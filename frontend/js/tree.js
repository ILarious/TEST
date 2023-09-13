// URL для отправки запросов на сервер для получения задач
const taskRequestURL = 'http://127.0.0.1:8000/tasks/';

// Функция для получения задач и сотрудников и построения древовидной структуры
function getTasks() {
    // Отправляем GET-запрос для получения задач
    sendRequest('GET', taskRequestURL)
        .then(dataTasks => {
            // Отправляем GET-запрос для получения данных о сотрудниках
            sendRequest('GET', EmployeeRequestURL)
                .then(dataEmployee => {
                    // Построение древовидной структуры на основе полученных данных
                    buildTree(dataTasks, dataEmployee);
                })
        })
        .catch(err => console.log(err));
}

// Функция для создания новой задачи
function createTask() {
    // Получаем значения полей для создания задачи из формы
    let TaskTitle = document.querySelector('#taskTitle').value;
    let TaskAssignee = document.querySelector('#taskAssignee').value;
    let TaskDeadline = document.querySelector('#taskDeadline').value;
    let TaskStatus = document.querySelector('#taskStatus').value;

    // Создаем тело запроса для создания задачи
    let body = {
        title: `${TaskTitle}`,
        assignee_id: `${TaskAssignee}`,
        parent_id: null,
        deadline: `${TaskDeadline}`,
        status: `${TaskStatus}`
    }

    // Отправляем POST-запрос на сервер для создания задачи
    sendRequest('POST', taskRequestURL, body)
        .then(data => {
            console.log(data);
            alert('Задача создана');
            location.reload(); // Перезагрузка страницы после создания задачи
        })
        .catch(err => console.log(err));

    // Очищаем поля ввода после отправки запроса
    document.querySelector('#taskTitle').value = '';
    document.querySelector('#taskAssignee').value = '';
    document.querySelector('#taskDeadline').value = '';
    document.querySelector('#taskStatus').value = '';
}

// Функция для построения древовидной структуры задач
function buildTree(dataTasks, dataEmployee) {
    const treeRoot = document.getElementById('tree__root');

    function buildLevel(parentId, parentElement) {
        // Фильтруем задачи, которые являются дочерними для заданного родителя
        let childTasks = dataTasks.filter(task => task.parent_id === parentId);

        if (childTasks.length === 0) {
            return;
        }

        // Создаем элементы списка и древовидной структуры
        let ul = document.createElement('ul');
        parentElement.appendChild(ul);

        childTasks.forEach(task => {
            // Создаем элемент задачи
            let li = document.createElement('li');
            let div = document.createElement('div');
            let h3 = document.createElement('h3');
            let line = document.createElement('div');
            let assignee = dataEmployee.filter(item => item.id === task.assignee_id)

            // Определяем сотрудника, назначенного на задачу, и его статус
            if (assignee.length === 0) {
                assignee = 'Не назначен';
            } else {
                assignee = assignee[0].full_name;
            }
            let edit = document.createElement('img');

            let date = new Date(task.deadline);
            let year = date.getFullYear();
            let month = (date.getMonth() + 1).toString().padStart(2, '0');
            let day = date.getDate().toString().padStart(2, '0');
            date = `${day}.${month}.${year}`;

            let status = task.status;

            // Настройка элементов и их свойств
            edit.src = 'static/edit.png';
            edit.alt = 'edit';
            edit.onclick = () => editTask(task.id);
            edit.classList.add('edit');
            div.classList.add('task__content');
            li.id = task.id;
            li.draggable = true;
            li.classList.add('li__task');
            line.classList.add('line');

            // Заполняем содержимое элемента задачи
            h3.textContent =
                `Задача: ${task.title}
Сотрудник: ${assignee}
Дедлайн: ${date}
Статус: ${status}`

            // Добавляем элементы в древовидную структуру
            ul.appendChild(li);
            li.appendChild(div);
            li.appendChild(line);
            div.appendChild(h3);
            div.appendChild(edit);

            // Рекурсивно строим дочерние задачи
            buildLevel(task.id, li);
        });
    }

    // Начинаем построение древовидной структуры с корневого элемента
    buildLevel(null, treeRoot);
}
