import React, { useState } from "react";
import { useFormik } from "formik";
import { User, UserAddress, UserAddressEnum, UserData, UserEnum } from "types";
import { deleteUserExperience } from "store/actions";
import { DeleteUser } from "lib/endpoints";
import useAuth from "hooks/useAuth";
import { Button, LastChange } from "components";
import { useAdmin } from "components/Admin/AdminProvider";
import { MUIInput as Input } from "components/Input";
import Modal from "components/Modal";
import styles from "./EditUser.module.scss";

type Props = {
  userData: UserData;
  onCloseModal?: () => void;
};
const EditUserForm = ({
  userData,
  onCloseModal
}: Props): React.ReactElement => {
  const { mutateUsers } = useAdmin();
  const [timestamp, setTimestamp] = useState(undefined);
  const { editUser, status } = useAuth();
  const [openConfirmationModal, setOpenConfirmationModal] = React.useState(
    false
  );

  const formik = useFormik({
    initialValues: {
      ...userData
    } as UserData,
    // validationSchema: phoneNumberSchema,
    onSubmit: async (values) => {
      setTimestamp(new Date());

      await editUser(values);
      mutateUsers();
    }
  });

  const promptUserToConfirm = () => {
    setOpenConfirmationModal(true);
  };

  const deleteUser = async () => {
    await DeleteUser(userData.id);
    mutateUsers();
    setOpenConfirmationModal(false);
    onCloseModal();
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit} className={styles.form}>
        <div className={styles.input_rows}>
          <div className={styles.input_line}>
            <Input
              id={UserEnum.FirstName}
              name={UserEnum.FirstName}
              placeholder="Fornafn"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserEnum.FirstName, true, true)
              }
              value={formik.values.firstName}
              error={formik.errors.firstName}
              isTouched={formik.touched.firstName}
              data-test="FirstNameInput"
            />
            <Input
              id={UserEnum.LastName}
              name={UserEnum.LastName}
              placeholder="Eftirnafn"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserEnum.LastName, true, true)
              }
              value={formik.values.lastName}
              error={formik.errors.lastName}
              isTouched={formik.touched.lastName}
              data-test="LastNameInput"
            />
            <Input
              id={UserEnum.UserName}
              name={UserEnum.UserName}
              placeholder="Notendanafn"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserEnum.UserName, true, true)
              }
              value={formik.values.userName}
              error={formik.errors.userName}
              isTouched={formik.touched.userName}
              data-test="UserNameInput"
            />
          </div>
          <div className={styles.input_line}>
            <Input
              id={UserAddressEnum.StreetName}
              name={UserAddressEnum.StreetName}
              placeholder="Heimilisfang"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserAddressEnum.StreetName, true, true)
              }
              value={formik.values.streetName}
              error={formik.errors.streetName}
              isTouched={formik.touched.streetName}
              data-test="StreetNameInput"
            />
            <Input
              id={UserAddressEnum.City}
              name={UserAddressEnum.City}
              placeholder="Bær"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserAddressEnum.City, true, true)
              }
              value={formik.values.city}
              error={formik.errors.city}
              isTouched={formik.touched.city}
              data-test="CityInput"
            />
            <Input
              id={UserAddressEnum.PostalCode}
              name={UserAddressEnum.PostalCode}
              placeholder="Póstfang"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserAddressEnum.PostalCode, true, true)
              }
              value={formik.values.postalCode}
              error={formik.errors.postalCode}
              isTouched={formik.touched.postalCode}
              data-test="PostalCodeInput"
            />
            <Input
              id={UserAddressEnum.Country}
              name={UserAddressEnum.Country}
              placeholder="Land"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserAddressEnum.Country, true, true)
              }
              value={formik.values.country}
              error={formik.errors.country}
              isTouched={formik.touched.country}
              data-test="CountryInput"
            />
            <Input
              id={UserEnum.PhoneNumber}
              name={UserEnum.PhoneNumber}
              placeholder="Símanúmer"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserEnum.PhoneNumber, true, true)
              }
              value={formik.values.phoneNumber}
              error={formik.errors.phoneNumber}
              isTouched={formik.touched.phoneNumber}
              data-test="PhoneNumberInput"
            />
          </div>
          <div className={styles.input_line}>
            <Input
              id={UserEnum.Email}
              name={UserEnum.Email}
              placeholder="Netfang"
              onChange={formik.handleChange}
              onBlur={() => formik.setFieldTouched(UserEnum.Email, true, true)}
              value={formik.values.email}
              error={formik.errors.email}
              isTouched={formik.touched.email}
              data-test="EmailInput"
            />
            <Input
              id={UserEnum.Website}
              name={UserEnum.Website}
              placeholder="Vefsíða"
              onChange={formik.handleChange}
              onBlur={() =>
                formik.setFieldTouched(UserEnum.Website, true, true)
              }
              value={formik.values.website}
              error={formik.errors.website}
              isTouched={formik.touched.website}
              data-test="WebsiteInput"
            />
          </div>
        </div>
        <div className={styles.button_line}>
          <Button.Delete
            className={styles.button}
            // isLoading={status === "USER_EDIT_REQUEST"}
            onClick={promptUserToConfirm}
            // type="save"
          />
          {timestamp && status !== "USER_EDIT_REQUEST" && (
            <LastChange
              className={styles.user_info_timestamp}
              timestamp={timestamp}
            />
          )}
          <Button.Edit
            type="save"
            className={styles.button_save}
            isLoading={status === "USER_EDIT_REQUEST"}
            // onClick={}
          />
        </div>
      </form>

      <Modal.Confirm
        open={openConfirmationModal}
        onConfirm={() => deleteUser()}
        onCancel={() => setOpenConfirmationModal(false)}
      />
    </>
  );
};
export default EditUserForm;
