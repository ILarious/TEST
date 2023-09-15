from sqlalchemy.orm import selectinload
from models import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from schemes.schemas import EmployeeCreate, EmployeeUpdate

# Создание нового сотрудника в базе данных
async def crud_create_employee(new_employee: EmployeeCreate, db: AsyncSession):
    db_employee = models.Employee(**new_employee.dict())  # Создание экземпляра модели "Сотрудник" из данных нового сотрудника
    db.add(db_employee)  # Добавление сотрудника в сессию базы данных
    await db.commit()  # Сохранение изменений в базе данных
    await db.refresh(db_employee)  # Обновление объекта сотрудника с данными из базы данных

    # Загрузка задач, связанных с этим сотрудником
    query = (
        select(models.Employee)
        .where(models.Employee.id == db_employee.id)
        .options(selectinload(models.Employee.tasks))  # Загрузка связанных задач
    )
    db_employee = await db.scalars(query)
    return db_employee.first()  # Возврат созданного сотрудника

# Получение списка сотрудников с пагинацией и загрузкой связанных данных о задачах (tasks)
async def crud_get_employees(db: AsyncSession, skip: int = 0, limit: int = 10):
    query = (
        select(models.Employee)
        .offset(skip)
        .limit(limit)
        .order_by(models.Employee.id)
        .options(selectinload(models.Employee.tasks))  # Загрузка связанных задач
    )
    response = await db.execute(query)
    return response.scalars().all()  # Возврат списка сотрудников

# Получение информации о сотруднике по его идентификатору с загрузкой связанных данных о задачах (tasks)
async def crud_get_employee(db: AsyncSession, employee_id: int):
    query = (
        select(models.Employee)
        .where(models.Employee.id == employee_id)
        .options(selectinload(models.Employee.tasks))  # Загрузка связанных задач
    )
    response = await db.scalars(query)
    return response.first()  # Возврат найденного сотрудника или None, если сотрудник не найден

# Обновление информации о сотруднике по его идентификатору с загрузкой связанных данных о задачах (tasks)
async def crud_update_employee(db: AsyncSession, employee_id: int, employee: EmployeeUpdate):
    query = (
        select(models.Employee)
        .where(models.Employee.id == employee_id)
        .options(selectinload(models.Employee.tasks))  # Загрузка связанных задач
    )
    db_employee = await db.scalars(query)
    db_employee = db_employee.first()
    if db_employee:
        for attr, value in employee.dict().items():
            setattr(db_employee, attr, value)  # Обновление атрибутов сотрудника на основе данных из запроса
        await db.commit()  # Сохранение изменений в базе данных
        await db.refresh(db_employee)  # Обновление объекта сотрудника с данными из базы данных
    return db_employee  # Возврат обновленного сотрудника или None, если сотрудник не найден

# Удаление сотрудника по его идентификатору с загрузкой связанных данных о задачах (tasks)
async def crud_delete_employee(db: AsyncSession, employee_id: int):
    query = (
        select(models.Employee)
        .where(models.Employee.id == employee_id)
        .options(selectinload(models.Employee.tasks))  # Загрузка связанных задач
    )
    db_employee = await db.scalars(query)
    db_employee = db_employee.first()
    if db_employee:
        await db.delete(db_employee)  # Удаление сотрудника из базы данных
        await db.commit()  # Сохранение изменений в базе данных
    return db_employee  # Возврат удаленного сотрудника или None, если сотрудник не найден
