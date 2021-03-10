from app import app, db
from data.user_data import list_users
from data.product_data import list_product
from data.wishlist_data import list_wishlist
from data.order_history_data import list_order_history

with app.app_context():

    try:
        db.drop_all()
        db.create_all()

        db.session.add_all(list_users)
        print("Users added 🧦")    
        db.session.commit()

        db.session.add_all(list_product)
        print("Products added 🧦")    
        db.session.commit()

        db.session.add_all(list_wishlist)
        print("Wishlists added 🧦")    
        db.session.commit()

        db.session.add_all(list_order_history)
        print("Order History added 🧦")    
        db.session.commit()       

        print("Everything committed 🤖")
    except Exception as e:
        print("There was an error.")
        print(e)
