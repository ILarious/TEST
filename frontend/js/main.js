// Функция sendRequest принимает метод (GET, POST, и так далее), URL и необязательное тело запроса (по умолчанию null)
function sendRequest(method, url, body = null) {
    // Создаем новый Promise, который позволит асинхронно обрабатывать результаты запроса
    return new Promise((resolve, reject) => {
        // Создаем объект XMLHttpRequest для выполнения HTTP-запроса
        const xhr = new XMLHttpRequest();

        // Открываем соединение с заданным методом и URL
        xhr.open(method, url);

        // Устанавливаем ожидаемый тип ответа на JSON
        xhr.responseType = 'json';

        // Устанавливаем заголовок Content-Type как application/json, чтобы указать тип отправляемых данных
        xhr.setRequestHeader('Content-Type', 'application/json');

        // Обработчик события загрузки (получения ответа от сервера)
        xhr.onload = () => {
            // Если статус ответа от сервера больше или равен 400 (ошибочный статус), то вызываем reject с ответом
            if (xhr.status >= 400) {
                reject(xhr.response);
            } else {
                // В противном случае вызываем resolve с данными ответа
                resolve(xhr.response);
            }
        };

        // Обработчик события ошибки
        xhr.onerror = () => {
            // В случае ошибки также вызываем reject с ответом
            reject(xhr.response);
        };

        // Отправляем запрос на сервер с преобразованным в JSON телом запроса
        xhr.send(JSON.stringify(body));
    });
}