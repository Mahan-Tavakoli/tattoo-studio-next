"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

import AppointmentTable from "./AppointmentTable";
import DatePickerField from "@/components/ui/DatePickerField";
import { useTranslations } from "next-intl";

interface FilterForm {
  date: Date;
}

function AppointmentContainer() {
  const t = useTranslations("admin.appointment");
  const [period, setPeriod] = useState("day");

  const { control, watch } = useForm<FilterForm>({
    defaultValues: {
      date: new Date(),
    },
  });

  const selectedDate = watch("date");

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h1 className="md:text-xl sm:max-md:text-base text-sm font-bold">
          {t("title")}
        </h1>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mt-6 items-center justify-between bg-alabaster max-w-120 mx-auto p-4 text-onyx rounded-md">
        <div className="max-w-60">
          <DatePickerField
            label={t("filters.date")}
            name="date"
            control={control}
            errors={undefined}
            required
            excludeDays={[0]}
          />
        </div>

        <select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          className="border border-onyx/50 rounded-lg px-3 py-3 bg-transparent"
        >
          <option value="day">{t("filters.day")}</option>
          <option value="week">{t("filters.week")}</option>
          <option value="month">{t("filters.month")}</option>
          <option value="year">{t("filters.year")}</option>
        </select>
      </div>

      <div className="w-full h-[0.5px] my-10 bg-snow/30" />

      <AppointmentTable date={selectedDate} period={period} />
    </div>
  );
}

export default AppointmentContainer;
