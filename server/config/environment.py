import os

db_URI = os.getenv('DATABASE_URL', 'postgres://localhost:5432/garms_db')
secret = os.getenv('SECRET', 'This is a dynasty turquoise marine french capstone something.')