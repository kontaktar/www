import React, { ReactElement } from "react";
import { useTable } from "react-table";
import styles from "./AdminContainer.module.scss";

type Props = {
  className?: string;
  users: any;
};
const AdminContainer = ({ className = "", users }: Props): ReactElement => {
  const userData = React.useMemo(() => users, [users]);
  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id"
      },
      {
        Header: "Notendanafn",
        accessor: "userName"
      },
      {
        Header: "Fornafn",
        accessor: "firstName"
      },
      {
        Header: "Eftirnafn",
        accessor: "lastName"
      },
      {
        Header: "Email",
        accessor: "email"
      },
      {
        Header: "Vefsíða",
        accessor: "website"
      },
      {
        Header: "Símanúmer",
        accessor: "phoneNumber"
      },
      {
        Header: "createdAt",
        accessor: "createdAt"
      },
      {
        Header: "lastLogin",
        accessor: "lastLogin"
      },
      {
        Header: "Kennitala",
        accessor: "ssn"
      },
      {
        Header: "Póstnúmer",
        accessor: "postalCode"
      },
      {
        Header: "Gata",
        accessor: "streetName"
      },
      {
        Header: "Borg",
        accessor: "city"
      },
      {
        Header: "Land",
        accessor: "country"
      }
    ],
    []
  );
  console.log("columns", columns);
  console.log("userData", userData);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable({
    columns,
    data: userData
  });

  return (
    <div className={styles.admincontainer}>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AdminContainer;
