(function () {
  "use strict";

  const { findItem, tagString, computeItemValue, formatValue, makeThumb,
          getInventory, saveInventory } = window.PetSwapCommon;

  const els = {
    grid: document.getElementById("inventoryGrid"),
    empty: document.getElementById("inventoryEmpty"),
    total: document.getElementById("inventoryTotal")
  };

  function render() {
    const list = getInventory();
    els.grid.innerHTML = "";

    if (list.length === 0) {
      els.empty.hidden = false;
      els.total.textContent = "0";
      return;
    }
    els.empty.hidden = true;

    let total = 0;

    list.forEach(function (entry, index) {
      const item = findItem(entry.itemId);
      if (!item) return;
      total += computeItemValue(entry);

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
      remove.setAttribute("aria-label", "Remove " + item.name + " from inventory");
      remove.textContent = "\u00d7";
      remove.addEventListener("click", function (e) {
        e.stopPropagation();
        const current = getInventory();
        current.splice(index, 1);
        saveInventory(current);
        render();
      });
      tile.appendChild(remove);

      els.grid.appendChild(tile);
    });

    els.total.textContent = formatValue(total);
  }

  render();
})();
