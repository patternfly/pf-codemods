const { addCallbackParamTester} = require('../../testHelpers')
const propNames = ["onFavorite", "onSearch"];

addCallbackParamTester("applicationLauncher-updated-params", "ApplicationLauncher", propNames);
