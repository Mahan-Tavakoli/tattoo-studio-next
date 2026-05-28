"use client";

import AppointmentTable from "./AppointmentTable";

function AppointmentContainer() {
  //   const [isOpen, setIsOpen] = useState<boolean>(false);

  //   const handleClose = useCallback(() => {
  //     setIsOpen(false);
  //   }, []);

  return (
    <div className="container">
      <div className="flex items-center justify-between">
        <h1 className="md:text-xl sm:max-md:text-base text-sm font-bold">
          Appointments
        </h1>
        {/* <div className="flex items-center">
          <button
            className="btn flex gap-x-2 text-sm"
            onClick={() => setIsOpen(true)}
          >
            <span>Create Artist</span>
            <PiPlus className="size-5" />
          </button>
        </div> */}
      </div>
      <div className="w-full h-[0.5px] my-10 bg-snow/30"></div>
      <AppointmentTable />
      {/* Add New Category */}
      {/* {isOpen && (
        <Modal title="Creating new Artist" onClose={handleClose}>
          <TattooArtistsForm onClose={handleClose} />
        </Modal>
      )} */}
    </div>
  );
}

export default AppointmentContainer;
