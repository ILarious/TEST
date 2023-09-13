.. highlight:: javascript

======================
Документация frontend/js/edit.js
======================




Этот документ содержит обзор и документацию к файлу `edit.js`_.

.. _`edit.js`: https://github.com/ILarious/TEST/blob/main/frontend/js/edit.js

Функция editTask
----------------

.. code:: javascript

    function editTask(task_id) {
        // Открывает модальное окно для редактирования задачи
        OpenEditTask();

        // Отправляет GET-запрос для получения данных задачи по идентификатору
        sendRequest('GET', `${taskRequestURL + task_id}/`)
            .then(dataTask => {
                // Выбирает исполнителя задачи
                selectEmployee(dataTask);

                // Форматирует дату завершения задачи
                let date = new Date(dataTask.deadline);
                let year = date.getFullYear();
                let month = (date.getMonth() + 1).toString().padStart(2, '0');
                let day = date.getDate().toString().padStart(2, '0');
                date = `${year}-${month}-${day}`;

                // Инициализирует кнопки редактирования и удаления
                let editBtn = document.querySelector('#edit__btn');
                let deleteBtn = document.querySelector('#delete__btn');

                // Заполняет поля формы данными о задаче
                document.querySelector('#taskTitleEdit').value = dataTask.title;
                document.querySelector('#taskDeadlineEdit').value = date;
                document.querySelector('#taskStatusEdit').value = dataTask.status;

                // Добавляет обработчики событий для кнопок редактирования и удаления
                editBtn.addEventListener('click', () => putTask(dataTask));
                deleteBtn.addEventListener('click', () => deleteTask(dataTask));
            })
            .catch(err => console.log(err));
    }

- Функция `editTask` открывает модальное окно для редактирования задачи.
- Она отправляет GET-запрос для получения данных о задаче по её идентификатору.
- Функция форматирует дату завершения задачи и заполняет поля формы данными.
- Также добавляются обработчики событий для кнопок редактирования и удаления.

Функция OpenEditTask
--------------------

.. code:: javascript

    function OpenEditTask() {
        // Переключает видимость модального окна редактирования задачи
        document.getElementsByClassName('modal__edit')[0].classList.toggle('modal__edit__active');
    }

- Функция `OpenEditTask` переключает видимость модального окна редактирования задачи.

Функция CloseEditTask
---------------------

.. code:: javascript

    function CloseEditTask() {
        // Переключает видимость модального окна редактирования задачи
        document.getElementsByClassName('modal__edit')[0].classList.toggle('modal__edit__active');
    }

- Функция `CloseEditTask` аналогична `OpenEditTask`, но скрывает модальное окно.

Функция putTask
----------------

.. code:: javascript

    function putTask(dataTask) {
        // Получает данные задачи из полей формы
        let taskTitle = document.querySelector('#taskTitleEdit').value;
        let taskDeadline = document.querySelector('#taskDeadlineEdit').value;
        let taskStatus = document.querySelector('#taskStatusEdit').value;
        let taskAssignee = document.querySelector('#taskAssigneeEdit').value;
        let parent_id = dataTask.parent_id;

        // Формирует тело запроса
        let body = {
            title: `${taskTitle}`,
            parent_id: parent_id,
            assignee_id: taskAssignee,
            deadline: `${taskDeadline}`,
            status: `${taskStatus}`
        };

        // Отправляет PUT-запрос для обновления задачи
        sendRequest('PUT', `${taskRequestURL + dataTask.id}/`, body)
            .then(data => {
                console.log(data);
                location.reload();
                alert('Задача изменена');
            })
            .catch(err => console.log(err));
    }

- Функция `putTask` получает данные задачи из полей формы.
- Она формирует тело запроса и отправляет PUT-запрос для обновления задачи.
- После успешного обновления страница перезагружается и выводится уведомление.

Функция deleteTask
-------------------

.. code:: javascript

    function deleteTask(dataTask) {
        // Запрашивает подтверждение перед удалением задачи
        let res = confirm("Подтвердите удаление");
        if (res) {
            // Отправляет DELETE-запрос для удаления задачи
            sendRequest('DELETE', `${taskRequestURL + dataTask.id}/`)
                .then(data => {
                    console.log(data);
                    location.reload();
                    alert('Задача удалена');
                })
                .catch(err => console.log(err));
        }
    }

- Функция `deleteTask` запрашивает подтверждение перед удалением задачи.
- Если подтверждено, то отправляется DELETE-запрос для удаления задачи.
- После удаления страница перезагружается и выводится уведомление.

Функция OpenEditEmployee
-------------------------

.. code:: javascript

    function OpenEditEmployee() {
        // Переключает видимость модального окна редактирования данных сотрудника
        document.getElementsByClassName('modal__edit__employee')[0].classList.toggle('modal__edit__active');
    }

- Функция `OpenEditEmployee` переключает видимость модального окна редактирования данных сотрудника.

Функция CloseEditEmployee
--------------------------

.. code:: javascript

    function CloseEditEmployee() {
        // Переключает видимость модального окна редактирования данных сотрудника
        document.getElementsByClassName('modal__edit__employee')[0].classList.toggle('modal__edit__active');
    }

- Функция `CloseEditEmployee` аналогична `OpenEditEmployee`, но скрывает модальное окно.

Функция putEmployee
--------------------

.. code:: javascript

    function putEmployee(data) {
        // Получает данные сотрудника из полей формы
        let fullName = document.querySelector('#employeeFullNameEdit').value;
        let position = document.querySelector('#employeePositionEdit').value;

        // Формирует тело запроса
        let body = {
            full_name: `${fullName}`,
            position: `${position}`
        };

        // Отправляет PUT-запрос для обновления данных сотрудника
        sendRequest('PUT', `${EmployeeRequestURL + data.id}/`, body)
            .then(data => {
                console.log(data);
                location.reload();
                alert(`Данные сотрудника - ${data.full_name} (id:${data.id}) изменены`);
            })
            .catch(err => console.log(err));
    }

- Функция `putEmployee` получает данные сотрудника из полей формы.
- Она формирует тело запроса и отправляет PUT-запрос для обновления данных сотрудника.
- После успешного обновления страница перезагружается и выводится уведомление.

Функция deleteEmployee
-----------------------

.. code:: javascript

    function deleteEmployee(data) {
        // Запрашивает подтверждение перед удалением сотрудника
        let res = confirm(`Подтвердите удаление сотрудника ${data.full_name} (id:${data.id})`);
        if (res) {
            // Отправляет DELETE-запрос для удаления сотрудника
            sendRequest('DELETE', `${EmployeeRequestURL + data.id}/`)
                .then(data => {
                    console.log(data);
                    location.reload();
                    alert(`Cотрудник ${data.full_name} (id:${data.id}) удален`);
                })
                .catch(err => console.log(err));
        }
    }

- Функция `deleteEmployee` запрашивает подтверждение перед удалением сотрудника.
- Если подтверждено, то отправляется DELETE-запрос для удаления сотрудника.
- После удаления страница перезагружается и выводится уведомление.

Обратите внимание, что код использует внешние функции, такие как `sendRequest` и `selectEmployee`, которые не предоставлены в этом фрагменте кода. Убедитесь, что эти функции доступны и корректно работают в вашем приложении.
