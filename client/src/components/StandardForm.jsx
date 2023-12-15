import { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { getStandardsById } from "../services/standard";
import Modal from "./Modal";

const StandardForm = ({ showForm, handleClose, userId }) => {
  const [rows, setRows] = useState([]);
  useEffect(() => {
    getStandardsById(userId)
      .then((res) => {
        setRows(res);
      })
      .catch((err) => generateErrorToast(err));
  }, []);
  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Standard",
      selector: (row) => row.standard,
      sortable: true,
    },
    {
      name: "Percentage",
      selector: (row) => row.percentage,
      sortable: true,
    },
    {
      name: "Remark",
      selector: (row) => row.remark,
      sortable: true,
    },
  ];
  return (
    <>
      <Modal showForm={showForm} handleClose={handleClose}>
        <h2 className="text-2xl my-2">Previous Standard Detail</h2>
        <DataTable columns={columns} data={rows} />
      </Modal>
    </>
  );
};

export default StandardForm;
