from app import app, db
from data.user_data import list_users
# from data.product_data import product_data

with app.app_context():

    try:
        db.drop_all()
        db.create_all()

        db.session.add_all(list_users)
        print("Users added 🤖")    
        db.session.commit()

        # db.session.add_all(product_data)
        # print("Products added 🤖")    
        # db.session.commit()

        print("Everything committed 🤖")
    except Exception as e:
        print("There was an error.")
        print(e)
