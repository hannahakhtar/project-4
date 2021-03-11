from app import app, db
import json
from tests.lib import login

def test_get_user():

    client = app.test_client()
    response = client.get("/api/users")

    assert len(response.json) == 3
    assert response.status_code == 200

def test_single_user():

    client = app.test_client()
    response = client.get("/api/users/1")

    assert response.json['username'] == 'indiak'
    assert response.status_code == 200 

def test_signup():

    client = app.test_client()

    user_data = {"username": "sam", "email": "sam@sam.com", "password": "sam123", "first_name": "Sam", "last_name": "Jones", "image": "TODO", "location": "London"}
    user_response = client.post(
        "/api/signup",
        data=json.dumps(user_data),
        content_type="application/json"
    )

    assert user_response.json['username'] == 'sam'
    assert user_response.status_code == 201

def test_login():

    client = app.test_client()

    login_data = {"password": "jake123", "email": "jake@jake.com"}
    response = client.post(
        "/api/login",
        data=json.dumps(login_data),
        content_type="application/json"
    )
    print('hello')
    print(response.json)

    assert response.json["message"] == "Welcome back!"
    assert user_response.status_code == 200

def test_delete_user():

    client = app.test_client()  

    token = login(client)  

    request_headers = {"Authorization": f"Bearer {token}"}
    product_response = client.post(
        "/api/products",
        content_type="application/json",
        headers=request_headers,
    )        