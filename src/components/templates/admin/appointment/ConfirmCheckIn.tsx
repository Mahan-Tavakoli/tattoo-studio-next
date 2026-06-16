import DotsLoader from "@/components/ui/DotsLoader";
import { CircleCheck } from "lucide-react";

interface ConfirmCheckInProps {
  disabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmCheckIn({
  disabled,
  onClose,
  onConfirm,
}: ConfirmCheckInProps) {
  return (
    <div className="space-y-6">
      {/* ICON */}
      <div className="flex justify-center">
        <div className="flex items-center justify-center size-16 rounded-full bg-green-500/10 border border-green-500/20">
          <CircleCheck className="size-8 text-green-400" />
        </div>
      </div>

      {/* CONTENT */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Confirm Check-In</h3>

        <p className="text-sm text-onyx/60 leading-relaxed">
          Are you sure you want to check in this client?
          <br />
          This action will mark the appointment as checked in.
        </p>
      </div>

      {/* ACTIONS */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <button
          type="button"
          className="btn"
          onClick={onClose}
          disabled={disabled}
        >
          Cancel
        </button>

        <button
          type="button"
          className="btn bg-green-700 hover:bg-green-600 text-snow"
          onClick={onConfirm}
          disabled={disabled}
        >
          {disabled ? (
            <>
              Checking In <DotsLoader />
            </>
          ) : (
            "Check In"
          )}
        </button>
      </div>
    </div>
  );
}

export default ConfirmCheckIn;