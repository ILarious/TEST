// Переменная для хранения перетаскиваемой задачи
let draggedTask = null;

// Обработчик события "dragstart"
document.addEventListener("dragstart", function (event) {
    // Сохраняем ссылку на перетаскиваемую задачу
    draggedTask = event.target;
    // Устанавливаем данные для перетаскивания (ID задачи)
    event.dataTransfer.setData("text/plain", event.target.id);
    // Добавляем класс "dragging" для визуальной подсветки перетаскиваемого элемента
    event.target.classList.add("dragging");
});

// Обработчик события "dragover"
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
    }
});

// Обработчик события "dragleave"
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
    }
});

// Обработчик события "drop"
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
    }

    // Проверяем, есть ли ID перетаскиваемой задачи
    let taskId = event.dataTransfer.getData("text/plain");
    let targetTask = event.target.closest("[id]");
    let targetTaskId;

    if (taskId && targetTask) {
        // Получаем ID целевой задачи
        targetTaskId = targetTask.getAttribute("id");
    }

    // Если целевая задача - корневая задача, устанавливаем targetTaskId в null
    if (targetTaskId === 'tree__root') {
        targetTaskId = null;
    }

    // Если есть ID задачи и целевой элемент соответствует .tree__node, .task__content или H3
    if (taskId && (event.target.classList.contains("tree__node") || event.target.classList.contains("task__content") || event.target.tagName === "H3")) {
        // Находим элемент с заданным ID
        const draggedElement = document.getElementById(taskId);

        if (draggedElement) {
            // Перемещаем задачу внутрь элемента "ul"
            targetElement.appendChild(draggedElement);
            // Вызываем функцию для обновления родительской задачи
            updateTaskParent(targetTaskId, taskId);
        }
    }

    // Удаляем стили подсветки при выходе из зоны целевого элемента или его потомков
    if (event.target.classList.contains("li__task") || event.target.closest(".li__task")) {
        const liTask = event.target.classList.contains("li__task") ? event.target : event.target.closest(".li__task");
        liTask.classList.remove("dragover");
    }

    if (event.target.classList.contains("tree__node")) {
        event.target.classList.remove("dragover");
    }
});

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

// Функция для обновления ID родительской задачи
function updateParentId(taskId, body) {
    sendRequest('PUT', `${taskRequestURL + taskId}/`, body)
        .then(data => {
            console.log(data);
        })
        .catch(err => console.log(err));
}
