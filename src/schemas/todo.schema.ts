import * as yup from "yup";
const todoSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required().max(300),
  finished: yup.boolean().default(false),
  finishedAt: yup.date(),
});
export default todoSchema;
