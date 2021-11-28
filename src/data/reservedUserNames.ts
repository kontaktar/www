// since user profiles are going to be bound to root (kontaktar.is/userName), we have to reserve some usernames that might be used as routes later

const reservedRoutes = ["nyskra", "innskra", "askrift", "profill", "leit"];
const possibleFutureRoutes = [
  "about",
  "admin",
  "audkenna",
  "borga",
  "company",
  "dashboard",
  "disclaimer",
  "einstaklingur",
  "fyrirtaeki",
  "fyrirvari",
  "greida",
  "group",
  "hafa-samband",
  "hopur",
  "kontakt",
  "kontaktar",
  "payment",
  "serfraedingar",
  "serfraedingur",
  "skilmalar",
  "subscription",
  "terms",
  "um-okkur",
  "user"
];

const banned = ["undefined", "null"];

export default [...reservedRoutes, ...possibleFutureRoutes, ...banned];
