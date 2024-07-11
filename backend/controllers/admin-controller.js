const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Notice = require('../models/noticeSchema.js');
const Complain = require('../models/complainSchema.js');

const adminRegister = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        
        const admin = new Admin({
            ...req.body,
            password:hashedPass
        });

        const existingAdminByEmail = await Admin.findOne({ email: req.body.email });
        const existingSchool = await Admin.findOne({ schoolName: req.body.schoolName });

        if (existingAdminByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else if (existingSchool) {
            res.send({ message: 'School name already exists' });
        }
        else {
            let result = await admin.save();
            result.password = undefined;
            res.send(result);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const adminLogIn = async (req, res) => {
    if (req.body.email && req.body.password) {
        let admin = await Admin.findOne({ email: req.body.email });
        if (admin) {
            const validated = await bcrypt.compareSync(req.body.password, admin.password);
            if (validated) {
                const token = jwt.sign({ adminId: admin._id }, process.env.JWT_TOKEN, { expiresIn: '1h' });
                admin.password = undefined;
                res.send(admin);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "User not found" });
        }
    } else {
        res.send({ message: "Email and password are required" });
    }
};

const getAdminDetail = async (req, res) => {
    try {
        let admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;
            res.send(admin);
        }
        else {
            res.send({ message: "No admin found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
}

const googleOAuthController = async (req, res) => {
  try {
    const { token } = req.body
    const { email, name } = await verify(token)
    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      const jwtToken = jwt.sign({ adminId: existingAdmin._id }, process.env.JWT_TOKEN)
      existingAdmin.password = undefined
      res.send({ admin: existingAdmin, token: jwtToken })
    } else {
      const newAdmin = new Admin({ name, email, role: 'Admin' })
      const result = await newAdmin.save()
      const jwtToken = jwt.sign({ adminId: result._id }, process.env.JWT_TOKEN)
      result.password = undefined
      res.send({ admin: result, token: jwtToken })
    }
  } catch (err) {
    res.status(500).json(err)
  }
  


    








}

module.exports = { adminRegister, adminLogIn, getAdminDetail, googleOAuthController };
