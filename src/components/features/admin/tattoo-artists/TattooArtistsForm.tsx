import {
  TattooArtistFormData,
  TattooArtistValidationSchema,
} from "@/components/schema & types/artist/artist.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useForm,
  SubmitHandler,
  FieldError,
  useFieldArray,
  Controller,
} from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import useArtist from "../../artist/useArtist";
import InputField from "@/components/ui/InputField";
import InputFile from "@/components/ui/InputFile";
import TextAreaField from "@/components/ui/TextAreaField";
import { useEffect } from "react";
import { ArtistInfo } from "@/components/schema & types/artist/artist.types";
import DotsLoader from "@/components/ui/DotsLoader";

interface TattooArtistFormProps {
  onClose: () => void;
  artistToEdit?: ArtistInfo | null;
}

function TattooArtistsForm({ onClose, artistToEdit }: TattooArtistFormProps) {
  const {
    createNewArtist,
    createNewArtistIsPending,
    editArtist,
    editArtistIsPending,
    allTags,
  } = useArtist();

  const {
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
    register,
    watch,
    setValue,
    control,
    getValues,
  } = useForm<TattooArtistFormData>({
    resolver: zodResolver(TattooArtistValidationSchema as any),
    mode: "onChange",
    reValidateMode: "onChange",

    defaultValues: {
      displayName: "",
      email: "",
      phone: "",
      handle: "",
      bio: "",
      worksMeta: [],
      cover: undefined,
      works: [],
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "worksMeta",
  });

  const works = watch("works");

  const tagOptions = allTags.map((tag) => ({
    value: tag,
    label: tag,
  }));

  useEffect(() => {
    if (artistToEdit?.id) {
      reset({
        displayName: artistToEdit.displayName || "",
        email: artistToEdit.email || "",
        phone: artistToEdit.phone || "",
        handle: artistToEdit.handle || "",
        bio: artistToEdit.bio || "",

        worksMeta:
          artistToEdit.works.map((w) => ({
            title: w.title,
            tags: w.tags,
          })) || [],

        cover: undefined,
        works: [],
      });
    }
  }, [reset, artistToEdit]);

  useEffect(() => {
    if (!works) return;

    const existingMeta =
      artistToEdit?.works.map((w) => ({
        title: w.title,
        tags: w.tags,
      })) || [];

    const currentMeta = getValues("worksMeta") || existingMeta;

    const totalExpected = existingMeta.length + works.length;

    if (currentMeta.length >= totalExpected) return;

    const missingCount = totalExpected - currentMeta.length;

    const newMeta = Array.from({ length: missingCount }, () => ({
      title: "",
      tags: [],
    }));

    setValue("worksMeta", [...currentMeta, ...newMeta], {
      shouldValidate: true,
      shouldDirty: true,
    });
  }, [works]);

  const onSubmit: SubmitHandler<TattooArtistFormData> = async (data) => {
    const formData = new FormData();

    formData.append("displayName", data.displayName);
    formData.append("handle", data.handle.replace(/^@/, ""));
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("bio", data.bio);

    if (data.cover) {
      formData.append("cover", data.cover);
    }

    if (data.works?.length) {
      data.works.forEach((file) => {
        formData.append("works", file);
      });
    }

    formData.append("worksMeta", JSON.stringify(data.worksMeta));
    if (artistToEdit?.id) {
      await editArtist({ artistId: artistToEdit.id, newArtist: formData });
    } else {
      await createNewArtist(formData);
    }

    reset();
    onClose();
  };

  return (
    <form
      className={`grid grid-cols-1 items-center justify-center gap-5 md:gap-6 ${createNewArtistIsPending || editArtistIsPending ? "opacity-70 pointer-events-none" : ""}`}
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* displayName */}
      <InputField<TattooArtistFormData>
        name="displayName"
        label="Name"
        register={register}
        errors={errors.displayName}
        required
      />

      {/* Email */}

      <InputField<TattooArtistFormData>
        name="email"
        label="Email"
        register={register}
        errors={errors.email}
        type="email"
        required
      />

      {/* Phone Number */}
      <InputField<TattooArtistFormData>
        label="Phone number"
        name="phone"
        errors={errors.phone}
        register={register}
        type="tel"
        required
      />

      {/* handle */}

      <InputField<TattooArtistFormData>
        name="handle"
        label="Instagram"
        register={register}
        errors={errors.handle}
        required
      />

      {/* Cover */}
      <InputFile<TattooArtistFormData>
        label="Avatar"
        name="cover"
        setValue={setValue}
        errors={errors.cover as unknown as FieldError}
        required
        multiple={false}
        initialUrls={artistToEdit?.coverUrl ? [artistToEdit.coverUrl] : []}
      />

      {/* Bio */}

      <TextAreaField<TattooArtistFormData>
        label="Biography"
        name="bio"
        register={register}
        errors={errors.bio}
      />

      {/* works */}
      <InputFile<TattooArtistFormData>
        label="Lookbook works"
        name="works"
        setValue={setValue}
        errors={errors.works as unknown as FieldError}
        required
        multiple
        initialUrls={artistToEdit?.works.map((w) => w.coverUrl) || []}
      />

      {/* Works meta */}

      {fields.map((field, index) => (
        <div key={field.id} className="border p-3 rounded-md border-onyx/50">
          <p className="text-sm font-semibold mb-2">Work #{index + 1}</p>

          {/* Title */}
          <InputField<TattooArtistFormData>
            name={`worksMeta.${index}.title`}
            label="Title"
            register={register}
            errors={errors?.worksMeta?.[index]?.title}
          />

          {/* Tags */}
          <Controller
            control={control}
            name={`worksMeta.${index}.tags`}
            render={({ field }) => (
              <CreatableSelect
                isMulti
                placeholder="Add tags"
                className="mt-2"
                options={tagOptions}
                // styles={{
                //   control: (base) => ({
                //     ...base,
                //     borderRadius: "10px",
                //     borderColor: "#1b1b1b",
                //     boxShadow: "none",
                //     minHeight: "42px",
                //   }),
                //   multiValue: (base) => ({
                //     ...base,
                //     backgroundColor: "#111",
                //     borderRadius: "6px",
                //   }),
                //   multiValueLabel: (base) => ({
                //     ...base,
                //     color: "#fff",
                //     fontSize: "12px",
                //   }),
                //   multiValueRemove: (base) => ({
                //     ...base,
                //     color: "#fff",
                //     ":hover": {
                //       backgroundColor: "#dc2626",
                //       color: "#fff",
                //     },
                //   }),
                // }}
                value={(field.value || []).map((tag: string) => ({
                  label: tag,
                  value: tag,
                }))}
                onChange={(selected) =>
                  field.onChange(
                    selected ? selected.map((item) => item.value) : [],
                  )
                }
              />
            )}
          />
        </div>
      ))}

      <button
        type="submit"
        disabled={
          createNewArtistIsPending ||
          editArtistIsPending ||
          !isValid ||
          (artistToEdit ? !isDirty : false)
        }
        className="submit-btn"
      >
        {createNewArtistIsPending || editArtistIsPending ? (
          artistToEdit ? (
            <>
              Updating <DotsLoader />
            </>
          ) : (
            <>
              Creating <DotsLoader />
            </>
          )
        ) : artistToEdit ? (
          "Update Artist"
        ) : (
          "Create Artist"
        )}
      </button>
    </form>
  );
}

export default TattooArtistsForm;
