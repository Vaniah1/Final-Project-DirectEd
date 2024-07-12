from flask import Flask, jsonify, request
import cv2
import face_recognition
import uuid
from pymongo import MongoClient
import base64
import numpy as np

app = Flask(__name__)


client = MongoClient('mongodb://localhost:27017/')
db = client['face_recognition']
collection = db['users']

@app.route('/capture_and_store', methods=['POST'])
def capture_and_store():
    try:
        image_data = request.json['image']
        

        img_data = base64.b64decode(image_data.split(',')[1])
        nparr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        img_path = "temp_image.png"
        cv2.imwrite(img_path, img)
        
        face_encoding = process_image(img_path)
        
       
        face_id = store_face_data(face_encoding)
        
        return jsonify({"message": f"Face ID {face_id} stored successfully in MongoDB"}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 400

def process_image(img_path):
    image = face_recognition.load_image_file(img_path)
    face_locations = face_recognition.face_locations(image)
    
    if not face_locations:
        raise ValueError("No face detected in the image")
    
    face_encodings = face_recognition.face_encodings(image, face_locations)
    return face_encodings[0]

def store_face_data(face_encoding):
    face_id = str(uuid.uuid4())
    user_data = {
        "faceId": face_id,
        "encoding": face_encoding.tolist()  
    }
    collection.insert_one(user_data)
    return face_id

if __name__ == '__main__':
    app.run(debug=True)