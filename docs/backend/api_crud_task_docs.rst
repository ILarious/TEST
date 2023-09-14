.. highlight:: python

======================
Документация backend/api/crud/task.py
======================

Этот документ содержит обзор и документацию к файлу `crud/task.py`_.

.. _`crud/task.py`: https://github.com/ILarious/TEST/blob/test_V1/backend/api/crud/task.py



crud_create_task
================

.. code:: python

    async def crud_create_task(new_task: TaskCreate, db: AsyncSession):
        db_task = models.Task(**new_task.dict())
        db.add(db_task)
        await db.commit()
        await db.refresh(db_task)
        return db_task

Описание
--------

- Функция `crud_create_task` предназначена для создания новой задачи в базе данных и возврата созданной задачи.
- Она принимает два аргумента: `new_task` (данные новой задачи) и `db` (сессия базы данных).
- Функция выполняет следующие действия:
 1. Создает экземпляр модели "Задача" (`db_task`) на основе данных новой задачи.
 2. Добавляет задачу в сессию базы данных (`db`).
 3. Сохраняет изменения в базе данных.
 4. Обновляет объект задачи (`db_task`) с данными из базы данных.
 5. Возвращает созданную задачу.

crud_get_tasks
==============

.. code:: python

    async def crud_get_tasks(db: AsyncSession, skip: int = 0, limit: int = 10):
        query = (
            select(models.Task)
            .offset(skip)
            .limit(limit)
            .order_by(models.Task.id)
            .options(selectinload(models.Task.assignee))
        )
        response = await db.execute(query)
        return response.scalars().all()

Описание
--------

- Функция `crud_get_tasks` предназначена для получения списка задач с пагинацией и возврата списка задач.
- Она принимает три аргумента: `db` (сессия базы данных), `skip` (количество пропускаемых записей) и `limit` (максимальное количество записей).
- Функция выполняет следующие действия:
 1. Строит запрос для выборки задач из базы данных с учетом пагинации и порядка сортировки.
 2. Выполняет запрос к базе данных и возвращает список задач.

crud_get_task
=============

.. code:: python

    async def crud_get_task(db: AsyncSession, task_id: int):
        query = (
            select(models.Task)
            .where(models.Task.id == task_id)
            .options(selectinload(models.Task.assignee))
        )
        response = await db.scalars(query)
        return response.first()

Описание
--------

- Функция `crud_get_task` предназначена для получения информации о задаче по ее идентификатору и возврата задачи.
- Она принимает два аргумента: `db` (сессия базы данных) и `task_id` (идентификатор задачи).
- Функция выполняет следующие действия:
 1. Строит запрос для выборки задачи из базы данных по ее идентификатору.
 2. Выполняет запрос к базе данных и возвращает найденную задачу или None, если задача не найдена.

crud_update_task
================

.. code:: python

    async def crud_update_task(db: AsyncSession, task_id: int, task: TaskUpdate):
        query = (
            select(models.Task)
            .where(models.Task.id == task_id)
            .options(selectinload(models.Task.assignee))
        )
        db_task = await db.scalars(query)
        db_task = db_task.first()
        if db_task:
            for attr, value in task.dict().items():
                setattr(db_task, attr, value)
            await db.commit()
            await db.refresh(db_task)
        return db_task

Описание
--------

- Функция `crud_update_task` предназначена для обновления информации о задаче по ее идентификатору и возврата обновленной задачи.
- Она принимает три аргумента: `db` (сессия базы данных), `task_id` (идентификатор задачи) и `task` (данные для обновления задачи).
- Функция выполняет следующие действия:
 1. Строит запрос для выборки задачи из базы данных по ее идентификатору.
 2. Получает задачу из базы данных.
 3. Обновляет атрибуты задачи на основе данных из запроса.
 4. Сохраняет изменения в базе данных.
 5. Обновляет объект задачи с данными из базы данных.
 6. Возвращает обновленную задачу или None, если задача не найдена.

crud_delete_task
===============

.. code:: python

    async def crud_delete_task(db: AsyncSession, task_id: int):
        query = (
            select(models.Task)
            .where(models.Task.id == task_id)
            .options(selectinload(models.Task.assignee))
        )
        db_task = await db.scalars(query)
        db_task = db_task.first()
        if db_task:
            await db.delete(db_task)
            await db.commit()
        return db_task

Описание
--------

- Функция `crud_delete_task` предназначена для удаления задачи по ее идентификатору и возврата удаленной задачи.
- Она принимает два аргумента: `db` (сессия базы данных) и `task_id` (идентификатор задачи).
- Функция выполняет следующие действия:
 1. Строит запрос для выборки задачи из базы данных по ее идентификатору.
 2. Получает задачу из базы данных.
 3. Удаляет задачу из базы данных.
 4. Сохраняет изменения в базе данных.
 5. Возвращает удаленную задачу или None, если задача не найдена.

