
const { override, useBabelRc } = require("customize-cra");

// eslint-disable-next-line no-undef
module.exports = override(
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useBabelRc()
);
