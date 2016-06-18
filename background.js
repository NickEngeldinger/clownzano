chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		if (request.message === 'set_tab_url') {
			chrome.tabs.update({'url': request.url });
		}
	}
);
