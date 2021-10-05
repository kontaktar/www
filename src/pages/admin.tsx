import React, { ReactElement } from "react";
import { useRouter } from "next/router";
import { IronSession, Routes, UserSessionStorage } from "types";
import wrapper from "store/configureStore";
import { GetIsAdmin } from "lib/endpoints";
import withSession from "lib/sessions";
import AdminProvider from "components/Admin/AdminProvider";
import { AdminContainer, MainLayout } from "layouts";

type Props = {
  isAdmin: boolean;
};
const Admin = ({ isAdmin }: Props): ReactElement => {
  const router = useRouter();

  if (!isAdmin && typeof window !== "undefined") {
    router.push(Routes.Frontpage);
  }

  if (!isAdmin) {
    return null;
  }

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
  withSession(async ({ req }) => {
    const user: UserSessionStorage = req?.session?.get(IronSession.UserSession);

    return {
      props: {
        isAdmin:
          (user?.isLoggedIn &&
            (await GetIsAdmin(user?.details?.phoneNumber))) ??
          false
      }
    };
  })
);

export default Admin;
