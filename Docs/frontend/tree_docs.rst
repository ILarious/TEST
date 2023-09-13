.. highlight:: javascript

======================
Документация frontend/js/tree.js
======================

Этот документ содержит обзор и документацию к файлу `tree.js`_.

.. _`tree.js`: https://github.com/ILarious/TEST/blob/main/frontend/js/tree.js


Функция getTasks
================

.. code:: javascript

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

Описание
--------

- Функция `getTasks` предназначена для получения задач и сотрудников с сервера и построения древовидной структуры на веб-странице.
- Она выполняет следующие действия:
  1. Отправляет GET-запрос на сервер для получения данных о задачах.
  2. После получения данных о задачах, отправляет GET-запрос на сервер для получения данных о сотрудниках.
  3. После получения данных о сотрудниках, вызывает функцию `buildTree` для построения древовидной структуры задач.

Функция createTask
==================

.. code:: javascript

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

Описание
--------

- Функция `createTask` предназначена для создания новой задачи на веб-странице.
- Она выполняет следующие действия:
  1. Получает значения полей для создания задачи из соответствующих полей ввода формы.
  2. Создает тело запроса для отправки POST-запроса на сервер с данными для создания задачи.
  3. Отправляет POST-запрос на сервер для создания задачи с указанными данными.
  4. После успешного создания задачи, выводит сообщение об успешном создании и перезагружает страницу.
  5. Очищает поля ввода после отправки запроса.

Функция buildTree
==================

.. code:: javascript

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

Описание
--------

- Функция `buildTree` предназначена для построения древовидной структуры задач на веб-странице на основе данных о задачах и сотрудниках.
- Она принимает два аргумента: `dataTasks` (данные о задачах) и `dataEmployee` (данные о сотрудниках).
- Функция выполняет следующие действия:
  1. Фильтрует задачи, которые являются дочерними для заданного родителя (начиная с корневой задачи).
  2. Создает элементы списка и древовидной структуры для задач.
  3. Для каждой задачи создает элемент задачи с информацией о ней.
  4. Определяет сотрудника, назначенного на задачу, и его статус.
  5. Добавляет элементы задачи в древовидную структуру.
  6. Рекурсивно строит дочерние задачи для каждой задачи.

Примечания
----------

- Функция `buildTree` предполагает, что на веб-странице существует корневой элемент с id `tree__root`, в который будут добавляться элементы древовидной структуры задач.
- Для работы данной функции также необходимо иметь соответствующую HTML-структуру с элементами для отображения задач и их детей.
