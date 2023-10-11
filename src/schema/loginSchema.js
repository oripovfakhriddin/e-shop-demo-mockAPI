import * as yup from "yup"

const loginSchema = yup.object().shape({
  email: yup.string().email(),
  password: yup.string().min(4, "The minimum number of characters is 4").max(12, "The maximum number of characters is 8")
});

export default loginSchema;