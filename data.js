/*
  ============================================================
  petswap.me — DATA FILE
  ============================================================
  This file is now built from a real StarPets.gg data pull
  (823 items across pets, eggs, potions, pet wear, vehicles,
  toys, strollers, and gifts), taken on 2026-11-23.

  WHAT'S REAL VS. STILL PLACEHOLDER
  ----------------------------------
  ✔ REAL: item names, images, and base values — pulled directly
    from live StarPets listings (their $ price = our value,
    1:1, exactly as you specified).
  ✔ REAL: Neon and Mega Neon multipliers — calculated from
    actual StarPets listings that had both a base and a
    neon/mega version of the same pet (33 and 42 pets
    respectively). Neon runs ~2.0x base, Mega Neon ~3.4x base.
    That's a big correction from the earlier placeholder
    guesses of 4x and 20x — Mega Neon in particular was way
    overvalued before.
  ⚠ STILL ESTIMATED: Fly and Ride multipliers. The StarPets
    sample only had 1-2 listings with those flags active, not
    enough to calculate a reliable ratio, so these are still
    the original placeholder guesses (1.15x / 1.4x). Worth
    revisiting once we pull a bigger sample.
  ⚠ STILL A PROXY: "Demand" isn't real demand data yet — it's
    StarPets' own rarity tier (common/uncommon/rare/ultra
    rare/legendary) mapped onto our 1-5 scale as a stand-in.
    Real demand (how sought-after something is beyond price)
    should come from a second source like a trading-community
    value list, per the plan discussed earlier.
  ✘ NOT ON STARPETS: Food and Stickers aren't sold there, so
    those two categories still use small fixed placeholder
    values below — genuinely low-stakes items in real trades.

  HOW TO ADD/EDIT ITEMS
  ----------------------
  {
    id: "shadow-dragon",      // must be unique, no spaces
    name: "Shadow Dragon",    // shown to the user
    category: "pets",         // must match a key in CATEGORIES below
    value: 400,               // base value (StarPets $ price, 1:1)
    demand: 5,                // 1 (low) to 5 (high)
    image: ""                 // image URL, or "" for a placeholder tile
  }

  Only items in the "pets" category get the F / R / N / M popup.
  ============================================================
*/

const CATEGORIES = [
  { key: "all",        label: "All" },
  { key: "pets",       label: "Pets" },
  { key: "eggs",       label: "Eggs" },
  { key: "potions",    label: "Potions" },
  { key: "petwear",    label: "Pet Wear" },
  { key: "vehicles",   label: "Vehicles" },
  { key: "toys",       label: "Toys" },
  { key: "food",       label: "Food" },
  { key: "stickers",   label: "Stickers" },
  { key: "strollers",  label: "Strollers" },
  { key: "gifts",      label: "Gifts" }
];

/*
  DEMAND MULTIPLIER
  A 1-5 demand rating nudges the base value up or down.
  (Currently fed by StarPets rarity tier — see note above.)
*/
const DEMAND_MULTIPLIERS = {
  1: 0.75,
  2: 0.90,
  3: 1.00,
  4: 1.15,
  5: 1.35
};

/*
  PET VARIANT MULTIPLIERS
  Neon and Mega are now calculated from real StarPets data.
  Fly / Ride / FlyRide are still placeholders (see note above).
*/
const VARIANT_MULTIPLIERS = {
  base: 1,
  fly: 1.15,     // placeholder — not enough real fly-only listings yet
  ride: 1.15,    // placeholder — not enough real ride-only listings yet
  flyRide: 1.4,  // placeholder — only 2 real listings, too few to trust
  neon: 2.0,     // real: median of 33 pets with both base + neon listed
  mega: 3.38     // real: median of 42 pets with both base + mega listed
};

function getVariantMultiplier(flags) {
  const { fly, ride, neon, mega } = flags;
  if (mega) return VARIANT_MULTIPLIERS.mega;
  if (neon) return VARIANT_MULTIPLIERS.neon;
  if (fly && ride) return VARIANT_MULTIPLIERS.flyRide;
  if (fly) return VARIANT_MULTIPLIERS.fly;
  if (ride) return VARIANT_MULTIPLIERS.ride;
  return VARIANT_MULTIPLIERS.base;
}

/*
  ITEMS
  823 real items pulled from StarPets.gg (2026-07-20), plus a
  handful of manual Food/Stickers entries (not sold on StarPets).
*/
const ITEMS = [
  {
    "id": "eggs-retired-egg",
    "name": "Retired Egg",
    "category": "eggs",
    "value": 95.2408,
    "demand": 1,
    "image": "images/eggs/retired-egg.webp"
  },
  {
    "id": "petwear-dumpling-friend-hat",
    "name": "Dumpling Friend Hat",
    "category": "petwear",
    "value": 670.6837,
    "demand": 2,
    "image": "images/petwear/dumpling-friend-hat.webp"
  },
  {
    "id": "pets-kage-crow",
    "name": "Kage Crow",
    "category": "pets",
    "value": 475.657,
    "demand": 1,
    "image": "images/pets/kage-crow.webp"
  },
  {
    "id": "vehicles-heart-hoverboard",
    "name": "Heart Hoverboard",
    "category": "vehicles",
    "value": 238.581,
    "demand": 1,
    "image": "images/vehicles/heart-hoverboard.webp"
  },
  {
    "id": "toys-dragon-balloon",
    "name": "Dragon Balloon",
    "category": "toys",
    "value": 144.8302,
    "demand": 1,
    "image": "images/toys/dragon-balloon.webp"
  },
  {
    "id": "vehicles-canine-cruiser",
    "name": "Canine Cruiser",
    "category": "vehicles",
    "value": 213.2003,
    "demand": 1,
    "image": "images/vehicles/canine-cruiser.webp"
  },
  {
    "id": "food-mud-ball",
    "name": "Mud Ball",
    "category": "food",
    "value": 520.0014,
    "demand": 2,
    "image": "images/food/mud-ball.webp"
  },
  {
    "id": "petwear-rain-boots",
    "name": "Rain Boots",
    "category": "petwear",
    "value": 839.3579,
    "demand": 2,
    "image": "images/petwear/rain-boots.webp"
  },
  {
    "id": "eggs-southeast-asia-egg",
    "name": "Southeast Asia Egg",
    "category": "eggs",
    "value": 523.811,
    "demand": 2,
    "image": "images/eggs/southeast-asia-egg.webp"
  },
  {
    "id": "pets-longhorn-cow",
    "name": "Longhorn Cow",
    "category": "pets",
    "value": 514.3585,
    "demand": 1,
    "image": "images/pets/longhorn-cow.webp"
  },
  {
    "id": "pets-otter",
    "name": "Otter",
    "category": "pets",
    "value": 16.2327,
    "demand": 1,
    "image": "images/pets/otter.webp"
  },
  {
    "id": "petwear-chick-hat",
    "name": "Chick Hat",
    "category": "petwear",
    "value": 244.9822,
    "demand": 1,
    "image": "images/petwear/chick-hat.webp"
  },
  {
    "id": "toys-scarab-crossbow-grappling-hook",
    "name": "Scarab Crossbow Grappling Hook",
    "category": "toys",
    "value": 413.7949,
    "demand": 1,
    "image": "images/toys/scarab-crossbow-grappling-hook.webp"
  },
  {
    "id": "pets-emperor-gorilla",
    "name": "Emperor Gorilla",
    "category": "pets",
    "value": 917.6032,
    "demand": 2,
    "image": "images/pets/emperor-gorilla.webp"
  },
  {
    "id": "pets-moose-calf",
    "name": "Moose Calf",
    "category": "pets",
    "value": 833.9581,
    "demand": 2,
    "image": "images/pets/moose-calf.webp"
  },
  {
    "id": "gifts-kaijunior-box",
    "name": "Kaijunior Box",
    "category": "gifts",
    "value": 219.5145,
    "demand": 1,
    "image": "images/gifts/kaijunior-box.webp"
  },
  {
    "id": "stickers-winged-horse-sticker",
    "name": "Winged Horse Sticker",
    "category": "stickers",
    "value": 675.9269,
    "demand": 1,
    "image": "images/stickers/winged-horse-sticker.webp"
  },
  {
    "id": "pets-axolotl",
    "name": "Axolotl",
    "category": "pets",
    "value": 706.6176,
    "demand": 2,
    "image": "images/pets/axolotl.webp"
  },
  {
    "id": "pets-lion-cub",
    "name": "Lion Cub",
    "category": "pets",
    "value": 897.6283,
    "demand": 2,
    "image": "images/pets/lion-cub.webp"
  },
  {
    "id": "petwear-glormy-backpack",
    "name": "Glormy Backpack",
    "category": "petwear",
    "value": 240.9661,
    "demand": 1,
    "image": "images/petwear/glormy-backpack.webp"
  },
  {
    "id": "vehicles-dogmobile",
    "name": "Dogmobile",
    "category": "vehicles",
    "value": 751.2698,
    "demand": 2,
    "image": "images/vehicles/dogmobile.webp"
  },
  {
    "id": "stickers-winter-2024-sticker-pack",
    "name": "Winter 2024 Sticker Pack",
    "category": "stickers",
    "value": 509.2607,
    "demand": 1,
    "image": "images/stickers/winter-2024-sticker-pack.webp"
  },
  {
    "id": "pets-ice-golem",
    "name": "Ice Golem",
    "category": "pets",
    "value": 821.4737,
    "demand": 2,
    "image": "images/pets/ice-golem.webp"
  },
  {
    "id": "toys-smores-pogo-stick",
    "name": "S'mores Pogo Stick",
    "category": "toys",
    "value": 27.5891,
    "demand": 1,
    "image": "images/toys/s-mores-pogo-stick.webp"
  },
  {
    "id": "vehicles-summer-spectacle",
    "name": "Summer Spectacle",
    "category": "vehicles",
    "value": 700.5085,
    "demand": 2,
    "image": "images/vehicles/summer-spectacle.webp"
  },
  {
    "id": "petwear-aztec-crown",
    "name": "Aztec Crown",
    "category": "petwear",
    "value": 309.239,
    "demand": 1,
    "image": "images/petwear/aztec-crown.webp"
  },
  {
    "id": "petwear-2022-birthday-cupcake-shoes",
    "name": "2022 Birthday Cupcake Shoes",
    "category": "petwear",
    "value": 931.7271,
    "demand": 3,
    "image": "images/petwear/2022-birthday-cupcake-shoes.webp"
  },
  {
    "id": "pets-glacier-kitsune",
    "name": "Glacier Kitsune",
    "category": "pets",
    "value": 858.9268,
    "demand": 2,
    "image": "images/pets/glacier-kitsune.webp"
  },
  {
    "id": "potions-big-head-potion",
    "name": "Big Head Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-frost-dragon",
    "name": "Frost Dragon",
    "category": "pets",
    "value": 997.5031,
    "demand": 3,
    "image": "images/pets/frost-dragon.webp"
  },
  {
    "id": "pets-malaysian-tapir",
    "name": "Malaysian Tapir",
    "category": "pets",
    "value": 439.4524,
    "demand": 1,
    "image": "images/pets/malaysian-tapir.webp"
  },
  {
    "id": "pets-pink-dog",
    "name": "Pink Dog",
    "category": "pets",
    "value": 113.6106,
    "demand": 1,
    "image": "images/pets/pink-dog.webp"
  },
  {
    "id": "stickers-dinner-discourse-cat-sticker",
    "name": "Dinner Discourse Cat Sticker",
    "category": "stickers",
    "value": 796.2969,
    "demand": 2,
    "image": "images/stickers/dinner-discourse-cat-sticker.webp"
  },
  {
    "id": "petwear-aestus-mane",
    "name": "Aestus Mane",
    "category": "petwear",
    "value": 44.1796,
    "demand": 1,
    "image": "images/petwear/aestus-mane.webp"
  },
  {
    "id": "pets-garden-snake",
    "name": "Garden Snake",
    "category": "pets",
    "value": 158.5543,
    "demand": 1,
    "image": "images/pets/garden-snake.webp"
  },
  {
    "id": "gifts-duckling-box",
    "name": "Duckling Box",
    "category": "gifts",
    "value": 682.9278,
    "demand": 2,
    "image": "images/gifts/duckling-box.webp"
  },
  {
    "id": "eggs-japan-egg",
    "name": "Japan Egg",
    "category": "eggs",
    "value": 333.3353,
    "demand": 2,
    "image": "images/eggs/japan-egg.webp"
  },
  {
    "id": "pets-icy-porcupine",
    "name": "Icy Porcupine",
    "category": "pets",
    "value": 164.7965,
    "demand": 1,
    "image": "images/pets/icy-porcupine.webp"
  },
  {
    "id": "petwear-dog-backpack",
    "name": "Dog Backpack",
    "category": "petwear",
    "value": 32.1314,
    "demand": 1,
    "image": "images/petwear/dog-backpack.webp"
  },
  {
    "id": "stickers-kitsune-sticker",
    "name": "Kitsune Sticker",
    "category": "stickers",
    "value": 666.6677,
    "demand": 1,
    "image": "images/stickers/kitsune-sticker.webp"
  },
  {
    "id": "pets-hydra",
    "name": "Hydra",
    "category": "pets",
    "value": 455.682,
    "demand": 1,
    "image": "images/pets/hydra.webp"
  },
  {
    "id": "vehicles-dolphin-cruiser",
    "name": "Dolphin Cruiser",
    "category": "vehicles",
    "value": 121.83,
    "demand": 1,
    "image": "images/vehicles/dolphin-cruiser.webp"
  },
  {
    "id": "pets-pirate-hermit-crab",
    "name": "Pirate Hermit Crab",
    "category": "pets",
    "value": 744.0707,
    "demand": 2,
    "image": "images/pets/pirate-hermit-crab.webp"
  },
  {
    "id": "pets-dancing-dragon",
    "name": "Dancing Dragon",
    "category": "pets",
    "value": 840.2002,
    "demand": 2,
    "image": "images/pets/dancing-dragon.webp"
  },
  {
    "id": "gifts-regal-wing-chest",
    "name": "Regal Wing Chest",
    "category": "gifts",
    "value": 707.318,
    "demand": 2,
    "image": "images/gifts/regal-wing-chest.webp"
  },
  {
    "id": "pets-shih-tzu",
    "name": "Shih Tzu",
    "category": "pets",
    "value": 38.7045,
    "demand": 1,
    "image": "images/pets/shih-tzu.webp"
  },
  {
    "id": "strollers-triple-stroller",
    "name": "Triple Stroller",
    "category": "strollers",
    "value": 554.0554,
    "demand": 1,
    "image": "images/strollers/triple-stroller.webp"
  },
  {
    "id": "petwear-festive-beard",
    "name": "Festive Beard",
    "category": "petwear",
    "value": 389.5601,
    "demand": 1,
    "image": "images/petwear/festive-beard.webp"
  },
  {
    "id": "petwear-butter-knife",
    "name": "Butter Knife",
    "category": "petwear",
    "value": 642.5714,
    "demand": 2,
    "image": "images/petwear/butter-knife.webp"
  },
  {
    "id": "petwear-cheesecake-hat",
    "name": "Cheesecake Hat",
    "category": "petwear",
    "value": 148.5969,
    "demand": 1,
    "image": "images/petwear/cheesecake-hat.webp"
  },
  {
    "id": "pets-vampire-dragon",
    "name": "Vampire Dragon",
    "category": "pets",
    "value": 901.3736,
    "demand": 2,
    "image": "images/pets/vampire-dragon.webp"
  },
  {
    "id": "strollers-pirate-captain-stroller",
    "name": "Pirate Captain Stroller",
    "category": "strollers",
    "value": 121.6243,
    "demand": 1,
    "image": "images/strollers/pirate-captain-stroller.webp"
  },
  {
    "id": "vehicles-banana-car",
    "name": "Banana Car",
    "category": "vehicles",
    "value": 324.8751,
    "demand": 1,
    "image": "images/vehicles/banana-car.webp"
  },
  {
    "id": "pets-sweetheart-rat",
    "name": "Sweetheart Rat",
    "category": "pets",
    "value": 471.9117,
    "demand": 1,
    "image": "images/pets/sweetheart-rat.webp"
  },
  {
    "id": "eggs-urban-egg",
    "name": "Urban Egg",
    "category": "eggs",
    "value": 714.2866,
    "demand": 2,
    "image": "images/eggs/urban-egg.webp"
  },
  {
    "id": "vehicles-shadow-rider",
    "name": "Shadow Rider",
    "category": "vehicles",
    "value": 527.9202,
    "demand": 1,
    "image": "images/vehicles/shadow-rider.webp"
  },
  {
    "id": "pets-hippo",
    "name": "Hippo",
    "category": "pets",
    "value": 550.5631,
    "demand": 1,
    "image": "images/pets/hippo.webp"
  },
  {
    "id": "pets-clover-cow",
    "name": "Clover Cow",
    "category": "pets",
    "value": 488.1414,
    "demand": 1,
    "image": "images/pets/clover-cow.webp"
  },
  {
    "id": "food-chocolate-egg",
    "name": "Chocolate Egg",
    "category": "food",
    "value": 820.0005,
    "demand": 2,
    "image": "images/food/chocolate-egg.webp"
  },
  {
    "id": "petwear-festive-antlers",
    "name": "Festive Antlers",
    "category": "petwear",
    "value": 156.629,
    "demand": 1,
    "image": "images/petwear/festive-antlers.webp"
  },
  {
    "id": "vehicles-gingerbread-sleigh",
    "name": "Gingerbread Sleigh",
    "category": "vehicles",
    "value": 598.986,
    "demand": 2,
    "image": "images/vehicles/gingerbread-sleigh.webp"
  },
  {
    "id": "pets-indian-flying-fox",
    "name": "Indian Flying Fox",
    "category": "pets",
    "value": 540.5757,
    "demand": 1,
    "image": "images/pets/indian-flying-fox.webp"
  },
  {
    "id": "vehicles-corsair-cruiser",
    "name": "Corsair Cruiser",
    "category": "vehicles",
    "value": 50.7643,
    "demand": 1,
    "image": "images/vehicles/corsair-cruiser.webp"
  },
  {
    "id": "toys-throwing-pumpkin",
    "name": "Throwing Pumpkin",
    "category": "toys",
    "value": 344.8296,
    "demand": 1,
    "image": "images/toys/throwing-pumpkin.webp"
  },
  {
    "id": "pets-gecko",
    "name": "Gecko",
    "category": "pets",
    "value": 549.3147,
    "demand": 1,
    "image": "images/pets/gecko.webp"
  },
  {
    "id": "vehicles-witchs-caravan",
    "name": "Witch's Caravan",
    "category": "vehicles",
    "value": 45.6881,
    "demand": 1,
    "image": "images/vehicles/witch-s-caravan.webp"
  },
  {
    "id": "pets-castle-hermit-crab",
    "name": "Castle Hermit Crab",
    "category": "pets",
    "value": 588.0162,
    "demand": 1,
    "image": "images/pets/castle-hermit-crab.webp"
  },
  {
    "id": "pets-capybara",
    "name": "Capybara",
    "category": "pets",
    "value": 741.5738,
    "demand": 2,
    "image": "images/pets/capybara.webp"
  },
  {
    "id": "pets-rock-pigeon",
    "name": "Rock Pigeon",
    "category": "pets",
    "value": 369.54,
    "demand": 1,
    "image": "images/pets/rock-pigeon.webp"
  },
  {
    "id": "pets-vanilla-penguin",
    "name": "Vanilla Penguin",
    "category": "pets",
    "value": 760.3003,
    "demand": 2,
    "image": "images/pets/vanilla-penguin.webp"
  },
  {
    "id": "pets-royal-capuchin-monkey",
    "name": "Royal Capuchin Monkey",
    "category": "pets",
    "value": 684.1458,
    "demand": 1,
    "image": "images/pets/royal-capuchin-monkey.webp"
  },
  {
    "id": "food-christmas-pudding-pup-bait",
    "name": "Christmas Pudding Pup Bait",
    "category": "food",
    "value": 920.0002,
    "demand": 2,
    "image": "images/food/christmas-pudding-pup-bait.webp"
  },
  {
    "id": "vehicles-royal-crown-carriage",
    "name": "Royal Crown Carriage",
    "category": "vehicles",
    "value": 685.2801,
    "demand": 1,
    "image": "images/vehicles/royal-crown-carriage.webp"
  },
  {
    "id": "eggs-christmas-egg",
    "name": "Christmas Egg",
    "category": "eggs",
    "value": 904.7622,
    "demand": 2,
    "image": "images/eggs/christmas-egg.webp"
  },
  {
    "id": "pets-tortuga-de-la-isla",
    "name": "Tortuga de la Isla",
    "category": "pets",
    "value": 890.1377,
    "demand": 2,
    "image": "images/pets/tortuga-de-la-isla.webp"
  },
  {
    "id": "pets-leopard-shark",
    "name": "Leopard Shark",
    "category": "pets",
    "value": 775.2816,
    "demand": 2,
    "image": "images/pets/leopard-shark.webp"
  },
  {
    "id": "vehicles-classic-american-car",
    "name": "Classic American Car",
    "category": "vehicles",
    "value": 152.2868,
    "demand": 1,
    "image": "images/vehicles/classic-american-car.webp"
  },
  {
    "id": "pets-three-blind-mice",
    "name": "Three Blind Mice",
    "category": "pets",
    "value": 274.6589,
    "demand": 1,
    "image": "images/pets/three-blind-mice.webp"
  },
  {
    "id": "vehicles-rabbit-helicopter",
    "name": "Rabbit Helicopter",
    "category": "vehicles",
    "value": 756.3459,
    "demand": 1,
    "image": "images/vehicles/rabbit-helicopter.webp"
  },
  {
    "id": "vehicles-flower-truck",
    "name": "Flower Truck",
    "category": "vehicles",
    "value": 888.3252,
    "demand": 2,
    "image": "images/vehicles/flower-truck.webp"
  },
  {
    "id": "eggs-danger-egg",
    "name": "Danger Egg",
    "category": "eggs",
    "value": 738.096,
    "demand": 2,
    "image": "images/eggs/danger-egg.webp"
  },
  {
    "id": "pets-candicorn",
    "name": "Candicorn",
    "category": "pets",
    "value": 940.0751,
    "demand": 3,
    "image": "images/pets/candicorn.webp"
  },
  {
    "id": "stickers-cocoadile-sticker",
    "name": "Cocoadile Sticker",
    "category": "stickers",
    "value": 55.5584,
    "demand": 1,
    "image": "images/stickers/cocoadile-sticker.webp"
  },
  {
    "id": "vehicles-hoverboard",
    "name": "Hoverboard",
    "category": "vehicles",
    "value": 436.5499,
    "demand": 1,
    "image": "images/vehicles/hoverboard.webp"
  },
  {
    "id": "pets-tortoiseshell-guinea-pig",
    "name": "Tortoiseshell Guinea Pig",
    "category": "pets",
    "value": 937.5782,
    "demand": 3,
    "image": "images/pets/tortoiseshell-guinea-pig.webp"
  },
  {
    "id": "petwear-chocolate-chip-bat-dragon-backpack",
    "name": "Chocolate Chip Bat Dragon Backpack",
    "category": "petwear",
    "value": 726.9084,
    "demand": 1,
    "image": "images/petwear/chocolate-chip-bat-dragon-backpack.webp"
  },
  {
    "id": "stickers-space-whale-sticker",
    "name": "Space Whale Sticker",
    "category": "stickers",
    "value": 685.1861,
    "demand": 1,
    "image": "images/stickers/space-whale-sticker.webp"
  },
  {
    "id": "pets-bloodhound",
    "name": "Bloodhound",
    "category": "pets",
    "value": 363.2978,
    "demand": 1,
    "image": "images/pets/bloodhound.webp"
  },
  {
    "id": "pets-skelicorn",
    "name": "Skelicorn",
    "category": "pets",
    "value": 335.8322,
    "demand": 1,
    "image": "images/pets/skelicorn.webp"
  },
  {
    "id": "pets-scarecrow",
    "name": "Scarecrow",
    "category": "pets",
    "value": 224.7214,
    "demand": 1,
    "image": "images/pets/scarecrow.webp"
  },
  {
    "id": "food-subzero-popsicle-bait",
    "name": "Subzero Popsicle Bait",
    "category": "food",
    "value": 40.0029,
    "demand": 1,
    "image": "images/food/subzero-popsicle-bait.webp"
  },
  {
    "id": "pets-princess-mare",
    "name": "Princess Mare",
    "category": "pets",
    "value": 24.9717,
    "demand": 1,
    "image": "images/pets/princess-mare.webp"
  },
  {
    "id": "pets-octopus",
    "name": "Octopus",
    "category": "pets",
    "value": 714.1082,
    "demand": 2,
    "image": "images/pets/octopus.webp"
  },
  {
    "id": "pets-chocolate-dutch-guinea-pig",
    "name": "Chocolate Dutch Guinea Pig",
    "category": "pets",
    "value": 779.0269,
    "demand": 2,
    "image": "images/pets/chocolate-dutch-guinea-pig.webp"
  },
  {
    "id": "vehicles-hot-rod-sleigh",
    "name": "Hot Rod Sleigh",
    "category": "vehicles",
    "value": 243.6571,
    "demand": 1,
    "image": "images/vehicles/hot-rod-sleigh.webp"
  },
  {
    "id": "petwear-cheese-hat",
    "name": "Cheese Hat",
    "category": "petwear",
    "value": 180.7253,
    "demand": 1,
    "image": "images/petwear/cheese-hat.webp"
  },
  {
    "id": "pets-baku",
    "name": "Baku",
    "category": "pets",
    "value": 629.2146,
    "demand": 1,
    "image": "images/pets/baku.webp"
  },
  {
    "id": "pets-tasmanian-tiger",
    "name": "Tasmanian Tiger",
    "category": "pets",
    "value": 203.498,
    "demand": 1,
    "image": "images/pets/tasmanian-tiger.webp"
  },
  {
    "id": "stickers-balloon-unicorn-sticker",
    "name": "Balloon Unicorn Sticker",
    "category": "stickers",
    "value": 722.2231,
    "demand": 2,
    "image": "images/stickers/balloon-unicorn-sticker.webp"
  },
  {
    "id": "pets-singularity-beetle",
    "name": "Singularity Beetle",
    "category": "pets",
    "value": 364.5462,
    "demand": 1,
    "image": "images/pets/singularity-beetle.webp"
  },
  {
    "id": "pets-diamond-hamster",
    "name": "Diamond Hamster",
    "category": "pets",
    "value": 799.0019,
    "demand": 2,
    "image": "images/pets/diamond-hamster.webp"
  },
  {
    "id": "pets-cockroach",
    "name": "Cockroach",
    "category": "pets",
    "value": 260.9261,
    "demand": 1,
    "image": "images/pets/cockroach.webp"
  },
  {
    "id": "food-honey",
    "name": "Honey",
    "category": "food",
    "value": 280.0022,
    "demand": 2,
    "image": "images/food/honey.webp"
  },
  {
    "id": "vehicles-snowmobile",
    "name": "Snowmobile",
    "category": "vehicles",
    "value": 578.6815,
    "demand": 1,
    "image": "images/vehicles/snowmobile.webp"
  },
  {
    "id": "pets-dragonfly",
    "name": "Dragonfly",
    "category": "pets",
    "value": 259.6776,
    "demand": 1,
    "image": "images/pets/dragonfly.webp"
  },
  {
    "id": "food-sugar-skull-potion",
    "name": "Sugar Skull Potion",
    "category": "food",
    "value": 780.0007,
    "demand": 2,
    "image": "images/food/sugar-skull-potion.webp"
  },
  {
    "id": "petwear-copter-hat",
    "name": "Copter Hat",
    "category": "petwear",
    "value": 815.2616,
    "demand": 2,
    "image": "images/petwear/copter-hat.webp"
  },
  {
    "id": "pets-cocoadile",
    "name": "Cocoadile",
    "category": "pets",
    "value": 88.6419,
    "demand": 1,
    "image": "images/pets/cocoadile.webp"
  },
  {
    "id": "petwear-spring-bunny-feet",
    "name": "Spring Bunny Feet",
    "category": "petwear",
    "value": 799.1974,
    "demand": 2,
    "image": "images/petwear/spring-bunny-feet.webp"
  },
  {
    "id": "stickers-flaming-fox-sticker",
    "name": "Flaming Fox Sticker",
    "category": "stickers",
    "value": 92.5953,
    "demand": 1,
    "image": "images/stickers/flaming-fox-sticker.webp"
  },
  {
    "id": "toys-hot-cocoa-stand",
    "name": "Hot Cocoa Stand",
    "category": "toys",
    "value": 827.5867,
    "demand": 2,
    "image": "images/toys/hot-cocoa-stand.webp"
  },
  {
    "id": "vehicles-princess-carriage",
    "name": "Princess Carriage",
    "category": "vehicles",
    "value": 411.1693,
    "demand": 1,
    "image": "images/vehicles/princess-carriage.webp"
  },
  {
    "id": "stickers-dalmatian-sticker",
    "name": "Dalmatian Sticker",
    "category": "stickers",
    "value": 638.89,
    "demand": 1,
    "image": "images/stickers/dalmatian-sticker.webp"
  },
  {
    "id": "pets-zombie-chick",
    "name": "Zombie Chick",
    "category": "pets",
    "value": 399.5024,
    "demand": 1,
    "image": "images/pets/zombie-chick.webp"
  },
  {
    "id": "pets-dragon",
    "name": "Dragon",
    "category": "pets",
    "value": 263.4229,
    "demand": 1,
    "image": "images/pets/dragon.webp"
  },
  {
    "id": "petwear-gold-crown",
    "name": "Gold Crown",
    "category": "petwear",
    "value": 875.5024,
    "demand": 2,
    "image": "images/petwear/gold-crown.webp"
  },
  {
    "id": "pets-walrus",
    "name": "Walrus",
    "category": "pets",
    "value": 265.9198,
    "demand": 1,
    "image": "images/pets/walrus.webp"
  },
  {
    "id": "vehicles-santa-copter",
    "name": "Santa Copter",
    "category": "vehicles",
    "value": 451.7783,
    "demand": 1,
    "image": "images/vehicles/santa-copter.webp"
  },
  {
    "id": "vehicles-candy-snowmobile",
    "name": "Candy Snowmobile",
    "category": "vehicles",
    "value": 279.19,
    "demand": 1,
    "image": "images/vehicles/candy-snowmobile.webp"
  },
  {
    "id": "petwear-2022-birthday-party-hat",
    "name": "2022 Birthday Party Hat",
    "category": "petwear",
    "value": 947.7913,
    "demand": 3,
    "image": "images/petwear/2022-birthday-party-hat.webp"
  },
  {
    "id": "pets-catte",
    "name": "Catte",
    "category": "pets",
    "value": 727.841,
    "demand": 2,
    "image": "images/pets/catte.webp"
  },
  {
    "id": "food-fire-horse-apple",
    "name": "Fire Horse Apple",
    "category": "food",
    "value": 0.003,
    "demand": 1,
    "image": "images/food/fire-horse-apple.webp"
  },
  {
    "id": "potions-polymorph-potion",
    "name": "Polymorph Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "eggs-zodiac-minion-egg",
    "name": "Zodiac Minion Egg",
    "category": "eggs",
    "value": 309.5259,
    "demand": 1,
    "image": "images/eggs/zodiac-minion-egg.webp"
  },
  {
    "id": "pets-hedgehog",
    "name": "Hedgehog",
    "category": "pets",
    "value": 985.0188,
    "demand": 3,
    "image": "images/pets/hedgehog.webp"
  },
  {
    "id": "petwear-golden-walrus-crown",
    "name": "Golden Walrus Crown",
    "category": "petwear",
    "value": 558.2343,
    "demand": 1,
    "image": "images/petwear/golden-walrus-crown.webp"
  },
  {
    "id": "gifts-lunar-tiger-box",
    "name": "Lunar Tiger Box",
    "category": "gifts",
    "value": 365.8556,
    "demand": 1,
    "image": "images/gifts/lunar-tiger-box.webp"
  },
  {
    "id": "pets-chicken",
    "name": "Chicken",
    "category": "pets",
    "value": 750.3129,
    "demand": 2,
    "image": "images/pets/chicken.webp"
  },
  {
    "id": "pets-preppy-capuchin-monkey",
    "name": "Preppy Capuchin Monkey",
    "category": "pets",
    "value": 504.371,
    "demand": 1,
    "image": "images/pets/preppy-capuchin-monkey.webp"
  },
  {
    "id": "pets-rhino",
    "name": "Rhino",
    "category": "pets",
    "value": 716.6051,
    "demand": 2,
    "image": "images/pets/rhino.webp"
  },
  {
    "id": "pets-halloween-evil-dachshund",
    "name": "Halloween Evil Dachshund",
    "category": "pets",
    "value": 581.774,
    "demand": 1,
    "image": "images/pets/halloween-evil-dachshund.webp"
  },
  {
    "id": "stickers-jousting-horse-sticker",
    "name": "Jousting Horse Sticker",
    "category": "stickers",
    "value": 138.8915,
    "demand": 1,
    "image": "images/stickers/jousting-horse-sticker.webp"
  },
  {
    "id": "vehicles-husky-sled",
    "name": "Husky Sled",
    "category": "vehicles",
    "value": 502.5396,
    "demand": 1,
    "image": "images/vehicles/husky-sled.webp"
  },
  {
    "id": "vehicles-celestial-carrier",
    "name": "Celestial Carrier",
    "category": "vehicles",
    "value": 274.1139,
    "demand": 1,
    "image": "images/vehicles/celestial-carrier.webp"
  },
  {
    "id": "pets-general-sheepdog",
    "name": "General Sheepdog",
    "category": "pets",
    "value": 553.06,
    "demand": 1,
    "image": "images/pets/general-sheepdog.webp"
  },
  {
    "id": "pets-stitches",
    "name": "Stitches",
    "category": "pets",
    "value": 127.3434,
    "demand": 1,
    "image": "images/pets/stitches.webp"
  },
  {
    "id": "pets-royal-palace-spaniel",
    "name": "Royal Palace Spaniel",
    "category": "pets",
    "value": 526.8429,
    "demand": 1,
    "image": "images/pets/royal-palace-spaniel.webp"
  },
  {
    "id": "eggs-royal-aztec-egg",
    "name": "Royal Aztec Egg",
    "category": "eggs",
    "value": 785.7149,
    "demand": 2,
    "image": "images/eggs/royal-aztec-egg.webp"
  },
  {
    "id": "stickers-kelp-captain-sticker",
    "name": "Kelp Captain Sticker",
    "category": "stickers",
    "value": 277.7799,
    "demand": 1,
    "image": "images/stickers/kelp-captain-sticker.webp"
  },
  {
    "id": "petwear-shadow-wings",
    "name": "Shadow Wings",
    "category": "petwear",
    "value": 867.4703,
    "demand": 2,
    "image": "images/petwear/shadow-wings.webp"
  },
  {
    "id": "strollers-drone-stroller",
    "name": "Drone Stroller",
    "category": "strollers",
    "value": 378.3802,
    "demand": 1,
    "image": "images/strollers/drone-stroller.webp"
  },
  {
    "id": "petwear-bready-necklace",
    "name": "Bready Necklace",
    "category": "petwear",
    "value": 742.9727,
    "demand": 2,
    "image": "images/petwear/bready-necklace.webp"
  },
  {
    "id": "pets-momma-moose",
    "name": "Momma Moose",
    "category": "pets",
    "value": 350.8134,
    "demand": 1,
    "image": "images/pets/momma-moose.webp"
  },
  {
    "id": "strollers-ice-cream-stroller",
    "name": "Ice Cream Stroller",
    "category": "strollers",
    "value": 797.2979,
    "demand": 1,
    "image": "images/strollers/ice-cream-stroller.webp"
  },
  {
    "id": "pets-kiwi",
    "name": "Kiwi",
    "category": "pets",
    "value": 692.8848,
    "demand": 2,
    "image": "images/pets/kiwi.webp"
  },
  {
    "id": "food-flaming-zebra-bait",
    "name": "Flaming Zebra Bait",
    "category": "food",
    "value": 260.0022,
    "demand": 2,
    "image": "images/food/flaming-zebra-bait.webp"
  },
  {
    "id": "petwear-jeffs-nametag",
    "name": "Jeff's Nametag",
    "category": "petwear",
    "value": 783.1332,
    "demand": 2,
    "image": "images/petwear/jeff-s-nametag.webp"
  },
  {
    "id": "pets-moonbeam-butterfly",
    "name": "Moonbeam Butterfly",
    "category": "pets",
    "value": 777.7784,
    "demand": 2,
    "image": "images/pets/moonbeam-butterfly.webp"
  },
  {
    "id": "pets-seafoam-butterfly",
    "name": "Seafoam Butterfly",
    "category": "pets",
    "value": 486.8929,
    "demand": 1,
    "image": "images/pets/seafoam-butterfly.webp"
  },
  {
    "id": "toys-pro-ghost-blaster",
    "name": "Pro Ghost Blaster",
    "category": "toys",
    "value": 379.3122,
    "demand": 2,
    "image": "images/toys/pro-ghost-blaster.webp"
  },
  {
    "id": "pets-donkey",
    "name": "Donkey",
    "category": "pets",
    "value": 54.9342,
    "demand": 1,
    "image": "images/pets/donkey.webp"
  },
  {
    "id": "pets-piranha",
    "name": "Piranha",
    "category": "pets",
    "value": 186.0199,
    "demand": 1,
    "image": "images/pets/piranha.webp"
  },
  {
    "id": "toys-halloween-slime-paint",
    "name": "Halloween Slime Mega Neon Paint",
    "category": "toys",
    "value": 765.5179,
    "demand": 3,
    "image": "images/toys/halloween-slime-mega-neon-paint.webp"
  },
  {
    "id": "pets-snowball-pet",
    "name": "Snowball Pet",
    "category": "pets",
    "value": 645.4443,
    "demand": 2,
    "image": "images/pets/snowball-pet.webp"
  },
  {
    "id": "eggs-farm-egg",
    "name": "Farm Egg",
    "category": "eggs",
    "value": 976.1905,
    "demand": 2,
    "image": "images/eggs/farm-egg.webp"
  },
  {
    "id": "food-shiver-cone-bait",
    "name": "Shiver Cone Bait",
    "category": "food",
    "value": 80.0028,
    "demand": 1,
    "image": "images/food/shiver-cone-bait.webp"
  },
  {
    "id": "pets-flaming-zebra",
    "name": "Flaming Zebra",
    "category": "pets",
    "value": 545.5694,
    "demand": 1,
    "image": "images/pets/flaming-zebra.webp"
  },
  {
    "id": "pets-candyfloss-chick",
    "name": "Candyfloss Chick",
    "category": "pets",
    "value": 947.5657,
    "demand": 3,
    "image": "images/pets/candyfloss-chick.webp"
  },
  {
    "id": "stickers-toasty-red-panda-sticker",
    "name": "Toasty Red Panda Sticker",
    "category": "stickers",
    "value": 83.3361,
    "demand": 1,
    "image": "images/stickers/toasty-red-panda-sticker.webp"
  },
  {
    "id": "pets-sheepdog-ducky",
    "name": "Sheepdog Ducky",
    "category": "pets",
    "value": 59.9279,
    "demand": 1,
    "image": "images/pets/sheepdog-ducky.webp"
  },
  {
    "id": "pets-choco-penguin",
    "name": "Choco Penguin",
    "category": "pets",
    "value": 365.7947,
    "demand": 1,
    "image": "images/pets/choco-penguin.webp"
  },
  {
    "id": "potions-goofy-potion",
    "name": "Goofy Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-blazing-lion",
    "name": "Blazing Lion",
    "category": "pets",
    "value": 987.5156,
    "demand": 2,
    "image": "images/pets/blazing-lion.webp"
  },
  {
    "id": "stickers-koala-sticker",
    "name": "Koala Sticker",
    "category": "stickers",
    "value": 481.483,
    "demand": 1,
    "image": "images/stickers/koala-sticker.webp"
  },
  {
    "id": "pets-monkey",
    "name": "Monkey",
    "category": "pets",
    "value": 299.6276,
    "demand": 1,
    "image": "images/pets/monkey.webp"
  },
  {
    "id": "toys-noob-balloon",
    "name": "Noob Balloon",
    "category": "toys",
    "value": 372.4157,
    "demand": 1,
    "image": "images/toys/noob-balloon.webp"
  },
  {
    "id": "food-levitation-potion",
    "name": "Levitation Potion",
    "category": "food",
    "value": 740.0008,
    "demand": 1,
    "image": "images/food/levitation-potion.webp"
  },
  {
    "id": "pets-leopard-cat",
    "name": "Leopard Cat",
    "category": "pets",
    "value": 543.0725,
    "demand": 1,
    "image": "images/pets/leopard-cat.webp"
  },
  {
    "id": "pets-gingerbread-reindeer",
    "name": "Gingerbread Reindeer",
    "category": "pets",
    "value": 491.8867,
    "demand": 1,
    "image": "images/pets/gingerbread-reindeer.webp"
  },
  {
    "id": "pets-deathstalker-scorpion",
    "name": "Deathstalker Scorpion",
    "category": "pets",
    "value": 434.4586,
    "demand": 1,
    "image": "images/pets/deathstalker-scorpion.webp"
  },
  {
    "id": "strollers-dog-house-stroller",
    "name": "Dog House Stroller",
    "category": "strollers",
    "value": 513.515,
    "demand": 1,
    "image": "images/strollers/dog-house-stroller.webp"
  },
  {
    "id": "vehicles-ice-queen-sleigh",
    "name": "Ice Queen Sleigh",
    "category": "vehicles",
    "value": 370.5603,
    "demand": 1,
    "image": "images/vehicles/ice-queen-sleigh.webp"
  },
  {
    "id": "pets-lobster",
    "name": "Lobster",
    "category": "pets",
    "value": 410.7383,
    "demand": 1,
    "image": "images/pets/lobster.webp"
  },
  {
    "id": "toys-strawberry-toast-flying-disc",
    "name": "Strawberry Toast Flying Disc",
    "category": "toys",
    "value": 55.1752,
    "demand": 1,
    "image": "images/toys/strawberry-toast-flying-disc.webp"
  },
  {
    "id": "pets-shetland-pony-light-brown",
    "name": "Shetland Pony Light Brown",
    "category": "pets",
    "value": 704.1207,
    "demand": 1,
    "image": "images/pets/shetland-pony-light-brown.webp"
  },
  {
    "id": "petwear-buttoned-ushanka",
    "name": "Buttoned Ushanka",
    "category": "petwear",
    "value": 301.2069,
    "demand": 1,
    "image": "images/petwear/buttoned-ushanka.webp"
  },
  {
    "id": "vehicles-rift-rider",
    "name": "Rift Rider",
    "category": "vehicles",
    "value": 35.5359,
    "demand": 1,
    "image": "images/vehicles/rift-rider.webp"
  },
  {
    "id": "potions-potion",
    "name": "Fly Potion",
    "category": "potions",
    "value": 0.8,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-elephant",
    "name": "Elephant",
    "category": "pets",
    "value": 936.3298,
    "demand": 3,
    "image": "images/pets/elephant.webp"
  },
  {
    "id": "petwear-heart-lock-necklace",
    "name": "Heart Lock Necklace",
    "category": "petwear",
    "value": 236.9501,
    "demand": 1,
    "image": "images/petwear/heart-lock-necklace.webp"
  },
  {
    "id": "pets-lamb",
    "name": "Lamb",
    "category": "pets",
    "value": 786.5175,
    "demand": 2,
    "image": "images/pets/lamb.webp"
  },
  {
    "id": "pets-rosy-maple-moth",
    "name": "Rosy Maple Moth",
    "category": "pets",
    "value": 575.5319,
    "demand": 1,
    "image": "images/pets/rosy-maple-moth.webp"
  },
  {
    "id": "vehicles-orange-skateboard",
    "name": "Neon Orange Skateboard",
    "category": "vehicles",
    "value": 837.5639,
    "demand": 1,
    "image": "images/vehicles/neon-orange-skateboard.webp"
  },
  {
    "id": "vehicles-black-skateboard",
    "name": "Black Skateboard",
    "category": "vehicles",
    "value": 563.4531,
    "demand": 1,
    "image": "images/vehicles/black-skateboard.webp"
  },
  {
    "id": "toys-chinese-lantern",
    "name": "Chinese Lantern",
    "category": "toys",
    "value": 972.4139,
    "demand": 2,
    "image": "images/toys/chinese-lantern.webp"
  },
  {
    "id": "potions-bonus-bucks-potion",
    "name": "Bonus Bucks Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-clockwork-wings",
    "name": "Clockwork Wings",
    "category": "petwear",
    "value": 803.2134,
    "demand": 2,
    "image": "images/petwear/clockwork-wings.webp"
  },
  {
    "id": "pets-kangaroo",
    "name": "Kangaroo",
    "category": "pets",
    "value": 945.0688,
    "demand": 3,
    "image": "images/pets/kangaroo.webp"
  },
  {
    "id": "pets-lunar-tiger",
    "name": "Lunar Tiger",
    "category": "pets",
    "value": 144.8215,
    "demand": 1,
    "image": "images/pets/lunar-tiger.webp"
  },
  {
    "id": "toys-egg-rattle",
    "name": "Egg Rattle",
    "category": "toys",
    "value": 482.7602,
    "demand": 1,
    "image": "images/toys/egg-rattle.webp"
  },
  {
    "id": "pets-sea-angel",
    "name": "Sea Angel",
    "category": "pets",
    "value": 438.2039,
    "demand": 1,
    "image": "images/pets/sea-angel.webp"
  },
  {
    "id": "pets-puffer-fish",
    "name": "Puffer Fish",
    "category": "pets",
    "value": 737.8285,
    "demand": 2,
    "image": "images/pets/puffer-fish.webp"
  },
  {
    "id": "strollers-half-egg-stroller",
    "name": "Half Egg Stroller",
    "category": "strollers",
    "value": 878.3787,
    "demand": 1,
    "image": "images/strollers/half-egg-stroller.webp"
  },
  {
    "id": "vehicles-toxic-barrel",
    "name": "Toxic Barrel",
    "category": "vehicles",
    "value": 609.1382,
    "demand": 1,
    "image": "images/vehicles/toxic-barrel.webp"
  },
  {
    "id": "pets-chocolate-labrador",
    "name": "Chocolate Labrador",
    "category": "pets",
    "value": 42.4498,
    "demand": 1,
    "image": "images/pets/chocolate-labrador.webp"
  },
  {
    "id": "strollers-easter-egg-stroller",
    "name": "Easter Egg Stroller",
    "category": "strollers",
    "value": 851.3518,
    "demand": 1,
    "image": "images/strollers/easter-egg-stroller.webp"
  },
  {
    "id": "toys-phoenix-plush",
    "name": "Phoenix Plush",
    "category": "toys",
    "value": 703.4492,
    "demand": 1,
    "image": "images/toys/phoenix-plush.webp"
  },
  {
    "id": "vehicles-green-scooter",
    "name": "Neon Green Scooter",
    "category": "vehicles",
    "value": 771.5743,
    "demand": 1,
    "image": "images/vehicles/neon-green-scooter.webp"
  },
  {
    "id": "strollers-tractor-stroller",
    "name": "Tractor Stroller",
    "category": "strollers",
    "value": 445.9476,
    "demand": 1,
    "image": "images/strollers/tractor-stroller.webp"
  },
  {
    "id": "pets-smores-raccoon",
    "name": "S'mores Raccoon",
    "category": "pets",
    "value": 717.8535,
    "demand": 2,
    "image": "images/pets/s-mores-raccoon.webp"
  },
  {
    "id": "pets-shadow-dragon-ducky",
    "name": "Shadow Dragon Ducky",
    "category": "pets",
    "value": 533.085,
    "demand": 2,
    "image": "images/pets/shadow-dragon-ducky.webp"
  },
  {
    "id": "pets-diamond-butterfly",
    "name": "Diamond Butterfly",
    "category": "pets",
    "value": 975.0313,
    "demand": 2,
    "image": "images/pets/diamond-butterfly.webp"
  },
  {
    "id": "pets-water-opossum",
    "name": "Water Opossum",
    "category": "pets",
    "value": 122.3497,
    "demand": 1,
    "image": "images/pets/water-opossum.webp"
  },
  {
    "id": "pets-sunrise-duckling",
    "name": "Sunrise Duckling",
    "category": "pets",
    "value": 646.6927,
    "demand": 1,
    "image": "images/pets/sunrise-duckling.webp"
  },
  {
    "id": "toys-tea-party-set",
    "name": "Tea Party Set",
    "category": "toys",
    "value": 951.7243,
    "demand": 2,
    "image": "images/toys/tea-party-set.webp"
  },
  {
    "id": "stickers-mermicorn-animated-sticker",
    "name": "Mermicorn Animated Sticker",
    "category": "stickers",
    "value": 944.4446,
    "demand": 2,
    "image": "images/stickers/mermicorn-animated-sticker.webp"
  },
  {
    "id": "pets-black-chowchow",
    "name": "Black Chow-Chow",
    "category": "pets",
    "value": 659.1771,
    "demand": 1,
    "image": "images/pets/black-chow-chow.webp"
  },
  {
    "id": "pets-haetae",
    "name": "Haetae",
    "category": "pets",
    "value": 988.7641,
    "demand": 3,
    "image": "images/pets/haetae.webp"
  },
  {
    "id": "pets-2d-kitty",
    "name": "2D Kitty",
    "category": "pets",
    "value": 725.3441,
    "demand": 2,
    "image": "images/pets/2d-kitty.webp"
  },
  {
    "id": "pets-snowy-mammoth",
    "name": "Snowy Mammoth",
    "category": "pets",
    "value": 183.523,
    "demand": 1,
    "image": "images/pets/snowy-mammoth.webp"
  },
  {
    "id": "stickers-fairy-bat-dragon-sticker",
    "name": "Fairy Bat Dragon Sticker",
    "category": "stickers",
    "value": 574.0754,
    "demand": 1,
    "image": "images/stickers/fairy-bat-dragon-sticker.webp"
  },
  {
    "id": "pets-eel",
    "name": "Eel",
    "category": "pets",
    "value": 238.4542,
    "demand": 1,
    "image": "images/pets/eel.webp"
  },
  {
    "id": "pets-stegosaurus",
    "name": "Stegosaurus",
    "category": "pets",
    "value": 278.4042,
    "demand": 1,
    "image": "images/pets/stegosaurus.webp"
  },
  {
    "id": "stickers-pretty-please-snowball-sticker",
    "name": "Pretty Please Snowball Sticker",
    "category": "stickers",
    "value": 824.0746,
    "demand": 2,
    "image": "images/stickers/pretty-please-snowball-sticker.webp"
  },
  {
    "id": "petwear-sandwich-hat",
    "name": "Sandwich Hat",
    "category": "petwear",
    "value": 827.3098,
    "demand": 2,
    "image": "images/petwear/sandwich-hat.webp"
  },
  {
    "id": "stickers-winter-deer-family-sticker",
    "name": "Winter Deer Family Sticker",
    "category": "stickers",
    "value": 759.26,
    "demand": 1,
    "image": "images/stickers/winter-deer-family-sticker.webp"
  },
  {
    "id": "pets-koala",
    "name": "Koala",
    "category": "pets",
    "value": 563.0475,
    "demand": 1,
    "image": "images/pets/koala.webp"
  },
  {
    "id": "pets-snow-monkey",
    "name": "Snow Monkey",
    "category": "pets",
    "value": 815.2315,
    "demand": 2,
    "image": "images/pets/snow-monkey.webp"
  },
  {
    "id": "toys-teddy-bear",
    "name": "Teddy Bear",
    "category": "toys",
    "value": 13.7961,
    "demand": 1,
    "image": "images/toys/teddy-bear.webp"
  },
  {
    "id": "toys-skull-drum",
    "name": "Skull Drum",
    "category": "toys",
    "value": 462.0706,
    "demand": 1,
    "image": "images/toys/skull-drum.webp"
  },
  {
    "id": "pets-scarebear",
    "name": "Scarebear",
    "category": "pets",
    "value": 740.3254,
    "demand": 2,
    "image": "images/pets/scarebear.webp"
  },
  {
    "id": "petwear-golden-hair",
    "name": "Golden Hair",
    "category": "petwear",
    "value": 538.154,
    "demand": 1,
    "image": "images/petwear/golden-hair.webp"
  },
  {
    "id": "stickers-long-ermine-sticker",
    "name": "Long Ermine Sticker",
    "category": "stickers",
    "value": 740.7415,
    "demand": 1,
    "image": "images/stickers/long-ermine-sticker.webp"
  },
  {
    "id": "eggs-aussie-egg",
    "name": "Aussie Egg",
    "category": "eggs",
    "value": 880.9527,
    "demand": 3,
    "image": "images/eggs/aussie-egg.webp"
  },
  {
    "id": "petwear-easter-egg-friends",
    "name": "Easter Egg Friends",
    "category": "petwear",
    "value": 465.8651,
    "demand": 1,
    "image": "images/petwear/easter-egg-friends.webp"
  },
  {
    "id": "petwear-kraken-hat",
    "name": "Kraken Hat",
    "category": "petwear",
    "value": 413.6564,
    "demand": 1,
    "image": "images/petwear/kraken-hat.webp"
  },
  {
    "id": "toys-wooden-pogo",
    "name": "Wooden Pogo",
    "category": "toys",
    "value": 393.1053,
    "demand": 1,
    "image": "images/toys/wooden-pogo.webp"
  },
  {
    "id": "petwear-pink-cat-ear-headphones",
    "name": "Pink Cat Ear Headphones",
    "category": "petwear",
    "value": 775.1011,
    "demand": 2,
    "image": "images/petwear/pink-cat-ear-headphones.webp"
  },
  {
    "id": "pets-muskrat",
    "name": "Muskrat",
    "category": "pets",
    "value": 46.1951,
    "demand": 1,
    "image": "images/pets/muskrat.webp"
  },
  {
    "id": "pets-corn-doggo",
    "name": "Corn Doggo",
    "category": "pets",
    "value": 781.5238,
    "demand": 2,
    "image": "images/pets/corn-doggo.webp"
  },
  {
    "id": "vehicles-douglas",
    "name": "Douglas",
    "category": "vehicles",
    "value": 365.4841,
    "demand": 1,
    "image": "images/vehicles/douglas.webp"
  },
  {
    "id": "pets-cupid-dragon",
    "name": "Cupid Dragon",
    "category": "pets",
    "value": 902.622,
    "demand": 3,
    "image": "images/pets/cupid-dragon.webp"
  },
  {
    "id": "petwear-solar-system-necklace",
    "name": "Solar System Necklace",
    "category": "petwear",
    "value": 28.1154,
    "demand": 1,
    "image": "images/petwear/solar-system-necklace.webp"
  },
  {
    "id": "pets-zebra",
    "name": "Zebra",
    "category": "pets",
    "value": 77.406,
    "demand": 1,
    "image": "images/pets/zebra.webp"
  },
  {
    "id": "pets-cow",
    "name": "Cow",
    "category": "pets",
    "value": 968.7891,
    "demand": 3,
    "image": "images/pets/cow.webp"
  },
  {
    "id": "pets-strawberry-shortcake-bat-dragon",
    "name": "Strawberry Shortcake Bat Dragon",
    "category": "pets",
    "value": 977.5282,
    "demand": 3,
    "image": "images/pets/strawberry-shortcake-bat-dragon.webp"
  },
  {
    "id": "petwear-cotton-candy-hat",
    "name": "Cotton Candy Hat",
    "category": "petwear",
    "value": 658.6356,
    "demand": 2,
    "image": "images/petwear/cotton-candy-hat.webp"
  },
  {
    "id": "pets-water-moon-bear",
    "name": "Water Moon Bear",
    "category": "pets",
    "value": 430.7133,
    "demand": 1,
    "image": "images/pets/water-moon-bear.webp"
  },
  {
    "id": "petwear-red-yellow-beads",
    "name": "Red & Yellow Beads",
    "category": "petwear",
    "value": 12.0512,
    "demand": 1,
    "image": "images/petwear/red-yellow-beads.webp"
  },
  {
    "id": "vehicles-headless-horsemans-biplane",
    "name": "Headless Horseman's Biplane",
    "category": "vehicles",
    "value": 492.3873,
    "demand": 1,
    "image": "images/vehicles/headless-horseman-s-biplane.webp"
  },
  {
    "id": "pets-kiwi-kiwi",
    "name": "Kiwi Kiwi",
    "category": "pets",
    "value": 665.4192,
    "demand": 1,
    "image": "images/pets/kiwi-kiwi.webp"
  },
  {
    "id": "petwear-ferris-wheel-hat",
    "name": "Ferris Wheel Hat",
    "category": "petwear",
    "value": 489.9614,
    "demand": 1,
    "image": "images/petwear/ferris-wheel-hat.webp"
  },
  {
    "id": "pets-undead-jousting-horse",
    "name": "Undead Jousting Horse",
    "category": "pets",
    "value": 971.286,
    "demand": 2,
    "image": "images/pets/undead-jousting-horse.webp"
  },
  {
    "id": "pets-mrs-whiskerpips",
    "name": "Mrs. Whiskerpips",
    "category": "pets",
    "value": 223.473,
    "demand": 1,
    "image": "images/pets/mrs-whiskerpips.webp"
  },
  {
    "id": "pets-red-panda-ducky",
    "name": "Red Panda Ducky",
    "category": "pets",
    "value": 64.9217,
    "demand": 1,
    "image": "images/pets/red-panda-ducky.webp"
  },
  {
    "id": "vehicles-zamboni",
    "name": "Zamboni",
    "category": "vehicles",
    "value": 192.8958,
    "demand": 1,
    "image": "images/vehicles/zamboni.webp"
  },
  {
    "id": "stickers-dragon-breath-animated-sticker",
    "name": "Dragon Breath Animated Sticker",
    "category": "stickers",
    "value": 962.9631,
    "demand": 2,
    "image": "images/stickers/dragon-breath-animated-sticker.webp"
  },
  {
    "id": "vehicles-choo-choo-train",
    "name": "Choo Choo Train",
    "category": "vehicles",
    "value": 380.7125,
    "demand": 1,
    "image": "images/vehicles/choo-choo-train.webp"
  },
  {
    "id": "pets-flaming-fox",
    "name": "Flaming Fox",
    "category": "pets",
    "value": 811.4862,
    "demand": 2,
    "image": "images/pets/flaming-fox.webp"
  },
  {
    "id": "petwear-aviator-hat",
    "name": "Aviator Hat",
    "category": "petwear",
    "value": 734.9406,
    "demand": 2,
    "image": "images/petwear/aviator-hat.webp"
  },
  {
    "id": "pets-maine-coon",
    "name": "Maine Coon",
    "category": "pets",
    "value": 342.0744,
    "demand": 1,
    "image": "images/pets/maine-coon.webp"
  },
  {
    "id": "pets-halloween-white-mummy-cat",
    "name": "Halloween White Mummy Cat",
    "category": "pets",
    "value": 337.0806,
    "demand": 1,
    "image": "images/pets/halloween-white-mummy-cat.webp"
  },
  {
    "id": "pets-puffin",
    "name": "Puffin",
    "category": "pets",
    "value": 887.6408,
    "demand": 2,
    "image": "images/pets/puffin.webp"
  },
  {
    "id": "pets-ghostly-cat",
    "name": "Ghostly Cat",
    "category": "pets",
    "value": 429.4649,
    "demand": 1,
    "image": "images/pets/ghostly-cat.webp"
  },
  {
    "id": "pets-panda",
    "name": "Panda",
    "category": "pets",
    "value": 702.8723,
    "demand": 2,
    "image": "images/pets/panda.webp"
  },
  {
    "id": "pets-lunar-gold-tiger",
    "name": "Lunar Gold Tiger",
    "category": "pets",
    "value": 511.8616,
    "demand": 1,
    "image": "images/pets/lunar-gold-tiger.webp"
  },
  {
    "id": "pets-pink-betta-fish",
    "name": "Pink Betta Fish",
    "category": "pets",
    "value": 568.0412,
    "demand": 1,
    "image": "images/pets/pink-betta-fish.webp"
  },
  {
    "id": "pets-moonpine",
    "name": "Moonpine",
    "category": "pets",
    "value": 228.4667,
    "demand": 1,
    "image": "images/pets/moonpine.webp"
  },
  {
    "id": "pets-nutcracker-squirrel",
    "name": "Nutcracker Squirrel",
    "category": "pets",
    "value": 344.5713,
    "demand": 1,
    "image": "images/pets/nutcracker-squirrel.webp"
  },
  {
    "id": "pets-badger",
    "name": "Badger",
    "category": "pets",
    "value": 116.1075,
    "demand": 1,
    "image": "images/pets/badger.webp"
  },
  {
    "id": "petwear-burger-bun-hat",
    "name": "Burger Bun Hat",
    "category": "petwear",
    "value": 273.0946,
    "demand": 1,
    "image": "images/petwear/burger-bun-hat.webp"
  },
  {
    "id": "pets-siamese-cat",
    "name": "Siamese Cat",
    "category": "pets",
    "value": 952.5594,
    "demand": 3,
    "image": "images/pets/siamese-cat.webp"
  },
  {
    "id": "vehicles-bunny-carriage",
    "name": "Bunny Carriage",
    "category": "vehicles",
    "value": 964.4671,
    "demand": 2,
    "image": "images/vehicles/bunny-carriage.webp"
  },
  {
    "id": "pets-indian-leopard",
    "name": "Indian Leopard",
    "category": "pets",
    "value": 348.3166,
    "demand": 1,
    "image": "images/pets/indian-leopard.webp"
  },
  {
    "id": "stickers-naughty-mistletroll-sticker",
    "name": "Naughty Mistletroll Sticker",
    "category": "stickers",
    "value": 259.2615,
    "demand": 1,
    "image": "images/stickers/naughty-mistletroll-sticker.webp"
  },
  {
    "id": "petwear-swamp-mist-wings",
    "name": "Swamp Mist Wings",
    "category": "petwear",
    "value": 64.2598,
    "demand": 1,
    "image": "images/petwear/swamp-mist-wings.webp"
  },
  {
    "id": "stickers-santa-pet-rock-sticker",
    "name": "Santa Pet Rock Sticker",
    "category": "stickers",
    "value": 231.4838,
    "demand": 1,
    "image": "images/stickers/santa-pet-rock-sticker.webp"
  },
  {
    "id": "pets-pinkypillar",
    "name": "Pinkypillar",
    "category": "pets",
    "value": 27.4686,
    "demand": 1,
    "image": "images/pets/pinkypillar.webp"
  },
  {
    "id": "petwear-flower-monocle",
    "name": "Flower Monocle",
    "category": "petwear",
    "value": 546.1861,
    "demand": 1,
    "image": "images/petwear/flower-monocle.webp"
  },
  {
    "id": "pets-golden-albatross",
    "name": "Golden Albatross",
    "category": "pets",
    "value": 625.4693,
    "demand": 1,
    "image": "images/pets/golden-albatross.webp"
  },
  {
    "id": "toys-money-rattle",
    "name": "Money Rattle",
    "category": "toys",
    "value": 331.0365,
    "demand": 1,
    "image": "images/toys/money-rattle.webp"
  },
  {
    "id": "toys-fall-corn-grappling-hook",
    "name": "Fall Corn Grappling Hook",
    "category": "toys",
    "value": 213.7955,
    "demand": 1,
    "image": "images/toys/fall-corn-grappling-hook.webp"
  },
  {
    "id": "pets-lunar-white-tiger",
    "name": "Lunar White Tiger",
    "category": "pets",
    "value": 397.0056,
    "demand": 1,
    "image": "images/pets/lunar-white-tiger.webp"
  },
  {
    "id": "pets-bat",
    "name": "Bat",
    "category": "pets",
    "value": 213.4855,
    "demand": 1,
    "image": "images/pets/bat.webp"
  },
  {
    "id": "vehicles-hot-tub-muscle-car",
    "name": "Hot Tub Muscle Car",
    "category": "vehicles",
    "value": 802.0311,
    "demand": 2,
    "image": "images/vehicles/hot-tub-muscle-car.webp"
  },
  {
    "id": "pets-hummingbird",
    "name": "Hummingbird",
    "category": "pets",
    "value": 444.4461,
    "demand": 1,
    "image": "images/pets/hummingbird.webp"
  },
  {
    "id": "petwear-bewitched-hat",
    "name": "Bewitched Hat",
    "category": "petwear",
    "value": 574.2985,
    "demand": 1,
    "image": "images/petwear/bewitched-hat.webp"
  },
  {
    "id": "pets-pomeranian",
    "name": "Pomeranian",
    "category": "pets",
    "value": 154.809,
    "demand": 1,
    "image": "images/pets/pomeranian.webp"
  },
  {
    "id": "pets-goose",
    "name": "Goose",
    "category": "pets",
    "value": 970.0375,
    "demand": 3,
    "image": "images/pets/goose.webp"
  },
  {
    "id": "pets-black-moon-bear",
    "name": "Black Moon Bear",
    "category": "pets",
    "value": 205.9949,
    "demand": 1,
    "image": "images/pets/black-moon-bear.webp"
  },
  {
    "id": "pets-mushroom-friend",
    "name": "Mushroom Friend",
    "category": "pets",
    "value": 681.6489,
    "demand": 1,
    "image": "images/pets/mushroom-friend.webp"
  },
  {
    "id": "potions-future-sight-potion",
    "name": "Future Sight Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-modern-jetpack",
    "name": "Modern Jetpack",
    "category": "petwear",
    "value": 196.7896,
    "demand": 1,
    "image": "images/petwear/modern-jetpack.webp"
  },
  {
    "id": "pets-albatross",
    "name": "Albatross",
    "category": "pets",
    "value": 343.3228,
    "demand": 1,
    "image": "images/pets/albatross.webp"
  },
  {
    "id": "pets-cactus-friend",
    "name": "Cactus Friend",
    "category": "pets",
    "value": 705.3692,
    "demand": 2,
    "image": "images/pets/cactus-friend.webp"
  },
  {
    "id": "pets-trex",
    "name": "T-Rex",
    "category": "pets",
    "value": 721.5988,
    "demand": 2,
    "image": "images/pets/t-rex.webp"
  },
  {
    "id": "food-maple-leaf-treat",
    "name": "Maple Leaf Treat",
    "category": "food",
    "value": 420.0017,
    "demand": 2,
    "image": "images/food/maple-leaf-treat.webp"
  },
  {
    "id": "petwear-thinking-hat",
    "name": "Thinking Hat",
    "category": "petwear",
    "value": 718.8763,
    "demand": 2,
    "image": "images/petwear/thinking-hat.webp"
  },
  {
    "id": "eggs-woodland-egg",
    "name": "Woodland Egg",
    "category": "eggs",
    "value": 500.0015,
    "demand": 2,
    "image": "images/eggs/woodland-egg.webp"
  },
  {
    "id": "petwear-firey-aura",
    "name": "Firey Aura",
    "category": "petwear",
    "value": 441.7687,
    "demand": 1,
    "image": "images/petwear/firey-aura.webp"
  },
  {
    "id": "pets-giant-anteater",
    "name": "Giant Anteater",
    "category": "pets",
    "value": 911.3611,
    "demand": 3,
    "image": "images/pets/giant-anteater.webp"
  },
  {
    "id": "pets-boohoo",
    "name": "Boohoo",
    "category": "pets",
    "value": 139.8278,
    "demand": 1,
    "image": "images/pets/boohoo.webp"
  },
  {
    "id": "pets-undead-elk",
    "name": "Undead Elk",
    "category": "pets",
    "value": 375.7821,
    "demand": 1,
    "image": "images/pets/undead-elk.webp"
  },
  {
    "id": "pets-spinosaurus",
    "name": "Spinosaurus",
    "category": "pets",
    "value": 736.5801,
    "demand": 2,
    "image": "images/pets/spinosaurus.webp"
  },
  {
    "id": "pets-nurse-shark",
    "name": "Nurse Shark",
    "category": "pets",
    "value": 63.6732,
    "demand": 1,
    "image": "images/pets/nurse-shark.webp"
  },
  {
    "id": "food-ice-tub",
    "name": "Ice Tub",
    "category": "food",
    "value": 600.0012,
    "demand": 2,
    "image": "images/food/ice-tub.webp"
  },
  {
    "id": "toys-creator-rattle",
    "name": "Creator Rattle (Bethink)",
    "category": "toys",
    "value": 820.6902,
    "demand": 1,
    "image": "images/toys/creator-rattle-bethink.webp"
  },
  {
    "id": "toys-sleigh-bells-rattle",
    "name": "Sleigh Bells Rattle",
    "category": "toys",
    "value": 62.0718,
    "demand": 1,
    "image": "images/toys/sleigh-bells-rattle.webp"
  },
  {
    "id": "pets-golden-tortoise-beetle",
    "name": "Golden Tortoise Beetle",
    "category": "pets",
    "value": 580.5256,
    "demand": 1,
    "image": "images/pets/golden-tortoise-beetle.webp"
  },
  {
    "id": "pets-ratatoskr",
    "name": "Ratatoskr",
    "category": "pets",
    "value": 163.5481,
    "demand": 1,
    "image": "images/pets/ratatoskr.webp"
  },
  {
    "id": "pets-golden-hamster",
    "name": "Golden Hamster",
    "category": "pets",
    "value": 660.4255,
    "demand": 1,
    "image": "images/pets/golden-hamster.webp"
  },
  {
    "id": "pets-candy-cane-snail",
    "name": "Candy Cane Snail",
    "category": "pets",
    "value": 539.3272,
    "demand": 1,
    "image": "images/pets/candy-cane-snail.webp"
  },
  {
    "id": "strollers-duck-stroller",
    "name": "Duck Stroller",
    "category": "strollers",
    "value": 864.8653,
    "demand": 1,
    "image": "images/strollers/duck-stroller.webp"
  },
  {
    "id": "pets-black-springer-spaniel",
    "name": "Black Springer Spaniel",
    "category": "pets",
    "value": 701.6239,
    "demand": 2,
    "image": "images/pets/black-springer-spaniel.webp"
  },
  {
    "id": "pets-spider-crab",
    "name": "Spider Crab",
    "category": "pets",
    "value": 411.9868,
    "demand": 1,
    "image": "images/pets/spider-crab.webp"
  },
  {
    "id": "pets-red-cardinal",
    "name": "Red Cardinal",
    "category": "pets",
    "value": 239.7027,
    "demand": 1,
    "image": "images/pets/red-cardinal.webp"
  },
  {
    "id": "pets-pelican",
    "name": "Pelican",
    "category": "pets",
    "value": 958.8016,
    "demand": 2,
    "image": "images/pets/pelican.webp"
  },
  {
    "id": "pets-criosphinx",
    "name": "Criosphinx",
    "category": "pets",
    "value": 631.7115,
    "demand": 1,
    "image": "images/pets/criosphinx.webp"
  },
  {
    "id": "toys-tropical-surge-paint",
    "name": "Tropical Surge Mega Neon Paint",
    "category": "toys",
    "value": 600.0012,
    "demand": 3,
    "image": "images/toys/tropical-surge-mega-neon-paint.webp"
  },
  {
    "id": "stickers-walrus-sticker",
    "name": "Walrus Sticker",
    "category": "stickers",
    "value": 388.8907,
    "demand": 1,
    "image": "images/stickers/walrus-sticker.webp"
  },
  {
    "id": "strollers-woodland-cradle-stroller",
    "name": "Woodland Cradle Stroller",
    "category": "strollers",
    "value": 297.2994,
    "demand": 1,
    "image": "images/strollers/woodland-cradle-stroller.webp"
  },
  {
    "id": "toys-dance-arcade-stand",
    "name": "Dance Arcade Stand",
    "category": "toys",
    "value": 758.6214,
    "demand": 1,
    "image": "images/toys/dance-arcade-stand.webp"
  },
  {
    "id": "vehicles-soccer-car",
    "name": "Soccer Car",
    "category": "vehicles",
    "value": 40.612,
    "demand": 1,
    "image": "images/vehicles/soccer-car.webp"
  },
  {
    "id": "pets-chipmunk",
    "name": "Chipmunk",
    "category": "pets",
    "value": 564.2959,
    "demand": 1,
    "image": "images/pets/chipmunk.webp"
  },
  {
    "id": "pets-candy-hare",
    "name": "Candy Hare",
    "category": "pets",
    "value": 796.505,
    "demand": 2,
    "image": "images/pets/candy-hare.webp"
  },
  {
    "id": "gifts-standard-gorilla-box",
    "name": "Standard Gorilla Box",
    "category": "gifts",
    "value": 317.0752,
    "demand": 1,
    "image": "images/gifts/standard-gorilla-box.webp"
  },
  {
    "id": "vehicles-melon-skateboard",
    "name": "Melon Skateboard",
    "category": "vehicles",
    "value": 624.3666,
    "demand": 1,
    "image": "images/vehicles/melon-skateboard.webp"
  },
  {
    "id": "petwear-goth-shoes",
    "name": "Goth Shoes",
    "category": "petwear",
    "value": 871.4863,
    "demand": 2,
    "image": "images/petwear/goth-shoes.webp"
  },
  {
    "id": "petwear-winter-bow-wings",
    "name": "Winter Bow Wings",
    "category": "petwear",
    "value": 164.6611,
    "demand": 1,
    "image": "images/petwear/winter-bow-wings.webp"
  },
  {
    "id": "vehicles-camper-van",
    "name": "Camper Van",
    "category": "vehicles",
    "value": 167.5152,
    "demand": 1,
    "image": "images/vehicles/camper-van.webp"
  },
  {
    "id": "vehicles-speedboat",
    "name": "Speedboat",
    "category": "vehicles",
    "value": 101.5255,
    "demand": 1,
    "image": "images/vehicles/speedboat.webp"
  },
  {
    "id": "eggs-fool-egg",
    "name": "Fool Egg",
    "category": "eggs",
    "value": 761.9055,
    "demand": 2,
    "image": "images/eggs/fool-egg.webp"
  },
  {
    "id": "petwear-personal-controller",
    "name": "Personal Controller",
    "category": "petwear",
    "value": 397.5922,
    "demand": 1,
    "image": "images/petwear/personal-controller.webp"
  },
  {
    "id": "petwear-fishbone-badge",
    "name": "Fishbone Badge",
    "category": "petwear",
    "value": 381.528,
    "demand": 2,
    "image": "images/petwear/fishbone-badge.webp"
  },
  {
    "id": "strollers-floating-hand-stroller",
    "name": "Floating Hand Stroller",
    "category": "strollers",
    "value": 837.8383,
    "demand": 1,
    "image": "images/strollers/floating-hand-stroller.webp"
  },
  {
    "id": "toys-chocolate-bunny-balloon",
    "name": "Chocolate Bunny Balloon",
    "category": "toys",
    "value": 386.2087,
    "demand": 1,
    "image": "images/toys/chocolate-bunny-balloon.webp"
  },
  {
    "id": "pets-winter-buck",
    "name": "Winter Buck",
    "category": "pets",
    "value": 591.7615,
    "demand": 1,
    "image": "images/pets/winter-buck.webp"
  },
  {
    "id": "petwear-human-feet-shoes",
    "name": "Human Feet Shoes",
    "category": "petwear",
    "value": 88.3561,
    "demand": 1,
    "image": "images/petwear/human-feet-shoes.webp"
  },
  {
    "id": "strollers-web-stroller",
    "name": "Web Stroller",
    "category": "strollers",
    "value": 770.271,
    "demand": 1,
    "image": "images/strollers/web-stroller.webp"
  },
  {
    "id": "stickers-mighty-haetyphoon-animated-sticker",
    "name": "Mighty Haetyphoon Animated Sticker",
    "category": "stickers",
    "value": 898.1485,
    "demand": 2,
    "image": "images/stickers/mighty-haetyphoon-animated-sticker.webp"
  },
  {
    "id": "vehicles-spinning-teacup-vehicle",
    "name": "Spinning Teacup Vehicle",
    "category": "vehicles",
    "value": 111.6778,
    "demand": 1,
    "image": "images/vehicles/spinning-teacup-vehicle.webp"
  },
  {
    "id": "petwear-fishbowl-hat",
    "name": "Fishbowl Hat",
    "category": "petwear",
    "value": 586.3466,
    "demand": 1,
    "image": "images/petwear/fishbowl-hat.webp"
  },
  {
    "id": "vehicles-ruddy-duck-waddler",
    "name": "Ruddy Duck Waddler",
    "category": "vehicles",
    "value": 5.0791,
    "demand": 1,
    "image": "images/vehicles/ruddy-duck-waddler.webp"
  },
  {
    "id": "petwear-eyepatch",
    "name": "Eyepatch",
    "category": "petwear",
    "value": 622.4911,
    "demand": 1,
    "image": "images/petwear/eyepatch.webp"
  },
  {
    "id": "vehicles-green-skateboard",
    "name": "Neon Green Skateboard",
    "category": "vehicles",
    "value": 812.1833,
    "demand": 1,
    "image": "images/vehicles/neon-green-skateboard.webp"
  },
  {
    "id": "toys-octopus-plush",
    "name": "Octopus Plush",
    "category": "toys",
    "value": 503.4498,
    "demand": 1,
    "image": "images/toys/octopus-plush.webp"
  },
  {
    "id": "toys-heart-balloon",
    "name": "Heart Balloon",
    "category": "toys",
    "value": 200.0024,
    "demand": 1,
    "image": "images/toys/heart-balloon.webp"
  },
  {
    "id": "pets-frost-phoenix",
    "name": "Frost Phoenix",
    "category": "pets",
    "value": 807.7409,
    "demand": 2,
    "image": "images/pets/frost-phoenix.webp"
  },
  {
    "id": "strollers-cradle-stroller",
    "name": "Cradle Stroller",
    "category": "strollers",
    "value": 945.9461,
    "demand": 1,
    "image": "images/strollers/cradle-stroller.webp"
  },
  {
    "id": "petwear-cutlass",
    "name": "Cutlass",
    "category": "petwear",
    "value": 514.0577,
    "demand": 1,
    "image": "images/petwear/cutlass.webp"
  },
  {
    "id": "stickers-strawberry-shortcake-bat-dragon-sticker",
    "name": "Strawberry Shortcake Bat Dragon Sticker",
    "category": "stickers",
    "value": 851.8523,
    "demand": 2,
    "image": "images/stickers/strawberry-shortcake-bat-dragon-sticker.webp"
  },
  {
    "id": "toys-creepy-balloon",
    "name": "Creepy Balloon",
    "category": "toys",
    "value": 358.6226,
    "demand": 1,
    "image": "images/toys/creepy-balloon.webp"
  },
  {
    "id": "vehicles-ghost-vehicle",
    "name": "Ghost Vehicle",
    "category": "vehicles",
    "value": 1000.0,
    "demand": 2,
    "image": "images/vehicles/ghost-vehicle.webp"
  },
  {
    "id": "pets-latte-kitsune",
    "name": "Latte Kitsune",
    "category": "pets",
    "value": 827.7159,
    "demand": 2,
    "image": "images/pets/latte-kitsune.webp"
  },
  {
    "id": "petwear-halloween-green-zombie-bat-wings",
    "name": "Halloween Green Zombie Bat Wings",
    "category": "petwear",
    "value": 124.5006,
    "demand": 1,
    "image": "images/petwear/halloween-green-zombie-bat-wings.webp"
  },
  {
    "id": "pets-trihorned-treehopper",
    "name": "Tri-horned Treehopper",
    "category": "pets",
    "value": 888.8892,
    "demand": 2,
    "image": "images/pets/tri-horned-treehopper.webp"
  },
  {
    "id": "vehicles-rose-petal-carriage",
    "name": "Rose Petal Carriage",
    "category": "vehicles",
    "value": 690.3563,
    "demand": 2,
    "image": "images/vehicles/rose-petal-carriage.webp"
  },
  {
    "id": "toys-bunny-plush",
    "name": "Bunny Plush",
    "category": "toys",
    "value": 641.3804,
    "demand": 1,
    "image": "images/toys/bunny-plush.webp"
  },
  {
    "id": "petwear-bone-wings",
    "name": "Bone Wings",
    "category": "petwear",
    "value": 104.4204,
    "demand": 1,
    "image": "images/petwear/bone-wings.webp"
  },
  {
    "id": "pets-waffle-wyrm",
    "name": "Waffle Wyrm",
    "category": "pets",
    "value": 197.2558,
    "demand": 1,
    "image": "images/pets/waffle-wyrm.webp"
  },
  {
    "id": "stickers-vol-2-pets-plus-sticker-pack",
    "name": "Vol. 2 Pets Plus Sticker Pack",
    "category": "stickers",
    "value": 907.4077,
    "demand": 2,
    "image": "images/stickers/vol-2-pets-plus-sticker-pack.webp"
  },
  {
    "id": "pets-peacock",
    "name": "Peacock",
    "category": "pets",
    "value": 711.6114,
    "demand": 2,
    "image": "images/pets/peacock.webp"
  },
  {
    "id": "pets-buffalo",
    "name": "Buffalo",
    "category": "pets",
    "value": 4.9967,
    "demand": 1,
    "image": "images/pets/buffalo.webp"
  },
  {
    "id": "eggs-mythic-egg",
    "name": "Mythic Egg",
    "category": "eggs",
    "value": 428.5731,
    "demand": 2,
    "image": "images/eggs/mythic-egg.webp"
  },
  {
    "id": "pets-starhopper",
    "name": "Starhopper",
    "category": "pets",
    "value": 441.9492,
    "demand": 1,
    "image": "images/pets/starhopper.webp"
  },
  {
    "id": "petwear-heart-ribbon",
    "name": "Heart Ribbon",
    "category": "petwear",
    "value": 257.0303,
    "demand": 1,
    "image": "images/petwear/heart-ribbon.webp"
  },
  {
    "id": "vehicles-snow-globetrotter",
    "name": "Snow Globetrotter",
    "category": "vehicles",
    "value": 162.4391,
    "demand": 1,
    "image": "images/vehicles/snow-globetrotter.webp"
  },
  {
    "id": "strollers-swan-stroller",
    "name": "Swan Stroller",
    "category": "strollers",
    "value": 391.8937,
    "demand": 1,
    "image": "images/strollers/swan-stroller.webp"
  },
  {
    "id": "vehicles-donut-cycle",
    "name": "Donut Cycle",
    "category": "vehicles",
    "value": 705.5846,
    "demand": 1,
    "image": "images/vehicles/donut-cycle.webp"
  },
  {
    "id": "pets-little-lamb",
    "name": "Little Lamb",
    "category": "pets",
    "value": 108.6169,
    "demand": 1,
    "image": "images/pets/little-lamb.webp"
  },
  {
    "id": "pets-stray-cat-dragon",
    "name": "Stray Cat Dragon",
    "category": "pets",
    "value": 324.5963,
    "demand": 1,
    "image": "images/pets/stray-cat-dragon.webp"
  },
  {
    "id": "pets-halloween-white-skeleton-dog",
    "name": "Halloween White Skeleton Dog",
    "category": "pets",
    "value": 516.8554,
    "demand": 1,
    "image": "images/pets/halloween-white-skeleton-dog.webp"
  },
  {
    "id": "pets-black-panther",
    "name": "Black Panther",
    "category": "pets",
    "value": 709.1145,
    "demand": 2,
    "image": "images/pets/black-panther.webp"
  },
  {
    "id": "petwear-magic-girl-wings",
    "name": "Magic Girl Wings",
    "category": "petwear",
    "value": 935.7432,
    "demand": 2,
    "image": "images/petwear/magic-girl-wings.webp"
  },
  {
    "id": "pets-astronaut-gorilla",
    "name": "Astronaut Gorilla",
    "category": "pets",
    "value": 770.2878,
    "demand": 2,
    "image": "images/pets/astronaut-gorilla.webp"
  },
  {
    "id": "pets-hamster",
    "name": "Hamster",
    "category": "pets",
    "value": 372.0368,
    "demand": 1,
    "image": "images/pets/hamster.webp"
  },
  {
    "id": "pets-golden-unicorn",
    "name": "Golden Unicorn",
    "category": "pets",
    "value": 330.8385,
    "demand": 1,
    "image": "images/pets/golden-unicorn.webp"
  },
  {
    "id": "toys-candle",
    "name": "Candle",
    "category": "toys",
    "value": 151.7267,
    "demand": 1,
    "image": "images/toys/candle.webp"
  },
  {
    "id": "gifts-box-of-jokes",
    "name": "Box of Jokes",
    "category": "gifts",
    "value": 146.344,
    "demand": 1,
    "image": "images/gifts/box-of-jokes.webp"
  },
  {
    "id": "pets-goldhorn",
    "name": "Goldhorn",
    "category": "pets",
    "value": 745.3191,
    "demand": 2,
    "image": "images/pets/goldhorn.webp"
  },
  {
    "id": "toys-polar-bear-plush",
    "name": "Polar Bear Plush",
    "category": "toys",
    "value": 441.381,
    "demand": 1,
    "image": "images/toys/polar-bear-plush.webp"
  },
  {
    "id": "gifts-bat-box",
    "name": "Bat Box",
    "category": "gifts",
    "value": 756.0983,
    "demand": 2,
    "image": "images/gifts/bat-box.webp"
  },
  {
    "id": "petwear-puppeteer-hand",
    "name": "Puppeteer Hand",
    "category": "petwear",
    "value": 293.1748,
    "demand": 1,
    "image": "images/petwear/puppeteer-hand.webp"
  },
  {
    "id": "pets-king-bee",
    "name": "King Bee",
    "category": "pets",
    "value": 619.2271,
    "demand": 2,
    "image": "images/pets/king-bee.webp"
  },
  {
    "id": "petwear-pink-instant-camera",
    "name": "Pink Instant Camera",
    "category": "petwear",
    "value": 357.4316,
    "demand": 2,
    "image": "images/petwear/pink-instant-camera.webp"
  },
  {
    "id": "pets-many-mackerel",
    "name": "Many Mackerel",
    "category": "pets",
    "value": 885.1439,
    "demand": 2,
    "image": "images/pets/many-mackerel.webp"
  },
  {
    "id": "petwear-chicken-hat",
    "name": "Chicken Hat",
    "category": "petwear",
    "value": 662.6516,
    "demand": 1,
    "image": "images/petwear/chicken-hat.webp"
  },
  {
    "id": "pets-mini-pig",
    "name": "Mini Pig",
    "category": "pets",
    "value": 973.7829,
    "demand": 3,
    "image": "images/pets/mini-pig.webp"
  },
  {
    "id": "pets-old-king-coal",
    "name": "Old King Coal",
    "category": "pets",
    "value": 303.3729,
    "demand": 1,
    "image": "images/pets/old-king-coal.webp"
  },
  {
    "id": "strollers-donut-stroller",
    "name": "Donut Stroller",
    "category": "strollers",
    "value": 500.0015,
    "demand": 1,
    "image": "images/strollers/donut-stroller.webp"
  },
  {
    "id": "food-goldenrod-flower",
    "name": "Goldenrod Flower",
    "category": "food",
    "value": 960.0001,
    "demand": 2,
    "image": "images/food/goldenrod-flower.webp"
  },
  {
    "id": "petwear-mandarins-hat",
    "name": "Mandarin's Hat",
    "category": "petwear",
    "value": 510.0416,
    "demand": 1,
    "image": "images/petwear/mandarin-s-hat.webp"
  },
  {
    "id": "strollers-elephant-stroller",
    "name": "Elephant Stroller",
    "category": "strollers",
    "value": 675.6766,
    "demand": 1,
    "image": "images/strollers/elephant-stroller.webp"
  },
  {
    "id": "toys-balloon",
    "name": "Balloon",
    "category": "toys",
    "value": 289.6573,
    "demand": 1,
    "image": "images/toys/balloon.webp"
  },
  {
    "id": "toys-donut-rattle",
    "name": "Donut Rattle",
    "category": "toys",
    "value": 89.6579,
    "demand": 1,
    "image": "images/toys/donut-rattle.webp"
  },
  {
    "id": "pets-turtle",
    "name": "Turtle",
    "category": "pets",
    "value": 955.0563,
    "demand": 3,
    "image": "images/pets/turtle.webp"
  },
  {
    "id": "gifts-monkey-box",
    "name": "Monkey Box",
    "category": "gifts",
    "value": 902.4393,
    "demand": 2,
    "image": "images/gifts/monkey-box.webp"
  },
  {
    "id": "pets-samoyed",
    "name": "Samoyed",
    "category": "pets",
    "value": 134.8341,
    "demand": 1,
    "image": "images/pets/samoyed.webp"
  },
  {
    "id": "petwear-icey-aura",
    "name": "Icey Aura",
    "category": "petwear",
    "value": 738.9566,
    "demand": 1,
    "image": "images/petwear/icey-aura.webp"
  },
  {
    "id": "petwear-banana-hat",
    "name": "Banana Hat",
    "category": "petwear",
    "value": 779.1171,
    "demand": 2,
    "image": "images/petwear/banana-hat.webp"
  },
  {
    "id": "potions-choosy-potion",
    "name": "Choosy Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-strawberry-cupcake-shoes",
    "name": "Strawberry Cupcake Shoes",
    "category": "petwear",
    "value": 1000.0,
    "demand": 2,
    "image": "images/petwear/strawberry-cupcake-shoes.webp"
  },
  {
    "id": "toys-briefcase-ingredient",
    "name": "Briefcase Ingredient",
    "category": "toys",
    "value": 124.1406,
    "demand": 1,
    "image": "images/toys/briefcase-ingredient.webp"
  },
  {
    "id": "strollers-palanquin-stroller",
    "name": "Palanquin Stroller",
    "category": "strollers",
    "value": 581.0823,
    "demand": 1,
    "image": "images/strollers/palanquin-stroller.webp"
  },
  {
    "id": "toys-llama-plush",
    "name": "Llama Plush",
    "category": "toys",
    "value": 655.1734,
    "demand": 1,
    "image": "images/toys/llama-plush.webp"
  },
  {
    "id": "stickers-frog-sticker",
    "name": "Frog Sticker",
    "category": "stickers",
    "value": 416.6684,
    "demand": 1,
    "image": "images/stickers/frog-sticker.webp"
  },
  {
    "id": "vehicles-rocket-sled",
    "name": "Rocket Sled",
    "category": "vehicles",
    "value": 989.8477,
    "demand": 2,
    "image": "images/vehicles/rocket-sled.webp"
  },
  {
    "id": "pets-diamond-hummingbird",
    "name": "Diamond Hummingbird",
    "category": "pets",
    "value": 872.6596,
    "demand": 2,
    "image": "images/pets/diamond-hummingbird.webp"
  },
  {
    "id": "pets-jumping-spider",
    "name": "Jumping Spider",
    "category": "pets",
    "value": 188.5168,
    "demand": 1,
    "image": "images/pets/jumping-spider.webp"
  },
  {
    "id": "strollers-red-wagon-stroller",
    "name": "Red Wagon Stroller",
    "category": "strollers",
    "value": 594.5958,
    "demand": 1,
    "image": "images/strollers/red-wagon-stroller.webp"
  },
  {
    "id": "pets-black-macaque",
    "name": "Black Macaque",
    "category": "pets",
    "value": 590.5131,
    "demand": 2,
    "image": "images/pets/black-macaque.webp"
  },
  {
    "id": "vehicles-wing-trunk-car",
    "name": "Wing Trunk Car",
    "category": "vehicles",
    "value": 431.4738,
    "demand": 1,
    "image": "images/vehicles/wing-trunk-car.webp"
  },
  {
    "id": "pets-merhorse",
    "name": "Merhorse",
    "category": "pets",
    "value": 334.5838,
    "demand": 1,
    "image": "images/pets/merhorse.webp"
  },
  {
    "id": "pets-ribbon-seal",
    "name": "Ribbon Seal",
    "category": "pets",
    "value": 29.9655,
    "demand": 1,
    "image": "images/pets/ribbon-seal.webp"
  },
  {
    "id": "pets-polar-bear",
    "name": "Polar Bear",
    "category": "pets",
    "value": 848.9393,
    "demand": 2,
    "image": "images/pets/polar-bear.webp"
  },
  {
    "id": "pets-chanekeh",
    "name": "Chanekeh",
    "category": "pets",
    "value": 99.8779,
    "demand": 1,
    "image": "images/pets/chanekeh.webp"
  },
  {
    "id": "toys-hugging-egg",
    "name": "Hugging Egg",
    "category": "toys",
    "value": 937.9312,
    "demand": 1,
    "image": "images/toys/hugging-egg.webp"
  },
  {
    "id": "toys-banana-pogo",
    "name": "Banana Pogo",
    "category": "toys",
    "value": 317.2434,
    "demand": 1,
    "image": "images/toys/banana-pogo.webp"
  },
  {
    "id": "pets-ibex",
    "name": "Ibex",
    "category": "pets",
    "value": 374.5337,
    "demand": 1,
    "image": "images/pets/ibex.webp"
  },
  {
    "id": "pets-super-saru",
    "name": "Super Saru",
    "category": "pets",
    "value": 669.1645,
    "demand": 1,
    "image": "images/pets/super-saru.webp"
  },
  {
    "id": "petwear-gingerbread-wings",
    "name": "Gingerbread Wings",
    "category": "petwear",
    "value": 120.4846,
    "demand": 1,
    "image": "images/petwear/gingerbread-wings.webp"
  },
  {
    "id": "strollers-french-fries-stroller",
    "name": "French Fries Stroller",
    "category": "strollers",
    "value": 756.7575,
    "demand": 1,
    "image": "images/strollers/french-fries-stroller.webp"
  },
  {
    "id": "petwear-candy-corn-hat",
    "name": "Candy Corn Hat",
    "category": "petwear",
    "value": 144.5809,
    "demand": 1,
    "image": "images/petwear/candy-corn-hat.webp"
  },
  {
    "id": "petwear-jester-hat",
    "name": "Jester Hat",
    "category": "petwear",
    "value": 421.6885,
    "demand": 1,
    "image": "images/petwear/jester-hat.webp"
  },
  {
    "id": "pets-bolt",
    "name": "Bolt",
    "category": "pets",
    "value": 112.3622,
    "demand": 1,
    "image": "images/pets/bolt.webp"
  },
  {
    "id": "pets-tree-frog",
    "name": "Tree Frog",
    "category": "pets",
    "value": 74.9091,
    "demand": 1,
    "image": "images/pets/tree-frog.webp"
  },
  {
    "id": "toys-teddy-skele",
    "name": "Teddy Skele",
    "category": "toys",
    "value": 958.6208,
    "demand": 2,
    "image": "images/toys/teddy-skele.webp"
  },
  {
    "id": "pets-owl",
    "name": "Owl",
    "category": "pets",
    "value": 996.2547,
    "demand": 3,
    "image": "images/pets/owl.webp"
  },
  {
    "id": "pets-jiggly-jerboa",
    "name": "Jiggly Jerboa",
    "category": "pets",
    "value": 58.6795,
    "demand": 1,
    "image": "images/pets/jiggly-jerboa.webp"
  },
  {
    "id": "food-golden-corn",
    "name": "Golden Corn",
    "category": "food",
    "value": 500.0015,
    "demand": 2,
    "image": "images/food/golden-corn.webp"
  },
  {
    "id": "petwear-pancake-stack",
    "name": "Pancake Stack",
    "category": "petwear",
    "value": 863.4542,
    "demand": 2,
    "image": "images/petwear/pancake-stack.webp"
  },
  {
    "id": "pets-tarsier",
    "name": "Tarsier",
    "category": "pets",
    "value": 561.7991,
    "demand": 1,
    "image": "images/pets/tarsier.webp"
  },
  {
    "id": "pets-pandaguin-glooptodog",
    "name": "Pandaguin Glooptodog",
    "category": "pets",
    "value": 131.0887,
    "demand": 1,
    "image": "images/pets/pandaguin-glooptodog.webp"
  },
  {
    "id": "food-ash-zebra-bait",
    "name": "Ash Zebra Bait",
    "category": "food",
    "value": 240.0023,
    "demand": 2,
    "image": "images/food/ash-zebra-bait.webp"
  },
  {
    "id": "toys-chick-plush",
    "name": "Chick Plush",
    "category": "toys",
    "value": 675.863,
    "demand": 1,
    "image": "images/toys/chick-plush.webp"
  },
  {
    "id": "pets-midnight-dragon",
    "name": "Midnight Dragon",
    "category": "pets",
    "value": 895.1314,
    "demand": 2,
    "image": "images/pets/midnight-dragon.webp"
  },
  {
    "id": "vehicles-ice-scooter",
    "name": "Ice Scooter",
    "category": "vehicles",
    "value": 629.4427,
    "demand": 1,
    "image": "images/vehicles/ice-scooter.webp"
  },
  {
    "id": "pets-toxic-kaijunior",
    "name": "Toxic Kaijunior",
    "category": "pets",
    "value": 308.3666,
    "demand": 1,
    "image": "images/pets/toxic-kaijunior.webp"
  },
  {
    "id": "pets-winged-horse",
    "name": "Winged Horse",
    "category": "pets",
    "value": 667.9161,
    "demand": 2,
    "image": "images/pets/winged-horse.webp"
  },
  {
    "id": "toys-christmas-cat-rattle",
    "name": "Christmas Cat Rattle",
    "category": "toys",
    "value": 489.6567,
    "demand": 1,
    "image": "images/toys/christmas-cat-rattle.webp"
  },
  {
    "id": "pets-humbug",
    "name": "Humbug",
    "category": "pets",
    "value": 37.4561,
    "demand": 1,
    "image": "images/pets/humbug.webp"
  },
  {
    "id": "petwear-rotating-periscope",
    "name": "Rotating Periscope",
    "category": "petwear",
    "value": 60.2438,
    "demand": 1,
    "image": "images/petwear/rotating-periscope.webp"
  },
  {
    "id": "pets-peregrine-falcon",
    "name": "Peregrine Falcon",
    "category": "pets",
    "value": 458.1789,
    "demand": 1,
    "image": "images/pets/peregrine-falcon.webp"
  },
  {
    "id": "pets-balloon-unicorn",
    "name": "Balloon Unicorn",
    "category": "pets",
    "value": 992.5094,
    "demand": 3,
    "image": "images/pets/balloon-unicorn.webp"
  },
  {
    "id": "pets-kaijunior",
    "name": "Kaijunior",
    "category": "pets",
    "value": 208.4918,
    "demand": 1,
    "image": "images/pets/kaijunior.webp"
  },
  {
    "id": "pets-dire-wolf",
    "name": "Dire Wolf",
    "category": "pets",
    "value": 230.9636,
    "demand": 1,
    "image": "images/pets/dire-wolf.webp"
  },
  {
    "id": "toys-telescope-pogo",
    "name": "Telescope Pogo",
    "category": "toys",
    "value": 241.3816,
    "demand": 1,
    "image": "images/toys/telescope-pogo.webp"
  },
  {
    "id": "pets-seagull",
    "name": "Seagull",
    "category": "pets",
    "value": 481.8992,
    "demand": 1,
    "image": "images/pets/seagull.webp"
  },
  {
    "id": "pets-halloween-blue-scorpion",
    "name": "Halloween Blue Scorpion",
    "category": "pets",
    "value": 242.1995,
    "demand": 1,
    "image": "images/pets/halloween-blue-scorpion.webp"
  },
  {
    "id": "toys-wing-hang-glider",
    "name": "Wing Hang Glider",
    "category": "toys",
    "value": 931.0347,
    "demand": 2,
    "image": "images/toys/wing-hang-glider.webp"
  },
  {
    "id": "gifts-halloween-chick-box",
    "name": "Halloween Chick Box",
    "category": "gifts",
    "value": 463.4162,
    "demand": 1,
    "image": "images/gifts/halloween-chick-box.webp"
  },
  {
    "id": "vehicles-beachgoer",
    "name": "Beachgoer",
    "category": "vehicles",
    "value": 86.2972,
    "demand": 1,
    "image": "images/vehicles/beachgoer.webp"
  },
  {
    "id": "pets-kraken",
    "name": "Kraken",
    "category": "pets",
    "value": 565.5444,
    "demand": 1,
    "image": "images/pets/kraken.webp"
  },
  {
    "id": "pets-evil-unicorn",
    "name": "Evil Unicorn",
    "category": "pets",
    "value": 982.5219,
    "demand": 3,
    "image": "images/pets/evil-unicorn.webp"
  },
  {
    "id": "pets-cuddly-candle",
    "name": "Cuddly Candle",
    "category": "pets",
    "value": 661.6739,
    "demand": 1,
    "image": "images/pets/cuddly-candle.webp"
  },
  {
    "id": "pets-headless-horse",
    "name": "Headless Horse",
    "category": "pets",
    "value": 632.9599,
    "demand": 2,
    "image": "images/pets/headless-horse.webp"
  },
  {
    "id": "stickers-shark-puppy-sticker",
    "name": "Shark Puppy Sticker",
    "category": "stickers",
    "value": 620.3715,
    "demand": 1,
    "image": "images/stickers/shark-puppy-sticker.webp"
  },
  {
    "id": "petwear-silly-duck-hat",
    "name": "Silly Duck Hat",
    "category": "petwear",
    "value": 36.1475,
    "demand": 1,
    "image": "images/petwear/silly-duck-hat.webp"
  },
  {
    "id": "pets-phoenix",
    "name": "Phoenix",
    "category": "pets",
    "value": 759.0519,
    "demand": 2,
    "image": "images/pets/phoenix.webp"
  },
  {
    "id": "petwear-pink-designer-backpack",
    "name": "Pink Designer Backpack",
    "category": "petwear",
    "value": 393.5761,
    "demand": 1,
    "image": "images/petwear/pink-designer-backpack.webp"
  },
  {
    "id": "strollers-crystal-ball-stroller",
    "name": "Crystal Ball Stroller",
    "category": "strollers",
    "value": 135.1377,
    "demand": 1,
    "image": "images/strollers/crystal-ball-stroller.webp"
  },
  {
    "id": "pets-slimingo",
    "name": "Slimingo",
    "category": "pets",
    "value": 615.4818,
    "demand": 1,
    "image": "images/pets/slimingo.webp"
  },
  {
    "id": "petwear-hero-mask",
    "name": "Hero Mask",
    "category": "petwear",
    "value": 646.5874,
    "demand": 1,
    "image": "images/petwear/hero-mask.webp"
  },
  {
    "id": "pets-kirin",
    "name": "Kirin",
    "category": "pets",
    "value": 243.448,
    "demand": 1,
    "image": "images/pets/kirin.webp"
  },
  {
    "id": "pets-eggnog-dog",
    "name": "Eggnog Dog",
    "category": "pets",
    "value": 535.5819,
    "demand": 1,
    "image": "images/pets/eggnog-dog.webp"
  },
  {
    "id": "pets-zombie-wolf",
    "name": "Zombie Wolf",
    "category": "pets",
    "value": 762.7972,
    "demand": 2,
    "image": "images/pets/zombie-wolf.webp"
  },
  {
    "id": "pets-clubtail-dragonfly",
    "name": "Clubtail Dragonfly",
    "category": "pets",
    "value": 94.8841,
    "demand": 1,
    "image": "images/pets/clubtail-dragonfly.webp"
  },
  {
    "id": "pets-canadian-goose",
    "name": "Canadian Goose",
    "category": "pets",
    "value": 583.0225,
    "demand": 1,
    "image": "images/pets/canadian-goose.webp"
  },
  {
    "id": "stickers-sasquatch-sticker",
    "name": "Sasquatch Sticker",
    "category": "stickers",
    "value": 453.7053,
    "demand": 1,
    "image": "images/stickers/sasquatch-sticker.webp"
  },
  {
    "id": "pets-ruddy-duck",
    "name": "Ruddy Duck",
    "category": "pets",
    "value": 81.1513,
    "demand": 1,
    "image": "images/pets/ruddy-duck.webp"
  },
  {
    "id": "vehicles-giant-snowball",
    "name": "Giant Snowball",
    "category": "vehicles",
    "value": 340.1035,
    "demand": 1,
    "image": "images/vehicles/giant-snowball.webp"
  },
  {
    "id": "strollers-snow-mobile-stroller",
    "name": "Snow Mobile Stroller",
    "category": "strollers",
    "value": 27.0299,
    "demand": 1,
    "image": "images/strollers/snow-mobile-stroller.webp"
  },
  {
    "id": "pets-diamond-ladybug",
    "name": "Diamond Ladybug",
    "category": "pets",
    "value": 765.2941,
    "demand": 2,
    "image": "images/pets/diamond-ladybug.webp"
  },
  {
    "id": "pets-binturong",
    "name": "Binturong",
    "category": "pets",
    "value": 687.8911,
    "demand": 2,
    "image": "images/pets/binturong.webp"
  },
  {
    "id": "pets-purrowl",
    "name": "Purrowl",
    "category": "pets",
    "value": 254.6839,
    "demand": 1,
    "image": "images/pets/purrowl.webp"
  },
  {
    "id": "toys-sour-glider",
    "name": "Sour Glider",
    "category": "toys",
    "value": 227.5885,
    "demand": 1,
    "image": "images/toys/sour-glider.webp"
  },
  {
    "id": "pets-mummy-spider",
    "name": "Mummy Spider",
    "category": "pets",
    "value": 102.3747,
    "demand": 1,
    "image": "images/pets/mummy-spider.webp"
  },
  {
    "id": "stickers-cow-sticker",
    "name": "Cow Sticker",
    "category": "stickers",
    "value": 657.4084,
    "demand": 1,
    "image": "images/stickers/cow-sticker.webp"
  },
  {
    "id": "pets-fire-foal",
    "name": "Fire Foal",
    "category": "pets",
    "value": 19.978,
    "demand": 1,
    "image": "images/pets/fire-foal.webp"
  },
  {
    "id": "gifts-oakee-box",
    "name": "Oakee Box",
    "category": "gifts",
    "value": 24.3932,
    "demand": 1,
    "image": "images/gifts/oakee-box.webp"
  },
  {
    "id": "pets-violet-friend",
    "name": "Violet Friend",
    "category": "pets",
    "value": 33.7108,
    "demand": 1,
    "image": "images/pets/violet-friend.webp"
  },
  {
    "id": "pets-white-amazon",
    "name": "White Amazon",
    "category": "pets",
    "value": 682.8973,
    "demand": 2,
    "image": "images/pets/white-amazon.webp"
  },
  {
    "id": "pets-blue-butterfly",
    "name": "Blue Butterfly",
    "category": "pets",
    "value": 98.6294,
    "demand": 1,
    "image": "images/pets/blue-butterfly.webp"
  },
  {
    "id": "pets-priceless-shrimp",
    "name": "Priceless Shrimp",
    "category": "pets",
    "value": 536.8304,
    "demand": 1,
    "image": "images/pets/priceless-shrimp.webp"
  },
  {
    "id": "pets-husky",
    "name": "Husky",
    "category": "pets",
    "value": 800.2503,
    "demand": 2,
    "image": "images/pets/husky.webp"
  },
  {
    "id": "pets-emu",
    "name": "Emu",
    "category": "pets",
    "value": 377.0306,
    "demand": 1,
    "image": "images/pets/emu.webp"
  },
  {
    "id": "pets-pretty-pony",
    "name": "Pretty Pony",
    "category": "pets",
    "value": 666.6677,
    "demand": 2,
    "image": "images/pets/pretty-pony.webp"
  },
  {
    "id": "pets-tio-de-nadal",
    "name": "Tio De Nadal",
    "category": "pets",
    "value": 942.572,
    "demand": 2,
    "image": "images/pets/tio-de-nadal.webp"
  },
  {
    "id": "pets-summer-walrus",
    "name": "Summer Walrus",
    "category": "pets",
    "value": 501.8742,
    "demand": 1,
    "image": "images/pets/summer-walrus.webp"
  },
  {
    "id": "pets-pine-marten",
    "name": "Pine Marten",
    "category": "pets",
    "value": 450.6883,
    "demand": 1,
    "image": "images/pets/pine-marten.webp"
  },
  {
    "id": "petwear-top-hat",
    "name": "Top Hat",
    "category": "petwear",
    "value": 321.2872,
    "demand": 1,
    "image": "images/petwear/top-hat.webp"
  },
  {
    "id": "vehicles-snow-snowboard",
    "name": "Snow Snowboard",
    "category": "vehicles",
    "value": 969.5432,
    "demand": 1,
    "image": "images/vehicles/snow-snowboard.webp"
  },
  {
    "id": "vehicles-galleon",
    "name": "Galleon",
    "category": "vehicles",
    "value": 55.8404,
    "demand": 1,
    "image": "images/vehicles/galleon.webp"
  },
  {
    "id": "pets-giant-gold-scarab",
    "name": "Giant Gold Scarab",
    "category": "pets",
    "value": 863.9205,
    "demand": 2,
    "image": "images/pets/giant-gold-scarab.webp"
  },
  {
    "id": "toys-homeing-rocket",
    "name": "Homeing Rocket",
    "category": "toys",
    "value": 806.8971,
    "demand": 1,
    "image": "images/toys/homeing-rocket.webp"
  },
  {
    "id": "toys-aestus-kite",
    "name": "Aestus Kite",
    "category": "toys",
    "value": 6.8995,
    "demand": 1,
    "image": "images/toys/aestus-kite.webp"
  },
  {
    "id": "pets-scarlet-butterfly",
    "name": "Scarlet Butterfly",
    "category": "pets",
    "value": 500.6257,
    "demand": 1,
    "image": "images/pets/scarlet-butterfly.webp"
  },
  {
    "id": "eggs-wrapped-doll",
    "name": "Wrapped Doll",
    "category": "eggs",
    "value": 666.6677,
    "demand": 1,
    "image": "images/eggs/wrapped-doll.webp"
  },
  {
    "id": "petwear-steampunk-clock-hat",
    "name": "Steampunk Clock Hat",
    "category": "petwear",
    "value": 654.6195,
    "demand": 1,
    "image": "images/petwear/steampunk-clock-hat.webp"
  },
  {
    "id": "pets-ice-cream-hermit-crab",
    "name": "Ice Cream Hermit Crab",
    "category": "pets",
    "value": 812.7346,
    "demand": 2,
    "image": "images/pets/ice-cream-hermit-crab.webp"
  },
  {
    "id": "pets-christmas-pudding-pup",
    "name": "Christmas Pudding Pup",
    "category": "pets",
    "value": 892.6345,
    "demand": 2,
    "image": "images/pets/christmas-pudding-pup.webp"
  },
  {
    "id": "pets-king-penguin",
    "name": "King Penguin",
    "category": "pets",
    "value": 355.8072,
    "demand": 1,
    "image": "images/pets/king-penguin.webp"
  },
  {
    "id": "strollers-balloon-stroller",
    "name": "Balloon Stroller",
    "category": "strollers",
    "value": 648.6497,
    "demand": 1,
    "image": "images/strollers/balloon-stroller.webp"
  },
  {
    "id": "pets-bee",
    "name": "Bee",
    "category": "pets",
    "value": 273.4104,
    "demand": 1,
    "image": "images/pets/bee.webp"
  },
  {
    "id": "stickers-coconut-friend-sticker",
    "name": "Coconut Friend Sticker",
    "category": "stickers",
    "value": 296.2984,
    "demand": 1,
    "image": "images/stickers/coconut-friend-sticker.webp"
  },
  {
    "id": "pets-blue-cat",
    "name": "Blue Cat",
    "category": "pets",
    "value": 114.8591,
    "demand": 1,
    "image": "images/pets/blue-cat.webp"
  },
  {
    "id": "toys-panda-pal",
    "name": "Panda Pal",
    "category": "toys",
    "value": 889.6555,
    "demand": 2,
    "image": "images/toys/panda-pal.webp"
  },
  {
    "id": "gifts-pet-handler-pro-certificate",
    "name": "Pet Handler Pro Certificate",
    "category": "gifts",
    "value": 878.0491,
    "demand": 3,
    "image": "images/gifts/pet-handler-pro-certificate.webp"
  },
  {
    "id": "stickers-nautilus-sticker",
    "name": "Nautilus Sticker",
    "category": "stickers",
    "value": 351.8538,
    "demand": 1,
    "image": "images/stickers/nautilus-sticker.webp"
  },
  {
    "id": "eggs-ocean-egg",
    "name": "Ocean Egg",
    "category": "eggs",
    "value": 547.6204,
    "demand": 2,
    "image": "images/eggs/ocean-egg.webp"
  },
  {
    "id": "pets-karate-gorilla",
    "name": "Karate Gorilla",
    "category": "pets",
    "value": 652.9349,
    "demand": 2,
    "image": "images/pets/karate-gorilla.webp"
  },
  {
    "id": "pets-ant",
    "name": "Ant",
    "category": "pets",
    "value": 17.4811,
    "demand": 1,
    "image": "images/pets/ant.webp"
  },
  {
    "id": "petwear-pterodactyl-wings",
    "name": "Pterodactyl Wings",
    "category": "petwear",
    "value": 582.3306,
    "demand": 1,
    "image": "images/petwear/pterodactyl-wings.webp"
  },
  {
    "id": "vehicles-inspector-sherbet-bus",
    "name": "Inspector Sherbet Bus",
    "category": "vehicles",
    "value": 253.8093,
    "demand": 1,
    "image": "images/vehicles/inspector-sherbet-bus.webp"
  },
  {
    "id": "petwear-chef-hat",
    "name": "Chef Hat",
    "category": "petwear",
    "value": 771.085,
    "demand": 2,
    "image": "images/petwear/chef-hat.webp"
  },
  {
    "id": "vehicles-blue-scooter",
    "name": "Blue Scooter",
    "category": "vehicles",
    "value": 573.6053,
    "demand": 1,
    "image": "images/vehicles/blue-scooter.webp"
  },
  {
    "id": "strollers-double-stroller",
    "name": "Double Stroller",
    "category": "strollers",
    "value": 54.0569,
    "demand": 1,
    "image": "images/strollers/double-stroller.webp"
  },
  {
    "id": "pets-kookaburra",
    "name": "Kookaburra",
    "category": "pets",
    "value": 825.219,
    "demand": 2,
    "image": "images/pets/kookaburra.webp"
  },
  {
    "id": "pets-wood-pigeon",
    "name": "Wood Pigeon",
    "category": "pets",
    "value": 802.7472,
    "demand": 2,
    "image": "images/pets/wood-pigeon.webp"
  },
  {
    "id": "pets-oakee-knight",
    "name": "Oakee Knight",
    "category": "pets",
    "value": 78.6544,
    "demand": 1,
    "image": "images/pets/oakee-knight.webp"
  },
  {
    "id": "petwear-halo",
    "name": "Halo",
    "category": "petwear",
    "value": 959.8395,
    "demand": 3,
    "image": "images/petwear/halo.webp"
  },
  {
    "id": "toys-starpower-wand",
    "name": "Starpower Wand",
    "category": "toys",
    "value": 544.829,
    "demand": 1,
    "image": "images/toys/starpower-wand.webp"
  },
  {
    "id": "stickers-hamster-selfie-sticker",
    "name": "Hamster Selfie Sticker",
    "category": "stickers",
    "value": 777.7784,
    "demand": 2,
    "image": "images/stickers/hamster-selfie-sticker.webp"
  },
  {
    "id": "pets-2022-uplift-butterfly",
    "name": "2022 Uplift Butterfly",
    "category": "pets",
    "value": 347.0681,
    "demand": 1,
    "image": "images/pets/2022-uplift-butterfly.webp"
  },
  {
    "id": "pets-green-amazon",
    "name": "Green Amazon",
    "category": "pets",
    "value": 367.0431,
    "demand": 1,
    "image": "images/pets/green-amazon.webp"
  },
  {
    "id": "vehicles-beach-buggy",
    "name": "Beach Buggy",
    "category": "vehicles",
    "value": 147.2107,
    "demand": 1,
    "image": "images/vehicles/beach-buggy.webp"
  },
  {
    "id": "eggs-fairytale-egg",
    "name": "Fairytale Egg",
    "category": "eggs",
    "value": 142.8597,
    "demand": 1,
    "image": "images/eggs/fairytale-egg.webp"
  },
  {
    "id": "vehicles-glyptodon-van",
    "name": "Glyptodon Van",
    "category": "vehicles",
    "value": 0.003,
    "demand": 1,
    "image": "images/vehicles/glyptodon-van.webp"
  },
  {
    "id": "pets-bobageist",
    "name": "Bobageist",
    "category": "pets",
    "value": 137.3309,
    "demand": 1,
    "image": "images/pets/bobageist.webp"
  },
  {
    "id": "pets-tegu",
    "name": "Tegu",
    "category": "pets",
    "value": 43.6982,
    "demand": 1,
    "image": "images/pets/tegu.webp"
  },
  {
    "id": "petwear-rain-hat",
    "name": "Rain Hat",
    "category": "petwear",
    "value": 337.3514,
    "demand": 2,
    "image": "images/petwear/rain-hat.webp"
  },
  {
    "id": "pets-scarecrow-horse",
    "name": "Scarecrow Horse",
    "category": "pets",
    "value": 284.6463,
    "demand": 1,
    "image": "images/pets/scarecrow-horse.webp"
  },
  {
    "id": "stickers-orange-butterfly-sticker",
    "name": "Orange Butterfly Sticker",
    "category": "stickers",
    "value": 546.2977,
    "demand": 1,
    "image": "images/stickers/orange-butterfly-sticker.webp"
  },
  {
    "id": "toys-ornament-throw-toy",
    "name": "Ornament Throw Toy",
    "category": "toys",
    "value": 179.3128,
    "demand": 1,
    "image": "images/toys/ornament-throw-toy.webp"
  },
  {
    "id": "toys-tea-party-chair",
    "name": "Tea Party Chair",
    "category": "toys",
    "value": 917.2416,
    "demand": 2,
    "image": "images/toys/tea-party-chair.webp"
  },
  {
    "id": "pets-bison",
    "name": "Bison",
    "category": "pets",
    "value": 66.1701,
    "demand": 1,
    "image": "images/pets/bison.webp"
  },
  {
    "id": "petwear-lightbulb-hat",
    "name": "Lightbulb Hat",
    "category": "petwear",
    "value": 570.2824,
    "demand": 1,
    "image": "images/petwear/lightbulb-hat.webp"
  },
  {
    "id": "vehicles-ketchup-and-mustard-jetpack",
    "name": "Ketchup and Mustard Jetpack",
    "category": "vehicles",
    "value": 776.6504,
    "demand": 2,
    "image": "images/vehicles/ketchup-and-mustard-jetpack.webp"
  },
  {
    "id": "toys-magic-house-door",
    "name": "Magic House Door",
    "category": "toys",
    "value": 779.311,
    "demand": 2,
    "image": "images/toys/magic-house-door.webp"
  },
  {
    "id": "pets-sasquatch",
    "name": "Sasquatch",
    "category": "pets",
    "value": 385.7696,
    "demand": 1,
    "image": "images/pets/sasquatch.webp"
  },
  {
    "id": "vehicles-candy-camper",
    "name": "Candy Camper",
    "category": "vehicles",
    "value": 25.3836,
    "demand": 1,
    "image": "images/vehicles/candy-camper.webp"
  },
  {
    "id": "pets-hero-gibbon",
    "name": "Hero Gibbon",
    "category": "pets",
    "value": 851.4362,
    "demand": 2,
    "image": "images/pets/hero-gibbon.webp"
  },
  {
    "id": "pets-chestnut-glyptodon",
    "name": "Chestnut Glyptodon",
    "category": "pets",
    "value": 79.9029,
    "demand": 1,
    "image": "images/pets/chestnut-glyptodon.webp"
  },
  {
    "id": "pets-irish-setter",
    "name": "Irish Setter",
    "category": "pets",
    "value": 91.1388,
    "demand": 1,
    "image": "images/pets/irish-setter.webp"
  },
  {
    "id": "vehicles-lava-racer",
    "name": "Lava Racer",
    "category": "vehicles",
    "value": 446.7022,
    "demand": 1,
    "image": "images/vehicles/lava-racer.webp"
  },
  {
    "id": "pets-groundhog",
    "name": "Groundhog",
    "category": "pets",
    "value": 876.4049,
    "demand": 2,
    "image": "images/pets/groundhog.webp"
  },
  {
    "id": "pets-angler-fish",
    "name": "Angler Fish",
    "category": "pets",
    "value": 152.3122,
    "demand": 1,
    "image": "images/pets/angler-fish.webp"
  },
  {
    "id": "stickers-jimothy",
    "name": "Jimothy",
    "category": "stickers",
    "value": 435.1869,
    "demand": 1,
    "image": "images/stickers/jimothy.webp"
  },
  {
    "id": "pets-burger-bear",
    "name": "Burger Bear",
    "category": "pets",
    "value": 630.463,
    "demand": 2,
    "image": "images/pets/burger-bear.webp"
  },
  {
    "id": "pets-liger",
    "name": "Liger",
    "category": "pets",
    "value": 302.1244,
    "demand": 1,
    "image": "images/pets/liger.webp"
  },
  {
    "id": "pets-swordfish",
    "name": "Swordfish",
    "category": "pets",
    "value": 123.5981,
    "demand": 1,
    "image": "images/pets/swordfish.webp"
  },
  {
    "id": "pets-blue-jay",
    "name": "Blue Jay",
    "category": "pets",
    "value": 320.851,
    "demand": 1,
    "image": "images/pets/blue-jay.webp"
  },
  {
    "id": "pets-leviathan",
    "name": "Leviathan",
    "category": "pets",
    "value": 817.7284,
    "demand": 2,
    "image": "images/pets/leviathan.webp"
  },
  {
    "id": "pets-tawny-frogmouth",
    "name": "Tawny Frogmouth",
    "category": "pets",
    "value": 193.5105,
    "demand": 1,
    "image": "images/pets/tawny-frogmouth.webp"
  },
  {
    "id": "pets-white-sand-dollar",
    "name": "White Sand Dollar",
    "category": "pets",
    "value": 729.0895,
    "demand": 2,
    "image": "images/pets/white-sand-dollar.webp"
  },
  {
    "id": "petwear-knitted-pumpkin-hat",
    "name": "Knitted Pumpkin Hat",
    "category": "petwear",
    "value": 76.308,
    "demand": 1,
    "image": "images/petwear/knitted-pumpkin-hat.webp"
  },
  {
    "id": "stickers-wailing-mr-whiskerpips-sticker",
    "name": "Wailing Mr. Whiskerpips Sticker",
    "category": "stickers",
    "value": 750.0008,
    "demand": 1,
    "image": "images/stickers/wailing-mr-whiskerpips-sticker.webp"
  },
  {
    "id": "pets-llama",
    "name": "Llama",
    "category": "pets",
    "value": 801.4987,
    "demand": 2,
    "image": "images/pets/llama.webp"
  },
  {
    "id": "petwear-corndog-mustache",
    "name": "Corndog Mustache",
    "category": "petwear",
    "value": 377.5119,
    "demand": 1,
    "image": "images/petwear/corndog-mustache.webp"
  },
  {
    "id": "pets-irish-water-spaniel",
    "name": "Irish Water Spaniel",
    "category": "pets",
    "value": 910.1126,
    "demand": 2,
    "image": "images/pets/irish-water-spaniel.webp"
  },
  {
    "id": "pets-horse",
    "name": "Horse",
    "category": "pets",
    "value": 574.2834,
    "demand": 2,
    "image": "images/pets/horse.webp"
  },
  {
    "id": "pets-golden-chowchow",
    "name": "Golden Chow-Chow",
    "category": "pets",
    "value": 795.2565,
    "demand": 2,
    "image": "images/pets/golden-chow-chow.webp"
  },
  {
    "id": "petwear-bunch-of-balloons",
    "name": "Bunch Of Balloons",
    "category": "petwear",
    "value": 4.0191,
    "demand": 1,
    "image": "images/petwear/bunch-of-balloons.webp"
  },
  {
    "id": "petwear-toaster-hat",
    "name": "Toaster Hat",
    "category": "petwear",
    "value": 911.6469,
    "demand": 3,
    "image": "images/petwear/toaster-hat.webp"
  },
  {
    "id": "eggs-basic-egg",
    "name": "Basic Egg",
    "category": "eggs",
    "value": 23.8125,
    "demand": 1,
    "image": "images/eggs/basic-egg.webp"
  },
  {
    "id": "vehicles-adopt-me-snowboard-1",
    "name": "Adopt Me Snowboard 1",
    "category": "vehicles",
    "value": 857.8684,
    "demand": 1,
    "image": "images/vehicles/adopt-me-snowboard-1.webp"
  },
  {
    "id": "pets-prism-snake",
    "name": "Prism Snake",
    "category": "pets",
    "value": 443.1977,
    "demand": 1,
    "image": "images/pets/prism-snake.webp"
  },
  {
    "id": "pets-penguin",
    "name": "Penguin",
    "category": "pets",
    "value": 390.7634,
    "demand": 1,
    "image": "images/pets/penguin.webp"
  },
  {
    "id": "strollers-flower-stroller",
    "name": "Flower Stroller",
    "category": "strollers",
    "value": 729.7305,
    "demand": 1,
    "image": "images/strollers/flower-stroller.webp"
  },
  {
    "id": "pets-komodo-dragon",
    "name": "Komodo Dragon",
    "category": "pets",
    "value": 493.1351,
    "demand": 1,
    "image": "images/pets/komodo-dragon.webp"
  },
  {
    "id": "petwear-pink-heart-glasses",
    "name": "Pink Heart Glasses",
    "category": "petwear",
    "value": 787.1492,
    "demand": 2,
    "image": "images/petwear/pink-heart-glasses.webp"
  },
  {
    "id": "eggs-pink-egg",
    "name": "Pink Egg",
    "category": "eggs",
    "value": 928.5716,
    "demand": 2,
    "image": "images/eggs/pink-egg.webp"
  },
  {
    "id": "pets-guardian-lion",
    "name": "Guardian Lion",
    "category": "pets",
    "value": 691.6364,
    "demand": 2,
    "image": "images/pets/guardian-lion.webp"
  },
  {
    "id": "strollers-cannon-stroller",
    "name": "Cannon Stroller",
    "category": "strollers",
    "value": 716.2171,
    "demand": 1,
    "image": "images/strollers/cannon-stroller.webp"
  },
  {
    "id": "vehicles-crabby-cruiser",
    "name": "Crabby Cruiser",
    "category": "vehicles",
    "value": 583.7576,
    "demand": 1,
    "image": "images/vehicles/crabby-cruiser.webp"
  },
  {
    "id": "food-teleportation-potion",
    "name": "Teleportation Potion",
    "category": "food",
    "value": 720.0008,
    "demand": 1,
    "image": "images/food/teleportation-potion.webp"
  },
  {
    "id": "stickers-cherry-blossom-tree-sticker",
    "name": "Cherry Blossom Tree Sticker",
    "category": "stickers",
    "value": 0.003,
    "demand": 1,
    "image": "images/stickers/cherry-blossom-tree-sticker.webp"
  },
  {
    "id": "stickers-ginger-cat-sticker",
    "name": "Ginger Cat Sticker",
    "category": "stickers",
    "value": 490.7423,
    "demand": 1,
    "image": "images/stickers/ginger-cat-sticker.webp"
  },
  {
    "id": "vehicles-wizard-caravan",
    "name": "Wizard Caravan",
    "category": "vehicles",
    "value": 263.9616,
    "demand": 1,
    "image": "images/vehicles/wizard-caravan.webp"
  },
  {
    "id": "petwear-growing-flower-hat",
    "name": "Growing Flower Hat",
    "category": "petwear",
    "value": 100.4043,
    "demand": 1,
    "image": "images/petwear/growing-flower-hat.webp"
  },
  {
    "id": "food-stars-egg",
    "name": "Stars Egg",
    "category": "food",
    "value": 160.0025,
    "demand": 1,
    "image": "images/food/stars-egg.webp"
  },
  {
    "id": "toys-heart-rattle",
    "name": "Heart Rattle",
    "category": "toys",
    "value": 944.8278,
    "demand": 2,
    "image": "images/toys/heart-rattle.webp"
  },
  {
    "id": "pets-velocirooster",
    "name": "Velocirooster",
    "category": "pets",
    "value": 880.1502,
    "demand": 2,
    "image": "images/pets/velocirooster.webp"
  },
  {
    "id": "petwear-galaxy-explorer-helmet",
    "name": "Galaxy Explorer Helmet",
    "category": "petwear",
    "value": 168.6772,
    "demand": 1,
    "image": "images/petwear/galaxy-explorer-helmet.webp"
  },
  {
    "id": "stickers-sledding-penguin-sticker",
    "name": "Sledding Penguin Sticker",
    "category": "stickers",
    "value": 222.2246,
    "demand": 1,
    "image": "images/stickers/sledding-penguin-sticker.webp"
  },
  {
    "id": "petwear-heart-hat",
    "name": "Heart Hat",
    "category": "petwear",
    "value": 232.934,
    "demand": 1,
    "image": "images/petwear/heart-hat.webp"
  },
  {
    "id": "pets-robin",
    "name": "Robin",
    "category": "pets",
    "value": 305.8697,
    "demand": 1,
    "image": "images/pets/robin.webp"
  },
  {
    "id": "pets-arctic-tern",
    "name": "Arctic Tern",
    "category": "pets",
    "value": 275.9073,
    "demand": 1,
    "image": "images/pets/arctic-tern.webp"
  },
  {
    "id": "petwear-waterfall-hat",
    "name": "Waterfall Hat",
    "category": "petwear",
    "value": 550.2022,
    "demand": 1,
    "image": "images/petwear/waterfall-hat.webp"
  },
  {
    "id": "pets-ice-wolf",
    "name": "Ice Wolf",
    "category": "pets",
    "value": 820.2253,
    "demand": 2,
    "image": "images/pets/ice-wolf.webp"
  },
  {
    "id": "pets-parakeet",
    "name": "Parakeet",
    "category": "pets",
    "value": 0.003,
    "demand": 1,
    "image": "images/pets/parakeet.webp"
  },
  {
    "id": "pets-kelp-hunter",
    "name": "Kelp Hunter",
    "category": "pets",
    "value": 424.4711,
    "demand": 1,
    "image": "images/pets/kelp-hunter.webp"
  },
  {
    "id": "pets-orangutan",
    "name": "Orangutan",
    "category": "pets",
    "value": 53.6857,
    "demand": 1,
    "image": "images/pets/orangutan.webp"
  },
  {
    "id": "vehicles-trireme",
    "name": "Trireme",
    "category": "vehicles",
    "value": 65.9926,
    "demand": 1,
    "image": "images/vehicles/trireme.webp"
  },
  {
    "id": "stickers-fossil-sticker-pack",
    "name": "Fossil Sticker Pack",
    "category": "stickers",
    "value": 18.5215,
    "demand": 1,
    "image": "images/stickers/fossil-sticker-pack.webp"
  },
  {
    "id": "pets-monkey-king",
    "name": "Monkey King",
    "category": "pets",
    "value": 962.5469,
    "demand": 2,
    "image": "images/pets/monkey-king.webp"
  },
  {
    "id": "stickers-fire-dimension-sticker-pack",
    "name": "Fire Dimension Sticker Pack",
    "category": "stickers",
    "value": 27.7807,
    "demand": 1,
    "image": "images/stickers/fire-dimension-sticker-pack.webp"
  },
  {
    "id": "food-leaf",
    "name": "Leaf",
    "category": "food",
    "value": 660.001,
    "demand": 2,
    "image": "images/food/leaf.webp"
  },
  {
    "id": "stickers-sunrise-duckling-sticker",
    "name": "Sunrise Duckling Sticker",
    "category": "stickers",
    "value": 185.1876,
    "demand": 1,
    "image": "images/stickers/sunrise-duckling-sticker.webp"
  },
  {
    "id": "pets-irish-elk",
    "name": "Irish Elk",
    "category": "pets",
    "value": 556.8053,
    "demand": 1,
    "image": "images/pets/irish-elk.webp"
  },
  {
    "id": "pets-kappakid",
    "name": "Kappakid",
    "category": "pets",
    "value": 453.1852,
    "demand": 1,
    "image": "images/pets/kappakid.webp"
  },
  {
    "id": "pets-wolf",
    "name": "Wolf",
    "category": "pets",
    "value": 508.1163,
    "demand": 1,
    "image": "images/pets/wolf.webp"
  },
  {
    "id": "pets-coyote",
    "name": "Coyote",
    "category": "pets",
    "value": 435.7071,
    "demand": 1,
    "image": "images/pets/coyote.webp"
  },
  {
    "id": "petwear-elf-hat",
    "name": "Elf Hat",
    "category": "petwear",
    "value": 831.3258,
    "demand": 2,
    "image": "images/petwear/elf-hat.webp"
  },
  {
    "id": "petwear-jade-moth-wings",
    "name": "Jade Moth Wings",
    "category": "petwear",
    "value": 702.8121,
    "demand": 1,
    "image": "images/petwear/jade-moth-wings.webp"
  },
  {
    "id": "stickers-shark-sticker",
    "name": "Shark Sticker",
    "category": "stickers",
    "value": 37.0399,
    "demand": 1,
    "image": "images/stickers/shark-sticker.webp"
  },
  {
    "id": "petwear-respectful-mustache",
    "name": "Respectful Mustache",
    "category": "petwear",
    "value": 682.7319,
    "demand": 2,
    "image": "images/petwear/respectful-mustache.webp"
  },
  {
    "id": "pets-wren",
    "name": "Wren",
    "category": "pets",
    "value": 159.8028,
    "demand": 1,
    "image": "images/pets/wren.webp"
  },
  {
    "id": "pets-papa-moose",
    "name": "Papa Moose",
    "category": "pets",
    "value": 898.8767,
    "demand": 2,
    "image": "images/pets/papa-moose.webp"
  },
  {
    "id": "pets-dark-choccybunny",
    "name": "Dark Choccybunny",
    "category": "pets",
    "value": 269.6651,
    "demand": 1,
    "image": "images/pets/dark-choccybunny.webp"
  },
  {
    "id": "pets-toy-monkey",
    "name": "Toy Monkey",
    "category": "pets",
    "value": 742.8222,
    "demand": 2,
    "image": "images/pets/toy-monkey.webp"
  },
  {
    "id": "stickers-fox-sticker",
    "name": "Fox Sticker",
    "category": "stickers",
    "value": 500.0015,
    "demand": 1,
    "image": "images/stickers/fox-sticker.webp"
  },
  {
    "id": "pets-drake",
    "name": "Drake",
    "category": "pets",
    "value": 707.866,
    "demand": 2,
    "image": "images/pets/drake.webp"
  },
  {
    "id": "pets-black-dog",
    "name": "Black Dog",
    "category": "pets",
    "value": 272.162,
    "demand": 1,
    "image": "images/pets/black-dog.webp"
  },
  {
    "id": "vehicles-monomoped",
    "name": "Mono-Moped",
    "category": "vehicles",
    "value": 878.173,
    "demand": 2,
    "image": "images/vehicles/mono-moped.webp"
  },
  {
    "id": "stickers-spinning-cat-animated-sticker",
    "name": "Spinning Cat Animated Sticker",
    "category": "stickers",
    "value": 1000.0,
    "demand": 2,
    "image": "images/stickers/spinning-cat-animated-sticker.webp"
  },
  {
    "id": "pets-rat",
    "name": "Rat",
    "category": "pets",
    "value": 248.4417,
    "demand": 1,
    "image": "images/pets/rat.webp"
  },
  {
    "id": "vehicles-lavender-teapot-carriage",
    "name": "Lavender Teapot Carriage",
    "category": "vehicles",
    "value": 461.9305,
    "demand": 1,
    "image": "images/vehicles/lavender-teapot-carriage.webp"
  },
  {
    "id": "pets-chickatrice",
    "name": "Chickatrice",
    "category": "pets",
    "value": 327.0932,
    "demand": 1,
    "image": "images/pets/chickatrice.webp"
  },
  {
    "id": "gifts-easter-eggy-box",
    "name": "Easter Eggy Box",
    "category": "gifts",
    "value": 512.1966,
    "demand": 1,
    "image": "images/gifts/easter-eggy-box.webp"
  },
  {
    "id": "pets-magpie",
    "name": "Magpie",
    "category": "pets",
    "value": 51.1889,
    "demand": 1,
    "image": "images/pets/magpie.webp"
  },
  {
    "id": "pets-mochi-meow",
    "name": "Mochi Meow",
    "category": "pets",
    "value": 288.3916,
    "demand": 1,
    "image": "images/pets/mochi-meow.webp"
  },
  {
    "id": "pets-gibbon",
    "name": "Gibbon",
    "category": "pets",
    "value": 161.0512,
    "demand": 1,
    "image": "images/pets/gibbon.webp"
  },
  {
    "id": "pets-ocelot",
    "name": "Ocelot",
    "category": "pets",
    "value": 83.6482,
    "demand": 1,
    "image": "images/pets/ocelot.webp"
  },
  {
    "id": "vehicles-cupcake-scooter",
    "name": "Cupcake Scooter",
    "category": "vehicles",
    "value": 736.0414,
    "demand": 1,
    "image": "images/vehicles/cupcake-scooter.webp"
  },
  {
    "id": "strollers-hover-stroller",
    "name": "Hover Stroller",
    "category": "strollers",
    "value": 270.2725,
    "demand": 1,
    "image": "images/strollers/hover-stroller.webp"
  },
  {
    "id": "pets-jester-dragon",
    "name": "Jester Dragon",
    "category": "pets",
    "value": 867.6658,
    "demand": 2,
    "image": "images/pets/jester-dragon.webp"
  },
  {
    "id": "pets-salamander",
    "name": "Salamander",
    "category": "pets",
    "value": 449.4399,
    "demand": 1,
    "image": "images/pets/salamander.webp"
  },
  {
    "id": "gifts-golden-mistletoe",
    "name": "Golden Mistletoe",
    "category": "gifts",
    "value": 926.8295,
    "demand": 2,
    "image": "images/gifts/golden-mistletoe.webp"
  },
  {
    "id": "stickers-pig-sticker",
    "name": "Pig Sticker",
    "category": "stickers",
    "value": 444.4461,
    "demand": 1,
    "image": "images/stickers/pig-sticker.webp"
  },
  {
    "id": "petwear-snow-cloud-wings",
    "name": "Snow Cloud Wings",
    "category": "petwear",
    "value": 56.2277,
    "demand": 1,
    "image": "images/petwear/snow-cloud-wings.webp"
  },
  {
    "id": "pets-glyptodon-ducky",
    "name": "Glyptodon Ducky",
    "category": "pets",
    "value": 72.4123,
    "demand": 1,
    "image": "images/pets/glyptodon-ducky.webp"
  },
  {
    "id": "petwear-bat-backpack",
    "name": "Bat Backpack",
    "category": "petwear",
    "value": 606.4269,
    "demand": 1,
    "image": "images/petwear/bat-backpack.webp"
  },
  {
    "id": "pets-mechapup",
    "name": "Mechapup",
    "category": "pets",
    "value": 918.8517,
    "demand": 2,
    "image": "images/pets/mechapup.webp"
  },
  {
    "id": "pets-orange-betta-fish",
    "name": "Orange Betta Fish",
    "category": "pets",
    "value": 240.9511,
    "demand": 1,
    "image": "images/pets/orange-betta-fish.webp"
  },
  {
    "id": "vehicles-green-snowboard",
    "name": "Green Neon Snowboard",
    "category": "vehicles",
    "value": 913.7058,
    "demand": 2,
    "image": "images/vehicles/green-neon-snowboard.webp"
  },
  {
    "id": "stickers-candicorn-sticker",
    "name": "Candicorn Sticker",
    "category": "stickers",
    "value": 333.3353,
    "demand": 1,
    "image": "images/stickers/candicorn-sticker.webp"
  },
  {
    "id": "petwear-ice-cream-cone-hat",
    "name": "Ice Cream Cone Hat",
    "category": "petwear",
    "value": 903.6147,
    "demand": 2,
    "image": "images/petwear/ice-cream-cone-hat.webp"
  },
  {
    "id": "toys-stygian-hang-glider",
    "name": "Stygian Hang Glider",
    "category": "toys",
    "value": 206.8989,
    "demand": 1,
    "image": "images/toys/stygian-hang-glider.webp"
  },
  {
    "id": "pets-rooster",
    "name": "Rooster",
    "category": "pets",
    "value": 520.6007,
    "demand": 1,
    "image": "images/pets/rooster.webp"
  },
  {
    "id": "petwear-founders-crown",
    "name": "Founder's Crown",
    "category": "petwear",
    "value": 80.324,
    "demand": 1,
    "image": "images/petwear/founder-s-crown.webp"
  },
  {
    "id": "pets-striped-eggy",
    "name": "Striped Eggy",
    "category": "pets",
    "value": 548.0663,
    "demand": 1,
    "image": "images/pets/striped-eggy.webp"
  },
  {
    "id": "pets-bali-starling",
    "name": "Bali Starling",
    "category": "pets",
    "value": 153.5606,
    "demand": 1,
    "image": "images/pets/bali-starling.webp"
  },
  {
    "id": "pets-naughty-mistletroll",
    "name": "Naughty Mistletroll",
    "category": "pets",
    "value": 803.9956,
    "demand": 2,
    "image": "images/pets/naughty-mistletroll.webp"
  },
  {
    "id": "toys-christmas-doge-rattle",
    "name": "Christmas Doge Rattle",
    "category": "toys",
    "value": 475.8636,
    "demand": 1,
    "image": "images/toys/christmas-doge-rattle.webp"
  },
  {
    "id": "food-baked-alaska-bait",
    "name": "Baked Alaska Bait",
    "category": "food",
    "value": 620.0011,
    "demand": 2,
    "image": "images/food/baked-alaska-bait.webp"
  },
  {
    "id": "vehicles-firework-cycle",
    "name": "Firework Cycle",
    "category": "vehicles",
    "value": 467.0067,
    "demand": 1,
    "image": "images/vehicles/firework-cycle.webp"
  },
  {
    "id": "toys-festive-bells-balloon",
    "name": "Festive Bells Balloon",
    "category": "toys",
    "value": 248.2781,
    "demand": 1,
    "image": "images/toys/festive-bells-balloon.webp"
  },
  {
    "id": "pets-basilisk",
    "name": "Basilisk",
    "category": "pets",
    "value": 445.6945,
    "demand": 1,
    "image": "images/pets/basilisk.webp"
  },
  {
    "id": "pets-oakee-wizard",
    "name": "Oakee Wizard",
    "category": "pets",
    "value": 268.4167,
    "demand": 1,
    "image": "images/pets/oakee-wizard.webp"
  },
  {
    "id": "pets-stingray",
    "name": "Stingray",
    "category": "pets",
    "value": 147.3184,
    "demand": 1,
    "image": "images/pets/stingray.webp"
  },
  {
    "id": "vehicles-tundra-exploration-machine",
    "name": "Tundra Exploration Machine",
    "category": "vehicles",
    "value": 81.221,
    "demand": 1,
    "image": "images/vehicles/tundra-exploration-machine.webp"
  },
  {
    "id": "strollers-rainbow-stroller",
    "name": "Rainbow Stroller",
    "category": "strollers",
    "value": 824.3249,
    "demand": 1,
    "image": "images/strollers/rainbow-stroller.webp"
  },
  {
    "id": "toys-glider",
    "name": "Glider",
    "category": "toys",
    "value": 910.3451,
    "demand": 2,
    "image": "images/toys/glider.webp"
  },
  {
    "id": "petwear-giraffe-hat",
    "name": "Giraffe Hat",
    "category": "petwear",
    "value": 967.8716,
    "demand": 2,
    "image": "images/petwear/giraffe-hat.webp"
  },
  {
    "id": "pets-kelp-captain",
    "name": "Kelp Captain",
    "category": "pets",
    "value": 734.0832,
    "demand": 1,
    "image": "images/pets/kelp-captain.webp"
  },
  {
    "id": "pets-evil-basilisk",
    "name": "Evil Basilisk",
    "category": "pets",
    "value": 546.8178,
    "demand": 1,
    "image": "images/pets/evil-basilisk.webp"
  },
  {
    "id": "toys-sock-chew-toy",
    "name": "Sock Chew Toy",
    "category": "toys",
    "value": 117.244,
    "demand": 1,
    "image": "images/toys/sock-chew-toy.webp"
  },
  {
    "id": "pets-mirai-moth",
    "name": "Mirai Moth",
    "category": "pets",
    "value": 518.1038,
    "demand": 1,
    "image": "images/pets/mirai-moth.webp"
  },
  {
    "id": "toys-elf-plush",
    "name": "Elf Plush",
    "category": "toys",
    "value": 165.5197,
    "demand": 1,
    "image": "images/toys/elf-plush.webp"
  },
  {
    "id": "pets-floral-eggy",
    "name": "Floral Eggy",
    "category": "pets",
    "value": 280.901,
    "demand": 1,
    "image": "images/pets/floral-eggy.webp"
  },
  {
    "id": "eggs-cracked-egg",
    "name": "Cracked Egg",
    "category": "eggs",
    "value": 0.003,
    "demand": 1,
    "image": "images/eggs/cracked-egg.webp"
  },
  {
    "id": "petwear-heart-bow",
    "name": "Heart Bow",
    "category": "petwear",
    "value": 313.2551,
    "demand": 2,
    "image": "images/petwear/heart-bow.webp"
  },
  {
    "id": "gifts-admin-abuse-box",
    "name": "Admin Abuse Box",
    "category": "gifts",
    "value": 121.9539,
    "demand": 1,
    "image": "images/gifts/admin-abuse-box.webp"
  },
  {
    "id": "pets-arctic-hare",
    "name": "Arctic Hare",
    "category": "pets",
    "value": 255.9323,
    "demand": 1,
    "image": "images/pets/arctic-hare.webp"
  },
  {
    "id": "pets-ermine",
    "name": "Ermine",
    "category": "pets",
    "value": 403.2477,
    "demand": 1,
    "image": "images/pets/ermine.webp"
  },
  {
    "id": "pets-zodiac-minion-chick",
    "name": "Zodiac Minion Chick",
    "category": "pets",
    "value": 478.1539,
    "demand": 1,
    "image": "images/pets/zodiac-minion-chick.webp"
  },
  {
    "id": "pets-ankylosaurus",
    "name": "Ankylosaurus",
    "category": "pets",
    "value": 400.7509,
    "demand": 1,
    "image": "images/pets/ankylosaurus.webp"
  },
  {
    "id": "pets-silly-duck",
    "name": "Silly Duck",
    "category": "pets",
    "value": 776.53,
    "demand": 2,
    "image": "images/pets/silly-duck.webp"
  },
  {
    "id": "pets-strawberry-tortle",
    "name": "Strawberry Tortle",
    "category": "pets",
    "value": 957.5532,
    "demand": 2,
    "image": "images/pets/strawberry-tortle.webp"
  },
  {
    "id": "pets-unicorn-ducky",
    "name": "Unicorn Ducky",
    "category": "pets",
    "value": 71.1638,
    "demand": 1,
    "image": "images/pets/unicorn-ducky.webp"
  },
  {
    "id": "petwear-summer-straw-hat",
    "name": "Summer Straw Hat",
    "category": "petwear",
    "value": 429.7206,
    "demand": 1,
    "image": "images/petwear/summer-straw-hat.webp"
  },
  {
    "id": "strollers-strawberry-stroller",
    "name": "Strawberry Stroller",
    "category": "strollers",
    "value": 635.1362,
    "demand": 1,
    "image": "images/strollers/strawberry-stroller.webp"
  },
  {
    "id": "pets-caterpillar",
    "name": "Caterpillar",
    "category": "pets",
    "value": 931.336,
    "demand": 3,
    "image": "images/pets/caterpillar.webp"
  },
  {
    "id": "pets-halloween-white-ghost-dragon",
    "name": "Halloween White Ghost Dragon",
    "category": "pets",
    "value": 846.4424,
    "demand": 2,
    "image": "images/pets/halloween-white-ghost-dragon.webp"
  },
  {
    "id": "strollers-stocking-stroller",
    "name": "Stocking Stroller",
    "category": "strollers",
    "value": 162.1647,
    "demand": 1,
    "image": "images/strollers/stocking-stroller.webp"
  },
  {
    "id": "vehicles-shadow-dragon-skateboard",
    "name": "Shadow Dragon Skateboard",
    "category": "vehicles",
    "value": 375.6364,
    "demand": 1,
    "image": "images/vehicles/shadow-dragon-skateboard.webp"
  },
  {
    "id": "pets-pangolin",
    "name": "Pangolin",
    "category": "pets",
    "value": 121.1013,
    "demand": 1,
    "image": "images/pets/pangolin.webp"
  },
  {
    "id": "toys-whoopee-cushion",
    "name": "Whoopee Cushion",
    "category": "toys",
    "value": 634.4839,
    "demand": 1,
    "image": "images/toys/whoopee-cushion.webp"
  },
  {
    "id": "eggs-jungle-egg",
    "name": "Jungle Egg",
    "category": "eggs",
    "value": 1000.0,
    "demand": 2,
    "image": "images/eggs/jungle-egg.webp"
  },
  {
    "id": "stickers-cherry-blossom-flower-sticker",
    "name": "Cherry Blossom Flower Sticker",
    "category": "stickers",
    "value": 9.2622,
    "demand": 1,
    "image": "images/stickers/cherry-blossom-flower-sticker.webp"
  },
  {
    "id": "vehicles-camping-van",
    "name": "Camping Van",
    "category": "vehicles",
    "value": 20.3075,
    "demand": 1,
    "image": "images/vehicles/camping-van.webp"
  },
  {
    "id": "pets-golden-ladybug",
    "name": "Golden Ladybug",
    "category": "pets",
    "value": 649.1896,
    "demand": 1,
    "image": "images/pets/golden-ladybug.webp"
  },
  {
    "id": "toys-axe-rattle",
    "name": "Axe Rattle",
    "category": "toys",
    "value": 531.0359,
    "demand": 1,
    "image": "images/toys/axe-rattle.webp"
  },
  {
    "id": "food-candy-cane",
    "name": "Candy Cane",
    "category": "food",
    "value": 980.0001,
    "demand": 2,
    "image": "images/food/candy-cane.webp"
  },
  {
    "id": "vehicles-glass-scooter",
    "name": "Glass Scooter",
    "category": "vehicles",
    "value": 675.1279,
    "demand": 1,
    "image": "images/vehicles/glass-scooter.webp"
  },
  {
    "id": "petwear-admin-vision-cap",
    "name": "Admin Vision Cap",
    "category": "petwear",
    "value": 843.374,
    "demand": 2,
    "image": ""
  },
  {
    "id": "petwear-eco-brown-hiking-backpack",
    "name": "Eco Brown Hiking Backpack",
    "category": "petwear",
    "value": 811.2455,
    "demand": 2,
    "image": "images/petwear/eco-brown-hiking-backpack.webp"
  },
  {
    "id": "pets-zeopod",
    "name": "Zeopod",
    "category": "pets",
    "value": 217.2308,
    "demand": 1,
    "image": "images/pets/zeopod.webp"
  },
  {
    "id": "petwear-flying-fairy",
    "name": "Flying Fairy",
    "category": "petwear",
    "value": 152.613,
    "demand": 1,
    "image": "images/petwear/flying-fairy.webp"
  },
  {
    "id": "pets-marabou-stork",
    "name": "Marabou Stork",
    "category": "pets",
    "value": 295.8823,
    "demand": 1,
    "image": "images/pets/marabou-stork.webp"
  },
  {
    "id": "pets-caramelgeist",
    "name": "Caramelgeist",
    "category": "pets",
    "value": 109.8653,
    "demand": 1,
    "image": "images/pets/caramelgeist.webp"
  },
  {
    "id": "pets-black-tiger",
    "name": "Black Tiger",
    "category": "pets",
    "value": 68.667,
    "demand": 1,
    "image": "images/pets/black-tiger.webp"
  },
  {
    "id": "stickers-poodle-sticker",
    "name": "Poodle Sticker",
    "category": "stickers",
    "value": 472.2238,
    "demand": 1,
    "image": "images/stickers/poodle-sticker.webp"
  },
  {
    "id": "petwear-chimney-hat",
    "name": "Chimney Hat",
    "category": "petwear",
    "value": 497.9935,
    "demand": 1,
    "image": "images/petwear/chimney-hat.webp"
  },
  {
    "id": "pets-ranger-beaver",
    "name": "Ranger Beaver",
    "category": "pets",
    "value": 614.2334,
    "demand": 2,
    "image": "images/pets/ranger-beaver.webp"
  },
  {
    "id": "eggs-crystal-egg",
    "name": "Crystal Egg",
    "category": "eggs",
    "value": 214.2881,
    "demand": 2,
    "image": "images/eggs/crystal-egg.webp"
  },
  {
    "id": "pets-storm-condor",
    "name": "Storm Condor",
    "category": "pets",
    "value": 84.8966,
    "demand": 1,
    "image": "images/pets/storm-condor.webp"
  },
  {
    "id": "pets-wyvern",
    "name": "Wyvern",
    "category": "pets",
    "value": 409.4899,
    "demand": 1,
    "image": "images/pets/wyvern.webp"
  },
  {
    "id": "pets-ms-muffet",
    "name": "Ms. Muffet",
    "category": "pets",
    "value": 28.717,
    "demand": 1,
    "image": "images/pets/ms-muffet.webp"
  },
  {
    "id": "vehicles-bethink-skateboard",
    "name": "Bethink Skateboard",
    "category": "vehicles",
    "value": 639.595,
    "demand": 1,
    "image": "images/vehicles/bethink-skateboard.webp"
  },
  {
    "id": "vehicles-gingerbread-stunt-plane",
    "name": "Gingerbread Stunt Plane",
    "category": "vehicles",
    "value": 187.8197,
    "demand": 1,
    "image": "images/vehicles/gingerbread-stunt-plane.webp"
  },
  {
    "id": "toys-dandelion-propeller",
    "name": "Dandelion Propeller",
    "category": "toys",
    "value": 296.5538,
    "demand": 1,
    "image": "images/toys/dandelion-propeller.webp"
  },
  {
    "id": "petwear-three-egg-basket",
    "name": "Three Egg Basket",
    "category": "petwear",
    "value": 269.0785,
    "demand": 1,
    "image": "images/petwear/three-egg-basket.webp"
  },
  {
    "id": "food-taco",
    "name": "Taco",
    "category": "food",
    "value": 140.0026,
    "demand": 1,
    "image": "images/food/taco.webp"
  },
  {
    "id": "pets-sunglider",
    "name": "Sunglider",
    "category": "pets",
    "value": 571.7866,
    "demand": 1,
    "image": "images/pets/sunglider.webp"
  },
  {
    "id": "pets-wolpertinger",
    "name": "Wolpertinger",
    "category": "pets",
    "value": 191.0137,
    "demand": 1,
    "image": "images/pets/wolpertinger.webp"
  },
  {
    "id": "pets-brown-springer-spaniel",
    "name": "Brown Springer Spaniel",
    "category": "pets",
    "value": 697.8786,
    "demand": 2,
    "image": "images/pets/brown-springer-spaniel.webp"
  },
  {
    "id": "pets-mosquito",
    "name": "Mosquito",
    "category": "pets",
    "value": 129.8403,
    "demand": 1,
    "image": "images/pets/mosquito.webp"
  },
  {
    "id": "pets-matcha-cat",
    "name": "Matcha Cat",
    "category": "pets",
    "value": 916.3548,
    "demand": 3,
    "image": "images/pets/matcha-cat.webp"
  },
  {
    "id": "petwear-fantastical-wings",
    "name": "Fantastical Wings",
    "category": "petwear",
    "value": 208.8377,
    "demand": 1,
    "image": "images/petwear/fantastical-wings.webp"
  },
  {
    "id": "pets-giant-blue-scarab",
    "name": "Giant Blue Scarab",
    "category": "pets",
    "value": 576.7803,
    "demand": 1,
    "image": "images/pets/giant-blue-scarab.webp"
  },
  {
    "id": "petwear-gold-circle-glasses",
    "name": "Gold Circle Glasses",
    "category": "petwear",
    "value": 48.1956,
    "demand": 2,
    "image": "images/petwear/gold-circle-glasses.webp"
  },
  {
    "id": "pets-cryptid",
    "name": "Cryptid",
    "category": "pets",
    "value": 983.7703,
    "demand": 2,
    "image": "images/pets/cryptid.webp"
  },
  {
    "id": "food-golden-petunia",
    "name": "Golden Petunia",
    "category": "food",
    "value": 400.0018,
    "demand": 2,
    "image": "images/food/golden-petunia.webp"
  },
  {
    "id": "stickers-premium-sticker-pack",
    "name": "Premium Sticker Pack",
    "category": "stickers",
    "value": 861.1115,
    "demand": 2,
    "image": "images/stickers/premium-sticker-pack.webp"
  },
  {
    "id": "eggs-aztec-egg",
    "name": "Aztec Egg",
    "category": "eggs",
    "value": 190.4786,
    "demand": 1,
    "image": "images/eggs/aztec-egg.webp"
  },
  {
    "id": "pets-toasty-red-panda",
    "name": "Toasty Red Panda",
    "category": "pets",
    "value": 531.8366,
    "demand": 1,
    "image": "images/pets/toasty-red-panda.webp"
  },
  {
    "id": "pets-sunflower-friend",
    "name": "Sunflower Friend",
    "category": "pets",
    "value": 34.9592,
    "demand": 1,
    "image": "images/pets/sunflower-friend.webp"
  },
  {
    "id": "pets-frostbite-cub",
    "name": "Frostbite Cub",
    "category": "pets",
    "value": 626.7177,
    "demand": 2,
    "image": "images/pets/frostbite-cub.webp"
  },
  {
    "id": "pets-triceratops",
    "name": "Triceratops",
    "category": "pets",
    "value": 312.1119,
    "demand": 1,
    "image": "images/pets/triceratops.webp"
  },
  {
    "id": "pets-lava-dragon",
    "name": "Lava Dragon",
    "category": "pets",
    "value": 837.7034,
    "demand": 2,
    "image": "images/pets/lava-dragon.webp"
  },
  {
    "id": "pets-diamond-unicorn",
    "name": "Diamond Unicorn",
    "category": "pets",
    "value": 611.7365,
    "demand": 1,
    "image": "images/pets/diamond-unicorn.webp"
  },
  {
    "id": "pets-angelfish",
    "name": "Angelfish",
    "category": "pets",
    "value": 194.759,
    "demand": 1,
    "image": "images/pets/angelfish.webp"
  },
  {
    "id": "vehicles-pink-snowboard",
    "name": "Pink Neon Snowboard",
    "category": "vehicles",
    "value": 939.0865,
    "demand": 2,
    "image": "images/vehicles/pink-neon-snowboard.webp"
  },
  {
    "id": "eggs-golden-egg",
    "name": "Golden Egg",
    "category": "eggs",
    "value": 404.7637,
    "demand": 1,
    "image": "images/eggs/golden-egg.webp"
  },
  {
    "id": "pets-gecko-ducky",
    "name": "Gecko Ducky",
    "category": "pets",
    "value": 62.4248,
    "demand": 1,
    "image": "images/pets/gecko-ducky.webp"
  },
  {
    "id": "toys-unicorn-leash",
    "name": "Unicorn Leash",
    "category": "toys",
    "value": 558.622,
    "demand": 1,
    "image": "images/toys/unicorn-leash.webp"
  },
  {
    "id": "pets-dracula-fish",
    "name": "Dracula Fish",
    "category": "pets",
    "value": 220.9761,
    "demand": 1,
    "image": "images/pets/dracula-fish.webp"
  },
  {
    "id": "strollers-snowman-stroller",
    "name": "Snowman Stroller",
    "category": "strollers",
    "value": 94.5973,
    "demand": 1,
    "image": "images/strollers/snowman-stroller.webp"
  },
  {
    "id": "stickers-mochi-meow-tumble-animated-sticker",
    "name": "Mochi Meow Tumble Animated Sticker",
    "category": "stickers",
    "value": 879.63,
    "demand": 2,
    "image": "images/stickers/mochi-meow-tumble-animated-sticker.webp"
  },
  {
    "id": "pets-glormy-leo",
    "name": "Glormy Leo",
    "category": "pets",
    "value": 852.6846,
    "demand": 2,
    "image": "images/pets/glormy-leo.webp"
  },
  {
    "id": "vehicles-unicorn-cycle",
    "name": "Unicorn Cycle",
    "category": "vehicles",
    "value": 868.0207,
    "demand": 2,
    "image": "images/vehicles/unicorn-cycle.webp"
  },
  {
    "id": "toys-candy-cannon",
    "name": "Candy Cannon",
    "category": "toys",
    "value": 1000.0,
    "demand": 2,
    "image": "images/toys/candy-cannon.webp"
  },
  {
    "id": "toys-electric-tide-paint",
    "name": "Electric Tide Mega Neon Paint",
    "category": "toys",
    "value": 620.6908,
    "demand": 3,
    "image": "images/toys/electric-tide-mega-neon-paint.webp"
  },
  {
    "id": "strollers-lunar-new-year-rickshaw-stroller",
    "name": "Lunar New Year Rickshaw Stroller",
    "category": "strollers",
    "value": 405.4072,
    "demand": 1,
    "image": "images/strollers/lunar-new-year-rickshaw-stroller.webp"
  },
  {
    "id": "gifts-hare-box",
    "name": "Hare Box",
    "category": "gifts",
    "value": 609.7573,
    "demand": 2,
    "image": "images/gifts/hare-box.webp"
  },
  {
    "id": "pets-elasmosaurus",
    "name": "Elasmosaurus",
    "category": "pets",
    "value": 496.8804,
    "demand": 1,
    "image": "images/pets/elasmosaurus.webp"
  },
  {
    "id": "pets-gila-monster",
    "name": "Gila Monster",
    "category": "pets",
    "value": 252.187,
    "demand": 1,
    "image": "images/pets/gila-monster.webp"
  },
  {
    "id": "petwear-cupcake-sprinkle-wings",
    "name": "Cupcake Sprinkle Wings",
    "category": "petwear",
    "value": 610.4429,
    "demand": 2,
    "image": "images/petwear/cupcake-sprinkle-wings.webp"
  },
  {
    "id": "food-diamond-lavender",
    "name": "Diamond Lavender",
    "category": "food",
    "value": 540.0014,
    "demand": 2,
    "image": "images/food/diamond-lavender.webp"
  },
  {
    "id": "pets-count-slothula",
    "name": "Count Slothula",
    "category": "pets",
    "value": 642.9474,
    "demand": 2,
    "image": "images/pets/count-slothula.webp"
  },
  {
    "id": "pets-meerkat",
    "name": "Meerkat",
    "category": "pets",
    "value": 861.4236,
    "demand": 2,
    "image": "images/pets/meerkat.webp"
  },
  {
    "id": "petwear-jetpack",
    "name": "Jetpack",
    "category": "petwear",
    "value": 518.0737,
    "demand": 1,
    "image": "images/petwear/jetpack.webp"
  },
  {
    "id": "pets-space-whale",
    "name": "Space Whale",
    "category": "pets",
    "value": 595.5068,
    "demand": 1,
    "image": "images/pets/space-whale.webp"
  },
  {
    "id": "pets-albino-monkey",
    "name": "Albino Monkey",
    "category": "pets",
    "value": 938.8267,
    "demand": 3,
    "image": "images/pets/albino-monkey.webp"
  },
  {
    "id": "pets-mermicorn",
    "name": "Mermicorn",
    "category": "pets",
    "value": 956.3048,
    "demand": 3,
    "image": "images/pets/mermicorn.webp"
  },
  {
    "id": "toys-croc-plush",
    "name": "Croc Plush",
    "category": "toys",
    "value": 648.2769,
    "demand": 1,
    "image": "images/toys/croc-plush.webp"
  },
  {
    "id": "potions-cure-all-potion",
    "name": "Cure All Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "vehicles-gummy-biplane",
    "name": "Gummy Biplane",
    "category": "vehicles",
    "value": 248.7332,
    "demand": 1,
    "image": "images/vehicles/gummy-biplane.webp"
  },
  {
    "id": "petwear-eco-orange-pumpkin-pie-wings",
    "name": "Eco Orange Pumpkin Pie Wings",
    "category": "petwear",
    "value": 763.0529,
    "demand": 2,
    "image": "images/petwear/eco-orange-pumpkin-pie-wings.webp"
  },
  {
    "id": "toys-orbweaver-glider",
    "name": "Orbweaver Glider",
    "category": "toys",
    "value": 255.1746,
    "demand": 1,
    "image": "images/toys/orbweaver-glider.webp"
  },
  {
    "id": "vehicles-galactic-hoverboard",
    "name": "Galactic Hoverboard",
    "category": "vehicles",
    "value": 30.4598,
    "demand": 1,
    "image": "images/vehicles/galactic-hoverboard.webp"
  },
  {
    "id": "pets-raccoon",
    "name": "Raccoon",
    "category": "pets",
    "value": 463.1726,
    "demand": 1,
    "image": "images/pets/raccoon.webp"
  },
  {
    "id": "petwear-volcano-hat",
    "name": "Volcano Hat",
    "category": "petwear",
    "value": 417.6724,
    "demand": 1,
    "image": "images/petwear/volcano-hat.webp"
  },
  {
    "id": "vehicles-waffle-wagon",
    "name": "Waffle Wagon",
    "category": "vehicles",
    "value": 91.3733,
    "demand": 1,
    "image": "images/vehicles/waffle-wagon.webp"
  },
  {
    "id": "vehicles-bumper-car",
    "name": "Bumper Car",
    "category": "vehicles",
    "value": 116.7539,
    "demand": 1,
    "image": "images/vehicles/bumper-car.webp"
  },
  {
    "id": "petwear-crescent-moon-head-ornament",
    "name": "Crescent Moon Head Ornament",
    "category": "petwear",
    "value": 96.3883,
    "demand": 1,
    "image": "images/petwear/crescent-moon-head-ornament.webp"
  },
  {
    "id": "vehicles-fossil-paw-helicopter",
    "name": "Fossil Paw Helicopter",
    "category": "vehicles",
    "value": 482.2351,
    "demand": 1,
    "image": "images/vehicles/fossil-paw-helicopter.webp"
  },
  {
    "id": "vehicles-tiffany",
    "name": "Tiffany",
    "category": "vehicles",
    "value": 355.3319,
    "demand": 1,
    "image": "images/vehicles/tiffany.webp"
  },
  {
    "id": "eggs-blue-egg",
    "name": "Blue Egg",
    "category": "eggs",
    "value": 952.3811,
    "demand": 2,
    "image": "images/eggs/blue-egg.webp"
  },
  {
    "id": "food-chocolate",
    "name": "Chocolate",
    "category": "food",
    "value": 880.0004,
    "demand": 2,
    "image": "images/food/chocolate.webp"
  },
  {
    "id": "stickers-african-painted-dog-sticker",
    "name": "African Painted Dog Sticker",
    "category": "stickers",
    "value": 611.1123,
    "demand": 1,
    "image": "images/stickers/african-painted-dog-sticker.webp"
  },
  {
    "id": "pets-swan",
    "name": "Swan",
    "category": "pets",
    "value": 785.2691,
    "demand": 2,
    "image": "images/pets/swan.webp"
  },
  {
    "id": "food-broken-egg",
    "name": "Broken Egg",
    "category": "food",
    "value": 700.0009,
    "demand": 1,
    "image": "images/food/broken-egg.webp"
  },
  {
    "id": "pets-fire-stallion",
    "name": "Fire Stallion",
    "category": "pets",
    "value": 319.6025,
    "demand": 1,
    "image": "images/pets/fire-stallion.webp"
  },
  {
    "id": "pets-blackchested-pheasant",
    "name": "Black-Chested Pheasant",
    "category": "pets",
    "value": 925.0939,
    "demand": 2,
    "image": "images/pets/black-chested-pheasant.webp"
  },
  {
    "id": "pets-shetland-pony-dark-brown",
    "name": "Shetland Pony Dark Brown",
    "category": "pets",
    "value": 196.0074,
    "demand": 1,
    "image": "images/pets/shetland-pony-dark-brown.webp"
  },
  {
    "id": "pets-shetland-pony-white",
    "name": "Shetland Pony White",
    "category": "pets",
    "value": 446.943,
    "demand": 1,
    "image": "images/pets/shetland-pony-white.webp"
  },
  {
    "id": "pets-tuxedo-cat",
    "name": "Tuxedo Cat",
    "category": "pets",
    "value": 710.3629,
    "demand": 2,
    "image": "images/pets/tuxedo-cat.webp"
  },
  {
    "id": "pets-nightmare-owl",
    "name": "Nightmare Owl",
    "category": "pets",
    "value": 498.1288,
    "demand": 1,
    "image": "images/pets/nightmare-owl.webp"
  },
  {
    "id": "pets-grinmoire",
    "name": "Grinmoire",
    "category": "pets",
    "value": 76.1576,
    "demand": 1,
    "image": "images/pets/grinmoire.webp"
  },
  {
    "id": "vehicles-adopt-me-snowboard-2",
    "name": "Adopt Me Snowboard 2",
    "category": "vehicles",
    "value": 862.9446,
    "demand": 1,
    "image": "images/vehicles/adopt-me-snowboard-2.webp"
  },
  {
    "id": "gifts-halloween-mummy-cat-box",
    "name": "Halloween Mummy Cat Box",
    "category": "gifts",
    "value": 487.8064,
    "demand": 1,
    "image": "images/gifts/halloween-mummy-cat-box.webp"
  },
  {
    "id": "petwear-duck-floatie",
    "name": "Duck Floatie",
    "category": "petwear",
    "value": 477.9132,
    "demand": 1,
    "image": "images/petwear/duck-floatie.webp"
  },
  {
    "id": "petwear-brain-jar",
    "name": "Brain Jar",
    "category": "petwear",
    "value": 602.4108,
    "demand": 1,
    "image": "images/petwear/brain-jar.webp"
  },
  {
    "id": "pets-beluga-whale",
    "name": "Beluga Whale",
    "category": "pets",
    "value": 167.2934,
    "demand": 1,
    "image": "images/pets/beluga-whale.webp"
  },
  {
    "id": "stickers-hot-doggo-sticker",
    "name": "Hot Doggo Sticker",
    "category": "stickers",
    "value": 629.6307,
    "demand": 1,
    "image": "images/stickers/hot-doggo-sticker.webp"
  },
  {
    "id": "strollers-egyptian-chariot-stroller",
    "name": "Egyptian Chariot Stroller",
    "category": "strollers",
    "value": 189.1916,
    "demand": 1,
    "image": "images/strollers/egyptian-chariot-stroller.webp"
  },
  {
    "id": "strollers-airplane-stroller",
    "name": "Airplane Stroller",
    "category": "strollers",
    "value": 918.9192,
    "demand": 1,
    "image": "images/strollers/airplane-stroller.webp"
  },
  {
    "id": "petwear-macaw-wings",
    "name": "Macaw Wings",
    "category": "petwear",
    "value": 176.7093,
    "demand": 1,
    "image": "images/petwear/macaw-wings.webp"
  },
  {
    "id": "toys-cymbal-ingredient",
    "name": "Cymbal Ingredient",
    "category": "toys",
    "value": 131.0371,
    "demand": 1,
    "image": "images/toys/cymbal-ingredient.webp"
  },
  {
    "id": "vehicles-street-drifter",
    "name": "Street Drifter",
    "category": "vehicles",
    "value": 680.204,
    "demand": 1,
    "image": "images/vehicles/street-drifter.webp"
  },
  {
    "id": "vehicles-rgb-monster-truck",
    "name": "RGB Monster Truck",
    "category": "vehicles",
    "value": 142.1346,
    "demand": 1,
    "image": "images/vehicles/rgb-monster-truck.webp"
  },
  {
    "id": "pets-turtle-doves",
    "name": "Turtle Doves",
    "category": "pets",
    "value": 126.095,
    "demand": 1,
    "image": "images/pets/turtle-doves.webp"
  },
  {
    "id": "strollers-throne-stroller",
    "name": "Throne Stroller",
    "category": "strollers",
    "value": 486.488,
    "demand": 1,
    "image": "images/strollers/throne-stroller.webp"
  },
  {
    "id": "petwear-marshmallow-friend",
    "name": "Marshmallow Friend",
    "category": "petwear",
    "value": 84.3401,
    "demand": 1,
    "image": "images/petwear/marshmallow-friend.webp"
  },
  {
    "id": "petwear-summer-walrus-sunhat",
    "name": "Summer Walrus Sunhat",
    "category": "petwear",
    "value": 449.8008,
    "demand": 1,
    "image": "images/petwear/summer-walrus-sunhat.webp"
  },
  {
    "id": "toys-cat-plush",
    "name": "Cat Plush",
    "category": "toys",
    "value": 855.1728,
    "demand": 1,
    "image": "images/toys/cat-plush.webp"
  },
  {
    "id": "eggs-royal-moon-egg",
    "name": "Royal Moon Egg",
    "category": "eggs",
    "value": 857.1433,
    "demand": 2,
    "image": "images/eggs/royal-moon-egg.webp"
  },
  {
    "id": "stickers-scorching-kaijunior-sticker",
    "name": "Scorching Kaijunior Sticker",
    "category": "stickers",
    "value": 342.5946,
    "demand": 1,
    "image": "images/stickers/scorching-kaijunior-sticker.webp"
  },
  {
    "id": "stickers-state-fair-sticker-pack",
    "name": "State Fair Sticker Pack",
    "category": "stickers",
    "value": 370.3723,
    "demand": 1,
    "image": "images/stickers/state-fair-sticker-pack.webp"
  },
  {
    "id": "pets-alpaca",
    "name": "Alpaca",
    "category": "pets",
    "value": 961.2985,
    "demand": 3,
    "image": "images/pets/alpaca.webp"
  },
  {
    "id": "stickers-turtle-sticker",
    "name": "Turtle Sticker",
    "category": "stickers",
    "value": 592.5938,
    "demand": 1,
    "image": "images/stickers/turtle-sticker.webp"
  },
  {
    "id": "pets-shadow-dragon",
    "name": "Shadow Dragon",
    "category": "pets",
    "value": 1000.0,
    "demand": 3,
    "image": "images/pets/shadow-dragon.webp"
  },
  {
    "id": "petwear-money-hat",
    "name": "Money Hat",
    "category": "petwear",
    "value": 493.9774,
    "demand": 1,
    "image": "images/petwear/money-hat.webp"
  },
  {
    "id": "pets-skelebat",
    "name": "Skelebat",
    "category": "pets",
    "value": 304.6213,
    "demand": 1,
    "image": "images/pets/skelebat.webp"
  },
  {
    "id": "pets-mecha-r4bbit",
    "name": "Mecha R4BBIT",
    "category": "pets",
    "value": 389.5149,
    "demand": 1,
    "image": "images/pets/mecha-r4bbit.webp"
  },
  {
    "id": "petwear-unfortunate-eyelashes",
    "name": "Unfortunate Eyelashes",
    "category": "petwear",
    "value": 253.0143,
    "demand": 1,
    "image": "images/petwear/unfortunate-eyelashes.webp"
  },
  {
    "id": "petwear-leprechaun-hat",
    "name": "Leprechaun Hat",
    "category": "petwear",
    "value": 542.17,
    "demand": 1,
    "image": "images/petwear/leprechaun-hat.webp"
  },
  {
    "id": "vehicles-crescent-moon-car",
    "name": "Crescent Moon Car",
    "category": "vehicles",
    "value": 908.6297,
    "demand": 2,
    "image": "images/vehicles/crescent-moon-car.webp"
  },
  {
    "id": "pets-queen-bee",
    "name": "Queen Bee",
    "category": "pets",
    "value": 813.9831,
    "demand": 2,
    "image": "images/pets/queen-bee.webp"
  },
  {
    "id": "pets-starfish",
    "name": "Starfish",
    "category": "pets",
    "value": 181.0262,
    "demand": 1,
    "image": "images/pets/starfish.webp"
  },
  {
    "id": "petwear-unicorn-horn",
    "name": "Unicorn Horn",
    "category": "petwear",
    "value": 939.7592,
    "demand": 3,
    "image": "images/petwear/unicorn-horn.webp"
  },
  {
    "id": "vehicles-charons-boat",
    "name": "Charon's Boat",
    "category": "vehicles",
    "value": 172.5913,
    "demand": 1,
    "image": "images/vehicles/charon-s-boat.webp"
  },
  {
    "id": "pets-2026-birthday-butterfly",
    "name": "2026 Birthday Butterfly",
    "category": "pets",
    "value": 32.4623,
    "demand": 1,
    "image": "images/pets/2026-birthday-butterfly.webp"
  },
  {
    "id": "pets-budgie-witch",
    "name": "Budgie Witch",
    "category": "pets",
    "value": 26.2201,
    "demand": 1,
    "image": "images/pets/budgie-witch.webp"
  },
  {
    "id": "pets-weevil",
    "name": "Weevil",
    "category": "pets",
    "value": 264.6714,
    "demand": 1,
    "image": "images/pets/weevil.webp"
  },
  {
    "id": "food-patterns-egg",
    "name": "Patterns Egg",
    "category": "food",
    "value": 200.0024,
    "demand": 1,
    "image": "images/food/patterns-egg.webp"
  },
  {
    "id": "toys-heart-plushie",
    "name": "Heart Plushie",
    "category": "toys",
    "value": 268.9677,
    "demand": 1,
    "image": "images/toys/heart-plushie.webp"
  },
  {
    "id": "toys-turkey-plush",
    "name": "Turkey Plush",
    "category": "toys",
    "value": 282.7608,
    "demand": 1,
    "image": "images/toys/turkey-plush.webp"
  },
  {
    "id": "stickers-pelican-sticker",
    "name": "Pelican Sticker",
    "category": "stickers",
    "value": 601.853,
    "demand": 1,
    "image": "images/stickers/pelican-sticker.webp"
  },
  {
    "id": "petwear-bunny-ear-tiara",
    "name": "Bunny Ear Tiara",
    "category": "petwear",
    "value": 281.1267,
    "demand": 1,
    "image": "images/petwear/bunny-ear-tiara.webp"
  },
  {
    "id": "petwear-clam-wings",
    "name": "Clam Wings",
    "category": "petwear",
    "value": 594.3787,
    "demand": 1,
    "image": "images/petwear/clam-wings.webp"
  },
  {
    "id": "pets-pilot-gull",
    "name": "Pilot Gull",
    "category": "pets",
    "value": 61.1763,
    "demand": 1,
    "image": "images/pets/pilot-gull.webp"
  },
  {
    "id": "pets-silverback-gorilla",
    "name": "Silverback Gorilla",
    "category": "pets",
    "value": 891.3861,
    "demand": 2,
    "image": "images/pets/silverback-gorilla.webp"
  },
  {
    "id": "pets-patchy-bear",
    "name": "Patchy Bear",
    "category": "pets",
    "value": 118.6044,
    "demand": 1,
    "image": "images/pets/patchy-bear.webp"
  },
  {
    "id": "pets-lionfish",
    "name": "Lionfish",
    "category": "pets",
    "value": 300.876,
    "demand": 1,
    "image": "images/pets/lionfish.webp"
  },
  {
    "id": "toys-tombstone-ghostify",
    "name": "Tombstone Ghostify",
    "category": "toys",
    "value": 986.2069,
    "demand": 2,
    "image": "images/toys/tombstone-ghostify.webp"
  },
  {
    "id": "pets-evil-rock",
    "name": "Evil Rock",
    "category": "pets",
    "value": 677.9036,
    "demand": 2,
    "image": "images/pets/evil-rock.webp"
  },
  {
    "id": "pets-thorny-devil",
    "name": "Thorny Devil",
    "category": "pets",
    "value": 282.1495,
    "demand": 1,
    "image": "images/pets/thorny-devil.webp"
  },
  {
    "id": "stickers-majestic-pony-sticker",
    "name": "Majestic Pony Sticker",
    "category": "stickers",
    "value": 305.5576,
    "demand": 1,
    "image": "images/stickers/majestic-pony-sticker.webp"
  },
  {
    "id": "pets-oryx",
    "name": "Oryx",
    "category": "pets",
    "value": 317.1057,
    "demand": 1,
    "image": "images/pets/oryx.webp"
  },
  {
    "id": "pets-nebula-snake",
    "name": "Nebula Snake",
    "category": "pets",
    "value": 421.9743,
    "demand": 1,
    "image": "images/pets/nebula-snake.webp"
  },
  {
    "id": "pets-blue-ringed-octopus",
    "name": "Blue Ringed Octopus",
    "category": "pets",
    "value": 621.724,
    "demand": 2,
    "image": "images/pets/blue-ringed-octopus.webp"
  },
  {
    "id": "pets-lammergeier",
    "name": "Lammergeier",
    "category": "pets",
    "value": 338.3291,
    "demand": 1,
    "image": "images/pets/lammergeier.webp"
  },
  {
    "id": "petwear-halloween-orange-pumpkin-friend-hat",
    "name": "Halloween Orange Pumpkin Friend Hat",
    "category": "petwear",
    "value": 277.1106,
    "demand": 1,
    "image": "images/petwear/halloween-orange-pumpkin-friend-hat.webp"
  },
  {
    "id": "petwear-santas-bow",
    "name": "Santa's Bow",
    "category": "petwear",
    "value": 220.8859,
    "demand": 1,
    "image": "images/petwear/santa-s-bow.webp"
  },
  {
    "id": "petwear-white-designer-backpack",
    "name": "White Designer Backpack",
    "category": "petwear",
    "value": 690.764,
    "demand": 1,
    "image": "images/petwear/white-designer-backpack.webp"
  },
  {
    "id": "pets-frog",
    "name": "Frog",
    "category": "pets",
    "value": 525.5944,
    "demand": 1,
    "image": "images/pets/frog.webp"
  },
  {
    "id": "petwear-buzzing-honeypot-hat",
    "name": "Buzzing Honeypot Hat",
    "category": "petwear",
    "value": 991.9679,
    "demand": 2,
    "image": "images/petwear/buzzing-honeypot-hat.webp"
  },
  {
    "id": "toys-crossbow-grappling-hook",
    "name": "Crossbow Grappling Hook",
    "category": "toys",
    "value": 682.7596,
    "demand": 1,
    "image": "images/toys/crossbow-grappling-hook.webp"
  },
  {
    "id": "pets-arctic-dusk-dragon",
    "name": "Arctic Dusk Dragon",
    "category": "pets",
    "value": 865.1689,
    "demand": 2,
    "image": "images/pets/arctic-dusk-dragon.webp"
  },
  {
    "id": "pets-angus-cow",
    "name": "Angus Cow",
    "category": "pets",
    "value": 41.2014,
    "demand": 1,
    "image": "images/pets/angus-cow.webp"
  },
  {
    "id": "vehicles-shooting-star-board",
    "name": "Shooting Star Board",
    "category": "vehicles",
    "value": 918.782,
    "demand": 2,
    "image": "images/vehicles/shooting-star-board.webp"
  },
  {
    "id": "strollers-trike-stroller",
    "name": "Trike Stroller",
    "category": "strollers",
    "value": 702.7036,
    "demand": 1,
    "image": "images/strollers/trike-stroller.webp"
  },
  {
    "id": "petwear-satellite-spinner",
    "name": "Satellite Spinner",
    "category": "petwear",
    "value": 562.2503,
    "demand": 1,
    "image": "images/petwear/satellite-spinner.webp"
  },
  {
    "id": "food-cookie",
    "name": "Cookie",
    "category": "food",
    "value": 320.002,
    "demand": 2,
    "image": "images/food/cookie.webp"
  },
  {
    "id": "pets-roadrunner",
    "name": "Roadrunner",
    "category": "pets",
    "value": 416.9805,
    "demand": 1,
    "image": "images/pets/roadrunner.webp"
  },
  {
    "id": "pets-princess-capuchin-monkey",
    "name": "Princess Capuchin Monkey",
    "category": "pets",
    "value": 680.4005,
    "demand": 1,
    "image": "images/pets/princess-capuchin-monkey.webp"
  },
  {
    "id": "petwear-pirate-hat-friend",
    "name": "Pirate Hat & Friend",
    "category": "petwear",
    "value": 618.475,
    "demand": 1,
    "image": "images/petwear/pirate-hat-friend.webp"
  },
  {
    "id": "pets-hermit-crab",
    "name": "Hermit Crab",
    "category": "pets",
    "value": 247.1933,
    "demand": 1,
    "image": "images/pets/hermit-crab.webp"
  },
  {
    "id": "pets-frostbite-bear",
    "name": "Frostbite Bear",
    "category": "pets",
    "value": 943.8204,
    "demand": 2,
    "image": "images/pets/frostbite-bear.webp"
  },
  {
    "id": "pets-wildfire-hawk",
    "name": "Wildfire Hawk",
    "category": "pets",
    "value": 425.7196,
    "demand": 1,
    "image": "images/pets/wildfire-hawk.webp"
  },
  {
    "id": "pets-capuchin-monkey",
    "name": "Capuchin Monkey",
    "category": "pets",
    "value": 156.0575,
    "demand": 1,
    "image": "images/pets/capuchin-monkey.webp"
  },
  {
    "id": "vehicles-enchanted-broomstick",
    "name": "Enchanted Broomstick",
    "category": "vehicles",
    "value": 832.4878,
    "demand": 2,
    "image": "images/vehicles/enchanted-broomstick.webp"
  },
  {
    "id": "eggs-fossil-egg",
    "name": "Fossil Egg",
    "category": "eggs",
    "value": 690.4771,
    "demand": 2,
    "image": "images/eggs/fossil-egg.webp"
  },
  {
    "id": "pets-inmate-capuchin-monkey",
    "name": "Inmate Capuchin Monkey",
    "category": "pets",
    "value": 495.632,
    "demand": 1,
    "image": "images/pets/inmate-capuchin-monkey.webp"
  },
  {
    "id": "pets-peach-owl",
    "name": "Peach Owl",
    "category": "pets",
    "value": 694.1333,
    "demand": 2,
    "image": "images/pets/peach-owl.webp"
  },
  {
    "id": "vehicles-blue-skateboard",
    "name": "Blue Skateboard",
    "category": "vehicles",
    "value": 532.9963,
    "demand": 1,
    "image": "images/vehicles/blue-skateboard.webp"
  },
  {
    "id": "pets-snowball-pug",
    "name": "Snowball Pug",
    "category": "pets",
    "value": 473.1601,
    "demand": 1,
    "image": "images/pets/snowball-pug.webp"
  },
  {
    "id": "food-burnt-bites-bait",
    "name": "Burnt Bites Bait",
    "category": "food",
    "value": 220.0023,
    "demand": 1,
    "image": "images/food/burnt-bites-bait.webp"
  },
  {
    "id": "petwear-magpie-wings",
    "name": "Magpie Wings",
    "category": "petwear",
    "value": 767.069,
    "demand": 2,
    "image": "images/petwear/magpie-wings.webp"
  },
  {
    "id": "pets-gorilla",
    "name": "Gorilla",
    "category": "pets",
    "value": 225.9699,
    "demand": 1,
    "image": "images/pets/gorilla.webp"
  },
  {
    "id": "pets-magma-moose",
    "name": "Magma Moose",
    "category": "pets",
    "value": 459.4273,
    "demand": 1,
    "image": "images/pets/magma-moose.webp"
  },
  {
    "id": "pets-yellow-butterfly",
    "name": "Yellow Butterfly",
    "category": "pets",
    "value": 358.304,
    "demand": 1,
    "image": "images/pets/yellow-butterfly.webp"
  },
  {
    "id": "toys-elephant-plush",
    "name": "Elephant Plush",
    "category": "toys",
    "value": 668.9665,
    "demand": 1,
    "image": "images/toys/elephant-plush.webp"
  },
  {
    "id": "vehicles-monocycle",
    "name": "Monocycle",
    "category": "vehicles",
    "value": 725.8891,
    "demand": 1,
    "image": "images/vehicles/monocycle.webp"
  },
  {
    "id": "vehicles-fissy-skateboard",
    "name": "Fissy Skateboard",
    "category": "vehicles",
    "value": 644.6711,
    "demand": 1,
    "image": "images/vehicles/fissy-skateboard.webp"
  },
  {
    "id": "gifts-standard-gibbon-box",
    "name": "Standard Gibbon Box",
    "category": "gifts",
    "value": 292.685,
    "demand": 1,
    "image": "images/gifts/standard-gibbon-box.webp"
  },
  {
    "id": "pets-unicorn",
    "name": "Unicorn",
    "category": "pets",
    "value": 764.0457,
    "demand": 3,
    "image": "images/pets/unicorn.webp"
  },
  {
    "id": "pets-pineapple-owl",
    "name": "Pineapple Owl",
    "category": "pets",
    "value": 836.4549,
    "demand": 2,
    "image": "images/pets/pineapple-owl.webp"
  },
  {
    "id": "petwear-pirate-hat",
    "name": "Pirate Hat",
    "category": "petwear",
    "value": 614.459,
    "demand": 1,
    "image": "images/petwear/pirate-hat.webp"
  },
  {
    "id": "toys-celebration-firework-launcher",
    "name": "Celebration Firework Launcher",
    "category": "toys",
    "value": 868.9659,
    "demand": 1,
    "image": "images/toys/celebration-firework-launcher.webp"
  },
  {
    "id": "strollers-egg-basket-stroller",
    "name": "Egg Basket Stroller",
    "category": "strollers",
    "value": 540.5419,
    "demand": 1,
    "image": "images/strollers/egg-basket-stroller.webp"
  },
  {
    "id": "petwear-white-chef-hat",
    "name": "White Chef Hat",
    "category": "petwear",
    "value": 401.6082,
    "demand": 1,
    "image": "images/petwear/white-chef-hat.webp"
  },
  {
    "id": "eggs-endangered-egg",
    "name": "Endangered Egg",
    "category": "eggs",
    "value": 119.0503,
    "demand": 1,
    "image": "images/eggs/endangered-egg.webp"
  },
  {
    "id": "pets-kitsune",
    "name": "Kitsune",
    "category": "pets",
    "value": 600.5006,
    "demand": 1,
    "image": "images/pets/kitsune.webp"
  },
  {
    "id": "pets-eggnog-hare",
    "name": "Eggnog Hare",
    "category": "pets",
    "value": 392.0118,
    "demand": 1,
    "image": "images/pets/eggnog-hare.webp"
  },
  {
    "id": "pets-cheetah",
    "name": "Cheetah",
    "category": "pets",
    "value": 810.2378,
    "demand": 2,
    "image": "images/pets/cheetah.webp"
  },
  {
    "id": "pets-cassowary",
    "name": "Cassowary",
    "category": "pets",
    "value": 503.1226,
    "demand": 1,
    "image": "images/pets/cassowary.webp"
  },
  {
    "id": "stickers-frostclaw-animated-sticker",
    "name": "Frostclaw Animated Sticker",
    "category": "stickers",
    "value": 935.1854,
    "demand": 2,
    "image": "images/stickers/frostclaw-animated-sticker.webp"
  },
  {
    "id": "pets-seabed-creeper",
    "name": "Seabed Creeper",
    "category": "pets",
    "value": 650.438,
    "demand": 2,
    "image": "images/pets/seabed-creeper.webp"
  },
  {
    "id": "pets-cerberus",
    "name": "Cerberus",
    "category": "pets",
    "value": 780.2753,
    "demand": 2,
    "image": "images/pets/cerberus.webp"
  },
  {
    "id": "pets-tealwood-monster",
    "name": "Tealwood Monster",
    "category": "pets",
    "value": 285.8948,
    "demand": 1,
    "image": "images/pets/tealwood-monster.webp"
  },
  {
    "id": "pets-manta-ray",
    "name": "Manta Ray",
    "category": "pets",
    "value": 328.3416,
    "demand": 1,
    "image": "images/pets/manta-ray.webp"
  },
  {
    "id": "food-golden-seed-ball",
    "name": "Golden Seed Ball",
    "category": "food",
    "value": 360.0019,
    "demand": 2,
    "image": "images/food/golden-seed-ball.webp"
  },
  {
    "id": "pets-christmas-spirit",
    "name": "Christmas Spirit",
    "category": "pets",
    "value": 456.9305,
    "demand": 1,
    "image": "images/pets/christmas-spirit.webp"
  },
  {
    "id": "pets-greenchested-pheasant",
    "name": "Green-Chested Pheasant",
    "category": "pets",
    "value": 644.1958,
    "demand": 1,
    "image": "images/pets/green-chested-pheasant.webp"
  },
  {
    "id": "pets-orange-butterfly",
    "name": "Orange Butterfly",
    "category": "pets",
    "value": 674.1583,
    "demand": 2,
    "image": "images/pets/orange-butterfly.webp"
  },
  {
    "id": "pets-royal-corgi",
    "name": "Royal Corgi",
    "category": "pets",
    "value": 787.7659,
    "demand": 2,
    "image": "images/pets/royal-corgi.webp"
  },
  {
    "id": "pets-snow-puma",
    "name": "Snow Puma",
    "category": "pets",
    "value": 9.9905,
    "demand": 1,
    "image": "images/pets/snow-puma.webp"
  },
  {
    "id": "petwear-sailor-cap",
    "name": "Sailor Cap",
    "category": "petwear",
    "value": 835.3419,
    "demand": 2,
    "image": "images/petwear/sailor-cap.webp"
  },
  {
    "id": "pets-chimera",
    "name": "Chimera",
    "category": "pets",
    "value": 617.9787,
    "demand": 1,
    "image": "images/pets/chimera.webp"
  },
  {
    "id": "vehicles-hot-air-balloon",
    "name": "Hot Air Balloon",
    "category": "vehicles",
    "value": 106.6017,
    "demand": 1,
    "image": "images/vehicles/hot-air-balloon.webp"
  },
  {
    "id": "pets-strawberry-penguin",
    "name": "Strawberry Penguin",
    "category": "pets",
    "value": 903.8705,
    "demand": 2,
    "image": "images/pets/strawberry-penguin.webp"
  },
  {
    "id": "petwear-rainbow-cloud-wings",
    "name": "Rainbow Cloud Wings",
    "category": "petwear",
    "value": 666.6677,
    "demand": 2,
    "image": "images/petwear/rainbow-cloud-wings.webp"
  },
  {
    "id": "pets-red-squirrel",
    "name": "Red Squirrel",
    "category": "pets",
    "value": 636.7052,
    "demand": 2,
    "image": "images/pets/red-squirrel.webp"
  },
  {
    "id": "vehicles-suv",
    "name": "SUV",
    "category": "vehicles",
    "value": 228.4287,
    "demand": 1,
    "image": "images/vehicles/suv.webp"
  },
  {
    "id": "strollers-unicorn-stroller",
    "name": "Unicorn Stroller",
    "category": "strollers",
    "value": 932.4326,
    "demand": 1,
    "image": "images/strollers/unicorn-stroller.webp"
  },
  {
    "id": "gifts-choccybunny-box",
    "name": "Choccybunny Box",
    "category": "gifts",
    "value": 0.003,
    "demand": 1,
    "image": "images/gifts/choccybunny-box.webp"
  },
  {
    "id": "pets-clownfish",
    "name": "Clownfish",
    "category": "pets",
    "value": 483.1476,
    "demand": 1,
    "image": "images/pets/clownfish.webp"
  },
  {
    "id": "pets-tan-chowchow",
    "name": "Tan Chow-Chow",
    "category": "pets",
    "value": 362.0494,
    "demand": 1,
    "image": "images/pets/tan-chow-chow.webp"
  },
  {
    "id": "pets-capricorn",
    "name": "Capricorn",
    "category": "pets",
    "value": 731.5863,
    "demand": 2,
    "image": "images/pets/capricorn.webp"
  },
  {
    "id": "pets-trapdoor-snail",
    "name": "Trapdoor Snail",
    "category": "pets",
    "value": 448.1914,
    "demand": 1,
    "image": "images/pets/trapdoor-snail.webp"
  },
  {
    "id": "petwear-lunar-new-year-collar",
    "name": "Lunar New Year Collar",
    "category": "petwear",
    "value": 349.3995,
    "demand": 1,
    "image": "images/petwear/lunar-new-year-collar.webp"
  },
  {
    "id": "pets-fire-mare",
    "name": "Fire Mare",
    "category": "pets",
    "value": 494.3835,
    "demand": 1,
    "image": "images/pets/fire-mare.webp"
  },
  {
    "id": "gifts-spider-gift",
    "name": "Spider Gift",
    "category": "gifts",
    "value": 170.7342,
    "demand": 1,
    "image": "images/gifts/spider-gift.webp"
  },
  {
    "id": "petwear-blue-cat-ear-headphones",
    "name": "Blue Cat Ear Headphones",
    "category": "petwear",
    "value": 630.5232,
    "demand": 2,
    "image": "images/petwear/blue-cat-ear-headphones.webp"
  },
  {
    "id": "petwear-pink-butterfly-wings",
    "name": "Pink Butterfly Wings",
    "category": "petwear",
    "value": 248.9982,
    "demand": 1,
    "image": "images/petwear/pink-butterfly-wings.webp"
  },
  {
    "id": "vehicles-regal-roller",
    "name": "Regal Roller",
    "category": "vehicles",
    "value": 659.8995,
    "demand": 1,
    "image": "images/vehicles/regal-roller.webp"
  },
  {
    "id": "pets-emberlight",
    "name": "Emberlight",
    "category": "pets",
    "value": 616.7302,
    "demand": 1,
    "image": "images/pets/emberlight.webp"
  },
  {
    "id": "pets-cherub-chipmunk",
    "name": "Cherub Chipmunk",
    "category": "pets",
    "value": 52.4373,
    "demand": 1,
    "image": "images/pets/cherub-chipmunk.webp"
  },
  {
    "id": "potions-antigravity-potion",
    "name": "Anti-gravity Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "vehicles-gyrocopter",
    "name": "Gyrocopter",
    "category": "vehicles",
    "value": 791.8788,
    "demand": 1,
    "image": "images/vehicles/gyrocopter.webp"
  },
  {
    "id": "pets-sea-turtle",
    "name": "Sea Turtle",
    "category": "pets",
    "value": 310.8635,
    "demand": 1,
    "image": "images/pets/sea-turtle.webp"
  },
  {
    "id": "food-golden-bone",
    "name": "Golden Bone",
    "category": "food",
    "value": 480.0016,
    "demand": 2,
    "image": "images/food/golden-bone.webp"
  },
  {
    "id": "potions-small-sip-potion",
    "name": "Small Sip Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-violet-butterfly",
    "name": "Violet Butterfly",
    "category": "pets",
    "value": 790.2628,
    "demand": 2,
    "image": "images/pets/violet-butterfly.webp"
  },
  {
    "id": "vehicles-black-snowboard",
    "name": "Black Snowboard",
    "category": "vehicles",
    "value": 558.377,
    "demand": 1,
    "image": "images/vehicles/black-snowboard.webp"
  },
  {
    "id": "pets-crocodile",
    "name": "Crocodile",
    "category": "pets",
    "value": 932.5845,
    "demand": 3,
    "image": "images/pets/crocodile.webp"
  },
  {
    "id": "pets-stygian-owl",
    "name": "Stygian Owl",
    "category": "pets",
    "value": 89.8904,
    "demand": 1,
    "image": "images/pets/stygian-owl.webp"
  },
  {
    "id": "petwear-viking-helmet",
    "name": "Viking Helmet",
    "category": "petwear",
    "value": 192.7735,
    "demand": 1,
    "image": "images/petwear/viking-helmet.webp"
  },
  {
    "id": "stickers-wet-owl-sticker",
    "name": "Wet Owl Sticker",
    "category": "stickers",
    "value": 787.0377,
    "demand": 2,
    "image": "images/stickers/wet-owl-sticker.webp"
  },
  {
    "id": "pets-wooly-rhino",
    "name": "Wooly Rhino",
    "category": "pets",
    "value": 772.7847,
    "demand": 2,
    "image": "images/pets/wooly-rhino.webp"
  },
  {
    "id": "pets-hawk",
    "name": "Hawk",
    "category": "pets",
    "value": 622.9724,
    "demand": 1,
    "image": "images/pets/hawk.webp"
  },
  {
    "id": "pets-influencer-gibbon",
    "name": "Influencer Gibbon",
    "category": "pets",
    "value": 699.127,
    "demand": 1,
    "image": "images/pets/influencer-gibbon.webp"
  },
  {
    "id": "pets-aye-aye",
    "name": "Aye Aye",
    "category": "pets",
    "value": 39.9529,
    "demand": 1,
    "image": "images/pets/aye-aye.webp"
  },
  {
    "id": "petwear-natures-crown",
    "name": "Nature's Crown",
    "category": "petwear",
    "value": 433.7366,
    "demand": 1,
    "image": "images/petwear/nature-s-crown.webp"
  },
  {
    "id": "pets-vermilion-butterfly",
    "name": "Vermilion Butterfly",
    "category": "pets",
    "value": 528.0913,
    "demand": 1,
    "image": "images/pets/vermilion-butterfly.webp"
  },
  {
    "id": "pets-oakee",
    "name": "Oakee",
    "category": "pets",
    "value": 87.3935,
    "demand": 1,
    "image": "images/pets/oakee.webp"
  },
  {
    "id": "petwear-gold-fairy-crown",
    "name": "Gold Fairy Crown",
    "category": "petwear",
    "value": 353.4156,
    "demand": 1,
    "image": "images/petwear/gold-fairy-crown.webp"
  },
  {
    "id": "vehicles-daisymobile",
    "name": "Daisymobile",
    "category": "vehicles",
    "value": 487.3112,
    "demand": 1,
    "image": "images/vehicles/daisymobile.webp"
  },
  {
    "id": "pets-abyssinian-cat",
    "name": "Abyssinian Cat",
    "category": "pets",
    "value": 36.2076,
    "demand": 1,
    "image": "images/pets/abyssinian-cat.webp"
  },
  {
    "id": "pets-cozy-mistletroll",
    "name": "Cozy Mistletroll",
    "category": "pets",
    "value": 354.5587,
    "demand": 1,
    "image": "images/pets/cozy-mistletroll.webp"
  },
  {
    "id": "toys-cherry-blossom-hang-glider",
    "name": "Cherry Blossom Hang Glider",
    "category": "toys",
    "value": 965.5173,
    "demand": 2,
    "image": "images/toys/cherry-blossom-hang-glider.webp"
  },
  {
    "id": "pets-dango-penguins",
    "name": "Dango Penguins",
    "category": "pets",
    "value": 830.2127,
    "demand": 3,
    "image": "images/pets/dango-penguins.webp"
  },
  {
    "id": "toys-football-throw-toy",
    "name": "Football Throw Toy",
    "category": "toys",
    "value": 586.2081,
    "demand": 1,
    "image": "images/toys/football-throw-toy.webp"
  },
  {
    "id": "pets-pumpkin-friend",
    "name": "Pumpkin Friend",
    "category": "pets",
    "value": 596.7553,
    "demand": 2,
    "image": "images/pets/pumpkin-friend.webp"
  },
  {
    "id": "gifts-1000-bucks-silk-bag",
    "name": "1000 Bucks Silk Bag",
    "category": "gifts",
    "value": 780.4885,
    "demand": 2,
    "image": "images/gifts/1000-bucks-silk-bag.webp"
  },
  {
    "id": "pets-jekyll-hydra",
    "name": "Jekyll Hydra",
    "category": "pets",
    "value": 966.2922,
    "demand": 2,
    "image": "images/pets/jekyll-hydra.webp"
  },
  {
    "id": "pets-french-bulldog",
    "name": "French Bulldog",
    "category": "pets",
    "value": 755.3066,
    "demand": 2,
    "image": "images/pets/french-bulldog.webp"
  },
  {
    "id": "petwear-ruff",
    "name": "Ruff",
    "category": "petwear",
    "value": 485.9453,
    "demand": 1,
    "image": "images/petwear/ruff.webp"
  },
  {
    "id": "pets-reindeer",
    "name": "Reindeer",
    "category": "pets",
    "value": 672.9098,
    "demand": 2,
    "image": "images/pets/reindeer.webp"
  },
  {
    "id": "petwear-queen-bee-slippers",
    "name": "Queen Bee Slippers",
    "category": "petwear",
    "value": 983.9358,
    "demand": 2,
    "image": "images/petwear/queen-bee-slippers.webp"
  },
  {
    "id": "pets-glormy-crab",
    "name": "Glormy Crab",
    "category": "pets",
    "value": 333.3353,
    "demand": 1,
    "image": "images/pets/glormy-crab.webp"
  },
  {
    "id": "strollers-vampire-stroller",
    "name": "Vampire Stroller",
    "category": "strollers",
    "value": 972.9731,
    "demand": 1,
    "image": "images/strollers/vampire-stroller.webp"
  },
  {
    "id": "vehicles-snowblower-toboggan",
    "name": "Snowblower Toboggan",
    "category": "vehicles",
    "value": 472.0828,
    "demand": 1,
    "image": "images/vehicles/snowblower-toboggan.webp"
  },
  {
    "id": "pets-puptune",
    "name": "Puptune",
    "category": "pets",
    "value": 476.9054,
    "demand": 1,
    "image": "images/pets/puptune.webp"
  },
  {
    "id": "potions-busy-body-potion",
    "name": "Busy Body Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-caelum-cervi",
    "name": "Caelum Cervi",
    "category": "pets",
    "value": 893.883,
    "demand": 2,
    "image": "images/pets/caelum-cervi.webp"
  },
  {
    "id": "petwear-rainbow-maker",
    "name": "Rainbow Maker",
    "category": "petwear",
    "value": 979.9197,
    "demand": 3,
    "image": "images/petwear/rainbow-maker.webp"
  },
  {
    "id": "potions-translucent-tea-potion",
    "name": "Translucent Tea Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-shadow-aura",
    "name": "Shadow Aura",
    "category": "petwear",
    "value": 791.1653,
    "demand": 2,
    "image": "images/petwear/shadow-aura.webp"
  },
  {
    "id": "vehicles-pink-skateboard",
    "name": "Pink Skateboard",
    "category": "vehicles",
    "value": 548.2247,
    "demand": 1,
    "image": "images/vehicles/pink-skateboard.webp"
  },
  {
    "id": "pets-gingerbread-hare",
    "name": "Gingerbread Hare",
    "category": "pets",
    "value": 454.4336,
    "demand": 1,
    "image": "images/pets/gingerbread-hare.webp"
  },
  {
    "id": "vehicles-powerbike",
    "name": "Powerbike",
    "category": "vehicles",
    "value": 137.0584,
    "demand": 1,
    "image": "images/vehicles/powerbike.webp"
  },
  {
    "id": "strollers-baby-basket-stroller",
    "name": "Baby Basket Stroller",
    "category": "strollers",
    "value": 905.4057,
    "demand": 1,
    "image": "images/strollers/baby-basket-stroller.webp"
  },
  {
    "id": "pets-amber-butterfly",
    "name": "Amber Butterfly",
    "category": "pets",
    "value": 178.5293,
    "demand": 1,
    "image": "images/pets/amber-butterfly.webp"
  },
  {
    "id": "pets-frost-unicorn",
    "name": "Frost Unicorn",
    "category": "pets",
    "value": 951.311,
    "demand": 2,
    "image": "images/pets/frost-unicorn.webp"
  },
  {
    "id": "stickers-dimorphodon-sticker",
    "name": "Dimorphodon Sticker",
    "category": "stickers",
    "value": 194.4469,
    "demand": 1,
    "image": "images/stickers/dimorphodon-sticker.webp"
  },
  {
    "id": "pets-black-widow",
    "name": "Black Widow",
    "category": "pets",
    "value": 722.8473,
    "demand": 2,
    "image": "images/pets/black-widow.webp"
  },
  {
    "id": "petwear-halloween-black-axe-guitar-accessory",
    "name": "Halloween Black Axe Guitar Accessory",
    "category": "petwear",
    "value": 823.2937,
    "demand": 2,
    "image": "images/petwear/halloween-black-axe-guitar-accessory.webp"
  },
  {
    "id": "toys-zombie-buffalo-plush",
    "name": "Zombie Buffalo Plush",
    "category": "toys",
    "value": 848.2763,
    "demand": 1,
    "image": "images/toys/zombie-buffalo-plush.webp"
  },
  {
    "id": "pets-phantom-dragon",
    "name": "Phantom Dragon",
    "category": "pets",
    "value": 870.1627,
    "demand": 2,
    "image": "images/pets/phantom-dragon.webp"
  },
  {
    "id": "vehicles-latte-motorcycle",
    "name": "Latte Motorcycle",
    "category": "vehicles",
    "value": 126.9062,
    "demand": 1,
    "image": "images/vehicles/latte-motorcycle.webp"
  },
  {
    "id": "toys-gift-throw-toy",
    "name": "Gift Throw Toy",
    "category": "toys",
    "value": 110.3475,
    "demand": 1,
    "image": "images/toys/gift-throw-toy.webp"
  },
  {
    "id": "eggs-easter-2020-egg",
    "name": "Easter 2020 Egg",
    "category": "eggs",
    "value": 833.3338,
    "demand": 2,
    "image": "images/eggs/easter-2020-egg.webp"
  },
  {
    "id": "stickers-round-fallow-deer-sticker",
    "name": "Round Fallow Deer Sticker",
    "category": "stickers",
    "value": 731.4823,
    "demand": 1,
    "image": "images/stickers/round-fallow-deer-sticker.webp"
  },
  {
    "id": "petwear-strawberry-plushie-rider",
    "name": "Strawberry Plushie Rider",
    "category": "petwear",
    "value": 987.9518,
    "demand": 2,
    "image": "images/petwear/strawberry-plushie-rider.webp"
  },
  {
    "id": "petwear-glamicorn-purse-pet",
    "name": "Glamicorn Purse Pet",
    "category": "petwear",
    "value": 317.2711,
    "demand": 1,
    "image": "images/petwear/glamicorn-purse-pet.webp"
  },
  {
    "id": "pets-kid-goat",
    "name": "Kid Goat",
    "category": "pets",
    "value": 143.5731,
    "demand": 1,
    "image": "images/pets/kid-goat.webp"
  },
  {
    "id": "pets-brachiosaurus",
    "name": "Brachiosaurus",
    "category": "pets",
    "value": 204.7465,
    "demand": 1,
    "image": "images/pets/brachiosaurus.webp"
  },
  {
    "id": "pets-clumpty",
    "name": "Clumpty",
    "category": "pets",
    "value": 23.7233,
    "demand": 1,
    "image": "images/pets/clumpty.webp"
  },
  {
    "id": "strollers-froggy-stroller",
    "name": "Froggy Stroller",
    "category": "strollers",
    "value": 67.5704,
    "demand": 1,
    "image": "images/strollers/froggy-stroller.webp"
  },
  {
    "id": "pets-shark",
    "name": "Shark",
    "category": "pets",
    "value": 754.0582,
    "demand": 2,
    "image": "images/pets/shark.webp"
  },
  {
    "id": "vehicles-hovertible",
    "name": "Hovertible",
    "category": "vehicles",
    "value": 319.799,
    "demand": 1,
    "image": "images/vehicles/hovertible.webp"
  },
  {
    "id": "stickers-pets-plus-sticker-pack",
    "name": "Pets Plus Sticker Pack",
    "category": "stickers",
    "value": 916.6669,
    "demand": 2,
    "image": "images/stickers/pets-plus-sticker-pack.webp"
  },
  {
    "id": "vehicles-ribcage-carriage",
    "name": "Ribcage Carriage",
    "category": "vehicles",
    "value": 345.1796,
    "demand": 1,
    "image": "images/vehicles/ribcage-carriage.webp"
  },
  {
    "id": "pets-bubblegeist",
    "name": "Bubblegeist",
    "category": "pets",
    "value": 451.9367,
    "demand": 1,
    "image": "images/pets/bubblegeist.webp"
  },
  {
    "id": "pets-golden-dragon",
    "name": "Golden Dragon",
    "category": "pets",
    "value": 293.3854,
    "demand": 1,
    "image": "images/pets/golden-dragon.webp"
  },
  {
    "id": "pets-pain-au-chat",
    "name": "Pain au Chat",
    "category": "pets",
    "value": 612.9849,
    "demand": 2,
    "image": "images/pets/pain-au-chat.webp"
  },
  {
    "id": "toys-staff-ingredient",
    "name": "Staff Ingredient",
    "category": "toys",
    "value": 841.3798,
    "demand": 1,
    "image": "images/toys/staff-ingredient.webp"
  },
  {
    "id": "gifts-ox-box",
    "name": "Ox Box",
    "category": "gifts",
    "value": 414.6359,
    "demand": 1,
    "image": "images/gifts/ox-box.webp"
  },
  {
    "id": "toys-pumpkin",
    "name": "Pumpkin",
    "category": "toys",
    "value": 979.3104,
    "demand": 2,
    "image": "images/toys/pumpkin.webp"
  },
  {
    "id": "potions-sugar-skull-potion",
    "name": "Sugar Skull Potion",
    "category": "potions",
    "value": 4.2,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-shiver-wolf",
    "name": "Shiver Wolf",
    "category": "pets",
    "value": 606.7428,
    "demand": 2,
    "image": "images/pets/shiver-wolf.webp"
  },
  {
    "id": "petwear-police-cap",
    "name": "Police Cap",
    "category": "petwear",
    "value": 385.544,
    "demand": 1,
    "image": "images/petwear/police-cap.webp"
  },
  {
    "id": "strollers-pumpkin-stroller",
    "name": "Pumpkin Stroller",
    "category": "strollers",
    "value": 662.1632,
    "demand": 1,
    "image": "images/strollers/pumpkin-stroller.webp"
  },
  {
    "id": "pets-glacier-moth",
    "name": "Glacier Moth",
    "category": "pets",
    "value": 862.6721,
    "demand": 2,
    "image": "images/pets/glacier-moth.webp"
  },
  {
    "id": "pets-lavender-dragon",
    "name": "Lavender Dragon",
    "category": "pets",
    "value": 805.244,
    "demand": 2,
    "image": "images/pets/lavender-dragon.webp"
  },
  {
    "id": "strollers-toilet-stroller",
    "name": "Toilet Stroller",
    "category": "strollers",
    "value": 216.2186,
    "demand": 1,
    "image": "images/strollers/toilet-stroller.webp"
  },
  {
    "id": "pets-blossom-snake",
    "name": "Blossom Snake",
    "category": "pets",
    "value": 418.229,
    "demand": 1,
    "image": "images/pets/blossom-snake.webp"
  },
  {
    "id": "vehicles-wood-skateboard",
    "name": "Wood Skateboard",
    "category": "vehicles",
    "value": 670.0518,
    "demand": 1,
    "image": "images/vehicles/wood-skateboard.webp"
  },
  {
    "id": "pets-2025-birthday-butterfly",
    "name": "2025 Birthday Butterfly",
    "category": "pets",
    "value": 171.0387,
    "demand": 1,
    "image": "images/pets/2025-birthday-butterfly.webp"
  },
  {
    "id": "vehicles-halloween-black-ponycycle",
    "name": "Halloween Black Ponycycle",
    "category": "vehicles",
    "value": 538.0725,
    "demand": 1,
    "image": "images/vehicles/halloween-black-ponycycle.webp"
  },
  {
    "id": "pets-gummy-guana",
    "name": "Gummy Guana",
    "category": "pets",
    "value": 92.3872,
    "demand": 1,
    "image": "images/pets/gummy-guana.webp"
  },
  {
    "id": "petwear-ghost-kitty-backpack",
    "name": "Ghost Kitty Backpack",
    "category": "petwear",
    "value": 437.7527,
    "demand": 1,
    "image": "images/petwear/ghost-kitty-backpack.webp"
  },
  {
    "id": "stickers-kappakid-sticker",
    "name": "Kappakid Sticker",
    "category": "stickers",
    "value": 361.113,
    "demand": 1,
    "image": "images/stickers/kappakid-sticker.webp"
  },
  {
    "id": "pets-snow-owl",
    "name": "Snow Owl",
    "category": "pets",
    "value": 675.4067,
    "demand": 2,
    "image": "images/pets/snow-owl.webp"
  },
  {
    "id": "pets-black-marlin",
    "name": "Black Marlin",
    "category": "pets",
    "value": 202.2496,
    "demand": 1,
    "image": "images/pets/black-marlin.webp"
  },
  {
    "id": "food-heart-potion",
    "name": "Heart Potion",
    "category": "food",
    "value": 860.0004,
    "demand": 2,
    "image": "images/food/heart-potion.webp"
  },
  {
    "id": "pets-chilling-spider",
    "name": "Chilling Spider",
    "category": "pets",
    "value": 294.6338,
    "demand": 1,
    "image": "images/pets/chilling-spider.webp"
  },
  {
    "id": "pets-munchkin-cat",
    "name": "Munchkin Cat",
    "category": "pets",
    "value": 923.8454,
    "demand": 3,
    "image": "images/pets/munchkin-cat.webp"
  },
  {
    "id": "toys-elf-rattle",
    "name": "Elf Rattle",
    "category": "toys",
    "value": 82.7614,
    "demand": 1,
    "image": "images/toys/elf-rattle.webp"
  },
  {
    "id": "pets-bandicoot",
    "name": "Bandicoot",
    "category": "pets",
    "value": 182.2746,
    "demand": 1,
    "image": "images/pets/bandicoot.webp"
  },
  {
    "id": "vehicles-landsailer",
    "name": "Landsailer",
    "category": "vehicles",
    "value": 60.9165,
    "demand": 1,
    "image": "images/vehicles/landsailer.webp"
  },
  {
    "id": "petwear-bat-wings",
    "name": "Bat Wings",
    "category": "petwear",
    "value": 746.9887,
    "demand": 2,
    "image": "images/petwear/bat-wings.webp"
  },
  {
    "id": "pets-mouse",
    "name": "Mouse",
    "category": "pets",
    "value": 3.7483,
    "demand": 1,
    "image": "images/pets/mouse.webp"
  },
  {
    "id": "pets-frostclaw",
    "name": "Frostclaw",
    "category": "pets",
    "value": 569.2897,
    "demand": 1,
    "image": "images/pets/frostclaw.webp"
  },
  {
    "id": "pets-nautilus",
    "name": "Nautilus",
    "category": "pets",
    "value": 566.7928,
    "demand": 1,
    "image": "images/pets/nautilus.webp"
  },
  {
    "id": "toys-reindeer-plush",
    "name": "Reindeer Plush",
    "category": "toys",
    "value": 220.692,
    "demand": 1,
    "image": "images/toys/reindeer-plush.webp"
  },
  {
    "id": "toys-horse-plush",
    "name": "Horse Plush",
    "category": "toys",
    "value": 448.2775,
    "demand": 1,
    "image": "images/toys/horse-plush.webp"
  },
  {
    "id": "pets-ibis",
    "name": "Ibis",
    "category": "pets",
    "value": 279.6526,
    "demand": 1,
    "image": "images/pets/ibis.webp"
  },
  {
    "id": "petwear-pink-hightops",
    "name": "Pink Hightops",
    "category": "petwear",
    "value": 140.5648,
    "demand": 1,
    "image": "images/petwear/pink-hightops.webp"
  },
  {
    "id": "toys-banana-plush",
    "name": "Banana Plush",
    "category": "toys",
    "value": 137.9336,
    "demand": 1,
    "image": "images/toys/banana-plush.webp"
  },
  {
    "id": "toys-duck-balloon",
    "name": "Duck Balloon",
    "category": "toys",
    "value": 103.451,
    "demand": 1,
    "image": "images/toys/duck-balloon.webp"
  },
  {
    "id": "toys-ice-saber",
    "name": "Ice Saber",
    "category": "toys",
    "value": 731.0353,
    "demand": 1,
    "image": "images/toys/ice-saber.webp"
  },
  {
    "id": "vehicles-giant-cheetah-mount",
    "name": "Giant Cheetah Mount",
    "category": "vehicles",
    "value": 979.6955,
    "demand": 2,
    "image": "images/vehicles/giant-cheetah-mount.webp"
  },
  {
    "id": "vehicles-horse-cycle",
    "name": "Horse Cycle",
    "category": "vehicles",
    "value": 883.2491,
    "demand": 2,
    "image": "images/vehicles/horse-cycle.webp"
  },
  {
    "id": "toys-cotton-candy-stand",
    "name": "Cotton Candy Stand",
    "category": "toys",
    "value": 551.7255,
    "demand": 1,
    "image": "images/toys/cotton-candy-stand.webp"
  },
  {
    "id": "pets-fairy-bat-dragon",
    "name": "Fairy Bat Dragon",
    "category": "pets",
    "value": 963.7954,
    "demand": 3,
    "image": "images/pets/fairy-bat-dragon.webp"
  },
  {
    "id": "strollers-high-heel-stroller",
    "name": "High Heel Stroller",
    "category": "strollers",
    "value": 364.8668,
    "demand": 1,
    "image": "images/strollers/high-heel-stroller.webp"
  },
  {
    "id": "toys-blue-boohoo-paint",
    "name": "Blue Boohoo Mega Neon Paint",
    "category": "toys",
    "value": 793.1041,
    "demand": 3,
    "image": "images/toys/blue-boohoo-mega-neon-paint.webp"
  },
  {
    "id": "pets-pudding-cat",
    "name": "Pudding Cat",
    "category": "pets",
    "value": 578.0287,
    "demand": 1,
    "image": "images/pets/pudding-cat.webp"
  },
  {
    "id": "pets-slime",
    "name": "Slime",
    "category": "pets",
    "value": 784.0206,
    "demand": 2,
    "image": "images/pets/slime.webp"
  },
  {
    "id": "pets-albino-bat",
    "name": "Albino Bat",
    "category": "pets",
    "value": 607.9912,
    "demand": 1,
    "image": "images/pets/albino-bat.webp"
  },
  {
    "id": "vehicles-flower-wagon",
    "name": "Flower Wagon",
    "category": "vehicles",
    "value": 456.8544,
    "demand": 1,
    "image": "images/vehicles/flower-wagon.webp"
  },
  {
    "id": "vehicles-blue-snowboard",
    "name": "Blue Snowboard",
    "category": "vehicles",
    "value": 497.4634,
    "demand": 1,
    "image": "images/vehicles/blue-snowboard.webp"
  },
  {
    "id": "pets-starmite",
    "name": "Starmite",
    "category": "pets",
    "value": 283.3979,
    "demand": 1,
    "image": "images/pets/starmite.webp"
  },
  {
    "id": "pets-poodle",
    "name": "Poodle",
    "category": "pets",
    "value": 7.4936,
    "demand": 1,
    "image": "images/pets/poodle.webp"
  },
  {
    "id": "stickers-parrot-sticker",
    "name": "Parrot Sticker",
    "category": "stickers",
    "value": 805.5561,
    "demand": 1,
    "image": "images/stickers/parrot-sticker.webp"
  },
  {
    "id": "pets-dugong",
    "name": "Dugong",
    "category": "pets",
    "value": 309.6151,
    "demand": 1,
    "image": "images/pets/dugong.webp"
  },
  {
    "id": "petwear-rb-battles-trophy-hat",
    "name": "RB Battles Trophy Hat",
    "category": "petwear",
    "value": 112.4525,
    "demand": 1,
    "image": "images/petwear/rb-battles-trophy-hat.webp"
  },
  {
    "id": "gifts-aberdeen-angus-box",
    "name": "Aberdeen Angus Box",
    "category": "gifts",
    "value": 97.5637,
    "demand": 1,
    "image": "images/gifts/aberdeen-angus-box.webp"
  },
  {
    "id": "potions-big-brew-potion",
    "name": "Big Brew Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-peppermint-penguin",
    "name": "Peppermint Penguin",
    "category": "pets",
    "value": 967.5407,
    "demand": 3,
    "image": "images/pets/peppermint-penguin.webp"
  },
  {
    "id": "toys-candyfloss-paint",
    "name": "Candyfloss Mega Neon Paint",
    "category": "toys",
    "value": 744.8284,
    "demand": 3,
    "image": "images/toys/candyfloss-mega-neon-paint.webp"
  },
  {
    "id": "pets-brownchested-pheasant",
    "name": "Brown-Chested Pheasant",
    "category": "pets",
    "value": 383.2728,
    "demand": 1,
    "image": "images/pets/brown-chested-pheasant.webp"
  },
  {
    "id": "strollers-droplet-stroller",
    "name": "Droplet Stroller",
    "category": "strollers",
    "value": 337.8398,
    "demand": 1,
    "image": "images/strollers/droplet-stroller.webp"
  },
  {
    "id": "pets-sloth",
    "name": "Sloth",
    "category": "pets",
    "value": 524.346,
    "demand": 1,
    "image": "images/pets/sloth.webp"
  },
  {
    "id": "petwear-flower-wings",
    "name": "Flower Wings",
    "category": "petwear",
    "value": 598.3948,
    "demand": 1,
    "image": "images/petwear/flower-wings.webp"
  },
  {
    "id": "stickers-soulfire-animated-sticker",
    "name": "Soulfire Animated Sticker",
    "category": "stickers",
    "value": 564.8161,
    "demand": 1,
    "image": "images/stickers/soulfire-animated-sticker.webp"
  },
  {
    "id": "pets-firefighter-gibbon",
    "name": "Firefighter Gibbon",
    "category": "pets",
    "value": 394.5087,
    "demand": 1,
    "image": "images/pets/firefighter-gibbon.webp"
  },
  {
    "id": "vehicles-ice-snowboard",
    "name": "Ice Snowboard",
    "category": "vehicles",
    "value": 954.3149,
    "demand": 1,
    "image": "images/vehicles/ice-snowboard.webp"
  },
  {
    "id": "toys-amethyst-skies-paint",
    "name": "Amethyst Skies Mega Neon Paint",
    "category": "toys",
    "value": 613.7943,
    "demand": 3,
    "image": "images/toys/amethyst-skies-mega-neon-paint.webp"
  },
  {
    "id": "eggs-pet-egg",
    "name": "Pet Egg",
    "category": "eggs",
    "value": 71.4314,
    "demand": 1,
    "image": "images/eggs/pet-egg.webp"
  },
  {
    "id": "pets-shrew",
    "name": "Shrew",
    "category": "pets",
    "value": 875.1564,
    "demand": 2,
    "image": "images/pets/shrew.webp"
  },
  {
    "id": "food-kitty-biscuit",
    "name": "Kitty Biscuit",
    "category": "food",
    "value": 300.0021,
    "demand": 2,
    "image": "images/food/kitty-biscuit.webp"
  },
  {
    "id": "pets-lava-wolf",
    "name": "Lava Wolf",
    "category": "pets",
    "value": 794.0081,
    "demand": 2,
    "image": "images/pets/lava-wolf.webp"
  },
  {
    "id": "vehicles-orange-scooter",
    "name": "Neon Orange Scooter",
    "category": "vehicles",
    "value": 807.1072,
    "demand": 1,
    "image": "images/vehicles/neon-orange-scooter.webp"
  },
  {
    "id": "vehicles-prehistoric-car",
    "name": "Prehistoric Car",
    "category": "vehicles",
    "value": 604.0621,
    "demand": 1,
    "image": "images/vehicles/prehistoric-car.webp"
  },
  {
    "id": "toys-slimingo-feather-teleporter",
    "name": "Slimingo Feather Teleporter",
    "category": "toys",
    "value": 351.7261,
    "demand": 2,
    "image": "images/toys/slimingo-feather-teleporter.webp"
  },
  {
    "id": "pets-bush-elephant",
    "name": "Bush Elephant",
    "category": "pets",
    "value": 941.3235,
    "demand": 2,
    "image": "images/pets/bush-elephant.webp"
  },
  {
    "id": "eggs-moon-egg",
    "name": "Moon Egg",
    "category": "eggs",
    "value": 261.907,
    "demand": 1,
    "image": "images/eggs/moon-egg.webp"
  },
  {
    "id": "stickers-sakura-spirit-sticker",
    "name": "Sakura Spirit Sticker",
    "category": "stickers",
    "value": 212.9653,
    "demand": 1,
    "image": "images/stickers/sakura-spirit-sticker.webp"
  },
  {
    "id": "petwear-yellow-designer-backpack",
    "name": "Yellow Designer Backpack",
    "category": "petwear",
    "value": 0.003,
    "demand": 1,
    "image": "images/petwear/yellow-designer-backpack.webp"
  },
  {
    "id": "pets-shoebill",
    "name": "Shoebill",
    "category": "pets",
    "value": 97.381,
    "demand": 1,
    "image": "images/pets/shoebill.webp"
  },
  {
    "id": "food-apet-potion",
    "name": "Ride-A-Pet Potion",
    "category": "food",
    "value": 580.0013,
    "demand": 3,
    "image": "images/food/ride-a-pet-potion.webp"
  },
  {
    "id": "pets-possum",
    "name": "Possum",
    "category": "pets",
    "value": 314.6088,
    "demand": 1,
    "image": "images/pets/possum.webp"
  },
  {
    "id": "pets-dracula-parrot",
    "name": "Dracula Parrot",
    "category": "pets",
    "value": 489.3898,
    "demand": 1,
    "image": "images/pets/dracula-parrot.webp"
  },
  {
    "id": "eggs-throwback-egg",
    "name": "Throwback Egg",
    "category": "eggs",
    "value": 47.6219,
    "demand": 1,
    "image": "images/eggs/throwback-egg.webp"
  },
  {
    "id": "pets-kelp-crewmate",
    "name": "Kelp Crewmate",
    "category": "pets",
    "value": 219.7277,
    "demand": 1,
    "image": "images/pets/kelp-crewmate.webp"
  },
  {
    "id": "vehicles-gokart",
    "name": "GoKart",
    "category": "vehicles",
    "value": 928.9342,
    "demand": 2,
    "image": "images/vehicles/gokart.webp"
  },
  {
    "id": "pets-electric-hornet",
    "name": "Electric Hornet",
    "category": "pets",
    "value": 332.0869,
    "demand": 1,
    "image": "images/pets/electric-hornet.webp"
  },
  {
    "id": "food-super-ageup-potion",
    "name": "Super Age-Up Potion",
    "category": "food",
    "value": 840.0005,
    "demand": 2,
    "image": "images/food/super-age-up-potion.webp"
  },
  {
    "id": "pets-magma-snail",
    "name": "Magma Snail",
    "category": "pets",
    "value": 464.4211,
    "demand": 1,
    "image": "images/pets/magma-snail.webp"
  },
  {
    "id": "gifts-golden-gift",
    "name": "Golden Gift",
    "category": "gifts",
    "value": 1000.0,
    "demand": 2,
    "image": "images/gifts/golden-gift.webp"
  },
  {
    "id": "food-golden-plantain",
    "name": "Golden Plantain",
    "category": "food",
    "value": 340.002,
    "demand": 2,
    "image": "images/food/golden-plantain.webp"
  },
  {
    "id": "stickers-candyfloss-chick-sticker",
    "name": "Candyfloss Chick Sticker",
    "category": "stickers",
    "value": 425.9276,
    "demand": 1,
    "image": "images/stickers/candyfloss-chick-sticker.webp"
  },
  {
    "id": "pets-highland-cow",
    "name": "Highland Cow",
    "category": "pets",
    "value": 579.2772,
    "demand": 1,
    "image": "images/pets/highland-cow.webp"
  },
  {
    "id": "pets-golden-walrus",
    "name": "Golden Walrus",
    "category": "pets",
    "value": 715.3567,
    "demand": 2,
    "image": "images/pets/golden-walrus.webp"
  },
  {
    "id": "pets-dimension-drifter",
    "name": "Dimension Drifter",
    "category": "pets",
    "value": 555.5569,
    "demand": 1,
    "image": "images/pets/dimension-drifter.webp"
  },
  {
    "id": "pets-hippogriff",
    "name": "Hippogriff",
    "category": "pets",
    "value": 662.9224,
    "demand": 1,
    "image": "images/pets/hippogriff.webp"
  },
  {
    "id": "pets-punk-pony",
    "name": "Punk Pony",
    "category": "pets",
    "value": 505.6195,
    "demand": 1,
    "image": "images/pets/punk-pony.webp"
  },
  {
    "id": "pets-frost-fury",
    "name": "Frost Fury",
    "category": "pets",
    "value": 873.908,
    "demand": 3,
    "image": "images/pets/frost-fury.webp"
  },
  {
    "id": "toys-hotdog-stand",
    "name": "Hotdog Stand",
    "category": "toys",
    "value": 262.0712,
    "demand": 1,
    "image": "images/toys/hotdog-stand.webp"
  },
  {
    "id": "pets-ringtailed-lemur",
    "name": "Ring-Tailed Lemur",
    "category": "pets",
    "value": 860.1752,
    "demand": 2,
    "image": "images/pets/ring-tailed-lemur.webp"
  },
  {
    "id": "pets-primal-kaijunior",
    "name": "Primal Kaijunior",
    "category": "pets",
    "value": 570.5381,
    "demand": 1,
    "image": "images/pets/primal-kaijunior.webp"
  },
  {
    "id": "pets-pupcake",
    "name": "Pupcake",
    "category": "pets",
    "value": 605.4943,
    "demand": 2,
    "image": "images/pets/pupcake.webp"
  },
  {
    "id": "pets-metal-ox",
    "name": "Metal Ox",
    "category": "pets",
    "value": 474.4086,
    "demand": 1,
    "image": "images/pets/metal-ox.webp"
  },
  {
    "id": "strollers-halloween-black-witch-hat-stroller",
    "name": "Halloween Black Witch Hat Stroller",
    "category": "strollers",
    "value": 351.3533,
    "demand": 1,
    "image": "images/strollers/halloween-black-witch-hat-stroller.webp"
  },
  {
    "id": "petwear-energy-aura-feet",
    "name": "Energy Aura Feet",
    "category": "petwear",
    "value": 481.9293,
    "demand": 2,
    "image": "images/petwear/energy-aura-feet.webp"
  },
  {
    "id": "stickers-phantom-dragon-sticker",
    "name": "Phantom Dragon Sticker",
    "category": "stickers",
    "value": 111.1138,
    "demand": 1,
    "image": "images/stickers/phantom-dragon-sticker.webp"
  },
  {
    "id": "pets-crimson-cape",
    "name": "Crimson Cape",
    "category": "pets",
    "value": 107.3685,
    "demand": 1,
    "image": "images/pets/crimson-cape.webp"
  },
  {
    "id": "pets-wild-boar",
    "name": "Wild Boar",
    "category": "pets",
    "value": 726.5926,
    "demand": 2,
    "image": "images/pets/wild-boar.webp"
  },
  {
    "id": "gifts-kelp-raider-box",
    "name": "Kelp Raider Box",
    "category": "gifts",
    "value": 268.2949,
    "demand": 1,
    "image": "images/gifts/kelp-raider-box.webp"
  },
  {
    "id": "pets-snow-cat",
    "name": "Snow Cat",
    "category": "pets",
    "value": 13.7358,
    "demand": 1,
    "image": "images/pets/snow-cat.webp"
  },
  {
    "id": "petwear-strawberry-hat",
    "name": "Strawberry Hat",
    "category": "petwear",
    "value": 751.0048,
    "demand": 2,
    "image": "images/petwear/strawberry-hat.webp"
  },
  {
    "id": "pets-grim-dragon",
    "name": "Grim Dragon",
    "category": "pets",
    "value": 953.8079,
    "demand": 2,
    "image": "images/pets/grim-dragon.webp"
  },
  {
    "id": "petwear-elf-bandana",
    "name": "Elf Bandana",
    "category": "petwear",
    "value": 188.7575,
    "demand": 1,
    "image": "images/petwear/elf-bandana.webp"
  },
  {
    "id": "pets-angus-calf",
    "name": "Angus Calf",
    "category": "pets",
    "value": 138.5794,
    "demand": 1,
    "image": "images/pets/angus-calf.webp"
  },
  {
    "id": "pets-dimorphodon",
    "name": "Dimorphodon",
    "category": "pets",
    "value": 641.699,
    "demand": 1,
    "image": "images/pets/dimorphodon.webp"
  },
  {
    "id": "pets-ornate-horned-frog",
    "name": "Ornate Horned Frog",
    "category": "pets",
    "value": 415.7321,
    "demand": 1,
    "image": "images/pets/ornate-horned-frog.webp"
  },
  {
    "id": "pets-winged-tiger",
    "name": "Winged Tiger",
    "category": "pets",
    "value": 928.8392,
    "demand": 2,
    "image": "images/pets/winged-tiger.webp"
  },
  {
    "id": "pets-ice-moth-dragon",
    "name": "Ice Moth Dragon",
    "category": "pets",
    "value": 544.321,
    "demand": 1,
    "image": "images/pets/ice-moth-dragon.webp"
  },
  {
    "id": "stickers-peppermint-penguin-sticker",
    "name": "Peppermint Penguin Sticker",
    "category": "stickers",
    "value": 537.0384,
    "demand": 1,
    "image": "images/stickers/peppermint-penguin-sticker.webp"
  },
  {
    "id": "vehicles-red-scooter",
    "name": "Neon Red Scooter",
    "category": "vehicles",
    "value": 766.4982,
    "demand": 1,
    "image": "images/vehicles/neon-red-scooter.webp"
  },
  {
    "id": "pets-hammerhead-shark",
    "name": "Hammerhead Shark",
    "category": "pets",
    "value": 212.2371,
    "demand": 1,
    "image": "images/pets/hammerhead-shark.webp"
  },
  {
    "id": "pets-fennec-fox",
    "name": "Fennec Fox",
    "category": "pets",
    "value": 8.742,
    "demand": 1,
    "image": "images/pets/fennec-fox.webp"
  },
  {
    "id": "pets-red-sand-dollar",
    "name": "Red Sand Dollar",
    "category": "pets",
    "value": 712.8598,
    "demand": 2,
    "image": "images/pets/red-sand-dollar.webp"
  },
  {
    "id": "petwear-witch-hat",
    "name": "Witch Hat",
    "category": "petwear",
    "value": 638.5553,
    "demand": 1,
    "image": "images/petwear/witch-hat.webp"
  },
  {
    "id": "vehicles-sunshine-chariot",
    "name": "Sunshine Chariot",
    "category": "vehicles",
    "value": 197.9719,
    "demand": 1,
    "image": "images/vehicles/sunshine-chariot.webp"
  },
  {
    "id": "petwear-ghost-hat",
    "name": "Ghost Hat",
    "category": "petwear",
    "value": 52.2117,
    "demand": 1,
    "image": "images/petwear/ghost-hat.webp"
  },
  {
    "id": "pets-island-tarsier",
    "name": "Island Tarsier",
    "category": "pets",
    "value": 192.2621,
    "demand": 1,
    "image": "images/pets/island-tarsier.webp"
  },
  {
    "id": "vehicles-pumpkin-carriage",
    "name": "Pumpkin Carriage",
    "category": "vehicles",
    "value": 710.6608,
    "demand": 1,
    "image": "images/vehicles/pumpkin-carriage.webp"
  },
  {
    "id": "stickers-christmas-dog-sticker",
    "name": "Christmas Dog Sticker",
    "category": "stickers",
    "value": 240.743,
    "demand": 1,
    "image": "images/stickers/christmas-dog-sticker.webp"
  },
  {
    "id": "eggs-diamond-egg",
    "name": "Diamond Egg",
    "category": "eggs",
    "value": 476.192,
    "demand": 1,
    "image": "images/eggs/diamond-egg.webp"
  },
  {
    "id": "petwear-watermelon-backpack",
    "name": "Watermelon Backpack",
    "category": "petwear",
    "value": 325.3032,
    "demand": 1,
    "image": "images/petwear/watermelon-backpack.webp"
  },
  {
    "id": "vehicles-rgb-ufo",
    "name": "RGB UFO",
    "category": "vehicles",
    "value": 131.9823,
    "demand": 1,
    "image": "images/vehicles/rgb-ufo.webp"
  },
  {
    "id": "pets-dj-snooze",
    "name": "DJ Snooze",
    "category": "pets",
    "value": 323.3478,
    "demand": 1,
    "image": "images/pets/dj-snooze.webp"
  },
  {
    "id": "pets-amami-rabbit",
    "name": "Amami Rabbit",
    "category": "pets",
    "value": 635.4568,
    "demand": 2,
    "image": "images/pets/amami-rabbit.webp"
  },
  {
    "id": "pets-vulture",
    "name": "Vulture",
    "category": "pets",
    "value": 440.7008,
    "demand": 1,
    "image": "images/pets/vulture.webp"
  },
  {
    "id": "vehicles-duck-scooter",
    "name": "Duck Scooter",
    "category": "vehicles",
    "value": 543.1486,
    "demand": 1,
    "image": "images/vehicles/duck-scooter.webp"
  },
  {
    "id": "petwear-ponytail",
    "name": "Ponytail",
    "category": "petwear",
    "value": 453.8169,
    "demand": 1,
    "image": "images/petwear/ponytail.webp"
  },
  {
    "id": "petwear-halloween-evil-barrel-backpack",
    "name": "Halloween Evil Barrel Backpack",
    "category": "petwear",
    "value": 289.1588,
    "demand": 1,
    "image": "images/petwear/halloween-evil-barrel-backpack.webp"
  },
  {
    "id": "toys-flying-broomstick",
    "name": "Flying Broomstick",
    "category": "toys",
    "value": 993.1035,
    "demand": 2,
    "image": "images/toys/flying-broomstick.webp"
  },
  {
    "id": "toys-kangaroo-pogo",
    "name": "Kangaroo Pogo",
    "category": "toys",
    "value": 68.9683,
    "demand": 1,
    "image": "images/toys/kangaroo-pogo.webp"
  },
  {
    "id": "potions-bonus-aging-potion",
    "name": "Bonus Aging Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-shark-swimcap",
    "name": "Shark Swimcap",
    "category": "petwear",
    "value": 361.4477,
    "demand": 1,
    "image": "images/petwear/shark-swimcap.webp"
  },
  {
    "id": "vehicles-ice-plane",
    "name": "Ice Plane",
    "category": "vehicles",
    "value": 588.8337,
    "demand": 1,
    "image": "images/vehicles/ice-plane.webp"
  },
  {
    "id": "pets-golden-penguin",
    "name": "Golden Penguin",
    "category": "pets",
    "value": 774.0331,
    "demand": 2,
    "image": "images/pets/golden-penguin.webp"
  },
  {
    "id": "pets-sugar-axolotl",
    "name": "Sugar Axolotl",
    "category": "pets",
    "value": 915.1064,
    "demand": 2,
    "image": "images/pets/sugar-axolotl.webp"
  },
  {
    "id": "pets-steppe-lion",
    "name": "Steppe Lion",
    "category": "pets",
    "value": 423.2227,
    "demand": 1,
    "image": "images/pets/steppe-lion.webp"
  },
  {
    "id": "pets-rhino-beetle",
    "name": "Rhino Beetle",
    "category": "pets",
    "value": 250.9386,
    "demand": 1,
    "image": "images/pets/rhino-beetle.webp"
  },
  {
    "id": "petwear-strawberry-shortcake-bat-dragon-backpack",
    "name": "Strawberry Shortcake Bat Dragon Backpack",
    "category": "petwear",
    "value": 899.5987,
    "demand": 2,
    "image": "images/petwear/strawberry-shortcake-bat-dragon-backpack.webp"
  },
  {
    "id": "pets-ostrich",
    "name": "Ostrich",
    "category": "pets",
    "value": 513.1101,
    "demand": 1,
    "image": "images/pets/ostrich.webp"
  },
  {
    "id": "pets-giraffe",
    "name": "Giraffe",
    "category": "pets",
    "value": 998.7516,
    "demand": 3,
    "image": "images/pets/giraffe.webp"
  },
  {
    "id": "pets-red-panda",
    "name": "Red Panda",
    "category": "pets",
    "value": 124.8466,
    "demand": 1,
    "image": "images/pets/red-panda.webp"
  },
  {
    "id": "pets-ram",
    "name": "Ram",
    "category": "pets",
    "value": 752.8097,
    "demand": 2,
    "image": "images/pets/ram.webp"
  },
  {
    "id": "pets-sakura-spirit",
    "name": "Sakura Spirit",
    "category": "pets",
    "value": 882.647,
    "demand": 2,
    "image": "images/pets/sakura-spirit.webp"
  },
  {
    "id": "petwear-grinder-hat",
    "name": "Grinder Hat",
    "category": "petwear",
    "value": 405.6243,
    "demand": 1,
    "image": "images/petwear/grinder-hat.webp"
  },
  {
    "id": "pets-crab",
    "name": "Crab",
    "category": "pets",
    "value": 229.7152,
    "demand": 1,
    "image": "images/pets/crab.webp"
  },
  {
    "id": "pets-sea-skeleton-panda",
    "name": "Sea Skeleton Panda",
    "category": "pets",
    "value": 209.7402,
    "demand": 1,
    "image": "images/pets/sea-skeleton-panda.webp"
  },
  {
    "id": "toys-donut-throw-toy",
    "name": "Donut Throw Toy",
    "category": "toys",
    "value": 579.3116,
    "demand": 1,
    "image": "images/toys/donut-throw-toy.webp"
  },
  {
    "id": "petwear-yellow-instant-camera",
    "name": "Yellow Instant Camera",
    "category": "petwear",
    "value": 341.3674,
    "demand": 2,
    "image": "images/petwear/yellow-instant-camera.webp"
  },
  {
    "id": "petwear-2022-birthday-party-horn",
    "name": "2022 Birthday Party Horn",
    "category": "petwear",
    "value": 923.695,
    "demand": 3,
    "image": "images/petwear/2022-birthday-party-horn.webp"
  },
  {
    "id": "vehicles-stocked-santa-sleigh",
    "name": "Stocked Santa Sleigh",
    "category": "vehicles",
    "value": 15.2314,
    "demand": 1,
    "image": "images/vehicles/stocked-santa-sleigh.webp"
  },
  {
    "id": "pets-sandfish",
    "name": "Sandfish",
    "category": "pets",
    "value": 149.8153,
    "demand": 1,
    "image": "images/pets/sandfish.webp"
  },
  {
    "id": "potions-home-potion",
    "name": "Home Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-flower-cart-stroller",
    "name": "Flower Cart Stroller",
    "category": "strollers",
    "value": 202.7051,
    "demand": 1,
    "image": "images/strollers/flower-cart-stroller.webp"
  },
  {
    "id": "pets-woolly-mammoth",
    "name": "Woolly Mammoth",
    "category": "pets",
    "value": 380.7759,
    "demand": 1,
    "image": "images/pets/woolly-mammoth.webp"
  },
  {
    "id": "pets-robo-dog",
    "name": "Robo Dog",
    "category": "pets",
    "value": 647.9411,
    "demand": 1,
    "image": "images/pets/robo-dog.webp"
  },
  {
    "id": "pets-crow",
    "name": "Crow",
    "category": "pets",
    "value": 993.7578,
    "demand": 3,
    "image": "images/pets/crow.webp"
  },
  {
    "id": "eggs-gemstone-egg",
    "name": "Gemstone Egg",
    "category": "eggs",
    "value": 452.3826,
    "demand": 2,
    "image": "images/eggs/gemstone-egg.webp"
  },
  {
    "id": "pets-albino-gorilla",
    "name": "Albino Gorilla",
    "category": "pets",
    "value": 808.9893,
    "demand": 2,
    "image": "images/pets/albino-gorilla.webp"
  },
  {
    "id": "pets-ghost-bunny",
    "name": "Ghost Bunny",
    "category": "pets",
    "value": 730.3379,
    "demand": 2,
    "image": "images/pets/ghost-bunny.webp"
  },
  {
    "id": "vehicles-white-skateboard",
    "name": "White Skateboard",
    "category": "vehicles",
    "value": 568.5292,
    "demand": 1,
    "image": "images/vehicles/white-skateboard.webp"
  },
  {
    "id": "pets-cattuccino",
    "name": "Cattuccino",
    "category": "pets",
    "value": 289.6401,
    "demand": 2,
    "image": "images/pets/cattuccino.webp"
  },
  {
    "id": "pets-giant-panda",
    "name": "Giant Panda",
    "category": "pets",
    "value": 991.261,
    "demand": 2,
    "image": "images/pets/giant-panda.webp"
  },
  {
    "id": "vehicles-white-scooter",
    "name": "White Scooter",
    "category": "vehicles",
    "value": 507.6157,
    "demand": 1,
    "image": "images/vehicles/white-scooter.webp"
  },
  {
    "id": "stickers-trex-sticker",
    "name": "T-Rex Sticker",
    "category": "stickers",
    "value": 175.9284,
    "demand": 1,
    "image": "images/stickers/t-rex-sticker.webp"
  },
  {
    "id": "petwear-mule-baskets",
    "name": "Mule Baskets",
    "category": "petwear",
    "value": 212.8538,
    "demand": 1,
    "image": "images/petwear/mule-baskets.webp"
  },
  {
    "id": "gifts-walrus-box",
    "name": "Walrus Box",
    "category": "gifts",
    "value": 658.5376,
    "demand": 2,
    "image": "images/gifts/walrus-box.webp"
  },
  {
    "id": "pets-rodeo-bull",
    "name": "Rodeo Bull",
    "category": "pets",
    "value": 227.2183,
    "demand": 1,
    "image": "images/pets/rodeo-bull.webp"
  },
  {
    "id": "vehicles-roblox-snowboard",
    "name": "Roblox Snowboard",
    "category": "vehicles",
    "value": 959.391,
    "demand": 1,
    "image": "images/vehicles/roblox-snowboard.webp"
  },
  {
    "id": "vehicles-bee-shuttle",
    "name": "Bee Shuttle",
    "category": "vehicles",
    "value": 269.0377,
    "demand": 1,
    "image": "images/vehicles/bee-shuttle.webp"
  },
  {
    "id": "gifts-rat-box",
    "name": "Rat Box",
    "category": "gifts",
    "value": 951.2197,
    "demand": 2,
    "image": "images/gifts/rat-box.webp"
  },
  {
    "id": "stickers-frostbite-bear-and-cub-animated-sticker",
    "name": "Frostbite Bear and Cub Animated Sticker",
    "category": "stickers",
    "value": 833.3338,
    "demand": 1,
    "image": "images/stickers/frostbite-bear-and-cub-animated-sticker.webp"
  },
  {
    "id": "pets-rattlesnake",
    "name": "Rattlesnake",
    "category": "pets",
    "value": 235.9573,
    "demand": 1,
    "image": "images/pets/rattlesnake.webp"
  },
  {
    "id": "pets-merry-mistletroll",
    "name": "Merry Mistletroll",
    "category": "pets",
    "value": 538.0788,
    "demand": 1,
    "image": "images/pets/merry-mistletroll.webp"
  },
  {
    "id": "gifts-scarecrow-box",
    "name": "Scarecrow Box",
    "category": "gifts",
    "value": 560.9769,
    "demand": 2,
    "image": "images/gifts/scarecrow-box.webp"
  },
  {
    "id": "pets-turkey",
    "name": "Turkey",
    "category": "pets",
    "value": 789.0144,
    "demand": 2,
    "image": "images/pets/turkey.webp"
  },
  {
    "id": "pets-billy-goat",
    "name": "Billy Goat",
    "category": "pets",
    "value": 634.2083,
    "demand": 1,
    "image": "images/pets/billy-goat.webp"
  },
  {
    "id": "pets-mecha-meow",
    "name": "Mecha Meow",
    "category": "pets",
    "value": 637.9536,
    "demand": 1,
    "image": "images/pets/mecha-meow.webp"
  },
  {
    "id": "pets-hyena",
    "name": "Hyena",
    "category": "pets",
    "value": 845.194,
    "demand": 2,
    "image": "images/pets/hyena.webp"
  },
  {
    "id": "pets-toy-poodle",
    "name": "Toy Poodle",
    "category": "pets",
    "value": 469.4148,
    "demand": 1,
    "image": "images/pets/toy-poodle.webp"
  },
  {
    "id": "toys-carrot-rattle",
    "name": "Carrot Rattle",
    "category": "toys",
    "value": 234.4851,
    "demand": 1,
    "image": "images/toys/carrot-rattle.webp"
  },
  {
    "id": "stickers-super-saru-animated-sticker",
    "name": "Super Saru Animated Sticker",
    "category": "stickers",
    "value": 953.7038,
    "demand": 2,
    "image": "images/stickers/super-saru-animated-sticker.webp"
  },
  {
    "id": "toys-marshmallow-stand",
    "name": "Marshmallow Stand",
    "category": "toys",
    "value": 455.174,
    "demand": 1,
    "image": "images/toys/marshmallow-stand.webp"
  },
  {
    "id": "pets-mongoose",
    "name": "Mongoose",
    "category": "pets",
    "value": 405.7446,
    "demand": 1,
    "image": "images/pets/mongoose.webp"
  },
  {
    "id": "pets-owlbear",
    "name": "Owlbear",
    "category": "pets",
    "value": 857.6783,
    "demand": 2,
    "image": "images/pets/owlbear.webp"
  },
  {
    "id": "vehicles-moped",
    "name": "Moped",
    "category": "vehicles",
    "value": 741.1175,
    "demand": 1,
    "image": "images/vehicles/moped.webp"
  },
  {
    "id": "pets-chocolate-chip-bat-dragon",
    "name": "Chocolate Chip Bat Dragon",
    "category": "pets",
    "value": 976.2797,
    "demand": 3,
    "image": "images/pets/chocolate-chip-bat-dragon.webp"
  },
  {
    "id": "petwear-llamalush-purse-pet",
    "name": "Llamalush Purse Pet",
    "category": "petwear",
    "value": 345.3835,
    "demand": 1,
    "image": "images/petwear/llamalush-purse-pet.webp"
  },
  {
    "id": "gifts-hermit-crab-box",
    "name": "Hermit Crab Box",
    "category": "gifts",
    "value": 634.1474,
    "demand": 2,
    "image": "images/gifts/hermit-crab-box.webp"
  },
  {
    "id": "toys-moon-viewing-bench",
    "name": "Moon Viewing Bench",
    "category": "toys",
    "value": 172.4163,
    "demand": 1,
    "image": "images/toys/moon-viewing-bench.webp"
  },
  {
    "id": "toys-rib-guitar",
    "name": "Rib Guitar",
    "category": "toys",
    "value": 420.6914,
    "demand": 1,
    "image": "images/toys/rib-guitar.webp"
  },
  {
    "id": "pets-flower-power-duckling",
    "name": "Flower Power Duckling",
    "category": "pets",
    "value": 599.2521,
    "demand": 1,
    "image": "images/pets/flower-power-duckling.webp"
  },
  {
    "id": "pets-moonbeam-peacock",
    "name": "Moonbeam Peacock",
    "category": "pets",
    "value": 921.3486,
    "demand": 2,
    "image": "images/pets/moonbeam-peacock.webp"
  },
  {
    "id": "petwear-purple-green-beads",
    "name": "Purple & Green Beads",
    "category": "petwear",
    "value": 16.0672,
    "demand": 1,
    "image": "images/petwear/purple-green-beads.webp"
  },
  {
    "id": "pets-hare",
    "name": "Hare",
    "category": "pets",
    "value": 838.9518,
    "demand": 2,
    "image": "images/pets/hare.webp"
  },
  {
    "id": "stickers-bat-dragon-sticker",
    "name": "Bat Dragon Sticker",
    "category": "stickers",
    "value": 842.5931,
    "demand": 2,
    "image": "images/stickers/bat-dragon-sticker.webp"
  },
  {
    "id": "pets-english-sheepdog",
    "name": "English Sheepdog",
    "category": "pets",
    "value": 686.6426,
    "demand": 2,
    "image": "images/pets/english-sheepdog.webp"
  },
  {
    "id": "strollers-snow-globe-stroller",
    "name": "Snow Globe Stroller",
    "category": "strollers",
    "value": 40.5434,
    "demand": 1,
    "image": "images/strollers/snow-globe-stroller.webp"
  },
  {
    "id": "stickers-grim-dragon-sticker",
    "name": "Grim Dragon Sticker",
    "category": "stickers",
    "value": 148.1507,
    "demand": 1,
    "image": "images/stickers/grim-dragon-sticker.webp"
  },
  {
    "id": "pets-chocolate-chowchow",
    "name": "Chocolate Chow-Chow",
    "category": "pets",
    "value": 657.9286,
    "demand": 1,
    "image": "images/pets/chocolate-chow-chow.webp"
  },
  {
    "id": "pets-strawberry-shortcake-ducky",
    "name": "Strawberry Shortcake Ducky",
    "category": "pets",
    "value": 485.6445,
    "demand": 1,
    "image": "images/pets/strawberry-shortcake-ducky.webp"
  },
  {
    "id": "petwear-city-hat",
    "name": "City Hat",
    "category": "petwear",
    "value": 409.6403,
    "demand": 1,
    "image": "images/petwear/city-hat.webp"
  },
  {
    "id": "pets-cow-calf",
    "name": "Cow Calf",
    "category": "pets",
    "value": 530.5882,
    "demand": 1,
    "image": "images/pets/cow-calf.webp"
  },
  {
    "id": "pets-tanuki",
    "name": "Tanuki",
    "category": "pets",
    "value": 490.6382,
    "demand": 1,
    "image": "images/pets/tanuki.webp"
  },
  {
    "id": "toys-marsh-balloon",
    "name": "Marsh Balloon",
    "category": "toys",
    "value": 158.6232,
    "demand": 1,
    "image": "images/toys/marsh-balloon.webp"
  },
  {
    "id": "pets-camel",
    "name": "Camel",
    "category": "pets",
    "value": 1.2514,
    "demand": 1,
    "image": "images/pets/camel.webp"
  },
  {
    "id": "vehicles-horse-and-carriage",
    "name": "Horse And Carriage",
    "category": "vehicles",
    "value": 923.8581,
    "demand": 2,
    "image": "images/vehicles/horse-and-carriage.webp"
  },
  {
    "id": "petwear-flower-aura",
    "name": "Flower Aura",
    "category": "petwear",
    "value": 297.1909,
    "demand": 1,
    "image": "images/petwear/flower-aura.webp"
  },
  {
    "id": "petwear-candy-cane",
    "name": "Candy Cane (Pet Wear)",
    "category": "petwear",
    "value": 216.8698,
    "demand": 1,
    "image": "images/petwear/candy-cane-pet-wear.webp"
  },
  {
    "id": "food-strawberry-shortcake",
    "name": "Strawberry Shortcake",
    "category": "food",
    "value": 100.0027,
    "demand": 1,
    "image": "images/food/strawberry-shortcake.webp"
  },
  {
    "id": "pets-fossa",
    "name": "Fossa",
    "category": "pets",
    "value": 237.2058,
    "demand": 1,
    "image": "images/pets/fossa.webp"
  },
  {
    "id": "vehicles-doge-scooter",
    "name": "Doge Scooter",
    "category": "vehicles",
    "value": 715.7369,
    "demand": 1,
    "image": "images/vehicles/doge-scooter.webp"
  },
  {
    "id": "pets-river-otter",
    "name": "River Otter",
    "category": "pets",
    "value": 101.1263,
    "demand": 1,
    "image": "images/pets/river-otter.webp"
  },
  {
    "id": "stickers-elephant-sticker",
    "name": "Elephant Sticker",
    "category": "stickers",
    "value": 583.3346,
    "demand": 1,
    "image": "images/stickers/elephant-sticker.webp"
  },
  {
    "id": "pets-partridge",
    "name": "Partridge",
    "category": "pets",
    "value": 510.6132,
    "demand": 1,
    "image": "images/pets/partridge.webp"
  },
  {
    "id": "pets-scarecrow-crow",
    "name": "Scarecrow Crow",
    "category": "pets",
    "value": 609.2396,
    "demand": 1,
    "image": "images/pets/scarecrow-crow.webp"
  },
  {
    "id": "toys-vampire-teeth-grappling-hook",
    "name": "Vampire Teeth Grappling Hook",
    "category": "toys",
    "value": 337.933,
    "demand": 1,
    "image": "images/toys/vampire-teeth-grappling-hook.webp"
  },
  {
    "id": "petwear-sakura-wings",
    "name": "Sakura Wings",
    "category": "petwear",
    "value": 502.0095,
    "demand": 2,
    "image": "images/petwear/sakura-wings.webp"
  },
  {
    "id": "gifts-premium-gibbon-box",
    "name": "Premium Gibbon Box",
    "category": "gifts",
    "value": 804.8786,
    "demand": 2,
    "image": "images/gifts/premium-gibbon-box.webp"
  },
  {
    "id": "vehicles-black-scooter",
    "name": "Black Scooter",
    "category": "vehicles",
    "value": 796.9549,
    "demand": 2,
    "image": "images/vehicles/black-scooter.webp"
  },
  {
    "id": "toys-skeleton-winged-glider",
    "name": "Skeleton Winged Glider",
    "category": "toys",
    "value": 903.4486,
    "demand": 2,
    "image": "images/toys/skeleton-winged-glider.webp"
  },
  {
    "id": "toys-balloons",
    "name": "Balloons",
    "category": "toys",
    "value": 427.5879,
    "demand": 1,
    "image": "images/toys/balloons.webp"
  },
  {
    "id": "petwear-sakura-scythe",
    "name": "Sakura Scythe",
    "category": "petwear",
    "value": 204.8217,
    "demand": 1,
    "image": "images/petwear/sakura-scythe.webp"
  },
  {
    "id": "eggs-royal-desert-egg",
    "name": "Royal Desert Egg",
    "category": "eggs",
    "value": 809.5244,
    "demand": 2,
    "image": "images/eggs/royal-desert-egg.webp"
  },
  {
    "id": "vehicles-chairlift",
    "name": "Chairlift",
    "category": "vehicles",
    "value": 182.7436,
    "demand": 1,
    "image": "images/vehicles/chairlift.webp"
  },
  {
    "id": "pets-dragonfruit-fox",
    "name": "Dragonfruit Fox",
    "category": "pets",
    "value": 826.4674,
    "demand": 2,
    "image": "images/pets/dragonfruit-fox.webp"
  },
  {
    "id": "stickers-kraken-sticker",
    "name": "Kraken Sticker",
    "category": "stickers",
    "value": 64.8176,
    "demand": 1,
    "image": "images/stickers/kraken-sticker.webp"
  },
  {
    "id": "vehicles-festive-deliveries-sleigh",
    "name": "Festive Deliveries Sleigh",
    "category": "vehicles",
    "value": 406.0932,
    "demand": 1,
    "image": "images/vehicles/festive-deliveries-sleigh.webp"
  },
  {
    "id": "vehicles-emoji-scooter",
    "name": "Emoji Scooter",
    "category": "vehicles",
    "value": 619.2905,
    "demand": 1,
    "image": "images/vehicles/emoji-scooter.webp"
  },
  {
    "id": "pets-peahen",
    "name": "Peahen",
    "category": "pets",
    "value": 720.3504,
    "demand": 1,
    "image": "images/pets/peahen.webp"
  },
  {
    "id": "petwear-festive-stocking-shoes",
    "name": "Festive Stocking Shoes",
    "category": "petwear",
    "value": 20.0833,
    "demand": 1,
    "image": "images/petwear/festive-stocking-shoes.webp"
  },
  {
    "id": "pets-cat",
    "name": "Cat",
    "category": "pets",
    "value": 12.4874,
    "demand": 1,
    "image": "images/pets/cat.webp"
  },
  {
    "id": "pets-parrot",
    "name": "Parrot",
    "category": "pets",
    "value": 995.0063,
    "demand": 3,
    "image": "images/pets/parrot.webp"
  },
  {
    "id": "pets-alley-cat",
    "name": "Alley Cat",
    "category": "pets",
    "value": 831.4612,
    "demand": 2,
    "image": "images/pets/alley-cat.webp"
  },
  {
    "id": "strollers-kangaroo-stroller",
    "name": "Kangaroo Stroller",
    "category": "strollers",
    "value": 689.1901,
    "demand": 1,
    "image": "images/strollers/kangaroo-stroller.webp"
  },
  {
    "id": "pets-diamond-amazon",
    "name": "Diamond Amazon",
    "category": "pets",
    "value": 886.3924,
    "demand": 2,
    "image": "images/pets/diamond-amazon.webp"
  },
  {
    "id": "toys-camping-tent",
    "name": "Camping Tent",
    "category": "toys",
    "value": 41.3822,
    "demand": 1,
    "image": "images/toys/camping-tent.webp"
  },
  {
    "id": "pets-golden-rat",
    "name": "Golden Rat",
    "category": "pets",
    "value": 747.816,
    "demand": 2,
    "image": "images/pets/golden-rat.webp"
  },
  {
    "id": "food-golden-dandelion",
    "name": "Golden Dandelion",
    "category": "food",
    "value": 380.0019,
    "demand": 2,
    "image": "images/food/golden-dandelion.webp"
  },
  {
    "id": "pets-cabbit",
    "name": "Cabbit",
    "category": "pets",
    "value": 965.0438,
    "demand": 3,
    "image": "images/pets/cabbit.webp"
  },
  {
    "id": "pets-black-rhino",
    "name": "Black Rhino",
    "category": "pets",
    "value": 31.2139,
    "demand": 1,
    "image": "images/pets/black-rhino.webp"
  },
  {
    "id": "petwear-headband",
    "name": "Headband",
    "category": "petwear",
    "value": 554.2182,
    "demand": 1,
    "image": "images/petwear/headband.webp"
  },
  {
    "id": "toys-rainbow-wand",
    "name": "Rainbow Wand",
    "category": "toys",
    "value": 537.9324,
    "demand": 1,
    "image": "images/toys/rainbow-wand.webp"
  },
  {
    "id": "pets-diamond-griffin",
    "name": "Diamond Griffin",
    "category": "pets",
    "value": 329.59,
    "demand": 1,
    "image": "images/pets/diamond-griffin.webp"
  },
  {
    "id": "strollers-popsicle-stroller",
    "name": "Popsicle Stroller",
    "category": "strollers",
    "value": 743.244,
    "demand": 1,
    "image": "images/strollers/popsicle-stroller.webp"
  },
  {
    "id": "pets-halloween-black-mummy-cat",
    "name": "Halloween Black Mummy Cat",
    "category": "pets",
    "value": 133.5856,
    "demand": 1,
    "image": "images/pets/halloween-black-mummy-cat.webp"
  },
  {
    "id": "strollers-wheelbarrow-stroller",
    "name": "Wheelbarrow Stroller",
    "category": "strollers",
    "value": 567.5689,
    "demand": 1,
    "image": "images/strollers/wheelbarrow-stroller.webp"
  },
  {
    "id": "pets-huntsman-robin",
    "name": "Huntsman Robin",
    "category": "pets",
    "value": 267.1682,
    "demand": 1,
    "image": "images/pets/huntsman-robin.webp"
  },
  {
    "id": "petwear-eaten-donut",
    "name": "Eaten Donut",
    "category": "petwear",
    "value": 224.9019,
    "demand": 1,
    "image": "images/petwear/eaten-donut.webp"
  },
  {
    "id": "pets-rubber-ducky",
    "name": "Rubber Ducky",
    "category": "pets",
    "value": 73.6607,
    "demand": 1,
    "image": "images/pets/rubber-ducky.webp"
  },
  {
    "id": "gifts-poltergeist-box",
    "name": "Poltergeist Box",
    "category": "gifts",
    "value": 73.1735,
    "demand": 1,
    "image": "images/gifts/poltergeist-box.webp"
  },
  {
    "id": "pets-berry-cool-cube",
    "name": "Berry Cool Cube",
    "category": "pets",
    "value": 627.9662,
    "demand": 1,
    "image": "images/pets/berry-cool-cube.webp"
  },
  {
    "id": "pets-tasmanian-devil",
    "name": "Tasmanian Devil",
    "category": "pets",
    "value": 604.2459,
    "demand": 2,
    "image": "images/pets/tasmanian-devil.webp"
  },
  {
    "id": "pets-red-dutch-guinea-pig",
    "name": "Red Dutch Guinea Pig",
    "category": "pets",
    "value": 850.1877,
    "demand": 2,
    "image": "images/pets/red-dutch-guinea-pig.webp"
  },
  {
    "id": "pets-dilophosaurus",
    "name": "Dilophosaurus",
    "category": "pets",
    "value": 368.2915,
    "demand": 1,
    "image": "images/pets/dilophosaurus.webp"
  },
  {
    "id": "pets-shiba-inu",
    "name": "Shiba Inu",
    "category": "pets",
    "value": 103.6232,
    "demand": 1,
    "image": "images/pets/shiba-inu.webp"
  },
  {
    "id": "pets-arctic-reindeer",
    "name": "Arctic Reindeer",
    "category": "pets",
    "value": 978.7766,
    "demand": 3,
    "image": "images/pets/arctic-reindeer.webp"
  },
  {
    "id": "pets-maleo-bird",
    "name": "Maleo Bird",
    "category": "pets",
    "value": 146.07,
    "demand": 1,
    "image": "images/pets/maleo-bird.webp"
  },
  {
    "id": "food-golden-goldfish",
    "name": "Golden Goldfish",
    "category": "food",
    "value": 440.0017,
    "demand": 2,
    "image": "images/food/golden-goldfish.webp"
  },
  {
    "id": "petwear-back-taco",
    "name": "Back Taco",
    "category": "petwear",
    "value": 469.8811,
    "demand": 2,
    "image": "images/petwear/back-taco.webp"
  },
  {
    "id": "gifts-pony-box",
    "name": "Pony Box",
    "category": "gifts",
    "value": 536.5868,
    "demand": 2,
    "image": "images/gifts/pony-box.webp"
  },
  {
    "id": "gifts-ice-tray",
    "name": "Ice Tray",
    "category": "gifts",
    "value": 243.9047,
    "demand": 1,
    "image": "images/gifts/ice-tray.webp"
  },
  {
    "id": "strollers-banana-stroller",
    "name": "Banana Stroller",
    "category": "strollers",
    "value": 608.1093,
    "demand": 1,
    "image": "images/strollers/banana-stroller.webp"
  },
  {
    "id": "pets-border-collie",
    "name": "Border Collie",
    "category": "pets",
    "value": 935.0813,
    "demand": 3,
    "image": "images/pets/border-collie.webp"
  },
  {
    "id": "pets-galapagos-sea-lion",
    "name": "Galapagos Sea Lion",
    "category": "pets",
    "value": 18.7295,
    "demand": 1,
    "image": "images/pets/galapagos-sea-lion.webp"
  },
  {
    "id": "pets-blackfooted-ferret",
    "name": "Black-Footed Ferret",
    "category": "pets",
    "value": 117.356,
    "demand": 1,
    "image": "images/pets/black-footed-ferret.webp"
  },
  {
    "id": "petwear-gold-tiara",
    "name": "Gold Tiara",
    "category": "petwear",
    "value": 92.3722,
    "demand": 1,
    "image": "images/petwear/gold-tiara.webp"
  },
  {
    "id": "vehicles-dino-truck",
    "name": "Dino Truck",
    "category": "vehicles",
    "value": 289.3422,
    "demand": 1,
    "image": "images/vehicles/dino-truck.webp"
  },
  {
    "id": "pets-glormy-dolphin",
    "name": "Glormy Dolphin",
    "category": "pets",
    "value": 534.3335,
    "demand": 1,
    "image": "images/pets/glormy-dolphin.webp"
  },
  {
    "id": "toys-velvet-fuchsia-paint",
    "name": "Velvet Fuchsia Mega Neon Paint",
    "category": "toys",
    "value": 606.8977,
    "demand": 3,
    "image": "images/toys/velvet-fuchsia-mega-neon-paint.webp"
  },
  {
    "id": "pets-ringmaster-gibbon",
    "name": "Ringmaster Gibbon",
    "category": "pets",
    "value": 353.3103,
    "demand": 1,
    "image": "images/pets/ringmaster-gibbon.webp"
  },
  {
    "id": "stickers-jekyll-hydra-animated-sticker",
    "name": "Jekyll Hydra Animated Sticker",
    "category": "stickers",
    "value": 972.2223,
    "demand": 2,
    "image": "images/stickers/jekyll-hydra-animated-sticker.webp"
  },
  {
    "id": "toys-frosty-glow-paint",
    "name": "Frosty Glow Mega Neon Paint",
    "category": "toys",
    "value": 862.0694,
    "demand": 3,
    "image": "images/toys/frosty-glow-mega-neon-paint.webp"
  },
  {
    "id": "pets-musk-ox",
    "name": "Musk Ox",
    "category": "pets",
    "value": 589.2647,
    "demand": 1,
    "image": "images/pets/musk-ox.webp"
  },
  {
    "id": "vehicles-santas-sleigh",
    "name": "Santa's Sleigh",
    "category": "vehicles",
    "value": 385.7886,
    "demand": 1,
    "image": "images/vehicles/santa-s-sleigh.webp"
  },
  {
    "id": "pets-st-bernard",
    "name": "St Bernard",
    "category": "pets",
    "value": 509.3648,
    "demand": 1,
    "image": "images/pets/st-bernard.webp"
  },
  {
    "id": "pets-narwhal",
    "name": "Narwhal",
    "category": "pets",
    "value": 382.0243,
    "demand": 1,
    "image": "images/pets/narwhal.webp"
  },
  {
    "id": "pets-goat",
    "name": "Goat",
    "category": "pets",
    "value": 906.3673,
    "demand": 2,
    "image": "images/pets/goat.webp"
  },
  {
    "id": "stickers-pet-rock-sticker",
    "name": "Pet Rock Sticker",
    "category": "stickers",
    "value": 462.9646,
    "demand": 1,
    "image": "images/stickers/pet-rock-sticker.webp"
  },
  {
    "id": "vehicles-hovercar",
    "name": "Hovercar",
    "category": "vehicles",
    "value": 258.8855,
    "demand": 1,
    "image": "images/vehicles/hovercar.webp"
  },
  {
    "id": "toys-santa-throne",
    "name": "Santa Throne",
    "category": "toys",
    "value": 786.2075,
    "demand": 1,
    "image": "images/toys/santa-throne.webp"
  },
  {
    "id": "pets-copycat",
    "name": "Copycat",
    "category": "pets",
    "value": 881.3986,
    "demand": 2,
    "image": "images/pets/copycat.webp"
  },
  {
    "id": "gifts-2d-box",
    "name": "2D Box",
    "category": "gifts",
    "value": 195.1244,
    "demand": 1,
    "image": "images/gifts/2d-box.webp"
  },
  {
    "id": "food-stripes-egg",
    "name": "Stripes Egg",
    "category": "food",
    "value": 180.0025,
    "demand": 1,
    "image": "images/food/stripes-egg.webp"
  },
  {
    "id": "pets-dolphin",
    "name": "Dolphin",
    "category": "pets",
    "value": 290.8885,
    "demand": 1,
    "image": "images/pets/dolphin.webp"
  },
  {
    "id": "pets-zombie-buffalo",
    "name": "Zombie Buffalo",
    "category": "pets",
    "value": 878.9017,
    "demand": 2,
    "image": "images/pets/zombie-buffalo.webp"
  },
  {
    "id": "pets-cold-cube",
    "name": "Cold Cube",
    "category": "pets",
    "value": 359.5525,
    "demand": 1,
    "image": "images/pets/cold-cube.webp"
  },
  {
    "id": "petwear-head-chef",
    "name": "Head Chef",
    "category": "petwear",
    "value": 891.5666,
    "demand": 2,
    "image": "images/petwear/head-chef.webp"
  },
  {
    "id": "pets-sprout-snail",
    "name": "Sprout Snail",
    "category": "pets",
    "value": 499.3773,
    "demand": 1,
    "image": "images/pets/sprout-snail.webp"
  },
  {
    "id": "vehicles-paint-roller-truck",
    "name": "Paint Roller Truck",
    "category": "vehicles",
    "value": 309.6467,
    "demand": 1,
    "image": "images/vehicles/paint-roller-truck.webp"
  },
  {
    "id": "vehicles-yellow-taxi-cab",
    "name": "Yellow Taxi Cab",
    "category": "vehicles",
    "value": 390.8648,
    "demand": 1,
    "image": "images/vehicles/yellow-taxi-cab.webp"
  },
  {
    "id": "pets-gumball-caterpillar",
    "name": "Gumball Caterpillar",
    "category": "pets",
    "value": 132.3372,
    "demand": 1,
    "image": "images/pets/gumball-caterpillar.webp"
  },
  {
    "id": "pets-evil-chick",
    "name": "Evil Chick",
    "category": "pets",
    "value": 529.3397,
    "demand": 1,
    "image": "images/pets/evil-chick.webp"
  },
  {
    "id": "pets-emperor-shrimp",
    "name": "Emperor Shrimp",
    "category": "pets",
    "value": 214.7339,
    "demand": 1,
    "image": "images/pets/emperor-shrimp.webp"
  },
  {
    "id": "pets-frozen-penguin",
    "name": "Frozen Penguin",
    "category": "pets",
    "value": 141.0762,
    "demand": 1,
    "image": "images/pets/frozen-penguin.webp"
  },
  {
    "id": "pets-bird-of-paradise",
    "name": "Bird of Paradise",
    "category": "pets",
    "value": 414.4837,
    "demand": 1,
    "image": "images/pets/bird-of-paradise.webp"
  },
  {
    "id": "pets-rose-dragon",
    "name": "Rose Dragon",
    "category": "pets",
    "value": 843.9455,
    "demand": 2,
    "image": "images/pets/rose-dragon.webp"
  },
  {
    "id": "pets-platypus",
    "name": "Platypus",
    "category": "pets",
    "value": 841.4487,
    "demand": 2,
    "image": "images/pets/platypus.webp"
  },
  {
    "id": "pets-rainbow-trout",
    "name": "Rainbow Trout",
    "category": "pets",
    "value": 96.1325,
    "demand": 1,
    "image": "images/pets/rainbow-trout.webp"
  },
  {
    "id": "pets-golden-griffin",
    "name": "Golden Griffin",
    "category": "pets",
    "value": 258.4292,
    "demand": 1,
    "image": "images/pets/golden-griffin.webp"
  },
  {
    "id": "petwear-eco-brown-earthwizard-hat",
    "name": "Eco Brown Earth-Wizard Hat",
    "category": "petwear",
    "value": 759.0369,
    "demand": 2,
    "image": "images/petwear/eco-brown-earth-wizard-hat.webp"
  },
  {
    "id": "pets-evil-chickatrice",
    "name": "Evil Chickatrice",
    "category": "pets",
    "value": 560.5506,
    "demand": 1,
    "image": "images/pets/evil-chickatrice.webp"
  },
  {
    "id": "strollers-crate-stroller",
    "name": "Crate Stroller",
    "category": "strollers",
    "value": 0.003,
    "demand": 1,
    "image": "images/strollers/crate-stroller.webp"
  },
  {
    "id": "petwear-rubber-ducks",
    "name": "Rubber Ducks",
    "category": "petwear",
    "value": 473.8972,
    "demand": 1,
    "image": "images/petwear/rubber-ducks.webp"
  },
  {
    "id": "pets-dog",
    "name": "Dog",
    "category": "pets",
    "value": 14.9842,
    "demand": 1,
    "image": "images/pets/dog.webp"
  },
  {
    "id": "pets-moon-rabbit",
    "name": "Moon Rabbit",
    "category": "pets",
    "value": 671.6614,
    "demand": 2,
    "image": "images/pets/moon-rabbit.webp"
  },
  {
    "id": "gifts-lunar-new-year-gift-box",
    "name": "Lunar New Year Gift Box",
    "category": "gifts",
    "value": 341.4654,
    "demand": 2,
    "image": "images/gifts/lunar-new-year-gift-box.webp"
  },
  {
    "id": "toys-rose-quartz-glow-paint",
    "name": "Rose Quartz Glow Mega Neon Paint",
    "category": "toys",
    "value": 593.1047,
    "demand": 3,
    "image": "images/toys/rose-quartz-glow-mega-neon-paint.webp"
  },
  {
    "id": "pets-diamond-dragon",
    "name": "Diamond Dragon",
    "category": "pets",
    "value": 379.5275,
    "demand": 1,
    "image": "images/pets/diamond-dragon.webp"
  },
  {
    "id": "potions-secret-talent-potion",
    "name": "Secret Talent Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-blue-whale",
    "name": "Blue Whale",
    "category": "pets",
    "value": 262.1745,
    "demand": 1,
    "image": "images/pets/blue-whale.webp"
  },
  {
    "id": "pets-urchin",
    "name": "Urchin",
    "category": "pets",
    "value": 233.4605,
    "demand": 1,
    "image": "images/pets/urchin.webp"
  },
  {
    "id": "potions-grow-potion",
    "name": "Grow Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-sushi-skateboard",
    "name": "Sushi Skateboard",
    "category": "petwear",
    "value": 819.2777,
    "demand": 2,
    "image": "images/petwear/sushi-skateboard.webp"
  },
  {
    "id": "pets-lunar-ox",
    "name": "Lunar Ox",
    "category": "pets",
    "value": 292.137,
    "demand": 1,
    "image": "images/pets/lunar-ox.webp"
  },
  {
    "id": "gifts-rubber-ducky-box",
    "name": "Rubber Ducky Box",
    "category": "gifts",
    "value": 48.7833,
    "demand": 1,
    "image": "images/gifts/rubber-ducky-box.webp"
  },
  {
    "id": "pets-bullfrog",
    "name": "Bullfrog",
    "category": "pets",
    "value": 187.2684,
    "demand": 1,
    "image": "images/pets/bullfrog.webp"
  },
  {
    "id": "strollers-santas-helper-stroller",
    "name": "Santa's Helper Stroller",
    "category": "strollers",
    "value": 108.1108,
    "demand": 1,
    "image": "images/strollers/santa-s-helper-stroller.webp"
  },
  {
    "id": "petwear-invisible-wings",
    "name": "Invisible Wings",
    "category": "petwear",
    "value": 755.0208,
    "demand": 2,
    "image": "images/petwear/invisible-wings.webp"
  },
  {
    "id": "vehicles-emperors-chariot",
    "name": "Emperor's Chariot",
    "category": "vehicles",
    "value": 477.1589,
    "demand": 1,
    "image": "images/vehicles/emperor-s-chariot.webp"
  },
  {
    "id": "toys-squid-plush",
    "name": "Squid Plush",
    "category": "toys",
    "value": 324.14,
    "demand": 1,
    "image": "images/toys/squid-plush.webp"
  },
  {
    "id": "potions-super-ageup-potion",
    "name": "Super Age-Up Potion",
    "category": "potions",
    "value": 6.49,
    "demand": 3,
    "image": ""
  },
  {
    "id": "toys-cookie-dough-plush",
    "name": "Cookie Dough Plush",
    "category": "toys",
    "value": 275.8642,
    "demand": 1,
    "image": "images/toys/cookie-dough-plush.webp"
  },
  {
    "id": "pets-persian-cat",
    "name": "Persian Cat",
    "category": "pets",
    "value": 234.7089,
    "demand": 1,
    "image": "images/pets/persian-cat.webp"
  },
  {
    "id": "pets-royal-mistletroll",
    "name": "Royal Mistletroll",
    "category": "pets",
    "value": 950.0626,
    "demand": 2,
    "image": "images/pets/royal-mistletroll.webp"
  },
  {
    "id": "stickers-volcanic-rhino-sticker",
    "name": "Volcanic Rhino Sticker",
    "category": "stickers",
    "value": 74.0769,
    "demand": 1,
    "image": "images/stickers/volcanic-rhino-sticker.webp"
  },
  {
    "id": "vehicles-unicorn-zombie-ponycycle",
    "name": "Unicorn Zombie Ponycycle",
    "category": "vehicles",
    "value": 350.2558,
    "demand": 1,
    "image": "images/vehicles/unicorn-zombie-ponycycle.webp"
  },
  {
    "id": "vehicles-micro-car",
    "name": "Micro Car",
    "category": "vehicles",
    "value": 208.1242,
    "demand": 1,
    "image": "images/vehicles/micro-car.webp"
  },
  {
    "id": "vehicles-postie-van",
    "name": "Postie Van",
    "category": "vehicles",
    "value": 314.7229,
    "demand": 1,
    "image": "images/vehicles/postie-van.webp"
  },
  {
    "id": "pets-scarecrow-cat",
    "name": "Scarecrow Cat",
    "category": "pets",
    "value": 521.8491,
    "demand": 1,
    "image": "images/pets/scarecrow-cat.webp"
  },
  {
    "id": "petwear-balloon-dog",
    "name": "Balloon Dog",
    "category": "petwear",
    "value": 333.3353,
    "demand": 1,
    "image": "images/petwear/balloon-dog.webp"
  },
  {
    "id": "gifts-premium-capuchin-box",
    "name": "Premium Capuchin Box",
    "category": "gifts",
    "value": 829.2688,
    "demand": 2,
    "image": "images/gifts/premium-capuchin-box.webp"
  },
  {
    "id": "pets-koi-carp",
    "name": "Koi Carp",
    "category": "pets",
    "value": 484.3961,
    "demand": 1,
    "image": "images/pets/koi-carp.webp"
  },
  {
    "id": "pets-corgi",
    "name": "Corgi",
    "category": "pets",
    "value": 106.12,
    "demand": 1,
    "image": "images/pets/corgi.webp"
  },
  {
    "id": "pets-villain-gibbon",
    "name": "Villain Gibbon",
    "category": "pets",
    "value": 559.3022,
    "demand": 1,
    "image": "images/pets/villain-gibbon.webp"
  },
  {
    "id": "pets-mule",
    "name": "Mule",
    "category": "pets",
    "value": 771.5363,
    "demand": 2,
    "image": "images/pets/mule.webp"
  },
  {
    "id": "pets-toucan",
    "name": "Toucan",
    "category": "pets",
    "value": 157.3059,
    "demand": 1,
    "image": "images/pets/toucan.webp"
  },
  {
    "id": "pets-pterodactyl",
    "name": "Pterodactyl",
    "category": "pets",
    "value": 387.0181,
    "demand": 1,
    "image": "images/pets/pterodactyl.webp"
  },
  {
    "id": "pets-bakeneko",
    "name": "Bakeneko",
    "category": "pets",
    "value": 142.3247,
    "demand": 1,
    "image": "images/pets/bakeneko.webp"
  },
  {
    "id": "toys-witches-wand",
    "name": "Witches Wand",
    "category": "toys",
    "value": 882.759,
    "demand": 1,
    "image": "images/toys/witches-wand.webp"
  },
  {
    "id": "strollers-scarebear-stroller",
    "name": "Scarebear Stroller",
    "category": "strollers",
    "value": 418.9207,
    "demand": 1,
    "image": "images/strollers/scarebear-stroller.webp"
  },
  {
    "id": "food-snapdragon-flower",
    "name": "Snapdragon Flower",
    "category": "food",
    "value": 20.0029,
    "demand": 1,
    "image": "images/food/snapdragon-flower.webp"
  },
  {
    "id": "toys-fancy-balloon",
    "name": "Fancy Balloon",
    "category": "toys",
    "value": 434.4845,
    "demand": 1,
    "image": "images/toys/fancy-balloon.webp"
  },
  {
    "id": "petwear-elf-shoes",
    "name": "Elf Shoes",
    "category": "petwear",
    "value": 184.7414,
    "demand": 1,
    "image": "images/petwear/elf-shoes.webp"
  },
  {
    "id": "vehicles-medieval-wagon",
    "name": "Medieval Wagon",
    "category": "vehicles",
    "value": 10.1553,
    "demand": 1,
    "image": "images/vehicles/medieval-wagon.webp"
  },
  {
    "id": "toys-snowball-launcher",
    "name": "Snowball Launcher",
    "category": "toys",
    "value": 48.2787,
    "demand": 1,
    "image": "images/toys/snowball-launcher.webp"
  },
  {
    "id": "pets-quetzalcoatl",
    "name": "Quetzalcoatl",
    "category": "pets",
    "value": 340.8259,
    "demand": 1,
    "image": "images/pets/quetzalcoatl.webp"
  },
  {
    "id": "pets-dingo",
    "name": "Dingo",
    "category": "pets",
    "value": 199.7527,
    "demand": 1,
    "image": "images/pets/dingo.webp"
  },
  {
    "id": "pets-rainbow-dragon",
    "name": "Rainbow Dragon",
    "category": "pets",
    "value": 832.7096,
    "demand": 2,
    "image": "images/pets/rainbow-dragon.webp"
  },
  {
    "id": "petwear-mystic-wing-crown",
    "name": "Mystic Wing Crown",
    "category": "petwear",
    "value": 128.5167,
    "demand": 1,
    "image": "images/petwear/mystic-wing-crown.webp"
  },
  {
    "id": "pets-pirate-ghost-capuchin-monkey",
    "name": "Pirate Ghost Capuchin Monkey",
    "category": "pets",
    "value": 908.8642,
    "demand": 2,
    "image": "images/pets/pirate-ghost-capuchin-monkey.webp"
  },
  {
    "id": "vehicles-adopt-me-boy-scooter",
    "name": "Adopt Me Boy Scooter",
    "category": "vehicles",
    "value": 730.9653,
    "demand": 1,
    "image": "images/vehicles/adopt-me-boy-scooter.webp"
  },
  {
    "id": "petwear-santa-hat",
    "name": "Santa Hat",
    "category": "petwear",
    "value": 895.5826,
    "demand": 2,
    "image": "images/petwear/santa-hat.webp"
  },
  {
    "id": "pets-chick",
    "name": "Chick",
    "category": "pets",
    "value": 470.6633,
    "demand": 1,
    "image": "images/pets/chick.webp"
  },
  {
    "id": "petwear-cat-backpack",
    "name": "Cat Backpack",
    "category": "petwear",
    "value": 24.0993,
    "demand": 1,
    "image": "images/petwear/cat-backpack.webp"
  },
  {
    "id": "pets-sado-mole",
    "name": "Sado Mole",
    "category": "pets",
    "value": 174.784,
    "demand": 1,
    "image": "images/pets/sado-mole.webp"
  },
  {
    "id": "toys-paint-sealer",
    "name": "Paint Sealer",
    "category": "toys",
    "value": 34.4857,
    "demand": 2,
    "image": "images/toys/paint-sealer.webp"
  },
  {
    "id": "petwear-star-sunglasses",
    "name": "Star Sunglasses",
    "category": "petwear",
    "value": 285.1427,
    "demand": 1,
    "image": "images/petwear/star-sunglasses.webp"
  },
  {
    "id": "pets-snow-leopard",
    "name": "Snow Leopard",
    "category": "pets",
    "value": 460.6758,
    "demand": 1,
    "image": "images/pets/snow-leopard.webp"
  },
  {
    "id": "pets-brown-bear",
    "name": "Brown Bear",
    "category": "pets",
    "value": 853.933,
    "demand": 2,
    "image": "images/pets/brown-bear.webp"
  },
  {
    "id": "vehicles-toy-rescue-helicopter",
    "name": "Toy Rescue Helicopter",
    "category": "vehicles",
    "value": 761.422,
    "demand": 1,
    "image": "images/vehicles/toy-rescue-helicopter.webp"
  },
  {
    "id": "pets-glyptodon",
    "name": "Glyptodon",
    "category": "pets",
    "value": 523.0976,
    "demand": 1,
    "image": "images/pets/glyptodon.webp"
  },
  {
    "id": "potions-preferred-potion",
    "name": "Preferred Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-takoyaki-stroller",
    "name": "Takoyaki Stroller",
    "category": "strollers",
    "value": 148.6512,
    "demand": 1,
    "image": "images/strollers/takoyaki-stroller.webp"
  },
  {
    "id": "pets-dodo",
    "name": "Dodo",
    "category": "pets",
    "value": 746.5676,
    "demand": 2,
    "image": "images/pets/dodo.webp"
  },
  {
    "id": "toys-ice-grapple",
    "name": "Ice Grapple",
    "category": "toys",
    "value": 365.5191,
    "demand": 1,
    "image": "images/toys/ice-grapple.webp"
  },
  {
    "id": "pets-clementine-owl",
    "name": "Clementine Owl",
    "category": "pets",
    "value": 406.993,
    "demand": 1,
    "image": "images/pets/clementine-owl.webp"
  },
  {
    "id": "pets-birthday-butterfly-2023",
    "name": "Birthday Butterfly 2023",
    "category": "pets",
    "value": 313.3604,
    "demand": 1,
    "image": "images/pets/birthday-butterfly-2023.webp"
  },
  {
    "id": "pets-seahorse",
    "name": "Seahorse",
    "category": "pets",
    "value": 401.9993,
    "demand": 1,
    "image": "images/pets/seahorse.webp"
  },
  {
    "id": "pets-snowman",
    "name": "Snowman",
    "category": "pets",
    "value": 373.2853,
    "demand": 1,
    "image": "images/pets/snowman.webp"
  },
  {
    "id": "petwear-volcanic-boots",
    "name": "Volcanic Boots",
    "category": "petwear",
    "value": 365.4638,
    "demand": 1,
    "image": "images/petwear/volcanic-boots.webp"
  },
  {
    "id": "pets-hopbop",
    "name": "Hopbop",
    "category": "pets",
    "value": 176.0324,
    "demand": 1,
    "image": "images/pets/hopbop.webp"
  },
  {
    "id": "strollers-tulip-stroller",
    "name": "Tulip Stroller",
    "category": "strollers",
    "value": 432.4341,
    "demand": 1,
    "image": "images/strollers/tulip-stroller.webp"
  },
  {
    "id": "pets-rabbit",
    "name": "Rabbit",
    "category": "pets",
    "value": 11.2389,
    "demand": 1,
    "image": "images/pets/rabbit.webp"
  },
  {
    "id": "pets-dalmatian",
    "name": "Dalmatian",
    "category": "pets",
    "value": 980.025,
    "demand": 3,
    "image": "images/pets/dalmatian.webp"
  },
  {
    "id": "pets-squid",
    "name": "Squid",
    "category": "pets",
    "value": 624.2209,
    "demand": 1,
    "image": "images/pets/squid.webp"
  },
  {
    "id": "pets-winter-fawn",
    "name": "Winter Fawn",
    "category": "pets",
    "value": 215.9824,
    "demand": 1,
    "image": "images/pets/winter-fawn.webp"
  },
  {
    "id": "petwear-unicorn-backpack",
    "name": "Unicorn Backpack",
    "category": "petwear",
    "value": 879.5184,
    "demand": 2,
    "image": "images/petwear/unicorn-backpack.webp"
  },
  {
    "id": "stickers-priceless-shrimp-sticker",
    "name": "Priceless Shrimp Sticker",
    "category": "stickers",
    "value": 287.0392,
    "demand": 1,
    "image": "images/stickers/priceless-shrimp-sticker.webp"
  },
  {
    "id": "petwear-hive-backpack",
    "name": "Hive Backpack",
    "category": "petwear",
    "value": 971.8876,
    "demand": 2,
    "image": "images/petwear/hive-backpack.webp"
  },
  {
    "id": "pets-happy-clam",
    "name": "Happy Clam",
    "category": "pets",
    "value": 847.6908,
    "demand": 2,
    "image": "images/pets/happy-clam.webp"
  },
  {
    "id": "pets-slug",
    "name": "Slug",
    "category": "pets",
    "value": 287.1432,
    "demand": 1,
    "image": "images/pets/slug.webp"
  },
  {
    "id": "vehicles-convertible",
    "name": "Convertible",
    "category": "vehicles",
    "value": 842.6401,
    "demand": 1,
    "image": "images/vehicles/convertible.webp"
  },
  {
    "id": "vehicles-clown-car",
    "name": "Clown Car",
    "category": "vehicles",
    "value": 177.6674,
    "demand": 1,
    "image": "images/vehicles/clown-car.webp"
  },
  {
    "id": "vehicles-dapper-friend-carrier",
    "name": "Dapper Friend Carrier",
    "category": "vehicles",
    "value": 284.2661,
    "demand": 1,
    "image": "images/vehicles/dapper-friend-carrier.webp"
  },
  {
    "id": "pets-business-monkey",
    "name": "Business Monkey",
    "category": "pets",
    "value": 700.3754,
    "demand": 2,
    "image": "images/pets/business-monkey.webp"
  },
  {
    "id": "pets-ladybug",
    "name": "Ladybug",
    "category": "pets",
    "value": 357.0556,
    "demand": 1,
    "image": "images/pets/ladybug.webp"
  },
  {
    "id": "pets-flying-fish",
    "name": "Flying Fish",
    "category": "pets",
    "value": 104.8716,
    "demand": 1,
    "image": "images/pets/flying-fish.webp"
  },
  {
    "id": "stickers-blue-betta-fish-sticker",
    "name": "Blue Betta Fish Sticker",
    "category": "stickers",
    "value": 324.0761,
    "demand": 1,
    "image": "images/stickers/blue-betta-fish-sticker.webp"
  },
  {
    "id": "vehicles-white-snowboard",
    "name": "White Snowboard",
    "category": "vehicles",
    "value": 553.3008,
    "demand": 1,
    "image": "images/vehicles/white-snowboard.webp"
  },
  {
    "id": "petwear-admin-vision-glasses",
    "name": "Admin Vision Glasses",
    "category": "petwear",
    "value": 847.39,
    "demand": 2,
    "image": ""
  },
  {
    "id": "vehicles-gold-skateboard",
    "name": "Gold Skateboard",
    "category": "vehicles",
    "value": 654.8234,
    "demand": 1,
    "image": "images/vehicles/gold-skateboard.webp"
  },
  {
    "id": "toys-netzooka",
    "name": "Netzooka",
    "category": "toys",
    "value": 572.4151,
    "demand": 1,
    "image": "images/toys/netzooka.webp"
  },
  {
    "id": "pets-fallow-deer",
    "name": "Fallow Deer",
    "category": "pets",
    "value": 855.1815,
    "demand": 2,
    "image": "images/pets/fallow-deer.webp"
  },
  {
    "id": "strollers-cauldron-stroller",
    "name": "Cauldron Stroller",
    "category": "strollers",
    "value": 783.7844,
    "demand": 1,
    "image": "images/strollers/cauldron-stroller.webp"
  },
  {
    "id": "petwear-picnic-basket",
    "name": "Picnic Basket",
    "category": "petwear",
    "value": 373.4959,
    "demand": 1,
    "image": "images/petwear/picnic-basket.webp"
  },
  {
    "id": "petwear-strawberry-clip",
    "name": "Strawberry Clip",
    "category": "petwear",
    "value": 522.0898,
    "demand": 2,
    "image": "images/petwear/strawberry-clip.webp"
  },
  {
    "id": "strollers-heart-stroller",
    "name": "Heart Stroller",
    "category": "strollers",
    "value": 1000.0,
    "demand": 2,
    "image": "images/strollers/heart-stroller.webp"
  },
  {
    "id": "petwear-black-designer-backpack",
    "name": "Black Designer Backpack",
    "category": "petwear",
    "value": 694.78,
    "demand": 1,
    "image": "images/petwear/black-designer-backpack.webp"
  },
  {
    "id": "pets-ice-cube",
    "name": "Ice Cube",
    "category": "pets",
    "value": 307.1182,
    "demand": 1,
    "image": "images/pets/ice-cube.webp"
  },
  {
    "id": "pets-ninja-monkey",
    "name": "Ninja Monkey",
    "category": "pets",
    "value": 782.7722,
    "demand": 2,
    "image": "images/pets/ninja-monkey.webp"
  },
  {
    "id": "pets-thunderfisher",
    "name": "Thunderfisher",
    "category": "pets",
    "value": 128.5919,
    "demand": 1,
    "image": "images/pets/thunderfisher.webp"
  },
  {
    "id": "petwear-2022-birthday-cake",
    "name": "2022 Birthday Cake",
    "category": "petwear",
    "value": 943.7753,
    "demand": 3,
    "image": "images/petwear/2022-birthday-cake.webp"
  },
  {
    "id": "stickers-otter-sticker",
    "name": "Otter Sticker",
    "category": "stickers",
    "value": 407.4092,
    "demand": 1,
    "image": "images/stickers/otter-sticker.webp"
  },
  {
    "id": "pets-rice-cake-rabbit",
    "name": "Rice Cake Rabbit",
    "category": "pets",
    "value": 468.1664,
    "demand": 1,
    "image": "images/pets/rice-cake-rabbit.webp"
  },
  {
    "id": "toys-lemonade-stand",
    "name": "Lemonade Stand",
    "category": "toys",
    "value": 193.1059,
    "demand": 1,
    "image": "images/toys/lemonade-stand.webp"
  },
  {
    "id": "toys-santa-rattle",
    "name": "Santa Rattle",
    "category": "toys",
    "value": 75.8648,
    "demand": 1,
    "image": "images/toys/santa-rattle.webp"
  },
  {
    "id": "pets-easter-bunny",
    "name": "Easter Bunny",
    "category": "pets",
    "value": 322.0994,
    "demand": 1,
    "image": "images/pets/easter-bunny.webp"
  },
  {
    "id": "pets-sugar-glider",
    "name": "Sugar Glider",
    "category": "pets",
    "value": 960.0501,
    "demand": 3,
    "image": "images/pets/sugar-glider.webp"
  },
  {
    "id": "food-golden-lettuce",
    "name": "Golden Lettuce",
    "category": "food",
    "value": 800.0006,
    "demand": 2,
    "image": "images/food/golden-lettuce.webp"
  },
  {
    "id": "vehicles-doge-skateboard",
    "name": "Doge Skateboard",
    "category": "vehicles",
    "value": 695.4324,
    "demand": 1,
    "image": "images/vehicles/doge-skateboard.webp"
  },
  {
    "id": "vehicles-royal-carriage",
    "name": "Royal Carriage",
    "category": "vehicles",
    "value": 416.2454,
    "demand": 1,
    "image": "images/vehicles/royal-carriage.webp"
  },
  {
    "id": "pets-golden-hummingbird",
    "name": "Golden Hummingbird",
    "category": "pets",
    "value": 670.413,
    "demand": 1,
    "image": "images/pets/golden-hummingbird.webp"
  },
  {
    "id": "food-winter-deer-bait",
    "name": "Winter Deer Bait",
    "category": "food",
    "value": 60.0028,
    "demand": 1,
    "image": "images/food/winter-deer-bait.webp"
  },
  {
    "id": "pets-flamingo",
    "name": "Flamingo",
    "category": "pets",
    "value": 948.8141,
    "demand": 3,
    "image": "images/pets/flamingo.webp"
  },
  {
    "id": "toys-campfire-stories-paint",
    "name": "Campfire Stories Mega Neon Paint",
    "category": "toys",
    "value": 696.5526,
    "demand": 3,
    "image": "images/toys/campfire-stories-mega-neon-paint.webp"
  },
  {
    "id": "petwear-ssbd-beanie",
    "name": "SSBD Beanie",
    "category": "petwear",
    "value": 963.8555,
    "demand": 2,
    "image": "images/petwear/ssbd-beanie.webp"
  },
  {
    "id": "vehicles-dragonster",
    "name": "Dragonster",
    "category": "vehicles",
    "value": 335.0274,
    "demand": 1,
    "image": "images/vehicles/dragonster.webp"
  },
  {
    "id": "pets-japanese-snow-fairy",
    "name": "Japanese Snow Fairy",
    "category": "pets",
    "value": 44.9467,
    "demand": 1,
    "image": "images/pets/japanese-snow-fairy.webp"
  },
  {
    "id": "pets-water-rabbit",
    "name": "Water Rabbit",
    "category": "pets",
    "value": 685.3942,
    "demand": 2,
    "image": "images/pets/water-rabbit.webp"
  },
  {
    "id": "toys-unicorn-plush",
    "name": "Unicorn Plush",
    "category": "toys",
    "value": 924.1382,
    "demand": 2,
    "image": "images/toys/unicorn-plush.webp"
  },
  {
    "id": "pets-borhyaena-gigantica",
    "name": "Borhyaena Gigantica",
    "category": "pets",
    "value": 184.7715,
    "demand": 1,
    "image": "images/pets/borhyaena-gigantica.webp"
  },
  {
    "id": "pets-puma",
    "name": "Puma",
    "category": "pets",
    "value": 6.2452,
    "demand": 1,
    "image": "images/pets/puma.webp"
  },
  {
    "id": "pets-velociraptor",
    "name": "Velociraptor",
    "category": "pets",
    "value": 198.5043,
    "demand": 1,
    "image": "images/pets/velociraptor.webp"
  },
  {
    "id": "petwear-midnight-wings",
    "name": "Midnight Wings",
    "category": "petwear",
    "value": 506.0256,
    "demand": 2,
    "image": "images/petwear/midnight-wings.webp"
  },
  {
    "id": "pets-kakapo",
    "name": "Kakapo",
    "category": "pets",
    "value": 21.2264,
    "demand": 1,
    "image": "images/pets/kakapo.webp"
  },
  {
    "id": "pets-great-pyrenees",
    "name": "Great Pyrenees",
    "category": "pets",
    "value": 640.4505,
    "demand": 2,
    "image": "images/pets/great-pyrenees.webp"
  },
  {
    "id": "food-snowflake-potion",
    "name": "Snowflake Potion",
    "category": "food",
    "value": 940.0002,
    "demand": 2,
    "image": "images/food/snowflake-potion.webp"
  },
  {
    "id": "pets-winter-doe",
    "name": "Winter Doe",
    "category": "pets",
    "value": 352.0619,
    "demand": 1,
    "image": "images/pets/winter-doe.webp"
  },
  {
    "id": "toys-premium-fire-pit",
    "name": "Premium Fire Pit",
    "category": "toys",
    "value": 186.2093,
    "demand": 1,
    "image": "images/toys/premium-fire-pit.webp"
  },
  {
    "id": "pets-rock",
    "name": "Rock",
    "category": "pets",
    "value": 393.2602,
    "demand": 1,
    "image": "images/pets/rock.webp"
  },
  {
    "id": "vehicles-cloud-car",
    "name": "Cloud Car",
    "category": "vehicles",
    "value": 994.9239,
    "demand": 2,
    "image": "images/vehicles/cloud-car.webp"
  },
  {
    "id": "vehicles-glass-skateboard",
    "name": "Glass Skateboard",
    "category": "vehicles",
    "value": 664.9756,
    "demand": 1,
    "image": "images/vehicles/glass-skateboard.webp"
  },
  {
    "id": "stickers-evil-unicorn-sticker",
    "name": "Evil Unicorn Sticker",
    "category": "stickers",
    "value": 157.4099,
    "demand": 1,
    "image": "images/stickers/evil-unicorn-sticker.webp"
  },
  {
    "id": "petwear-black-hightops",
    "name": "Black Hightops",
    "category": "petwear",
    "value": 8.0351,
    "demand": 1,
    "image": "images/petwear/black-hightops.webp"
  },
  {
    "id": "pets-bauble-buddies",
    "name": "Bauble Buddies",
    "category": "pets",
    "value": 480.6507,
    "demand": 1,
    "image": "images/pets/bauble-buddies.webp"
  },
  {
    "id": "stickers-octopus-sticker",
    "name": "Octopus Sticker",
    "category": "stickers",
    "value": 46.2992,
    "demand": 1,
    "image": "images/stickers/octopus-sticker.webp"
  },
  {
    "id": "gifts-moon-bear-box",
    "name": "Moon Bear Box",
    "category": "gifts",
    "value": 439.0261,
    "demand": 1,
    "image": "images/gifts/moon-bear-box.webp"
  },
  {
    "id": "pets-pupcicle",
    "name": "Pupcicle",
    "category": "pets",
    "value": 639.2021,
    "demand": 2,
    "image": "images/pets/pupcicle.webp"
  },
  {
    "id": "petwear-culinary-wizard-hat",
    "name": "Culinary Wizard Hat",
    "category": "petwear",
    "value": 108.4364,
    "demand": 1,
    "image": "images/petwear/culinary-wizard-hat.webp"
  },
  {
    "id": "toys-sunrise-hang-glider",
    "name": "Sunrise Hang Glider",
    "category": "toys",
    "value": 896.552,
    "demand": 2,
    "image": "images/toys/sunrise-hang-glider.webp"
  },
  {
    "id": "pets-bald-eagle",
    "name": "Bald Eagle",
    "category": "pets",
    "value": 900.1251,
    "demand": 2,
    "image": "images/pets/bald-eagle.webp"
  },
  {
    "id": "pets-2021-uplift-butterfly",
    "name": "2021 Uplift Butterfly",
    "category": "pets",
    "value": 420.7258,
    "demand": 1,
    "image": "images/pets/2021-uplift-butterfly.webp"
  },
  {
    "id": "pets-ground-sloth",
    "name": "Ground Sloth",
    "category": "pets",
    "value": 201.0011,
    "demand": 1,
    "image": "images/pets/ground-sloth.webp"
  },
  {
    "id": "petwear-cherryontop",
    "name": "Cherry-On-Top",
    "category": "petwear",
    "value": 951.8074,
    "demand": 2,
    "image": "images/petwear/cherry-on-top.webp"
  },
  {
    "id": "pets-mahi-mahi",
    "name": "Mahi Mahi",
    "category": "pets",
    "value": 2.4999,
    "demand": 1,
    "image": "images/pets/mahi-mahi.webp"
  },
  {
    "id": "strollers-bunny-stroller",
    "name": "Bunny Stroller",
    "category": "strollers",
    "value": 891.8922,
    "demand": 1,
    "image": "images/strollers/bunny-stroller.webp"
  },
  {
    "id": "pets-chihuahua",
    "name": "Chihuahua",
    "category": "pets",
    "value": 598.0037,
    "demand": 2,
    "image": "images/pets/chihuahua.webp"
  },
  {
    "id": "toys-caticorn-rattle",
    "name": "Caticorn Rattle",
    "category": "toys",
    "value": 517.2428,
    "demand": 1,
    "image": "images/toys/caticorn-rattle.webp"
  },
  {
    "id": "pets-diamond-king-penguin",
    "name": "Diamond King Penguin",
    "category": "pets",
    "value": 822.7221,
    "demand": 2,
    "image": "images/pets/diamond-king-penguin.webp"
  },
  {
    "id": "vehicles-imagination-box",
    "name": "Imagination Box",
    "category": "vehicles",
    "value": 294.4184,
    "demand": 1,
    "image": "images/vehicles/imagination-box.webp"
  },
  {
    "id": "stickers-arctic-dusk-dragon-sticker",
    "name": "Arctic Dusk Dragon Sticker",
    "category": "stickers",
    "value": 250.0022,
    "demand": 1,
    "image": "images/stickers/arctic-dusk-dragon-sticker.webp"
  },
  {
    "id": "toys-compass",
    "name": "Compass",
    "category": "toys",
    "value": 689.6561,
    "demand": 1,
    "image": "images/toys/compass.webp"
  },
  {
    "id": "pets-quokka",
    "name": "Quokka",
    "category": "pets",
    "value": 573.035,
    "demand": 1,
    "image": "images/pets/quokka.webp"
  },
  {
    "id": "petwear-sack-of-cash",
    "name": "Sack of Cash",
    "category": "petwear",
    "value": 369.4798,
    "demand": 1,
    "image": "images/petwear/sack-of-cash.webp"
  },
  {
    "id": "vehicles-traveling-house",
    "name": "Traveling House",
    "category": "vehicles",
    "value": 329.9512,
    "demand": 1,
    "image": "images/vehicles/traveling-house.webp"
  },
  {
    "id": "petwear-eco-orange-maple-cape",
    "name": "Eco Orange Maple Cape",
    "category": "petwear",
    "value": 116.4685,
    "demand": 1,
    "image": "images/petwear/eco-orange-maple-cape.webp"
  },
  {
    "id": "petwear-puddleducks-hood",
    "name": "Puddleducks Hood",
    "category": "petwear",
    "value": 534.1379,
    "demand": 1,
    "image": "images/petwear/puddleducks-hood.webp"
  },
  {
    "id": "petwear-energy-wings",
    "name": "Energy Wings",
    "category": "petwear",
    "value": 200.8056,
    "demand": 1,
    "image": "images/petwear/energy-wings.webp"
  },
  {
    "id": "pets-cobra",
    "name": "Cobra",
    "category": "pets",
    "value": 620.4755,
    "demand": 1,
    "image": "images/pets/cobra.webp"
  },
  {
    "id": "gifts-standard-capuchin-box",
    "name": "Standard Capuchin Box",
    "category": "gifts",
    "value": 390.2457,
    "demand": 1,
    "image": "images/gifts/standard-capuchin-box.webp"
  },
  {
    "id": "petwear-watery-wings",
    "name": "Watery Wings",
    "category": "petwear",
    "value": 461.849,
    "demand": 1,
    "image": "images/petwear/watery-wings.webp"
  },
  {
    "id": "eggs-royal-fairytale-egg",
    "name": "Royal Fairytale Egg",
    "category": "eggs",
    "value": 357.1448,
    "demand": 1,
    "image": "images/eggs/royal-fairytale-egg.webp"
  },
  {
    "id": "petwear-fairy-wings",
    "name": "Fairy Wings",
    "category": "petwear",
    "value": 706.8282,
    "demand": 1,
    "image": "images/petwear/fairy-wings.webp"
  },
  {
    "id": "strollers-pea-pod-stroller",
    "name": "Pea Pod Stroller",
    "category": "strollers",
    "value": 256.759,
    "demand": 1,
    "image": "images/strollers/pea-pod-stroller.webp"
  },
  {
    "id": "petwear-demon-wings",
    "name": "Demon Wings",
    "category": "petwear",
    "value": 710.8442,
    "demand": 1,
    "image": "images/petwear/demon-wings.webp"
  },
  {
    "id": "pets-sneak-weasel",
    "name": "Sneak Weasel",
    "category": "pets",
    "value": 48.692,
    "demand": 1,
    "image": "images/pets/sneak-weasel.webp"
  },
  {
    "id": "toys-pumpkin-rattle",
    "name": "Pumpkin Rattle",
    "category": "toys",
    "value": 875.8624,
    "demand": 1,
    "image": "images/toys/pumpkin-rattle.webp"
  },
  {
    "id": "pets-milk-choccybunny",
    "name": "Milk Choccybunny",
    "category": "pets",
    "value": 67.4185,
    "demand": 1,
    "image": "images/pets/milk-choccybunny.webp"
  },
  {
    "id": "gifts-wolf-box",
    "name": "Wolf Box",
    "category": "gifts",
    "value": 731.7081,
    "demand": 2,
    "image": "images/gifts/wolf-box.webp"
  },
  {
    "id": "toys-candy-flare-paint",
    "name": "Candy Flare Mega Neon Paint",
    "category": "toys",
    "value": 627.5873,
    "demand": 3,
    "image": "images/toys/candy-flare-mega-neon-paint.webp"
  },
  {
    "id": "petwear-cloud-wings",
    "name": "Cloud Wings",
    "category": "petwear",
    "value": 807.2295,
    "demand": 2,
    "image": "images/petwear/cloud-wings.webp"
  },
  {
    "id": "toys-ferris-wheel-propeller",
    "name": "Ferris Wheel Propeller",
    "category": "toys",
    "value": 565.5185,
    "demand": 1,
    "image": "images/toys/ferris-wheel-propeller.webp"
  },
  {
    "id": "petwear-spring-bunny-hood",
    "name": "Spring Bunny Hood",
    "category": "petwear",
    "value": 883.5345,
    "demand": 2,
    "image": "images/petwear/spring-bunny-hood.webp"
  },
  {
    "id": "toys-easter-bunny-plush",
    "name": "Easter Bunny Plush",
    "category": "toys",
    "value": 710.3457,
    "demand": 1,
    "image": "images/toys/easter-bunny-plush.webp"
  },
  {
    "id": "pets-sabertooth",
    "name": "Sabertooth",
    "category": "pets",
    "value": 428.2164,
    "demand": 1,
    "image": "images/pets/sabertooth.webp"
  },
  {
    "id": "pets-feesh",
    "name": "Feesh",
    "category": "pets",
    "value": 519.3523,
    "demand": 1,
    "image": "images/pets/feesh.webp"
  },
  {
    "id": "pets-tree-kangaroo",
    "name": "Tree Kangaroo",
    "category": "pets",
    "value": 806.4925,
    "demand": 2,
    "image": "images/pets/tree-kangaroo.webp"
  },
  {
    "id": "pets-harp-seal",
    "name": "Harp Seal",
    "category": "pets",
    "value": 767.791,
    "demand": 2,
    "image": "images/pets/harp-seal.webp"
  },
  {
    "id": "pets-mole",
    "name": "Mole",
    "category": "pets",
    "value": 162.2996,
    "demand": 1,
    "image": "images/pets/mole.webp"
  },
  {
    "id": "pets-bluebottle",
    "name": "Bluebottle Fly",
    "category": "pets",
    "value": 189.7652,
    "demand": 1,
    "image": "images/pets/bluebottle-fly.webp"
  },
  {
    "id": "pets-naga-dragon",
    "name": "Naga Dragon",
    "category": "pets",
    "value": 695.3817,
    "demand": 1,
    "image": "images/pets/naga-dragon.webp"
  },
  {
    "id": "pets-california-condor",
    "name": "California Condor",
    "category": "pets",
    "value": 47.4436,
    "demand": 1,
    "image": "images/pets/california-condor.webp"
  },
  {
    "id": "stickers-cow-loves-this-sticker",
    "name": "Cow Loves This Sticker",
    "category": "stickers",
    "value": 768.5192,
    "demand": 1,
    "image": "images/stickers/cow-loves-this-sticker.webp"
  },
  {
    "id": "petwear-music-box-hat",
    "name": "Music Box Hat",
    "category": "petwear",
    "value": 626.5071,
    "demand": 1,
    "image": "images/petwear/music-box-hat.webp"
  },
  {
    "id": "toys-snow-cone-stand",
    "name": "Snow Cone Stand",
    "category": "toys",
    "value": 524.1394,
    "demand": 1,
    "image": "images/toys/snow-cone-stand.webp"
  },
  {
    "id": "pets-golden-king-penguin",
    "name": "Golden King Penguin",
    "category": "pets",
    "value": 654.1833,
    "demand": 1,
    "image": "images/pets/golden-king-penguin.webp"
  },
  {
    "id": "stickers-lava-dragon-sticker",
    "name": "Lava Dragon Sticker",
    "category": "stickers",
    "value": 120.373,
    "demand": 1,
    "image": "images/stickers/lava-dragon-sticker.webp"
  },
  {
    "id": "strollers-smores-stroller",
    "name": "S'mores Stroller",
    "category": "strollers",
    "value": 243.2455,
    "demand": 1,
    "image": "images/strollers/s-mores-stroller.webp"
  },
  {
    "id": "pets-yule-log-dog",
    "name": "Yule Log Dog",
    "category": "pets",
    "value": 792.7597,
    "demand": 2,
    "image": "images/pets/yule-log-dog.webp"
  },
  {
    "id": "pets-orchid-butterfly",
    "name": "Orchid Butterfly",
    "category": "pets",
    "value": 981.2735,
    "demand": 2,
    "image": "images/pets/orchid-butterfly.webp"
  },
  {
    "id": "vehicles-personal-cannon-launcher",
    "name": "Personal Cannon Launcher",
    "category": "vehicles",
    "value": 157.3629,
    "demand": 1,
    "image": "images/vehicles/personal-cannon-launcher.webp"
  },
  {
    "id": "vehicles-fidget-skateboard",
    "name": "Fidget Skateboard",
    "category": "vehicles",
    "value": 649.7472,
    "demand": 1,
    "image": "images/vehicles/fidget-skateboard.webp"
  },
  {
    "id": "petwear-2022-birthday-confetti-drape",
    "name": "2022 Birthday Confetti Drape",
    "category": "petwear",
    "value": 698.7961,
    "demand": 2,
    "image": "images/petwear/2022-birthday-confetti-drape.webp"
  },
  {
    "id": "petwear-bee-hive",
    "name": "Bee Hive",
    "category": "petwear",
    "value": 228.918,
    "demand": 1,
    "image": "images/petwear/bee-hive.webp"
  },
  {
    "id": "pets-nessie",
    "name": "Nessie",
    "category": "pets",
    "value": 883.8955,
    "demand": 3,
    "image": "images/pets/nessie.webp"
  },
  {
    "id": "vehicles-bathtub",
    "name": "Bathtub",
    "category": "vehicles",
    "value": 934.0104,
    "demand": 2,
    "image": "images/vehicles/bathtub.webp"
  },
  {
    "id": "toys-rocket-pogo",
    "name": "Rocket Pogo",
    "category": "toys",
    "value": 310.3469,
    "demand": 1,
    "image": "images/toys/rocket-pogo.webp"
  },
  {
    "id": "food-dim-sum",
    "name": "Dim Sum",
    "category": "food",
    "value": 900.0003,
    "demand": 2,
    "image": "images/food/dim-sum.webp"
  },
  {
    "id": "pets-mini-schnauzer",
    "name": "Mini Schnauzer",
    "category": "pets",
    "value": 757.8035,
    "demand": 2,
    "image": "images/pets/mini-schnauzer.webp"
  },
  {
    "id": "petwear-strawberry-shortcake-bow",
    "name": "Strawberry Shortcake Bow",
    "category": "petwear",
    "value": 530.1219,
    "demand": 2,
    "image": "images/petwear/strawberry-shortcake-bow.webp"
  },
  {
    "id": "pets-ox",
    "name": "Ox",
    "category": "pets",
    "value": 172.2871,
    "demand": 1,
    "image": "images/pets/ox.webp"
  },
  {
    "id": "pets-subzero-scorpion",
    "name": "Subzero Scorpion",
    "category": "pets",
    "value": 426.968,
    "demand": 1,
    "image": "images/pets/subzero-scorpion.webp"
  },
  {
    "id": "vehicles-magical-girl-car",
    "name": "Magical Girl Car",
    "category": "vehicles",
    "value": 426.3977,
    "demand": 1,
    "image": "images/vehicles/magical-girl-car.webp"
  },
  {
    "id": "stickers-skelerex-sticker",
    "name": "Skele-Rex Sticker",
    "category": "stickers",
    "value": 101.8545,
    "demand": 1,
    "image": "images/stickers/skele-rex-sticker.webp"
  },
  {
    "id": "pets-diamond-albatross",
    "name": "Diamond Albatross",
    "category": "pets",
    "value": 856.4299,
    "demand": 2,
    "image": "images/pets/diamond-albatross.webp"
  },
  {
    "id": "pets-gargoyle",
    "name": "Gargoyle",
    "category": "pets",
    "value": 719.102,
    "demand": 1,
    "image": "images/pets/gargoyle.webp"
  },
  {
    "id": "pets-yellowlipped-sea-krait",
    "name": "Yellow-Lipped Sea Krait",
    "category": "pets",
    "value": 232.212,
    "demand": 1,
    "image": "images/pets/yellow-lipped-sea-krait.webp"
  },
  {
    "id": "petwear-giraffe-backpack",
    "name": "Giraffe Backpack",
    "category": "petwear",
    "value": 975.9037,
    "demand": 2,
    "image": "images/petwear/giraffe-backpack.webp"
  },
  {
    "id": "pets-majestic-pony",
    "name": "Majestic Pony",
    "category": "pets",
    "value": 816.48,
    "demand": 2,
    "image": "images/pets/majestic-pony.webp"
  },
  {
    "id": "strollers-reindeer-stroller",
    "name": "Reindeer Stroller",
    "category": "strollers",
    "value": 621.6228,
    "demand": 1,
    "image": "images/strollers/reindeer-stroller.webp"
  },
  {
    "id": "toys-classic-trade-stand",
    "name": "Classic Trade Stand",
    "category": "toys",
    "value": 496.5532,
    "demand": 2,
    "image": "images/toys/classic-trade-stand.webp"
  },
  {
    "id": "pets-field-mouse",
    "name": "Field Mouse",
    "category": "pets",
    "value": 871.4111,
    "demand": 2,
    "image": "images/pets/field-mouse.webp"
  },
  {
    "id": "food-chocolate-drop",
    "name": "Chocolate Drop",
    "category": "food",
    "value": 760.0007,
    "demand": 2,
    "image": "images/food/chocolate-drop.webp"
  },
  {
    "id": "eggs-christmas-future-egg",
    "name": "Christmas Future Egg",
    "category": "eggs",
    "value": 571.4299,
    "demand": 2,
    "image": "images/eggs/christmas-future-egg.webp"
  },
  {
    "id": "pets-scorching-kaijunior",
    "name": "Scorching Kaijunior",
    "category": "pets",
    "value": 828.9643,
    "demand": 2,
    "image": "images/pets/scorching-kaijunior.webp"
  },
  {
    "id": "eggs-admin-abuse-egg",
    "name": "Admin Abuse Egg",
    "category": "eggs",
    "value": 238.0975,
    "demand": 2,
    "image": "images/eggs/admin-abuse-egg.webp"
  },
  {
    "id": "petwear-2022-birthday-confetti-cannon",
    "name": "2022 Birthday Confetti Cannon",
    "category": "petwear",
    "value": 919.679,
    "demand": 3,
    "image": "images/petwear/2022-birthday-confetti-cannon.webp"
  },
  {
    "id": "vehicles-motorized-sofa",
    "name": "Motorized Sofa",
    "category": "vehicles",
    "value": 223.3526,
    "demand": 1,
    "image": "images/vehicles/motorized-sofa.webp"
  },
  {
    "id": "strollers-pelican-stroller",
    "name": "Pelican Stroller",
    "category": "strollers",
    "value": 13.5165,
    "demand": 1,
    "image": "images/strollers/pelican-stroller.webp"
  },
  {
    "id": "vehicles-squirrel-car",
    "name": "Squirrel Car",
    "category": "vehicles",
    "value": 233.5048,
    "demand": 1,
    "image": "images/vehicles/squirrel-car.webp"
  },
  {
    "id": "strollers-apple-barrel-stroller",
    "name": "Apple Barrel Stroller",
    "category": "strollers",
    "value": 81.0838,
    "demand": 1,
    "image": "images/strollers/apple-barrel-stroller.webp"
  },
  {
    "id": "pets-solaris",
    "name": "Solaris",
    "category": "pets",
    "value": 818.9768,
    "demand": 2,
    "image": "images/pets/solaris.webp"
  },
  {
    "id": "petwear-monkey-king-crown",
    "name": "Monkey King Crown",
    "category": "petwear",
    "value": 795.1813,
    "demand": 2,
    "image": "images/petwear/monkey-king-crown.webp"
  },
  {
    "id": "pets-birthday-butterfly-2024",
    "name": "Birthday Butterfly 2024",
    "category": "pets",
    "value": 210.9886,
    "demand": 1,
    "image": "images/pets/birthday-butterfly-2024.webp"
  },
  {
    "id": "pets-manekineko",
    "name": "Maneki-Neko",
    "category": "pets",
    "value": 656.6802,
    "demand": 1,
    "image": "images/pets/maneki-neko.webp"
  },
  {
    "id": "stickers-pirate-dog-sticker",
    "name": "Pirate Dog Sticker",
    "category": "stickers",
    "value": 268.5207,
    "demand": 1,
    "image": "images/stickers/pirate-dog-sticker.webp"
  },
  {
    "id": "vehicles-super-jetpack",
    "name": "Super Jetpack",
    "category": "vehicles",
    "value": 984.7716,
    "demand": 2,
    "image": "images/vehicles/super-jetpack.webp"
  },
  {
    "id": "vehicles-glass-snowboard",
    "name": "Glass Snowboard",
    "category": "vehicles",
    "value": 903.5536,
    "demand": 1,
    "image": "images/vehicles/glass-snowboard.webp"
  },
  {
    "id": "pets-dirty-ducky",
    "name": "Dirty Ducky",
    "category": "pets",
    "value": 325.8447,
    "demand": 1,
    "image": "images/pets/dirty-ducky.webp"
  },
  {
    "id": "gifts-christmas-gift",
    "name": "Christmas Gift",
    "category": "gifts",
    "value": 975.6098,
    "demand": 2,
    "image": "images/gifts/christmas-gift.webp"
  },
  {
    "id": "potions-hyperspeed-potion",
    "name": "Hyperspeed Potion",
    "category": "potions",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "stickers-squished-red-pandorama-sticker",
    "name": "Squished Red Pandorama Sticker",
    "category": "stickers",
    "value": 703.7046,
    "demand": 1,
    "image": "images/stickers/squished-red-pandorama-sticker.webp"
  },
  {
    "id": "vehicles-gold-scooter",
    "name": "Gold Scooter",
    "category": "vehicles",
    "value": 634.5189,
    "demand": 1,
    "image": "images/vehicles/gold-scooter.webp"
  },
  {
    "id": "food-2x-bucks-potion",
    "name": "2x Bucks Potion",
    "category": "food",
    "value": 120.0026,
    "demand": 2,
    "image": "images/food/2x-bucks-potion.webp"
  },
  {
    "id": "pets-granny-wolf",
    "name": "Granny Wolf",
    "category": "pets",
    "value": 22.4748,
    "demand": 1,
    "image": "images/pets/granny-wolf.webp"
  },
  {
    "id": "pets-jellyfish",
    "name": "Jellyfish",
    "category": "pets",
    "value": 922.597,
    "demand": 3,
    "image": "images/pets/jellyfish.webp"
  },
  {
    "id": "pets-forest-sprite",
    "name": "Forest Sprite",
    "category": "pets",
    "value": 82.3998,
    "demand": 1,
    "image": "images/pets/forest-sprite.webp"
  },
  {
    "id": "vehicles-harvest-truck",
    "name": "Harvest Truck",
    "category": "vehicles",
    "value": 71.0688,
    "demand": 1,
    "image": "images/vehicles/harvest-truck.webp"
  },
  {
    "id": "eggs-river",
    "name": "River",
    "category": "eggs",
    "value": 642.8582,
    "demand": 1,
    "image": "images/eggs/river.webp"
  },
  {
    "id": "vehicles-gold-snowboard",
    "name": "Gold Snowboard",
    "category": "vehicles",
    "value": 974.6194,
    "demand": 1,
    "image": "images/vehicles/gold-snowboard.webp"
  },
  {
    "id": "vehicles-snow-plow",
    "name": "Snow Plow",
    "category": "vehicles",
    "value": 218.2765,
    "demand": 1,
    "image": "images/vehicles/snow-plow.webp"
  },
  {
    "id": "pets-woodpecker",
    "name": "Woodpecker",
    "category": "pets",
    "value": 315.8572,
    "demand": 1,
    "image": "images/pets/woodpecker.webp"
  },
  {
    "id": "petwear-blue-butterfly-wings",
    "name": "Blue Butterfly Wings",
    "category": "petwear",
    "value": 674.6998,
    "demand": 2,
    "image": "images/petwear/blue-butterfly-wings.webp"
  },
  {
    "id": "toys-banjo",
    "name": "Banjo",
    "category": "toys",
    "value": 751.7249,
    "demand": 1,
    "image": "images/toys/banjo.webp"
  },
  {
    "id": "toys-carrot-friend-plushie",
    "name": "Carrot Friend Plushie",
    "category": "toys",
    "value": 20.6926,
    "demand": 1,
    "image": "images/toys/carrot-friend-plushie.webp"
  },
  {
    "id": "pets-blue-betta-fish",
    "name": "Blue Betta Fish",
    "category": "pets",
    "value": 655.4317,
    "demand": 1,
    "image": "images/pets/blue-betta-fish.webp"
  },
  {
    "id": "toys-inflatable-sword",
    "name": "Inflatable Sword",
    "category": "toys",
    "value": 400.0018,
    "demand": 1,
    "image": "images/toys/inflatable-sword.webp"
  },
  {
    "id": "pets-skelerex",
    "name": "Skele-Rex",
    "category": "pets",
    "value": 739.0769,
    "demand": 2,
    "image": "images/pets/skele-rex.webp"
  },
  {
    "id": "pets-coconut-friend",
    "name": "Coconut Friend",
    "category": "pets",
    "value": 541.8241,
    "demand": 1,
    "image": "images/pets/coconut-friend.webp"
  },
  {
    "id": "strollers-race-car-stroller",
    "name": "Race Car Stroller",
    "category": "strollers",
    "value": 959.4596,
    "demand": 1,
    "image": "images/strollers/race-car-stroller.webp"
  },
  {
    "id": "petwear-tutu",
    "name": "Tutu",
    "category": "petwear",
    "value": 526.1058,
    "demand": 2,
    "image": "images/petwear/tutu.webp"
  },
  {
    "id": "pets-grave-owl",
    "name": "Grave Owl",
    "category": "pets",
    "value": 433.2102,
    "demand": 1,
    "image": "images/pets/grave-owl.webp"
  },
  {
    "id": "toys-anna-rattle",
    "name": "Anna Rattle",
    "category": "toys",
    "value": 737.9318,
    "demand": 1,
    "image": "images/toys/anna-rattle.webp"
  },
  {
    "id": "pets-warthog",
    "name": "Warthog",
    "category": "pets",
    "value": 404.4962,
    "demand": 1,
    "image": "images/pets/warthog.webp"
  },
  {
    "id": "pets-flash-weasel",
    "name": "Flash Weasel",
    "category": "pets",
    "value": 905.1189,
    "demand": 2,
    "image": "images/pets/flash-weasel.webp"
  },
  {
    "id": "pets-alicorn",
    "name": "Alicorn",
    "category": "pets",
    "value": 297.1307,
    "demand": 1,
    "image": "images/pets/alicorn.webp"
  },
  {
    "id": "pets-deinonychus",
    "name": "Deinonychus",
    "category": "pets",
    "value": 408.2415,
    "demand": 1,
    "image": "images/pets/deinonychus.webp"
  },
  {
    "id": "pets-lion",
    "name": "Lion",
    "category": "pets",
    "value": 933.8329,
    "demand": 3,
    "image": "images/pets/lion.webp"
  },
  {
    "id": "pets-robot",
    "name": "Robot",
    "category": "pets",
    "value": 119.8528,
    "demand": 1,
    "image": "images/pets/robot.webp"
  },
  {
    "id": "stickers-solaris-animated-sticker",
    "name": "Solaris Animated Sticker",
    "category": "stickers",
    "value": 870.3708,
    "demand": 2,
    "image": "images/stickers/solaris-animated-sticker.webp"
  },
  {
    "id": "strollers-pizza-stroller",
    "name": "Pizza Stroller",
    "category": "strollers",
    "value": 810.8114,
    "demand": 1,
    "image": "images/strollers/pizza-stroller.webp"
  },
  {
    "id": "pets-happy-duckling",
    "name": "Happy Duckling",
    "category": "pets",
    "value": 586.7678,
    "demand": 2,
    "image": "images/pets/happy-duckling.webp"
  },
  {
    "id": "vehicles-unstable-triangle-car",
    "name": "Unstable Triangle Car",
    "category": "vehicles",
    "value": 304.5706,
    "demand": 1,
    "image": "images/vehicles/unstable-triangle-car.webp"
  },
  {
    "id": "pets-kitty-bat",
    "name": "Kitty Bat",
    "category": "pets",
    "value": 689.1395,
    "demand": 2,
    "image": "images/pets/kitty-bat.webp"
  },
  {
    "id": "stickers-panda-sticker",
    "name": "Panda Sticker",
    "category": "stickers",
    "value": 555.5569,
    "demand": 1,
    "image": "images/stickers/panda-sticker.webp"
  },
  {
    "id": "pets-griffin",
    "name": "Griffin",
    "category": "pets",
    "value": 601.749,
    "demand": 1,
    "image": "images/pets/griffin.webp"
  },
  {
    "id": "petwear-rainbow-dragon-hat",
    "name": "Rainbow Dragon Hat",
    "category": "petwear",
    "value": 40.1635,
    "demand": 1,
    "image": "images/petwear/rainbow-dragon-hat.webp"
  },
  {
    "id": "pets-glormy-hound",
    "name": "Glormy Hound",
    "category": "pets",
    "value": 797.7534,
    "demand": 2,
    "image": "images/pets/glormy-hound.webp"
  },
  {
    "id": "toys-fancy-umbrella",
    "name": "Fancy Umbrella",
    "category": "toys",
    "value": 717.2422,
    "demand": 1,
    "image": "images/toys/fancy-umbrella.webp"
  },
  {
    "id": "petwear-dragonfly-fairy-wings",
    "name": "Dragonfly Fairy Wings",
    "category": "petwear",
    "value": 915.6629,
    "demand": 2,
    "image": "images/petwear/dragonfly-fairy-wings.webp"
  },
  {
    "id": "pets-orca",
    "name": "Orca",
    "category": "pets",
    "value": 169.7903,
    "demand": 1,
    "image": "images/pets/orca.webp"
  },
  {
    "id": "pets-frogspawn",
    "name": "Frogspawn",
    "category": "pets",
    "value": 270.9135,
    "demand": 1,
    "image": "images/pets/frogspawn.webp"
  },
  {
    "id": "pets-firefly",
    "name": "Firefly",
    "category": "pets",
    "value": 751.5613,
    "demand": 2,
    "image": "images/pets/firefly.webp"
  },
  {
    "id": "pets-volcanic-rhino",
    "name": "Volcanic Rhino",
    "category": "pets",
    "value": 735.3316,
    "demand": 2,
    "image": "images/pets/volcanic-rhino.webp"
  },
  {
    "id": "pets-diamond-mahi-mahi",
    "name": "Diamond Mahi Mahi",
    "category": "pets",
    "value": 257.1808,
    "demand": 1,
    "image": "images/pets/diamond-mahi-mahi.webp"
  },
  {
    "id": "eggs-desert-egg",
    "name": "Desert Egg",
    "category": "eggs",
    "value": 380.9542,
    "demand": 2,
    "image": "images/eggs/desert-egg.webp"
  },
  {
    "id": "stickers-well-actually-walrus-sticker",
    "name": "Well, Actually Walrus Sticker",
    "category": "stickers",
    "value": 814.8154,
    "demand": 2,
    "image": "images/stickers/well-actually-walrus-sticker.webp"
  },
  {
    "id": "vehicles-bubble-car",
    "name": "Bubble Car",
    "category": "vehicles",
    "value": 441.626,
    "demand": 1,
    "image": "images/vehicles/bubble-car.webp"
  },
  {
    "id": "stickers-dodo-sticker",
    "name": "Dodo Sticker",
    "category": "stickers",
    "value": 203.7061,
    "demand": 1,
    "image": "images/stickers/dodo-sticker.webp"
  },
  {
    "id": "petwear-candy-cane-wings",
    "name": "Candy Cane Wings",
    "category": "petwear",
    "value": 172.6932,
    "demand": 1,
    "image": "images/petwear/candy-cane-wings.webp"
  },
  {
    "id": "vehicles-ice-cream-truck",
    "name": "Ice Cream Truck",
    "category": "vehicles",
    "value": 517.7679,
    "demand": 2,
    "image": "images/vehicles/ice-cream-truck.webp"
  },
  {
    "id": "pets-moonlight-moth",
    "name": "Moonlight Moth",
    "category": "pets",
    "value": 554.3085,
    "demand": 1,
    "image": "images/pets/moonlight-moth.webp"
  },
  {
    "id": "petwear-love-letter",
    "name": "Love Letter",
    "category": "petwear",
    "value": 136.5488,
    "demand": 1,
    "image": "images/petwear/love-letter.webp"
  },
  {
    "id": "stickers-slothula-transformation-animated-sticker",
    "name": "Slothula Transformation Animated Sticker",
    "category": "stickers",
    "value": 712.9638,
    "demand": 1,
    "image": "images/stickers/slothula-transformation-animated-sticker.webp"
  },
  {
    "id": "pets-gingerbread-mouse",
    "name": "Gingerbread Mouse",
    "category": "pets",
    "value": 370.7884,
    "demand": 1,
    "image": "images/pets/gingerbread-mouse.webp"
  },
  {
    "id": "petwear-rain-cloud-hat",
    "name": "Rain Cloud Hat",
    "category": "petwear",
    "value": 927.7111,
    "demand": 3,
    "image": "images/petwear/rain-cloud-hat.webp"
  },
  {
    "id": "petwear-spring-bunny-nose",
    "name": "Spring Bunny Nose",
    "category": "petwear",
    "value": 855.4221,
    "demand": 2,
    "image": "images/petwear/spring-bunny-nose.webp"
  },
  {
    "id": "food-golden-clam",
    "name": "Golden Clam",
    "category": "food",
    "value": 460.0016,
    "demand": 2,
    "image": "images/food/golden-clam.webp"
  },
  {
    "id": "pets-werewolf",
    "name": "Werewolf",
    "category": "pets",
    "value": 946.3173,
    "demand": 2,
    "image": "images/pets/werewolf.webp"
  },
  {
    "id": "pets-sushi-penguin",
    "name": "Sushi Penguin",
    "category": "pets",
    "value": 732.8348,
    "demand": 2,
    "image": "images/pets/sushi-penguin.webp"
  },
  {
    "id": "pets-officer-gibbon",
    "name": "Officer Gibbon",
    "category": "pets",
    "value": 339.5775,
    "demand": 1,
    "image": "images/pets/officer-gibbon.webp"
  },
  {
    "id": "food-golden-leaf",
    "name": "Golden Leaf",
    "category": "food",
    "value": 1000.0,
    "demand": 2,
    "image": "images/food/golden-leaf.webp"
  },
  {
    "id": "strollers-ufo-stroller",
    "name": "UFO Stroller",
    "category": "strollers",
    "value": 229.732,
    "demand": 1,
    "image": "images/strollers/ufo-stroller.webp"
  },
  {
    "id": "vehicles-axel",
    "name": "Axel",
    "category": "vehicles",
    "value": 360.408,
    "demand": 1,
    "image": "images/vehicles/axel.webp"
  },
  {
    "id": "pets-blue-dog",
    "name": "Blue Dog",
    "category": "pets",
    "value": 930.0876,
    "demand": 2,
    "image": "images/pets/blue-dog.webp"
  },
  {
    "id": "pets-love-bird",
    "name": "Love Bird",
    "category": "pets",
    "value": 479.4023,
    "demand": 1,
    "image": "images/pets/love-bird.webp"
  },
  {
    "id": "stickers-phoenix-sticker",
    "name": "Phoenix Sticker",
    "category": "stickers",
    "value": 694.4454,
    "demand": 1,
    "image": "images/stickers/phoenix-sticker.webp"
  },
  {
    "id": "strollers-quad-stroller",
    "name": "Quad Stroller",
    "category": "strollers",
    "value": 986.4865,
    "demand": 2,
    "image": "images/strollers/quad-stroller.webp"
  },
  {
    "id": "pets-halloween-golden-mummy-cat",
    "name": "Halloween Golden Mummy Cat",
    "category": "pets",
    "value": 551.8116,
    "demand": 1,
    "image": "images/pets/halloween-golden-mummy-cat.webp"
  },
  {
    "id": "pets-australian-kelpie",
    "name": "Australian Kelpie",
    "category": "pets",
    "value": 360.8009,
    "demand": 1,
    "image": "images/pets/australian-kelpie.webp"
  },
  {
    "id": "pets-temple-friend",
    "name": "Temple Friend",
    "category": "pets",
    "value": 398.254,
    "demand": 1,
    "image": "images/pets/temple-friend.webp"
  },
  {
    "id": "vehicles-adopt-me-girl-scooter",
    "name": "Adopt Me Girl Scooter",
    "category": "vehicles",
    "value": 720.813,
    "demand": 1,
    "image": "images/vehicles/adopt-me-girl-scooter.webp"
  },
  {
    "id": "pets-ehecatl",
    "name": "Ehecatl",
    "category": "pets",
    "value": 166.0449,
    "demand": 1,
    "image": "images/pets/ehecatl.webp"
  },
  {
    "id": "petwear-angel-wings",
    "name": "Angel Wings",
    "category": "petwear",
    "value": 955.8234,
    "demand": 3,
    "image": "images/petwear/angel-wings.webp"
  },
  {
    "id": "pets-kelp-raider",
    "name": "Kelp Raider",
    "category": "pets",
    "value": 318.3541,
    "demand": 1,
    "image": "images/pets/kelp-raider.webp"
  },
  {
    "id": "pets-snorgle",
    "name": "Snorgle",
    "category": "pets",
    "value": 173.5356,
    "demand": 1,
    "image": "images/pets/snorgle.webp"
  },
  {
    "id": "petwear-dancing-tube-hat",
    "name": "Dancing Tube Hat",
    "category": "petwear",
    "value": 722.8924,
    "demand": 1,
    "image": "images/petwear/dancing-tube-hat.webp"
  },
  {
    "id": "petwear-flower-beret",
    "name": "Flower Beret",
    "category": "petwear",
    "value": 457.833,
    "demand": 1,
    "image": "images/petwear/flower-beret.webp"
  },
  {
    "id": "petwear-tiny-wings",
    "name": "Tiny Wings",
    "category": "petwear",
    "value": 907.6308,
    "demand": 3,
    "image": "images/petwear/tiny-wings.webp"
  },
  {
    "id": "pets-shark-puppy",
    "name": "Shark Puppy",
    "category": "pets",
    "value": 926.3423,
    "demand": 3,
    "image": "images/pets/shark-puppy.webp"
  },
  {
    "id": "pets-jousting-horse",
    "name": "Jousting Horse",
    "category": "pets",
    "value": 842.6971,
    "demand": 2,
    "image": "images/pets/jousting-horse.webp"
  },
  {
    "id": "pets-arctic-fox",
    "name": "Arctic Fox",
    "category": "pets",
    "value": 913.8579,
    "demand": 3,
    "image": "images/pets/arctic-fox.webp"
  },
  {
    "id": "petwear-purple-heart-glasses",
    "name": "Purple Heart Glasses",
    "category": "petwear",
    "value": 261.0464,
    "demand": 1,
    "image": "images/petwear/purple-heart-glasses.webp"
  },
  {
    "id": "pets-peachick",
    "name": "Peachick",
    "category": "pets",
    "value": 388.2665,
    "demand": 1,
    "image": "images/pets/peachick.webp"
  },
  {
    "id": "petwear-alien-eyes-hat",
    "name": "Alien Eyes Hat",
    "category": "petwear",
    "value": 686.7479,
    "demand": 2,
    "image": "images/petwear/alien-eyes-hat.webp"
  },
  {
    "id": "pets-yeti",
    "name": "Yeti",
    "category": "pets",
    "value": 690.3879,
    "demand": 2,
    "image": "images/pets/yeti.webp"
  },
  {
    "id": "stickers-scarebear-sticker",
    "name": "Scarebear Sticker",
    "category": "stickers",
    "value": 129.6322,
    "demand": 1,
    "image": "images/stickers/scarebear-sticker.webp"
  },
  {
    "id": "strollers-hatched-egg-stroller",
    "name": "Hatched Egg Stroller",
    "category": "strollers",
    "value": 527.0284,
    "demand": 1,
    "image": "images/strollers/hatched-egg-stroller.webp"
  },
  {
    "id": "vehicles-prince-carriage",
    "name": "Prince Carriage",
    "category": "vehicles",
    "value": 401.017,
    "demand": 1,
    "image": "images/vehicles/prince-carriage.webp"
  },
  {
    "id": "petwear-2022-birthday-5-badge",
    "name": "2022 Birthday 5 Badge",
    "category": "petwear",
    "value": 634.5392,
    "demand": 1,
    "image": "images/petwear/2022-birthday-5-badge.webp"
  },
  {
    "id": "stickers-tree-decorating-animated-sticker",
    "name": "Tree Decorating Animated Sticker",
    "category": "stickers",
    "value": 888.8892,
    "demand": 2,
    "image": "images/stickers/tree-decorating-animated-sticker.webp"
  },
  {
    "id": "pets-tarantula",
    "name": "Tarantula",
    "category": "pets",
    "value": 244.6964,
    "demand": 1,
    "image": "images/pets/tarantula.webp"
  },
  {
    "id": "petwear-nest-of-eggs",
    "name": "Nest of Eggs",
    "category": "petwear",
    "value": 425.7045,
    "demand": 1,
    "image": "images/petwear/nest-of-eggs.webp"
  },
  {
    "id": "pets-goldfish",
    "name": "Goldfish",
    "category": "pets",
    "value": 436.9555,
    "demand": 1,
    "image": "images/pets/goldfish.webp"
  },
  {
    "id": "strollers-catapult-stroller",
    "name": "Catapult Stroller",
    "category": "strollers",
    "value": 283.7859,
    "demand": 1,
    "image": "images/strollers/catapult-stroller.webp"
  },
  {
    "id": "toys-skeleton-pogo-stick",
    "name": "Skeleton Pogo Stick",
    "category": "toys",
    "value": 406.8983,
    "demand": 1,
    "image": "images/toys/skeleton-pogo-stick.webp"
  },
  {
    "id": "pets-golden-jaguar",
    "name": "Golden Jaguar",
    "category": "pets",
    "value": 594.2584,
    "demand": 1,
    "image": "images/pets/golden-jaguar.webp"
  },
  {
    "id": "pets-ginger-cat",
    "name": "Ginger Cat",
    "category": "pets",
    "value": 151.0637,
    "demand": 1,
    "image": "images/pets/ginger-cat.webp"
  },
  {
    "id": "toys-puppy-plush",
    "name": "Puppy Plush",
    "category": "toys",
    "value": 662.07,
    "demand": 1,
    "image": "images/toys/puppy-plush.webp"
  },
  {
    "id": "pets-cake-friend",
    "name": "Cake Friend",
    "category": "pets",
    "value": 651.6864,
    "demand": 2,
    "image": "images/pets/cake-friend.webp"
  },
  {
    "id": "stickers-shadow-dragon-animated-sticker",
    "name": "Shadow Dragon Animated Sticker",
    "category": "stickers",
    "value": 925.9261,
    "demand": 2,
    "image": "images/stickers/shadow-dragon-animated-sticker.webp"
  },
  {
    "id": "pets-hot-doggo",
    "name": "Hot Doggo",
    "category": "pets",
    "value": 972.5344,
    "demand": 3,
    "image": "images/pets/hot-doggo.webp"
  },
  {
    "id": "pets-jumpscare",
    "name": "Jumpscare",
    "category": "pets",
    "value": 136.0825,
    "demand": 1,
    "image": "images/pets/jumpscare.webp"
  },
  {
    "id": "vehicles-festive-wagon",
    "name": "Festive Wagon",
    "category": "vehicles",
    "value": 299.4945,
    "demand": 1,
    "image": "images/vehicles/festive-wagon.webp"
  },
  {
    "id": "petwear-science-hat",
    "name": "Science Hat",
    "category": "petwear",
    "value": 445.7848,
    "demand": 1,
    "image": "images/petwear/science-hat.webp"
  },
  {
    "id": "pets-haetyphoon",
    "name": "Haetyphoon",
    "category": "pets",
    "value": 907.6158,
    "demand": 2,
    "image": "images/pets/haetyphoon.webp"
  },
  {
    "id": "strollers-rocket-ship-stroller",
    "name": "Rocket Ship Stroller",
    "category": "strollers",
    "value": 310.8129,
    "demand": 1,
    "image": "images/strollers/rocket-ship-stroller.webp"
  },
  {
    "id": "pets-red-crowned-crane",
    "name": "Red Crowned Crane",
    "category": "pets",
    "value": 345.8197,
    "demand": 1,
    "image": "images/pets/red-crowned-crane.webp"
  },
  {
    "id": "pets-mistletroll",
    "name": "Mistletroll",
    "category": "pets",
    "value": 298.3791,
    "demand": 1,
    "image": "images/pets/mistletroll.webp"
  },
  {
    "id": "pets-black-kite",
    "name": "Black Kite",
    "category": "pets",
    "value": 378.279,
    "demand": 1,
    "image": "images/pets/black-kite.webp"
  },
  {
    "id": "pets-cuteacabra",
    "name": "Cute-A-Cabra",
    "category": "pets",
    "value": 384.5212,
    "demand": 1,
    "image": "images/pets/cute-a-cabra.webp"
  },
  {
    "id": "strollers-claw-machine-stroller",
    "name": "Claw Machine Stroller",
    "category": "strollers",
    "value": 459.4611,
    "demand": 1,
    "image": "images/strollers/claw-machine-stroller.webp"
  },
  {
    "id": "toys-ice-cream-plush",
    "name": "Ice Cream Plush",
    "category": "toys",
    "value": 96.5544,
    "demand": 1,
    "image": "images/toys/ice-cream-plush.webp"
  },
  {
    "id": "pets-dire-stag",
    "name": "Dire Stag",
    "category": "pets",
    "value": 724.0957,
    "demand": 2,
    "image": "images/pets/dire-stag.webp"
  },
  {
    "id": "petwear-ice-cream-heels",
    "name": "Ice Cream Heels",
    "category": "petwear",
    "value": 650.6035,
    "demand": 2,
    "image": "images/petwear/ice-cream-heels.webp"
  },
  {
    "id": "toys-jackhammer",
    "name": "Jackhammer",
    "category": "toys",
    "value": 772.4145,
    "demand": 1,
    "image": "images/toys/jackhammer.webp"
  },
  {
    "id": "pets-jacobin-pigeon",
    "name": "Jacobin Pigeon",
    "category": "pets",
    "value": 49.9404,
    "demand": 1,
    "image": "images/pets/jacobin-pigeon.webp"
  },
  {
    "id": "pets-ghost-chick",
    "name": "Ghost Chick",
    "category": "pets",
    "value": 413.2352,
    "demand": 1,
    "image": "images/pets/ghost-chick.webp"
  },
  {
    "id": "vehicles-orange-snowboard",
    "name": "Orange Neon Snowboard",
    "category": "vehicles",
    "value": 873.0968,
    "demand": 2,
    "image": "images/vehicles/orange-neon-snowboard.webp"
  },
  {
    "id": "petwear-lunar-new-year-shoes",
    "name": "Lunar New Year Shoes",
    "category": "petwear",
    "value": 578.3145,
    "demand": 1,
    "image": "images/petwear/lunar-new-year-shoes.webp"
  },
  {
    "id": "pets-ghost-wolf",
    "name": "Ghost Wolf",
    "category": "pets",
    "value": 207.2433,
    "demand": 1,
    "image": "images/pets/ghost-wolf.webp"
  },
  {
    "id": "stickers-seagull-yell-animated-sticker",
    "name": "Seagull Yell Animated Sticker",
    "category": "stickers",
    "value": 990.7408,
    "demand": 2,
    "image": "images/stickers/seagull-yell-animated-sticker.webp"
  },
  {
    "id": "pets-frankenfeline",
    "name": "Frankenfeline",
    "category": "pets",
    "value": 179.7777,
    "demand": 1,
    "image": "images/pets/frankenfeline.webp"
  },
  {
    "id": "petwear-lava-lamp-hat",
    "name": "Lava Lamp Hat",
    "category": "petwear",
    "value": 590.3627,
    "demand": 1,
    "image": "images/petwear/lava-lamp-hat.webp"
  },
  {
    "id": "pets-pig",
    "name": "Pig",
    "category": "pets",
    "value": 920.1001,
    "demand": 3,
    "image": "images/pets/pig.webp"
  },
  {
    "id": "stickers-shiba-inu-sticker",
    "name": "Shiba Inu Sticker",
    "category": "stickers",
    "value": 379.6315,
    "demand": 1,
    "image": "images/stickers/shiba-inu-sticker.webp"
  },
  {
    "id": "pets-ghost",
    "name": "Ghost",
    "category": "pets",
    "value": 249.6901,
    "demand": 1,
    "image": "images/pets/ghost.webp"
  },
  {
    "id": "pets-angus-bull",
    "name": "Angus Bull",
    "category": "pets",
    "value": 466.918,
    "demand": 1,
    "image": "images/pets/angus-bull.webp"
  },
  {
    "id": "petwear-eco-brown-branch-headphones",
    "name": "Eco Brown Branch Headphones",
    "category": "petwear",
    "value": 678.7158,
    "demand": 1,
    "image": "images/petwear/eco-brown-branch-headphones.webp"
  },
  {
    "id": "petwear-venus-flytrap-hat",
    "name": "Venus Flytrap Hat",
    "category": "petwear",
    "value": 566.2664,
    "demand": 1,
    "image": "images/petwear/venus-flytrap-hat.webp"
  },
  {
    "id": "food-golden-wheat",
    "name": "Golden Wheat",
    "category": "food",
    "value": 560.0013,
    "demand": 2,
    "image": "images/food/golden-wheat.webp"
  },
  {
    "id": "pets-aestus",
    "name": "Aestus",
    "category": "pets",
    "value": 823.9706,
    "demand": 2,
    "image": "images/pets/aestus.webp"
  },
  {
    "id": "gifts-special-lunar-new-year-gift-box",
    "name": "Special Lunar New Year Gift Box",
    "category": "gifts",
    "value": 585.3671,
    "demand": 1,
    "image": "images/gifts/special-lunar-new-year-gift-box.webp"
  },
  {
    "id": "food-chocolate-twist",
    "name": "Chocolate Twist",
    "category": "food",
    "value": 640.0011,
    "demand": 2,
    "image": "images/food/chocolate-twist.webp"
  },
  {
    "id": "pets-dotted-eggy",
    "name": "Dotted Eggy",
    "category": "pets",
    "value": 245.9448,
    "demand": 1,
    "image": "images/pets/dotted-eggy.webp"
  },
  {
    "id": "petwear-admin-vision-wings",
    "name": "Admin Vision Wings",
    "category": "petwear",
    "value": 851.4061,
    "demand": 2,
    "image": ""
  },
  {
    "id": "petwear-halloween-white-skull-hat",
    "name": "Halloween White Skull Hat",
    "category": "petwear",
    "value": 329.3193,
    "demand": 2,
    "image": "images/petwear/halloween-white-skull-hat.webp"
  },
  {
    "id": "pets-ghost-dog",
    "name": "Ghost Dog",
    "category": "pets",
    "value": 664.1708,
    "demand": 2,
    "image": "images/pets/ghost-dog.webp"
  },
  {
    "id": "stickers-aurora-fox-sticker",
    "name": "Aurora Fox Sticker",
    "category": "stickers",
    "value": 166.6692,
    "demand": 1,
    "image": "images/stickers/aurora-fox-sticker.webp"
  },
  {
    "id": "strollers-fall-wheelbarrow-stroller",
    "name": "Fall Wheelbarrow Stroller",
    "category": "strollers",
    "value": 175.6781,
    "demand": 1,
    "image": "images/strollers/fall-wheelbarrow-stroller.webp"
  },
  {
    "id": "vehicles-dragon-train",
    "name": "Dragon Train",
    "category": "vehicles",
    "value": 893.4013,
    "demand": 1,
    "image": "images/vehicles/dragon-train.webp"
  },
  {
    "id": "petwear-bear-hood",
    "name": "Bear Hood",
    "category": "petwear",
    "value": 160.6451,
    "demand": 1,
    "image": "images/petwear/bear-hood.webp"
  },
  {
    "id": "eggs-royal-egg",
    "name": "Royal Egg",
    "category": "eggs",
    "value": 166.6692,
    "demand": 1,
    "image": "images/eggs/royal-egg.webp"
  },
  {
    "id": "petwear-cowboy-saddle",
    "name": "Cowboy Saddle",
    "category": "petwear",
    "value": 730.9245,
    "demand": 2,
    "image": "images/petwear/cowboy-saddle.webp"
  },
  {
    "id": "pets-classic-teapot",
    "name": "Classic Teapot",
    "category": "pets",
    "value": 218.4792,
    "demand": 1,
    "image": "images/pets/classic-teapot.webp"
  },
  {
    "id": "pets-aurora-fox",
    "name": "Aurora Fox",
    "category": "pets",
    "value": 877.6533,
    "demand": 2,
    "image": "images/pets/aurora-fox.webp"
  },
  {
    "id": "stickers-blazing-lion-animated-sticker",
    "name": "Blazing Lion Animated Sticker",
    "category": "stickers",
    "value": 981.4815,
    "demand": 2,
    "image": "images/stickers/blazing-lion-animated-sticker.webp"
  },
  {
    "id": "pets-show-pony",
    "name": "Show Pony",
    "category": "pets",
    "value": 168.5418,
    "demand": 1,
    "image": "images/pets/show-pony.webp"
  },
  {
    "id": "pets-bunny-swirl",
    "name": "Bunny Swirl",
    "category": "pets",
    "value": 610.4881,
    "demand": 2,
    "image": "images/pets/bunny-swirl.webp"
  },
  {
    "id": "pets-sea-slug",
    "name": "Sea Slug",
    "category": "pets",
    "value": 927.5907,
    "demand": 2,
    "image": "images/pets/sea-slug.webp"
  },
  {
    "id": "petwear-propeller-hat",
    "name": "Propeller Hat",
    "category": "petwear",
    "value": 859.4382,
    "demand": 2,
    "image": "images/petwear/propeller-hat.webp"
  },
  {
    "id": "pets-pink-cat",
    "name": "Pink Cat",
    "category": "pets",
    "value": 912.6095,
    "demand": 2,
    "image": "images/pets/pink-cat.webp"
  },
  {
    "id": "pets-lynx",
    "name": "Lynx",
    "category": "pets",
    "value": 676.6552,
    "demand": 2,
    "image": "images/pets/lynx.webp"
  },
  {
    "id": "pets-praying-mantis",
    "name": "Praying Mantis",
    "category": "pets",
    "value": 431.9618,
    "demand": 1,
    "image": "images/pets/praying-mantis.webp"
  },
  {
    "id": "pets-mr-whiskerpips",
    "name": "Mr. Whiskerpips",
    "category": "pets",
    "value": 558.0538,
    "demand": 2,
    "image": "images/pets/mr-whiskerpips.webp"
  },
  {
    "id": "pets-green-butterfly",
    "name": "Green Butterfly",
    "category": "pets",
    "value": 756.555,
    "demand": 2,
    "image": "images/pets/green-butterfly.webp"
  },
  {
    "id": "petwear-ember-wings",
    "name": "Ember Wings",
    "category": "petwear",
    "value": 887.5505,
    "demand": 2,
    "image": "images/petwear/ember-wings.webp"
  },
  {
    "id": "stickers-leviathan-sticker",
    "name": "Leviathan Sticker",
    "category": "stickers",
    "value": 314.8169,
    "demand": 1,
    "image": "images/stickers/leviathan-sticker.webp"
  },
  {
    "id": "vehicles-pink-scooter",
    "name": "Pink Scooter",
    "category": "vehicles",
    "value": 512.6918,
    "demand": 1,
    "image": "images/vehicles/pink-scooter.webp"
  },
  {
    "id": "vehicles-black-cab",
    "name": "Black Cab",
    "category": "vehicles",
    "value": 395.9409,
    "demand": 1,
    "image": "images/vehicles/black-cab.webp"
  },
  {
    "id": "pets-white-choccybunny",
    "name": "White Choccybunny",
    "category": "pets",
    "value": 57.431,
    "demand": 1,
    "image": "images/pets/white-choccybunny.webp"
  },
  {
    "id": "vehicles-wood-scooter",
    "name": "Wood Scooter",
    "category": "vehicles",
    "value": 522.8441,
    "demand": 1,
    "image": "images/vehicles/wood-scooter.webp"
  },
  {
    "id": "vehicles-red-skateboard",
    "name": "Neon Red Skateboard",
    "category": "vehicles",
    "value": 817.2594,
    "demand": 1,
    "image": "images/vehicles/neon-red-skateboard.webp"
  },
  {
    "id": "pets-african-wild-dog",
    "name": "African Wild Dog",
    "category": "pets",
    "value": 990.0125,
    "demand": 3,
    "image": "images/pets/african-wild-dog.webp"
  },
  {
    "id": "vehicles-flying-cloud",
    "name": "Flying Cloud",
    "category": "vehicles",
    "value": 746.1937,
    "demand": 2,
    "image": "images/vehicles/flying-cloud.webp"
  },
  {
    "id": "pets-amethyst-penguin",
    "name": "Amethyst Penguin",
    "category": "pets",
    "value": 986.2672,
    "demand": 2,
    "image": "images/pets/amethyst-penguin.webp"
  },
  {
    "id": "eggs-dylan",
    "name": "Dylan",
    "category": "eggs",
    "value": 595.2393,
    "demand": 1,
    "image": "images/eggs/dylan.webp"
  },
  {
    "id": "toys-premium-camping-tent",
    "name": "Premium Camping Tent",
    "category": "toys",
    "value": 303.4504,
    "demand": 1,
    "image": "images/toys/premium-camping-tent.webp"
  },
  {
    "id": "stickers-mini-pig-sticker",
    "name": "Mini Pig Sticker",
    "category": "stickers",
    "value": 527.7792,
    "demand": 1,
    "image": "images/stickers/mini-pig-sticker.webp"
  },
  {
    "id": "pets-singularity-pisces",
    "name": "Singularity Pisces",
    "category": "pets",
    "value": 419.4774,
    "demand": 1,
    "image": "images/pets/singularity-pisces.webp"
  },
  {
    "id": "toys-marsh-plush",
    "name": "Marsh Plush",
    "category": "toys",
    "value": 510.3463,
    "demand": 1,
    "image": "images/toys/marsh-plush.webp"
  },
  {
    "id": "pets-gold-mahi-mahi",
    "name": "Gold Mahi Mahi",
    "category": "pets",
    "value": 69.9154,
    "demand": 1,
    "image": "images/pets/gold-mahi-mahi.webp"
  },
  {
    "id": "pets-purple-butterfly",
    "name": "Purple Butterfly",
    "category": "pets",
    "value": 835.2065,
    "demand": 2,
    "image": "images/pets/purple-butterfly.webp"
  },
  {
    "id": "vehicles-ghoul-mobile",
    "name": "Ghoul Mobile",
    "category": "vehicles",
    "value": 96.4494,
    "demand": 1,
    "image": "images/vehicles/ghoul-mobile.webp"
  },
  {
    "id": "pets-ash-zebra",
    "name": "Ash Zebra",
    "category": "pets",
    "value": 593.01,
    "demand": 1,
    "image": "images/pets/ash-zebra.webp"
  },
  {
    "id": "pets-giant-black-scarab",
    "name": "Giant Black Scarab",
    "category": "pets",
    "value": 395.7571,
    "demand": 1,
    "image": "images/pets/giant-black-scarab.webp"
  },
  {
    "id": "vehicles-egg-delivery-machine",
    "name": "Egg Delivery Machine",
    "category": "vehicles",
    "value": 421.3215,
    "demand": 1,
    "image": "images/vehicles/egg-delivery-machine.webp"
  },
  {
    "id": "pets-2d-doggy",
    "name": "2D Doggy",
    "category": "pets",
    "value": 761.5488,
    "demand": 1,
    "image": "images/pets/2d-doggy.webp"
  },
  {
    "id": "petwear-burger-boots",
    "name": "Burger Boots",
    "category": "petwear",
    "value": 714.8603,
    "demand": 2,
    "image": "images/petwear/burger-boots.webp"
  },
  {
    "id": "pets-burning-bunny",
    "name": "Burning Bunny",
    "category": "pets",
    "value": 515.6069,
    "demand": 1,
    "image": "images/pets/burning-bunny.webp"
  },
  {
    "id": "pets-chef-gorilla",
    "name": "Chef Gorilla",
    "category": "pets",
    "value": 766.5425,
    "demand": 2,
    "image": "images/pets/chef-gorilla.webp"
  },
  {
    "id": "pets-gaelic-fae",
    "name": "Gaelic Fae",
    "category": "pets",
    "value": 791.5112,
    "demand": 2,
    "image": "images/pets/gaelic-fae.webp"
  },
  {
    "id": "petwear-chick-backpack",
    "name": "Chick Backpack",
    "category": "petwear",
    "value": 305.223,
    "demand": 1,
    "image": "images/petwear/chick-backpack.webp"
  },
  {
    "id": "strollers-car-stroller",
    "name": "Car Stroller",
    "category": "strollers",
    "value": 324.3264,
    "demand": 1,
    "image": "images/strollers/car-stroller.webp"
  },
  {
    "id": "eggs-pistachio",
    "name": "Pistachio",
    "category": "eggs",
    "value": 619.0488,
    "demand": 1,
    "image": "images/eggs/pistachio.webp"
  },
  {
    "id": "pets-tree-sasquatch",
    "name": "Tree Sasquatch",
    "category": "pets",
    "value": 111.1138,
    "demand": 1,
    "image": "images/pets/tree-sasquatch.webp"
  },
  {
    "id": "pets-banded-palm-civet",
    "name": "Banded Palm Civet",
    "category": "pets",
    "value": 222.2246,
    "demand": 1,
    "image": "images/pets/banded-palm-civet.webp"
  },
  {
    "id": "pets-gilded-snake",
    "name": "Gilded Snake",
    "category": "pets",
    "value": 679.152,
    "demand": 1,
    "image": "images/pets/gilded-snake.webp"
  },
  {
    "id": "pets-beaver",
    "name": "Beaver",
    "category": "pets",
    "value": 86.1451,
    "demand": 1,
    "image": "images/pets/beaver.webp"
  },
  {
    "id": "pets-sheeeeep",
    "name": "Sheeeeep",
    "category": "pets",
    "value": 896.3798,
    "demand": 2,
    "image": "images/pets/sheeeeep.webp"
  },
  {
    "id": "vehicles-festive-deliveries-present-truck",
    "name": "Festive Deliveries Present Truck",
    "category": "vehicles",
    "value": 593.9098,
    "demand": 1,
    "image": "images/vehicles/festive-deliveries-present-truck.webp"
  },
  {
    "id": "pets-skunk",
    "name": "Skunk",
    "category": "pets",
    "value": 465.6695,
    "demand": 1,
    "image": "images/pets/skunk.webp"
  },
  {
    "id": "pets-lunar-moon-bear",
    "name": "Lunar Moon Bear",
    "category": "pets",
    "value": 602.9974,
    "demand": 1,
    "image": "images/pets/lunar-moon-bear.webp"
  },
  {
    "id": "vehicles-cupids-coupe",
    "name": "Cupid's Coupe",
    "category": "vehicles",
    "value": 614.2144,
    "demand": 1,
    "image": "images/vehicles/cupid-s-coupe.webp"
  },
  {
    "id": "stickers-rat-sticker",
    "name": "Rat Sticker",
    "category": "stickers",
    "value": 398.15,
    "demand": 1,
    "image": "images/stickers/rat-sticker.webp"
  },
  {
    "id": "vehicles-tractor",
    "name": "Tractor",
    "category": "vehicles",
    "value": 76.1449,
    "demand": 1,
    "image": "images/vehicles/tractor.webp"
  },
  {
    "id": "pets-bunny",
    "name": "Bunny",
    "category": "pets",
    "value": 93.6357,
    "demand": 1,
    "image": "images/pets/bunny.webp"
  },
  {
    "id": "pets-fanghorn-tortoise",
    "name": "Fanghorn Tortoise",
    "category": "pets",
    "value": 461.9242,
    "demand": 1,
    "image": "images/pets/fanghorn-tortoise.webp"
  },
  {
    "id": "stickers-halloween-2024-sticker-pack",
    "name": "Halloween 2024 Sticker Pack",
    "category": "stickers",
    "value": 518.52,
    "demand": 1,
    "image": "images/stickers/halloween-2024-sticker-pack.webp"
  },
  {
    "id": "toys-solar-burst-paint",
    "name": "Solar Burst Mega Neon Paint",
    "category": "toys",
    "value": 813.7937,
    "demand": 3,
    "image": "images/toys/solar-burst-mega-neon-paint.webp"
  },
  {
    "id": "pets-onza",
    "name": "Onza",
    "category": "pets",
    "value": 177.2809,
    "demand": 1,
    "image": "images/pets/onza.webp"
  },
  {
    "id": "petwear-festive-scarf",
    "name": "Festive Scarf",
    "category": "petwear",
    "value": 68.2759,
    "demand": 1,
    "image": "images/petwear/festive-scarf.webp"
  },
  {
    "id": "pets-chameleon",
    "name": "Chameleon",
    "category": "pets",
    "value": 585.5193,
    "demand": 1,
    "image": "images/pets/chameleon.webp"
  },
  {
    "id": "pets-mexican-wolf",
    "name": "Mexican Wolf",
    "category": "pets",
    "value": 56.1826,
    "demand": 1,
    "image": "images/pets/mexican-wolf.webp"
  },
  {
    "id": "petwear-security-spotlight",
    "name": "Security Spotlight",
    "category": "petwear",
    "value": 72.2919,
    "demand": 1,
    "image": "images/petwear/security-spotlight.webp"
  },
  {
    "id": "toys-discosplosion",
    "name": "Discosplosion",
    "category": "toys",
    "value": 724.1388,
    "demand": 2,
    "image": "images/toys/discosplosion.webp"
  },
  {
    "id": "strollers-lunar-stroller",
    "name": "Lunar Stroller",
    "category": "strollers",
    "value": 472.9746,
    "demand": 1,
    "image": "images/strollers/lunar-stroller.webp"
  },
  {
    "id": "toys-wallet-chew-toy",
    "name": "Wallet Chew Toy",
    "category": "toys",
    "value": 0.003,
    "demand": 1,
    "image": "images/toys/wallet-chew-toy.webp"
  },
  {
    "id": "pets-fleur-de-ice",
    "name": "Fleur De Ice",
    "category": "pets",
    "value": 584.2709,
    "demand": 1,
    "image": "images/pets/fleur-de-ice.webp"
  },
  {
    "id": "pets-red-fox",
    "name": "Red Fox",
    "category": "pets",
    "value": 349.565,
    "demand": 1,
    "image": "images/pets/red-fox.webp"
  },
  {
    "id": "pets-poison-dart-frog",
    "name": "Poison Dart Frog",
    "category": "pets",
    "value": 277.1557,
    "demand": 1,
    "image": "images/pets/poison-dart-frog.webp"
  },
  {
    "id": "petwear-festive-light-crown",
    "name": "Festive Light Crown",
    "category": "petwear",
    "value": 265.0624,
    "demand": 1,
    "image": "images/petwear/festive-light-crown.webp"
  },
  {
    "id": "pets-prismatic-butterfly",
    "name": "Prismatic Butterfly",
    "category": "pets",
    "value": 769.0394,
    "demand": 2,
    "image": "images/pets/prismatic-butterfly.webp"
  },
  {
    "id": "pets-ancient-dragon",
    "name": "Ancient Dragon",
    "category": "pets",
    "value": 253.4354,
    "demand": 1,
    "image": "images/pets/ancient-dragon.webp"
  },
  {
    "id": "toys-golden-goblet",
    "name": "Golden Goblet",
    "category": "toys",
    "value": 834.4833,
    "demand": 1,
    "image": "images/toys/golden-goblet.webp"
  },
  {
    "id": "pets-german-shepherd",
    "name": "German Shepherd",
    "category": "pets",
    "value": 749.0644,
    "demand": 2,
    "image": "images/pets/german-shepherd.webp"
  },
  {
    "id": "petwear-ssbd-sunnies",
    "name": "SSBD Sunnies",
    "category": "petwear",
    "value": 995.9839,
    "demand": 2,
    "image": "images/petwear/ssbd-sunnies.webp"
  },
  {
    "id": "pets-ballet-swan",
    "name": "Ballet Swan",
    "category": "pets",
    "value": 866.4174,
    "demand": 2,
    "image": "images/pets/ballet-swan.webp"
  },
  {
    "id": "stickers-flamingo-sticker",
    "name": "Flamingo Sticker",
    "category": "stickers",
    "value": 648.1492,
    "demand": 1,
    "image": "images/stickers/flamingo-sticker.webp"
  },
  {
    "id": "pets-honey-badger",
    "name": "Honey Badger",
    "category": "pets",
    "value": 868.9143,
    "demand": 2,
    "image": "images/pets/honey-badger.webp"
  },
  {
    "id": "gifts-premium-gorilla-box",
    "name": "Premium Gorilla Box",
    "category": "gifts",
    "value": 853.659,
    "demand": 2,
    "image": "images/gifts/premium-gorilla-box.webp"
  },
  {
    "id": "toys-ukulele",
    "name": "Ukulele",
    "category": "toys",
    "value": 468.9671,
    "demand": 1,
    "image": "images/toys/ukulele.webp"
  },
  {
    "id": "eggs-garden-egg",
    "name": "Garden Egg",
    "category": "eggs",
    "value": 285.7164,
    "demand": 1,
    "image": "images/eggs/garden-egg.webp"
  },
  {
    "id": "pets-apple-owl",
    "name": "Apple Owl",
    "category": "pets",
    "value": 696.6301,
    "demand": 2,
    "image": "images/pets/apple-owl.webp"
  },
  {
    "id": "pets-armadillo",
    "name": "Armadillo",
    "category": "pets",
    "value": 148.5668,
    "demand": 1,
    "image": "images/pets/armadillo.webp"
  },
  {
    "id": "pets-therapy-dog",
    "name": "Therapy Dog",
    "category": "pets",
    "value": 506.8679,
    "demand": 1,
    "image": "images/pets/therapy-dog.webp"
  },
  {
    "id": "vehicles-lunar-muscle-car",
    "name": "Lunar Muscle Car",
    "category": "vehicles",
    "value": 203.0481,
    "demand": 1,
    "image": "images/vehicles/lunar-muscle-car.webp"
  },
  {
    "id": "petwear-leaf-hat",
    "name": "Leaf Hat",
    "category": "petwear",
    "value": 132.5327,
    "demand": 1,
    "image": "images/petwear/leaf-hat.webp"
  }
];
