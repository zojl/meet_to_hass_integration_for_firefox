browser.storage.local.set({meet_status: false})
browser.storage.local.onChanged.addListener((changes) => {
  const changedItems = Object.keys(changes);
  if (!changedItems.includes("meet_status")) {
    return;
  }

  if (!Object.keys(changes.meet_status).includes("newValue")) {
    return;
  }

  if (changes.meet_status.newValue === changes.meet_status.oldValue) {
    return;
  }

  const newStatus = changes.meet_status.newValue;
  updateHomeAssistant(newStatus);
})

function updateHomeAssistant(isActive) {
  browser.storage.local.get(["ha_url", "ha_token", "entity_id"], (data) => {
    if (!data.ha_url || !data.ha_token || !data.entity_id) return;

    fetch(`${data.ha_url}/api/states/${data.entity_id}`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${data.ha_token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        state: isActive ? "on" : "off",
        friendly_name: "Meet status (Firefox)"
      })
    }).catch(err => console.error("Ошибка при отправке в Home Assistant:", err));
  });
}

function isTabActive(url) {
  return /\/[a-z]{3}-[a-z]{4}-[a-z]{3}/.test(url);
}

interval = setInterval(() => {
  browser.tabs.query({ url: "*://meet.google.com/*" }, (tabs) => {
    const tabUrls = tabs.map(tab => tab.url)
    const activeTabsCount = tabUrls.filter((url) => isTabActive(url)).length
    
    const hasMeeting = activeTabsCount > 0;
    browser.storage.local.set({meet_status: hasMeeting});
  });
}, 250);