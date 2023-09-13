from sqlalchemy.orm import selectinload

from backend.src.task_tracker import models
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from backend.src.task_tracker.schemas import EmployeeCreate, EmployeeUpdate


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


async def crud_get_employee(db: AsyncSession, employee_id: int):
    query = (
        select(models.Employee)
        .where(models.Employee.id == employee_id)
        .options(selectinload(models.Employee.tasks))
    )

    response = await db.scalars(query)
    return response.first()


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
