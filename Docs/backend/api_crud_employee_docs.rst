.. highlight:: python

======================
Документация backend/api/crud/employee.py
======================

Этот документ содержит обзор и документацию к файлу `crud/employee.py`_.

.. _`crud/employee.py`: https://github.com/ILarious/TEST/blob/test_V1/backend/api/crud/employee.py



crud_create_employee
====================

.. code:: python

    async def crud_create_employee(new_employee: EmployeeCreate, db: AsyncSession):
        db_employee = models.Employee(**new_employee.dict())
        db.add(db_employee)
        await db.commit()
        await db.refresh(db_employee)

        query = (
            select(models.Employee)
            .where(models.Employee.id == db_employee.id)
            .options(selectinload(models.Employee.tasks))
        )
        db_employee = await db.scalars(query)
        return db_employee.first()

Описание
--------

- Функция `crud_create_employee` предназначена для создания нового сотрудника в базе данных и возврата созданного сотрудника.
- Она принимает два аргумента: `new_employee` (данные нового сотрудника) и `db` (сессия базы данных).
- Функция выполняет следующие действия:
  1. Создает экземпляр модели "Сотрудник" (`db_employee`) на основе данных нового сотрудника.
  2. Добавляет сотрудника в сессию базы данных (`db`).
  3. Сохраняет изменения в базе данных.
  4. Обновляет объект сотрудника (`db_employee`) с данными из базы данных.
  5. Загружает связанные задачи с этим сотрудником.
  6. Возвращает созданного сотрудника.

crud_get_employees
===================

.. code:: python

    async def crud_get_employees(db: AsyncSession, skip: int = 0, limit: int = 10):
        query = (
            select(models.Employee)
            .offset(skip)
            .limit(limit)
            .order_by(models.Employee.id)
            .options(selectinload(models.Employee.tasks))
        )
        response = await db.execute(query)
        return response.scalars().all()

Описание
--------

- Функция `crud_get_employees` предназначена для получения списка сотрудников с пагинацией и возврата списка сотрудников.
- Она принимает три аргумента: `db` (сессия базы данных), `skip` (количество пропускаемых записей) и `limit` (максимальное количество записей).
- Функция выполняет следующие действия:
  1. Строит запрос для выборки сотрудников из базы данных с учетом пагинации и порядка сортировки.
  2. Выполняет запрос к базе данных и возвращает список сотрудников.

crud_get_employee
=================

.. code:: python

    async def crud_get_employee(db: AsyncSession, employee_id: int):
        query = (
            select(models.Employee)
            .where(models.Employee.id == employee_id)
            .options(selectinload(models.Employee.tasks))
        )
        response = await db.scalars(query)
        return response.first()

Описание
--------

- Функция `crud_get_employee` предназначена для получения информации о сотруднике по его идентификатору и возврата сотрудника.
- Она принимает два аргумента: `db` (сессия базы данных) и `employee_id` (идентификатор сотрудника).
- Функция выполняет следующие действия:
  1. Строит запрос для выборки сотрудника из базы данных по его идентификатору.
  2. Выполняет запрос к базе данных и возвращает найденного сотрудника или None, если сотрудник не найден.

crud_update_employee
====================

.. code:: python

    async def crud_update_employee(db: AsyncSession, employee_id: int, employee: EmployeeUpdate):
        query = (
            select(models.Employee)
            .where(models.Employee.id == employee_id)
            .options(selectinload(models.Employee.tasks))
        )
        db_employee = await db.scalars(query)
        db_employee = db_employee.first()
        if db_employee:
            for attr, value in employee.dict().items():
                setattr(db_employee, attr, value)
            await db.commit()
            await db.refresh(db_employee)
        return db_employee

Описание
--------

- Функция `crud_update_employee` предназначена для обновления информации о сотруднике по его идентификатору и возврата обновленного сотрудника.
- Она принимает три аргумента: `db` (сессия базы данных), `employee_id` (идентификатор сотрудника) и `employee` (данные для обновления сотрудника).
- Функция выполняет следующие действия:
  1. Строит запрос для выборки сотрудника из базы данных по его идентификатору.
  2. Получает сотрудника из базы данных.
  3. Обновляет атрибуты сотрудника на основе данных из запроса.
  4. Сохраняет изменения в базе данных.
  5. Обновляет объект сотрудника с данными из базы данных.
  6. Возвращает обновленного сотрудника или None, если сотрудник не найден.

crud_delete_employee
====================

.. code:: python

    async def crud_delete_employee(db: AsyncSession, employee_id: int):
        query = (
            select(models.Employee)
            .where(models.Employee.id == employee_id)
            .options(selectinload(models.Employee.tasks))
        )
        db_employee = await db.scalars(query)
        db_employee = db_employee.first()
        if db_employee:
            await db.delete(db_employee)
            await db.commit()
        return db_employee

Описание
--------

- Функция `crud_delete_employee` предназначена для удаления сотрудника по его идентификатору и возврата удаленного сотрудника.
- Она принимает два аргумента: `db` (сессия базы данных) и `employee_id` (идентификатор сотрудника).
- Функция выполняет следующие действия:
   1. Строит запрос для выборки сотрудника из базы данных по его идентификатору.
   2. Получает сотрудника из базы данных.
   3. Удаляет сотрудника из базы данных.
   4. Сохраняет изменения в базе данных.
   5. Возвращает удаленного сотрудника или None, если сотрудник не найден.
