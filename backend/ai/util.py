import tkinter as tk
from tkinter import messagebox
from tkinter import *

def get_button(window, text, color, command, fg='white'):
    button = tk.Button(
                        window, 
                        text=text,
                        activebackground="black",
                        activeforeground="red",
                        bg=color, 
                        fg=fg,
                        command=command,
                        height=2,
                        width=20,
                        font=('Helvetica bold', 20)
                        )
    
    return button 

def get_img_label(window):
    label = tk.Label(window)
    label.grid(row=0, column=0)
    return label


def get_text_label(window, text):
    label = tk.Label(window, text=text)
    label.config(font=("sans-serif", 21), justify="left")
    return label


def get_entry_text(window):
    inputtxt = tk.Text(window,
                       height= 2,
                       width=15,
                       font=("Arial", 32))
    
    return inputtxt
    
def msg_box(title, description):
    messagebox.showinfo(title, description)


#add markdown button for student or staff
def get_register_fields(window):
    label_username = tk.Label(window, text="Username:")
    label_username.config(font=("sans-serif", 14))
    label_username.place(x=750, y=250)

    entry_username = tk.Entry(window, font=("Helvetica", 14))
    entry_username.place(x=750, y=300, width=400, height=30)

    label_password = tk.Label(window, text="Password:")
    label_password.config(font=("sans-serif", 14))
    label_password.place(x=750, y=350)

    entry_password = tk.Entry(window, show='*', font=("Helvetica", 14))
    entry_password.place(x=750, y=400, width=400, height=30)

    label_confirm_password = tk.Label(window, text="Confirm Password:")
    label_confirm_password.config(font=("sans-serif", 14))
    label_confirm_password.place(x=750, y=450)

    entry_confirm_password = tk.Entry(window, show='*', font=("Helvetica", 14))
    entry_confirm_password.place(x=750, y=500, width=400, height=30)

    return entry_username, entry_password, entry_confirm_password