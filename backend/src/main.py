import uvicorn
import asyncio
from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

# Импорт роутеров, определенных в других файлах
from backend.src.task_tracker.routers.task import router as task_router
from backend.src.task_tracker.routers.employee import router as employee_router

# Создание экземпляра FastAPI приложения
app: FastAPI = FastAPI(
    title="Task Tracker",  # Название вашего приложения
)

# Добавление middleware для обработки CORS (Cross-Origin Resource Sharing)
app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],  # Разрешенные домены для доступа к API (здесь указано '*', что означает разрешение всем)
    allow_credentials=True,  # Разрешение передачи учетных данных (например, куки, заголовки авторизации)
    allow_methods=["*"],  # Разрешенные HTTP-методы (GET, POST, PUT, DELETE и другие)
    allow_headers=["*"],  # Разрешенные HTTP-заголовки
)

# Включение роутеров для обработки маршрутов API
app.include_router(task_router)  # Подключение роутера для задач
app.include_router(employee_router)  # Подключение роутера для сотрудников


# Определение функции main для запуска сервера
async def main():
    # Создание конфигурации сервера с указанием приложения, порта, уровня логирования и режима перезагрузки
    config: uvicorn.Config = uvicorn.Config("main:app", port=8000, log_level="info", reload=True)

    # Создание объекта сервера с указанной конфигурацией
    server: uvicorn.Server = uvicorn.Server(config)

    # Запуск сервера
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())
