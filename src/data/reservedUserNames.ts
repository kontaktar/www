// since user profiles are going to be bound to root (kontaktar.is/userName), we have to reserve some usernames that might be used as routes later

const reservedRoutes = ["nyskra", "innskra", "askrift", "profill", "leit"];
const possibleFutureRoutes = [
  "admin",
  "audkenna",
  "borga",
  "dashboard",
  "greida",
  "kontaktar",
  "kontakt",
  "hafa-samband",
  "um-okkur",
  "serfraedingar",
  "serfraedingur"
];

export default [...reservedRoutes, ...possibleFutureRoutes];
