
from app import db, bcrypt
from models.base import BaseModel
from models.wishlist import Wishlist
from models.order_history import OrderHistory
from sqlalchemy.ext.hybrid import hybrid_property
import jwt
from datetime import *
from config.environment import secret
from models.product import Product

class User(db.Model, BaseModel):

    __tablename__ = 'users'

    username = db.Column(db.String(128), nullable=False, unique=True)
    email = db.Column(db.Text, nullable=False, unique=True)
    password_hash = db.Column(db.String(128), nullable=True)
    first_name = db.Column(db.String(128), nullable=False)
    last_name = db.Column(db.String(128), nullable=False)
    image = db.Column(db.Text, nullable=True)
    location = db.Column(db.Text, nullable=False)

    wishlist = db.relationship('Wishlist', backref='users', cascade="all, delete")
    product = db.relationship('Product', backref='user', cascade="all, delete")
    order_history = db.relationship('OrderHistory', backref='users', cascade="all, delete")

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
        print(jwt)
        print(type(jwt))
        print("after 43")
        print(jwt.encode)
        print("dfgdfg")
        token = jwt.encode(payload, secret, 'HS256')
        return token




