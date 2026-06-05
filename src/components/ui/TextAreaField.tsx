import { useTranslations } from "next-intl";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

interface TextAreaFieldProps<T extends Record<string, any>> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldError;
  rows?: number;
  translationNameSpace?: string;
}

function TextAreaField<T extends Record<string, any>>({
  label,
  name,
  register,
  errors,
  rows = 4,
  translationNameSpace,
}: TextAreaFieldProps<T>) {
  const t = useTranslations(translationNameSpace);

  const errorMessage =
    errors?.message && translationNameSpace
      ? t(errors.message as any)
      : errors?.message;

  return (
    <div className="relative">
      <textarea
        id={label}
        rows={rows}
        placeholder=" "
        {...register(name)}
        className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-lg border border-onyx/50 hover:border-onyx/75 focus:border-onyx transition-all duration-300 focus:outline-none peer resize-none"
      />
      <label
        htmlFor={label}
        className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 origin-left bg-alabaster opacity-75 peer-focus:opacity-100 px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-2 peer-placeholder-shown:top-1.5 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 inset-s-1"
      >
        <span>{label}</span>
      </label>
      {errors && <p className="text-red-700 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
}

export default TextAreaField;
