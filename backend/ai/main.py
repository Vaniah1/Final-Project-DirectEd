import tkinter as tk
import cv2
import util
from PIL import Image, ImageTk
import os
import datetime
import subprocess
import numpy as np
import hashlib
import requests

class App:
    def __init__(self, master):
        self.main_window = master
        self.main_window.geometry("1200x520+380+100")
        
        self.login_button_main_window = util.get_button(
            self.main_window, 'Login with Face', 'red', self.login_face, fg='black'
        )
        self.login_button_main_window.config(font=('Helvetica', 14, 'bold'))
        self.login_button_main_window.place(x=750, y=200)
        
        self.login_with_password_button = util.get_button(
            self.main_window, 'Login with Username', 'red', self.login_with_password, fg='black'
        )
        self.login_with_password_button.config(font=('Helvetica', 14, 'bold'))
        self.login_with_password_button.place(x=750, y=300)
        
        self.register_new_user_button_main_window = util.get_button(
            self.main_window, 'Register new user', 'red', self.register_new_user, fg='black'
        )
        self.register_new_user_button_main_window.config(font=('Helvetica', 14, 'bold'))
        self.register_new_user_button_main_window.place(x=750, y=400)
        
        self.webcam_label = util.get_img_label(self.main_window)
        self.webcam_label.place(x=10, y=0, width=700, height=500)
        
        self.add_webcam(self.webcam_label)
        
        self.db_dir = './db'
        if not os.path.exists(self.db_dir):
            os.mkdir(self.db_dir)
            
        self.log_path = '.log.txt'
        self.user_count_file = 'user_count.txt'
        self.user_count = self.get_user_count()
        
        self.credentials_file = 'credentials.txt'
        self.users = self.load_users()

    def get_user_count(self):
        if os.path.exists(self.user_count_file):
            with open(self.user_count_file, 'r') as file:
                count = int(file.read().strip())
        else:
            count = 0
        return count

    def update_user_count(self):
        self.user_count += 1
        with open(self.user_count_file, 'w') as file:
            file.write(str(self.user_count))

    def load_users(self):
        if os.path.exists(self.credentials_file):
            with open(self.credentials_file, 'r') as file:
                users = dict(line.strip().split(':') for line in file)
        else:
            users = {}
        return users

    def save_user(self, username, hashed_password):
        self.users[username] = hashed_password
        with open(self.credentials_file, 'a') as file:
            file.write(f'{username}:{hashed_password}\n')

    def add_webcam(self, label):
        if 'cap' not in self.__dict__:
            self.cap = cv2.VideoCapture(0)

        self._label = label
        self.process_webcam()

    def process_webcam(self):
        ret, frame = self.cap.read()
        self.most_recent_capture_arr = frame

        img_rgb = cv2.cvtColor(self.most_recent_capture_arr, cv2.COLOR_BGR2RGB)
        self.most_recent_capture_pil = Image.fromarray(img_rgb)
        
        imgtk = ImageTk.PhotoImage(image=self.most_recent_capture_pil)
        self._label.imgtk = imgtk

        self._label.configure(image=imgtk)
        self._label.after(20, self.process_webcam)

    def login_face(self):
        unknown_img_path = './.tmp.jpg'
        
        cv2.imwrite(unknown_img_path, self.most_recent_capture_arr)
        
        try:
            output = str(subprocess.check_output(['face_recognition', self.db_dir, unknown_img_path]))
            name = output.split(',')[1][:-3]
            
            if name in ['unknown_person', 'no_person_found']:
                util.msg_box("Sorry", "You are not registered yet...Please register or try again. Make sure your face is visible.")
            else:
                util.msg_box("Welcome Back", f"Welcome, {name}")
                with open(self.log_path, '+a') as f:
                    f.write(f'{name}, {datetime.datetime.now()}\n')
                    f.close()
        except FileNotFoundError:
            util.msg_box("Error", "The face_recognition command was not found. Please ensure it is installed and accessible.")
        finally:
            os.remove(unknown_img_path)

    def login_with_password(self):
        self.login_password_window = tk.Toplevel(self.main_window)
        self.login_password_window.geometry("400x300+600+300")
        
        self.text_label_login_username = util.get_text_label(
            self.login_password_window, "Username:"
        )
        self.text_label_login_username.config(font=('Helvetica', 14))
        self.text_label_login_username.place(x=50, y=50)
        
        self.entry_text_login_username = tk.Entry(self.login_password_window)
        self.entry_text_login_username.config(font=('Helvetica', 14))
        self.entry_text_login_username.place(x=50, y=90, width=300, height=30)
        
        self.text_label_login_password = util.get_text_label(
            self.login_password_window, "Password:"
        )
        self.text_label_login_password.config(font=('Helvetica', 14))
        self.text_label_login_password.place(x=50, y=130)

        self.entry_text_login_password = tk.Entry(self.login_password_window, show='*')
        self.entry_text_login_password.config(font=('Helvetica', 14))
        self.entry_text_login_password.place(x=50, y=170, width=300, height=30)
        
        self.login_button = util.get_button(
            self.login_password_window, 'Login', 'red', self.perform_login, fg='black'
        )
        self.login_button.config(font=('Helvetica', 14, 'bold'))
        self.login_button.place(x=150, y=220)

    def perform_login(self):
        username = self.entry_text_login_username.get().strip()
        password = self.entry_text_login_password.get()
        
        response = requests.post('http://127.0.0.1:5000/login', json={"username": username, "password": password})
        
        if username in self.users:
            hashed_password = hashlib.sha256(password.encode()).hexdigest()
            if self.users[username] == hashed_password:
                util.msg_box("Welcome Back", f"Welcome, {username}")
                with open(self.log_path, '+a') as f:
                    f.write(f'{username}, {datetime.datetime.now()}\n')
                    f.close()
                self.login_password_window.destroy()
                return
        util.msg_box("Error", "Invalid username or password. Please try again.")
        
    def register_new_user(self):
        self.register_new_user_window = tk.Toplevel(self.main_window)
        self.register_new_user_window.geometry("1200x520+380+120")
        
        self.accept_button_register_new_user_window = util.get_button(
            self.register_new_user_window, 'Accept', 'red', self.accept_register_new_user, fg='black'
        )
        self.accept_button_register_new_user_window.config(font=('Helvetica', 14, 'bold'))
        self.accept_button_register_new_user_window.place(x=750, y=420)
        
        self.try_again_button_register_new_user_window = util.get_button(
            self.register_new_user_window, 'Try Again', 'red', self.try_again_register_new_user, fg='black'
        )
        self.try_again_button_register_new_user_window.config(font=('Helvetica', 14, 'bold'))
        self.try_again_button_register_new_user_window.place(x=950, y=420)
        
        self.capture_label = util.get_img_label(self.register_new_user_window)
        self.capture_label.place(x=10, y=0, width=700, height=350)

        self.add_img_to_label(self.capture_label)
        
        self.text_label_register_new_user_name = util.get_text_label(
            self.register_new_user_window, "Please \ninput full name:"
        )
        self.text_label_register_new_user_name.config(font=('Helvetica', 14))
        self.text_label_register_new_user_name.place(x=750, y=20)
        
        self.entry_text_register_new_user_name = tk.Entry(self.register_new_user_window)
        self.entry_text_register_new_user_name.config(font=('Helvetica', 14))  
        self.entry_text_register_new_user_name.place(x=750, y=70, width=400, height=30)
        
        self.text_label_register_new_user_id = util.get_text_label(
            self.register_new_user_window, "Generated \nstudent ID:"
        )
        self.text_label_register_new_user_id.config(font=('Helvetica', 14))
        self.text_label_register_new_user_id.place(x=750, y=110)
        
        self.entry_text_register_new_user_id = tk.Entry(self.register_new_user_window)
        self.entry_text_register_new_user_id.insert(0, str(self.user_count + 1))
        self.entry_text_register_new_user_id.config(font=('Helvetica', 14), state='readonly')  
        self.entry_text_register_new_user_id.place(x=750, y=160, width=400, height=30)
        
        self.text_label_register_new_user_password = util.get_text_label(
            self.register_new_user_window, "Password:"
        )
        self.text_label_register_new_user_password.config(font=('Helvetica', 14))
        self.text_label_register_new_user_password.place(x=750, y=200)

        self.entry_text_register_new_user_password = tk.Entry(self.register_new_user_window, show='*')
        self.entry_text_register_new_user_password.config(font=('Helvetica', 14))
        self.entry_text_register_new_user_password.place(x=750, y=250, width=400, height=30)

        self.text_label_register_new_user_confirm_password = util.get_text_label(
            self.register_new_user_window, "Confirm Password:"
        )
        self.text_label_register_new_user_confirm_password.config(font=('Helvetica', 14))
        self.text_label_register_new_user_confirm_password.place(x=750, y=290)

        self.entry_text_register_new_user_confirm_password = tk.Entry(self.register_new_user_window, show='*')
        self.entry_text_register_new_user_confirm_password.config(font=('Helvetica', 14))
        self.entry_text_register_new_user_confirm_password.place(x=750, y=340, width=400, height=30)
        
    def try_again_register_new_user(self):
        self.register_new_user_window.destroy()
        
    def add_img_to_label(self, label):
        imgtk = ImageTk.PhotoImage(image=self.most_recent_capture_pil)
        label.imgtk = imgtk  
        label.configure(image=imgtk)

        self.register_new_user_capture = self.most_recent_capture_pil.copy()
    
    def accept_register_new_user(self):
        name = self.entry_text_register_new_user_name.get().strip()
        password = self.entry_text_register_new_user_password.get()
        confirm_password = self.entry_text_register_new_user_confirm_password.get().strip()

        if not name or not password or not confirm_password:
            util.msg_box("Error", "Please fill in all fields.")
            return

        if password != confirm_password:
            util.msg_box("Error", "Passwords do not match. Please try again.")
            return

        response = requests.post('http://127.0.0.1:5000/register', json={"username": name, "password": password, "confirm_password": confirm_password})

        if response.status_code == 201:
            self.update_user_count()
            self.register_new_user_window.destroy()

            cv2.imwrite(os.path.join(self.db_dir, f'{name}.jpg'), np.array(self.register_new_user_capture))
            
            util.msg_box("Success", "Student successfully registered")
            
            self.register_new_user_window.destroy()
        else:
            util.msg_box("Error", response.json()["error"])
        
    def start(self):
        self.main_window.mainloop()
    

if __name__ == "__main__":
    root = tk.Tk()
    app = App(master=root)
    app.start()
