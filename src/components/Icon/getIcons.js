const fs = require("fs");

const files = fs.readdirSync("src/assets/icons");
const iconsFiles = files.filter((file) => file.endsWith(".js"));

fs.writeFileSync("src/components/Icon/icons.json", JSON.stringify(iconsFiles));

// dont use
