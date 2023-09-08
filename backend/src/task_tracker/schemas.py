from datetime import date

from pydantic import BaseModel
from typing import List, Optional




class EmployeeBase(BaseModel):
    full_name: str
    position: str


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
    pass


class Employee(EmployeeBase):
    id: int
    tasks: Optional[List["Task"]] = []

    class Config:
        orm_mode = True


class TaskBase(BaseModel):
    title: str
    parent_id: Optional[int] = None
    assignee_id: Optional[int] = None
    deadline: Optional[date] = None
    status: str


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    parent_id: Optional[int] = None
    assignee: Optional[Employee] = None
    subtasks: Optional[List["Task"]] = []

    class Config:
        orm_mode = True
