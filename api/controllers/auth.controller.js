import Student from "../models/user.model.js";
import Admin from "../models/admin.model.js";
import Super from "../models/super.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//sign up for teachers, principal and students

export const signupStudent = async (req, res) => {
    const { name, email, password, gender, dateOfBirth, location, subjects, classId } = req.body;
    try {
        const user = await Student.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Student already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new Student({ name, email, password: hashedPassword, gender, dateOfBirth, location, subjects, classId });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const signupTeacher = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Admin.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Teacher already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new Admin({ name, email, password: hashedPassword, isAdmin: true });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const signupPrincipal = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const user = await Super.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Principal already exists" });
        }
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const newUser = new Super({ name, email, password: hashedPassword, isSuper: true });
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//sign in for teachers, principal and students

export const loginStudent = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Student.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Student does not exist" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const loginTeacher = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Admin.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Teacher does not exist" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const loginPrincipal = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await Super.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Principal does not exist" });
        }
        const isMatch = await bcryptjs.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};






  export const googleStudent = async (req, res) => {
      const { email, name } = req.body;
      try {
          const user = await Student.findOne({ email });
          if (user) {
              const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
              const { password, ...others } = user._doc;
              res.status(200).cookie('token', token, { httpOnly: true }).json(others);
          } else {
              const newUser = new Student({
                  name: name.toLowerCase().split(' ').join('') + Math.random().toString(36).slice(-8),
                  email,
                  password: Math.random().toString(36).slice(-16)
              });
              await newUser.save();
              const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
              const { password, ...others } = newUser._doc;
              res.status(200).cookie('token', token, { httpOnly: true }).json(others);
          }
      } catch (error) {
          res.status(500).json({ message: error.message })
      }
  };

  export const googleTeacher = async (req, res) => {
      const { email, name } = req.body;
      try {
          const user = await Admin.findOne({ email });
          if (user) {
              const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
              const { password, ...others } = user._doc;
              res.status(200).cookie('token', token, { httpOnly: true }).json(others);
          } else {
              const newUser = new Admin({
                  name: name.toLowerCase().split(' ').join('') + Math.random().toString(36).slice(-8),
                  email,
                  password: Math.random().toString(36).slice(-16)
              });
              await newUser.save();
              const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
              const { password, ...others } = newUser._doc;
              res.status(200).cookie('token', token, { httpOnly: true }).json(others);
          }
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };

  export const googlePrincipal = async (req, res) => {
      const { email, name } = req.body;
      try {
          const user = await Super.findOne({ email });
          if (user) {
              const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
              const { password, ...others } = user._doc;
              res.status(200).cookie('token', token, { httpOnly: true }).json(others);
          } else {
              const newUser = new Super({
                  name: name.toLowerCase().split(' ').join('') + Math.random().toString(36).slice(-8),
                  email,
                  password: Math.random().toString(36).slice(-16)
              });
              await newUser.save();
              const token = jwt.sign({ _id: newUser._id }, process.env.TOKEN_SECRET);
              const { password, ...others } = newUser._doc;
              res.status(200).cookie('token', token, { httpOnly: true }).json(others);
          }
      } catch (error) {
          res.status(500).json({ message: error.message });
      }
  };
  