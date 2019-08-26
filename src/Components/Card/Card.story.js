import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, text, withKnobs } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { Card, CardContent } from "./Card";
import CardReadme from "./README.md";

storiesOf("Card", module)
  .addDecorator(withKnobs)
  .addParameters({
    jest: ["Card.test"],
    readme: {
      sidebar: CardReadme,
      includePropTables: [Card]
    }
  })
  .add("Default", () => (
    <Card
      disabled={boolean("Disabled", false)}
      onClick={action("Card-clicked")}
    >
      <CardContent
        paragraph={text(
          "Paragraph",
          "Eos id etiam mnesarchu m, pri purto meliore no. Ius ut liber eirmod, te partem fabellas eos. His autem adipisci theophrastus ne. Ponderum maiestatis eum eu. Mea dolor oportere vituperatoribus no, similique forensibus cu qui, usu ut probo accumsan. Ea ullum mazim vidisse eos, ex iudico temporibus sea. Decore gloriatur intellegat te sed, ex modus illum concludaturque pri. Id sonet quaeque eum, ius et choro quodsi, an duo ignota instructior. Autem maluisset has ea, in mei quis mundi. Ea eruditi inermis maiorum sed, ne eirmod conclusionemque vix, id sit audiam nostrud atomorum."
        )}
        signature={text(
          "signature",
          "Martyna Anna Zapart & Einar Alexander Eymundsson & Flóki"
        )}
      />
    </Card>
  ));
