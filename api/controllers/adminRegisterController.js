import {Admin } from "../models/adminRegisterSchema.js";
import { handleValidationError } from "../middlewares/errorHandler.js";
import bcrypt from "bcryptjs";

export const adminRegister= async (req, res, next) => {
  console.log(req.body);
  const { email, password  } = req.body;
  try {
      if (!email || !password  ) {
        handleValidationError("Please Fill Form!", 400);
  }

    // Check if the admin already exists in the database
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await Admin.create({ email, password: hashedPassword });
    res.status(200).json({
      success: true,
      message: "Admin Created!",
    });
  } catch (err) {
    next(err);
  }
};
