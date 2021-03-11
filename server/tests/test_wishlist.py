from app import app, db
import json
from tests.lib import login

def test_wishlist():

    client = app.test_client()
    response = client.get("/api/wishlist/1")

    assert len(response.json) == 2
    assert response.status_code == 200


def test_add_wishlist():
    client = app.test_client()
    token = login(client)
    wishlist_data = {"user_id": 1, "product_id": 1}
    request_headers = {"Authorization": f"Bearer {token}"}
    wishlist_response = client.post(
        "/users/1/wishlist/1",
        data=json.dumps(wishlist_data),
        content_type="application/json",
        headers=request_headers,
    )

    assert response.status_code == 200
