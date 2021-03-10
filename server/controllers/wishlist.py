from flask import Blueprint, request, g
from models.user import User
from models.product import Product
from models.wishlist import Wishlist
from serializers.user import UserSchema
from serializers.product import ProductSchema
from serializers.wishlist import WishlistSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

wishlist_schema = WishlistSchema()
user_schema = UserSchema()
product_schema = ProductSchema()

router = Blueprint(__name__, "wishlist")

@router.route("/wishlist", methods=["GET"])
def get_wishlist():
    wishlist = Wishlist.query.all()
    return wishlist_schema.jsonify(wishlist, many=True), 200  

