from flask import Blueprint, request, g
from models.user import User
from serializers.user import UserSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

user_schema = UserSchema()

router = Blueprint(__name__, "users")

@router.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    return user_schema.jsonify(users, many=True), 200  

@router.route("/users/<int:user_id>", methods=["GET"]) 
def get_single_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return { 'message': 'User does not exist' }, 404
    return user_schema.jsonify(user), 200    

@router.route("/signup", methods=["POST"])
def signup():
    try:
        user = user_schema.load(request.json)
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong.' }
    user.save()
    return user_schema.jsonify(user)

@router.route('/login', methods=['POST'])
def login():
    user = User.query.filter_by(email=request.json['email']).first()
    if not user:
        return { 'message': 'No user found for this email' }
    if not user.validate_password(request.json['password']):
        return { 'message' : 'You are not authorized' }, 402
    token = user.generate_token()
    return { 'token': token, 'message': 'Welcome back!' }  

@router.route("/users/<int:user_id>", methods=["PUT"])
@secure_route
def edit_user(user_id):
    user_to_update = User.query.get(user_id)
    user_dictionary = request.json

    if user_to_update != g.current_user:
        return {'errors': 'Sorry - you can not edit this user'}, 402

    try:
        user = user_schema.load(
            user_dictionary,
            instance=user_to_update,
            partial=True
        )
    except ValidationError as e:
        return { 'errors': e.messages, 'messages': 'Something went wrong - you can\'t edit your profile' }
    user.save()
    return user_schema.jsonify(user), 201


@router.route("/users/<int:user_id>", methods=["DELETE"]) 
@secure_route   
def remove_user(user_id):
    user = User.query.get(user_id)    

    if user != g.current_user:
        return {'errors': 'Sorry - you can not delete this user'}, 402

    user.remove()
    return { "message": "User deleted successfully" }, 200