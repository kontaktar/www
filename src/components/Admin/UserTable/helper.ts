import { UserData } from "types";

export const editHowDataIsDisplayed = (users): UserData[] => {
  if (!users) return [];
  console.log("ALL_USERS", users);
  const allUsers = [...users];

  return (
    allUsers
      // .filter((user) => user.id !== 451) // TestUser
      .map((user) => {
        return {
          id: user.id,
          ssn: user.ssn,
          userName: user.userName,
          firstName: user.firstName,
          lastName: user.lastName,
          postalCode: user.userAddress?.postalCode,
          streetName: user.userAddress?.streetName,
          city: user.userAddress?.city,
          country: user.userAddress.country,
          email: user.userMetaData?.email,
          website: user.userMetaData?.website,
          phoneNumber: user.userPhoneNumber?.phoneNumber,
          createdAt: user.userStatistics?.createdAt,
          lastLogin: user.userStatistics?.lastLogin
        };
      })
  );
};

export const tableColumns = [
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
    Header: "Símanúmer",
    accessor: "phoneNumber"
  },
  {
    Header: "Kennitala",
    accessor: "ssn"
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
    Header: "Vefsíða",
    accessor: "website"
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
];
