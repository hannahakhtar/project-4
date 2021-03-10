
from app import db, bcrypt
from models.base import BaseModel
from sqlalchemy.ext.hybrid import hybrid_property
import jwt
from datetime import *
from config.environment import secret

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(15), nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)
    # first_name = db.Column(db.String(128), nullable=False)
    # last_name = db.Column(db.String(128), nullable=False)
    # image = db.Column(db.Text, nullable=True)
    # location = db.Column(db.Text, nullable=False)


    #! comments = db.relationship('Comment', backref='user', cascade="all, delete")
    #! cakes = db.relationship('Cake', backref='user', cascade="all, delete")


    @hybrid_property
    def password(self):
        pass

    @password.setter
    def password(self, password_plaintext):
        encoded_pw = bcrypt.generate_password_hash(password_plaintext)
        self.password_hash = encoded_pw.decode('utf-8')
    def validate_password(self, password_plaintext):
        return bcrypt.check_password_hash(self.password_hash, password_plaintext)
    def generate_token(self):
        payload = {
            "sub": self.id,
            "iat": datetime.utcnow(),
            "exp": datetime.utcnow() + timedelta(days=1)
        } 
        token = jwt.encode(payload, secret, 'HS256')
        return token




