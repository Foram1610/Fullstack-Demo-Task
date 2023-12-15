import { useState } from "react";
import DataTable from "react-data-table-component";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import StandardForm from "./StandardForm";

const UserData = ({ userData }) => {
  const [showForm, setShowForm] = useState(false);
  const [userId, setUserId] = useState(null);

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Current Standard",
      selector: (row) => row.current_standard,
      sortable: true,
    },
    {
      name: "Previous Standards Details",
      cell: (row) => (
        <button
          className="p-2 hover:bg-secondary rounded-md"
          onClick={(e) => {
            e.preventDefault();
            setShowForm(true);
            console.log(row.id);
            setUserId(row.id);
          }}
        >
          <HiOutlineDotsHorizontal className="h-5 w-5 text-primary border border-solid border-black rounded" />
        </button>
      ),
    },
  ];

  function handleClose() {
    setShowForm(false);
    setUserId(null);
  }
  return (
    <>
      <DataTable columns={columns} data={userData} pagination />
      {showForm && (
        <StandardForm
          showForm={showForm}
          handleClose={handleClose}
          userId={userId}
        />
      )}
    </>
  );
};

export default UserData;
