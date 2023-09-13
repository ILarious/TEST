.. highlight:: javascript

======================
Документация frontend/js/employee.js
======================

Этот документ содержит обзор и документацию к файлу `employee.js`_.

.. _`employee.js`: https://github.com/ILarious/TEST/blob/main/frontend/js/employee.js



Функция createEmployee
======================

.. code:: javascript

    function createEmployee() {
        // Получаем данные о сотруднике из введенных полей
        let EmployeeName = document.querySelector('#employeeFullName').value;
        let EmployeePosition = document.querySelector('#employeePosition').value;

        // Создаем объект body для отправки на сервер
        let body = {
            full_name: `${EmployeeName}`,
            position: `${EmployeePosition}`
        };

        // Отправляем POST-запрос для создания сотрудника
        sendRequest('POST', EmployeeRequestURL, body)
            .then(data => {
                // Выводим информацию о созданном сотруднике и его ID
                console.log(data);
                alert(`Сотрудник ${data.full_name} (id:${data.id}) создан`);
            })
            .catch(err => console.log(err));

        // Очищаем поля ввода
        document.querySelector('#employeeFullName').value = '';
        document.querySelector('#employeePosition').value = '';
    }

Функция populateSelectWithOptions
=================================

.. code:: javascript

    function populateSelectWithOptions(selectElement, options, id, defaultValue) {
        // Удаляем все существующие опции из выпадающего списка
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

Функция selectEmployee
=======================

.. code:: javascript

    function selectEmployee(dataTask = null) {
        // Отправляем GET-запрос для получения данных о сотрудниках
        sendRequest('GET', EmployeeRequestURL)
            .then(data => {
                // Создаем список опций на основе данных о сотрудниках
                let options = data.map(item => `${item.full_name} (id:${item.id})`);
                let id = data.map(item => item.id);

                // Получаем элементы выпадающих списков
                let select0 = document.getElementsByClassName('taskAssignee')[0];
                populateSelectWithOptions(select0, options, id);

                let select1 = document.getElementsByClassName('taskAssignee')[1];
                populateSelectWithOptions(select1, options, id, dataTask ? dataTask.assignee_id : null);

                let select2 = document.getElementsByClassName('taskAssignee')[2];
                populateSelectWithOptions(select2, options, id);
            })
            .catch(err => console.log(err))
    }

Примечания
==========

- Для корректной работы этого кода необходимо наличие HTML-элементов с определенными id и классами на веб-странице.
- Функция sendRequest используется для отправки HTTP-запросов и должна быть предварительно определена.
