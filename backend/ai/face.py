import cv2
import face_recognition
import uuid
from pymongo import MongoClient

# Connect to MongoDB
client = MongoClient('mongodb://localhost:27017/')
db = client['face_recognition']
collection = db['users']

def capture_image():
    cap = cv2.VideoCapture(0)
    print("Press 's' to capture an image")

    while True:
        ret, frame = cap.read()
        cv2.imshow('Frame', frame)

        if cv2.waitKey(1) & 0xFF == ord('s'):
            img_name = "captured_image.png"
            cv2.imwrite(img_name, frame)
            break

    cap.release()
    cv2.destroyAllWindows()

    return img_name

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
        "encoding": face_encoding.tolist()  # Convert numpy array to list for JSON serialization
    }
    collection.insert_one(user_data)
    return face_id

def main():
    try:
        img_path = capture_image()
        face_encoding = process_image(img_path)
        face_id = store_face_data(face_encoding)
        print(f"Face ID {face_id} stored successfully in MongoDB")
    except Exception as e:
        print(f"An error occurred: {e}")

if _name_ == "_main_":
    main()