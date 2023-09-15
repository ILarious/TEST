# Тест


## Требования

- Python версии 3.9 и выше 
- Зависимости перечисленны в файле `requirements.txt`

---

## Документация

https://github.com/ILarious/TEST/tree/test_V1/docs

---

## Структура проекта

```
project/
    ├── backend/
    │   ├── alembic/
    │   │   ├── versions/
    │   │   ├── env.py
    │   │   └── ...
    │   ├── api/
    │   │   ├── crud/
    │   │   │   ├── employee.py
    │   │   │   └── task.py
    │   │   └── routers/
    │   │       ├── employee.py
    │   │       └── task.py
    │   ├── config/
    │   │   └── config.py
    │   ├── core/
    │   │   └── database.py
    │   ├── models/
    │   │   └── models.py
    │   ├── schemes/
    │   │   └── schemes.py
    │   ├── alembic.ini
    │   └── main.py
    │
    ├── frontend/
    │   ├── css/
    │   │   ├── body.css
    │   │   ├── edit.css
    │   │   ├── header.css
    │   │   ├── menu.css
    │   │   └── tree.css 
    │   ├── js/
    │   │   ├── drag-and-drop.js
    │   │   ├── edit.js
    │   │   ├── employee.js
    │   │   ├── main.js
    │   │   ├── menu.js
    │   │   └── tree.js 
    │   ├── static/
    │   │   └── images
    │   └── index.html
    │
    ├── env.example
    ├── .gitignore
    ├── db_dump.sql
    ├── docker-compose.yml
    ├── README.md
    └── requirements.txt
```

---

## Установка

1. **Клонировать репозиторий:**

   ```bash
   git clone https://github.com/ILarious/TEST.git
   ```

2. **Создать и активировать виртуальное окружение:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # Для Linux/macOS
   venv\Scripts\activate     # Для Windows
   ```
3. **Установить зависимости:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Переменные окружения**

Создать файл .env и добавить переменные окружения согласно .env.example
(можно использовать переменные из файла .env.example, но файл необходимо переименовать в .env)

5. **Создание Docker контейнера с PostgreSQL**

- Убедитесь, что Docker установлен и запущен на вашей машине.

- Перейдите в корневой каталог вашего проекта, где находится файл `docker-compose.yml`.

- Запустите Docker контейнер с PostgreSQL с помощью следующей команды:

   ```bash
   docker-compose up -d
   ```
   Это создаст и запустит контейнеры PostgreSQL и выполнит настройку базы данных.

   Чтобы остановить контейнеры, выполните команду:

   ```bash
   docker-compose down
   ```

---
## Запуск

1. Запустить файл main.py
2. Открыть index.html в браузере
