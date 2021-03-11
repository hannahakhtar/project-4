from flask import Blueprint, request, g
from models.wishlist import Wishlist
from models.product import Product
from serializers.wishlist import WishlistSchema
from marshmallow.exceptions import ValidationError
from decorators.secure_route import secure_route

wishlist_schema = WishlistSchema()

router = Blueprint(__name__, "wishlist")

@router.route('/wishlist/<int:user_id>', methods=["GET"])
@secure_route
def get_wishlist_by_id(user_id):
    wishlist = Wishlist.query.filter_by(user_id=user_id)
    if user_id != g.current_user.id:
        return {'errors': 'Sorry - you do not have access to this'}, 402
    return wishlist_schema.jsonify(wishlist, many=True), 200

    # @router.route('/users/<int:user_id>/wishlist/<int:product_id>', methods=["POST"])
    # @secure_route
    # def all_to_wishlist(user_id, product_id):
    #     if user_id != g.current_user.id:
    #         return {'errors': 'Sorry - you do not have access to this'}, 402

    #     try:
    #         wishlist_item = Product.query.get(product_id)
    #         item_to_add = wishlist_schema.load(wishlist_item)
    #         item_to_add.user_id = user_id
    #     except ValidationError as e:
    #         return {"errors": e.messages, "messages": "Something went wrong"}

    #     item_to_add.save()

    #     return wishlist_schema.jsonify(item_to_add), 201

@router.route('/users/<int:user_id>/wishlist/<int:wishlist_id>', methods=["DELETE"])
@secure_route
def remove_wishlist_item(user_id, wishlist_id):
    wishlist_item = Wishlist.query.get(wishlist_id)
    if user_id != g.current_user.id:
        return {'errors': 'Sorry - you can not delete this item as it is not yours!'}, 402
    if not wishlist_item:
        return {'errors': 'Sorry - could not find that wishlist item'}, 402
    wishlist_item.remove()
    return {"message": "Wishlist item deleted successfully"}, 200
