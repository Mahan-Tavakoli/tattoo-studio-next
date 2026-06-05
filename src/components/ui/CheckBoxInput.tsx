import { useTranslations } from "next-intl";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

interface CheckBoxInputProps<T extends Record<string, any>> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldError;
  translationNameSpace?: string;
}

function CheckBoxInput<T extends Record<string, any>>({
  label,
  name,
  register,
  errors,
  translationNameSpace,
}: CheckBoxInputProps<T>) {
  const t = useTranslations(translationNameSpace);

  const errorMessage =
    errors?.message && translationNameSpace
      ? t(errors.message as any)
      : errors?.message;
  return (
    <div className="flex flex-col gap-1 py-1">
      <label className="flex items-start gap-3 cursor-pointer group">
        <input
          type="checkbox"
          {...register(name)}
          className="w-5 h-5 mt-0.5 accent-onyx rounded border-onyx/20 cursor-pointer"
        />
        <span className="text-sm text-body group-hover:text-onyx transition-colors">
          {label}
        </span>
      </label>
      {errors && (
        <p className="text-red-700 text-[10px] ml-8">{errorMessage}</p>
      )}
    </div>
  );
}

export default CheckBoxInput;
