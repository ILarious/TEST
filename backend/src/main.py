import uvicorn
import asyncio
from fastapi import FastAPI

from backend.src.task_tracker.routers.task import router as task_router
from backend.src.task_tracker.routers.employee import router as employee_router


app: FastAPI = FastAPI(
    title="Task Tracker",
)


app.include_router(task_router)
app.include_router(employee_router)


async def main():
    config: uvicorn.Config = uvicorn.Config("main:app", port=8000, log_level="info", reload=True)
    server: uvicorn.Server = uvicorn.Server(config)
    await server.serve()


if __name__ == "__main__":
    asyncio.run(main())