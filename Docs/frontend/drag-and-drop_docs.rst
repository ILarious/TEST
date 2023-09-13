.. highlight:: javascript

======================
Документация frontend/js/drag-and-drop.js
======================

Этот документ содержит обзор и документацию к файлу `drag-and-drop.js`_.

.. _`drag-and-drop.js`: https://github.com/ILarious/TEST/blob/main/frontend/js/drag-and-drop.js

Перетаскивание задач в интерфейсе
-----------------------------------

Этот скрипт реализует функциональность перетаскивания задач в интерфейсе.

Обработчик события "dragstart"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: javascript

    // Переменная для хранения перетаскиваемой задачи
    let draggedTask = null;

    document.addEventListener("dragstart", function (event) {
        // Сохраняем ссылку на перетаскиваемую задачу
        draggedTask = event.target;
        // Устанавливаем данные для перетаскивания (ID задачи)
        event.dataTransfer.setData("text/plain", event.target.id);
        // Добавляем класс "dragging" для визуальной подсветки перетаскиваемого элемента
        event.target.classList.add("dragging");

Этот обработчик события активируется при начале перетаскивания задачи. Он сохраняет ссылку на перетаскиваемую задачу и устанавливает данные для перетаскивания.

Обработчик события "dragover"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: javascript

    document.addEventListener("dragover", function (event) {
        event.preventDefault();

        // Если целевым элементом является .tree__node, то добавляем класс "dragover" для подсветки
        if (event.target.classList.contains("tree__node")) {
            event.target.classList.add("dragover");
        }

        // Если целевым элементом является .li__task или его потомок
        if (event.target.classList.contains("li__task") || event.target.closest(".li__task")) {
            // Находим все элементы <div> внутри <li>
            const divElements = event.target.querySelectorAll(".li__task div");

            // Если нет элементов <div>, добавляем класс "dragover" для подсветки
            if (divElements.length === 0) {
                const liTask = event.target.classList.contains("li__task") ? event.target : event.target.closest(".li__task");
                liTask.classList.add("dragover");
            }

Этот обработчик события активируется, когда перетаскиваемый элемент находится над другим элементом. Он предотвращает стандартное действие и добавляет класс "dragover" для подсветки целевого элемента.

Обработчик события "dragleave"
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: javascript

    document.addEventListener("dragleave", function (event) {
        // Если целевым элементом является .tree__node, то убираем класс "dragover" для снятия подсветки
        if (event.target.classList.contains("tree__node")) {
            event.target.classList.remove("dragover");
        }

        // Если целевым элементом является .li__task или его потомок
        if (event.target.classList.contains("li__task") || event.target.closest(".li__task")) {
            // Находим все элементы <div> внутри <li>
            const divElements = event.target.querySelectorAll(".li__task div");

            // Если нет элементов <div>, удаляем класс "dragover" для снятия подсветки
            if (divElements.length === 0) {
                const liTask = event.target.classList.contains("li__task") ? event.target : event.target.closest(".li__task");
                liTask.classList.remove("dragover");
            }

Этот обработчик события активируется, когда перетаскиваемый элемент покидает другой элемент. Он убирает класс "dragover" для снятия подсветки целевого элемента.

Обработчик события "drop"
^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: javascript

    document.addEventListener("drop", function (event) {
        event.preventDefault();

        // Находим ближайший дочерний элемент типа "ul" к месту, где произошел drop
        let targetElement = event.target.parentElement.parentElement.querySelector("ul");

        // Если не удалось найти "ul" и целевой элемент соответствует задаче или заголовку задачи
        if (!targetElement
            && (event.target.classList.contains("task__content") || event.target.tagName === "H3")
            && !event.target.classList.contains("li__task")) {

            // Находим родительский элемент задачи
            let parentElement = event.target.parentElement;
            if (parentElement.classList.contains("task__content")) {
                parentElement = parentElement.parentElement;
            }
            // Создаем новый элемент "ul" и добавляем его в родительский элемент
            targetElement = document.createElement("ul");
            parentElement.appendChild(targetElement);
        }

        // Если не удалось найти "ul" и целевой элемент не соответствует задаче, .tree__node, .line, .edit или .li__task
        if (!targetElement
            && !event.target.classList.contains("tree__node")
            && !event.target.classList.contains("line")
            && !event.target.classList.contains("edit")
            && !event.target.classList.contains("li__task")) {
            let eventTarget = event.target;

            // Создаем новый элемент "ul" и добавляем его к целевому элементу
            targetElement = document.createElement("ul");
            eventTarget.appendChild(targetElement);

Этот обработчик события активируется, когда выполняется drop перетаскиваемого элемента. Он предотвращает стандартное действие и обновляет интерфейс, перемещая задачу в целевой элемент.

Функция `updateTaskParent`
^^^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: javascript

    // Функция для обновления родительской задачи
    function updateTaskParent(parentId, taskId) {
        sendRequest('GET', `${taskRequestURL + taskId}/`)
            .then(data => {
                let TaskTitle = data.title;
                let TaskAssignee = data.assignee_id;
                let TaskDeadline = data.deadline;
                let TaskStatus = data.status;
                let TaskParentId = parseInt(parentId);

                let body = {
                    title: `${TaskTitle}`,
                    assignee_id: TaskAssignee,
                    parent_id: TaskParentId,
                    deadline: `${TaskDeadline}`,
                    status: `${TaskStatus}`
                };

                // Вызываем функцию для обновления родительской задачи
                updateParentId(taskId, body);
            })
            .catch(err => console.log(err));
    }

Эта функция отправляет GET-запрос для получения данных о задаче и обновляет информацию о родительской задаче на основе полученных данных.

Функция `updateParentId`
^^^^^^^^^^^^^^^^^^^^^^^^

.. code:: javascript

    // Функция для обновления ID родительской задачи
    function updateParentId(taskId, body) {
        sendRequest('PUT', `${taskRequestURL + taskId}/`, body)
            .then(data => {
                console.log(data);
            })
            .catch(err => console.log(err));
    }

Эта функция отправляет PUT-запрос для обновления идентификатора родительской задачи.

Примечания
^^^^^^^^^^

- Для корректной работы этого скрипта необходимо наличие элементов с классами `.tree__node`, `.li__task`, `.task__content`, `.line` и `.edit` на веб-странице.
- Функции `sendRequest` используются для отправки HTTP-запросов и должны быть предварительно определены.

Пример использования
^^^^^^^^^^^^^^^^^^^^

Чтобы включить функциональность перетаскивания задач, необходимо вставить этот JavaScript код в вашу веб-страницу. После этого, задачи можно будет перетаскивать в интерфейсе вашего приложения.
