let draggedTask = null;

document.addEventListener("dragstart", function (event) {
    // Сохраняем ссылку на перетаскиваемую задачу
    draggedTask = event.target;
    event.dataTransfer.setData("text/plain", event.target.id);
    event.target.classList.add("dragging");
});


document.addEventListener("dragover", function (event) {
    event.preventDefault();

    // Если целевым элементом является .tree__node, то добавьте класс dragover для подсветки
    if (event.target.classList.contains("tree__node")) {
        event.target.classList.add("dragover");
    }

    if (event.target.classList.contains("li__task") || event.target.closest(".li__task")) {
        // Находим все элементы <div> внутри <li>
        const divElements = event.target.querySelectorAll(".li__task div");

        // Если нет элементов <div>, добавляем класс dragover для подсветки
        if (divElements.length === 0) {
            const liTask = event.target.classList.contains("li__task") ? event.target : event.target.closest(".li__task");
            liTask.classList.add("dragover");
        }
    }
});

document.addEventListener("dragleave", function (event) {
    // Если целевым элементом является .tree__node, то уберите класс dragover для снятия подсветки
    if (event.target.classList.contains("tree__node")) {
        event.target.classList.remove("dragover");
    }

    if (event.target.classList.contains("li__task") || event.target.closest(".li__task")) {
        // Находим все элементы <div> внутри <li>
        const divElements = event.target.querySelectorAll(".li__task div");

        // Если нет элементов <div>, удаляем класс dragover для снятия подсветки
        if (divElements.length === 0) {
            const liTask = event.target.classList.contains("li__task") ? event.target : event.target.closest(".li__task");
            liTask.classList.remove("dragover");
        }
    }
});


document.addEventListener("drop", function (event) {
    event.preventDefault();

    // Находим ближайший дочерний элемент типа "ul"
    let targetElement = event.target.parentElement.parentElement.querySelector("ul");


    if (!targetElement
        && (event.target.classList.contains("task__content") || event.target.tagName === "H3")
        && !event.target.classList.contains("li__task")) {

        let parentElement = event.target.parentElement;
        if (parentElement.classList.contains("task__content")) {
            parentElement = parentElement.parentElement;
        }
        targetElement = document.createElement("ul");
        parentElement.appendChild(targetElement);
    }

    if (!targetElement
        && !event.target.classList.contains("tree__node")
        && !event.target.classList.contains("line")
        && !event.target.classList.contains("edit")
        && !event.target.classList.contains("li__task")) {
        let eventTarget = event.target;

        targetElement = document.createElement("ul");
        eventTarget.appendChild(targetElement);

    }

    // Проверяем, что есть ID перетаскиваемой задачи
    let taskId = event.dataTransfer.getData("text/plain");
    let targetTask = event.target.closest("[id]");
    let targetTaskId

    if (taskId && targetTask) {
        targetTaskId = targetTask.getAttribute("id");
    }

    if (targetTaskId === 'tree__root') {
        targetTaskId = null
    }

    if (taskId && (event.target.classList.contains("tree__node") || event.target.classList.contains("task__content") || event.target.tagName === "H3")) {
        // Находим элемент с заданным ID
        const draggedElement = document.getElementById(taskId);

        if (draggedElement) {
            // Перемещаем задачу внутрь <ul>
            targetElement.appendChild(draggedElement);
            updateTaskParent(targetTaskId, taskId);
        }
    }


    // Удаляем стили при выходе из зоны целевого элемента или его потомков
    if (event.target.classList.contains("li__task") || event.target.closest(".li__task")) {
        const liTask = event.target.classList.contains("li__task") ? event.target : event.target.closest(".li__task");
        liTask.classList.remove("dragover");
    }

    if (event.target.classList.contains("tree__node")) {
        event.target.classList.remove("dragover");
    }

});


function updateTaskParent(parentId, taskId) {
    sendRequest('GET', `${taskRequestURL + taskId}/`)
        .then(data => {
            let TaskTitle = data.title
            let TaskAssignee = data.assignee_id
            let TaskDeadline = data.deadline
            let TaskStatus = data.status
            let TaskParentId = parseInt(parentId)

            let body = {
                title: `${TaskTitle}`,
                assignee_id: TaskAssignee,
                parent_id: TaskParentId,
                deadline: `${TaskDeadline}`,
                status: `${TaskStatus}`
            }

            updateParentId(taskId, body)
        })
        .catch(err => console.log(err))
}

function updateParentId(taskId, body) {
    sendRequest('PUT', `${taskRequestURL + taskId}/`, body)
        .then(data => {
            console.log(data)
        })
        .catch(err => console.log(err))
}
