"use client";

import Modal from "@/components/ui/Modal";
import { useCallback, useState } from "react";
import { PiPlus } from "react-icons/pi";
import StationConfigForm from "./StationConfigForm";
import GuestArtistTable from "./GuestArtistTable";
import { useTranslations } from "next-intl";

function GuestArtistContainer() {
  const t = useTranslations("admin.guestArtists");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h1 className="md:text-xl sm:max-md:text-base text-sm font-bold">
          {t("title")}
        </h1>
        <div className="flex items-center">
          <button
            className="btn flex gap-x-2 text-sm"
            onClick={() => setIsOpen(true)}
          >
            <span>{t("stationConfig")}</span>
            <PiPlus className="size-5" />
          </button>
        </div>
      </div>
      <div className="w-full h-[0.5px] my-10 bg-snow/30"></div>
      <GuestArtistTable />
      {/* Add New Category */}
      {isOpen && (
        <Modal title={t("stationConfig")} onClose={handleClose}>
          <StationConfigForm onClose={handleClose} />
        </Modal>
      )}
    </div>
  );
}

export default GuestArtistContainer;
