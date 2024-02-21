// chrome.runtime.onInstalled.addListener(function () {
//   chrome.tabs.create({ url: "index.html" });
// });
chrome.action.onClicked.addListener(function() {
  chrome.tabs.create({url:chrome.runtime.getURL("index.html")});
});
