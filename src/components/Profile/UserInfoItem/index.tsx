import { Icon } from "components";
import styles from "./UserInfoItem.module.scss";
import colors from "styles/colors.module.scss";

type Props = {
  item: string;
  name: string;
};
const UserInfoItem = ({ item, name }: Props) => {
  const iconName = {
    phoneNumber: "phone-profile",
    email: "email-profile",
    website: "website",
    location: "location"
  };
  return (
    <>
      {item && (
        <span data-test={`${name}UserInfoItem`}>
          <Icon
            className={styles.user_info_icons}
            color={colors.red}
            name={iconName[name]}
          />
          {item}
        </span>
      )}
    </>
  );
};
export default UserInfoItem;
