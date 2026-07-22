(function () {
  "use strict";

  const { findItem, initials, tagString, computeItemValue, formatValue, makeThumb,
          addToInventory, removeOneFromInventory } = window.PetSwapCommon;

  /* ---------------- State ---------------- */

  const state = {
    you: [],   // { itemId, flags: {fly, ride, neon, mega} }
    them: []
  };

  let pickerSide = null;      // "you" | "them" — which grid we're adding to
  let activeCategory = "all";
  let pendingPetItem = null;  // item waiting on the variant popup
  let pendingFlags = { fly: false, ride: false, neon: false, mega: false };

  /* ---------------- DOM refs ---------------- */

  const els = {
    youGrid: document.getElementById("youGrid"),
    themGrid: document.getElementById("themGrid"),
    youTotal: document.getElementById("youTotal"),
    themTotal: document.getElementById("themTotal"),
    verdict: document.getElementById("verdict"),
    scaleFill: document.getElementById("scaleFill"),
    confirmTradeBtn: document.getElementById("confirmTradeBtn"),

    pickerOverlay: document.getElementById("pickerOverlay"),
    pickerClose: document.getElementById("pickerClose"),
    categoryTabs: document.getElementById("categoryTabs"),
    searchInput: document.getElementById("searchInput"),
    itemResults: document.getElementById("itemResults"),

    variantOverlay: document.getElementById("variantOverlay"),
    variantClose: document.getElementById("variantClose"),
    variantImage: document.getElementById("variantImage"),
    variantName: document.getElementById("variantName"),
    variantAdd: document.getElementById("variantAdd"),
    btnFly: document.getElementById("btnFly"),
    btnRide: document.getElementById("btnRide"),
    btnNeon: document.getElementById("btnNeon"),
    btnMega: document.getElementById("btnMega")
  };

  /* ---------------- Helpers ---------------- */

  function sideTotal(list) {
    return list.reduce(function (sum, entry) {
      return sum + computeItemValue(entry);
    }, 0);
  }

  /* ---------------- Rendering: grids ---------------- */

  function renderGrid(side) {
    const list = state[side];
    const gridEl = side === "you" ? els.youGrid : els.themGrid;
    gridEl.innerHTML = "";

    list.forEach(function (entry, index) {
      const item = findItem(entry.itemId);
      if (!item) return;

      const tile = document.createElement("div");
      tile.className = "tile tile-item";

      tile.appendChild(makeThumb(item, "large"));

      const name = document.createElement("div");
      name.className = "tile-name";
      name.textContent = item.name;
      tile.appendChild(name);

      if (item.category === "pets") {
        const tags = tagString(entry.flags);
        if (tags) {
          const tagEl = document.createElement("div");
          tagEl.className = "tile-tags";
          tagEl.textContent = tags;
          tile.appendChild(tagEl);
        }
      }

      const remove = document.createElement("button");
      remove.className = "tile-remove";
      remove.setAttribute("aria-label", "Remove " + item.name);
      remove.textContent = "\u00d7";
      remove.addEventListener("click", function (e) {
        e.stopPropagation();
        list.splice(index, 1);
        renderGrid(side);
        updateTotals();
      });
      tile.appendChild(remove);

      gridEl.appendChild(tile);
    });

    const addTile = document.createElement("div");
    addTile.className = "tile tile-add";
    addTile.setAttribute("role", "button");
    addTile.setAttribute("aria-label", "Add item");
    addTile.textContent = "+";
    addTile.addEventListener("click", function () { openPicker(side); });
    gridEl.appendChild(addTile);
  }

  /* ---------------- Totals + scale bar ---------------- */

  function updateTotals() {
    const youValue = sideTotal(state.you);
    const themValue = sideTotal(state.them);

    els.youTotal.textContent = formatValue(youValue);
    els.themTotal.textContent = formatValue(themValue);

    const total = youValue + themValue;
    const yourShare = total === 0 ? 50 : (youValue / total) * 100;

    els.scaleFill.style.width = yourShare + "%";

    const diff = yourShare - 50;
    els.verdict.classList.remove("is-win", "is-lose");

    if (total === 0 || Math.abs(diff) < 1.5) {
      els.verdict.textContent = "Fair";
    } else if (diff > 0) {
      els.verdict.textContent = "Lose";
      els.verdict.classList.add("is-lose");
    } else {
      els.verdict.textContent = "Win";
      els.verdict.classList.add("is-win");
    }

    if (els.confirmTradeBtn) {
      els.confirmTradeBtn.disabled = state.you.length === 0 && state.them.length === 0;
    }
  }

  /* ---------------- Confirm Trade ----------------
     Placeholder ahead of real account integration: updates the browser-local
     inventory (what you gave up is removed, what you received is added),
     then clears the calculator. No server, no accounts yet -- this just
     keeps the "inventory" concept working end-to-end so real accounts can
     slot in later without changing this flow. */

  function confirmTrade() {
    if (state.you.length === 0 && state.them.length === 0) return;

    state.you.forEach(function (entry) { removeOneFromInventory(entry); });
    state.them.forEach(function (entry) { addToInventory(entry); });

    state.you = [];
    state.them = [];
    renderGrid("you");
    renderGrid("them");
    updateTotals();
  }

  /* ---------------- Picker modal ---------------- */

  function openPicker(side) {
    pickerSide = side;
    activeCategory = "all";
    els.searchInput.value = "";
    renderCategoryTabs();
    renderResults();
    els.pickerOverlay.classList.add("open");
    els.searchInput.focus({ preventScroll: true });
  }

  function closePicker() {
    els.pickerOverlay.classList.remove("open");
    pickerSide = null;
  }

  function renderCategoryTabs() {
    els.categoryTabs.innerHTML = "";
    CATEGORIES.forEach(function (cat) {
      const btn = document.createElement("button");
      btn.className = "tab-btn" + (cat.key === activeCategory ? " active" : "");
      btn.textContent = cat.label;
      btn.addEventListener("click", function () {
        activeCategory = cat.key;
        renderCategoryTabs();
        renderResults();
      });
      els.categoryTabs.appendChild(btn);
    });
  }

  function renderResults() {
    const query = els.searchInput.value.trim().toLowerCase();
    const matches = ITEMS.filter(function (item) {
      const inCategory = activeCategory === "all" || item.category === activeCategory;
      const inSearch = !query || item.name.toLowerCase().indexOf(query) !== -1;
      return inCategory && inSearch;
    });

    els.itemResults.innerHTML = "";

    if (matches.length === 0) {
      const empty = document.createElement("div");
      empty.className = "no-results";
      empty.textContent = "No items found.";
      els.itemResults.appendChild(empty);
      return;
    }

    matches.forEach(function (item) {
      const tile = document.createElement("div");
      tile.className = "result-tile";
      tile.appendChild(makeThumb(item, "small"));

      const name = document.createElement("div");
      name.className = "result-name";
      name.textContent = item.name;
      tile.appendChild(name);

      const value = document.createElement("div");
      value.className = "result-value";
      value.textContent = formatValue(item.value);
      tile.appendChild(value);

      tile.addEventListener("click", function () { handleItemChosen(item); });
      els.itemResults.appendChild(tile);
    });
  }

  function handleItemChosen(item) {
    if (item.category === "pets") {
      openVariantPopup(item);
    } else {
      state[pickerSide].push({ itemId: item.id, flags: { fly: false, ride: false, neon: false, mega: false } });
      renderGrid(pickerSide);
      updateTotals();
      closePicker();
    }
  }

  /* ---------------- Variant popup ---------------- */

  function openVariantPopup(item) {
    pendingPetItem = item;
    pendingFlags = { fly: false, ride: false, neon: false, mega: false };

    els.variantImage.innerHTML = "";
    if (item.image) {
      const img = document.createElement("img");
      img.src = item.image;
      img.alt = item.name;
      els.variantImage.appendChild(img);
    } else {
      els.variantImage.textContent = initials(item.name);
    }
    els.variantName.textContent = item.name;

    refreshVariantButtons();
    els.variantOverlay.classList.add("open");
  }

  function closeVariantPopup() {
    els.variantOverlay.classList.remove("open");
    pendingPetItem = null;
  }

  function refreshVariantButtons() {
    els.btnFly.classList.toggle("selected", pendingFlags.fly);
    els.btnRide.classList.toggle("selected", pendingFlags.ride);
    els.btnNeon.classList.toggle("selected", pendingFlags.neon);
    els.btnMega.classList.toggle("selected", pendingFlags.mega);
  }

  function toggleFlag(flag) {
    if (flag === "neon" && !pendingFlags.neon) {
      pendingFlags.neon = true;
      pendingFlags.mega = false;
    } else if (flag === "mega" && !pendingFlags.mega) {
      pendingFlags.mega = true;
      pendingFlags.neon = false;
    } else {
      pendingFlags[flag] = !pendingFlags[flag];
    }
    refreshVariantButtons();
  }

  /* ---------------- Wire up events ---------------- */

  els.pickerClose.addEventListener("click", closePicker);
  els.pickerOverlay.addEventListener("click", function (e) {
    if (e.target === els.pickerOverlay) closePicker();
  });
  els.searchInput.addEventListener("input", renderResults);

  els.variantClose.addEventListener("click", closeVariantPopup);
  els.variantOverlay.addEventListener("click", function (e) {
    if (e.target === els.variantOverlay) closeVariantPopup();
  });

  els.btnFly.addEventListener("click", function () { toggleFlag("fly"); });
  els.btnRide.addEventListener("click", function () { toggleFlag("ride"); });
  els.btnNeon.addEventListener("click", function () { toggleFlag("neon"); });
  els.btnMega.addEventListener("click", function () { toggleFlag("mega"); });

  els.variantAdd.addEventListener("click", function () {
    if (!pendingPetItem) return;
    state[pickerSide].push({
      itemId: pendingPetItem.id,
      flags: {
        fly: pendingFlags.fly,
        ride: pendingFlags.ride,
        neon: pendingFlags.neon,
        mega: pendingFlags.mega
      }
    });
    renderGrid(pickerSide);
    updateTotals();
    closeVariantPopup();
    closePicker();
  });

  if (els.confirmTradeBtn) {
    els.confirmTradeBtn.addEventListener("click", confirmTrade);
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeVariantPopup();
      closePicker();
    }
  });

  /* ---------------- Init ---------------- */

  renderGrid("you");
  renderGrid("them");
  updateTotals();
})();
