# from app import app, db
# import json
# from tests.lib import login

# def test_get_all_order_history():

    client = app.test_client()
    token = login(client)
    request_headers = {"Authorization": f"Bearer {token}"}
    response = client.get(
        "/api/users/2/order-history",
        headers=request_headers,
        )

    assert len(response.json) == 2
    assert response.status_code == 200
    assert response.json[0]["product"].get("brand") == "Puma"

