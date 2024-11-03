from sqlalchemy import Table, Column, Integer, String, DateTime, ForeignKey
from database import metadata
from datetime import datetime
users = Table(
    'users', metadata,
    Column('id', Integer, primary_key=True),
    Column('email', String, unique=True),
    Column('password', String)
)

# vitals = Table(
#     'vitals', metadata,
#     Column('id', Integer, primary_key=True),
#     Column('user_id', Integer, ForeignKey('users.id')),
#     Column('bp', String),
#     Column('pulse', String),
#     Column('temperature', String),
#     Column('date', DateTime)
# )
vitals = Table(
    'vitals', metadata,
    Column('id', Integer, primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('prescription_id', Integer, ForeignKey('prescriptions.id')),  # Link vitals to a specific prescription
    Column('bp', String),
    Column('pulse', String),
    Column('temperature', String),
    Column('date', DateTime)
)
# prescriptions = Table(
#     'prescriptions', metadata,
#     Column('id', Integer, primary_key=True),
#     Column('user_id', Integer, ForeignKey('users.id')),
#     Column('name', String),  # Optional: name of the prescription (could be timestamp or descriptive label)
#     Column('date', DateTime)  # Date the prescription was created
# )
prescriptions = Table(
    'prescriptions', metadata,
    Column('id', Integer, primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('name', String),  # Name of the prescription file or a label
    Column('diagnosis', String),  # New field for diagnosis
    Column('date', DateTime)  # Date the prescription was created
)
medicines = Table(
    'medicines', metadata,
    Column('id', Integer, primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('prescription_id', Integer, ForeignKey('prescriptions.id')),  # Foreign key linking to prescriptions
    Column('name', String),
    Column('dose', String),
    Column('frequency', String),
    Column('duration', String),
    Column('quantity', String),  # Quantity of the medicine prescribed
    Column('date', DateTime)     # Date the medicine was prescribed
)

reports = Table(
    'reports', metadata,
    Column('id', Integer, primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('name', String),
    Column('url', String)
)
chat_history = Table(
    'chat_history', metadata,
    Column('id', Integer, primary_key=True),
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('role', String),  # 'user' or 'bot'
    Column('message', String),  # The content of the message
    Column('timestamp', DateTime, default=datetime.utcnow)
)
