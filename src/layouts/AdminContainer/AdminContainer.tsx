import React, { ReactElement } from "react";
import UserTable from "components/Admin/UserTable";

type Props = {
  className?: string;
};

const AdminContainer = ({ className = "" }: Props): ReactElement => {
  return <UserTable />;
};

export default AdminContainer;
