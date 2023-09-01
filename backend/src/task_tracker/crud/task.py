from backend.src.task_tracker import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.src.task_tracker.schemas import TaskCreate, TaskUpdate

async def crud_create_task(new_task: TaskCreate, db: AsyncSession):
    db_task = models.Task(**new_task.dict())
    db.add(db_task)
    await db.commit()
    await db.refresh(db_task)
    return db_task


async def crud_get_tasks(db: AsyncSession, skip: int = 0, limit: int = 10):
    query = select(models.Task).offset(skip).limit(limit).order_by(models.Task.id)
    response = await db.execute(query)
    return response.scalars().all()


async def crud_get_task(db: AsyncSession, task_id: int):
    query = select(models.Task).where(models.Task.id == task_id)
    response = await db.scalars(query)
    return response.first()


async def crud_update_task(db: AsyncSession, task_id: int, task: TaskUpdate):
    query = select(models.Task).where(models.Task.id == task_id)
    db_task = await db.scalars(query)
    db_task = db_task.first()
    if db_task:
        for attr, value in task.dict().items():
            setattr(db_task, attr, value)
        await db.commit()
        await db.refresh(db_task)
    return db_task


async def crud_delete_task(db: AsyncSession, task_id: int):
    query = select(models.Task).where(models.Task.id == task_id)
    db_task = await db.scalars(query)
    db_task = db_task.first()
    if db_task:
        await db.delete(db_task)
        await db.commit()
    return db_task
