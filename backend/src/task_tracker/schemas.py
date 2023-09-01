from pydantic import BaseModel, constr
from datetime import datetime
from typing import List, Optional, ForwardRef

Task = ForwardRef('Task')

class EmployeeBase(BaseModel):
    full_name: constr(min_length=1, max_length=255)
    position: constr(min_length=1, max_length=255)


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
    pass


class Employee(EmployeeBase):
    id: int
    tasks: Optional[List[Task]] = []

    class Config:
        orm_mode = True


class TaskBase(BaseModel):
    title: constr(min_length=1, max_length=255)
    parent_id: Optional[int] = None
    assignee_id: Optional[int] = None
    deadline: Optional[datetime] = None
    status: constr(min_length=1, max_length=255)


class TaskCreate(TaskBase):
    pass


class TaskUpdate(TaskBase):
    pass


class Task(TaskBase):
    id: int
    assignee: Optional["Employee"] = None
    subtasks: Optional[List["Task"]] = []

    class Config:
        orm_mode = True
