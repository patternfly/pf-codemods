const { addCallbackParamTester,swapCallbackParamTester } = require("../../testHelpers");

swapCallbackParamTester('dualListSelector-update-paramCallbacks', 'DualListSelector', 'onAvailableOptionsSearchInputChanged', 1)
swapCallbackParamTester('dualListSelector-update-paramCallbacks', 'DualListSelector', 'onChosenOptionsSearchInputChanged', 1)
addCallbackParamTester('dualListSelector-update-paramCallbacks', 'DualListSelector', 'onListChange')

