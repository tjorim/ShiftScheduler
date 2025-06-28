'use strict';

function getProperties(_values, defaultProperties /* , target: Platform*/) {
  // Do the values manipulation here to control the visibility of properties in Studio and Studio Pro conditionally.
  /* Example
  if (values.myProperty === "custom") {
      delete defaultProperties.properties.myOtherProperty;
  }
  */
  return defaultProperties;
}
// export function check(_values: ShiftSchedulerPreviewProps): Problem[] {
//     const errors: Problem[] = [];
//     // Add errors to the above array to throw errors in Studio and Studio Pro.
//     /* Example
//     if (values.myProperty !== "custom") {
//         errors.push({
//             property: `myProperty`,
//             message: `The value of 'myProperty' is different of 'custom'.`,
//             url: "https://github.com/myrepo/mywidget"
//         });
//     }
//     */
//     return errors;
// }
function getPreview(_values, isDarkMode, _version) {
  // Customize your pluggable widget appearance for Studio Pro.
  return {
    type: "Container",
    borders: true,
    borderRadius: 8,
    backgroundColor: isDarkMode ? "#2d2d2d" : "#f0f8ff",
    padding: 20,
    children: [{
      type: "Text",
      content: "🎯 Shift Scheduler Widget",
      fontSize: 16,
      bold: true,
      fontColor: isDarkMode ? "#ffffff" : "#007acc"
    }, {
      type: "Text",
      content: "Version: 1.6.0",
      fontSize: 12,
      fontColor: isDarkMode ? "#cccccc" : "#666666"
    }, {
      type: "Text",
      content: "✅ Studio Pro rendering working",
      fontSize: 12,
      fontColor: isDarkMode ? "#90ee90" : "#008000"
    }]
  };
}
function getCustomCaption(_values, _platform) {
  return "Shift Scheduler (Test)";
}
exports.getCustomCaption = getCustomCaption;
exports.getPreview = getPreview;
exports.getProperties = getProperties;
