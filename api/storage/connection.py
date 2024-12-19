import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

# Fetch database credentials from environment variables
# Determine environment and set the appropriate database URL
if os.getenv('VERCEL_ENV') == 'production':  # This checks if on Vercel production
    DATABASE_URL = os.getenv("DATABASE_URL")  # Vercel environment variable
else:
    DATABASE_USERNAME = os.getenv("DATABASE_USERNAME")
    DATABASE_PASSWORD = os.getenv("DATABASE_PASSWORD")
    DATABASE_NAME = os.getenv("DATABASE_NAME")
    DATABASE_URL = os.getenv("DATABASE_URL").format(DATABASE_NAME = DATABASE_NAME, DATABASE_USERNAME = DATABASE_USERNAME, DATABASE_PASSWORD = DATABASE_PASSWORD)

engine = create_engine(DATABASE_URL)