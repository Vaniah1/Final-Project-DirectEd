const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const axios=require("axios")
const faceapi = require('face-api.js');
const canvas = require('canvas');
const Admin = require("./models/adminSchema.js")
const compression = require('compression');
// const bodyParser = require("body-parser")
const app = express()

const Routes = require("./routes/route.js")

const PORT = process.env.PORT || 5001

dotenv.config();

app.use(express.json())
app.use(cors())
app.use(compression())

mongoose
    .connect(process.env.MONGO_URL)
    .then(console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.use('/', Routes);


// app.post('/verify-face', async (req, res) => {
//     const { encoding } = req.body;

//     const users = await Admin.find({});
//     const distanceThreshold = 0.6; // Adjust based on your needs

//     for (const user of users) {
//         const storedEncoding = new Float32Array(user.encoding);
//         const distance = faceapi.euclideanDistance(encoding, storedEncoding);

//         if (distance < distanceThreshold) {
//             return res.status(200).json({ message: 'Access Granted', faceId: user.faceId });
//         }
//     }

//     res.status(401).json({ message: 'Access Denied' });
// });
const path = require('path')

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client' ,'dist')))

// The "catchall" handler: for any request that doesn't
// // match one above, send back React's index.html file.
 app.get('*', (req, res) => {
   res.sendFile(path.join(__dirname, "client", "dist", "index.html"))
 })



app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})




