import React, { ReactElement, useEffect } from "react";
import { UserData } from "types";
import { getUserByUserNameSuccess } from "store/actions";
import wrapper from "store/configureStore";
import { GetAllUsers } from "lib/endpoints";
import withSession from "lib/sessions";
import useUser from "lib/useUser";
import { debugError } from "helpers/debug";
import AdminProvider, { useAdmin } from "components/Admin/AdminProvider";
import { AdminContainer, MainLayout } from "layouts";

// type Props = {
//   users: any;
// };
const Admin = (): ReactElement => {
  // const { storeAllUsers } = useAdmin();

  // useEffect(() => {
  //   storeAllUsers(users);
  // }, [users]);

  return (
    <>
      <AdminProvider>
        <MainLayout noDistraction>
          <AdminContainer />
        </MainLayout>
      </AdminProvider>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store }) => {
    // const users: UserData[] = await GetAllUsers();
    // TODO: Add all users to store for snappier updates

    return {
      props: {}
    };
  })
);

export default Admin;
