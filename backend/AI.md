from flask import Flask, request, jsonify, render_template
import hashlib
import re
import os
import base64
import cv2
import numpy as np
import face_recognition
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
MONGO_URI = os.getenv('MONGO_URL')

app = Flask(_name_)

# MongoDB setup
client = MongoClient(MONGO_URL)
db = client['user_db']
users_collection = db['users']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    username = data.get('username')
    password = data.get('password')
    confirm_password = data.get('confirm_password')
    face_image = data.get('face_image')

    if not username or not password or not confirm_password or not face_image:
        return jsonify({"error": "Please fill in all fields and capture a face image."}), 400

    if password != confirm_password:
        return jsonify({"error": "Passwords do not match. Please try again."}), 400

    if users_collection.find_one({"username": username}):
        return jsonify({"error": "Username already exists. Please choose a different username."}), 400

    # Password strength check
    if len(password) < 8:
        return jsonify({"error": "Password must be at least 8 characters long."}), 400
    if not re.search(r'[A-Z]', password):
        return jsonify({"error": "Password must contain at least one uppercase letter."}), 400
    if not re.search(r'[a-z]', password):
        return jsonify({"error": "Password must contain at least one lowercase letter."}), 400
    if not re.search(r'\d', password):
        return jsonify({"error": "Password must contain at least one digit."}), 400
    if not re.search(r'[!@#$%^&*(),.?":{}|<>]', password):
        return jsonify({"error": "Password must contain at least one special character."}), 400

    # Hash the password before storing
    hashed_password = hashlib.sha256(password.encode()).hexdigest()

    # Save face image in MongoDB
    face_image_data = base64.b64decode(face_image.split(',')[1])
    user_data = {
        "username": username,
        "password": hashed_password,
        "face_image": face_image_data
    }
    users_collection.insert_one(user_data)

    return jsonify({"message": "User registered successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Please provide both username and password."}), 400

    user_data = users_collection.find_one({"username": username})
    if not user_data:
        return jsonify({"error": "Invalid username or password."}), 401

    hashed_password = hashlib.sha256(password.encode()).hexdigest()
    if user_data["password"] != hashed_password:
        return jsonify({"error": "Invalid username or password."}), 401

    return jsonify({"message": "Login successful"}), 200

@app.route('/face_login', methods=['POST'])
def face_login():
    data = request.json
    face_image = data.get('face_image')

    if not face_image:
        return jsonify({"error": "No face image provided."}), 400

    # Decode the base64 image
    face_image_data = base64.b64decode(face_image.split(',')[1])
    nparr = np.frombuffer(face_image_data, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Find face encodings
    face_locations = face_recognition.face_locations(img)
    if not face_locations:
        return jsonify({"error": "No face detected in the image."}), 400

    unknown_encoding = face_recognition.face_encodings(img, face_locations)[0]

    # Compare with stored face images
    for user_data in users_collection.find():
        known_image_data = user_data["face_image"]
        nparr = np.frombuffer(known_image_data, np.uint8)
        known_image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        known_encoding = face_recognition.face_encodings(known_image)[0]

        # Compare face encodings
        results = face_recognition.compare_faces([known_encoding], unknown_encoding)
        if results[0]:
            return jsonify({"message": f"Login successful. Welcome, {user_data['username']}!"}), 200

    return jsonify({"error": "Face not recognized. Please try again or login with username and password."}), 401

if _name_ == '_main_':
    app.run(debug=True)
