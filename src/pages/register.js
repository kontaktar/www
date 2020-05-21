import React from "react";
import { useDispatch } from "react-redux";
import { MainLayout } from "layouts";
import { createUser } from "../store/actions";

const Register = () => {
  const dispatch = useDispatch();
  const doStuff = () => {
    // temp quick update user for testing
    const updateUser = "01";
    dispatch(
      createUser({
        ssn: `12345678${updateUser}`,
        userName: `new_user_name${updateUser}`,
        firstName: "Test",
        lastName: "Testerson",
        email: `email@email${updateUser}.is`,
        website: "website.com",
        phoneNumber: "123456",
        streetName: "______XY____ 10",
        city: "RCK",
        postalCode: 120,
        country: "Niceland"
      })
    );
  };
  return (
    <MainLayout>
      <button type="button" onClick={doStuff}>
        Register
      </button>
    </MainLayout>
  );
};

export default Register;
