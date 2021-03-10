from flask import request, g
import jwt
from models.user import User
from config.environment import secret
from functools import wraps

def secure_route(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        token_with_bearer = request.headers.get('Authorization')
        if not token_with_bearer:
            return { "message": "Unauthorised - no token" }, 401
        token = token_with_bearer.replace('Bearer ', '')
        try:
            payload = jwt.decode(token, secret, 'HS256')
            user_id = payload['sub']
            user = User.query.get(user_id)
            if not user:
                return { "message": "Unauthorised - you are not a user" }, 401
            g.current_user = user
        except jwt.ExpiredSignatureError:
            return { "message": "Unathorised - your token is invalid" }
        except Exception as e:
            return { "message": str(e) }, 401
        return func(*args, **kwargs)
    return wrapper