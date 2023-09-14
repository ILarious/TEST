.. highlight:: python

=========================
Документация backend/api/routers/employees.py
=========================

Этот документ содержит обзор и документацию к файлу `routers/employees.py`_.

.. _`routers/employees.py`: https://github.com/ILarious/TEST/blob/test_V1/backend/api/routers/employees.py


Создание нового сотрудника
---------------------------

Создает нового сотрудника и возвращает созданный объект сотрудника.

.. code:: python

    @router.post("/", response_model=Employee)
    async def create_employee(new_employee: EmployeeCreate, session: AsyncSession = Depends(get_async_session)):
        """
        Создает нового сотрудника и возвращает созданный объект сотрудника.

        :param new_employee: Данные нового сотрудника.
        :param session: Сессия базы данных.
        :return: Созданный объект сотрудника.
        """
        db_employee = await crud_create_employee(new_employee=new_employee, db=session)
        return db_employee

Получение списка сотрудников с пагинацией
------------------------------------------

Получает список сотрудников с использованием пагинации.

.. code:: python

    @router.get("/", response_model=List[EmployeeSchema])
    async def read_employees(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_async_session)):
        """
        Получает список сотрудников с использованием пагинации.

        :param skip: Количество пропускаемых записей.
        :param limit: Максимальное количество записей.
        :param db: Сессия базы данных.
        :return: Список сотрудников.
        """
        employees = await crud_get_employees(db, skip=skip, limit=limit)
        return employees

Получение информации о сотруднике по его идентификатору
-------------------------------------------------------

Получает информацию о сотруднике по его идентификатору.

.. code:: python

    @router.get("/{employee_id}/", response_model=EmployeeSchema)
    async def read_employee_id(employee_id: int, db: AsyncSession = Depends(get_async_session)):
        """
        Получает информацию о сотруднике по его идентификатору.

        :param employee_id: Идентификатор сотрудника.
        :param db: Сессия базы данных.
        :return: Сотрудник или сообщение об ошибке, если сотрудник не найден.
        """
        employee = await crud_get_employee(db, employee_id=employee_id)
        if employee is None:
            raise HTTPException(status_code=404, detail="Employee not found")
        return employee

Обновление информации о сотруднике по его идентификатору
--------------------------------------------------------

Обновляет информацию о сотруднике по его идентификатору.

.. code:: python

    @router.put("/{employee_id}/", response_model=EmployeeSchema)
    async def update_employee(employee_id: int, employee_update: EmployeeUpdate, db: AsyncSession = Depends(get_async_session)):
        """
        Обновляет информацию о сотруднике по его идентификатору.

        :param employee_id: Идентификатор сотрудника.
        :param employee_update: Данные для обновления сотрудника.
        :param db: Сессия базы данных.
        :return: Обновленный объект сотрудника или сообщение об ошибке, если сотрудник не найден.
        """
        updated_employee = await crud_update_employee(db, employee_id, employee_update)
        if updated_employee is None:
            raise HTTPException(status_code=404, detail="Employee not found")
        return updated_employee

Удаление сотрудника по его идентификатору
------------------------------------------

Удаляет сотрудника по его идентификатору.

.. code:: python

    @router.delete("/{employee_id}/", response_model=EmployeeSchema)
    async def delete_employee(employee_id: int, db: AsyncSession = Depends(get_async_session)):
        """
        Удаляет сотрудника по его идентификатору.

        :param employee_id: Идентификатор сотрудника.
        :param db: Сессия базы данных.
        :return: Удаленный объект сотрудника или сообщение об ошибке, если сотрудник не найден.
        """
        deleted_employee = await crud_delete_employee(db, employee_id)
        if deleted_employee is None:
            raise HTTPException(status_code=404, detail="Employee not found")
        return deleted_employee