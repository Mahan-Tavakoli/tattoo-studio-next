import { CiTrash } from "react-icons/ci";
import DotsLoader from "./DotsLoader";

interface ConfirmDeleteProps {
  resourceName: string;
  disabled?: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

function ConfirmDelete({
  resourceName,
  disabled,
  onClose,
  onConfirm,
}: ConfirmDeleteProps) {
  return (
    <div className="space-y-6">
      {/* ICON */}

      <div className="flex justify-center">
        <div className="flex items-center justify-center size-16 rounded-full bg-red-500/10 border border-red-500/20">
          <CiTrash className="size-8 text-red-400" />
        </div>
      </div>

      {/* CONTENT */}

      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold">Delete {resourceName}?</h3>

        <p className="text-sm text-onyx/60 leading-relaxed">
          This action cannot be undone.
          <br />
          The selected {resourceName.toLowerCase()} will be permanently removed.
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
          className="btn bg-red-950 hover:bg-red-900 text-snow"
          onClick={onConfirm}
          disabled={disabled}
        >
          {disabled ? (
            <>
              Deleting <DotsLoader />
            </>
          ) : (
            "Delete"
          )}
        </button>
      </div>
    </div>
  );
}

export default ConfirmDelete;
