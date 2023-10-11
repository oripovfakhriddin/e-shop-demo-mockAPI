import * as yup from "yup"

const categorySchema = yup.object().shape({
  categoryName: yup.string("Please enter string").required("ooo"),
  categoryImage: yup.string().url("Please enter url").required("uyggy"),
});

export default categorySchema;