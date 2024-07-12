document.addEventListener('DOMContentLoaded', () => {
    const loginFaceBtn = document.getElementById('loginFace');
    const loginUsernameBtn = document.getElementById('loginUsername');
    const registerBtn = document.getElementById('register');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const faceLoginForm = document.getElementById('faceLoginForm');
    const submitLoginBtn = document.getElementById('submitLogin');
    const submitRegisterBtn = document.getElementById('submitRegister');
    const captureFaceBtn = document.getElementById('captureFace');
    const captureFaceLoginBtn = document.getElementById('captureFaceLogin');
    const messageDiv = document.getElementById('message');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const faceVideo = document.getElementById('faceVideo');

    let capturedImage = null;

    loginFaceBtn.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'none';
        faceLoginForm.style.display = 'block';
        startVideo(faceVideo);
    });

    loginUsernameBtn.addEventListener('click', () => {
        loginForm.style.display = 'block';
        registerForm.style.display = 'none';
        faceLoginForm.style.display = 'none';
    });

    registerBtn.addEventListener('click', () => {
        loginForm.style.display = 'none';
        registerForm.style.display = 'block';
        faceLoginForm.style.display = 'none';
    });

    captureFaceBtn.addEventListener('click', () => {
        video.style.display = 'block';
        startVideo(video);
    });

    function startVideo(videoElement) {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                videoElement.srcObject = stream;
                videoElement.play();
            })
            .catch(err => {
                console.error("Error accessing the camera", err);
                messageDiv.textContent = "Error accessing the camera. Please make sure you have given permission to use the camera.";
            });
    }

    video.addEventListener('click', () => {
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        capturedImage = canvas.toDataURL('image/jpeg');
        video.style.display = 'none';
        canvas.style.display = 'block';
    });

    submitLoginBtn.addEventListener('click', async () => {
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = data.message;
            } else {
                messageDiv.textContent = data.error;
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again.';
        }
    });

    submitRegisterBtn.addEventListener('click', async () => {
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (!capturedImage) {
            messageDiv.textContent = 'Please capture a face image before registering.';
            return;
        }

        if (password !== confirmPassword) {
            messageDiv.textContent = 'Passwords do not match.';
            return;
        }

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        // Convert base64 to blob
        const byteString = atob(capturedImage.split(',')[1]);
        const mimeString = capturedImage.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        formData.append('faceImage', blob, 'face.jpg');

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = data.message;
                capturedImage = null;
                canvas.style.display = 'none';
            } else {
                messageDiv.textContent = data.error;
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again.';
        }
    });

    captureFaceLoginBtn.addEventListener('click', async () => {
        const canvas = document.createElement('canvas');
        canvas.width = faceVideo.videoWidth;
        canvas.height = faceVideo.videoHeight;
        canvas.getContext('2d').drawImage(faceVideo, 0, 0);
        const capturedImage = canvas.toDataURL('image/jpeg');

        try {
            const response = await fetch('http://localhost:5000/face_login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ face_image: capturedImage }),
            });

            const data = await response.json();

            if (response.ok) {
                messageDiv.textContent = data.message;
                faceVideo.srcObject.getTracks().forEach(track => track.stop());
                faceLoginForm.style.display = 'none';
            } else {
                messageDiv.textContent = data.error;
            }
        } catch (error) {
            messageDiv.textContent = 'An error occurred. Please try again.';
        }
    });
});