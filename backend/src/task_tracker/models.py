from sqlalchemy import Integer, String, ForeignKey, Date, MetaData
from sqlalchemy.orm import relationship, Mapped, mapped_column
from typing import List, Optional

from backend.src.database import Base

metadata: Optional[MetaData] = Base.metadata


class Employee(Base):
    __tablename__: str = 'employees'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    full_name: Mapped[str] = mapped_column(String, index=True)
    position: Mapped[str] = mapped_column(String)

    tasks: Mapped[Optional[List["Task"]]] = relationship("Task", back_populates="assignee")


class Task(Base):
    __tablename__: str = 'tasks'

    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String, index=True)
    parent_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey('tasks.id'))
    assignee_id: Mapped[Optional[int]] = mapped_column(Integer, ForeignKey('employees.id'))
    deadline: Mapped[Optional[Date]] = mapped_column(Date)
    status: Mapped[str] = mapped_column(String)

    assignee: Mapped[Optional["Employee"]] = relationship("Employee", back_populates="tasks")
    subtasks: Mapped[List["Task"]] = relationship("Task", backref="parent", remote_side=[id])