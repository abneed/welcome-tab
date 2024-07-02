chrome.runtime.onInstalled.addListener(() => {
	chrome.action.onClicked.addListener(() => {
		chrome.tabs.create({
			url: chrome.runtime.getURL("/index.html")
		})
	});
});