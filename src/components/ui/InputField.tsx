import { useTranslations } from "next-intl";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

interface InputFieldProps<T extends Record<string, any>> {
  label: string;
  name: Path<T>;
  type?: string;
  register: UseFormRegister<T>;
  errors: FieldError | undefined;
  required?: boolean;
  translationNameSpace?: string;
}

function InputField<T extends Record<string, any>>({
  label,
  name,
  type = "text",
  register,
  errors,
  required,
  translationNameSpace,
}: InputFieldProps<T>) {
  const t = useTranslations(translationNameSpace);

  const errorMessage =
    errors?.message && translationNameSpace
      ? t(errors.message as any)
      : errors?.message;

  return (
    <div className="relative">
      <input
        type={type}
        placeholder=" "
        {...register(name)}
        id={label}
        className="block w-full px-3 pb-2.5 pt-4 text-sm bg-transparent border border-onyx/50 hover:border-onyx/75 focus:border-onyx transition-all duration-300 focus:shadow-xs focus:shadow-onyx appearance-none focus:outline-none peer rounded-lg"
      />
      <label
        htmlFor={label}
        className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 origin-left bg-alabaster opacity-75 peer-focus:opacity-100 px-2 peer-focus:px-2 peer-focus:text-onyx peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 inset-s-1 space-x-1"
      >
        <span>{label}</span>
        {required && <span className="text-red-700 text-sm">*</span>}
      </label>
      {errors && <p className="text-red-700 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
}

export default InputField;
