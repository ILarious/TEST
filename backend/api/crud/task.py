from sqlalchemy.orm import selectinload
from backend.models import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from backend.schemes.schemas import TaskCreate, TaskUpdate

# Создание новой задачи в базе данных
async def crud_create_task(new_task: TaskCreate, db: AsyncSession):
    db_task = models.Task(**new_task.dict())  # Создание экземпляра модели "Задача" из данных новой задачи
    db.add(db_task)  # Добавление задачи в сессию базы данных
    await db.commit()  # Сохранение изменений в базе данных
    await db.refresh(db_task)  # Обновление объекта задачи с данными из базы данных
    return db_task  # Возврат созданной задачи

# Получение списка задач с пагинацией и загрузкой связанных данных о назначенных сотрудниках (assignee)
async def crud_get_tasks(db: AsyncSession, skip: int = 0, limit: int = 10):
    query = (
        select(models.Task)
        .offset(skip)
        .limit(limit)
        .order_by(models.Task.id)
        .options(selectinload(models.Task.assignee))  # Загрузка данных о назначенных сотрудниках
    )
    response = await db.execute(query)  # Выполнение запроса
    return response.scalars().all()  # Возврат списка задач

# Получение информации о задаче по ее идентификатору с загрузкой связанных данных о назначенном сотруднике (assignee)
async def crud_get_task(db: AsyncSession, task_id: int):
    query = (
        select(models.Task)
        .where(models.Task.id == task_id)
        .options(selectinload(models.Task.assignee))  # Загрузка данных о назначенном сотруднике
    )
    response = await db.scalars(query)  # Выполнение запроса
    return response.first()  # Возврат найденной задачи или None, если задача не найдена

# Обновление информации о задаче по ее идентификатору с загрузкой связанных данных о назначенном сотруднике (assignee)
async def crud_update_task(db: AsyncSession, task_id: int, task: TaskUpdate):
    query = (
        select(models.Task)
        .where(models.Task.id == task_id)
        .options(selectinload(models.Task.assignee))  # Загрузка данных о назначенном сотруднике
    )
    db_task = await db.scalars(query)  # Выполнение запроса и получение задачи
    db_task = db_task.first()
    if db_task:
        for attr, value in task.dict().items():
            setattr(db_task, attr, value)  # Обновление атрибутов задачи на основе данных из запроса
        await db.commit()  # Сохранение изменений в базе данных
        await db.refresh(db_task)  # Обновление объекта задачи с данными из базы данных
    return db_task  # Возврат обновленной задачи или None, если задача не найдена

# Удаление задачи по ее идентификатору с загрузкой связанных данных о назначенном сотруднике (assignee)
async def crud_delete_task(db: AsyncSession, task_id: int):
    query = (
        select(models.Task)
        .where(models.Task.id == task_id)
        .options(selectinload(models.Task.assignee))  # Загрузка данных о назначенном сотруднике
    )
    db_task = await db.scalars(query)  # Выполнение запроса и получение задачи
    db_task = db_task.first()
    if db_task:
        await db.delete(db_task)  # Удаление задачи из базы данных
        await db.commit()  # Сохранение изменений в базе данных
    return db_task  # Возврат удаленной задачи или None, если задача не найдена
