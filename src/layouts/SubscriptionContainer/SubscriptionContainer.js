import React from "react";
import PropTypes from "prop-types";
import { Button } from "components";
import styles from "./SubscriptionContainer.module.scss";

const SubscriptionContainer = () => {
  return (
    <div className={styles.subscription_container}>
      <div className={styles.description_container}>
        <h1>Áskriftarleið sniðin fyrir þig</h1>
        <p>
          Donec ullamcorper nulla non metus auctor fringilla. Donec id elit non
          mi porta gravida at eget metus. Aenean eu leo quam. Pellentesque
          ornare sem lacinia quam venenatis vestibulum. Vestibulum id ligula
          porta felis euismod semper. Sed posuere consectetur est at lobortis.
        </p>
      </div>
      <div className={styles.subscription_card_container}>
        <div className={styles.subscription_card}>
          <div className={styles.card_title}>
            <h2>Áskriftarleiðin þín</h2>
          </div>
          <div className={styles.card_content}>
            <div className={styles.price_section}>
              <h3>Mánaðargjald</h3>
              <span>
                <span className={styles.price}>2.500</span>
                <span className={styles.currency}> kr.</span>
              </span>
              <div className={styles.price_underline} />
            </div>
            <div className={styles.list_section}>
              <h4>Innifalið í verði:</h4>
              <ul>
                <li>Aðgangur að þínum prófíl</li>
                <li>test</li>
                <li>test</li>
                {/* <li>test</li>
                <li>test</li> */}
              </ul>
            </div>
            <div className={styles.button_section}>
              <Button>Kaupa</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionContainer;

SubscriptionContainer.propTypes = {
  className: PropTypes.string
};
SubscriptionContainer.defaultProps = {
  className: ""
};
