from typing import List

from fastapi import APIRouter, Depends, HTTPException

from sqlalchemy.ext.asyncio import AsyncSession

from backend.src.database import get_async_session
from backend.src.task_tracker.crud.employee import crud_create_employee, crud_get_employees

from backend.src.task_tracker.schemas import Employee, EmployeeUpdate, EmployeeCreate

from backend.src.task_tracker.crud.employee import crud_get_employee, crud_update_employee, crud_delete_employee

router = APIRouter(
    prefix="/employees",
    tags=["Employee"]
)


@router.post("/", response_model=Employee)
async def create_employee(new_employee: EmployeeCreate, session: AsyncSession = Depends(get_async_session)):
    db_employee = await crud_create_employee(new_employee=new_employee, db=session)
    return db_employee


@router.get("/")
async def read_employees(skip: int = 0, limit: int = 100, db: AsyncSession = Depends(get_async_session)):
    employees = await crud_get_employees(db, skip=skip, limit=limit)
    return employees


@router.get("/{employee_id}/")
async def read_employee_id(employee_id: int, db: AsyncSession = Depends(get_async_session)):
    employee = await crud_get_employee(db, employee_id=employee_id)
    if employee is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return employee


@router.put("/{employee_id}/")
async def update_employee(employee_id: int, employee_update: EmployeeUpdate, db: AsyncSession = Depends(get_async_session)):
    updated_employee = await crud_update_employee(db, employee_id, employee_update)
    if updated_employee is None:
        raise HTTPException(status_code=404, detail="Employee not found")
    return updated_employee


@router.delete("/{employee_id}/")
async def delete_employee(employee_id: int, db: AsyncSession = Depends(get_async_session)):
    deleted_employee = await crud_delete_employee(db, employee_id)
    if deleted_employee is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return deleted_employee
