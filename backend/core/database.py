from typing import AsyncGenerator

from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine, AsyncEngine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

from config.config import DB_HOST, DB_NAME, DB_PASS, DB_PORT, DB_USER

# Формирование строки подключения к базе данных PostgreSQL
DATABASE_URL: str = f"postgresql+asyncpg://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# Создание базового класса для ORM-моделей SQLAlchemy
Base: declarative_base = declarative_base()

# Создание асинхронного движка SQLAlchemy для работы с базой данных
engine: AsyncEngine = create_async_engine(DATABASE_URL)

# Создание асинхронной фабрики сессий для работы с базой данных
async_session_maker: AsyncGenerator[AsyncSession, None] = sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

# Функция для получения асинхронной сессии базы данных
async def get_async_session() -> AsyncGenerator[AsyncSession, None]:
    async with async_session_maker() as session:
        yield session