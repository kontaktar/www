// since user profiles are going to be bound to root (kontaktar.is/userName), we have to reserve some usernames that might be used as routes later

const reservedRoutes = ["nyskra", "innskra", "askrift", "profill", "leit"];
const possibleFutureRoutes = [
  "admin",
  "audkenna",
  "borga",
  "dashboard",
  "einstaklingur",
  "fyrirtaeki",
  "greida",
  "hafa-samband",
  "kontakt",
  "kontaktar",
  "um-okkur",
  "serfraedingar",
  "serfraedingur",
  "skilmalar"
];

export default [...reservedRoutes, ...possibleFutureRoutes];
