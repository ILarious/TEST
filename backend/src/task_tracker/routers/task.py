from typing import List
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from backend.src.database import get_async_session
from backend.src.task_tracker.crud.task import (
    crud_create_task,
    crud_get_tasks,
    crud_get_task,
    crud_update_task,
    crud_delete_task,
)
from backend.src.task_tracker.schemas import TaskCreate, TaskUpdate, Task

# Создание маршрутера для сущности "Задача"
router = APIRouter(
    prefix="/tasks",  # Префикс URL для этого маршрута
    tags=["Task"]  # Тег, связанный с этим маршрутом
)

# Создание новой задачи
@router.post("/")
async def create_task(new_task: TaskCreate, session: AsyncSession = Depends(get_async_session)):
    db_task = await crud_create_task(new_task=new_task, db=session)
    return db_task

# Получение списка задач с пагинацией
@router.get("/")
async def read_tasks(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_async_session)):
    tasks = await crud_get_tasks(db, skip=skip, limit=limit)
    return tasks

# Получение информации о задаче по ее идентификатору
@router.get("/{task_id}/")
async def read_task_id(task_id: int, db: AsyncSession = Depends(get_async_session)):
    task = await crud_get_task(db, task_id=task_id)
    if task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return task

# Обновление информации о задаче по ее идентификатору
@router.put("/{task_id}/")
async def update_task(task_id: int, task_update: TaskUpdate, db: AsyncSession = Depends(get_async_session)):
    updated_task = await crud_update_task(db, task_id, task_update)
    if updated_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return updated_task

# Удаление задачи по ее идентификатору
@router.delete("/{task_id}/")
async def delete_task(task_id: int, db: AsyncSession = Depends(get_async_session)):
    deleted_task = await crud_delete_task(db, task_id)
    if deleted_task is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return deleted_task
