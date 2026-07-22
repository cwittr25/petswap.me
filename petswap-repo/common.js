/* ============================================================
   petswap.me — shared helpers (used by every page)
   ============================================================ */
(function () {
  "use strict";

  function findItem(id) {
    return ITEMS.find(function (it) { return it.id === id; });
  }

  function initials(name) {
    return name
      .split(" ")
      .map(function (w) { return w[0]; })
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function tagString(flags) {
    const tags = [];
    if (flags.fly) tags.push("F");
    if (flags.ride) tags.push("R");
    if (flags.neon) tags.push("N");
    if (flags.mega) tags.push("M");
    return tags.join("");
  }

  function computeItemValue(entry) {
    const item = findItem(entry.itemId);
    if (!item) return 0;
    const demandMult = DEMAND_MULTIPLIERS[item.demand] || 1;
    const variantMult = item.category === "pets"
      ? getVariantMultiplier(entry.flags)
      : 1;
    return item.value * demandMult * variantMult;
  }

  function formatValue(n) {
    return Math.round(n).toLocaleString("en-US");
  }

  function makeThumb(item, size) {
    const wrap = document.createElement("div");
    wrap.className = size === "small" ? "result-thumb" : "tile-thumb";
    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      wrap.appendChild(img);
    } else {
      wrap.textContent = initials(item.name);
    }
    return wrap;
  }

  /* ---------------- Inventory (localStorage stand-in) ----------------
     Placeholder for real account integration -- same shape as the trade
     grids ({itemId, flags}) so it's a drop-in swap for a real backend
     later. Lives in the browser only: clearing site data / switching
     devices loses it, same as any localStorage-based feature. */

  const INVENTORY_KEY = "petswapInventory";

  function getInventory() {
    try {
      const raw = localStorage.getItem(INVENTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveInventory(list) {
    try {
      localStorage.setItem(INVENTORY_KEY, JSON.stringify(list));
    } catch (e) {
      // localStorage unavailable (private browsing, quota, etc.) -- fail quietly,
      // the trade calculator itself still works without inventory tracking.
    }
  }

  function flagsMatch(a, b) {
    return a.fly === b.fly && a.ride === b.ride && a.neon === b.neon && a.mega === b.mega;
  }

  function addToInventory(entry) {
    const list = getInventory();
    list.push({ itemId: entry.itemId, flags: entry.flags });
    saveInventory(list);
  }

  function removeOneFromInventory(entry) {
    const list = getInventory();
    const idx = list.findIndex(function (inv) {
      return inv.itemId === entry.itemId && flagsMatch(inv.flags, entry.flags);
    });
    if (idx !== -1) {
      list.splice(idx, 1);
      saveInventory(list);
      return true;
    }
    return false; // wasn't in inventory (e.g. testing a trade for something you don't own) -- fine, not an error
  }

  // Exposed as plain globals -- matches the site's existing simple, buildless
  // style (ITEMS/CATEGORIES/etc. are already plain globals from data.js).
  window.PetSwapCommon = {
    findItem: findItem,
    initials: initials,
    tagString: tagString,
    computeItemValue: computeItemValue,
    formatValue: formatValue,
    makeThumb: makeThumb,
    getInventory: getInventory,
    saveInventory: saveInventory,
    addToInventory: addToInventory,
    removeOneFromInventory: removeOneFromInventory
  };
})();
