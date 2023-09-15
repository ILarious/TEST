from typing import List

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from core.database import get_async_session
from api.crud.employee import (
    crud_create_employee,
    crud_get_employees,
    crud_get_employee,
    crud_update_employee,
    crud_delete_employee,
)
from schemes.schemas import Employee, EmployeeUpdate, EmployeeCreate, EmployeeSchema

# Создание маршрутера для сущности "Сотрудник"
router = APIRouter(
    prefix="/employees",  # Префикс URL для этого маршрута
    tags=["Employee"]  # Тег, связанный с этим маршрутом
)

# Создание нового сотрудника
@router.post("/", response_model=Employee)
async def create_employee(new_employee: EmployeeCreate, session: AsyncSession = Depends(get_async_session)):
    db_employee = await crud_create_employee(new_employee=new_employee, db=session)
    return db_employee

# Получение списка сотрудников с пагинацией
@router.get("/", response_model=List[EmployeeSchema])
async def read_employees(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_async_session)):
    employees = await crud_get_employees(db, skip=skip, limit=limit)
    return employees

# Получение информации о сотруднике по его идентификатору
@router.get("/{employee_id}/", response_model=EmployeeSchema)
async def read_employee_id(employee_id: int, db: AsyncSession = Depends(get_async_session)):
    employee = await crud_get_employee(db, employee_id=employee_id)
    if employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return employee

# Обновление информации о сотруднике по его идентификатору
@router.put("/{employee_id}/", response_model=EmployeeSchema)
async def update_employee(employee_id: int, employee_update: EmployeeUpdate, db: AsyncSession = Depends(get_async_session)):
    updated_employee = await crud_update_employee(db, employee_id, employee_update)
    if updated_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated_employee

# Удаление сотрудника по его идентификатору
@router.delete("/{employee_id}/", response_model=EmployeeSchema)
async def delete_employee(employee_id: int, db: AsyncSession = Depends(get_async_session)):
    deleted_employee = await crud_delete_employee(db, employee_id)
    if deleted_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return deleted_employee