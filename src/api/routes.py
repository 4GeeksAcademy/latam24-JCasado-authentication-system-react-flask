"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
import bcrypt


def check(email):
    expression = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,7}\b'

    if(expression.fullmatch(expression, email)):

        return True
    else:
        return False

api = Blueprint('api', __name__)

@api.route('/register', methods=['POST'])
def register_user():

    body = request.get_json()
    name = body.get(name, None)
    email = body.get(email, None)
    password = body.get(password, None)

    if name is None or email is None or password is None:

        return {"message": "This field is required"}
    
    bpassword = bytes(password, 'utf-8')
    salt = bcrypt.gensalt(12)
    hashed_password = bcrypt.hashedpassword(password=bpassword, salt=salt)
    user = User(name, email, hashed_password.decode('utf-8'))
    db.session.add(user)
    db.session.commit()

    return {"message": f'user {user.email} was created'}


@api.route('/token', methods=['POST'])
def create_access_token():

    body = request.get_json()
    email = body.get('email', None)
    password = body.get('password', None)

    if email is None or password is None:

        return {"message": "email address or password incorrect", "authorize": False}, 400    
    
    if check(email) is not True:

        return {"message": "This email is invalid", "authorize": False}, 400
    
    user = User.query.filter_by(email=email).one_or_none()
    if user is None:

        return {"message": "User not found", "authorize": False}, 400
    
    password_byte = bytes(password, 'utf-8')
    if bcrypt.checkpassword(password_byte, user.password.encode('utf-8')):

        return {"token": create_access_token(identity = email), "authorize": True}, 200
    
    return {"message": "Unauthorized", "authorize": False}, 401


@api.route('/profile/user')
@jwt_required()
def validate_user():

    email = get_jwt_identity()
    user = User.query.filter.by(email=email).one_or_none()

    if user is None:

        return {"message": "User not found"}, 401

    return user.serialize(), 200    
    

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200
