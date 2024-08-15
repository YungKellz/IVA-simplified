chrome.runtime.onInstalled.addListener(async () => {
  let url = chrome.runtime.getURL("html/hello.html");
  let tab = await chrome.tabs.create({ url });

  chrome.storage.sync.get(['showClock'], (result) => {
    if (result.showClock) {
      chrome.action.setBadgeText({ text: 'ON' });
    }
  });

  console.log('installed');

  chrome.storage.sync.get(['timer'], (result) => {
    console.log('result', result)
    if (!result.timer) {
      chrome.storage.sync.set({ 'timer': 1 })
    }
  });
});

