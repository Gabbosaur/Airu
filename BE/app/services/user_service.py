from app.db.database import SessionLocal
from app.models.user import User
from app.schemas.user import UserCreate

async def create_user(user: UserCreate):
    db = SessionLocal()
    new_user = User(name=user.name, email=user.email)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    db.close()
    return new_user

async def get_user(user_id: int):
    db = SessionLocal()
    user = db.query(User).filter(User.id == user_id).first()
    db.close()
    return user
