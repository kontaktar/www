import React, { ReactElement } from "react";
import { getUserByUserNameSuccess } from "store/actions";
import wrapper from "store/configureStore";
import { GetAllUsers } from "lib/endpoints";
import withSession from "lib/sessions";
import useUser from "lib/useUser";
import { debugError } from "helpers/debug";
import { AdminContainer, MainLayout } from "layouts";

type Props = {
  users: any;
};
const Admin = ({ users }: Props): ReactElement => {
  // console.log("users", users);
  //   const { user } = useUser();

  return (
    <>
      <MainLayout noDistraction>
        <AdminContainer users={users} />
      </MainLayout>
    </>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  withSession(async ({ store }) => {
    const users = await GetAllUsers();
    return {
      props: { users }
    };
  })
);

export default Admin;
