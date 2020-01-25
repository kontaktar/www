import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Card } from "components";
import CardsContainer from "./CardsContainer";
import CardsContainerReadme from "./README.md";

storiesOf("Layouts", module)
  .addParameters({
    jest: ["CardsContainer.test"],
    readme: {
      sidebar: CardsContainerReadme,
      includePropTables: [CardsContainer]
    }
  })
  .add("CardsContainer", () => (
    <CardsContainer
      disabled={boolean("Disabled", false)}
      onClick={action("CardsContainer-clicked")}
    >
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        title="Tek að mér umbrot bóka og bæklinga"
        description="Hef innleitt SharePoint hjá ráðuneytum, Advania og Vífilfelli. Haldið fjölda byrjendanámskeiða fyrir fyrirtæki og einstaklinga, aðallega hjá SharePoint-skólanum i Faxafeni."
        years={10}
        months={12}
      />
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        title="Tek að mér umbrot bóka og bæklinga"
        description="Bara stundum."
        years={10}
        months={12}
      />
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        title="Tek að mér umbrot bóka og bæklinga"
        description="Hef innleitt SharePoint hjá ráðuneytum, Advania og Vífilfelli. Haldið fjölda byrjendanámskeiða fyrir fyrirtæki og einstaklinga, aðallega hjá SharePoint-skólanum i Faxafeni."
        years={10}
        months={12}
      />
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        title="Tek að mér umbrot bóka og bæklinga"
        description="Bara stundum."
        years={10}
        months={12}
      />
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        title="Tek að mér umbrot bóka og bæklinga"
        description="Hef innleitt SharePoint hjá ráðuneytum, Advania og Vífilfelli. Haldið fjölda byrjendanámskeiða fyrir fyrirtæki og einstaklinga, aðallega hjá SharePoint-skólanum i Faxafeni."
        years={10}
        months={12}
      />
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        title="Tek að mér umbrot bóka og bæklinga"
        description="Bara stundum."
        years={10}
        months={12}
      />
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        title="Tek að mér umbrot bóka og bæklinga"
        description="Hef innleitt SharePoint hjá ráðuneytum, Advania og Vífilfelli. Haldið fjölda byrjendanámskeiða fyrir fyrirtæki og einstaklinga, aðallega hjá SharePoint-skólanum i Faxafeni."
        years={10}
        months={12}
      />
      <Card
        disabled={boolean("Disabled", false)}
        onClick={action("Card-clicked")}
        title="Tek að mér umbrot bóka og bæklinga"
        description="Bara stundum."
        years={10}
        months={12}
      />
    </CardsContainer>
  ));
