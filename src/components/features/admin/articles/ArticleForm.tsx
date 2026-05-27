"use client";

import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import useArticle from "../../article/useArticle";
import ReactMarkdown from "react-markdown";
import {
  createArticleSchema,
  CreateArticleSchemaType,
} from "@/components/schema & types/article/article.schema";
import InputField from "@/components/ui/InputField";
import TextAreaField from "@/components/ui/TextAreaField";
import InputFile from "@/components/ui/InputFile";
import SelectBox from "@/components/ui/SelectBox";
import CreatableSelect from "react-select/creatable";

interface ArticleFormProps {
  onClose: () => void;
}

const STATUS_OPTIONS = [
  { id: 1, value: "DRAFT", label: "Draft" },
  { id: 2, value: "PUBLISHED", label: "Publish" },
];

function ArticleForm({ onClose }: ArticleFormProps) {
  const { createArticle, createArticleIsPending } = useArticle();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<CreateArticleSchemaType>({
    resolver: zodResolver(createArticleSchema),

    defaultValues: {
      title: "",
      excerpt: "",
      content: "",
      status: "DRAFT",
      tags: [],
    },
  });

  const content = watch("content");

  const onSubmit: SubmitHandler<CreateArticleSchemaType> = async (data) => {
    console.log("date =>", data);
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("excerpt", data.excerpt);
    formData.append("content", data.content);
    formData.append("status", data.status);

    data.tags.forEach((tag) => {
      formData.append("tags", tag);
    });

    if (data.cover) formData.append("cover", data.cover);
    console.log("formData =>", formData);
    await createArticle(formData, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* TITLE */}
      <InputField<CreateArticleSchemaType>
        label="Title"
        name="title"
        register={register}
        errors={errors.title}
        required
      />

      {/* EXCERPT */}
      <TextAreaField<CreateArticleSchemaType>
        label="Excerpt"
        name="excerpt"
        register={register}
        errors={errors.excerpt}
      />

      {/* COVER */}
      <InputFile<CreateArticleSchemaType>
        label="Cover"
        name="cover"
        setValue={setValue}
        errors={errors.cover}
        required
      />

      {/* STATUS */}
      <SelectBox<CreateArticleSchemaType>
        label="Status"
        name="status"
        register={register}
        errors={errors.status}
        options={STATUS_OPTIONS}
      />

      {/* CONTENT */}
      <TextAreaField<CreateArticleSchemaType>
        label="Content"
        name="content"
        register={register}
        errors={errors.content}
      />

      {/* TAGS */}

      <Controller
        control={control}
        name="tags"
        render={({ field }) => (
          <CreatableSelect
            isMulti
            placeholder="Add tags"
            className="mt-2"
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
              field.onChange(selected ? selected.map((item) => item.value) : [])
            }
          />
        )}
      />
      {errors.tags && (
        <p className="text-red-500 text-sm mt-1">{errors.tags.message}</p>
      )}

      {/* PREVIEW */}
      <div className="rounded-2xl border border-onyx/10 p-6">
        <h2 className="font-semibold mb-5">Live Preview</h2>

        <div className="prose prose-invert text-onyx/50">
          <ReactMarkdown>{content || "Nothing to preview"}</ReactMarkdown>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-end gap-3">
        <button type="button" className="btn" onClick={onClose}>
          Cancel
        </button>

        <button type="submit" disabled={createArticleIsPending} className="btn">
          {createArticleIsPending ? "Creating..." : "Create Article"}
        </button>
      </div>
    </form>
  );
}

export default ArticleForm;
