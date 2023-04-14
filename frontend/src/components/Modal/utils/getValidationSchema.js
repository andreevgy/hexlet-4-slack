import * as yup from "yup";

const getValidationSchema = (channels) => yup.object().shape({
  name: yup
    .string()
    .trim()
    .required("Укажите название канала")
    .min(3, "Название канала должно быть больше 3 символов")
    .max(20, "Название канала должно быть меньше 20 символов")
    .notOneOf(channels, "Канал с таким названием уже существует"),
});

export default getValidationSchema;
