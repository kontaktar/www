import React, { ReactElement } from "react";
import { useTable } from "react-table";
import { User, UserAddress, UserData } from "types";
import { Button, Icon, Input } from "components";
import { useAdmin } from "components/Admin/AdminProvider";
import EditUser from "components/Forms/EditUser";
import Modal from "components/Modal";
import styles from "./UserTable.module.scss";

import { editHowDataIsDisplayed, tableColumns } from "./helper";

type Props = {
  className?: string;
};

const UserTable = ({ className = "" }: Props): ReactElement => {
  const { users, isAdmin } = useAdmin();
  const [openModal, setOpenModal] = React.useState(false);
  const [userToEdit, setUserToEdit] = React.useState<UserData>();
  const allUsers = React.useMemo(() => editHowDataIsDisplayed(users), [users]);
  const columns = React.useMemo(() => tableColumns, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      data: allUsers
    });

  const editUserData = (data) => {
    setOpenModal(true);

    //TODO: use isAdmin
    // TODO: filter out role and phoneNumber, we need only admin to be able to change those
    setUserToEdit(users.find((user) => user.id === data.original.id));
  };

  return (
    <div className={styles.usertable}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              <th>Breyta</th>
              {headerGroup.headers.map((column, j) => (
                <th key={`${i + j}`} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr key={i} {...row.getRowProps()}>
                <td>
                  <Button
                    type="button"
                    modifier={["raw"]}
                    className={styles.icon_button}
                    onClick={() => editUserData(row)}
                    // data-test={`editUser`}
                  >
                    <Icon className={styles.edit_icon} name="edit" />
                  </Button>
                </td>
                {row.cells.map((cell, j) => {
                  return (
                    <td key={i + j} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        className={styles.modal}
        ariaLabel="Breyta notanda"
        open={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className={styles.modal_content}>
          <h1 className={styles.edit_heading}>Breyta notanda</h1>
          <EditUser
            userData={userToEdit}
            onCloseModal={() => setOpenModal(false)}
          />
        </div>
      </Modal>
    </div>
  );
};

export default UserTable;
