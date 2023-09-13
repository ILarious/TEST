from datetime import date
from pydantic import BaseModel
from typing import List, Optional

# Базовая модель для сущности "Сотрудник"
class EmployeeBase(BaseModel):
    full_name: str  # Полное имя сотрудника
    position: str  # Должность сотрудника

# Модель для создания сотрудника
class EmployeeCreate(EmployeeBase):
    pass

# Модель для обновления сотрудника
class EmployeeUpdate(EmployeeBase):
    pass

# Модель сотрудника, включая уникальный идентификатор (id) и список задач, связанных с сотрудником
class Employee(EmployeeBase):
    id: int  # Уникальный идентификатор сотрудника
    tasks: Optional[List["Task"]] = []  # Список задач, связанных с сотрудником (опционально)

    class Config:
        orm_mode = True  # Указывает, что эту модель можно использовать для взаимодействия с ORM (Object-Relational Mapping)

# Базовая модель для сущности "Задача"
class TaskBase(BaseModel):
    title: str  # Заголовок задачи
    parent_id: Optional[int] = None  # Идентификатор родительской задачи (опционально)
    assignee_id: Optional[int] = None  # Идентификатор сотрудника, назначенного на задачу (опционально)
    deadline: Optional[date] = None  # Дедлайн задачи (опционально)
    status: str  # Статус задачи

# Модель для создания задачи
class TaskCreate(TaskBase):
    pass

# Модель для обновления задачи
class TaskUpdate(TaskBase):
    pass

# Модель задачи, включая уникальный идентификатор (id), родительскую задачу, назначенного сотрудника и список подзадач
class Task(TaskBase):
    id: int  # Уникальный идентификатор задачи
    assignee: Optional[Employee] = None  # Сотрудник, назначенный на задачу (опционально)
    subtasks: Optional[List["Task"]] = []  # Список подзадач (опционально)

    class Config:
        orm_mode = True  # Указывает, что эту модель можно использовать для взаимодействия с ORM (Object-Relational Mapping)


class TaskSchema(TaskBase):
    id: int  # Уникальный идентификатор задачи

    class Config:
        orm_mode = True  # Указывает, что эту модель можно использовать для взаимодействия с ORM (Object-Relational Mapping)


class EmployeeSchema(EmployeeBase):
    id: int  # Уникальный идентификатор сотрудника

    class Config:
        orm_mode = True  # Указывает, что эту модель можно использовать для взаимодействия с ORM (Object-Relational Mapping)

