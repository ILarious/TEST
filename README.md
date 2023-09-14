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
    ├── README.md
    └── requirements.txt
```

---

## Установка

1. **Клонировать репозиторий:**

   ```bash
   git clone https://github.com/ILarious/TEST.git
   ```
   
   Переключиться на ветку test_V1

   ```bash
   git checkout test_V1
   git pull origin test_V1
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


   * Добавить переменные окружения согласно .env.example




5. **Создание Docker контейнера с PostgreSQL**

   ```bash
   docker run --name my_postgres \
   -e POSTGRES_DB=db_test \
   -e POSTGRES_USER=postgres \
   -e POSTGRES_PASSWORD=postgres \
   -p 5432:5432 \
   -d postgres:latest
   ```
---
   * --name my_postgres: Задает имя контейнера как "my_postgres". Вы можете выбрать любое имя, которое вам нравится.
   * -e POSTGRES_DB=db_test: Устанавливает имя базы данных в "db_test".
   * -e POSTGRES_USER=postgres: Устанавливает имя пользователя PostgreSQL в "postgres".
   * -e POSTGRES_PASSWORD=postgres: Устанавливает пароль пользователя PostgreSQL в "postgres".
   * -p 5432:5432: Прокидывает порт 5432 контейнера (стандартный порт PostgreSQL) на порт 5432 вашей локальной машины.
   * -d postgres:latest: Запускает контейнер с образом PostgreSQL версии "latest".
---

6. **Создать базу данных и применить миграции:**
   ```bash
   alembic upgrade head
   ```


---
## Запуск

1. Запустить файл main.py
2. Открыть index.html в браузере
