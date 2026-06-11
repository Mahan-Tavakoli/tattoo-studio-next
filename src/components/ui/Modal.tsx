"use client";

import { useEffect, useCallback, ReactNode } from "react";
import { HiOutlineX } from "react-icons/hi";
import useOutsideClick from "@/components/hook/useOutsideClick";
import Image from "next/image";

interface ModalProps {
  title?: string;
  onClose: () => void;
  children: ReactNode;

  large?: boolean;
}

function Modal({ onClose, children, title, large = false }: ModalProps) {
  const ref = useOutsideClick(onClose);

  // Close on Escape key
  const escFunction = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    },
    [onClose],
  );

  useEffect(() => {
    document.addEventListener("keydown", escFunction);

    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", escFunction);

      document.body.style.overflow = "auto";
    };
  }, [escFunction]);

  return (
    <div
      className={`fixed inset-0 bg-onyx/50 backdrop-blur-sm transition-opacity duration-300 ease-in-out ${large ? "z-100" : "z-50"}`}
    >
      <div
        ref={ref}
        className={`
          fixed top-1/2 left-1/2
          -translate-x-1/2 -translate-y-1/2
          rounded-lg text-onyx bg-alabaster
          shadow-lg transition-all duration-500 ease-out
          flex flex-col

          ${
            large
              ? `
                w-[95vw]
                max-w-6xl
                h-[90vh]
              `
              : `
                w-[calc(100vw-25%)]
                md:max-w-lg
                max-h-[calc(100vh-25%)]
              `
          }
        `}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between border-b border-onyx/20 p-4 shrink-0">
          {title ? (
            <div className="flex items-center gap-x-2">
              <div className="relative w-10 h-10">
                <Image
                  src="/images/Logo.png"
                  alt="Logo"
                  loading="lazy"
                  fill
                  quality={75}
                  className="object-cover"
                />
              </div>

              <h1 className="font-semibold text-sm md:text-lg">{title}</h1>
            </div>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="cursor-pointer bg-inherit hover:bg-carbon-black rounded-lg p-1 transition-colors duration-200 group"
          >
            <HiOutlineX className="w-5 h-5 group-hover:text-snow text-onyx/75" />
          </button>
        </div>

        {/* BODY */}
        <div className="overflow-y-auto p-4 flex-1">{children}</div>
      </div>
    </div>
  );
}

export default Modal;
