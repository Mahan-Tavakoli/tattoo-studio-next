import { useTranslations } from "next-intl";
import { FieldError, Path, UseFormRegister } from "react-hook-form";

interface SelectBoxOptions {
  id: number | string;
  label?: string;
  value?: string | number;
  displayName?: string;
}

interface SelectBoxProps<T extends Record<string, any>> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  errors?: FieldError;
  options: SelectBoxOptions[];
  required?: boolean;
  disabled?: boolean;
  //defaultValue?: string;
  translationNameSpace?: string;
  isDark?: boolean;
}

function SelectBox<T extends Record<string, any>>({
  label,
  name,
  options,
  register,
  errors,
  required,
  disabled = false,
  //defaultValue,
  translationNameSpace,
  isDark,
}: SelectBoxProps<T>) {
  const t = useTranslations(translationNameSpace);

  const errorMessage =
    errors?.message && translationNameSpace
      ? t(errors.message as any)
      : errors?.message;
  return (
    <div className="relative">
      <select
        {...register(name)}
        id={label}
        //defaultValue={defaultValue ? defaultValue : ""}
        className={`block w-full appearance-none rounded-lg border bg-transparent px-3 pb-2.5 pt-4 text-sm transition-all duration-300 outline-none peer select-arrow ${
          isDark
            ? "border-alabaster/50 text-snow hover:border-alabaster/75 focus:border-alabaster"
            : "border-onyx/50 text-onyx hover:border-onyx/75 focus:border-onyx"
        }`}
        disabled={disabled}
      >
        {/* <option value="" disabled hidden></option> */}
        {options.map((option) => (
          <option
            key={option.id}
            // value={option.value ? option.value : option.id}
            value={option.value ?? option.id}
            className={isDark ? "bg-carbon-black text-snow" : ""}
          >
            {/* {option.label ? option.label : option.displayName} */}
            {option.label ?? option.displayName}
          </option>
        ))}
      </select>

      <label
        htmlFor={label}
        className={`absolute inset-s-1 top-1.5 z-10 origin-left -translate-y-4 scale-75 px-2 text-sm text-body opacity-75 transition-all duration-300
    peer-placeholder-shown:top-1/2
    peer-placeholder-shown:-translate-y-1/2
    peer-placeholder-shown:scale-100
    peer-focus:top-1.5
    peer-focus:-translate-y-4
    peer-focus:scale-75
    ${
      isDark
        ? "bg-carbon-black peer-focus:text-alabaster"
        : "bg-alabaster peer-focus:text-onyx"
    }`}
      >
        <span>{label}</span>
        {required && <span className="text-red-700 text-sm">*</span>}
      </label>

      {errors && <p className="text-red-700 text-xs mt-1">{errorMessage}</p>}
    </div>
  );
}

export default SelectBox;
