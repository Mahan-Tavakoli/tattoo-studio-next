"use client";

import {
  Controller,
  FieldError,
  SubmitHandler,
  useForm,
} from "react-hook-form";
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
import { useTranslations } from "next-intl";
import DotsLoader from "@/components/ui/DotsLoader";
import { ArticleInfo } from "@/components/schema & types/article/article.types";
import { useEffect } from "react";
import useLocalizedField from "@/components/hook/useLocalizedField";

interface ArticleFormProps {
  onClose: () => void;
  articleToEdit?: ArticleInfo | null;
}

function ArticleForm({ onClose, articleToEdit }: ArticleFormProps) {
  const t = useTranslations("admin.article.form");
  const localizedField = useLocalizedField();
  const {
    createArticle,
    createArticleIsPending,
    editArticle,
    editArticleIsPending,
  } = useArticle();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    reset,
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

  const statusOptions = [
    {
      id: 1,
      value: "DRAFT",
      label: t("draft"),
    },
    {
      id: 2,
      value: "PUBLISHED",
      label: t("published"),
    },
  ];

  const content = watch("content");

  useEffect(() => {
    if (articleToEdit?.id) {
      reset({
        title: String(localizedField(articleToEdit, "title")) || "",
        excerpt: String(localizedField(articleToEdit, "excerpt")) || "",
        content: String(localizedField(articleToEdit, "content")) || "",
        status: articleToEdit.status,
        tags: articleToEdit.tags,
      });
    }
  }, [reset, articleToEdit?.id, localizedField]);

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

    if (articleToEdit?.id) {
      await editArticle({ articleId: articleToEdit.id, newArticle: formData });
    } else {
      await createArticle(formData);
    }

    reset();
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* TITLE */}
      <InputField<CreateArticleSchemaType>
        label={t("title")}
        name="title"
        register={register}
        errors={errors.title}
        required
      />

      {/* EXCERPT */}
      <TextAreaField<CreateArticleSchemaType>
        label={t("excerpt")}
        name="excerpt"
        register={register}
        errors={errors.excerpt}
      />

      {/* COVER */}
      <InputFile<CreateArticleSchemaType>
        label={t("cover")}
        name="cover"
        setValue={setValue}
        errors={errors.cover as unknown as FieldError}
        initialUrls={articleToEdit?.coverUrl ? [articleToEdit?.coverUrl] : []}
        required
      />

      {/* STATUS */}
      <SelectBox<CreateArticleSchemaType>
        label={t("status")}
        name="status"
        register={register}
        errors={errors.status}
        options={statusOptions}
      />

      {/* CONTENT */}
      <TextAreaField<CreateArticleSchemaType>
        label={t("content")}
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
            placeholder={t("addTags")}
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
        <h2 className="font-semibold mb-5">{t("livePreview")}</h2>

        <div className="prose prose-invert text-onyx/50">
          <ReactMarkdown>{content || t("nothingToPreview")}</ReactMarkdown>
        </div>
      </div>

      {/* SUBMIT */}
      <div className="flex justify-center gap-3">
        <button type="button" className="submit-btn" onClick={onClose}>
          {t("cancel")}
        </button>

        <button
          type="submit"
          disabled={createArticleIsPending || editArticleIsPending}
          className="submit-btn"
        >
          {createArticleIsPending || editArticleIsPending ? (
            <>
              {articleToEdit ? t("updating") : t("creating")}
              <DotsLoader />
            </>
          ) : articleToEdit ? (
            t("updateArticle")
          ) : (
            t("createArticle")
          )}
        </button>
      </div>
    </form>
  );
}

export default ArticleForm;
