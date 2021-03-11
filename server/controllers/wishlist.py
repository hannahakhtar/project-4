from flask import Blueprint, request, g
from models.wishlist import Wishlist
from serializers.wishlist import WishlistSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

wishlist_schema = WishlistSchema()

router = Blueprint(__name__, "wishlist")



@router.route('/wishlist/<int:user_id>', methods=["GET"])
def get_wishlist_by_id(user_id):
    wishlist = Wishlist.query.filter_by(user_id=user_id)
    return wishlist_schema.jsonify(wishlist, many=True), 200

