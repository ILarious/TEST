from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, MetaData
from sqlalchemy.orm import relationship, Mapped
from typing import List, Optional
from datetime import datetime

from backend.src.database import Base

metadata: Optional[MetaData] = Base.metadata


class Employee(Base):
    __tablename__: str = 'employees'

    id: int = Column(Integer, primary_key=True, index=True)
    full_name: str = Column(String, index=True)
    position: str = Column(String)

    tasks: Mapped[Optional[List["Task"]]] = relationship("Task", back_populates="assignee")


class Task(Base):
    __tablename__: str = 'tasks'

    id: int = Column(Integer, primary_key=True, index=True)
    title: str = Column(String, index=True)
    parent_id: Optional[int] = Column(Integer, ForeignKey('tasks.id'), default=None)
    assignee_id: Optional[int] = Column(Integer, ForeignKey('employees.id'), default=None)
    deadline: Optional[datetime] = Column(DateTime)
    status: str = Column(String)

    assignee: Mapped[Optional["Employee"]] = relationship("Employee", back_populates="tasks")
    subtasks: Mapped[List["Task"]] = relationship("Task", backref="parent", remote_side=[id])