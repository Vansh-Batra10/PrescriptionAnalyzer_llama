# from sqlalchemy import create_engine, MetaData

# DATABASE_URL = "sqlite:///./test.db"

# engine = create_engine(
#     DATABASE_URL, connect_args={"check_same_thread": False}
# )

# metadata = MetaData()

from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = "sqlite:///./test.db"  # Adjust with your actual database URL

# Create the SQLAlchemy engine
engine = create_engine(
    DATABASE_URL, connect_args={"check_same_thread": False}
)

# Initialize metadata and base class
metadata = MetaData()
Base = declarative_base()

# Create a configured "SessionLocal" class for the database session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
