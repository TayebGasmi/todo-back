import * as yup from "yup";
const registerSchema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(6),
  phone: yup.string().required(),
});
const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});
export { registerSchema, loginSchema };
