from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config.environment import db_URI
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

app = Flask(__name__,  static_folder='dist')

from decorators import logging, errors

app.config['SQLALCHEMY_DATABASE_URI'] = db_URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

ma = Marshmallow(app)

bcrypt = Bcrypt(app)

from controllers import user, product, wishlist, order_history

app.register_blueprint(user.router, url_prefix="/api")
app.register_blueprint(product.router, url_prefix="/api")
app.register_blueprint(wishlist.router, url_prefix="/api")
app.register_blueprint(order_history.router, url_prefix="/api")