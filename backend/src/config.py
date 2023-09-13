from dotenv import load_dotenv
import os

# Загрузка значений конфигурации из файла .env
load_dotenv()

# Получение значений конфигурации из переменных окружения .env
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
DB_USER = os.getenv('DB_USER')
DB_PASS = os.getenv('DB_PASS')
