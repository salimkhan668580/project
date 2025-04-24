const { z } = require("zod");

const signupValidator = z.object({
  city: z.string().min(2, "City is required"),
  role: z.enum(["teacher", "student", "admin"], { message: "Role must be valid" }),
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Invalid email format"),
  mobile: z.number().refine(val => val.toString().length === 10, {
    message: "Mobile must be 10 digits",
  }),
  gender: z.enum(["male", "female", "other"], { message: "Invalid gender" }),
  DOB: z.string().refine(dateStr => !isNaN(Date.parse(dateStr)), {
    message: "Invalid date format",
  }),
  password: z.string().min(6, "Password must be at least 6 characters"),
  essentialDetails: z.object({
    subject: z.string().min(2, "Subject is required"),
    experience: z.string().min(2, "Experience is required"),
    category: z.string().min(1, "Category is required"),
  }),
});

module.exports = { signupValidator };
