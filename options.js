document.addEventListener("DOMContentLoaded", () => {
  const haUrl = document.getElementById("ha_url");
  const haToken = document.getElementById("ha_token");
  const entityId = document.getElementById("entity_id");
  const status = document.getElementById("status");
  const toggleToken = document.getElementById("toggleToken");

  browser.storage.local.get(["ha_url", "ha_token", "entity_id"], (data) => {
    haUrl.value = data.ha_url || "";
    haToken.value = data.ha_token || "";
    entityId.value = data.entity_id || "";
  });

  document.getElementById("save").addEventListener("click", () => {
    const haUrlTrimmed = haUrl.value.trim()
    const haTokenTrimmed = haToken.value.trim()
    const entityIdTrimmed = entityId.value.trim()
    browser.storage.local.set({
      ha_url: haUrlTrimmed,
      ha_token: haTokenTrimmed,
      entity_id: entityIdTrimmed
    }, () => {
      fetch(`${haUrlTrimmed}/api/states/${entityIdTrimmed}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${haTokenTrimmed}`,
          "Content-Type": "application/json"
        }
      })
      .then((response) => {
        if (response.ok) {
          status.textContent = "Successfully saved";
        } else {
          if (response.status === 401) {
            status.textContent = "Saved, but unauthorized (possibly invalid token)";
          } else if (response.status === 404) {
            status.textContent = "Saved, but entity not found in HomeAssistant";
          } else {
            status.textContent = "Saved, but got HomeAssistant error";
          }
        }
      })
      .catch((e) => {
        console.log(e)
        status.textContent = "Saved, but connection to Home Assistant failed";
      })
      .finally(() => {
        setTimeout(() => (status.textContent = ""), 3000);
      })


    });
  });

  toggleToken.addEventListener("click", () => {
    const isHidden = haToken.type === "password";
    haToken.type = isHidden ? "text" : "password";
    toggleToken.textContent = isHidden ? "Hide" : "Show";
  });
});
