/*
  ============================================================
  petswap.me — DATA FILE
  ============================================================
  This file is now built from a real StarPets.gg data pull
  (823 items across pets, eggs, potions, pet wear, vehicles,
  toys, strollers, and gifts), taken on 2026-08-11.

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
    "id": "petwear-thinking-hat",
    "name": "Thinking Hat",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/thinking-hat.webp"
  },
  {
    "id": "pets-2026-birthday-butterfly",
    "name": "2026 Birthday Butterfly",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/2026-birthday-butterfly.webp"
  },
  {
    "id": "pets-scarecrow-horse",
    "name": "Scarecrow Horse",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/scarecrow-horse.webp"
  },
  {
    "id": "petwear-rainbow-maker",
    "name": "Rainbow Maker",
    "category": "petwear",
    "value": 25.2,
    "demand": 3,
    "image": "images/petwear/rainbow-maker.webp"
  },
  {
    "id": "vehicles-imagination-box",
    "name": "Imagination Box",
    "category": "vehicles",
    "value": 0.175,
    "demand": 1,
    "image": "images/vehicles/imagination-box.webp"
  },
  {
    "id": "petwear-bee-hive",
    "name": "Bee Hive",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/bee-hive.webp"
  },
  {
    "id": "vehicles-red-scooter",
    "name": "Neon Red Scooter",
    "category": "vehicles",
    "value": 0.84,
    "demand": 1,
    "image": "images/vehicles/neon-red-scooter.webp"
  },
  {
    "id": "pets-rosy-maple-moth",
    "name": "Rosy Maple Moth",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/rosy-maple-moth.webp"
  },
  {
    "id": "pets-mushroom-friend",
    "name": "Mushroom Friend",
    "category": "pets",
    "value": 0.56,
    "demand": 1,
    "image": "images/pets/mushroom-friend.webp"
  },
  {
    "id": "pets-dimension-drifter",
    "name": "Dimension Drifter",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/dimension-drifter.webp"
  },
  {
    "id": "vehicles-suv",
    "name": "SUV",
    "category": "vehicles",
    "value": 0.175,
    "demand": 1,
    "image": "images/vehicles/suv.webp"
  },
  {
    "id": "gifts-moon-bear-box",
    "name": "Moon Bear Box",
    "category": "gifts",
    "value": 0.2422,
    "demand": 1,
    "image": "images/gifts/moon-bear-box.webp"
  },
  {
    "id": "pets-golden-penguin",
    "name": "Golden Penguin",
    "category": "pets",
    "value": 0.875,
    "demand": 2,
    "image": "images/pets/golden-penguin.webp"
  },
  {
    "id": "pets-pink-cat",
    "name": "Pink Cat",
    "category": "pets",
    "value": 2.8,
    "demand": 2,
    "image": "images/pets/pink-cat.webp"
  },
  {
    "id": "pets-velociraptor",
    "name": "Velociraptor",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/velociraptor.webp"
  },
  {
    "id": "pets-evil-basilisk",
    "name": "Evil Basilisk",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/evil-basilisk.webp"
  },
  {
    "id": "toys-velvet-fuchsia-paint",
    "name": "Velvet Fuchsia Mega Neon Paint",
    "category": "toys",
    "value": 0.28,
    "demand": 3,
    "image": "images/toys/velvet-fuchsia-mega-neon-paint.webp"
  },
  {
    "id": "potions-secret-talent-potion",
    "name": "Secret Talent Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-tutu",
    "name": "Tutu",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/tutu.webp"
  },
  {
    "id": "pets-princess-capuchin-monkey",
    "name": "Princess Capuchin Monkey",
    "category": "pets",
    "value": 0.56,
    "demand": 1,
    "image": "images/pets/princess-capuchin-monkey.webp"
  },
  {
    "id": "petwear-leprechaun-hat",
    "name": "Leprechaun Hat",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/leprechaun-hat.webp"
  },
  {
    "id": "food-strawberry-shortcake",
    "name": "Strawberry Shortcake",
    "category": "food",
    "value": 0.07,
    "demand": 1,
    "image": "images/food/strawberry-shortcake.webp"
  },
  {
    "id": "toys-christmas-doge-rattle",
    "name": "Christmas Doge Rattle",
    "category": "toys",
    "value": 0.21,
    "demand": 1,
    "image": "images/toys/christmas-doge-rattle.webp"
  },
  {
    "id": "pets-shiba-inu",
    "name": "Shiba Inu",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/shiba-inu.webp"
  },
  {
    "id": "pets-hopbop",
    "name": "Hopbop",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/hopbop.webp"
  },
  {
    "id": "pets-spinosaurus",
    "name": "Spinosaurus",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/spinosaurus.webp"
  },
  {
    "id": "petwear-elf-bandana",
    "name": "Elf Bandana",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/elf-bandana.webp"
  },
  {
    "id": "petwear-nest-of-eggs",
    "name": "Nest of Eggs",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/nest-of-eggs.webp"
  },
  {
    "id": "pets-leopard-cat",
    "name": "Leopard Cat",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/leopard-cat.webp"
  },
  {
    "id": "vehicles-lavender-teapot-carriage",
    "name": "Lavender Teapot Carriage",
    "category": "vehicles",
    "value": 0.315,
    "demand": 1,
    "image": "images/vehicles/lavender-teapot-carriage.webp"
  },
  {
    "id": "petwear-strawberry-clip",
    "name": "Strawberry Clip",
    "category": "petwear",
    "value": 0.315,
    "demand": 2,
    "image": "images/petwear/strawberry-clip.webp"
  },
  {
    "id": "pets-galapagos-sea-lion",
    "name": "Galapagos Sea Lion",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/galapagos-sea-lion.webp"
  },
  {
    "id": "pets-2d-kitty",
    "name": "2D Kitty",
    "category": "pets",
    "value": 0.91,
    "demand": 2,
    "image": "images/pets/2d-kitty.webp"
  },
  {
    "id": "pets-lunar-white-tiger",
    "name": "Lunar White Tiger",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/lunar-white-tiger.webp"
  },
  {
    "id": "petwear-mandarins-hat",
    "name": "Mandarin's Hat",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/mandarin-s-hat.webp"
  },
  {
    "id": "pets-magma-moose",
    "name": "Magma Moose",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/magma-moose.webp"
  },
  {
    "id": "vehicles-gingerbread-sleigh",
    "name": "Gingerbread Sleigh",
    "category": "vehicles",
    "value": 0.49,
    "demand": 2,
    "image": "images/vehicles/gingerbread-sleigh.webp"
  },
  {
    "id": "vehicles-ice-queen-sleigh",
    "name": "Ice Queen Sleigh",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/ice-queen-sleigh.webp"
  },
  {
    "id": "vehicles-fidget-skateboard",
    "name": "Fidget Skateboard",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/fidget-skateboard.webp"
  },
  {
    "id": "pets-shadow-dragon",
    "name": "Shadow Dragon",
    "category": "pets",
    "value": 253.75,
    "demand": 3,
    "image": "images/pets/shadow-dragon.webp"
  },
  {
    "id": "stickers-orange-butterfly-sticker",
    "name": "Orange Butterfly Sticker",
    "category": "stickers",
    "value": 0.105,
    "demand": 1,
    "image": "images/stickers/orange-butterfly-sticker.webp"
  },
  {
    "id": "petwear-elf-shoes",
    "name": "Elf Shoes",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/elf-shoes.webp"
  },
  {
    "id": "pets-chimera",
    "name": "Chimera",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/chimera.webp"
  },
  {
    "id": "eggs-aztec-egg",
    "name": "Aztec Egg",
    "category": "eggs",
    "value": 0.0332,
    "demand": 1,
    "image": "images/eggs/aztec-egg.webp"
  },
  {
    "id": "petwear-golden-hair",
    "name": "Golden Hair",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/golden-hair.webp"
  },
  {
    "id": "pets-momma-moose",
    "name": "Momma Moose",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/momma-moose.webp"
  },
  {
    "id": "pets-phoenix",
    "name": "Phoenix",
    "category": "pets",
    "value": 0.735,
    "demand": 2,
    "image": "images/pets/phoenix.webp"
  },
  {
    "id": "strollers-vampire-stroller",
    "name": "Vampire Stroller",
    "category": "strollers",
    "value": 1.7375,
    "demand": 2,
    "image": "images/strollers/vampire-stroller.webp"
  },
  {
    "id": "toys-discosplosion",
    "name": "Discosplosion",
    "category": "toys",
    "value": 0.315,
    "demand": 2,
    "image": "images/toys/discosplosion.webp"
  },
  {
    "id": "vehicles-emoji-scooter",
    "name": "Emoji Scooter",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/emoji-scooter.webp"
  },
  {
    "id": "petwear-sushi-skateboard",
    "name": "Sushi Skateboard",
    "category": "petwear",
    "value": 0.91,
    "demand": 2,
    "image": "images/petwear/sushi-skateboard.webp"
  },
  {
    "id": "food-cookie",
    "name": "Cookie",
    "category": "food",
    "value": 0.42,
    "demand": 2,
    "image": "images/food/cookie.webp"
  },
  {
    "id": "strollers-apple-barrel-stroller",
    "name": "Apple Barrel Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-moonlight-moth",
    "name": "Moonlight Moth",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/moonlight-moth.webp"
  },
  {
    "id": "pets-mini-schnauzer",
    "name": "Mini Schnauzer",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/mini-schnauzer.webp"
  },
  {
    "id": "pets-dark-choccybunny",
    "name": "Dark Choccybunny",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/dark-choccybunny.webp"
  },
  {
    "id": "pets-prismatic-butterfly",
    "name": "Prismatic Butterfly",
    "category": "pets",
    "value": 0.805,
    "demand": 2,
    "image": "images/pets/prismatic-butterfly.webp"
  },
  {
    "id": "pets-clownfish",
    "name": "Clownfish",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/clownfish.webp"
  },
  {
    "id": "vehicles-pink-snowboard",
    "name": "Pink Neon Snowboard",
    "category": "vehicles",
    "value": 3.15,
    "demand": 2,
    "image": "images/vehicles/pink-neon-snowboard.webp"
  },
  {
    "id": "petwear-spring-bunny-hood",
    "name": "Spring Bunny Hood",
    "category": "petwear",
    "value": 2.45,
    "demand": 3,
    "image": "images/petwear/spring-bunny-hood.webp"
  },
  {
    "id": "petwear-rubber-ducks",
    "name": "Rubber Ducks",
    "category": "petwear",
    "value": 0.245,
    "demand": 2,
    "image": "images/petwear/rubber-ducks.webp"
  },
  {
    "id": "vehicles-toxic-barrel",
    "name": "Toxic Barrel",
    "category": "vehicles",
    "value": 0.875,
    "demand": 1,
    "image": "images/vehicles/toxic-barrel.webp"
  },
  {
    "id": "strollers-red-wagon-stroller",
    "name": "Red Wagon Stroller",
    "category": "strollers",
    "value": 0.1144,
    "demand": 1,
    "image": "images/strollers/red-wagon-stroller.webp"
  },
  {
    "id": "pets-baku",
    "name": "Baku",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/baku.webp"
  },
  {
    "id": "pets-gingerbread-reindeer",
    "name": "Gingerbread Reindeer",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/gingerbread-reindeer.webp"
  },
  {
    "id": "vehicles-donut-cycle",
    "name": "Donut Cycle",
    "category": "vehicles",
    "value": 0.63,
    "demand": 1,
    "image": "images/vehicles/donut-cycle.webp"
  },
  {
    "id": "pets-corgi",
    "name": "Corgi",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/corgi.webp"
  },
  {
    "id": "food-golden-bone",
    "name": "Golden Bone",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-bone.webp"
  },
  {
    "id": "eggs-japan-egg",
    "name": "Japan Egg",
    "category": "eggs",
    "value": 0.2131,
    "demand": 2,
    "image": "images/eggs/japan-egg.webp"
  },
  {
    "id": "pets-dragonfruit-fox",
    "name": "Dragonfruit Fox",
    "category": "pets",
    "value": 1.295,
    "demand": 2,
    "image": "images/pets/dragonfruit-fox.webp"
  },
  {
    "id": "eggs-christmas-future-egg",
    "name": "Christmas Future Egg",
    "category": "eggs",
    "value": 0.2744,
    "demand": 2,
    "image": "images/eggs/christmas-future-egg.webp"
  },
  {
    "id": "petwear-copter-hat",
    "name": "Copter Hat",
    "category": "petwear",
    "value": 0.84,
    "demand": 2,
    "image": "images/petwear/copter-hat.webp"
  },
  {
    "id": "pets-classic-teapot",
    "name": "Classic Teapot",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/classic-teapot.webp"
  },
  {
    "id": "strollers-potion-stroller",
    "name": "Potion Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "food-diamond-lavender",
    "name": "Diamond Lavender",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/diamond-lavender.webp"
  },
  {
    "id": "food-honey",
    "name": "Honey",
    "category": "food",
    "value": 0.315,
    "demand": 2,
    "image": "images/food/honey.webp"
  },
  {
    "id": "potions-choosy-potion",
    "name": "Choosy Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-jellyfish",
    "name": "Jellyfish",
    "category": "pets",
    "value": 3.85,
    "demand": 3,
    "image": "images/pets/jellyfish.webp"
  },
  {
    "id": "stickers-panda-sticker",
    "name": "Panda Sticker",
    "category": "stickers",
    "value": 0.105,
    "demand": 1,
    "image": "images/stickers/panda-sticker.webp"
  },
  {
    "id": "petwear-sack-of-cash",
    "name": "Sack of Cash",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/sack-of-cash.webp"
  },
  {
    "id": "pets-karate-gorilla",
    "name": "Karate Gorilla",
    "category": "pets",
    "value": 0.525,
    "demand": 2,
    "image": "images/pets/karate-gorilla.webp"
  },
  {
    "id": "pets-puffer-fish",
    "name": "Puffer Fish",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/puffer-fish.webp"
  },
  {
    "id": "vehicles-shooting-star-board",
    "name": "Shooting Star Board",
    "category": "vehicles",
    "value": 2.275,
    "demand": 2,
    "image": "images/vehicles/shooting-star-board.webp"
  },
  {
    "id": "stickers-frostclaw-animated-sticker",
    "name": "Frostclaw Animated Sticker",
    "category": "stickers",
    "value": 0.63,
    "demand": 2,
    "image": "images/stickers/frostclaw-animated-sticker.webp"
  },
  {
    "id": "pets-snowball-pug",
    "name": "Snowball Pug",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/snowball-pug.webp"
  },
  {
    "id": "pets-dirty-ducky",
    "name": "Dirty Ducky",
    "category": "pets",
    "value": 0.3325,
    "demand": 1,
    "image": "images/pets/dirty-ducky.webp"
  },
  {
    "id": "pets-frost-dragon",
    "name": "Frost Dragon",
    "category": "pets",
    "value": 117.25,
    "demand": 3,
    "image": "images/pets/frost-dragon.webp"
  },
  {
    "id": "pets-narwhal",
    "name": "Narwhal",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/narwhal.webp"
  },
  {
    "id": "toys-dragon-balloon",
    "name": "Dragon Balloon",
    "category": "toys",
    "value": 0.105,
    "demand": 1,
    "image": "images/toys/dragon-balloon.webp"
  },
  {
    "id": "pets-sheeeeep",
    "name": "Sheeeeep",
    "category": "pets",
    "value": 2.45,
    "demand": 2,
    "image": "images/pets/sheeeeep.webp"
  },
  {
    "id": "strollers-high-heel-stroller",
    "name": "High Heel Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-tortuga-de-la-isla",
    "name": "Tortuga de la Isla",
    "category": "pets",
    "value": 2.8,
    "demand": 2,
    "image": "images/pets/tortuga-de-la-isla.webp"
  },
  {
    "id": "pets-chocolate-chowchow",
    "name": "Chocolate Chow-Chow",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/chocolate-chow-chow.webp"
  },
  {
    "id": "vehicles-black-cab",
    "name": "Black Cab",
    "category": "vehicles",
    "value": 0.245,
    "demand": 1,
    "image": "images/vehicles/black-cab.webp"
  },
  {
    "id": "pets-easter-bunny",
    "name": "Easter Bunny",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/easter-bunny.webp"
  },
  {
    "id": "pets-latte-kitsune",
    "name": "Latte Kitsune",
    "category": "pets",
    "value": 0.91,
    "demand": 2,
    "image": "images/pets/latte-kitsune.webp"
  },
  {
    "id": "petwear-ferris-wheel-hat",
    "name": "Ferris Wheel Hat",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/ferris-wheel-hat.webp"
  },
  {
    "id": "pets-abyssinian-cat",
    "name": "Abyssinian Cat",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/abyssinian-cat.webp"
  },
  {
    "id": "pets-golden-king-penguin",
    "name": "Golden King Penguin",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/golden-king-penguin.webp"
  },
  {
    "id": "stickers-koala-sticker",
    "name": "Koala Sticker",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/koala-sticker.webp"
  },
  {
    "id": "petwear-goth-shoes",
    "name": "Goth Shoes",
    "category": "petwear",
    "value": 1.75,
    "demand": 2,
    "image": "images/petwear/goth-shoes.webp"
  },
  {
    "id": "pets-tanuki",
    "name": "Tanuki",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/tanuki.webp"
  },
  {
    "id": "vehicles-orange-snowboard",
    "name": "Orange Neon Snowboard",
    "category": "vehicles",
    "value": 1.4,
    "demand": 2,
    "image": "images/vehicles/orange-neon-snowboard.webp"
  },
  {
    "id": "pets-raccoon",
    "name": "Raccoon",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/raccoon.webp"
  },
  {
    "id": "pets-pig",
    "name": "Pig",
    "category": "pets",
    "value": 3.5,
    "demand": 3,
    "image": "images/pets/pig.webp"
  },
  {
    "id": "food-christmas-pudding-pup-bait",
    "name": "Christmas Pudding Pup Bait",
    "category": "food",
    "value": 1.75,
    "demand": 2,
    "image": "images/food/christmas-pudding-pup-bait.webp"
  },
  {
    "id": "toys-tombstone-ghostify",
    "name": "Tombstone Ghostify",
    "category": "toys",
    "value": 17.5,
    "demand": 2,
    "image": "images/toys/tombstone-ghostify.webp"
  },
  {
    "id": "eggs-woodland-egg",
    "name": "Woodland Egg",
    "category": "eggs",
    "value": 0.3041,
    "demand": 2,
    "image": "images/eggs/woodland-egg.webp"
  },
  {
    "id": "pets-gilded-snake",
    "name": "Gilded Snake",
    "category": "pets",
    "value": 0.56,
    "demand": 1,
    "image": "images/pets/gilded-snake.webp"
  },
  {
    "id": "toys-tea-party-chair",
    "name": "Tea Party Chair",
    "category": "toys",
    "value": 1.05,
    "demand": 2,
    "image": "images/toys/tea-party-chair.webp"
  },
  {
    "id": "pets-shrew",
    "name": "Shrew",
    "category": "pets",
    "value": 1.925,
    "demand": 2,
    "image": "images/pets/shrew.webp"
  },
  {
    "id": "pets-ram",
    "name": "Ram",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/ram.webp"
  },
  {
    "id": "pets-punk-pony",
    "name": "Punk Pony",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/punk-pony.webp"
  },
  {
    "id": "petwear-invisible-wings",
    "name": "Invisible Wings",
    "category": "petwear",
    "value": 0.7,
    "demand": 2,
    "image": "images/petwear/invisible-wings.webp"
  },
  {
    "id": "pets-tio-de-nadal",
    "name": "Tio De Nadal",
    "category": "pets",
    "value": 4.025,
    "demand": 2,
    "image": "images/pets/tio-de-nadal.webp"
  },
  {
    "id": "stickers-rat-sticker",
    "name": "Rat Sticker",
    "category": "stickers",
    "value": 0.056,
    "demand": 1,
    "image": "images/stickers/rat-sticker.webp"
  },
  {
    "id": "eggs-crystal-egg",
    "name": "Crystal Egg",
    "category": "eggs",
    "value": 0.0332,
    "demand": 2,
    "image": "images/eggs/crystal-egg.webp"
  },
  {
    "id": "pets-rainbow-trout",
    "name": "Rainbow Trout",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/rainbow-trout.webp"
  },
  {
    "id": "pets-urchin",
    "name": "Urchin",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/urchin.webp"
  },
  {
    "id": "vehicles-adopt-me-snowboard-2",
    "name": "Adopt Me Snowboard 2",
    "category": "vehicles",
    "value": 1.33,
    "demand": 1,
    "image": "images/vehicles/adopt-me-snowboard-2.webp"
  },
  {
    "id": "pets-yellowlipped-sea-krait",
    "name": "Yellow-Lipped Sea Krait",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/yellow-lipped-sea-krait.webp"
  },
  {
    "id": "pets-elasmosaurus",
    "name": "Elasmosaurus",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/elasmosaurus.webp"
  },
  {
    "id": "pets-dire-wolf",
    "name": "Dire Wolf",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/dire-wolf.webp"
  },
  {
    "id": "gifts-premium-capuchin-box",
    "name": "Premium Capuchin Box",
    "category": "gifts",
    "value": 1.2456,
    "demand": 2,
    "image": "images/gifts/premium-capuchin-box.webp"
  },
  {
    "id": "pets-golden-jaguar",
    "name": "Golden Jaguar",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/golden-jaguar.webp"
  },
  {
    "id": "vehicles-tiffany",
    "name": "Tiffany",
    "category": "vehicles",
    "value": 0.315,
    "demand": 1,
    "image": "images/vehicles/tiffany.webp"
  },
  {
    "id": "pets-blue-jay",
    "name": "Blue Jay",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/blue-jay.webp"
  },
  {
    "id": "pets-rice-cake-rabbit",
    "name": "Rice Cake Rabbit",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/rice-cake-rabbit.webp"
  },
  {
    "id": "vehicles-orange-skateboard",
    "name": "Neon Orange Skateboard",
    "category": "vehicles",
    "value": 0.91,
    "demand": 1,
    "image": "images/vehicles/neon-orange-skateboard.webp"
  },
  {
    "id": "gifts-special-lunar-new-year-gift-box",
    "name": "Special Lunar New Year Gift Box",
    "category": "gifts",
    "value": 0.3981,
    "demand": 1,
    "image": "images/gifts/special-lunar-new-year-gift-box.webp"
  },
  {
    "id": "pets-aurora-fox",
    "name": "Aurora Fox",
    "category": "pets",
    "value": 1.82,
    "demand": 2,
    "image": "images/pets/aurora-fox.webp"
  },
  {
    "id": "pets-smores-raccoon",
    "name": "S'mores Raccoon",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/s-mores-raccoon.webp"
  },
  {
    "id": "gifts-standard-gorilla-box",
    "name": "Standard Gorilla Box",
    "category": "gifts",
    "value": 0.1569,
    "demand": 1,
    "image": "images/gifts/standard-gorilla-box.webp"
  },
  {
    "id": "food-teleportation-potion",
    "name": "Teleportation Potion",
    "category": "food",
    "value": 1.225,
    "demand": 2,
    "image": "images/food/teleportation-potion.webp"
  },
  {
    "id": "strollers-flip-phone-stroller",
    "name": "Flip Phone Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-snow-leopard",
    "name": "Snow Leopard",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/snow-leopard.webp"
  },
  {
    "id": "pets-royal-corgi",
    "name": "Royal Corgi",
    "category": "pets",
    "value": 0.77,
    "demand": 2,
    "image": "images/pets/royal-corgi.webp"
  },
  {
    "id": "pets-french-bulldog",
    "name": "French Bulldog",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/french-bulldog.webp"
  },
  {
    "id": "petwear-shadow-wings",
    "name": "Shadow Wings",
    "category": "petwear",
    "value": 1.4,
    "demand": 2,
    "image": "images/petwear/shadow-wings.webp"
  },
  {
    "id": "pets-mermicorn",
    "name": "Mermicorn",
    "category": "pets",
    "value": 10.85,
    "demand": 2,
    "image": "images/pets/mermicorn.webp"
  },
  {
    "id": "petwear-energy-aura-feet",
    "name": "Energy Aura Feet",
    "category": "petwear",
    "value": 0.35,
    "demand": 2,
    "image": "images/petwear/energy-aura-feet.webp"
  },
  {
    "id": "toys-zombie-buffalo-plush",
    "name": "Zombie Buffalo Plush",
    "category": "toys",
    "value": 0.455,
    "demand": 1,
    "image": "images/toys/zombie-buffalo-plush.webp"
  },
  {
    "id": "potions-busy-body-potion",
    "name": "Busy Body Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "toys-candy-flare-paint",
    "name": "Candy Flare Mega Neon Paint",
    "category": "toys",
    "value": 0.28,
    "demand": 3,
    "image": "images/toys/candy-flare-mega-neon-paint.webp"
  },
  {
    "id": "pets-peppermint-penguin",
    "name": "Peppermint Penguin",
    "category": "pets",
    "value": 10.325,
    "demand": 3,
    "image": "images/pets/peppermint-penguin.webp"
  },
  {
    "id": "petwear-fishbone-badge",
    "name": "Fishbone Badge",
    "category": "petwear",
    "value": 0.21,
    "demand": 2,
    "image": "images/petwear/fishbone-badge.webp"
  },
  {
    "id": "pets-vermilion-butterfly",
    "name": "Vermilion Butterfly",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/vermilion-butterfly.webp"
  },
  {
    "id": "vehicles-moped",
    "name": "Moped",
    "category": "vehicles",
    "value": 0.77,
    "demand": 1,
    "image": "images/vehicles/moped.webp"
  },
  {
    "id": "stickers-cherry-blossom-tree-sticker",
    "name": "Cherry Blossom Tree Sticker",
    "category": "stickers",
    "value": 0.0175,
    "demand": 1,
    "image": "images/stickers/cherry-blossom-tree-sticker.webp"
  },
  {
    "id": "pets-vulture",
    "name": "Vulture",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/vulture.webp"
  },
  {
    "id": "pets-cryptid",
    "name": "Cryptid",
    "category": "pets",
    "value": 50.4,
    "demand": 3,
    "image": "images/pets/cryptid.webp"
  },
  {
    "id": "pets-panda",
    "name": "Panda",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/panda.webp"
  },
  {
    "id": "stickers-walrus-sticker",
    "name": "Walrus Sticker",
    "category": "stickers",
    "value": 0.056,
    "demand": 1,
    "image": "images/stickers/walrus-sticker.webp"
  },
  {
    "id": "pets-orange-butterfly",
    "name": "Orange Butterfly",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/orange-butterfly.webp"
  },
  {
    "id": "pets-dodo",
    "name": "Dodo",
    "category": "pets",
    "value": 0.735,
    "demand": 2,
    "image": "images/pets/dodo.webp"
  },
  {
    "id": "eggs-royal-moon-egg",
    "name": "Royal Moon Egg",
    "category": "eggs",
    "value": 0.6044,
    "demand": 2,
    "image": "images/eggs/royal-moon-egg.webp"
  },
  {
    "id": "pets-violet-butterfly",
    "name": "Violet Butterfly",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/violet-butterfly.webp"
  },
  {
    "id": "stickers-premium-sticker-pack",
    "name": "Premium Sticker Pack",
    "category": "stickers",
    "value": 0.315,
    "demand": 2,
    "image": "images/stickers/premium-sticker-pack.webp"
  },
  {
    "id": "stickers-poodle-sticker",
    "name": "Poodle Sticker",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/poodle-sticker.webp"
  },
  {
    "id": "pets-forest-sprite",
    "name": "Forest Sprite",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/forest-sprite.webp"
  },
  {
    "id": "vehicles-regal-roller",
    "name": "Regal Roller",
    "category": "vehicles",
    "value": 0.56,
    "demand": 1,
    "image": "images/vehicles/regal-roller.webp"
  },
  {
    "id": "pets-toy-monkey",
    "name": "Toy Monkey",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/toy-monkey.webp"
  },
  {
    "id": "pets-lammergeier",
    "name": "Lammergeier",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/lammergeier.webp"
  },
  {
    "id": "pets-candicorn",
    "name": "Candicorn",
    "category": "pets",
    "value": 4.025,
    "demand": 2,
    "image": "images/pets/candicorn.webp"
  },
  {
    "id": "pets-sloth",
    "name": "Sloth",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/sloth.webp"
  },
  {
    "id": "pets-glormy-hound",
    "name": "Glormy Hound",
    "category": "pets",
    "value": 1.05,
    "demand": 2,
    "image": "images/pets/glormy-hound.webp"
  },
  {
    "id": "petwear-shark-swimcap",
    "name": "Shark Swimcap",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/shark-swimcap.webp"
  },
  {
    "id": "pets-cupid-dragon",
    "name": "Cupid Dragon",
    "category": "pets",
    "value": 2.45,
    "demand": 2,
    "image": "images/pets/cupid-dragon.webp"
  },
  {
    "id": "pets-diamond-griffin",
    "name": "Diamond Griffin",
    "category": "pets",
    "value": 0.3325,
    "demand": 1,
    "image": "images/pets/diamond-griffin.webp"
  },
  {
    "id": "food-stars-egg",
    "name": "Stars Egg",
    "category": "food",
    "value": 0.21,
    "demand": 1,
    "image": "images/food/stars-egg.webp"
  },
  {
    "id": "strollers-pea-pod-stroller",
    "name": "Pea Pod Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-giant-blue-scarab",
    "name": "Giant Blue Scarab",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/giant-blue-scarab.webp"
  },
  {
    "id": "pets-water-opossum",
    "name": "Water Opossum",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/water-opossum.webp"
  },
  {
    "id": "strollers-web-stroller",
    "name": "Web Stroller",
    "category": "strollers",
    "value": 0.2722,
    "demand": 1,
    "image": "images/strollers/web-stroller.webp"
  },
  {
    "id": "toys-teddy-skele",
    "name": "Teddy Skele",
    "category": "toys",
    "value": 1.75,
    "demand": 2,
    "image": "images/toys/teddy-skele.webp"
  },
  {
    "id": "gifts-1000-bucks-silk-bag",
    "name": "1000 Bucks Silk Bag",
    "category": "gifts",
    "value": 0.49,
    "demand": 2,
    "image": "images/gifts/1000-bucks-silk-bag.webp"
  },
  {
    "id": "pets-halloween-white-mummy-cat",
    "name": "Halloween White Mummy Cat",
    "category": "pets",
    "value": 0.3325,
    "demand": 1,
    "image": "images/pets/halloween-white-mummy-cat.webp"
  },
  {
    "id": "pets-firefighter-gibbon",
    "name": "Firefighter Gibbon",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/firefighter-gibbon.webp"
  },
  {
    "id": "petwear-mule-baskets",
    "name": "Mule Baskets",
    "category": "petwear",
    "value": 0.42,
    "demand": 2,
    "image": "images/petwear/mule-baskets.webp"
  },
  {
    "id": "petwear-2022-birthday-confetti-cannon",
    "name": "2022 Birthday Confetti Cannon",
    "category": "petwear",
    "value": 5.775,
    "demand": 3,
    "image": "images/petwear/2022-birthday-confetti-cannon.webp"
  },
  {
    "id": "pets-papa-moose",
    "name": "Papa Moose",
    "category": "pets",
    "value": 2.625,
    "demand": 2,
    "image": "images/pets/papa-moose.webp"
  },
  {
    "id": "pets-otter",
    "name": "Otter",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/otter.webp"
  },
  {
    "id": "pets-pink-betta-fish",
    "name": "Pink Betta Fish",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/pink-betta-fish.webp"
  },
  {
    "id": "pets-turkey",
    "name": "Turkey",
    "category": "pets",
    "value": 0.98,
    "demand": 2,
    "image": "images/pets/turkey.webp"
  },
  {
    "id": "vehicles-rgb-ufo",
    "name": "RGB UFO",
    "category": "vehicles",
    "value": 0.14,
    "demand": 1,
    "image": "images/vehicles/rgb-ufo.webp"
  },
  {
    "id": "pets-yellow-butterfly",
    "name": "Yellow Butterfly",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/yellow-butterfly.webp"
  },
  {
    "id": "petwear-police-cap",
    "name": "Police Cap",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/police-cap.webp"
  },
  {
    "id": "vehicles-crabby-cruiser",
    "name": "Crabby Cruiser",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/crabby-cruiser.webp"
  },
  {
    "id": "petwear-strawberry-shortcake-bat-dragon-backpack",
    "name": "Strawberry Shortcake Bat Dragon Backpack",
    "category": "petwear",
    "value": 2.975,
    "demand": 2,
    "image": "images/petwear/strawberry-shortcake-bat-dragon-backpack.webp"
  },
  {
    "id": "eggs-wrapped-doll",
    "name": "Wrapped Doll",
    "category": "eggs",
    "value": 0.4681,
    "demand": 1,
    "image": "images/eggs/wrapped-doll.webp"
  },
  {
    "id": "pets-chef-gorilla",
    "name": "Chef Gorilla",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/chef-gorilla.webp"
  },
  {
    "id": "potions-preferred-potion",
    "name": "Preferred Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-unicorn-horn",
    "name": "Unicorn Horn",
    "category": "petwear",
    "value": 8.575,
    "demand": 3,
    "image": "images/petwear/unicorn-horn.webp"
  },
  {
    "id": "gifts-scarecrow-box",
    "name": "Scarecrow Box",
    "category": "gifts",
    "value": 0.3362,
    "demand": 2,
    "image": "images/gifts/scarecrow-box.webp"
  },
  {
    "id": "strollers-tractor-stroller",
    "name": "Tractor Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-mahi-mahi",
    "name": "Mahi Mahi",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/mahi-mahi.webp"
  },
  {
    "id": "strollers-unicorn-stroller",
    "name": "Unicorn Stroller",
    "category": "strollers",
    "value": 0.9881,
    "demand": 2,
    "image": "images/strollers/unicorn-stroller.webp"
  },
  {
    "id": "pets-prism-snake",
    "name": "Prism Snake",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/prism-snake.webp"
  },
  {
    "id": "pets-glyptodon",
    "name": "Glyptodon",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/glyptodon.webp"
  },
  {
    "id": "pets-shark-puppy",
    "name": "Shark Puppy",
    "category": "pets",
    "value": 5.25,
    "demand": 2,
    "image": "images/pets/shark-puppy.webp"
  },
  {
    "id": "pets-ice-moth-dragon",
    "name": "Ice Moth Dragon",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/ice-moth-dragon.webp"
  },
  {
    "id": "vehicles-snow-snowboard",
    "name": "Snow Snowboard",
    "category": "vehicles",
    "value": 3.85,
    "demand": 1,
    "image": "images/vehicles/snow-snowboard.webp"
  },
  {
    "id": "food-apet-potion",
    "name": "Ride-A-Pet Potion",
    "category": "food",
    "value": 0.455,
    "demand": 3,
    "image": "images/food/ride-a-pet-potion.webp"
  },
  {
    "id": "pets-sunglider",
    "name": "Sunglider",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/sunglider.webp"
  },
  {
    "id": "pets-mr-whiskerpips",
    "name": "Mr. Whiskerpips",
    "category": "pets",
    "value": 0.4725,
    "demand": 2,
    "image": "images/pets/mr-whiskerpips.webp"
  },
  {
    "id": "vehicles-toy-rescue-helicopter",
    "name": "Toy Rescue Helicopter",
    "category": "vehicles",
    "value": 0.84,
    "demand": 1,
    "image": "images/vehicles/toy-rescue-helicopter.webp"
  },
  {
    "id": "vehicles-headless-horsemans-biplane",
    "name": "Headless Horseman's Biplane",
    "category": "vehicles",
    "value": 0.35,
    "demand": 1,
    "image": "images/vehicles/headless-horseman-s-biplane.webp"
  },
  {
    "id": "vehicles-hoverboard",
    "name": "Hoverboard",
    "category": "vehicles",
    "value": 0.35,
    "demand": 1,
    "image": "images/vehicles/hoverboard.webp"
  },
  {
    "id": "pets-starhopper",
    "name": "Starhopper",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/starhopper.webp"
  },
  {
    "id": "toys-croc-plush",
    "name": "Croc Plush",
    "category": "toys",
    "value": 0.28,
    "demand": 1,
    "image": "images/toys/croc-plush.webp"
  },
  {
    "id": "pets-candy-cane-snail",
    "name": "Candy Cane Snail",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/candy-cane-snail.webp"
  },
  {
    "id": "strollers-snowman-stroller",
    "name": "Snowman Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-golden-unicorn",
    "name": "Golden Unicorn",
    "category": "pets",
    "value": 0.3325,
    "demand": 1,
    "image": "images/pets/golden-unicorn.webp"
  },
  {
    "id": "pets-scarebear",
    "name": "Scarebear",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/scarebear.webp"
  },
  {
    "id": "gifts-standard-capuchin-box",
    "name": "Standard Capuchin Box",
    "category": "gifts",
    "value": 0.1819,
    "demand": 1,
    "image": "images/gifts/standard-capuchin-box.webp"
  },
  {
    "id": "food-stripes-egg",
    "name": "Stripes Egg",
    "category": "food",
    "value": 0.21,
    "demand": 1,
    "image": "images/food/stripes-egg.webp"
  },
  {
    "id": "strollers-snow-globe-stroller",
    "name": "Snow Globe Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "stickers-kitsune-sticker",
    "name": "Kitsune Sticker",
    "category": "stickers",
    "value": 0.175,
    "demand": 2,
    "image": "images/stickers/kitsune-sticker.webp"
  },
  {
    "id": "vehicles-horse-and-carriage",
    "name": "Horse And Carriage",
    "category": "vehicles",
    "value": 2.45,
    "demand": 2,
    "image": "images/vehicles/horse-and-carriage.webp"
  },
  {
    "id": "pets-castle-hermit-crab",
    "name": "Castle Hermit Crab",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/castle-hermit-crab.webp"
  },
  {
    "id": "strollers-toilet-stroller",
    "name": "Toilet Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-gold-tiara",
    "name": "Gold Tiara",
    "category": "petwear",
    "value": 0.105,
    "demand": 2,
    "image": "images/petwear/gold-tiara.webp"
  },
  {
    "id": "stickers-well-actually-walrus-sticker",
    "name": "Well, Actually Walrus Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/well-actually-walrus-sticker.webp"
  },
  {
    "id": "pets-gila-monster",
    "name": "Gila Monster",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/gila-monster.webp"
  },
  {
    "id": "pets-ribbon-seal",
    "name": "Ribbon Seal",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/ribbon-seal.webp"
  },
  {
    "id": "toys-slimingo-feather-teleporter",
    "name": "Slimingo Feather Teleporter",
    "category": "toys",
    "value": 0.14,
    "demand": 2,
    "image": "images/toys/slimingo-feather-teleporter.webp"
  },
  {
    "id": "petwear-2022-birthday-party-hat",
    "name": "2022 Birthday Party Hat",
    "category": "petwear",
    "value": 11.025,
    "demand": 3,
    "image": "images/petwear/2022-birthday-party-hat.webp"
  },
  {
    "id": "pets-pretty-pony",
    "name": "Pretty Pony",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/pretty-pony.webp"
  },
  {
    "id": "pets-ringtailed-lemur",
    "name": "Ring-Tailed Lemur",
    "category": "pets",
    "value": 2.1,
    "demand": 2,
    "image": "images/pets/ring-tailed-lemur.webp"
  },
  {
    "id": "petwear-ghost-kitty-backpack",
    "name": "Ghost Kitty Backpack",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/ghost-kitty-backpack.webp"
  },
  {
    "id": "petwear-pink-hightops",
    "name": "Pink Hightops",
    "category": "petwear",
    "value": 0.14,
    "demand": 2,
    "image": "images/petwear/pink-hightops.webp"
  },
  {
    "id": "food-ice-tub",
    "name": "Ice Tub",
    "category": "food",
    "value": 0.7,
    "demand": 2,
    "image": "images/food/ice-tub.webp"
  },
  {
    "id": "strollers-crystal-ball-stroller",
    "name": "Crystal Ball Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-halloween-black-witch-hat-stroller",
    "name": "Halloween Black Witch Hat Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-dimorphodon",
    "name": "Dimorphodon",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/dimorphodon.webp"
  },
  {
    "id": "stickers-frostbite-bear-and-cub-animated-sticker",
    "name": "Frostbite Bear and Cub Animated Sticker",
    "category": "stickers",
    "value": 0.28,
    "demand": 2,
    "image": "images/stickers/frostbite-bear-and-cub-animated-sticker.webp"
  },
  {
    "id": "gifts-halloween-mummy-cat-box",
    "name": "Halloween Mummy Cat Box",
    "category": "gifts",
    "value": 0.235,
    "demand": 1,
    "image": "images/gifts/halloween-mummy-cat-box.webp"
  },
  {
    "id": "pets-gorilla",
    "name": "Gorilla",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/gorilla.webp"
  },
  {
    "id": "vehicles-green-scooter",
    "name": "Neon Green Scooter",
    "category": "vehicles",
    "value": 0.84,
    "demand": 1,
    "image": "images/vehicles/neon-green-scooter.webp"
  },
  {
    "id": "pets-ground-sloth",
    "name": "Ground Sloth",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/ground-sloth.webp"
  },
  {
    "id": "food-goldenrod-flower",
    "name": "Goldenrod Flower",
    "category": "food",
    "value": 3.5,
    "demand": 2,
    "image": "images/food/goldenrod-flower.webp"
  },
  {
    "id": "gifts-hermit-crab-box",
    "name": "Hermit Crab Box",
    "category": "gifts",
    "value": 0.4859,
    "demand": 2,
    "image": "images/gifts/hermit-crab-box.webp"
  },
  {
    "id": "pets-winter-fawn",
    "name": "Winter Fawn",
    "category": "pets",
    "value": 0.2975,
    "demand": 1,
    "image": "images/pets/winter-fawn.webp"
  },
  {
    "id": "gifts-2d-box",
    "name": "2D Box",
    "category": "gifts",
    "value": 0.0981,
    "demand": 1,
    "image": "images/gifts/2d-box.webp"
  },
  {
    "id": "eggs-retired-egg",
    "name": "Retired Egg",
    "category": "eggs",
    "value": 0.0286,
    "demand": 1,
    "image": "images/eggs/retired-egg.webp"
  },
  {
    "id": "pets-green-butterfly",
    "name": "Green Butterfly",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/green-butterfly.webp"
  },
  {
    "id": "strollers-elephant-stroller",
    "name": "Elephant Stroller",
    "category": "strollers",
    "value": 0.1884,
    "demand": 1,
    "image": "images/strollers/elephant-stroller.webp"
  },
  {
    "id": "pets-rattlesnake",
    "name": "Rattlesnake",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/rattlesnake.webp"
  },
  {
    "id": "pets-preppy-capuchin-monkey",
    "name": "Preppy Capuchin Monkey",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/preppy-capuchin-monkey.webp"
  },
  {
    "id": "pets-cabbit",
    "name": "Cabbit",
    "category": "pets",
    "value": 10.15,
    "demand": 3,
    "image": "images/pets/cabbit.webp"
  },
  {
    "id": "pets-yule-log-dog",
    "name": "Yule Log Dog",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/yule-log-dog.webp"
  },
  {
    "id": "toys-pumpkin",
    "name": "Pumpkin",
    "category": "toys",
    "value": 5.25,
    "demand": 2,
    "image": "images/toys/pumpkin.webp"
  },
  {
    "id": "pets-yeti",
    "name": "Yeti",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/yeti.webp"
  },
  {
    "id": "pets-skelebat",
    "name": "Skelebat",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/skelebat.webp"
  },
  {
    "id": "pets-banded-palm-civet",
    "name": "Banded Palm Civet",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/banded-palm-civet.webp"
  },
  {
    "id": "pets-beaver",
    "name": "Beaver",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/beaver.webp"
  },
  {
    "id": "petwear-three-egg-basket",
    "name": "Three Egg Basket",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/three-egg-basket.webp"
  },
  {
    "id": "vehicles-ghost-vehicle",
    "name": "Ghost Vehicle",
    "category": "vehicles",
    "value": 12.6,
    "demand": 2,
    "image": "images/vehicles/ghost-vehicle.webp"
  },
  {
    "id": "strollers-floating-hand-stroller",
    "name": "Floating Hand Stroller",
    "category": "strollers",
    "value": 0.6753,
    "demand": 2,
    "image": "images/strollers/floating-hand-stroller.webp"
  },
  {
    "id": "pets-alpaca",
    "name": "Alpaca",
    "category": "pets",
    "value": 7.35,
    "demand": 3,
    "image": "images/pets/alpaca.webp"
  },
  {
    "id": "pets-blazing-lion",
    "name": "Blazing Lion",
    "category": "pets",
    "value": 56.0,
    "demand": 3,
    "image": "images/pets/blazing-lion.webp"
  },
  {
    "id": "pets-officer-gibbon",
    "name": "Officer Gibbon",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/officer-gibbon.webp"
  },
  {
    "id": "pets-kangaroo",
    "name": "Kangaroo",
    "category": "pets",
    "value": 7.0,
    "demand": 3,
    "image": "images/pets/kangaroo.webp"
  },
  {
    "id": "pets-dire-stag",
    "name": "Dire Stag",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/dire-stag.webp"
  },
  {
    "id": "pets-shadow-dragon-ducky",
    "name": "Shadow Dragon Ducky",
    "category": "pets",
    "value": 0.4725,
    "demand": 2,
    "image": "images/pets/shadow-dragon-ducky.webp"
  },
  {
    "id": "pets-coyote",
    "name": "Coyote",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/coyote.webp"
  },
  {
    "id": "petwear-white-chef-hat",
    "name": "White Chef Hat",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/white-chef-hat.webp"
  },
  {
    "id": "pets-lynx",
    "name": "Lynx",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/lynx.webp"
  },
  {
    "id": "pets-bullfrog",
    "name": "Bullfrog",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/bullfrog.webp"
  },
  {
    "id": "pets-reindeer",
    "name": "Reindeer",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/reindeer.webp"
  },
  {
    "id": "strollers-princess-stroller",
    "name": "Princess Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-sea-skeleton-panda",
    "name": "Sea Skeleton Panda",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/sea-skeleton-panda.webp"
  },
  {
    "id": "pets-gibbon",
    "name": "Gibbon",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/gibbon.webp"
  },
  {
    "id": "pets-binturong",
    "name": "Binturong",
    "category": "pets",
    "value": 0.595,
    "demand": 2,
    "image": "images/pets/binturong.webp"
  },
  {
    "id": "pets-bakeneko",
    "name": "Bakeneko",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/bakeneko.webp"
  },
  {
    "id": "pets-bluebottle",
    "name": "Bluebottle Fly",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/bluebottle-fly.webp"
  },
  {
    "id": "eggs-safari-egg",
    "name": "Safari Egg",
    "category": "eggs",
    "value": 72.15,
    "demand": 3,
    "image": ""
  },
  {
    "id": "gifts-big-gift",
    "name": "Big Gift",
    "category": "gifts",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-chestnut-glyptodon",
    "name": "Chestnut Glyptodon",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/chestnut-glyptodon.webp"
  },
  {
    "id": "potions-translucent-tea-potion",
    "name": "Translucent Tea Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-singularity-pisces",
    "name": "Singularity Pisces",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/singularity-pisces.webp"
  },
  {
    "id": "stickers-turtle-sticker",
    "name": "Turtle Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/turtle-sticker.webp"
  },
  {
    "id": "food-leaf",
    "name": "Leaf",
    "category": "food",
    "value": 0.875,
    "demand": 2,
    "image": "images/food/leaf.webp"
  },
  {
    "id": "stickers-cow-loves-this-sticker",
    "name": "Cow Loves This Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/cow-loves-this-sticker.webp"
  },
  {
    "id": "pets-amami-rabbit",
    "name": "Amami Rabbit",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/amami-rabbit.webp"
  },
  {
    "id": "pets-royal-mistletroll",
    "name": "Royal Mistletroll",
    "category": "pets",
    "value": 4.55,
    "demand": 2,
    "image": "images/pets/royal-mistletroll.webp"
  },
  {
    "id": "petwear-marshmallow-friend",
    "name": "Marshmallow Friend",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/marshmallow-friend.webp"
  },
  {
    "id": "pets-tarantula",
    "name": "Tarantula",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/tarantula.webp"
  },
  {
    "id": "toys-egg-rattle",
    "name": "Egg Rattle",
    "category": "toys",
    "value": 0.245,
    "demand": 1,
    "image": "images/toys/egg-rattle.webp"
  },
  {
    "id": "toys-polar-bear-plush",
    "name": "Polar Bear Plush",
    "category": "toys",
    "value": 0.21,
    "demand": 1,
    "image": "images/toys/polar-bear-plush.webp"
  },
  {
    "id": "vehicles-wood-scooter",
    "name": "Wood Scooter",
    "category": "vehicles",
    "value": 0.385,
    "demand": 1,
    "image": "images/vehicles/wood-scooter.webp"
  },
  {
    "id": "pets-zeopod",
    "name": "Zeopod",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/zeopod.webp"
  },
  {
    "id": "toys-octopus-plush",
    "name": "Octopus Plush",
    "category": "toys",
    "value": 0.21,
    "demand": 1,
    "image": "images/toys/octopus-plush.webp"
  },
  {
    "id": "vehicles-white-skateboard",
    "name": "White Skateboard",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/white-skateboard.webp"
  },
  {
    "id": "toys-wing-hang-glider",
    "name": "Wing Hang Glider",
    "category": "toys",
    "value": 1.05,
    "demand": 2,
    "image": "images/toys/wing-hang-glider.webp"
  },
  {
    "id": "gifts-premium-gibbon-box",
    "name": "Premium Gibbon Box",
    "category": "gifts",
    "value": 0.765,
    "demand": 2,
    "image": "images/gifts/premium-gibbon-box.webp"
  },
  {
    "id": "pets-mole",
    "name": "Mole",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/mole.webp"
  },
  {
    "id": "pets-clementine-owl",
    "name": "Clementine Owl",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/clementine-owl.webp"
  },
  {
    "id": "pets-hummingbird",
    "name": "Hummingbird",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/hummingbird.webp"
  },
  {
    "id": "pets-tasmanian-tiger",
    "name": "Tasmanian Tiger",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/tasmanian-tiger.webp"
  },
  {
    "id": "pets-red-panda-ducky",
    "name": "Red Panda Ducky",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/red-panda-ducky.webp"
  },
  {
    "id": "petwear-lava-lamp-hat",
    "name": "Lava Lamp Hat",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/lava-lamp-hat.webp"
  },
  {
    "id": "petwear-flower-beret",
    "name": "Flower Beret",
    "category": "petwear",
    "value": 0.35,
    "demand": 2,
    "image": "images/petwear/flower-beret.webp"
  },
  {
    "id": "pets-kelp-captain",
    "name": "Kelp Captain",
    "category": "pets",
    "value": 0.7,
    "demand": 1,
    "image": "images/pets/kelp-captain.webp"
  },
  {
    "id": "toys-candy-cannon",
    "name": "Candy Cannon",
    "category": "toys",
    "value": 136.5,
    "demand": 3,
    "image": "images/toys/candy-cannon.webp"
  },
  {
    "id": "petwear-pink-butterfly-wings",
    "name": "Pink Butterfly Wings",
    "category": "petwear",
    "value": 0.175,
    "demand": 2,
    "image": "images/petwear/pink-butterfly-wings.webp"
  },
  {
    "id": "toys-skeleton-winged-glider",
    "name": "Skeleton Winged Glider",
    "category": "toys",
    "value": 0.875,
    "demand": 2,
    "image": "images/toys/skeleton-winged-glider.webp"
  },
  {
    "id": "pets-kitsune",
    "name": "Kitsune",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/kitsune.webp"
  },
  {
    "id": "pets-ehecatl",
    "name": "Ehecatl",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/ehecatl.webp"
  },
  {
    "id": "pets-giant-gold-scarab",
    "name": "Giant Gold Scarab",
    "category": "pets",
    "value": 1.68,
    "demand": 2,
    "image": "images/pets/giant-gold-scarab.webp"
  },
  {
    "id": "pets-naga-dragon",
    "name": "Naga Dragon",
    "category": "pets",
    "value": 0.63,
    "demand": 1,
    "image": "images/pets/naga-dragon.webp"
  },
  {
    "id": "vehicles-santa-copter",
    "name": "Santa Copter",
    "category": "vehicles",
    "value": 0.35,
    "demand": 1,
    "image": "images/vehicles/santa-copter.webp"
  },
  {
    "id": "toys-paint-sealer",
    "name": "Paint Sealer",
    "category": "toys",
    "value": 0.049,
    "demand": 2,
    "image": "images/toys/paint-sealer.webp"
  },
  {
    "id": "pets-diamond-albatross",
    "name": "Diamond Albatross",
    "category": "pets",
    "value": 1.925,
    "demand": 2,
    "image": "images/pets/diamond-albatross.webp"
  },
  {
    "id": "petwear-pink-designer-backpack",
    "name": "Pink Designer Backpack",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/pink-designer-backpack.webp"
  },
  {
    "id": "vehicles-traveling-house",
    "name": "Traveling House",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/traveling-house.webp"
  },
  {
    "id": "strollers-woodland-cradle-stroller",
    "name": "Woodland Cradle Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-gold-crown",
    "name": "Gold Crown",
    "category": "petwear",
    "value": 1.75,
    "demand": 2,
    "image": "images/petwear/gold-crown.webp"
  },
  {
    "id": "pets-pumpkin-friend",
    "name": "Pumpkin Friend",
    "category": "pets",
    "value": 0.4725,
    "demand": 2,
    "image": "images/pets/pumpkin-friend.webp"
  },
  {
    "id": "pets-irish-water-spaniel",
    "name": "Irish Water Spaniel",
    "category": "pets",
    "value": 3.325,
    "demand": 2,
    "image": "images/pets/irish-water-spaniel.webp"
  },
  {
    "id": "vehicles-shadow-dragon-skateboard",
    "name": "Shadow Dragon Skateboard",
    "category": "vehicles",
    "value": 0.245,
    "demand": 1,
    "image": "images/vehicles/shadow-dragon-skateboard.webp"
  },
  {
    "id": "vehicles-roblox-snowboard",
    "name": "Roblox Snowboard",
    "category": "vehicles",
    "value": 3.5,
    "demand": 1,
    "image": "images/vehicles/roblox-snowboard.webp"
  },
  {
    "id": "pets-california-condor",
    "name": "California Condor",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/california-condor.webp"
  },
  {
    "id": "petwear-2022-birthday-5-badge",
    "name": "2022 Birthday 5 Badge",
    "category": "petwear",
    "value": 0.42,
    "demand": 2,
    "image": "images/petwear/2022-birthday-5-badge.webp"
  },
  {
    "id": "pets-ginger-cat",
    "name": "Ginger Cat",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/ginger-cat.webp"
  },
  {
    "id": "petwear-purple-green-beads",
    "name": "Purple & Green Beads",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/purple-green-beads.webp"
  },
  {
    "id": "pets-berry-cool-cube",
    "name": "Berry Cool Cube",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/berry-cool-cube.webp"
  },
  {
    "id": "pets-clubtail-dragonfly",
    "name": "Clubtail Dragonfly",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/clubtail-dragonfly.webp"
  },
  {
    "id": "pets-corn-doggo",
    "name": "Corn Doggo",
    "category": "pets",
    "value": 0.91,
    "demand": 2,
    "image": "images/pets/corn-doggo.webp"
  },
  {
    "id": "pets-apple-owl",
    "name": "Apple Owl",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/apple-owl.webp"
  },
  {
    "id": "pets-kelp-crewmate",
    "name": "Kelp Crewmate",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/kelp-crewmate.webp"
  },
  {
    "id": "pets-cuteacabra",
    "name": "Cute-A-Cabra",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/cute-a-cabra.webp"
  },
  {
    "id": "pets-fanghorn-tortoise",
    "name": "Fanghorn Tortoise",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/fanghorn-tortoise.webp"
  },
  {
    "id": "pets-oakee-wizard",
    "name": "Oakee Wizard",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/oakee-wizard.webp"
  },
  {
    "id": "pets-garden-snake",
    "name": "Garden Snake",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/garden-snake.webp"
  },
  {
    "id": "food-flaming-zebra-bait",
    "name": "Flaming Zebra Bait",
    "category": "food",
    "value": 0.28,
    "demand": 2,
    "image": "images/food/flaming-zebra-bait.webp"
  },
  {
    "id": "toys-cat-plush",
    "name": "Cat Plush",
    "category": "toys",
    "value": 0.49,
    "demand": 1,
    "image": "images/toys/cat-plush.webp"
  },
  {
    "id": "potions-antigravity-potion",
    "name": "Anti-gravity Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-golden-griffin",
    "name": "Golden Griffin",
    "category": "pets",
    "value": 0.2975,
    "demand": 1,
    "image": "images/pets/golden-griffin.webp"
  },
  {
    "id": "vehicles-pink-scooter",
    "name": "Pink Scooter",
    "category": "vehicles",
    "value": 0.385,
    "demand": 1,
    "image": "images/vehicles/pink-scooter.webp"
  },
  {
    "id": "strollers-plane-stroller",
    "name": "Plane Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-elephant",
    "name": "Elephant",
    "category": "pets",
    "value": 6.3,
    "demand": 3,
    "image": "images/pets/elephant.webp"
  },
  {
    "id": "toys-campfire-stories-paint",
    "name": "Campfire Stories Mega Neon Paint",
    "category": "toys",
    "value": 0.28,
    "demand": 3,
    "image": "images/toys/campfire-stories-mega-neon-paint.webp"
  },
  {
    "id": "vehicles-enchanted-broomstick",
    "name": "Enchanted Broomstick",
    "category": "vehicles",
    "value": 0.91,
    "demand": 2,
    "image": "images/vehicles/enchanted-broomstick.webp"
  },
  {
    "id": "pets-water-moon-bear",
    "name": "Water Moon Bear",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/water-moon-bear.webp"
  },
  {
    "id": "pets-pirate-ghost-capuchin-monkey",
    "name": "Pirate Ghost Capuchin Monkey",
    "category": "pets",
    "value": 5.425,
    "demand": 3,
    "image": "images/pets/pirate-ghost-capuchin-monkey.webp"
  },
  {
    "id": "petwear-banana-hat",
    "name": "Banana Hat",
    "category": "petwear",
    "value": 0.84,
    "demand": 2,
    "image": "images/petwear/banana-hat.webp"
  },
  {
    "id": "pets-kiwi",
    "name": "Kiwi",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/kiwi.webp"
  },
  {
    "id": "pets-fire-foal",
    "name": "Fire Foal",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/fire-foal.webp"
  },
  {
    "id": "pets-fallow-deer",
    "name": "Fallow Deer",
    "category": "pets",
    "value": 1.925,
    "demand": 2,
    "image": "images/pets/fallow-deer.webp"
  },
  {
    "id": "toys-amethyst-skies-paint",
    "name": "Amethyst Skies Mega Neon Paint",
    "category": "toys",
    "value": 0.28,
    "demand": 3,
    "image": "images/toys/amethyst-skies-mega-neon-paint.webp"
  },
  {
    "id": "toys-sour-glider",
    "name": "Sour Glider",
    "category": "toys",
    "value": 0.14,
    "demand": 2,
    "image": "images/toys/sour-glider.webp"
  },
  {
    "id": "toys-tea-party-set",
    "name": "Tea Party Set",
    "category": "toys",
    "value": 1.75,
    "demand": 2,
    "image": "images/toys/tea-party-set.webp"
  },
  {
    "id": "vehicles-snowmobile",
    "name": "Snowmobile",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/snowmobile.webp"
  },
  {
    "id": "strollers-easter-egg-stroller",
    "name": "Easter Egg Stroller",
    "category": "strollers",
    "value": 0.5781,
    "demand": 2,
    "image": "images/strollers/easter-egg-stroller.webp"
  },
  {
    "id": "petwear-human-feet-shoes",
    "name": "Human Feet Shoes",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/human-feet-shoes.webp"
  },
  {
    "id": "strollers-quad-stroller",
    "name": "Quad Stroller",
    "category": "strollers",
    "value": 2.7912,
    "demand": 2,
    "image": "images/strollers/quad-stroller.webp"
  },
  {
    "id": "pets-maine-coon",
    "name": "Maine Coon",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/maine-coon.webp"
  },
  {
    "id": "pets-2d-doggy",
    "name": "2D Doggy",
    "category": "pets",
    "value": 3.325,
    "demand": 2,
    "image": "images/pets/2d-doggy.webp"
  },
  {
    "id": "petwear-cherryontop",
    "name": "Cherry-On-Top",
    "category": "petwear",
    "value": 13.825,
    "demand": 3,
    "image": "images/petwear/cherry-on-top.webp"
  },
  {
    "id": "pets-candyfloss-chick",
    "name": "Candyfloss Chick",
    "category": "pets",
    "value": 7.7,
    "demand": 3,
    "image": "images/pets/candyfloss-chick.webp"
  },
  {
    "id": "pets-golden-tortoise-beetle",
    "name": "Golden Tortoise Beetle",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/golden-tortoise-beetle.webp"
  },
  {
    "id": "vehicles-daisymobile",
    "name": "Daisymobile",
    "category": "vehicles",
    "value": 0.35,
    "demand": 2,
    "image": "images/vehicles/daisymobile.webp"
  },
  {
    "id": "eggs-zodiac-minion-egg",
    "name": "Zodiac Minion Egg",
    "category": "eggs",
    "value": 0.1267,
    "demand": 1,
    "image": "images/eggs/zodiac-minion-egg.webp"
  },
  {
    "id": "gifts-lunar-new-year-gift-box",
    "name": "Lunar New Year Gift Box",
    "category": "gifts",
    "value": 0.24,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-back-taco",
    "name": "Back Taco",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/back-taco.webp"
  },
  {
    "id": "stickers-long-ermine-sticker",
    "name": "Long Ermine Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/long-ermine-sticker.webp"
  },
  {
    "id": "pets-warthog",
    "name": "Warthog",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/warthog.webp"
  },
  {
    "id": "pets-hot-doggo",
    "name": "Hot Doggo",
    "category": "pets",
    "value": 14.875,
    "demand": 3,
    "image": "images/pets/hot-doggo.webp"
  },
  {
    "id": "pets-cheetah",
    "name": "Cheetah",
    "category": "pets",
    "value": 1.085,
    "demand": 2,
    "image": "images/pets/cheetah.webp"
  },
  {
    "id": "pets-island-tarsier",
    "name": "Island Tarsier",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/island-tarsier.webp"
  },
  {
    "id": "petwear-blue-butterfly-wings",
    "name": "Blue Butterfly Wings",
    "category": "petwear",
    "value": 0.56,
    "demand": 2,
    "image": "images/petwear/blue-butterfly-wings.webp"
  },
  {
    "id": "pets-dugong",
    "name": "Dugong",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/dugong.webp"
  },
  {
    "id": "vehicles-adopt-me-snowboard-1",
    "name": "Adopt Me Snowboard 1",
    "category": "vehicles",
    "value": 1.33,
    "demand": 1,
    "image": "images/vehicles/adopt-me-snowboard-1.webp"
  },
  {
    "id": "toys-teddy-bear",
    "name": "Teddy Bear",
    "category": "toys",
    "value": 0.07,
    "demand": 1,
    "image": "images/toys/teddy-bear.webp"
  },
  {
    "id": "gifts-bat-box",
    "name": "Bat Box",
    "category": "gifts",
    "value": 0.58,
    "demand": 2,
    "image": "images/gifts/bat-box.webp"
  },
  {
    "id": "petwear-science-hat",
    "name": "Science Hat",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/science-hat.webp"
  },
  {
    "id": "pets-snowball-pet",
    "name": "Snowball Pet",
    "category": "pets",
    "value": 0.525,
    "demand": 2,
    "image": "images/pets/snowball-pet.webp"
  },
  {
    "id": "pets-nautilus",
    "name": "Nautilus",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/nautilus.webp"
  },
  {
    "id": "gifts-premium-monkey-box",
    "name": "Premium Monkey Box",
    "category": "gifts",
    "value": 20.49,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-cannon-stroller",
    "name": "Cannon Stroller",
    "category": "strollers",
    "value": 0.1812,
    "demand": 1,
    "image": "images/strollers/cannon-stroller.webp"
  },
  {
    "id": "pets-halloween-white-ghost-dragon",
    "name": "Halloween White Ghost Dragon",
    "category": "pets",
    "value": 1.82,
    "demand": 2,
    "image": "images/pets/halloween-white-ghost-dragon.webp"
  },
  {
    "id": "pets-blue-betta-fish",
    "name": "Blue Betta Fish",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/blue-betta-fish.webp"
  },
  {
    "id": "pets-vanilla-penguin",
    "name": "Vanilla Penguin",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/vanilla-penguin.webp"
  },
  {
    "id": "food-chocolate-drop",
    "name": "Chocolate Drop",
    "category": "food",
    "value": 1.05,
    "demand": 2,
    "image": "images/food/chocolate-drop.webp"
  },
  {
    "id": "pets-giant-black-scarab",
    "name": "Giant Black Scarab",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/giant-black-scarab.webp"
  },
  {
    "id": "vehicles-adopt-me-girl-scooter",
    "name": "Adopt Me Girl Scooter",
    "category": "vehicles",
    "value": 0.7,
    "demand": 1,
    "image": "images/vehicles/adopt-me-girl-scooter.webp"
  },
  {
    "id": "pets-werewolf",
    "name": "Werewolf",
    "category": "pets",
    "value": 8.75,
    "demand": 3,
    "image": "images/pets/werewolf.webp"
  },
  {
    "id": "petwear-natures-crown",
    "name": "Nature's Crown",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/nature-s-crown.webp"
  },
  {
    "id": "petwear-corndog-mustache",
    "name": "Corndog Mustache",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/corndog-mustache.webp"
  },
  {
    "id": "petwear-dumpling-friend-hat",
    "name": "Dumpling Friend Hat",
    "category": "petwear",
    "value": 0.42,
    "demand": 2,
    "image": "images/petwear/dumpling-friend-hat.webp"
  },
  {
    "id": "strollers-rainbow-stroller",
    "name": "Rainbow Stroller",
    "category": "strollers",
    "value": 0.5481,
    "demand": 2,
    "image": "images/strollers/rainbow-stroller.webp"
  },
  {
    "id": "pets-lobster",
    "name": "Lobster",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/lobster.webp"
  },
  {
    "id": "pets-pterodactyl",
    "name": "Pterodactyl",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/pterodactyl.webp"
  },
  {
    "id": "petwear-heart-lock-necklace",
    "name": "Heart Lock Necklace",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/heart-lock-necklace.webp"
  },
  {
    "id": "pets-2025-birthday-butterfly",
    "name": "2025 Birthday Butterfly",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/2025-birthday-butterfly.webp"
  },
  {
    "id": "pets-aye-aye",
    "name": "Aye Aye",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/aye-aye.webp"
  },
  {
    "id": "petwear-puppeteer-hand",
    "name": "Puppeteer Hand",
    "category": "petwear",
    "value": 0.175,
    "demand": 1,
    "image": "images/petwear/puppeteer-hand.webp"
  },
  {
    "id": "strollers-sleigh-stroller",
    "name": "Sleigh Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "eggs-fool-egg",
    "name": "Fool Egg",
    "category": "eggs",
    "value": 0.3475,
    "demand": 2,
    "image": "images/eggs/fool-egg.webp"
  },
  {
    "id": "gifts-christmas-gift",
    "name": "Christmas Gift",
    "category": "gifts",
    "value": 6.1081,
    "demand": 2,
    "image": "images/gifts/christmas-gift.webp"
  },
  {
    "id": "pets-evil-chick",
    "name": "Evil Chick",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/evil-chick.webp"
  },
  {
    "id": "pets-old-king-coal",
    "name": "Old King Coal",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/old-king-coal.webp"
  },
  {
    "id": "pets-frostbite-cub",
    "name": "Frostbite Cub",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/frostbite-cub.webp"
  },
  {
    "id": "pets-brown-bear",
    "name": "Brown Bear",
    "category": "pets",
    "value": 1.925,
    "demand": 2,
    "image": "images/pets/brown-bear.webp"
  },
  {
    "id": "pets-frozen-penguin",
    "name": "Frozen Penguin",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/frozen-penguin.webp"
  },
  {
    "id": "petwear-headband",
    "name": "Headband",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/headband.webp"
  },
  {
    "id": "pets-maleo-bird",
    "name": "Maleo Bird",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/maleo-bird.webp"
  },
  {
    "id": "pets-greenchested-pheasant",
    "name": "Green-Chested Pheasant",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/green-chested-pheasant.webp"
  },
  {
    "id": "food-mud-ball",
    "name": "Mud Ball",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/mud-ball.webp"
  },
  {
    "id": "petwear-bear-hood",
    "name": "Bear Hood",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/bear-hood.webp"
  },
  {
    "id": "vehicles-black-scooter",
    "name": "Black Scooter",
    "category": "vehicles",
    "value": 0.875,
    "demand": 2,
    "image": "images/vehicles/black-scooter.webp"
  },
  {
    "id": "petwear-steampunk-clock-hat",
    "name": "Steampunk Clock Hat",
    "category": "petwear",
    "value": 0.42,
    "demand": 1,
    "image": "images/petwear/steampunk-clock-hat.webp"
  },
  {
    "id": "pets-diamond-amazon",
    "name": "Diamond Amazon",
    "category": "pets",
    "value": 2.1,
    "demand": 2,
    "image": "images/pets/diamond-amazon.webp"
  },
  {
    "id": "petwear-shadow-aura",
    "name": "Shadow Aura",
    "category": "petwear",
    "value": 0.77,
    "demand": 2,
    "image": "images/petwear/shadow-aura.webp"
  },
  {
    "id": "vehicles-royal-crown-carriage",
    "name": "Royal Crown Carriage",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/royal-crown-carriage.webp"
  },
  {
    "id": "food-ash-zebra-bait",
    "name": "Ash Zebra Bait",
    "category": "food",
    "value": 0.28,
    "demand": 2,
    "image": "images/food/ash-zebra-bait.webp"
  },
  {
    "id": "pets-peregrine-falcon",
    "name": "Peregrine Falcon",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/peregrine-falcon.webp"
  },
  {
    "id": "pets-cow",
    "name": "Cow",
    "category": "pets",
    "value": 13.825,
    "demand": 3,
    "image": "images/pets/cow.webp"
  },
  {
    "id": "vehicles-micro-car",
    "name": "Micro Car",
    "category": "vehicles",
    "value": 0.14,
    "demand": 1,
    "image": "images/vehicles/micro-car.webp"
  },
  {
    "id": "pets-lunar-moon-bear",
    "name": "Lunar Moon Bear",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/lunar-moon-bear.webp"
  },
  {
    "id": "pets-goldhorn",
    "name": "Goldhorn",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/goldhorn.webp"
  },
  {
    "id": "pets-penguin",
    "name": "Penguin",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/penguin.webp"
  },
  {
    "id": "strollers-strawberry-stroller",
    "name": "Strawberry Stroller",
    "category": "strollers",
    "value": 0.2094,
    "demand": 1,
    "image": "images/strollers/strawberry-stroller.webp"
  },
  {
    "id": "pets-longhorn-cow",
    "name": "Longhorn Cow",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/longhorn-cow.webp"
  },
  {
    "id": "gifts-regal-wing-chest",
    "name": "Regal Wing Chest",
    "category": "gifts",
    "value": 0.9416,
    "demand": 2,
    "image": "images/gifts/regal-wing-chest.webp"
  },
  {
    "id": "petwear-jade-moth-wings",
    "name": "Jade Moth Wings",
    "category": "petwear",
    "value": 0.63,
    "demand": 1,
    "image": "images/petwear/jade-moth-wings.webp"
  },
  {
    "id": "stickers-otter-sticker",
    "name": "Otter Sticker",
    "category": "stickers",
    "value": 0.056,
    "demand": 1,
    "image": "images/stickers/otter-sticker.webp"
  },
  {
    "id": "pets-lion-cub",
    "name": "Lion Cub",
    "category": "pets",
    "value": 2.975,
    "demand": 2,
    "image": "images/pets/lion-cub.webp"
  },
  {
    "id": "pets-lava-wolf",
    "name": "Lava Wolf",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/lava-wolf.webp"
  },
  {
    "id": "toys-heart-balloon",
    "name": "Heart Balloon",
    "category": "toys",
    "value": 0.175,
    "demand": 1,
    "image": "images/toys/heart-balloon.webp"
  },
  {
    "id": "petwear-ice-cream-cone-hat",
    "name": "Ice Cream Cone Hat",
    "category": "petwear",
    "value": 3.325,
    "demand": 3,
    "image": "images/petwear/ice-cream-cone-hat.webp"
  },
  {
    "id": "pets-clover-cow",
    "name": "Clover Cow",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/clover-cow.webp"
  },
  {
    "id": "pets-wildfire-hawk",
    "name": "Wildfire Hawk",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/wildfire-hawk.webp"
  },
  {
    "id": "pets-pangolin",
    "name": "Pangolin",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/pangolin.webp"
  },
  {
    "id": "pets-beluga-whale",
    "name": "Beluga Whale",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/beluga-whale.webp"
  },
  {
    "id": "eggs-diamond-egg",
    "name": "Diamond Egg",
    "category": "eggs",
    "value": 0.1794,
    "demand": 1,
    "image": "images/eggs/diamond-egg.webp"
  },
  {
    "id": "pets-irish-elk",
    "name": "Irish Elk",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/irish-elk.webp"
  },
  {
    "id": "eggs-urban-egg",
    "name": "Urban Egg",
    "category": "eggs",
    "value": 0.3878,
    "demand": 2,
    "image": "images/eggs/urban-egg.webp"
  },
  {
    "id": "pets-blue-dog",
    "name": "Blue Dog",
    "category": "pets",
    "value": 5.25,
    "demand": 3,
    "image": "images/pets/blue-dog.webp"
  },
  {
    "id": "food-chocolate-egg",
    "name": "Chocolate Egg",
    "category": "food",
    "value": 1.225,
    "demand": 2,
    "image": "images/food/chocolate-egg.webp"
  },
  {
    "id": "stickers-winged-horse-sticker",
    "name": "Winged Horse Sticker",
    "category": "stickers",
    "value": 0.175,
    "demand": 2,
    "image": "images/stickers/winged-horse-sticker.webp"
  },
  {
    "id": "pets-rhino",
    "name": "Rhino",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/rhino.webp"
  },
  {
    "id": "stickers-winter-2024-sticker-pack",
    "name": "Winter 2024 Sticker Pack",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/winter-2024-sticker-pack.webp"
  },
  {
    "id": "pets-moose-calf",
    "name": "Moose Calf",
    "category": "pets",
    "value": 1.505,
    "demand": 2,
    "image": "images/pets/moose-calf.webp"
  },
  {
    "id": "pets-squid",
    "name": "Squid",
    "category": "pets",
    "value": 0.56,
    "demand": 1,
    "image": "images/pets/squid.webp"
  },
  {
    "id": "pets-hawk",
    "name": "Hawk",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/hawk.webp"
  },
  {
    "id": "eggs-royal-aztec-egg",
    "name": "Royal Aztec Egg",
    "category": "eggs",
    "value": 0.4506,
    "demand": 2,
    "image": "images/eggs/royal-aztec-egg.webp"
  },
  {
    "id": "pets-unicorn",
    "name": "Unicorn",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/unicorn.webp"
  },
  {
    "id": "pets-pirate-hermit-crab",
    "name": "Pirate Hermit Crab",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/pirate-hermit-crab.webp"
  },
  {
    "id": "pets-irish-setter",
    "name": "Irish Setter",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/irish-setter.webp"
  },
  {
    "id": "toys-llama-plush",
    "name": "Llama Plush",
    "category": "toys",
    "value": 0.28,
    "demand": 1,
    "image": "images/toys/llama-plush.webp"
  },
  {
    "id": "pets-summer-walrus",
    "name": "Summer Walrus",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/summer-walrus.webp"
  },
  {
    "id": "pets-ermine",
    "name": "Ermine",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/ermine.webp"
  },
  {
    "id": "pets-dracula-parrot",
    "name": "Dracula Parrot",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/dracula-parrot.webp"
  },
  {
    "id": "pets-snowman",
    "name": "Snowman",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/snowman.webp"
  },
  {
    "id": "gifts-monkey-box",
    "name": "Monkey Box",
    "category": "gifts",
    "value": 1.2862,
    "demand": 2,
    "image": "images/gifts/monkey-box.webp"
  },
  {
    "id": "pets-frankenfeline",
    "name": "Frankenfeline",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/frankenfeline.webp"
  },
  {
    "id": "petwear-eco-brown-hiking-backpack",
    "name": "Eco Brown Hiking Backpack",
    "category": "petwear",
    "value": 0.84,
    "demand": 2,
    "image": "images/petwear/eco-brown-hiking-backpack.webp"
  },
  {
    "id": "petwear-security-spotlight",
    "name": "Security Spotlight",
    "category": "petwear",
    "value": 0.105,
    "demand": 1,
    "image": "images/petwear/security-spotlight.webp"
  },
  {
    "id": "pets-hippo",
    "name": "Hippo",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/hippo.webp"
  },
  {
    "id": "petwear-propeller-hat",
    "name": "Propeller Hat",
    "category": "petwear",
    "value": 1.225,
    "demand": 2,
    "image": "images/petwear/propeller-hat.webp"
  },
  {
    "id": "gifts-golden-gift",
    "name": "Golden Gift",
    "category": "gifts",
    "value": 8.6262,
    "demand": 2,
    "image": "images/gifts/golden-gift.webp"
  },
  {
    "id": "pets-coconut-friend",
    "name": "Coconut Friend",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/coconut-friend.webp"
  },
  {
    "id": "pets-wyvern",
    "name": "Wyvern",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/wyvern.webp"
  },
  {
    "id": "pets-african-wild-dog",
    "name": "African Wild Dog",
    "category": "pets",
    "value": 58.8,
    "demand": 3,
    "image": "images/pets/african-wild-dog.webp"
  },
  {
    "id": "pets-kappakid",
    "name": "Kappakid",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/kappakid.webp"
  },
  {
    "id": "petwear-waterfall-hat",
    "name": "Waterfall Hat",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/waterfall-hat.webp"
  },
  {
    "id": "pets-golden-hummingbird",
    "name": "Golden Hummingbird",
    "category": "pets",
    "value": 0.56,
    "demand": 1,
    "image": "images/pets/golden-hummingbird.webp"
  },
  {
    "id": "stickers-hot-doggo-sticker",
    "name": "Hot Doggo Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/hot-doggo-sticker.webp"
  },
  {
    "id": "toys-unicorn-leash",
    "name": "Unicorn Leash",
    "category": "toys",
    "value": 0.35,
    "demand": 1,
    "image": "images/toys/unicorn-leash.webp"
  },
  {
    "id": "stickers-solaris-animated-sticker",
    "name": "Solaris Animated Sticker",
    "category": "stickers",
    "value": 0.385,
    "demand": 2,
    "image": "images/stickers/solaris-animated-sticker.webp"
  },
  {
    "id": "pets-puptune",
    "name": "Puptune",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/puptune.webp"
  },
  {
    "id": "pets-robo-dog",
    "name": "Robo Dog",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/robo-dog.webp"
  },
  {
    "id": "pets-rock-pigeon",
    "name": "Rock Pigeon",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/rock-pigeon.webp"
  },
  {
    "id": "petwear-ponytail",
    "name": "Ponytail",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/ponytail.webp"
  },
  {
    "id": "pets-2022-uplift-butterfly",
    "name": "2022 Uplift Butterfly",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/2022-uplift-butterfly.webp"
  },
  {
    "id": "petwear-rain-cloud-hat",
    "name": "Rain Cloud Hat",
    "category": "petwear",
    "value": 6.475,
    "demand": 3,
    "image": "images/petwear/rain-cloud-hat.webp"
  },
  {
    "id": "pets-priceless-shrimp",
    "name": "Priceless Shrimp",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/priceless-shrimp.webp"
  },
  {
    "id": "pets-deathstalker-scorpion",
    "name": "Deathstalker Scorpion",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/deathstalker-scorpion.webp"
  },
  {
    "id": "toys-rose-quartz-glow-paint",
    "name": "Rose Quartz Glow Mega Neon Paint",
    "category": "toys",
    "value": 0.28,
    "demand": 3,
    "image": "images/toys/rose-quartz-glow-mega-neon-paint.webp"
  },
  {
    "id": "strollers-humbug-stroller",
    "name": "Humbug Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "toys-pumpkin-rattle",
    "name": "Pumpkin Rattle",
    "category": "toys",
    "value": 0.7,
    "demand": 1,
    "image": "images/toys/pumpkin-rattle.webp"
  },
  {
    "id": "pets-slimingo",
    "name": "Slimingo",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/slimingo.webp"
  },
  {
    "id": "vehicles-orange-scooter",
    "name": "Neon Orange Scooter",
    "category": "vehicles",
    "value": 0.875,
    "demand": 1,
    "image": "images/vehicles/neon-orange-scooter.webp"
  },
  {
    "id": "pets-badger",
    "name": "Badger",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/badger.webp"
  },
  {
    "id": "pets-glacier-moth",
    "name": "Glacier Moth",
    "category": "pets",
    "value": 1.505,
    "demand": 2,
    "image": "images/pets/glacier-moth.webp"
  },
  {
    "id": "pets-gingerbread-mouse",
    "name": "Gingerbread Mouse",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/gingerbread-mouse.webp"
  },
  {
    "id": "stickers-dalmatian-sticker",
    "name": "Dalmatian Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/dalmatian-sticker.webp"
  },
  {
    "id": "gifts-admin-abuse-box",
    "name": "Admin Abuse Box",
    "category": "gifts",
    "value": 0.0317,
    "demand": 1,
    "image": "images/gifts/admin-abuse-box.webp"
  },
  {
    "id": "pets-snow-monkey",
    "name": "Snow Monkey",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/snow-monkey.webp"
  },
  {
    "id": "strollers-lunar-new-year-rickshaw-stroller",
    "name": "Lunar New Year Rickshaw Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-kelp-raider",
    "name": "Kelp Raider",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/kelp-raider.webp"
  },
  {
    "id": "pets-bald-eagle",
    "name": "Bald Eagle",
    "category": "pets",
    "value": 4.2,
    "demand": 2,
    "image": "images/pets/bald-eagle.webp"
  },
  {
    "id": "petwear-monkey-king-crown",
    "name": "Monkey King Crown",
    "category": "petwear",
    "value": 0.77,
    "demand": 2,
    "image": "images/petwear/monkey-king-crown.webp"
  },
  {
    "id": "pets-great-pyrenees",
    "name": "Great Pyrenees",
    "category": "pets",
    "value": 0.525,
    "demand": 2,
    "image": "images/pets/great-pyrenees.webp"
  },
  {
    "id": "gifts-premium-gorilla-box",
    "name": "Premium Gorilla Box",
    "category": "gifts",
    "value": 1.3559,
    "demand": 2,
    "image": "images/gifts/premium-gorilla-box.webp"
  },
  {
    "id": "pets-super-saru",
    "name": "Super Saru",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/super-saru.webp"
  },
  {
    "id": "pets-cocoadile",
    "name": "Cocoadile",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/cocoadile.webp"
  },
  {
    "id": "pets-monkey-king",
    "name": "Monkey King",
    "category": "pets",
    "value": 13.125,
    "demand": 2,
    "image": "images/pets/monkey-king.webp"
  },
  {
    "id": "pets-ant",
    "name": "Ant",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/ant.webp"
  },
  {
    "id": "pets-ghostly-cat",
    "name": "Ghostly Cat",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/ghostly-cat.webp"
  },
  {
    "id": "strollers-droplet-stroller",
    "name": "Droplet Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-bat",
    "name": "Bat",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/bat.webp"
  },
  {
    "id": "pets-quetzalcoatl",
    "name": "Quetzalcoatl",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/quetzalcoatl.webp"
  },
  {
    "id": "pets-arctic-tern",
    "name": "Arctic Tern",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/arctic-tern.webp"
  },
  {
    "id": "stickers-fox-sticker",
    "name": "Fox Sticker",
    "category": "stickers",
    "value": 0.0875,
    "demand": 1,
    "image": "images/stickers/fox-sticker.webp"
  },
  {
    "id": "stickers-round-fallow-deer-sticker",
    "name": "Round Fallow Deer Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/round-fallow-deer-sticker.webp"
  },
  {
    "id": "pets-white-sand-dollar",
    "name": "White Sand Dollar",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/white-sand-dollar.webp"
  },
  {
    "id": "vehicles-lava-racer",
    "name": "Lava Racer",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/lava-racer.webp"
  },
  {
    "id": "pets-nurse-shark",
    "name": "Nurse Shark",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/nurse-shark.webp"
  },
  {
    "id": "pets-influencer-gibbon",
    "name": "Influencer Gibbon",
    "category": "pets",
    "value": 0.63,
    "demand": 1,
    "image": "images/pets/influencer-gibbon.webp"
  },
  {
    "id": "petwear-duck-floatie",
    "name": "Duck Floatie",
    "category": "petwear",
    "value": 0.245,
    "demand": 2,
    "image": "images/petwear/duck-floatie.webp"
  },
  {
    "id": "pets-rat",
    "name": "Rat",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/rat.webp"
  },
  {
    "id": "petwear-2022-birthday-cake",
    "name": "2022 Birthday Cake",
    "category": "petwear",
    "value": 9.625,
    "demand": 3,
    "image": "images/petwear/2022-birthday-cake.webp"
  },
  {
    "id": "pets-merry-mistletroll",
    "name": "Merry Mistletroll",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/merry-mistletroll.webp"
  },
  {
    "id": "pets-emperor-gorilla",
    "name": "Emperor Gorilla",
    "category": "pets",
    "value": 5.425,
    "demand": 3,
    "image": "images/pets/emperor-gorilla.webp"
  },
  {
    "id": "vehicles-paint-roller-truck",
    "name": "Paint Roller Truck",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/paint-roller-truck.webp"
  },
  {
    "id": "pets-albino-monkey",
    "name": "Albino Monkey",
    "category": "pets",
    "value": 6.3,
    "demand": 3,
    "image": "images/pets/albino-monkey.webp"
  },
  {
    "id": "potions-cure-all-potion",
    "name": "Cure All Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-rabbit",
    "name": "Rabbit",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/rabbit.webp"
  },
  {
    "id": "pets-black-rhino",
    "name": "Black Rhino",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/black-rhino.webp"
  },
  {
    "id": "strollers-snow-mobile-stroller",
    "name": "Snow Mobile Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-egg-stroller",
    "name": "Egg Stroller",
    "category": "strollers",
    "value": 18.67,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-red-dutch-guinea-pig",
    "name": "Red Dutch Guinea Pig",
    "category": "pets",
    "value": 4.9,
    "demand": 2,
    "image": "images/pets/red-dutch-guinea-pig.webp"
  },
  {
    "id": "pets-kage-crow",
    "name": "Kage Crow",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/kage-crow.webp"
  },
  {
    "id": "pets-icy-porcupine",
    "name": "Icy Porcupine",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/icy-porcupine.webp"
  },
  {
    "id": "petwear-hive-backpack",
    "name": "Hive Backpack",
    "category": "petwear",
    "value": 49.0,
    "demand": 2,
    "image": "images/petwear/hive-backpack.webp"
  },
  {
    "id": "petwear-rain-boots",
    "name": "Rain Boots",
    "category": "petwear",
    "value": 1.05,
    "demand": 2,
    "image": "images/petwear/rain-boots.webp"
  },
  {
    "id": "petwear-halloween-evil-barrel-backpack",
    "name": "Halloween Evil Barrel Backpack",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/halloween-evil-barrel-backpack.webp"
  },
  {
    "id": "strollers-ice-skate-stroller",
    "name": "Ice Skate Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "stickers-pretty-please-snowball-sticker",
    "name": "Pretty Please Snowball Sticker",
    "category": "stickers",
    "value": 0.28,
    "demand": 2,
    "image": "images/stickers/pretty-please-snowball-sticker.webp"
  },
  {
    "id": "strollers-claw-machine-stroller",
    "name": "Claw Machine Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-royal-capuchin-monkey",
    "name": "Royal Capuchin Monkey",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/royal-capuchin-monkey.webp"
  },
  {
    "id": "strollers-tulip-stroller",
    "name": "Tulip Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-pelican",
    "name": "Pelican",
    "category": "pets",
    "value": 13.825,
    "demand": 2,
    "image": "images/pets/pelican.webp"
  },
  {
    "id": "pets-wolpertinger",
    "name": "Wolpertinger",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/wolpertinger.webp"
  },
  {
    "id": "pets-criosphinx",
    "name": "Criosphinx",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/criosphinx.webp"
  },
  {
    "id": "vehicles-royal-carriage",
    "name": "Royal Carriage",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/royal-carriage.webp"
  },
  {
    "id": "pets-patchy-bear",
    "name": "Patchy Bear",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/patchy-bear.webp"
  },
  {
    "id": "pets-jousting-horse",
    "name": "Jousting Horse",
    "category": "pets",
    "value": 2.1,
    "demand": 3,
    "image": "images/pets/jousting-horse.webp"
  },
  {
    "id": "pets-albino-gorilla",
    "name": "Albino Gorilla",
    "category": "pets",
    "value": 1.05,
    "demand": 2,
    "image": "images/pets/albino-gorilla.webp"
  },
  {
    "id": "pets-hydra",
    "name": "Hydra",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/hydra.webp"
  },
  {
    "id": "pets-snowy-mammoth",
    "name": "Snowy Mammoth",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/snowy-mammoth.webp"
  },
  {
    "id": "pets-snorgle",
    "name": "Snorgle",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/snorgle.webp"
  },
  {
    "id": "vehicles-gyrocopter",
    "name": "Gyrocopter",
    "category": "vehicles",
    "value": 0.875,
    "demand": 1,
    "image": "images/vehicles/gyrocopter.webp"
  },
  {
    "id": "stickers-dragon-breath-animated-sticker",
    "name": "Dragon Breath Animated Sticker",
    "category": "stickers",
    "value": 0.77,
    "demand": 2,
    "image": "images/stickers/dragon-breath-animated-sticker.webp"
  },
  {
    "id": "pets-dragon",
    "name": "Dragon",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/dragon.webp"
  },
  {
    "id": "pets-sugar-glider",
    "name": "Sugar Glider",
    "category": "pets",
    "value": 10.5,
    "demand": 3,
    "image": "images/pets/sugar-glider.webp"
  },
  {
    "id": "eggs-cracked-egg",
    "name": "Cracked Egg",
    "category": "eggs",
    "value": 0.0256,
    "demand": 1,
    "image": "images/eggs/cracked-egg.webp"
  },
  {
    "id": "food-chocolate-twist",
    "name": "Chocolate Twist",
    "category": "food",
    "value": 0.77,
    "demand": 2,
    "image": "images/food/chocolate-twist.webp"
  },
  {
    "id": "pets-ice-cube",
    "name": "Ice Cube",
    "category": "pets",
    "value": 0.3325,
    "demand": 1,
    "image": "images/pets/ice-cube.webp"
  },
  {
    "id": "pets-diamond-ladybug",
    "name": "Diamond Ladybug",
    "category": "pets",
    "value": 0.77,
    "demand": 2,
    "image": "images/pets/diamond-ladybug.webp"
  },
  {
    "id": "pets-cockroach",
    "name": "Cockroach",
    "category": "pets",
    "value": 0.2975,
    "demand": 1,
    "image": "images/pets/cockroach.webp"
  },
  {
    "id": "pets-sandfish",
    "name": "Sandfish",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/sandfish.webp"
  },
  {
    "id": "pets-grave-owl",
    "name": "Grave Owl",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/grave-owl.webp"
  },
  {
    "id": "vehicles-yellow-taxi-cab",
    "name": "Yellow Taxi Cab",
    "category": "vehicles",
    "value": 0.245,
    "demand": 1,
    "image": "images/vehicles/yellow-taxi-cab.webp"
  },
  {
    "id": "vehicles-hot-rod-sleigh",
    "name": "Hot Rod Sleigh",
    "category": "vehicles",
    "value": 0.14,
    "demand": 1,
    "image": "images/vehicles/hot-rod-sleigh.webp"
  },
  {
    "id": "food-super-ageup-potion",
    "name": "Super Age-Up Potion",
    "category": "food",
    "value": 1.295,
    "demand": 2,
    "image": "images/food/super-age-up-potion.webp"
  },
  {
    "id": "petwear-watermelon-backpack",
    "name": "Watermelon Backpack",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/watermelon-backpack.webp"
  },
  {
    "id": "vehicles-ice-scooter",
    "name": "Ice Scooter",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/ice-scooter.webp"
  },
  {
    "id": "pets-shetland-pony-white",
    "name": "Shetland Pony White",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/shetland-pony-white.webp"
  },
  {
    "id": "gifts-kelp-raider-box",
    "name": "Kelp Raider Box",
    "category": "gifts",
    "value": 0.08,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-frost-fury",
    "name": "Frost Fury",
    "category": "pets",
    "value": 2.275,
    "demand": 2,
    "image": "images/pets/frost-fury.webp"
  },
  {
    "id": "pets-eggnog-dog",
    "name": "Eggnog Dog",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/eggnog-dog.webp"
  },
  {
    "id": "toys-anna-rattle",
    "name": "Anna Rattle",
    "category": "toys",
    "value": 0.315,
    "demand": 1,
    "image": "images/toys/anna-rattle.webp"
  },
  {
    "id": "pets-sprout-snail",
    "name": "Sprout Snail",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/sprout-snail.webp"
  },
  {
    "id": "vehicles-white-scooter",
    "name": "White Scooter",
    "category": "vehicles",
    "value": 0.385,
    "demand": 1,
    "image": "images/vehicles/white-scooter.webp"
  },
  {
    "id": "petwear-ruff",
    "name": "Ruff",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/ruff.webp"
  },
  {
    "id": "pets-toucan",
    "name": "Toucan",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/toucan.webp"
  },
  {
    "id": "potions-hyperspeed-potion",
    "name": "Hyperspeed Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-halloween-orange-pumpkin-friend-hat",
    "name": "Halloween Orange Pumpkin Friend Hat",
    "category": "petwear",
    "value": 0.175,
    "demand": 1,
    "image": "images/petwear/halloween-orange-pumpkin-friend-hat.webp"
  },
  {
    "id": "pets-deinonychus",
    "name": "Deinonychus",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/deinonychus.webp"
  },
  {
    "id": "pets-seagull",
    "name": "Seagull",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/seagull.webp"
  },
  {
    "id": "stickers-seagull-yell-animated-sticker",
    "name": "Seagull Yell Animated Sticker",
    "category": "stickers",
    "value": 6.3,
    "demand": 2,
    "image": "images/stickers/seagull-yell-animated-sticker.webp"
  },
  {
    "id": "pets-purrowl",
    "name": "Purrowl",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/purrowl.webp"
  },
  {
    "id": "gifts-kaijunior-box",
    "name": "Kaijunior Box",
    "category": "gifts",
    "value": 0.27,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-japanese-snow-fairy",
    "name": "Japanese Snow Fairy",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/japanese-snow-fairy.webp"
  },
  {
    "id": "strollers-ice-cream-stroller",
    "name": "Ice Cream Stroller",
    "category": "strollers",
    "value": 0.3463,
    "demand": 1,
    "image": "images/strollers/ice-cream-stroller.webp"
  },
  {
    "id": "toys-hotdog-stand",
    "name": "Hotdog Stand",
    "category": "toys",
    "value": 0.175,
    "demand": 2,
    "image": "images/toys/hotdog-stand.webp"
  },
  {
    "id": "strollers-balloon-stroller",
    "name": "Balloon Stroller",
    "category": "strollers",
    "value": 0.1925,
    "demand": 1,
    "image": "images/strollers/balloon-stroller.webp"
  },
  {
    "id": "pets-marabou-stork",
    "name": "Marabou Stork",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/marabou-stork.webp"
  },
  {
    "id": "strollers-campers-wheelbarrow-stroller",
    "name": "Camper's Wheelbarrow Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-guardian-lion",
    "name": "Guardian Lion",
    "category": "pets",
    "value": 0.56,
    "demand": 1,
    "image": "images/pets/guardian-lion.webp"
  },
  {
    "id": "food-golden-corn",
    "name": "Golden Corn",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-corn.webp"
  },
  {
    "id": "pets-angus-calf",
    "name": "Angus Calf",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/angus-calf.webp"
  },
  {
    "id": "strollers-magic-moon-stroller",
    "name": "Magic Moon Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-strawberry-hat",
    "name": "Strawberry Hat",
    "category": "petwear",
    "value": 0.63,
    "demand": 2,
    "image": "images/petwear/strawberry-hat.webp"
  },
  {
    "id": "vehicles-banana-car",
    "name": "Banana Car",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/banana-car.webp"
  },
  {
    "id": "petwear-rain-hat",
    "name": "Rain Hat",
    "category": "petwear",
    "value": 0.35,
    "demand": 2,
    "image": "images/petwear/rain-hat.webp"
  },
  {
    "id": "pets-fairy-bat-dragon",
    "name": "Fairy Bat Dragon",
    "category": "pets",
    "value": 5.6,
    "demand": 3,
    "image": "images/pets/fairy-bat-dragon.webp"
  },
  {
    "id": "pets-christmas-pudding-pup",
    "name": "Christmas Pudding Pup",
    "category": "pets",
    "value": 1.855,
    "demand": 2,
    "image": "images/pets/christmas-pudding-pup.webp"
  },
  {
    "id": "petwear-gold-fairy-crown",
    "name": "Gold Fairy Crown",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/gold-fairy-crown.webp"
  },
  {
    "id": "strollers-old-lump-of-log-stroller",
    "name": "Old Lump of Log Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-santas-helper-stroller",
    "name": "Santa's Helper Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-bloodhound",
    "name": "Bloodhound",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/bloodhound.webp"
  },
  {
    "id": "petwear-personal-controller",
    "name": "Personal Controller",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/personal-controller.webp"
  },
  {
    "id": "pets-ostrich",
    "name": "Ostrich",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/ostrich.webp"
  },
  {
    "id": "potions-polymorph-potion",
    "name": "Polymorph Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-pizza-stroller",
    "name": "Pizza Stroller",
    "category": "strollers",
    "value": 0.3013,
    "demand": 1,
    "image": "images/strollers/pizza-stroller.webp"
  },
  {
    "id": "pets-therapy-dog",
    "name": "Therapy Dog",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/therapy-dog.webp"
  },
  {
    "id": "petwear-black-designer-backpack",
    "name": "Black Designer Backpack",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/black-designer-backpack.webp"
  },
  {
    "id": "stickers-balloon-unicorn-sticker",
    "name": "Balloon Unicorn Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/balloon-unicorn-sticker.webp"
  },
  {
    "id": "pets-scorching-kaijunior",
    "name": "Scorching Kaijunior",
    "category": "pets",
    "value": 1.05,
    "demand": 1,
    "image": "images/pets/scorching-kaijunior.webp"
  },
  {
    "id": "pets-show-pony",
    "name": "Show Pony",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/show-pony.webp"
  },
  {
    "id": "pets-ice-wolf",
    "name": "Ice Wolf",
    "category": "pets",
    "value": 0.77,
    "demand": 2,
    "image": "images/pets/ice-wolf.webp"
  },
  {
    "id": "pets-gaelic-fae",
    "name": "Gaelic Fae",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/gaelic-fae.webp"
  },
  {
    "id": "pets-giant-anteater",
    "name": "Giant Anteater",
    "category": "pets",
    "value": 2.45,
    "demand": 2,
    "image": "images/pets/giant-anteater.webp"
  },
  {
    "id": "stickers-dinner-discourse-cat-sticker",
    "name": "Dinner Discourse Cat Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/dinner-discourse-cat-sticker.webp"
  },
  {
    "id": "pets-nightmare-owl",
    "name": "Nightmare Owl",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/nightmare-owl.webp"
  },
  {
    "id": "petwear-music-box-hat",
    "name": "Music Box Hat",
    "category": "petwear",
    "value": 0.42,
    "demand": 1,
    "image": "images/petwear/music-box-hat.webp"
  },
  {
    "id": "vehicles-wood-skateboard",
    "name": "Wood Skateboard",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/wood-skateboard.webp"
  },
  {
    "id": "pets-pineapple-owl",
    "name": "Pineapple Owl",
    "category": "pets",
    "value": 1.505,
    "demand": 2,
    "image": "images/pets/pineapple-owl.webp"
  },
  {
    "id": "vehicles-choo-choo-train",
    "name": "Choo Choo Train",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/choo-choo-train.webp"
  },
  {
    "id": "pets-wood-pigeon",
    "name": "Wood Pigeon",
    "category": "pets",
    "value": 1.05,
    "demand": 2,
    "image": "images/pets/wood-pigeon.webp"
  },
  {
    "id": "toys-chinese-lantern",
    "name": "Chinese Lantern",
    "category": "toys",
    "value": 3.5,
    "demand": 2,
    "image": "images/toys/chinese-lantern.webp"
  },
  {
    "id": "pets-evil-chickatrice",
    "name": "Evil Chickatrice",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/evil-chickatrice.webp"
  },
  {
    "id": "pets-robot",
    "name": "Robot",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/robot.webp"
  },
  {
    "id": "strollers-banana-stroller",
    "name": "Banana Stroller",
    "category": "strollers",
    "value": 0.1159,
    "demand": 1,
    "image": "images/strollers/banana-stroller.webp"
  },
  {
    "id": "pets-poodle",
    "name": "Poodle",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/poodle.webp"
  },
  {
    "id": "strollers-cauldron-stroller",
    "name": "Cauldron Stroller",
    "category": "strollers",
    "value": 0.2609,
    "demand": 1,
    "image": "images/strollers/cauldron-stroller.webp"
  },
  {
    "id": "toys-electric-tide-paint",
    "name": "Electric Tide Mega Neon Paint",
    "category": "toys",
    "value": 0.28,
    "demand": 3,
    "image": "images/toys/electric-tide-mega-neon-paint.webp"
  },
  {
    "id": "gifts-easter-eggy-box",
    "name": "Easter Eggy Box",
    "category": "gifts",
    "value": 0.2069,
    "demand": 1,
    "image": "images/gifts/easter-eggy-box.webp"
  },
  {
    "id": "petwear-festive-antlers",
    "name": "Festive Antlers",
    "category": "petwear",
    "value": 0.105,
    "demand": 1,
    "image": "images/petwear/festive-antlers.webp"
  },
  {
    "id": "eggs-fossil-egg",
    "name": "Fossil Egg",
    "category": "eggs",
    "value": 0.3556,
    "demand": 2,
    "image": "images/eggs/fossil-egg.webp"
  },
  {
    "id": "eggs-farm-egg",
    "name": "Farm Egg",
    "category": "eggs",
    "value": 28.6069,
    "demand": 2,
    "image": "images/eggs/farm-egg.webp"
  },
  {
    "id": "pets-striped-eggy",
    "name": "Striped Eggy",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/striped-eggy.webp"
  },
  {
    "id": "toys-snow-cone-stand",
    "name": "Snow Cone Stand",
    "category": "toys",
    "value": 0.35,
    "demand": 2,
    "image": "images/toys/snow-cone-stand.webp"
  },
  {
    "id": "petwear-festive-stocking-shoes",
    "name": "Festive Stocking Shoes",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/festive-stocking-shoes.webp"
  },
  {
    "id": "pets-halloween-black-mummy-cat",
    "name": "Halloween Black Mummy Cat",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/halloween-black-mummy-cat.webp"
  },
  {
    "id": "pets-grim-dragon",
    "name": "Grim Dragon",
    "category": "pets",
    "value": 8.925,
    "demand": 3,
    "image": "images/pets/grim-dragon.webp"
  },
  {
    "id": "pets-woolly-mammoth",
    "name": "Woolly Mammoth",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/woolly-mammoth.webp"
  },
  {
    "id": "food-golden-petunia",
    "name": "Golden Petunia",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-petunia.webp"
  },
  {
    "id": "pets-cake-friend",
    "name": "Cake Friend",
    "category": "pets",
    "value": 0.735,
    "demand": 2,
    "image": "images/pets/cake-friend.webp"
  },
  {
    "id": "pets-llama",
    "name": "Llama",
    "category": "pets",
    "value": 1.085,
    "demand": 2,
    "image": "images/pets/llama.webp"
  },
  {
    "id": "pets-jiggly-jerboa",
    "name": "Jiggly Jerboa",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/jiggly-jerboa.webp"
  },
  {
    "id": "pets-red-crowned-crane",
    "name": "Red Crowned Crane",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/red-crowned-crane.webp"
  },
  {
    "id": "pets-flying-fish",
    "name": "Flying Fish",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/flying-fish.webp"
  },
  {
    "id": "toys-stygian-hang-glider",
    "name": "Stygian Hang Glider",
    "category": "toys",
    "value": 0.14,
    "demand": 2,
    "image": "images/toys/stygian-hang-glider.webp"
  },
  {
    "id": "petwear-cat-backpack",
    "name": "Cat Backpack",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/cat-backpack.webp"
  },
  {
    "id": "pets-red-squirrel",
    "name": "Red Squirrel",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/red-squirrel.webp"
  },
  {
    "id": "vehicles-candy-snowmobile",
    "name": "Candy Snowmobile",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/candy-snowmobile.webp"
  },
  {
    "id": "pets-rock",
    "name": "Rock",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/rock.webp"
  },
  {
    "id": "pets-diamond-hummingbird",
    "name": "Diamond Hummingbird",
    "category": "pets",
    "value": 1.645,
    "demand": 2,
    "image": "images/pets/diamond-hummingbird.webp"
  },
  {
    "id": "vehicles-hot-tub-muscle-car",
    "name": "Hot Tub Muscle Car",
    "category": "vehicles",
    "value": 0.875,
    "demand": 2,
    "image": "images/vehicles/hot-tub-muscle-car.webp"
  },
  {
    "id": "strollers-big-leaf-stroller",
    "name": "Big Leaf Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "toys-staff-ingredient",
    "name": "Staff Ingredient",
    "category": "toys",
    "value": 0.455,
    "demand": 1,
    "image": "images/toys/staff-ingredient.webp"
  },
  {
    "id": "petwear-spring-bunny-nose",
    "name": "Spring Bunny Nose",
    "category": "petwear",
    "value": 1.4,
    "demand": 2,
    "image": "images/petwear/spring-bunny-nose.webp"
  },
  {
    "id": "potions-goofy-potion",
    "name": "Goofy Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-caterpillar",
    "name": "Caterpillar",
    "category": "pets",
    "value": 7.525,
    "demand": 3,
    "image": "images/pets/caterpillar.webp"
  },
  {
    "id": "pets-mrs-whiskerpips",
    "name": "Mrs. Whiskerpips",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/mrs-whiskerpips.webp"
  },
  {
    "id": "food-heart-potion",
    "name": "Heart Potion",
    "category": "food",
    "value": 1.4,
    "demand": 2,
    "image": "images/food/heart-potion.webp"
  },
  {
    "id": "pets-zombie-buffalo",
    "name": "Zombie Buffalo",
    "category": "pets",
    "value": 3.675,
    "demand": 2,
    "image": "images/pets/zombie-buffalo.webp"
  },
  {
    "id": "vehicles-green-skateboard",
    "name": "Neon Green Skateboard",
    "category": "vehicles",
    "value": 0.91,
    "demand": 1,
    "image": "images/vehicles/neon-green-skateboard.webp"
  },
  {
    "id": "pets-king-penguin",
    "name": "King Penguin",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/king-penguin.webp"
  },
  {
    "id": "petwear-kraken-hat",
    "name": "Kraken Hat",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/kraken-hat.webp"
  },
  {
    "id": "pets-capricorn",
    "name": "Capricorn",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/capricorn.webp"
  },
  {
    "id": "pets-hyena",
    "name": "Hyena",
    "category": "pets",
    "value": 1.75,
    "demand": 2,
    "image": "images/pets/hyena.webp"
  },
  {
    "id": "pets-chipmunk",
    "name": "Chipmunk",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/chipmunk.webp"
  },
  {
    "id": "pets-river-otter",
    "name": "River Otter",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/river-otter.webp"
  },
  {
    "id": "vehicles-black-skateboard",
    "name": "Black Skateboard",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/black-skateboard.webp"
  },
  {
    "id": "pets-dancing-dragon",
    "name": "Dancing Dragon",
    "category": "pets",
    "value": 1.4,
    "demand": 2,
    "image": "images/pets/dancing-dragon.webp"
  },
  {
    "id": "pets-rubber-ducky",
    "name": "Rubber Ducky",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/rubber-ducky.webp"
  },
  {
    "id": "vehicles-gokart",
    "name": "GoKart",
    "category": "vehicles",
    "value": 2.8,
    "demand": 2,
    "image": "images/vehicles/gokart.webp"
  },
  {
    "id": "pets-trihorned-treehopper",
    "name": "Tri-horned Treehopper",
    "category": "pets",
    "value": 2.625,
    "demand": 2,
    "image": "images/pets/tri-horned-treehopper.webp"
  },
  {
    "id": "pets-roadrunner",
    "name": "Roadrunner",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/roadrunner.webp"
  },
  {
    "id": "toys-puppy-plush",
    "name": "Puppy Plush",
    "category": "toys",
    "value": 0.28,
    "demand": 1,
    "image": "images/toys/puppy-plush.webp"
  },
  {
    "id": "pets-peach-owl",
    "name": "Peach Owl",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/peach-owl.webp"
  },
  {
    "id": "vehicles-inspector-sherbet-bus",
    "name": "Inspector Sherbet Bus",
    "category": "vehicles",
    "value": 0.175,
    "demand": 1,
    "image": "images/vehicles/inspector-sherbet-bus.webp"
  },
  {
    "id": "pets-starmite",
    "name": "Starmite",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/starmite.webp"
  },
  {
    "id": "food-maple-leaf-treat",
    "name": "Maple Leaf Treat",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/maple-leaf-treat.webp"
  },
  {
    "id": "pets-caelum-cervi",
    "name": "Caelum Cervi",
    "category": "pets",
    "value": 1.925,
    "demand": 2,
    "image": "images/pets/caelum-cervi.webp"
  },
  {
    "id": "pets-octopus",
    "name": "Octopus",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/octopus.webp"
  },
  {
    "id": "pets-goldfish",
    "name": "Goldfish",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/goldfish.webp"
  },
  {
    "id": "pets-gummy-guana",
    "name": "Gummy Guana",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/gummy-guana.webp"
  },
  {
    "id": "pets-woodpecker",
    "name": "Woodpecker",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/woodpecker.webp"
  },
  {
    "id": "pets-red-sand-dollar",
    "name": "Red Sand Dollar",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/red-sand-dollar.webp"
  },
  {
    "id": "pets-cassowary",
    "name": "Cassowary",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/cassowary.webp"
  },
  {
    "id": "strollers-popsicle-stroller",
    "name": "Popsicle Stroller",
    "category": "strollers",
    "value": 0.2287,
    "demand": 1,
    "image": "images/strollers/popsicle-stroller.webp"
  },
  {
    "id": "pets-mexican-wolf",
    "name": "Mexican Wolf",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/mexican-wolf.webp"
  },
  {
    "id": "strollers-shopping-cart-stroller",
    "name": "Shopping Cart Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-star-sunglasses",
    "name": "Star Sunglasses",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/star-sunglasses.webp"
  },
  {
    "id": "pets-kakapo",
    "name": "Kakapo",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/kakapo.webp"
  },
  {
    "id": "stickers-squished-red-pandorama-sticker",
    "name": "Squished Red Pandorama Sticker",
    "category": "stickers",
    "value": 0.175,
    "demand": 1,
    "image": "images/stickers/squished-red-pandorama-sticker.webp"
  },
  {
    "id": "pets-crab",
    "name": "Crab",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/crab.webp"
  },
  {
    "id": "eggs-garden-egg",
    "name": "Garden Egg",
    "category": "eggs",
    "value": 0.0818,
    "demand": 1,
    "image": "images/eggs/garden-egg.webp"
  },
  {
    "id": "pets-camel",
    "name": "Camel",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/camel.webp"
  },
  {
    "id": "pets-leopard-shark",
    "name": "Leopard Shark",
    "category": "pets",
    "value": 0.875,
    "demand": 2,
    "image": "images/pets/leopard-shark.webp"
  },
  {
    "id": "pets-scarecrow-crow",
    "name": "Scarecrow Crow",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/scarecrow-crow.webp"
  },
  {
    "id": "pets-rhino-beetle",
    "name": "Rhino Beetle",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/rhino-beetle.webp"
  },
  {
    "id": "petwear-2022-birthday-confetti-drape",
    "name": "2022 Birthday Confetti Drape",
    "category": "petwear",
    "value": 0.77,
    "demand": 2,
    "image": "images/petwear/2022-birthday-confetti-drape.webp"
  },
  {
    "id": "pets-borhyaena-gigantica",
    "name": "Borhyaena Gigantica",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/borhyaena-gigantica.webp"
  },
  {
    "id": "strollers-trike-stroller",
    "name": "Trike Stroller",
    "category": "strollers",
    "value": 0.1756,
    "demand": 1,
    "image": "images/strollers/trike-stroller.webp"
  },
  {
    "id": "pets-arctic-dusk-dragon",
    "name": "Arctic Dusk Dragon",
    "category": "pets",
    "value": 1.4,
    "demand": 2,
    "image": "images/pets/arctic-dusk-dragon.webp"
  },
  {
    "id": "pets-parrot",
    "name": "Parrot",
    "category": "pets",
    "value": 72.8,
    "demand": 3,
    "image": "images/pets/parrot.webp"
  },
  {
    "id": "petwear-cowboy-saddle",
    "name": "Cowboy Saddle",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/cowboy-saddle.webp"
  },
  {
    "id": "petwear-cutlass",
    "name": "Cutlass",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/cutlass.webp"
  },
  {
    "id": "pets-toy-poodle",
    "name": "Toy Poodle",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/toy-poodle.webp"
  },
  {
    "id": "petwear-head-chef",
    "name": "Head Chef",
    "category": "petwear",
    "value": 2.8,
    "demand": 2,
    "image": "images/petwear/head-chef.webp"
  },
  {
    "id": "vehicles-flower-truck",
    "name": "Flower Truck",
    "category": "vehicles",
    "value": 1.4,
    "demand": 2,
    "image": "images/vehicles/flower-truck.webp"
  },
  {
    "id": "strollers-hot-cocoa-stroller",
    "name": "Hot Cocoa Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-bunny-swirl",
    "name": "Bunny Swirl",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/bunny-swirl.webp"
  },
  {
    "id": "pets-black-moon-bear",
    "name": "Black Moon Bear",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/black-moon-bear.webp"
  },
  {
    "id": "petwear-city-hat",
    "name": "City Hat",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/city-hat.webp"
  },
  {
    "id": "petwear-pink-cat-ear-headphones",
    "name": "Pink Cat Ear Headphones",
    "category": "petwear",
    "value": 1.05,
    "demand": 2,
    "image": "images/petwear/pink-cat-ear-headphones.webp"
  },
  {
    "id": "pets-buffalo",
    "name": "Buffalo",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/buffalo.webp"
  },
  {
    "id": "gifts-walrus-box",
    "name": "Walrus Box",
    "category": "gifts",
    "value": 0.4297,
    "demand": 2,
    "image": "images/gifts/walrus-box.webp"
  },
  {
    "id": "stickers-spinning-cat-animated-sticker",
    "name": "Spinning Cat Animated Sticker",
    "category": "stickers",
    "value": 7.7,
    "demand": 2,
    "image": "images/stickers/spinning-cat-animated-sticker.webp"
  },
  {
    "id": "pets-mouse",
    "name": "Mouse",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/mouse.webp"
  },
  {
    "id": "pets-water-rabbit",
    "name": "Water Rabbit",
    "category": "pets",
    "value": 0.595,
    "demand": 2,
    "image": "images/pets/water-rabbit.webp"
  },
  {
    "id": "petwear-magic-girl-wings",
    "name": "Magic Girl Wings",
    "category": "petwear",
    "value": 9.8,
    "demand": 2,
    "image": "images/petwear/magic-girl-wings.webp"
  },
  {
    "id": "pets-tegu",
    "name": "Tegu",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/tegu.webp"
  },
  {
    "id": "pets-manta-ray",
    "name": "Manta Ray",
    "category": "pets",
    "value": 0.3325,
    "demand": 1,
    "image": "images/pets/manta-ray.webp"
  },
  {
    "id": "toys-homeing-rocket",
    "name": "Homeing Rocket",
    "category": "toys",
    "value": 0.42,
    "demand": 1,
    "image": "images/toys/homeing-rocket.webp"
  },
  {
    "id": "petwear-queen-bee-slippers",
    "name": "Queen Bee Slippers",
    "category": "petwear",
    "value": 47.25,
    "demand": 2,
    "image": "images/petwear/queen-bee-slippers.webp"
  },
  {
    "id": "stickers-parrot-sticker",
    "name": "Parrot Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/parrot-sticker.webp"
  },
  {
    "id": "strollers-teacup-stroller",
    "name": "Teacup Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-candy-hare",
    "name": "Candy Hare",
    "category": "pets",
    "value": 0.98,
    "demand": 2,
    "image": "images/pets/candy-hare.webp"
  },
  {
    "id": "gifts-aberdeen-angus-box",
    "name": "Aberdeen Angus Box",
    "category": "gifts",
    "value": 0.09,
    "demand": 3,
    "image": ""
  },
  {
    "id": "gifts-regal-chest",
    "name": "Regal Chest",
    "category": "gifts",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-steppe-lion",
    "name": "Steppe Lion",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/steppe-lion.webp"
  },
  {
    "id": "toys-cotton-candy-stand",
    "name": "Cotton Candy Stand",
    "category": "toys",
    "value": 0.35,
    "demand": 2,
    "image": "images/toys/cotton-candy-stand.webp"
  },
  {
    "id": "petwear-chick-backpack",
    "name": "Chick Backpack",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/chick-backpack.webp"
  },
  {
    "id": "stickers-shiba-inu-sticker",
    "name": "Shiba Inu Sticker",
    "category": "stickers",
    "value": 0.056,
    "demand": 1,
    "image": "images/stickers/shiba-inu-sticker.webp"
  },
  {
    "id": "petwear-aestus-mane",
    "name": "Aestus Mane",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/aestus-mane.webp"
  },
  {
    "id": "stickers-shadow-dragon-animated-sticker",
    "name": "Shadow Dragon Animated Sticker",
    "category": "stickers",
    "value": 0.525,
    "demand": 2,
    "image": "images/stickers/shadow-dragon-animated-sticker.webp"
  },
  {
    "id": "pets-ghost-dog",
    "name": "Ghost Dog",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/ghost-dog.webp"
  },
  {
    "id": "pets-aestus",
    "name": "Aestus",
    "category": "pets",
    "value": 2.275,
    "demand": 2,
    "image": "images/pets/aestus.webp"
  },
  {
    "id": "pets-tan-chowchow",
    "name": "Tan Chow-Chow",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/tan-chow-chow.webp"
  },
  {
    "id": "strollers-flower-stroller",
    "name": "Flower Stroller",
    "category": "strollers",
    "value": 0.2206,
    "demand": 1,
    "image": "images/strollers/flower-stroller.webp"
  },
  {
    "id": "pets-undead-elk",
    "name": "Undead Elk",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/undead-elk.webp"
  },
  {
    "id": "pets-humbug",
    "name": "Humbug",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/humbug.webp"
  },
  {
    "id": "pets-shetland-pony-dark-brown",
    "name": "Shetland Pony Dark Brown",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/shetland-pony-dark-brown.webp"
  },
  {
    "id": "potions-bonus-bucks-potion",
    "name": "Bonus Bucks Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-cactus-friend",
    "name": "Cactus Friend",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/cactus-friend.webp"
  },
  {
    "id": "vehicles-horse-cycle",
    "name": "Horse Cycle",
    "category": "vehicles",
    "value": 1.4,
    "demand": 2,
    "image": "images/vehicles/horse-cycle.webp"
  },
  {
    "id": "pets-basilisk",
    "name": "Basilisk",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/basilisk.webp"
  },
  {
    "id": "stickers-sasquatch-sticker",
    "name": "Sasquatch Sticker",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/sasquatch-sticker.webp"
  },
  {
    "id": "pets-cuddly-candle",
    "name": "Cuddly Candle",
    "category": "pets",
    "value": 0.56,
    "demand": 1,
    "image": "images/pets/cuddly-candle.webp"
  },
  {
    "id": "pets-sheepdog-ducky",
    "name": "Sheepdog Ducky",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/sheepdog-ducky.webp"
  },
  {
    "id": "pets-mistletroll",
    "name": "Mistletroll",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/mistletroll.webp"
  },
  {
    "id": "pets-sweetheart-rat",
    "name": "Sweetheart Rat",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/sweetheart-rat.webp"
  },
  {
    "id": "vehicles-heart-hoverboard",
    "name": "Heart Hoverboard",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/heart-hoverboard.webp"
  },
  {
    "id": "pets-dilophosaurus",
    "name": "Dilophosaurus",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/dilophosaurus.webp"
  },
  {
    "id": "petwear-ssbd-beanie",
    "name": "SSBD Beanie",
    "category": "petwear",
    "value": 15.4,
    "demand": 3,
    "image": "images/petwear/ssbd-beanie.webp"
  },
  {
    "id": "petwear-bunny-ear-tiara",
    "name": "Bunny Ear Tiara",
    "category": "petwear",
    "value": 0.175,
    "demand": 1,
    "image": "images/petwear/bunny-ear-tiara.webp"
  },
  {
    "id": "pets-arctic-fox",
    "name": "Arctic Fox",
    "category": "pets",
    "value": 3.15,
    "demand": 3,
    "image": "images/pets/arctic-fox.webp"
  },
  {
    "id": "stickers-phoenix-sticker",
    "name": "Phoenix Sticker",
    "category": "stickers",
    "value": 0.175,
    "demand": 2,
    "image": "images/stickers/phoenix-sticker.webp"
  },
  {
    "id": "stickers-candyfloss-chick-sticker",
    "name": "Candyfloss Chick Sticker",
    "category": "stickers",
    "value": 0.063,
    "demand": 1,
    "image": "images/stickers/candyfloss-chick-sticker.webp"
  },
  {
    "id": "pets-harp-seal",
    "name": "Harp Seal",
    "category": "pets",
    "value": 0.77,
    "demand": 2,
    "image": "images/pets/harp-seal.webp"
  },
  {
    "id": "vehicles-adopt-me-boy-scooter",
    "name": "Adopt Me Boy Scooter",
    "category": "vehicles",
    "value": 0.7,
    "demand": 1,
    "image": "images/vehicles/adopt-me-boy-scooter.webp"
  },
  {
    "id": "pets-chocolate-chip-bat-dragon",
    "name": "Chocolate Chip Bat Dragon",
    "category": "pets",
    "value": 12.25,
    "demand": 3,
    "image": "images/pets/chocolate-chip-bat-dragon.webp"
  },
  {
    "id": "petwear-festive-light-crown",
    "name": "Festive Light Crown",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/festive-light-crown.webp"
  },
  {
    "id": "strollers-sailboat-stroller",
    "name": "Sailboat Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-dragonfly-fairy-wings",
    "name": "Dragonfly Fairy Wings",
    "category": "petwear",
    "value": 5.25,
    "demand": 2,
    "image": "images/petwear/dragonfly-fairy-wings.webp"
  },
  {
    "id": "vehicles-wing-trunk-car",
    "name": "Wing Trunk Car",
    "category": "vehicles",
    "value": 0.315,
    "demand": 1,
    "image": "images/vehicles/wing-trunk-car.webp"
  },
  {
    "id": "pets-sneak-weasel",
    "name": "Sneak Weasel",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/sneak-weasel.webp"
  },
  {
    "id": "eggs-pink-egg",
    "name": "Pink Egg",
    "category": "eggs",
    "value": 12.8194,
    "demand": 2,
    "image": "images/eggs/pink-egg.webp"
  },
  {
    "id": "toys-ice-saber",
    "name": "Ice Saber",
    "category": "toys",
    "value": 0.315,
    "demand": 1,
    "image": "images/toys/ice-saber.webp"
  },
  {
    "id": "petwear-summer-walrus-sunhat",
    "name": "Summer Walrus Sunhat",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/summer-walrus-sunhat.webp"
  },
  {
    "id": "pets-frostclaw",
    "name": "Frostclaw",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/frostclaw.webp"
  },
  {
    "id": "pets-eel",
    "name": "Eel",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/eel.webp"
  },
  {
    "id": "pets-singularity-beetle",
    "name": "Singularity Beetle",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/singularity-beetle.webp"
  },
  {
    "id": "vehicles-cloud-car",
    "name": "Cloud Car",
    "category": "vehicles",
    "value": 11.9,
    "demand": 2,
    "image": "images/vehicles/cloud-car.webp"
  },
  {
    "id": "potions-big-head-potion",
    "name": "Big Head Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-cotton-candy-hat",
    "name": "Cotton Candy Hat",
    "category": "petwear",
    "value": 0.42,
    "demand": 2,
    "image": "images/petwear/cotton-candy-hat.webp"
  },
  {
    "id": "pets-dolphin",
    "name": "Dolphin",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/dolphin.webp"
  },
  {
    "id": "pets-orca",
    "name": "Orca",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/orca.webp"
  },
  {
    "id": "petwear-buttoned-ushanka",
    "name": "Buttoned Ushanka",
    "category": "petwear",
    "value": 0.175,
    "demand": 1,
    "image": "images/petwear/buttoned-ushanka.webp"
  },
  {
    "id": "pets-tortoiseshell-guinea-pig",
    "name": "Tortoiseshell Guinea Pig",
    "category": "pets",
    "value": 14.35,
    "demand": 2,
    "image": "images/pets/tortoiseshell-guinea-pig.webp"
  },
  {
    "id": "toys-celebration-firework-launcher",
    "name": "Celebration Firework Launcher",
    "category": "toys",
    "value": 0.455,
    "demand": 1,
    "image": "images/toys/celebration-firework-launcher.webp"
  },
  {
    "id": "pets-oakee",
    "name": "Oakee",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/oakee.webp"
  },
  {
    "id": "toys-magic-house-door",
    "name": "Magic House Door",
    "category": "toys",
    "value": 0.42,
    "demand": 2,
    "image": "images/toys/magic-house-door.webp"
  },
  {
    "id": "pets-snow-cat",
    "name": "Snow Cat",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/snow-cat.webp"
  },
  {
    "id": "vehicles-bunny-carriage",
    "name": "Bunny Carriage",
    "category": "vehicles",
    "value": 3.85,
    "demand": 2,
    "image": "images/vehicles/bunny-carriage.webp"
  },
  {
    "id": "pets-diamond-king-penguin",
    "name": "Diamond King Penguin",
    "category": "pets",
    "value": 0.805,
    "demand": 2,
    "image": "images/pets/diamond-king-penguin.webp"
  },
  {
    "id": "pets-blackfooted-ferret",
    "name": "Black-Footed Ferret",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/black-footed-ferret.webp"
  },
  {
    "id": "strollers-flower-cart-stroller",
    "name": "Flower Cart Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-giraffe-backpack",
    "name": "Giraffe Backpack",
    "category": "petwear",
    "value": 26.25,
    "demand": 3,
    "image": "images/petwear/giraffe-backpack.webp"
  },
  {
    "id": "petwear-blue-cat-ear-headphones",
    "name": "Blue Cat Ear Headphones",
    "category": "petwear",
    "value": 0.385,
    "demand": 2,
    "image": "images/petwear/blue-cat-ear-headphones.webp"
  },
  {
    "id": "vehicles-flower-wagon",
    "name": "Flower Wagon",
    "category": "vehicles",
    "value": 0.315,
    "demand": 1,
    "image": "images/vehicles/flower-wagon.webp"
  },
  {
    "id": "pets-black-macaque",
    "name": "Black Macaque",
    "category": "pets",
    "value": 0.4725,
    "demand": 2,
    "image": "images/pets/black-macaque.webp"
  },
  {
    "id": "pets-dango-penguins",
    "name": "Dango Penguins",
    "category": "pets",
    "value": 1.085,
    "demand": 2,
    "image": "images/pets/dango-penguins.webp"
  },
  {
    "id": "pets-birthday-butterfly-2023",
    "name": "Birthday Butterfly 2023",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/birthday-butterfly-2023.webp"
  },
  {
    "id": "toys-hugging-egg",
    "name": "Hugging Egg",
    "category": "toys",
    "value": 1.225,
    "demand": 1,
    "image": "images/toys/hugging-egg.webp"
  },
  {
    "id": "pets-lionfish",
    "name": "Lionfish",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/lionfish.webp"
  },
  {
    "id": "stickers-strawberry-shortcake-bat-dragon-sticker",
    "name": "Strawberry Shortcake Bat Dragon Sticker",
    "category": "stickers",
    "value": 0.35,
    "demand": 2,
    "image": "images/stickers/strawberry-shortcake-bat-dragon-sticker.webp"
  },
  {
    "id": "pets-piranha",
    "name": "Piranha",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/piranha.webp"
  },
  {
    "id": "gifts-pet-handler-pro-certificate",
    "name": "Pet Handler Pro Certificate",
    "category": "gifts",
    "value": 0.84,
    "demand": 3,
    "image": "images/gifts/pet-handler-pro-certificate.webp"
  },
  {
    "id": "pets-christmas-spirit",
    "name": "Christmas Spirit",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/christmas-spirit.webp"
  },
  {
    "id": "strollers-half-egg-stroller",
    "name": "Half Egg Stroller",
    "category": "strollers",
    "value": 0.5781,
    "demand": 2,
    "image": "images/strollers/half-egg-stroller.webp"
  },
  {
    "id": "stickers-ginger-cat-sticker",
    "name": "Ginger Cat Sticker",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/ginger-cat-sticker.webp"
  },
  {
    "id": "pets-cozy-mistletroll",
    "name": "Cozy Mistletroll",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/cozy-mistletroll.webp"
  },
  {
    "id": "vehicles-green-snowboard",
    "name": "Green Neon Snowboard",
    "category": "vehicles",
    "value": 2.275,
    "demand": 2,
    "image": "images/vehicles/green-neon-snowboard.webp"
  },
  {
    "id": "food-golden-clam",
    "name": "Golden Clam",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-clam.webp"
  },
  {
    "id": "pets-emberlight",
    "name": "Emberlight",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/emberlight.webp"
  },
  {
    "id": "petwear-candy-cane",
    "name": "Candy Cane (Pet Wear)",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/candy-cane-pet-wear.webp"
  },
  {
    "id": "stickers-cow-sticker",
    "name": "Cow Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/cow-sticker.webp"
  },
  {
    "id": "pets-black-chowchow",
    "name": "Black Chow-Chow",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/black-chow-chow.webp"
  },
  {
    "id": "toys-santa-throne",
    "name": "Santa Throne",
    "category": "toys",
    "value": 0.35,
    "demand": 1,
    "image": "images/toys/santa-throne.webp"
  },
  {
    "id": "vehicles-ice-snowboard",
    "name": "Ice Snowboard",
    "category": "vehicles",
    "value": 3.5,
    "demand": 1,
    "image": "images/vehicles/ice-snowboard.webp"
  },
  {
    "id": "toys-witches-wand",
    "name": "Witches Wand",
    "category": "toys",
    "value": 0.7,
    "demand": 1,
    "image": "images/toys/witches-wand.webp"
  },
  {
    "id": "stickers-vol-2-pets-plus-sticker-pack",
    "name": "Vol. 2 Pets Plus Sticker Pack",
    "category": "stickers",
    "value": 0.455,
    "demand": 2,
    "image": "images/stickers/vol-2-pets-plus-sticker-pack.webp"
  },
  {
    "id": "petwear-lunar-new-year-shoes",
    "name": "Lunar New Year Shoes",
    "category": "petwear",
    "value": 0.35,
    "demand": 2,
    "image": "images/petwear/lunar-new-year-shoes.webp"
  },
  {
    "id": "toys-phoenix-plush",
    "name": "Phoenix Plush",
    "category": "toys",
    "value": 0.35,
    "demand": 1,
    "image": "images/toys/phoenix-plush.webp"
  },
  {
    "id": "pets-griffin",
    "name": "Griffin",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/griffin.webp"
  },
  {
    "id": "eggs-royal-egg",
    "name": "Royal Egg",
    "category": "eggs",
    "value": 0.0317,
    "demand": 1,
    "image": "images/eggs/royal-egg.webp"
  },
  {
    "id": "pets-samoyed",
    "name": "Samoyed",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/samoyed.webp"
  },
  {
    "id": "petwear-sailor-cap",
    "name": "Sailor Cap",
    "category": "petwear",
    "value": 0.91,
    "demand": 2,
    "image": "images/petwear/sailor-cap.webp"
  },
  {
    "id": "pets-ninja-monkey",
    "name": "Ninja Monkey",
    "category": "pets",
    "value": 0.875,
    "demand": 2,
    "image": "images/pets/ninja-monkey.webp"
  },
  {
    "id": "pets-golden-rat",
    "name": "Golden Rat",
    "category": "pets",
    "value": 0.735,
    "demand": 2,
    "image": "images/pets/golden-rat.webp"
  },
  {
    "id": "pets-burning-bunny",
    "name": "Burning Bunny",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/burning-bunny.webp"
  },
  {
    "id": "vehicles-dragon-train",
    "name": "Dragon Train",
    "category": "vehicles",
    "value": 1.75,
    "demand": 1,
    "image": "images/vehicles/dragon-train.webp"
  },
  {
    "id": "pets-ladybug",
    "name": "Ladybug",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/ladybug.webp"
  },
  {
    "id": "strollers-heart-stroller",
    "name": "Heart Stroller",
    "category": "strollers",
    "value": 3.6281,
    "demand": 2,
    "image": "images/strollers/heart-stroller.webp"
  },
  {
    "id": "pets-stygian-owl",
    "name": "Stygian Owl",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/stygian-owl.webp"
  },
  {
    "id": "vehicles-dogmobile",
    "name": "Dogmobile",
    "category": "vehicles",
    "value": 0.77,
    "demand": 2,
    "image": "images/vehicles/dogmobile.webp"
  },
  {
    "id": "petwear-llamalush-purse-pet",
    "name": "Llamalush Purse Pet",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/llamalush-purse-pet.webp"
  },
  {
    "id": "strollers-pumpkin-stroller",
    "name": "Pumpkin Stroller",
    "category": "strollers",
    "value": 0.1941,
    "demand": 1,
    "image": "images/strollers/pumpkin-stroller.webp"
  },
  {
    "id": "pets-slime",
    "name": "Slime",
    "category": "pets",
    "value": 1.295,
    "demand": 2,
    "image": "images/pets/slime.webp"
  },
  {
    "id": "petwear-festive-beard",
    "name": "Festive Beard",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/festive-beard.webp"
  },
  {
    "id": "stickers-wailing-mr-whiskerpips-sticker",
    "name": "Wailing Mr. Whiskerpips Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/wailing-mr-whiskerpips-sticker.webp"
  },
  {
    "id": "vehicles-princess-carriage",
    "name": "Princess Carriage",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/princess-carriage.webp"
  },
  {
    "id": "petwear-lightbulb-hat",
    "name": "Lightbulb Hat",
    "category": "petwear",
    "value": 0.315,
    "demand": 1,
    "image": "images/petwear/lightbulb-hat.webp"
  },
  {
    "id": "pets-owlbear",
    "name": "Owlbear",
    "category": "pets",
    "value": 2.1,
    "demand": 2,
    "image": "images/pets/owlbear.webp"
  },
  {
    "id": "pets-quokka",
    "name": "Quokka",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/quokka.webp"
  },
  {
    "id": "petwear-founders-crown",
    "name": "Founder's Crown",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/founder-s-crown.webp"
  },
  {
    "id": "pets-dingo",
    "name": "Dingo",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/dingo.webp"
  },
  {
    "id": "pets-subzero-scorpion",
    "name": "Subzero Scorpion",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/subzero-scorpion.webp"
  },
  {
    "id": "pets-horse",
    "name": "Horse",
    "category": "pets",
    "value": 0.455,
    "demand": 2,
    "image": "images/pets/horse.webp"
  },
  {
    "id": "pets-gargoyle",
    "name": "Gargoyle",
    "category": "pets",
    "value": 0.63,
    "demand": 1,
    "image": "images/pets/gargoyle.webp"
  },
  {
    "id": "pets-oryx",
    "name": "Oryx",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/oryx.webp"
  },
  {
    "id": "pets-dracula-fish",
    "name": "Dracula Fish",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/dracula-fish.webp"
  },
  {
    "id": "pets-space-whale",
    "name": "Space Whale",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/space-whale.webp"
  },
  {
    "id": "pets-nessie",
    "name": "Nessie",
    "category": "pets",
    "value": 2.275,
    "demand": 2,
    "image": "images/pets/nessie.webp"
  },
  {
    "id": "vehicles-ice-plane",
    "name": "Ice Plane",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/ice-plane.webp"
  },
  {
    "id": "petwear-icey-aura",
    "name": "Icey Aura",
    "category": "petwear",
    "value": 0.7,
    "demand": 2,
    "image": "images/petwear/icey-aura.webp"
  },
  {
    "id": "pets-glyptodon-ducky",
    "name": "Glyptodon Ducky",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/glyptodon-ducky.webp"
  },
  {
    "id": "vehicles-dolphin-cruiser",
    "name": "Dolphin Cruiser",
    "category": "vehicles",
    "value": 0.105,
    "demand": 1,
    "image": "images/vehicles/dolphin-cruiser.webp"
  },
  {
    "id": "strollers-french-fries-stroller",
    "name": "French Fries Stroller",
    "category": "strollers",
    "value": 0.2384,
    "demand": 1,
    "image": "images/strollers/french-fries-stroller.webp"
  },
  {
    "id": "petwear-yellow-instant-camera",
    "name": "Yellow Instant Camera",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/yellow-instant-camera.webp"
  },
  {
    "id": "pets-sunflower-friend",
    "name": "Sunflower Friend",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/sunflower-friend.webp"
  },
  {
    "id": "pets-winged-tiger",
    "name": "Winged Tiger",
    "category": "pets",
    "value": 5.075,
    "demand": 2,
    "image": "images/pets/winged-tiger.webp"
  },
  {
    "id": "strollers-cradle-stroller",
    "name": "Cradle Stroller",
    "category": "strollers",
    "value": 0.8566,
    "demand": 2,
    "image": "images/strollers/cradle-stroller.webp"
  },
  {
    "id": "pets-strawberry-shortcake-ducky",
    "name": "Strawberry Shortcake Ducky",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/strawberry-shortcake-ducky.webp"
  },
  {
    "id": "toys-bunny-plush",
    "name": "Bunny Plush",
    "category": "toys",
    "value": 0.28,
    "demand": 1,
    "image": "images/toys/bunny-plush.webp"
  },
  {
    "id": "pets-praying-mantis",
    "name": "Praying Mantis",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/praying-mantis.webp"
  },
  {
    "id": "pets-diamond-dragon",
    "name": "Diamond Dragon",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/diamond-dragon.webp"
  },
  {
    "id": "stickers-fire-dimension-sticker-pack",
    "name": "Fire Dimension Sticker Pack",
    "category": "stickers",
    "value": 0.0245,
    "demand": 1,
    "image": "images/stickers/fire-dimension-sticker-pack.webp"
  },
  {
    "id": "pets-naughty-mistletroll",
    "name": "Naughty Mistletroll",
    "category": "pets",
    "value": 0.7,
    "demand": 2,
    "image": "images/pets/naughty-mistletroll.webp"
  },
  {
    "id": "vehicles-snow-plow",
    "name": "Snow Plow",
    "category": "vehicles",
    "value": 0.14,
    "demand": 1,
    "image": "images/vehicles/snow-plow.webp"
  },
  {
    "id": "petwear-giraffe-hat",
    "name": "Giraffe Hat",
    "category": "petwear",
    "value": 16.8,
    "demand": 3,
    "image": "images/petwear/giraffe-hat.webp"
  },
  {
    "id": "eggs-easter-2020-egg",
    "name": "Easter 2020 Egg",
    "category": "eggs",
    "value": 0.7597,
    "demand": 2,
    "image": "images/eggs/easter-2020-egg.webp"
  },
  {
    "id": "petwear-brain-jar",
    "name": "Brain Jar",
    "category": "petwear",
    "value": 0.42,
    "demand": 1,
    "image": "images/petwear/brain-jar.webp"
  },
  {
    "id": "pets-trapdoor-snail",
    "name": "Trapdoor Snail",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/trapdoor-snail.webp"
  },
  {
    "id": "strollers-stocking-stroller",
    "name": "Stocking Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "food-chocolate",
    "name": "Chocolate",
    "category": "food",
    "value": 1.75,
    "demand": 2,
    "image": "images/food/chocolate.webp"
  },
  {
    "id": "petwear-bat-backpack",
    "name": "Bat Backpack",
    "category": "petwear",
    "value": 0.42,
    "demand": 1,
    "image": "images/petwear/bat-backpack.webp"
  },
  {
    "id": "strollers-froggy-stroller",
    "name": "Froggy Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-glormy-backpack",
    "name": "Glormy Backpack",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/glormy-backpack.webp"
  },
  {
    "id": "pets-canadian-goose",
    "name": "Canadian Goose",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/canadian-goose.webp"
  },
  {
    "id": "pets-tawny-frogmouth",
    "name": "Tawny Frogmouth",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/tawny-frogmouth.webp"
  },
  {
    "id": "vehicles-ice-cream-truck",
    "name": "Ice Cream Truck",
    "category": "vehicles",
    "value": 0.455,
    "demand": 2,
    "image": "images/vehicles/ice-cream-truck.webp"
  },
  {
    "id": "eggs-pet-egg",
    "name": "Pet Egg",
    "category": "eggs",
    "value": 0.0271,
    "demand": 1,
    "image": "images/eggs/pet-egg.webp"
  },
  {
    "id": "gifts-wolf-box",
    "name": "Wolf Box",
    "category": "gifts",
    "value": 0.5084,
    "demand": 2,
    "image": "images/gifts/wolf-box.webp"
  },
  {
    "id": "pets-black-marlin",
    "name": "Black Marlin",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/black-marlin.webp"
  },
  {
    "id": "strollers-double-stroller",
    "name": "Double Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "toys-panda-pal",
    "name": "Panda Pal",
    "category": "toys",
    "value": 0.875,
    "demand": 2,
    "image": "images/toys/panda-pal.webp"
  },
  {
    "id": "pets-kraken",
    "name": "Kraken",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/kraken.webp"
  },
  {
    "id": "pets-magma-snail",
    "name": "Magma Snail",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/magma-snail.webp"
  },
  {
    "id": "pets-turtle",
    "name": "Turtle",
    "category": "pets",
    "value": 9.625,
    "demand": 3,
    "image": "images/pets/turtle.webp"
  },
  {
    "id": "toys-lemonade-stand",
    "name": "Lemonade Stand",
    "category": "toys",
    "value": 0.14,
    "demand": 2,
    "image": "images/toys/lemonade-stand.webp"
  },
  {
    "id": "petwear-heart-bow",
    "name": "Heart Bow",
    "category": "petwear",
    "value": 0.21,
    "demand": 2,
    "image": "images/petwear/heart-bow.webp"
  },
  {
    "id": "stickers-pig-sticker",
    "name": "Pig Sticker",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/pig-sticker.webp"
  },
  {
    "id": "petwear-halo",
    "name": "Halo",
    "category": "petwear",
    "value": 14.7,
    "demand": 3,
    "image": "images/petwear/halo.webp"
  },
  {
    "id": "pets-hero-gibbon",
    "name": "Hero Gibbon",
    "category": "pets",
    "value": 2.45,
    "demand": 3,
    "image": "images/pets/hero-gibbon.webp"
  },
  {
    "id": "potions-super-ageup-potion",
    "name": "Super Age-Up Potion",
    "category": "potions",
    "value": 2.09,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-jekyll-hydra",
    "name": "Jekyll Hydra",
    "category": "pets",
    "value": 22.4,
    "demand": 3,
    "image": "images/pets/jekyll-hydra.webp"
  },
  {
    "id": "stickers-bat-dragon-sticker",
    "name": "Bat Dragon Sticker",
    "category": "stickers",
    "value": 0.28,
    "demand": 2,
    "image": "images/stickers/bat-dragon-sticker.webp"
  },
  {
    "id": "stickers-pet-rock-sticker",
    "name": "Pet Rock Sticker",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/pet-rock-sticker.webp"
  },
  {
    "id": "petwear-angel-wings",
    "name": "Angel Wings",
    "category": "petwear",
    "value": 12.95,
    "demand": 3,
    "image": "images/petwear/angel-wings.webp"
  },
  {
    "id": "pets-black-widow",
    "name": "Black Widow",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/black-widow.webp"
  },
  {
    "id": "pets-musk-ox",
    "name": "Musk Ox",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/musk-ox.webp"
  },
  {
    "id": "pets-koi-carp",
    "name": "Koi Carp",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/koi-carp.webp"
  },
  {
    "id": "gifts-pony-box",
    "name": "Pony Box",
    "category": "gifts",
    "value": 0.2969,
    "demand": 2,
    "image": "images/gifts/pony-box.webp"
  },
  {
    "id": "pets-slug",
    "name": "Slug",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/slug.webp"
  },
  {
    "id": "eggs-admin-abuse-egg",
    "name": "Admin Abuse Egg",
    "category": "eggs",
    "value": 0.0348,
    "demand": 1,
    "image": "images/eggs/admin-abuse-egg.webp"
  },
  {
    "id": "pets-pilot-gull",
    "name": "Pilot Gull",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/pilot-gull.webp"
  },
  {
    "id": "vehicles-rose-petal-carriage",
    "name": "Rose Petal Carriage",
    "category": "vehicles",
    "value": 0.525,
    "demand": 2,
    "image": "images/vehicles/rose-petal-carriage.webp"
  },
  {
    "id": "pets-pine-marten",
    "name": "Pine Marten",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/pine-marten.webp"
  },
  {
    "id": "pets-happy-duckling",
    "name": "Happy Duckling",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/happy-duckling.webp"
  },
  {
    "id": "pets-thorny-devil",
    "name": "Thorny Devil",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/thorny-devil.webp"
  },
  {
    "id": "pets-flaming-zebra",
    "name": "Flaming Zebra",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/flaming-zebra.webp"
  },
  {
    "id": "pets-storm-condor",
    "name": "Storm Condor",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/storm-condor.webp"
  },
  {
    "id": "petwear-halloween-white-skull-hat",
    "name": "Halloween White Skull Hat",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/halloween-white-skull-hat.webp"
  },
  {
    "id": "pets-2021-uplift-butterfly",
    "name": "2021 Uplift Butterfly",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/2021-uplift-butterfly.webp"
  },
  {
    "id": "pets-chicken",
    "name": "Chicken",
    "category": "pets",
    "value": 0.735,
    "demand": 2,
    "image": "images/pets/chicken.webp"
  },
  {
    "id": "petwear-chocolate-chip-bat-dragon-backpack",
    "name": "Chocolate Chip Bat Dragon Backpack",
    "category": "petwear",
    "value": 0.7,
    "demand": 2,
    "image": "images/petwear/chocolate-chip-bat-dragon-backpack.webp"
  },
  {
    "id": "vehicles-pink-skateboard",
    "name": "Pink Skateboard",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/pink-skateboard.webp"
  },
  {
    "id": "pets-cow-calf",
    "name": "Cow Calf",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/cow-calf.webp"
  },
  {
    "id": "vehicles-glass-snowboard",
    "name": "Glass Snowboard",
    "category": "vehicles",
    "value": 1.75,
    "demand": 1,
    "image": "images/vehicles/glass-snowboard.webp"
  },
  {
    "id": "eggs-jungle-egg",
    "name": "Jungle Egg",
    "category": "eggs",
    "value": 28.9131,
    "demand": 2,
    "image": "images/eggs/jungle-egg.webp"
  },
  {
    "id": "petwear-money-hat",
    "name": "Money Hat",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/money-hat.webp"
  },
  {
    "id": "pets-snow-puma",
    "name": "Snow Puma",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/snow-puma.webp"
  },
  {
    "id": "pets-chanekeh",
    "name": "Chanekeh",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/chanekeh.webp"
  },
  {
    "id": "petwear-eco-brown-branch-headphones",
    "name": "Eco Brown Branch Headphones",
    "category": "petwear",
    "value": 0.455,
    "demand": 1,
    "image": "images/petwear/eco-brown-branch-headphones.webp"
  },
  {
    "id": "petwear-satellite-spinner",
    "name": "Satellite Spinner",
    "category": "petwear",
    "value": 0.315,
    "demand": 1,
    "image": "images/petwear/satellite-spinner.webp"
  },
  {
    "id": "pets-indian-leopard",
    "name": "Indian Leopard",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/indian-leopard.webp"
  },
  {
    "id": "gifts-ox-box",
    "name": "Ox Box",
    "category": "gifts",
    "value": 0.1537,
    "demand": 1,
    "image": "images/gifts/ox-box.webp"
  },
  {
    "id": "strollers-donut-stroller",
    "name": "Donut Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-picnic-basket",
    "name": "Picnic Basket",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/picnic-basket.webp"
  },
  {
    "id": "pets-fleur-de-ice",
    "name": "Fleur De Ice",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/fleur-de-ice.webp"
  },
  {
    "id": "pets-business-monkey",
    "name": "Business Monkey",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/business-monkey.webp"
  },
  {
    "id": "pets-seahorse",
    "name": "Seahorse",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/seahorse.webp"
  },
  {
    "id": "pets-tealwood-monster",
    "name": "Tealwood Monster",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/tealwood-monster.webp"
  },
  {
    "id": "petwear-pirate-hat",
    "name": "Pirate Hat",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/pirate-hat.webp"
  },
  {
    "id": "pets-crow",
    "name": "Crow",
    "category": "pets",
    "value": 65.1,
    "demand": 3,
    "image": "images/pets/crow.webp"
  },
  {
    "id": "pets-arctic-hare",
    "name": "Arctic Hare",
    "category": "pets",
    "value": 0.3325,
    "demand": 1,
    "image": "images/pets/arctic-hare.webp"
  },
  {
    "id": "pets-floral-eggy",
    "name": "Floral Eggy",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/floral-eggy.webp"
  },
  {
    "id": "pets-dotted-eggy",
    "name": "Dotted Eggy",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/dotted-eggy.webp"
  },
  {
    "id": "pets-strawberry-shortcake-bat-dragon",
    "name": "Strawberry Shortcake Bat Dragon",
    "category": "pets",
    "value": 12.6,
    "demand": 3,
    "image": "images/pets/strawberry-shortcake-bat-dragon.webp"
  },
  {
    "id": "pets-lamb",
    "name": "Lamb",
    "category": "pets",
    "value": 0.91,
    "demand": 2,
    "image": "images/pets/lamb.webp"
  },
  {
    "id": "pets-monkey",
    "name": "Monkey",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/monkey.webp"
  },
  {
    "id": "pets-fire-mare",
    "name": "Fire Mare",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/fire-mare.webp"
  },
  {
    "id": "pets-wooly-rhino",
    "name": "Wooly Rhino",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/wooly-rhino.webp"
  },
  {
    "id": "vehicles-halloween-black-ponycycle",
    "name": "Halloween Black Ponycycle",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/halloween-black-ponycycle.webp"
  },
  {
    "id": "pets-halloween-blue-scorpion",
    "name": "Halloween Blue Scorpion",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/halloween-blue-scorpion.webp"
  },
  {
    "id": "pets-sugar-axolotl",
    "name": "Sugar Axolotl",
    "category": "pets",
    "value": 3.5,
    "demand": 2,
    "image": "images/pets/sugar-axolotl.webp"
  },
  {
    "id": "pets-ocelot",
    "name": "Ocelot",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/ocelot.webp"
  },
  {
    "id": "vehicles-unicorn-zombie-ponycycle",
    "name": "Unicorn Zombie Ponycycle",
    "category": "vehicles",
    "value": 0.245,
    "demand": 1,
    "image": "images/vehicles/unicorn-zombie-ponycycle.webp"
  },
  {
    "id": "pets-rainbow-dragon",
    "name": "Rainbow Dragon",
    "category": "pets",
    "value": 0.875,
    "demand": 2,
    "image": "images/pets/rainbow-dragon.webp"
  },
  {
    "id": "petwear-demon-wings",
    "name": "Demon Wings",
    "category": "petwear",
    "value": 0.56,
    "demand": 1,
    "image": "images/petwear/demon-wings.webp"
  },
  {
    "id": "toys-chick-plush",
    "name": "Chick Plush",
    "category": "toys",
    "value": 0.28,
    "demand": 1,
    "image": "images/toys/chick-plush.webp"
  },
  {
    "id": "pets-tarsier",
    "name": "Tarsier",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/tarsier.webp"
  },
  {
    "id": "pets-indian-flying-fox",
    "name": "Indian Flying Fox",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/indian-flying-fox.webp"
  },
  {
    "id": "pets-muskrat",
    "name": "Muskrat",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/muskrat.webp"
  },
  {
    "id": "pets-grinmoire",
    "name": "Grinmoire",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/grinmoire.webp"
  },
  {
    "id": "pets-liger",
    "name": "Liger",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/liger.webp"
  },
  {
    "id": "pets-halloween-evil-dachshund",
    "name": "Halloween Evil Dachshund",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/halloween-evil-dachshund.webp"
  },
  {
    "id": "pets-diamond-mahi-mahi",
    "name": "Diamond Mahi Mahi",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/diamond-mahi-mahi.webp"
  },
  {
    "id": "petwear-unfortunate-eyelashes",
    "name": "Unfortunate Eyelashes",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/unfortunate-eyelashes.webp"
  },
  {
    "id": "pets-zombie-wolf",
    "name": "Zombie Wolf",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/zombie-wolf.webp"
  },
  {
    "id": "eggs-aussie-egg",
    "name": "Aussie Egg",
    "category": "eggs",
    "value": 1.9825,
    "demand": 3,
    "image": "images/eggs/aussie-egg.webp"
  },
  {
    "id": "pets-sado-mole",
    "name": "Sado Mole",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/sado-mole.webp"
  },
  {
    "id": "vehicles-festive-wagon",
    "name": "Festive Wagon",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/festive-wagon.webp"
  },
  {
    "id": "food-burnt-bites-bait",
    "name": "Burnt Bites Bait",
    "category": "food",
    "value": 0.245,
    "demand": 1,
    "image": "images/food/burnt-bites-bait.webp"
  },
  {
    "id": "petwear-white-designer-backpack",
    "name": "White Designer Backpack",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/white-designer-backpack.webp"
  },
  {
    "id": "vehicles-glass-scooter",
    "name": "Glass Scooter",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/glass-scooter.webp"
  },
  {
    "id": "pets-golden-walrus",
    "name": "Golden Walrus",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/golden-walrus.webp"
  },
  {
    "id": "pets-hippogriff",
    "name": "Hippogriff",
    "category": "pets",
    "value": 0.56,
    "demand": 1,
    "image": "images/pets/hippogriff.webp"
  },
  {
    "id": "pets-sea-angel",
    "name": "Sea Angel",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/sea-angel.webp"
  },
  {
    "id": "vehicles-white-snowboard",
    "name": "White Snowboard",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/white-snowboard.webp"
  },
  {
    "id": "strollers-rgb-stroller",
    "name": "RGB Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-golden-ladybug",
    "name": "Golden Ladybug",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/golden-ladybug.webp"
  },
  {
    "id": "pets-persian-cat",
    "name": "Persian Cat",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/persian-cat.webp"
  },
  {
    "id": "pets-frostbite-bear",
    "name": "Frostbite Bear",
    "category": "pets",
    "value": 8.05,
    "demand": 3,
    "image": "images/pets/frostbite-bear.webp"
  },
  {
    "id": "potions-home-potion",
    "name": "Home Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-bat-wings",
    "name": "Bat Wings",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/bat-wings.webp"
  },
  {
    "id": "vehicles-festive-deliveries-sleigh",
    "name": "Festive Deliveries Sleigh",
    "category": "vehicles",
    "value": 0.35,
    "demand": 2,
    "image": "images/vehicles/festive-deliveries-sleigh.webp"
  },
  {
    "id": "petwear-chicken-hat",
    "name": "Chicken Hat",
    "category": "petwear",
    "value": 0.455,
    "demand": 1,
    "image": "images/petwear/chicken-hat.webp"
  },
  {
    "id": "pets-chocolate-dutch-guinea-pig",
    "name": "Chocolate Dutch Guinea Pig",
    "category": "pets",
    "value": 0.945,
    "demand": 2,
    "image": "images/pets/chocolate-dutch-guinea-pig.webp"
  },
  {
    "id": "pets-astronaut-gorilla",
    "name": "Astronaut Gorilla",
    "category": "pets",
    "value": 0.735,
    "demand": 2,
    "image": "images/pets/astronaut-gorilla.webp"
  },
  {
    "id": "pets-mongoose",
    "name": "Mongoose",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/mongoose.webp"
  },
  {
    "id": "food-fire-horse-apple",
    "name": "Fire Horse Apple",
    "category": "food",
    "value": 0.014,
    "demand": 1,
    "image": "images/food/fire-horse-apple.webp"
  },
  {
    "id": "vehicles-unicorn-cycle",
    "name": "Unicorn Cycle",
    "category": "vehicles",
    "value": 1.4,
    "demand": 2,
    "image": "images/vehicles/unicorn-cycle.webp"
  },
  {
    "id": "pets-ibis",
    "name": "Ibis",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/ibis.webp"
  },
  {
    "id": "pets-chocolate-labrador",
    "name": "Chocolate Labrador",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/chocolate-labrador.webp"
  },
  {
    "id": "pets-frogspawn",
    "name": "Frogspawn",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/frogspawn.webp"
  },
  {
    "id": "pets-volcanic-rhino",
    "name": "Volcanic Rhino",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/volcanic-rhino.webp"
  },
  {
    "id": "pets-many-mackerel",
    "name": "Many Mackerel",
    "category": "pets",
    "value": 2.975,
    "demand": 2,
    "image": "images/pets/many-mackerel.webp"
  },
  {
    "id": "pets-frost-unicorn",
    "name": "Frost Unicorn",
    "category": "pets",
    "value": 5.075,
    "demand": 2,
    "image": "images/pets/frost-unicorn.webp"
  },
  {
    "id": "pets-white-amazon",
    "name": "White Amazon",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/white-amazon.webp"
  },
  {
    "id": "pets-kaijunior",
    "name": "Kaijunior",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/kaijunior.webp"
  },
  {
    "id": "stickers-hamster-selfie-sticker",
    "name": "Hamster Selfie Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/hamster-selfie-sticker.webp"
  },
  {
    "id": "pets-ash-zebra",
    "name": "Ash Zebra",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/ash-zebra.webp"
  },
  {
    "id": "pets-toxic-kaijunior",
    "name": "Toxic Kaijunior",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/toxic-kaijunior.webp"
  },
  {
    "id": "pets-dragonfly",
    "name": "Dragonfly",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/dragonfly.webp"
  },
  {
    "id": "pets-pupcake",
    "name": "Pupcake",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/pupcake.webp"
  },
  {
    "id": "pets-jumping-spider",
    "name": "Jumping Spider",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/jumping-spider.webp"
  },
  {
    "id": "pets-lunar-gold-tiger",
    "name": "Lunar Gold Tiger",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/lunar-gold-tiger.webp"
  },
  {
    "id": "stickers-space-whale-sticker",
    "name": "Space Whale Sticker",
    "category": "stickers",
    "value": 0.175,
    "demand": 2,
    "image": "images/stickers/space-whale-sticker.webp"
  },
  {
    "id": "petwear-knitted-pumpkin-hat",
    "name": "Knitted Pumpkin Hat",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/knitted-pumpkin-hat.webp"
  },
  {
    "id": "pets-hedgehog",
    "name": "Hedgehog",
    "category": "pets",
    "value": 25.55,
    "demand": 3,
    "image": "images/pets/hedgehog.webp"
  },
  {
    "id": "pets-evil-unicorn",
    "name": "Evil Unicorn",
    "category": "pets",
    "value": 41.3,
    "demand": 3,
    "image": "images/pets/evil-unicorn.webp"
  },
  {
    "id": "pets-seafoam-butterfly",
    "name": "Seafoam Butterfly",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/seafoam-butterfly.webp"
  },
  {
    "id": "pets-ghost-chick",
    "name": "Ghost Chick",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/ghost-chick.webp"
  },
  {
    "id": "toys-fall-corn-grappling-hook",
    "name": "Fall Corn Grappling Hook",
    "category": "toys",
    "value": 0.14,
    "demand": 1,
    "image": "images/toys/fall-corn-grappling-hook.webp"
  },
  {
    "id": "toys-axe-rattle",
    "name": "Axe Rattle",
    "category": "toys",
    "value": 0.35,
    "demand": 1,
    "image": "images/toys/axe-rattle.webp"
  },
  {
    "id": "food-subzero-popsicle-bait",
    "name": "Subzero Popsicle Bait",
    "category": "food",
    "value": 0.07,
    "demand": 1,
    "image": "images/food/subzero-popsicle-bait.webp"
  },
  {
    "id": "pets-goose",
    "name": "Goose",
    "category": "pets",
    "value": 14.175,
    "demand": 3,
    "image": "images/pets/goose.webp"
  },
  {
    "id": "vehicles-emperors-chariot",
    "name": "Emperor's Chariot",
    "category": "vehicles",
    "value": 0.315,
    "demand": 1,
    "image": "images/vehicles/emperor-s-chariot.webp"
  },
  {
    "id": "pets-mecha-meow",
    "name": "Mecha Meow",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/mecha-meow.webp"
  },
  {
    "id": "pets-manekineko",
    "name": "Maneki-Neko",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/maneki-neko.webp"
  },
  {
    "id": "vehicles-fissy-skateboard",
    "name": "Fissy Skateboard",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/fissy-skateboard.webp"
  },
  {
    "id": "pets-golden-albatross",
    "name": "Golden Albatross",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/golden-albatross.webp"
  },
  {
    "id": "pets-capuchin-monkey",
    "name": "Capuchin Monkey",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/capuchin-monkey.webp"
  },
  {
    "id": "food-candy-cane",
    "name": "Candy Cane",
    "category": "food",
    "value": 8.4,
    "demand": 2,
    "image": "images/food/candy-cane.webp"
  },
  {
    "id": "strollers-palanquin-stroller",
    "name": "Palanquin Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-lavender-dragon",
    "name": "Lavender Dragon",
    "category": "pets",
    "value": 0.98,
    "demand": 2,
    "image": "images/pets/lavender-dragon.webp"
  },
  {
    "id": "pets-sabertooth",
    "name": "Sabertooth",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/sabertooth.webp"
  },
  {
    "id": "eggs-starter-egg",
    "name": "Starter Egg",
    "category": "eggs",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "toys-reindeer-plush",
    "name": "Reindeer Plush",
    "category": "toys",
    "value": 0.21,
    "demand": 1,
    "image": "images/toys/reindeer-plush.webp"
  },
  {
    "id": "pets-flaming-fox",
    "name": "Flaming Fox",
    "category": "pets",
    "value": 1.12,
    "demand": 2,
    "image": "images/pets/flaming-fox.webp"
  },
  {
    "id": "vehicles-giant-cheetah-mount",
    "name": "Giant Cheetah Mount",
    "category": "vehicles",
    "value": 5.25,
    "demand": 2,
    "image": "images/vehicles/giant-cheetah-mount.webp"
  },
  {
    "id": "pets-giant-panda",
    "name": "Giant Panda",
    "category": "pets",
    "value": 73.5,
    "demand": 3,
    "image": "images/pets/giant-panda.webp"
  },
  {
    "id": "vehicles-pumpkin-carriage",
    "name": "Pumpkin Carriage",
    "category": "vehicles",
    "value": 0.63,
    "demand": 1,
    "image": "images/vehicles/pumpkin-carriage.webp"
  },
  {
    "id": "vehicles-rabbit-helicopter",
    "name": "Rabbit Helicopter",
    "category": "vehicles",
    "value": 0.84,
    "demand": 1,
    "image": "images/vehicles/rabbit-helicopter.webp"
  },
  {
    "id": "pets-crocodile",
    "name": "Crocodile",
    "category": "pets",
    "value": 5.425,
    "demand": 3,
    "image": "images/pets/crocodile.webp"
  },
  {
    "id": "gifts-halloween-chick-box",
    "name": "Halloween Chick Box",
    "category": "gifts",
    "value": 0.2084,
    "demand": 1,
    "image": "images/gifts/halloween-chick-box.webp"
  },
  {
    "id": "pets-zebra",
    "name": "Zebra",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/zebra.webp"
  },
  {
    "id": "gifts-rat-box",
    "name": "Rat Box",
    "category": "gifts",
    "value": 5.5462,
    "demand": 2,
    "image": "images/gifts/rat-box.webp"
  },
  {
    "id": "food-golden-leaf",
    "name": "Golden Leaf",
    "category": "food",
    "value": 9.1,
    "demand": 2,
    "image": "images/food/golden-leaf.webp"
  },
  {
    "id": "pets-robin",
    "name": "Robin",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/robin.webp"
  },
  {
    "id": "food-golden-dandelion",
    "name": "Golden Dandelion",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-dandelion.webp"
  },
  {
    "id": "stickers-jimothy",
    "name": "Jimothy",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/jimothy.webp"
  },
  {
    "id": "pets-arctic-reindeer",
    "name": "Arctic Reindeer",
    "category": "pets",
    "value": 18.55,
    "demand": 3,
    "image": "images/pets/arctic-reindeer.webp"
  },
  {
    "id": "stickers-halloween-2024-sticker-pack",
    "name": "Halloween 2024 Sticker Pack",
    "category": "stickers",
    "value": 0.07,
    "demand": 1,
    "image": "images/stickers/halloween-2024-sticker-pack.webp"
  },
  {
    "id": "pets-highland-cow",
    "name": "Highland Cow",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/highland-cow.webp"
  },
  {
    "id": "pets-dj-snooze",
    "name": "DJ Snooze",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/dj-snooze.webp"
  },
  {
    "id": "petwear-unicorn-backpack",
    "name": "Unicorn Backpack",
    "category": "petwear",
    "value": 1.925,
    "demand": 2,
    "image": "images/petwear/unicorn-backpack.webp"
  },
  {
    "id": "vehicles-squirrel-car",
    "name": "Squirrel Car",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/squirrel-car.webp"
  },
  {
    "id": "pets-king-bee",
    "name": "King Bee",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/king-bee.webp"
  },
  {
    "id": "stickers-mini-pig-sticker",
    "name": "Mini Pig Sticker",
    "category": "stickers",
    "value": 0.105,
    "demand": 1,
    "image": "images/stickers/mini-pig-sticker.webp"
  },
  {
    "id": "pets-burger-bear",
    "name": "Burger Bear",
    "category": "pets",
    "value": 0.525,
    "demand": 2,
    "image": "images/pets/burger-bear.webp"
  },
  {
    "id": "pets-black-kite",
    "name": "Black Kite",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/black-kite.webp"
  },
  {
    "id": "pets-sasquatch",
    "name": "Sasquatch",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/sasquatch.webp"
  },
  {
    "id": "food-shiver-cone-bait",
    "name": "Shiver Cone Bait",
    "category": "food",
    "value": 0.07,
    "demand": 1,
    "image": "images/food/shiver-cone-bait.webp"
  },
  {
    "id": "pets-golden-hamster",
    "name": "Golden Hamster",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/golden-hamster.webp"
  },
  {
    "id": "toys-marsh-plush",
    "name": "Marsh Plush",
    "category": "toys",
    "value": 0.21,
    "demand": 1,
    "image": "images/toys/marsh-plush.webp"
  },
  {
    "id": "pets-groundhog",
    "name": "Groundhog",
    "category": "pets",
    "value": 1.925,
    "demand": 2,
    "image": "images/pets/groundhog.webp"
  },
  {
    "id": "petwear-bewitched-hat",
    "name": "Bewitched Hat",
    "category": "petwear",
    "value": 0.315,
    "demand": 1,
    "image": "images/petwear/bewitched-hat.webp"
  },
  {
    "id": "petwear-heart-ribbon",
    "name": "Heart Ribbon",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/heart-ribbon.webp"
  },
  {
    "id": "stickers-cherry-blossom-flower-sticker",
    "name": "Cherry Blossom Flower Sticker",
    "category": "stickers",
    "value": 0.0175,
    "demand": 1,
    "image": "images/stickers/cherry-blossom-flower-sticker.webp"
  },
  {
    "id": "pets-midnight-dragon",
    "name": "Midnight Dragon",
    "category": "pets",
    "value": 1.995,
    "demand": 2,
    "image": "images/pets/midnight-dragon.webp"
  },
  {
    "id": "toys-banana-plush",
    "name": "Banana Plush",
    "category": "toys",
    "value": 0.175,
    "demand": 1,
    "image": "images/toys/banana-plush.webp"
  },
  {
    "id": "pets-nutcracker-squirrel",
    "name": "Nutcracker Squirrel",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/nutcracker-squirrel.webp"
  },
  {
    "id": "pets-hammerhead-shark",
    "name": "Hammerhead Shark",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/hammerhead-shark.webp"
  },
  {
    "id": "pets-puma",
    "name": "Puma",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/puma.webp"
  },
  {
    "id": "pets-lion",
    "name": "Lion",
    "category": "pets",
    "value": 5.425,
    "demand": 3,
    "image": "images/pets/lion.webp"
  },
  {
    "id": "pets-seabed-creeper",
    "name": "Seabed Creeper",
    "category": "pets",
    "value": 0.525,
    "demand": 2,
    "image": "images/pets/seabed-creeper.webp"
  },
  {
    "id": "pets-ratatoskr",
    "name": "Ratatoskr",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/ratatoskr.webp"
  },
  {
    "id": "pets-malaysian-tapir",
    "name": "Malaysian Tapir",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/malaysian-tapir.webp"
  },
  {
    "id": "strollers-ufo-stroller",
    "name": "UFO Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-sakura-spirit",
    "name": "Sakura Spirit",
    "category": "pets",
    "value": 2.45,
    "demand": 2,
    "image": "images/pets/sakura-spirit.webp"
  },
  {
    "id": "pets-glormy-leo",
    "name": "Glormy Leo",
    "category": "pets",
    "value": 1.435,
    "demand": 2,
    "image": "images/pets/glormy-leo.webp"
  },
  {
    "id": "petwear-yellow-designer-backpack",
    "name": "Yellow Designer Backpack",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/yellow-designer-backpack.webp"
  },
  {
    "id": "pets-koala",
    "name": "Koala",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/koala.webp"
  },
  {
    "id": "pets-ibex",
    "name": "Ibex",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/ibex.webp"
  },
  {
    "id": "pets-triceratops",
    "name": "Triceratops",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/triceratops.webp"
  },
  {
    "id": "petwear-leaf-hat",
    "name": "Leaf Hat",
    "category": "petwear",
    "value": 0.105,
    "demand": 1,
    "image": "images/petwear/leaf-hat.webp"
  },
  {
    "id": "petwear-lunar-new-year-collar",
    "name": "Lunar New Year Collar",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/lunar-new-year-collar.webp"
  },
  {
    "id": "petwear-flying-fairy",
    "name": "Flying Fairy",
    "category": "petwear",
    "value": 0.21,
    "demand": 2,
    "image": "images/petwear/flying-fairy.webp"
  },
  {
    "id": "pets-green-amazon",
    "name": "Green Amazon",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/green-amazon.webp"
  },
  {
    "id": "petwear-ice-cream-heels",
    "name": "Ice Cream Heels",
    "category": "petwear",
    "value": 0.42,
    "demand": 2,
    "image": "images/petwear/ice-cream-heels.webp"
  },
  {
    "id": "pets-tree-frog",
    "name": "Tree Frog",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/tree-frog.webp"
  },
  {
    "id": "petwear-ghost-hat",
    "name": "Ghost Hat",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/ghost-hat.webp"
  },
  {
    "id": "pets-inmate-capuchin-monkey",
    "name": "Inmate Capuchin Monkey",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/inmate-capuchin-monkey.webp"
  },
  {
    "id": "pets-red-fox",
    "name": "Red Fox",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/red-fox.webp"
  },
  {
    "id": "pets-puffin",
    "name": "Puffin",
    "category": "pets",
    "value": 2.1,
    "demand": 2,
    "image": "images/pets/puffin.webp"
  },
  {
    "id": "petwear-balloon-dog",
    "name": "Balloon Dog",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/balloon-dog.webp"
  },
  {
    "id": "pets-flower-power-duckling",
    "name": "Flower Power Duckling",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/flower-power-duckling.webp"
  },
  {
    "id": "petwear-candy-corn-hat",
    "name": "Candy Corn Hat",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/candy-corn-hat.webp"
  },
  {
    "id": "stickers-winter-deer-family-sticker",
    "name": "Winter Deer Family Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/winter-deer-family-sticker.webp"
  },
  {
    "id": "eggs-blue-egg",
    "name": "Blue Egg",
    "category": "eggs",
    "value": 19.0419,
    "demand": 2,
    "image": "images/eggs/blue-egg.webp"
  },
  {
    "id": "pets-gumball-caterpillar",
    "name": "Gumball Caterpillar",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/gumball-caterpillar.webp"
  },
  {
    "id": "stickers-fossil-sticker-pack",
    "name": "Fossil Sticker Pack",
    "category": "stickers",
    "value": 0.021,
    "demand": 1,
    "image": "images/stickers/fossil-sticker-pack.webp"
  },
  {
    "id": "pets-peahen",
    "name": "Peahen",
    "category": "pets",
    "value": 0.77,
    "demand": 2,
    "image": "images/pets/peahen.webp"
  },
  {
    "id": "gifts-hare-box",
    "name": "Hare Box",
    "category": "gifts",
    "value": 0.4241,
    "demand": 2,
    "image": "images/gifts/hare-box.webp"
  },
  {
    "id": "pets-ankylosaurus",
    "name": "Ankylosaurus",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/ankylosaurus.webp"
  },
  {
    "id": "petwear-2022-birthday-party-horn",
    "name": "2022 Birthday Party Horn",
    "category": "petwear",
    "value": 5.775,
    "demand": 3,
    "image": "images/petwear/2022-birthday-party-horn.webp"
  },
  {
    "id": "pets-cherub-chipmunk",
    "name": "Cherub Chipmunk",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/cherub-chipmunk.webp"
  },
  {
    "id": "strollers-egg-basket-stroller",
    "name": "Egg Basket Stroller",
    "category": "strollers",
    "value": 0.07,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-coconut-stroller",
    "name": "Coconut Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-capybara",
    "name": "Capybara",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/capybara.webp"
  },
  {
    "id": "petwear-witch-hat",
    "name": "Witch Hat",
    "category": "petwear",
    "value": 0.42,
    "demand": 1,
    "image": "images/petwear/witch-hat.webp"
  },
  {
    "id": "food-levitation-potion",
    "name": "Levitation Potion",
    "category": "food",
    "value": 1.05,
    "demand": 2,
    "image": "images/food/levitation-potion.webp"
  },
  {
    "id": "vehicles-ribcage-carriage",
    "name": "Ribcage Carriage",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/ribcage-carriage.webp"
  },
  {
    "id": "pets-majestic-pony",
    "name": "Majestic Pony",
    "category": "pets",
    "value": 1.155,
    "demand": 2,
    "image": "images/pets/majestic-pony.webp"
  },
  {
    "id": "strollers-baby-basket-stroller",
    "name": "Baby Basket Stroller",
    "category": "strollers",
    "value": 0.6869,
    "demand": 2,
    "image": "images/strollers/baby-basket-stroller.webp"
  },
  {
    "id": "pets-flamingo",
    "name": "Flamingo",
    "category": "pets",
    "value": 7.35,
    "demand": 3,
    "image": "images/pets/flamingo.webp"
  },
  {
    "id": "pets-birthday-butterfly-2024",
    "name": "Birthday Butterfly 2024",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/birthday-butterfly-2024.webp"
  },
  {
    "id": "food-taco",
    "name": "Taco",
    "category": "food",
    "value": 0.105,
    "demand": 1,
    "image": "images/food/taco.webp"
  },
  {
    "id": "pets-fossa",
    "name": "Fossa",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/fossa.webp"
  },
  {
    "id": "pets-solaris",
    "name": "Solaris",
    "category": "pets",
    "value": 2.1,
    "demand": 2,
    "image": "images/pets/solaris.webp"
  },
  {
    "id": "pets-moon-rabbit",
    "name": "Moon Rabbit",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/moon-rabbit.webp"
  },
  {
    "id": "pets-border-collie",
    "name": "Border Collie",
    "category": "pets",
    "value": 4.2,
    "demand": 2,
    "image": "images/pets/border-collie.webp"
  },
  {
    "id": "pets-hermit-crab",
    "name": "Hermit Crab",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/hermit-crab.webp"
  },
  {
    "id": "toys-candyfloss-paint",
    "name": "Candyfloss Mega Neon Paint",
    "category": "toys",
    "value": 0.315,
    "demand": 3,
    "image": "images/toys/candyfloss-mega-neon-paint.webp"
  },
  {
    "id": "pets-feesh",
    "name": "Feesh",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/feesh.webp"
  },
  {
    "id": "petwear-strawberry-shortcake-bow",
    "name": "Strawberry Shortcake Bow",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/strawberry-shortcake-bow.webp"
  },
  {
    "id": "pets-onza",
    "name": "Onza",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/onza.webp"
  },
  {
    "id": "strollers-egyptian-chariot-stroller",
    "name": "Egyptian Chariot Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "potions-bonus-aging-potion",
    "name": "Bonus Aging Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-hamster",
    "name": "Hamster",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/hamster.webp"
  },
  {
    "id": "pets-alley-cat",
    "name": "Alley Cat",
    "category": "pets",
    "value": 1.435,
    "demand": 2,
    "image": "images/pets/alley-cat.webp"
  },
  {
    "id": "pets-zombie-chick",
    "name": "Zombie Chick",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/zombie-chick.webp"
  },
  {
    "id": "pets-swan",
    "name": "Swan",
    "category": "pets",
    "value": 0.91,
    "demand": 2,
    "image": "images/pets/swan.webp"
  },
  {
    "id": "food-sugar-skull-potion",
    "name": "Sugar Skull Potion",
    "category": "food",
    "value": 1.225,
    "demand": 2,
    "image": "images/food/sugar-skull-potion.webp"
  },
  {
    "id": "pets-firefly",
    "name": "Firefly",
    "category": "pets",
    "value": 0.63,
    "demand": 1,
    "image": "images/pets/firefly.webp"
  },
  {
    "id": "pets-halloween-white-skeleton-dog",
    "name": "Halloween White Skeleton Dog",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/halloween-white-skeleton-dog.webp"
  },
  {
    "id": "pets-komodo-dragon",
    "name": "Komodo Dragon",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/komodo-dragon.webp"
  },
  {
    "id": "pets-winged-horse",
    "name": "Winged Horse",
    "category": "pets",
    "value": 0.595,
    "demand": 2,
    "image": "images/pets/winged-horse.webp"
  },
  {
    "id": "pets-ice-golem",
    "name": "Ice Golem",
    "category": "pets",
    "value": 0.91,
    "demand": 2,
    "image": "images/pets/ice-golem.webp"
  },
  {
    "id": "petwear-purple-heart-glasses",
    "name": "Purple Heart Glasses",
    "category": "petwear",
    "value": 0.175,
    "demand": 1,
    "image": "images/petwear/purple-heart-glasses.webp"
  },
  {
    "id": "petwear-burger-boots",
    "name": "Burger Boots",
    "category": "petwear",
    "value": 0.49,
    "demand": 2,
    "image": "images/petwear/burger-boots.webp"
  },
  {
    "id": "petwear-gold-circle-glasses",
    "name": "Gold Circle Glasses",
    "category": "petwear",
    "value": 0.0875,
    "demand": 2,
    "image": "images/petwear/gold-circle-glasses.webp"
  },
  {
    "id": "petwear-ember-wings",
    "name": "Ember Wings",
    "category": "petwear",
    "value": 2.1,
    "demand": 2,
    "image": "images/petwear/ember-wings.webp"
  },
  {
    "id": "gifts-massive-gift",
    "name": "Massive Gift",
    "category": "gifts",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-festive-scarf",
    "name": "Festive Scarf",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/festive-scarf.webp"
  },
  {
    "id": "petwear-2022-birthday-cupcake-shoes",
    "name": "2022 Birthday Cupcake Shoes",
    "category": "petwear",
    "value": 7.7,
    "demand": 3,
    "image": "images/petwear/2022-birthday-cupcake-shoes.webp"
  },
  {
    "id": "pets-possum",
    "name": "Possum",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/possum.webp"
  },
  {
    "id": "pets-ghost-bunny",
    "name": "Ghost Bunny",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/ghost-bunny.webp"
  },
  {
    "id": "toys-christmas-cat-rattle",
    "name": "Christmas Cat Rattle",
    "category": "toys",
    "value": 0.21,
    "demand": 1,
    "image": "images/toys/christmas-cat-rattle.webp"
  },
  {
    "id": "food-golden-wheat",
    "name": "Golden Wheat",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-wheat.webp"
  },
  {
    "id": "pets-oakee-knight",
    "name": "Oakee Knight",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/oakee-knight.webp"
  },
  {
    "id": "eggs-basic-egg",
    "name": "Basic Egg",
    "category": "eggs",
    "value": 0.0256,
    "demand": 1,
    "image": "images/eggs/basic-egg.webp"
  },
  {
    "id": "petwear-elf-hat",
    "name": "Elf Hat",
    "category": "petwear",
    "value": 0.42,
    "demand": 1,
    "image": "images/petwear/elf-hat.webp"
  },
  {
    "id": "gifts-spider-box",
    "name": "Spider Box",
    "category": "gifts",
    "value": 0.09,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-golden-walrus-crown",
    "name": "Golden Walrus Crown",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/golden-walrus-crown.webp"
  },
  {
    "id": "pets-phantom-dragon",
    "name": "Phantom Dragon",
    "category": "pets",
    "value": 2.975,
    "demand": 2,
    "image": "images/pets/phantom-dragon.webp"
  },
  {
    "id": "toys-cookie-dough-plush",
    "name": "Cookie Dough Plush",
    "category": "toys",
    "value": 0.14,
    "demand": 1,
    "image": "images/toys/cookie-dough-plush.webp"
  },
  {
    "id": "pets-blue-whale",
    "name": "Blue Whale",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/blue-whale.webp"
  },
  {
    "id": "pets-purple-butterfly",
    "name": "Purple Butterfly",
    "category": "pets",
    "value": 1.33,
    "demand": 2,
    "image": "images/pets/purple-butterfly.webp"
  },
  {
    "id": "petwear-jeffs-nametag",
    "name": "Jeff's Nametag",
    "category": "petwear",
    "value": 0.7,
    "demand": 2,
    "image": "images/petwear/jeff-s-nametag.webp"
  },
  {
    "id": "pets-dalmatian",
    "name": "Dalmatian",
    "category": "pets",
    "value": 22.75,
    "demand": 3,
    "image": "images/pets/dalmatian.webp"
  },
  {
    "id": "vehicles-gold-skateboard",
    "name": "Gold Skateboard",
    "category": "vehicles",
    "value": 0.49,
    "demand": 1,
    "image": "images/vehicles/gold-skateboard.webp"
  },
  {
    "id": "pets-chilling-spider",
    "name": "Chilling Spider",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/chilling-spider.webp"
  },
  {
    "id": "stickers-frog-sticker",
    "name": "Frog Sticker",
    "category": "stickers",
    "value": 0.056,
    "demand": 1,
    "image": "images/stickers/frog-sticker.webp"
  },
  {
    "id": "vehicles-rocket-sled",
    "name": "Rocket Sled",
    "category": "vehicles",
    "value": 9.8,
    "demand": 2,
    "image": "images/vehicles/rocket-sled.webp"
  },
  {
    "id": "petwear-tiny-wings",
    "name": "Tiny Wings",
    "category": "petwear",
    "value": 4.375,
    "demand": 3,
    "image": "images/petwear/tiny-wings.webp"
  },
  {
    "id": "pets-happy-clam",
    "name": "Happy Clam",
    "category": "pets",
    "value": 1.925,
    "demand": 2,
    "image": "images/pets/happy-clam.webp"
  },
  {
    "id": "pets-sushi-penguin",
    "name": "Sushi Penguin",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/sushi-penguin.webp"
  },
  {
    "id": "pets-kid-goat",
    "name": "Kid Goat",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/kid-goat.webp"
  },
  {
    "id": "vehicles-flying-cloud",
    "name": "Flying Cloud",
    "category": "vehicles",
    "value": 0.77,
    "demand": 2,
    "image": "images/vehicles/flying-cloud.webp"
  },
  {
    "id": "strollers-soy-sauce-stroller",
    "name": "Soy Sauce Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "stickers-pets-plus-sticker-pack",
    "name": "Pets Plus Sticker Pack",
    "category": "stickers",
    "value": 0.525,
    "demand": 2,
    "image": "images/stickers/pets-plus-sticker-pack.webp"
  },
  {
    "id": "pets-meerkat",
    "name": "Meerkat",
    "category": "pets",
    "value": 2.275,
    "demand": 2,
    "image": "images/pets/meerkat.webp"
  },
  {
    "id": "pets-love-bird",
    "name": "Love Bird",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/love-bird.webp"
  },
  {
    "id": "strollers-magic-carpet-stroller",
    "name": "Magic Carpet Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-wild-boar",
    "name": "Wild Boar",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/wild-boar.webp"
  },
  {
    "id": "pets-brown-springer-spaniel",
    "name": "Brown Springer Spaniel",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/brown-springer-spaniel.webp"
  },
  {
    "id": "potions-small-sip-potion",
    "name": "Small Sip Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-cerberus",
    "name": "Cerberus",
    "category": "pets",
    "value": 1.295,
    "demand": 2,
    "image": "images/pets/cerberus.webp"
  },
  {
    "id": "pets-diamond-unicorn",
    "name": "Diamond Unicorn",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/diamond-unicorn.webp"
  },
  {
    "id": "pets-salamander",
    "name": "Salamander",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/salamander.webp"
  },
  {
    "id": "pets-chickatrice",
    "name": "Chickatrice",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/chickatrice.webp"
  },
  {
    "id": "pets-kitty-bat",
    "name": "Kitty Bat",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/kitty-bat.webp"
  },
  {
    "id": "vehicles-bathtub",
    "name": "Bathtub",
    "category": "vehicles",
    "value": 2.8,
    "demand": 2,
    "image": "images/vehicles/bathtub.webp"
  },
  {
    "id": "pets-gold-mahi-mahi",
    "name": "Gold Mahi Mahi",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/gold-mahi-mahi.webp"
  },
  {
    "id": "pets-nebula-snake",
    "name": "Nebula Snake",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/nebula-snake.webp"
  },
  {
    "id": "pets-tree-kangaroo",
    "name": "Tree Kangaroo",
    "category": "pets",
    "value": 1.085,
    "demand": 2,
    "image": "images/pets/tree-kangaroo.webp"
  },
  {
    "id": "strollers-race-car-stroller",
    "name": "Race Car Stroller",
    "category": "strollers",
    "value": 0.9016,
    "demand": 2,
    "image": "images/strollers/race-car-stroller.webp"
  },
  {
    "id": "gifts-standard-wing-chest",
    "name": "Standard Wing Chest",
    "category": "gifts",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-ancient-dragon",
    "name": "Ancient Dragon",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/ancient-dragon.webp"
  },
  {
    "id": "strollers-takoyaki-stroller",
    "name": "Takoyaki Stroller",
    "category": "strollers",
    "value": 0.05,
    "demand": 3,
    "image": ""
  },
  {
    "id": "vehicles-dragonster",
    "name": "Dragonster",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/dragonster.webp"
  },
  {
    "id": "toys-creator-rattle",
    "name": "Creator Rattle (NewFissy)",
    "category": "toys",
    "value": 0.42,
    "demand": 1,
    "image": "images/toys/creator-rattle-newfissy.webp"
  },
  {
    "id": "pets-poison-dart-frog",
    "name": "Poison Dart Frog",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/poison-dart-frog.webp"
  },
  {
    "id": "pets-red-cardinal",
    "name": "Red Cardinal",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/red-cardinal.webp"
  },
  {
    "id": "pets-australian-kelpie",
    "name": "Australian Kelpie",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/australian-kelpie.webp"
  },
  {
    "id": "potions-grow-potion",
    "name": "Grow Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-mochi-meow",
    "name": "Mochi Meow",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/mochi-meow.webp"
  },
  {
    "id": "pets-orange-betta-fish",
    "name": "Orange Betta Fish",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/orange-betta-fish.webp"
  },
  {
    "id": "petwear-volcano-hat",
    "name": "Volcano Hat",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/volcano-hat.webp"
  },
  {
    "id": "gifts-choccybunny-box",
    "name": "Choccybunny Box",
    "category": "gifts",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "vehicles-convertible",
    "name": "Convertible",
    "category": "vehicles",
    "value": 0.91,
    "demand": 1,
    "image": "images/vehicles/convertible.webp"
  },
  {
    "id": "pets-giraffe",
    "name": "Giraffe",
    "category": "pets",
    "value": 173.6,
    "demand": 3,
    "image": "images/pets/giraffe.webp"
  },
  {
    "id": "strollers-lunar-stroller",
    "name": "Lunar Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-husky",
    "name": "Husky",
    "category": "pets",
    "value": 0.91,
    "demand": 2,
    "image": "images/pets/husky.webp"
  },
  {
    "id": "pets-orangutan",
    "name": "Orangutan",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/orangutan.webp"
  },
  {
    "id": "pets-rodeo-bull",
    "name": "Rodeo Bull",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/rodeo-bull.webp"
  },
  {
    "id": "vehicles-bubble-car",
    "name": "Bubble Car",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/bubble-car.webp"
  },
  {
    "id": "pets-ruddy-duck",
    "name": "Ruddy Duck",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/ruddy-duck.webp"
  },
  {
    "id": "pets-field-mouse",
    "name": "Field Mouse",
    "category": "pets",
    "value": 2.275,
    "demand": 2,
    "image": "images/pets/field-mouse.webp"
  },
  {
    "id": "pets-platypus",
    "name": "Platypus",
    "category": "pets",
    "value": 1.61,
    "demand": 2,
    "image": "images/pets/platypus.webp"
  },
  {
    "id": "eggs-golden-egg",
    "name": "Golden Egg",
    "category": "eggs",
    "value": 0.1293,
    "demand": 1,
    "image": "images/eggs/golden-egg.webp"
  },
  {
    "id": "pets-sea-slug",
    "name": "Sea Slug",
    "category": "pets",
    "value": 4.025,
    "demand": 2,
    "image": "images/pets/sea-slug.webp"
  },
  {
    "id": "pets-ornate-horned-frog",
    "name": "Ornate Horned Frog",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/ornate-horned-frog.webp"
  },
  {
    "id": "pets-winter-buck",
    "name": "Winter Buck",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/winter-buck.webp"
  },
  {
    "id": "pets-snow-owl",
    "name": "Snow Owl",
    "category": "pets",
    "value": 0.525,
    "demand": 2,
    "image": "images/pets/snow-owl.webp"
  },
  {
    "id": "pets-black-springer-spaniel",
    "name": "Black Springer Spaniel",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/black-springer-spaniel.webp"
  },
  {
    "id": "vehicles-douglas",
    "name": "Douglas",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/douglas.webp"
  },
  {
    "id": "strollers-bunny-stroller",
    "name": "Bunny Stroller",
    "category": "strollers",
    "value": 0.6644,
    "demand": 2,
    "image": "images/strollers/bunny-stroller.webp"
  },
  {
    "id": "eggs-desert-egg",
    "name": "Desert Egg",
    "category": "eggs",
    "value": 0.1738,
    "demand": 2,
    "image": "images/eggs/desert-egg.webp"
  },
  {
    "id": "pets-angus-bull",
    "name": "Angus Bull",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/angus-bull.webp"
  },
  {
    "id": "petwear-puddleducks-hood",
    "name": "Puddleducks Hood",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/puddleducks-hood.webp"
  },
  {
    "id": "stickers-mochi-meow-tumble-animated-sticker",
    "name": "Mochi Meow Tumble Animated Sticker",
    "category": "stickers",
    "value": 0.385,
    "demand": 2,
    "image": "images/stickers/mochi-meow-tumble-animated-sticker.webp"
  },
  {
    "id": "pets-ice-cream-hermit-crab",
    "name": "Ice Cream Hermit Crab",
    "category": "pets",
    "value": 1.155,
    "demand": 2,
    "image": "images/pets/ice-cream-hermit-crab.webp"
  },
  {
    "id": "vehicles-gummy-biplane",
    "name": "Gummy Biplane",
    "category": "vehicles",
    "value": 0.14,
    "demand": 1,
    "image": "images/vehicles/gummy-biplane.webp"
  },
  {
    "id": "pets-skelerex",
    "name": "Skele-Rex",
    "category": "pets",
    "value": 0.77,
    "demand": 2,
    "image": "images/pets/skele-rex.webp"
  },
  {
    "id": "strollers-fall-wheelbarrow-stroller",
    "name": "Fall Wheelbarrow Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-haetae",
    "name": "Haetae",
    "category": "pets",
    "value": 44.8,
    "demand": 3,
    "image": "images/pets/haetae.webp"
  },
  {
    "id": "toys-hot-cocoa-stand",
    "name": "Hot Cocoa Stand",
    "category": "toys",
    "value": 0.525,
    "demand": 2,
    "image": "images/toys/hot-cocoa-stand.webp"
  },
  {
    "id": "stickers-jekyll-hydra-animated-sticker",
    "name": "Jekyll Hydra Animated Sticker",
    "category": "stickers",
    "value": 1.4,
    "demand": 2,
    "image": "images/stickers/jekyll-hydra-animated-sticker.webp"
  },
  {
    "id": "stickers-tree-decorating-animated-sticker",
    "name": "Tree Decorating Animated Sticker",
    "category": "stickers",
    "value": 0.42,
    "demand": 2,
    "image": "images/stickers/tree-decorating-animated-sticker.webp"
  },
  {
    "id": "potions-big-brew-potion",
    "name": "Big Brew Potion",
    "category": "potions",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-firey-aura",
    "name": "Firey Aura",
    "category": "petwear",
    "value": 0.385,
    "demand": 1,
    "image": "images/petwear/firey-aura.webp"
  },
  {
    "id": "vehicles-santas-sleigh",
    "name": "Santa's Sleigh",
    "category": "vehicles",
    "value": 0.315,
    "demand": 1,
    "image": "images/vehicles/santa-s-sleigh.webp"
  },
  {
    "id": "pets-strawberry-penguin",
    "name": "Strawberry Penguin",
    "category": "pets",
    "value": 2.275,
    "demand": 2,
    "image": "images/pets/strawberry-penguin.webp"
  },
  {
    "id": "petwear-clockwork-wings",
    "name": "Clockwork Wings",
    "category": "petwear",
    "value": 0.875,
    "demand": 2,
    "image": "images/petwear/clockwork-wings.webp"
  },
  {
    "id": "pets-black-tiger",
    "name": "Black Tiger",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/black-tiger.webp"
  },
  {
    "id": "pets-cobra",
    "name": "Cobra",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/cobra.webp"
  },
  {
    "id": "pets-unicorn-ducky",
    "name": "Unicorn Ducky",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/unicorn-ducky.webp"
  },
  {
    "id": "petwear-eco-orange-pumpkin-pie-wings",
    "name": "Eco Orange Pumpkin Pie Wings",
    "category": "petwear",
    "value": 0.7,
    "demand": 2,
    "image": "images/petwear/eco-orange-pumpkin-pie-wings.webp"
  },
  {
    "id": "toys-halloween-slime-paint",
    "name": "Halloween Slime Mega Neon Paint",
    "category": "toys",
    "value": 0.315,
    "demand": 3,
    "image": "images/toys/halloween-slime-mega-neon-paint.webp"
  },
  {
    "id": "pets-mecha-r4bbit",
    "name": "Mecha R4BBIT",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/mecha-r4bbit.webp"
  },
  {
    "id": "pets-armadillo",
    "name": "Armadillo",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/armadillo.webp"
  },
  {
    "id": "vehicles-hovercar",
    "name": "Hovercar",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/hovercar.webp"
  },
  {
    "id": "pets-toasty-red-panda",
    "name": "Toasty Red Panda",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/toasty-red-panda.webp"
  },
  {
    "id": "petwear-dancing-tube-hat",
    "name": "Dancing Tube Hat",
    "category": "petwear",
    "value": 0.455,
    "demand": 1,
    "image": "images/petwear/dancing-tube-hat.webp"
  },
  {
    "id": "pets-golden-dragon",
    "name": "Golden Dragon",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/golden-dragon.webp"
  },
  {
    "id": "vehicles-crescent-moon-car",
    "name": "Crescent Moon Car",
    "category": "vehicles",
    "value": 1.75,
    "demand": 2,
    "image": "images/vehicles/crescent-moon-car.webp"
  },
  {
    "id": "eggs-ocean-egg",
    "name": "Ocean Egg",
    "category": "eggs",
    "value": 0.2591,
    "demand": 2,
    "image": "images/eggs/ocean-egg.webp"
  },
  {
    "id": "petwear-eyepatch",
    "name": "Eyepatch",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/eyepatch.webp"
  },
  {
    "id": "pets-pudding-cat",
    "name": "Pudding Cat",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/pudding-cat.webp"
  },
  {
    "id": "pets-stegosaurus",
    "name": "Stegosaurus",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/stegosaurus.webp"
  },
  {
    "id": "pets-angus-cow",
    "name": "Angus Cow",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/angus-cow.webp"
  },
  {
    "id": "pets-scarlet-butterfly",
    "name": "Scarlet Butterfly",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/scarlet-butterfly.webp"
  },
  {
    "id": "pets-emu",
    "name": "Emu",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/emu.webp"
  },
  {
    "id": "vehicles-red-skateboard",
    "name": "Neon Red Skateboard",
    "category": "vehicles",
    "value": 0.91,
    "demand": 1,
    "image": "images/vehicles/neon-red-skateboard.webp"
  },
  {
    "id": "pets-blossom-snake",
    "name": "Blossom Snake",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/blossom-snake.webp"
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
    "id": "toys-rainbow-wand",
    "name": "Rainbow Wand",
    "category": "toys",
    "value": 0.245,
    "demand": 1,
    "image": "images/toys/rainbow-wand.webp"
  },
  {
    "id": "stickers-peppermint-penguin-sticker",
    "name": "Peppermint Penguin Sticker",
    "category": "stickers",
    "value": 0.105,
    "demand": 1,
    "image": "images/stickers/peppermint-penguin-sticker.webp"
  },
  {
    "id": "petwear-pink-instant-camera",
    "name": "Pink Instant Camera",
    "category": "petwear",
    "value": 0.28,
    "demand": 2,
    "image": "images/petwear/pink-instant-camera.webp"
  },
  {
    "id": "pets-albino-bat",
    "name": "Albino Bat",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/albino-bat.webp"
  },
  {
    "id": "petwear-top-hat",
    "name": "Top Hat",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/top-hat.webp"
  },
  {
    "id": "strollers-pirate-captain-stroller",
    "name": "Pirate Captain Stroller",
    "category": "strollers",
    "value": 0.07,
    "demand": 3,
    "image": ""
  },
  {
    "id": "vehicles-blue-scooter",
    "name": "Blue Scooter",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/blue-scooter.webp"
  },
  {
    "id": "vehicles-giant-snowball",
    "name": "Giant Snowball",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/giant-snowball.webp"
  },
  {
    "id": "petwear-chimney-hat",
    "name": "Chimney Hat",
    "category": "petwear",
    "value": 0.28,
    "demand": 1,
    "image": "images/petwear/chimney-hat.webp"
  },
  {
    "id": "petwear-pink-heart-glasses",
    "name": "Pink Heart Glasses",
    "category": "petwear",
    "value": 0.7,
    "demand": 2,
    "image": "images/petwear/pink-heart-glasses.webp"
  },
  {
    "id": "pets-mule",
    "name": "Mule",
    "category": "pets",
    "value": 0.805,
    "demand": 2,
    "image": "images/pets/mule.webp"
  },
  {
    "id": "pets-waffle-wyrm",
    "name": "Waffle Wyrm",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/waffle-wyrm.webp"
  },
  {
    "id": "petwear-halloween-black-axe-guitar-accessory",
    "name": "Halloween Black Axe Guitar Accessory",
    "category": "petwear",
    "value": 0.84,
    "demand": 2,
    "image": "images/petwear/halloween-black-axe-guitar-accessory.webp"
  },
  {
    "id": "pets-silly-duck",
    "name": "Silly Duck",
    "category": "pets",
    "value": 0.875,
    "demand": 2,
    "image": "images/pets/silly-duck.webp"
  },
  {
    "id": "petwear-santas-bow",
    "name": "Santa's Bow",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/santa-s-bow.webp"
  },
  {
    "id": "toys-elephant-plush",
    "name": "Elephant Plush",
    "category": "toys",
    "value": 0.28,
    "demand": 1,
    "image": "images/toys/elephant-plush.webp"
  },
  {
    "id": "pets-frog",
    "name": "Frog",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/frog.webp"
  },
  {
    "id": "petwear-strawberry-cupcake-shoes",
    "name": "Strawberry Cupcake Shoes",
    "category": "petwear",
    "value": 59.5,
    "demand": 3,
    "image": "images/petwear/strawberry-cupcake-shoes.webp"
  },
  {
    "id": "pets-kelp-hunter",
    "name": "Kelp Hunter",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/kelp-hunter.webp"
  },
  {
    "id": "pets-shiver-wolf",
    "name": "Shiver Wolf",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/shiver-wolf.webp"
  },
  {
    "id": "pets-glormy-dolphin",
    "name": "Glormy Dolphin",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/glormy-dolphin.webp"
  },
  {
    "id": "strollers-rocket-ship-stroller",
    "name": "Rocket Ship Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-shipwreck-stroller",
    "name": "Shipwreck Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-stingray",
    "name": "Stingray",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/stingray.webp"
  },
  {
    "id": "pets-leviathan",
    "name": "Leviathan",
    "category": "pets",
    "value": 0.805,
    "demand": 2,
    "image": "images/pets/leviathan.webp"
  },
  {
    "id": "pets-zodiac-minion-chick",
    "name": "Zodiac Minion Chick",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/zodiac-minion-chick.webp"
  },
  {
    "id": "petwear-strawberry-plushie-rider",
    "name": "Strawberry Plushie Rider",
    "category": "petwear",
    "value": 50.75,
    "demand": 3,
    "image": "images/petwear/strawberry-plushie-rider.webp"
  },
  {
    "id": "eggs-river",
    "name": "River",
    "category": "eggs",
    "value": 0.28,
    "demand": 1,
    "image": "images/eggs/river.webp"
  },
  {
    "id": "petwear-heart-hat",
    "name": "Heart Hat",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/heart-hat.webp"
  },
  {
    "id": "strollers-car-stroller",
    "name": "Car Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "vehicles-snowblower-toboggan",
    "name": "Snowblower Toboggan",
    "category": "vehicles",
    "value": 0.315,
    "demand": 1,
    "image": "images/vehicles/snowblower-toboggan.webp"
  },
  {
    "id": "pets-bali-starling",
    "name": "Bali Starling",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/bali-starling.webp"
  },
  {
    "id": "pets-rooster",
    "name": "Rooster",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/rooster.webp"
  },
  {
    "id": "vehicles-gold-snowboard",
    "name": "Gold Snowboard",
    "category": "vehicles",
    "value": 3.85,
    "demand": 1,
    "image": "images/vehicles/gold-snowboard.webp"
  },
  {
    "id": "vehicles-hovertible",
    "name": "Hovertible",
    "category": "vehicles",
    "value": 0.21,
    "demand": 1,
    "image": "images/vehicles/hovertible.webp"
  },
  {
    "id": "strollers-iced-cake-stroller",
    "name": "Iced Cake Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-bandicoot",
    "name": "Bandicoot",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/bandicoot.webp"
  },
  {
    "id": "petwear-santa-hat",
    "name": "Santa Hat",
    "category": "petwear",
    "value": 1.225,
    "demand": 2,
    "image": "images/petwear/santa-hat.webp"
  },
  {
    "id": "petwear-black-hightops",
    "name": "Black Hightops",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/black-hightops.webp"
  },
  {
    "id": "pets-queen-bee",
    "name": "Queen Bee",
    "category": "pets",
    "value": 0.875,
    "demand": 2,
    "image": "images/pets/queen-bee.webp"
  },
  {
    "id": "petwear-eco-brown-earthwizard-hat",
    "name": "Eco Brown Earth-Wizard Hat",
    "category": "petwear",
    "value": 0.7,
    "demand": 2,
    "image": "images/petwear/eco-brown-earth-wizard-hat.webp"
  },
  {
    "id": "pets-royal-palace-spaniel",
    "name": "Royal Palace Spaniel",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/royal-palace-spaniel.webp"
  },
  {
    "id": "pets-magpie",
    "name": "Magpie",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/magpie.webp"
  },
  {
    "id": "food-dim-sum",
    "name": "Dim Sum",
    "category": "food",
    "value": 1.925,
    "demand": 2,
    "image": "images/food/dim-sum.webp"
  },
  {
    "id": "pets-st-bernard",
    "name": "St Bernard",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/st-bernard.webp"
  },
  {
    "id": "pets-bird-of-paradise",
    "name": "Bird of Paradise",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/bird-of-paradise.webp"
  },
  {
    "id": "petwear-pirate-hat-friend",
    "name": "Pirate Hat & Friend",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/pirate-hat-friend.webp"
  },
  {
    "id": "pets-spider-crab",
    "name": "Spider Crab",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/spider-crab.webp"
  },
  {
    "id": "toys-dance-arcade-stand",
    "name": "Dance Arcade Stand",
    "category": "toys",
    "value": 0.42,
    "demand": 1,
    "image": "images/toys/dance-arcade-stand.webp"
  },
  {
    "id": "petwear-love-letter",
    "name": "Love Letter",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/love-letter.webp"
  },
  {
    "id": "pets-amber-butterfly",
    "name": "Amber Butterfly",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/amber-butterfly.webp"
  },
  {
    "id": "vehicles-ketchup-and-mustard-jetpack",
    "name": "Ketchup and Mustard Jetpack",
    "category": "vehicles",
    "value": 0.84,
    "demand": 2,
    "image": "images/vehicles/ketchup-and-mustard-jetpack.webp"
  },
  {
    "id": "gifts-standard-chest",
    "name": "Standard Chest",
    "category": "gifts",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-butter-knife",
    "name": "Butter Knife",
    "category": "petwear",
    "value": 0.42,
    "demand": 2,
    "image": "images/petwear/butter-knife.webp"
  },
  {
    "id": "vehicles-axel",
    "name": "Axel",
    "category": "vehicles",
    "value": 0.315,
    "demand": 1,
    "image": "images/vehicles/axel.webp"
  },
  {
    "id": "pets-partridge",
    "name": "Partridge",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/partridge.webp"
  },
  {
    "id": "pets-headless-horse",
    "name": "Headless Horse",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/headless-horse.webp"
  },
  {
    "id": "pets-scarecrow-cat",
    "name": "Scarecrow Cat",
    "category": "pets",
    "value": 0.4375,
    "demand": 2,
    "image": "images/pets/scarecrow-cat.webp"
  },
  {
    "id": "petwear-ssbd-sunnies",
    "name": "SSBD Sunnies",
    "category": "petwear",
    "value": 59.5,
    "demand": 3,
    "image": "images/petwear/ssbd-sunnies.webp"
  },
  {
    "id": "eggs-moon-egg",
    "name": "Moon Egg",
    "category": "eggs",
    "value": 0.0649,
    "demand": 1,
    "image": "images/eggs/moon-egg.webp"
  },
  {
    "id": "petwear-fishbowl-hat",
    "name": "Fishbowl Hat",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/fishbowl-hat.webp"
  },
  {
    "id": "strollers-airplane-stroller",
    "name": "Airplane Stroller",
    "category": "strollers",
    "value": 0.35,
    "demand": 3,
    "image": ""
  },
  {
    "id": "stickers-blazing-lion-animated-sticker",
    "name": "Blazing Lion Animated Sticker",
    "category": "stickers",
    "value": 2.1,
    "demand": 2,
    "image": "images/stickers/blazing-lion-animated-sticker.webp"
  },
  {
    "id": "pets-rose-dragon",
    "name": "Rose Dragon",
    "category": "pets",
    "value": 1.225,
    "demand": 2,
    "image": "images/pets/rose-dragon.webp"
  },
  {
    "id": "pets-black-panther",
    "name": "Black Panther",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/black-panther.webp"
  },
  {
    "id": "stickers-super-saru-animated-sticker",
    "name": "Super Saru Animated Sticker",
    "category": "stickers",
    "value": 0.7,
    "demand": 2,
    "image": "images/stickers/super-saru-animated-sticker.webp"
  },
  {
    "id": "pets-velocirooster",
    "name": "Velocirooster",
    "category": "pets",
    "value": 3.325,
    "demand": 2,
    "image": "images/pets/velocirooster.webp"
  },
  {
    "id": "pets-orchid-butterfly",
    "name": "Orchid Butterfly",
    "category": "pets",
    "value": 39.55,
    "demand": 3,
    "image": "images/pets/orchid-butterfly.webp"
  },
  {
    "id": "pets-bunny",
    "name": "Bunny",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/bunny.webp"
  },
  {
    "id": "vehicles-prince-carriage",
    "name": "Prince Carriage",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/prince-carriage.webp"
  },
  {
    "id": "vehicles-latte-motorcycle",
    "name": "Latte Motorcycle",
    "category": "vehicles",
    "value": 0.105,
    "demand": 1,
    "image": "images/vehicles/latte-motorcycle.webp"
  },
  {
    "id": "pets-honey-badger",
    "name": "Honey Badger",
    "category": "pets",
    "value": 1.82,
    "demand": 2,
    "image": "images/pets/honey-badger.webp"
  },
  {
    "id": "pets-polar-bear",
    "name": "Polar Bear",
    "category": "pets",
    "value": 1.75,
    "demand": 2,
    "image": "images/pets/polar-bear.webp"
  },
  {
    "id": "pets-tree-sasquatch",
    "name": "Tree Sasquatch",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/tree-sasquatch.webp"
  },
  {
    "id": "pets-eggnog-hare",
    "name": "Eggnog Hare",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/eggnog-hare.webp"
  },
  {
    "id": "pets-bauble-buddies",
    "name": "Bauble Buddies",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/bauble-buddies.webp"
  },
  {
    "id": "strollers-kangaroo-stroller",
    "name": "Kangaroo Stroller",
    "category": "strollers",
    "value": 0.2512,
    "demand": 1,
    "image": "images/strollers/kangaroo-stroller.webp"
  },
  {
    "id": "vehicles-cupids-coupe",
    "name": "Cupid's Coupe",
    "category": "vehicles",
    "value": 0.56,
    "demand": 1,
    "image": "images/vehicles/cupid-s-coupe.webp"
  },
  {
    "id": "food-golden-seed-ball",
    "name": "Golden Seed Ball",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-seed-ball.webp"
  },
  {
    "id": "stickers-elephant-sticker",
    "name": "Elephant Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/elephant-sticker.webp"
  },
  {
    "id": "toys-caticorn-rattle",
    "name": "Caticorn Rattle",
    "category": "toys",
    "value": 0.21,
    "demand": 1,
    "image": "images/toys/caticorn-rattle.webp"
  },
  {
    "id": "pets-axolotl",
    "name": "Axolotl",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/axolotl.webp"
  },
  {
    "id": "toys-sunrise-hang-glider",
    "name": "Sunrise Hang Glider",
    "category": "toys",
    "value": 0.875,
    "demand": 2,
    "image": "images/toys/sunrise-hang-glider.webp"
  },
  {
    "id": "pets-dog",
    "name": "Dog",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/dog.webp"
  },
  {
    "id": "pets-ghost",
    "name": "Ghost",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/ghost.webp"
  },
  {
    "id": "strollers-throne-stroller",
    "name": "Throne Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-owl",
    "name": "Owl",
    "category": "pets",
    "value": 91.7,
    "demand": 3,
    "image": "images/pets/owl.webp"
  },
  {
    "id": "strollers-dog-house-stroller",
    "name": "Dog House Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-halloween-golden-mummy-cat",
    "name": "Halloween Golden Mummy Cat",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/halloween-golden-mummy-cat.webp"
  },
  {
    "id": "eggs-pistachio",
    "name": "Pistachio",
    "category": "eggs",
    "value": 0.28,
    "demand": 1,
    "image": "images/eggs/pistachio.webp"
  },
  {
    "id": "pets-hare",
    "name": "Hare",
    "category": "pets",
    "value": 1.505,
    "demand": 2,
    "image": "images/pets/hare.webp"
  },
  {
    "id": "toys-classic-trade-stand",
    "name": "Classic Trade Stand",
    "category": "toys",
    "value": 0.35,
    "demand": 2,
    "image": "images/toys/classic-trade-stand.webp"
  },
  {
    "id": "potions-potion",
    "name": "Fly Potion",
    "category": "potions",
    "value": 0.73,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-turtle-doves",
    "name": "Turtle Doves",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/turtle-doves.webp"
  },
  {
    "id": "food-snapdragon-flower",
    "name": "Snapdragon Flower",
    "category": "food",
    "value": 0.07,
    "demand": 1,
    "image": "images/food/snapdragon-flower.webp"
  },
  {
    "id": "pets-blue-ringed-octopus",
    "name": "Blue Ringed Octopus",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/blue-ringed-octopus.webp"
  },
  {
    "id": "pets-kookaburra",
    "name": "Kookaburra",
    "category": "pets",
    "value": 1.085,
    "demand": 2,
    "image": "images/pets/kookaburra.webp"
  },
  {
    "id": "strollers-drone-stroller",
    "name": "Drone Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-mosquito",
    "name": "Mosquito",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/mosquito.webp"
  },
  {
    "id": "pets-scarecrow",
    "name": "Scarecrow",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/scarecrow.webp"
  },
  {
    "id": "pets-lunar-ox",
    "name": "Lunar Ox",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/lunar-ox.webp"
  },
  {
    "id": "pets-siamese-cat",
    "name": "Siamese Cat",
    "category": "pets",
    "value": 8.575,
    "demand": 3,
    "image": "images/pets/siamese-cat.webp"
  },
  {
    "id": "pets-peacock",
    "name": "Peacock",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/peacock.webp"
  },
  {
    "id": "food-golden-lettuce",
    "name": "Golden Lettuce",
    "category": "food",
    "value": 1.225,
    "demand": 2,
    "image": "images/food/golden-lettuce.webp"
  },
  {
    "id": "food-winter-deer-bait",
    "name": "Winter Deer Bait",
    "category": "food",
    "value": 0.07,
    "demand": 1,
    "image": "images/food/winter-deer-bait.webp"
  },
  {
    "id": "pets-bison",
    "name": "Bison",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/bison.webp"
  },
  {
    "id": "pets-villain-gibbon",
    "name": "Villain Gibbon",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/villain-gibbon.webp"
  },
  {
    "id": "toys-netzooka",
    "name": "Netzooka",
    "category": "toys",
    "value": 0.35,
    "demand": 1,
    "image": "images/toys/netzooka.webp"
  },
  {
    "id": "food-golden-goldfish",
    "name": "Golden Goldfish",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-goldfish.webp"
  },
  {
    "id": "pets-shetland-pony-light-brown",
    "name": "Shetland Pony Light Brown",
    "category": "pets",
    "value": 0.63,
    "demand": 1,
    "image": "images/pets/shetland-pony-light-brown.webp"
  },
  {
    "id": "toys-easter-bunny-plush",
    "name": "Easter Bunny Plush",
    "category": "toys",
    "value": 0.28,
    "demand": 1,
    "image": "images/toys/easter-bunny-plush.webp"
  },
  {
    "id": "stickers-wet-owl-sticker",
    "name": "Wet Owl Sticker",
    "category": "stickers",
    "value": 0.245,
    "demand": 2,
    "image": "images/stickers/wet-owl-sticker.webp"
  },
  {
    "id": "pets-weevil",
    "name": "Weevil",
    "category": "pets",
    "value": 0.2975,
    "demand": 1,
    "image": "images/pets/weevil.webp"
  },
  {
    "id": "stickers-state-fair-sticker-pack",
    "name": "State Fair Sticker Pack",
    "category": "stickers",
    "value": 0.035,
    "demand": 1,
    "image": "images/stickers/state-fair-sticker-pack.webp"
  },
  {
    "id": "pets-golden-chowchow",
    "name": "Golden Chow-Chow",
    "category": "pets",
    "value": 0.91,
    "demand": 2,
    "image": "images/pets/golden-chow-chow.webp"
  },
  {
    "id": "pets-alicorn",
    "name": "Alicorn",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/alicorn.webp"
  },
  {
    "id": "stickers-pelican-sticker",
    "name": "Pelican Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/pelican-sticker.webp"
  },
  {
    "id": "pets-billy-goat",
    "name": "Billy Goat",
    "category": "pets",
    "value": 0.49,
    "demand": 1,
    "image": "images/pets/billy-goat.webp"
  },
  {
    "id": "toys-turkey-plush",
    "name": "Turkey Plush",
    "category": "toys",
    "value": 0.175,
    "demand": 1,
    "image": "images/toys/turkey-plush.webp"
  },
  {
    "id": "pets-blue-butterfly",
    "name": "Blue Butterfly",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/blue-butterfly.webp"
  },
  {
    "id": "eggs-mythic-egg",
    "name": "Mythic Egg",
    "category": "eggs",
    "value": 0.2366,
    "demand": 2,
    "image": "images/eggs/mythic-egg.webp"
  },
  {
    "id": "pets-gecko",
    "name": "Gecko",
    "category": "pets",
    "value": 0.4725,
    "demand": 1,
    "image": "images/pets/gecko.webp"
  },
  {
    "id": "pets-choco-penguin",
    "name": "Choco Penguin",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/choco-penguin.webp"
  },
  {
    "id": "gifts-small-gift",
    "name": "Small Gift",
    "category": "gifts",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-hover-stroller",
    "name": "Hover Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-violet-friend",
    "name": "Violet Friend",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/violet-friend.webp"
  },
  {
    "id": "pets-german-shepherd",
    "name": "German Shepherd",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/german-shepherd.webp"
  },
  {
    "id": "pets-walrus",
    "name": "Walrus",
    "category": "pets",
    "value": 0.2975,
    "demand": 1,
    "image": "images/pets/walrus.webp"
  },
  {
    "id": "petwear-red-yellow-beads",
    "name": "Red & Yellow Beads",
    "category": "petwear",
    "value": 0.07,
    "demand": 1,
    "image": "images/petwear/red-yellow-beads.webp"
  },
  {
    "id": "vehicles-blue-skateboard",
    "name": "Blue Skateboard",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/blue-skateboard.webp"
  },
  {
    "id": "strollers-reindeer-stroller",
    "name": "Reindeer Stroller",
    "category": "strollers",
    "value": 0.1297,
    "demand": 1,
    "image": "images/strollers/reindeer-stroller.webp"
  },
  {
    "id": "petwear-buzzing-honeypot-hat",
    "name": "Buzzing Honeypot Hat",
    "category": "petwear",
    "value": 115.5,
    "demand": 2,
    "image": "images/petwear/buzzing-honeypot-hat.webp"
  },
  {
    "id": "pets-bush-elephant",
    "name": "Bush Elephant",
    "category": "pets",
    "value": 7.35,
    "demand": 3,
    "image": "images/pets/bush-elephant.webp"
  },
  {
    "id": "pets-angelfish",
    "name": "Angelfish",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/angelfish.webp"
  },
  {
    "id": "pets-wren",
    "name": "Wren",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/wren.webp"
  },
  {
    "id": "pets-undead-jousting-horse",
    "name": "Undead Jousting Horse",
    "category": "pets",
    "value": 22.75,
    "demand": 3,
    "image": "images/pets/undead-jousting-horse.webp"
  },
  {
    "id": "strollers-duck-stroller",
    "name": "Duck Stroller",
    "category": "strollers",
    "value": 0.7609,
    "demand": 2,
    "image": "images/strollers/duck-stroller.webp"
  },
  {
    "id": "pets-albatross",
    "name": "Albatross",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/albatross.webp"
  },
  {
    "id": "pets-gecko-ducky",
    "name": "Gecko Ducky",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/gecko-ducky.webp"
  },
  {
    "id": "petwear-venus-flytrap-hat",
    "name": "Venus Flytrap Hat",
    "category": "petwear",
    "value": 0.315,
    "demand": 1,
    "image": "images/petwear/venus-flytrap-hat.webp"
  },
  {
    "id": "vehicles-egg-delivery-machine",
    "name": "Egg Delivery Machine",
    "category": "vehicles",
    "value": 0.28,
    "demand": 1,
    "image": "images/vehicles/egg-delivery-machine.webp"
  },
  {
    "id": "pets-swordfish",
    "name": "Swordfish",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/swordfish.webp"
  },
  {
    "id": "petwear-alien-eyes-hat",
    "name": "Alien Eyes Hat",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/alien-eyes-hat.webp"
  },
  {
    "id": "petwear-flower-monocle",
    "name": "Flower Monocle",
    "category": "petwear",
    "value": 0.35,
    "demand": 1,
    "image": "images/petwear/flower-monocle.webp"
  },
  {
    "id": "vehicles-black-snowboard",
    "name": "Black Snowboard",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/black-snowboard.webp"
  },
  {
    "id": "pets-glormy-crab",
    "name": "Glormy Crab",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/glormy-crab.webp"
  },
  {
    "id": "toys-money-rattle",
    "name": "Money Rattle",
    "category": "toys",
    "value": 0.175,
    "demand": 1,
    "image": "images/toys/money-rattle.webp"
  },
  {
    "id": "pets-ox",
    "name": "Ox",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/ox.webp"
  },
  {
    "id": "vehicles-monocycle",
    "name": "Monocycle",
    "category": "vehicles",
    "value": 0.7,
    "demand": 1,
    "image": "images/vehicles/monocycle.webp"
  },
  {
    "id": "pets-diamond-butterfly",
    "name": "Diamond Butterfly",
    "category": "pets",
    "value": 23.8,
    "demand": 3,
    "image": "images/pets/diamond-butterfly.webp"
  },
  {
    "id": "pets-english-sheepdog",
    "name": "English Sheepdog",
    "category": "pets",
    "value": 0.595,
    "demand": 2,
    "image": "images/pets/english-sheepdog.webp"
  },
  {
    "id": "pets-angler-fish",
    "name": "Angler Fish",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/angler-fish.webp"
  },
  {
    "id": "petwear-respectful-mustache",
    "name": "Respectful Mustache",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/respectful-mustache.webp"
  },
  {
    "id": "petwear-easter-egg-friends",
    "name": "Easter Egg Friends",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/easter-egg-friends.webp"
  },
  {
    "id": "strollers-triple-stroller",
    "name": "Triple Stroller",
    "category": "strollers",
    "value": 0.0838,
    "demand": 1,
    "image": "images/strollers/triple-stroller.webp"
  },
  {
    "id": "pets-white-choccybunny",
    "name": "White Choccybunny",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/white-choccybunny.webp"
  },
  {
    "id": "vehicles-doge-scooter",
    "name": "Doge Scooter",
    "category": "vehicles",
    "value": 0.7,
    "demand": 1,
    "image": "images/vehicles/doge-scooter.webp"
  },
  {
    "id": "toys-heart-rattle",
    "name": "Heart Rattle",
    "category": "toys",
    "value": 1.4,
    "demand": 2,
    "image": "images/toys/heart-rattle.webp"
  },
  {
    "id": "vehicles-fossil-paw-helicopter",
    "name": "Fossil Paw Helicopter",
    "category": "vehicles",
    "value": 0.35,
    "demand": 1,
    "image": "images/vehicles/fossil-paw-helicopter.webp"
  },
  {
    "id": "pets-general-sheepdog",
    "name": "General Sheepdog",
    "category": "pets",
    "value": 0.525,
    "demand": 2,
    "image": "images/pets/general-sheepdog.webp"
  },
  {
    "id": "pets-chick",
    "name": "Chick",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/chick.webp"
  },
  {
    "id": "petwear-bready-necklace",
    "name": "Bready Necklace",
    "category": "petwear",
    "value": 0.7,
    "demand": 2,
    "image": "images/petwear/bready-necklace.webp"
  },
  {
    "id": "vehicles-rgb-monster-truck",
    "name": "RGB Monster Truck",
    "category": "vehicles",
    "value": 0.14,
    "demand": 1,
    "image": "images/vehicles/rgb-monster-truck.webp"
  },
  {
    "id": "stickers-african-painted-dog-sticker",
    "name": "African Painted Dog Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/african-painted-dog-sticker.webp"
  },
  {
    "id": "pets-moonbeam-butterfly",
    "name": "Moonbeam Butterfly",
    "category": "pets",
    "value": 0.875,
    "demand": 2,
    "image": "images/pets/moonbeam-butterfly.webp"
  },
  {
    "id": "pets-mirai-moth",
    "name": "Mirai Moth",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/mirai-moth.webp"
  },
  {
    "id": "pets-starfish",
    "name": "Starfish",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/starfish.webp"
  },
  {
    "id": "petwear-hero-mask",
    "name": "Hero Mask",
    "category": "petwear",
    "value": 0.42,
    "demand": 1,
    "image": "images/petwear/hero-mask.webp"
  },
  {
    "id": "stickers-mermicorn-animated-sticker",
    "name": "Mermicorn Animated Sticker",
    "category": "stickers",
    "value": 0.63,
    "demand": 2,
    "image": "images/stickers/mermicorn-animated-sticker.webp"
  },
  {
    "id": "petwear-jetpack",
    "name": "Jetpack",
    "category": "petwear",
    "value": 0.315,
    "demand": 1,
    "image": "images/petwear/jetpack.webp"
  },
  {
    "id": "pets-balloon-unicorn",
    "name": "Balloon Unicorn",
    "category": "pets",
    "value": 63.0,
    "demand": 3,
    "image": "images/pets/balloon-unicorn.webp"
  },
  {
    "id": "vehicles-shadow-rider",
    "name": "Shadow Rider",
    "category": "vehicles",
    "value": 0.385,
    "demand": 1,
    "image": "images/vehicles/shadow-rider.webp"
  },
  {
    "id": "petwear-mystic-wing-crown",
    "name": "Mystic Wing Crown",
    "category": "petwear",
    "value": 0.105,
    "demand": 1,
    "image": "images/petwear/mystic-wing-crown.webp"
  },
  {
    "id": "toys-cherry-blossom-hang-glider",
    "name": "Cherry Blossom Hang Glider",
    "category": "toys",
    "value": 2.52,
    "demand": 2,
    "image": "images/toys/cherry-blossom-hang-glider.webp"
  },
  {
    "id": "petwear-summer-straw-hat",
    "name": "Summer Straw Hat",
    "category": "petwear",
    "value": 0.245,
    "demand": 1,
    "image": "images/petwear/summer-straw-hat.webp"
  },
  {
    "id": "toys-heart-plushie",
    "name": "Heart Plushie",
    "category": "toys",
    "value": 0.175,
    "demand": 1,
    "image": "images/toys/heart-plushie.webp"
  },
  {
    "id": "eggs-christmas-egg",
    "name": "Christmas Egg",
    "category": "eggs",
    "value": 7.0,
    "demand": 2,
    "image": "images/eggs/christmas-egg.webp"
  },
  {
    "id": "strollers-wheelbarrow-stroller",
    "name": "Wheelbarrow Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "strollers-pelican-stroller",
    "name": "Pelican Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "petwear-spring-bunny-feet",
    "name": "Spring Bunny Feet",
    "category": "petwear",
    "value": 1.12,
    "demand": 2,
    "image": "images/petwear/spring-bunny-feet.webp"
  },
  {
    "id": "toys-strawberry-toast-flying-disc",
    "name": "Strawberry Toast Flying Disc",
    "category": "toys",
    "value": 0.14,
    "demand": 1,
    "image": "images/toys/strawberry-toast-flying-disc.webp"
  },
  {
    "id": "pets-emperor-shrimp",
    "name": "Emperor Shrimp",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/emperor-shrimp.webp"
  },
  {
    "id": "strollers-catapult-stroller",
    "name": "Catapult Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-milk-choccybunny",
    "name": "Milk Choccybunny",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/milk-choccybunny.webp"
  },
  {
    "id": "gifts-duckling-box",
    "name": "Duckling Box",
    "category": "gifts",
    "value": 0.5816,
    "demand": 2,
    "image": "images/gifts/duckling-box.webp"
  },
  {
    "id": "pets-skunk",
    "name": "Skunk",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/skunk.webp"
  },
  {
    "id": "pets-black-dog",
    "name": "Black Dog",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/black-dog.webp"
  },
  {
    "id": "petwear-rotating-periscope",
    "name": "Rotating Periscope",
    "category": "petwear",
    "value": 0.105,
    "demand": 1,
    "image": "images/petwear/rotating-periscope.webp"
  },
  {
    "id": "pets-frost-phoenix",
    "name": "Frost Phoenix",
    "category": "pets",
    "value": 0.77,
    "demand": 2,
    "image": "images/pets/frost-phoenix.webp"
  },
  {
    "id": "pets-temple-friend",
    "name": "Temple Friend",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/temple-friend.webp"
  },
  {
    "id": "pets-munchkin-cat",
    "name": "Munchkin Cat",
    "category": "pets",
    "value": 3.85,
    "demand": 3,
    "image": "images/pets/munchkin-cat.webp"
  },
  {
    "id": "petwear-aviator-hat",
    "name": "Aviator Hat",
    "category": "petwear",
    "value": 0.455,
    "demand": 2,
    "image": "images/petwear/aviator-hat.webp"
  },
  {
    "id": "pets-red-panda",
    "name": "Red Panda",
    "category": "pets",
    "value": 0.2275,
    "demand": 1,
    "image": "images/pets/red-panda.webp"
  },
  {
    "id": "pets-ranger-beaver",
    "name": "Ranger Beaver",
    "category": "pets",
    "value": 0.49,
    "demand": 2,
    "image": "images/pets/ranger-beaver.webp"
  },
  {
    "id": "stickers-fairy-bat-dragon-sticker",
    "name": "Fairy Bat Dragon Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/fairy-bat-dragon-sticker.webp"
  },
  {
    "id": "toys-unicorn-plush",
    "name": "Unicorn Plush",
    "category": "toys",
    "value": 1.225,
    "demand": 2,
    "image": "images/toys/unicorn-plush.webp"
  },
  {
    "id": "pets-evil-rock",
    "name": "Evil Rock",
    "category": "pets",
    "value": 0.56,
    "demand": 2,
    "image": "images/pets/evil-rock.webp"
  },
  {
    "id": "pets-tasmanian-devil",
    "name": "Tasmanian Devil",
    "category": "pets",
    "value": 0.4725,
    "demand": 2,
    "image": "images/pets/tasmanian-devil.webp"
  },
  {
    "id": "petwear-chick-hat",
    "name": "Chick Hat",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/chick-hat.webp"
  },
  {
    "id": "pets-parakeet",
    "name": "Parakeet",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/parakeet.webp"
  },
  {
    "id": "petwear-toaster-hat",
    "name": "Toaster Hat",
    "category": "petwear",
    "value": 4.55,
    "demand": 3,
    "image": "images/petwear/toaster-hat.webp"
  },
  {
    "id": "vehicles-cupcake-scooter",
    "name": "Cupcake Scooter",
    "category": "vehicles",
    "value": 0.7,
    "demand": 1,
    "image": "images/vehicles/cupcake-scooter.webp"
  },
  {
    "id": "pets-chameleon",
    "name": "Chameleon",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/chameleon.webp"
  },
  {
    "id": "petwear-volcanic-boots",
    "name": "Volcanic Boots",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/volcanic-boots.webp"
  },
  {
    "id": "toys-tropical-surge-paint",
    "name": "Tropical Surge Mega Neon Paint",
    "category": "toys",
    "value": 0.28,
    "demand": 3,
    "image": "images/toys/tropical-surge-mega-neon-paint.webp"
  },
  {
    "id": "pets-winter-doe",
    "name": "Winter Doe",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/winter-doe.webp"
  },
  {
    "id": "pets-bee",
    "name": "Bee",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/bee.webp"
  },
  {
    "id": "strollers-crate-stroller",
    "name": "Crate Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-donkey",
    "name": "Donkey",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/donkey.webp"
  },
  {
    "id": "stickers-flamingo-sticker",
    "name": "Flamingo Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/flamingo-sticker.webp"
  },
  {
    "id": "pets-drake",
    "name": "Drake",
    "category": "pets",
    "value": 0.63,
    "demand": 2,
    "image": "images/pets/drake.webp"
  },
  {
    "id": "gifts-standard-gibbon-box",
    "name": "Standard Gibbon Box",
    "category": "gifts",
    "value": 0.0853,
    "demand": 1,
    "image": "images/gifts/standard-gibbon-box.webp"
  },
  {
    "id": "petwear-burger-bun-hat",
    "name": "Burger Bun Hat",
    "category": "petwear",
    "value": 0.21,
    "demand": 2,
    "image": "images/petwear/burger-bun-hat.webp"
  },
  {
    "id": "pets-vampire-dragon",
    "name": "Vampire Dragon",
    "category": "pets",
    "value": 3.85,
    "demand": 3,
    "image": "images/pets/vampire-dragon.webp"
  },
  {
    "id": "pets-blackchested-pheasant",
    "name": "Black-Chested Pheasant",
    "category": "pets",
    "value": 5.6,
    "demand": 2,
    "image": "images/pets/black-chested-pheasant.webp"
  },
  {
    "id": "pets-sea-turtle",
    "name": "Sea Turtle",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/sea-turtle.webp"
  },
  {
    "id": "pets-glacier-kitsune",
    "name": "Glacier Kitsune",
    "category": "pets",
    "value": 1.61,
    "demand": 2,
    "image": "images/pets/glacier-kitsune.webp"
  },
  {
    "id": "pets-ringmaster-gibbon",
    "name": "Ringmaster Gibbon",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/ringmaster-gibbon.webp"
  },
  {
    "id": "food-patterns-egg",
    "name": "Patterns Egg",
    "category": "food",
    "value": 0.21,
    "demand": 1,
    "image": "images/food/patterns-egg.webp"
  },
  {
    "id": "vehicles-husky-sled",
    "name": "Husky Sled",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/husky-sled.webp"
  },
  {
    "id": "strollers-meadow-barrow-stroller",
    "name": "Meadow Barrow Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-lunar-tiger",
    "name": "Lunar Tiger",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/lunar-tiger.webp"
  },
  {
    "id": "food-broken-egg",
    "name": "Broken Egg",
    "category": "food",
    "value": 0.91,
    "demand": 1,
    "image": "images/food/broken-egg.webp"
  },
  {
    "id": "pets-diamond-hamster",
    "name": "Diamond Hamster",
    "category": "pets",
    "value": 1.05,
    "demand": 2,
    "image": "images/pets/diamond-hamster.webp"
  },
  {
    "id": "gifts-golden-mistletoe",
    "name": "Golden Mistletoe",
    "category": "gifts",
    "value": 1.4,
    "demand": 2,
    "image": "images/gifts/golden-mistletoe.webp"
  },
  {
    "id": "pets-cat",
    "name": "Cat",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/cat.webp"
  },
  {
    "id": "toys-glider",
    "name": "Glider",
    "category": "toys",
    "value": 0.91,
    "demand": 2,
    "image": "images/toys/glider.webp"
  },
  {
    "id": "potions-sugar-skull-potion",
    "name": "Sugar Skull Potion",
    "category": "potions",
    "value": 1.43,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-metal-ox",
    "name": "Metal Ox",
    "category": "pets",
    "value": 0.42,
    "demand": 1,
    "image": "images/pets/metal-ox.webp"
  },
  {
    "id": "vehicles-duck-scooter",
    "name": "Duck Scooter",
    "category": "vehicles",
    "value": 0.42,
    "demand": 1,
    "image": "images/vehicles/duck-scooter.webp"
  },
  {
    "id": "pets-sunrise-duckling",
    "name": "Sunrise Duckling",
    "category": "pets",
    "value": 0.525,
    "demand": 1,
    "image": "images/pets/sunrise-duckling.webp"
  },
  {
    "id": "vehicles-monomoped",
    "name": "Mono-Moped",
    "category": "vehicles",
    "value": 2.1,
    "demand": 2,
    "image": "images/vehicles/mono-moped.webp"
  },
  {
    "id": "eggs-royal-desert-egg",
    "name": "Royal Desert Egg",
    "category": "eggs",
    "value": 0.5713,
    "demand": 2,
    "image": "images/eggs/royal-desert-egg.webp"
  },
  {
    "id": "petwear-pancake-stack",
    "name": "Pancake Stack",
    "category": "petwear",
    "value": 1.75,
    "demand": 2,
    "image": "images/petwear/pancake-stack.webp"
  },
  {
    "id": "pets-fennec-fox",
    "name": "Fennec Fox",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/fennec-fox.webp"
  },
  {
    "id": "pets-mini-pig",
    "name": "Mini Pig",
    "category": "pets",
    "value": 16.275,
    "demand": 3,
    "image": "images/pets/mini-pig.webp"
  },
  {
    "id": "pets-moonpine",
    "name": "Moonpine",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/moonpine.webp"
  },
  {
    "id": "gifts-rgb-reward-box",
    "name": "RGB Reward Box",
    "category": "gifts",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-cold-cube",
    "name": "Cold Cube",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/cold-cube.webp"
  },
  {
    "id": "pets-peachick",
    "name": "Peachick",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/peachick.webp"
  },
  {
    "id": "eggs-dylan",
    "name": "Dylan",
    "category": "eggs",
    "value": 0.28,
    "demand": 1,
    "image": "images/eggs/dylan.webp"
  },
  {
    "id": "pets-fire-stallion",
    "name": "Fire Stallion",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/fire-stallion.webp"
  },
  {
    "id": "pets-shih-tzu",
    "name": "Shih Tzu",
    "category": "pets",
    "value": 0.21,
    "demand": 1,
    "image": "images/pets/shih-tzu.webp"
  },
  {
    "id": "eggs-endangered-egg",
    "name": "Endangered Egg",
    "category": "eggs",
    "value": 0.0286,
    "demand": 1,
    "image": "images/eggs/endangered-egg.webp"
  },
  {
    "id": "petwear-glamicorn-purse-pet",
    "name": "Glamicorn Purse Pet",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/glamicorn-purse-pet.webp"
  },
  {
    "id": "eggs-danger-egg",
    "name": "Danger Egg",
    "category": "eggs",
    "value": 0.4481,
    "demand": 2,
    "image": "images/eggs/danger-egg.webp"
  },
  {
    "id": "pets-merhorse",
    "name": "Merhorse",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/merhorse.webp"
  },
  {
    "id": "pets-gingerbread-hare",
    "name": "Gingerbread Hare",
    "category": "pets",
    "value": 0.35,
    "demand": 1,
    "image": "images/pets/gingerbread-hare.webp"
  },
  {
    "id": "petwear-eaten-donut",
    "name": "Eaten Donut",
    "category": "petwear",
    "value": 0.14,
    "demand": 1,
    "image": "images/petwear/eaten-donut.webp"
  },
  {
    "id": "petwear-grinder-hat",
    "name": "Grinder Hat",
    "category": "petwear",
    "value": 0.21,
    "demand": 1,
    "image": "images/petwear/grinder-hat.webp"
  },
  {
    "id": "pets-shark",
    "name": "Shark",
    "category": "pets",
    "value": 0.735,
    "demand": 2,
    "image": "images/pets/shark.webp"
  },
  {
    "id": "vehicles-doge-skateboard",
    "name": "Doge Skateboard",
    "category": "vehicles",
    "value": 0.56,
    "demand": 1,
    "image": "images/vehicles/doge-skateboard.webp"
  },
  {
    "id": "eggs-southeast-asia-egg",
    "name": "Southeast Asia Egg",
    "category": "eggs",
    "value": 0.2647,
    "demand": 2,
    "image": "images/eggs/southeast-asia-egg.webp"
  },
  {
    "id": "pets-lava-dragon",
    "name": "Lava Dragon",
    "category": "pets",
    "value": 1.925,
    "demand": 2,
    "image": "images/pets/lava-dragon.webp"
  },
  {
    "id": "food-baked-alaska-bait",
    "name": "Baked Alaska Bait",
    "category": "food",
    "value": 0.7,
    "demand": 2,
    "image": "images/food/baked-alaska-bait.webp"
  },
  {
    "id": "vehicles-street-drifter",
    "name": "Street Drifter",
    "category": "vehicles",
    "value": 0.56,
    "demand": 1,
    "image": "images/vehicles/street-drifter.webp"
  },
  {
    "id": "pets-brownchested-pheasant",
    "name": "Brown-Chested Pheasant",
    "category": "pets",
    "value": 0.385,
    "demand": 1,
    "image": "images/pets/brown-chested-pheasant.webp"
  },
  {
    "id": "pets-wolf",
    "name": "Wolf",
    "category": "pets",
    "value": 0.4375,
    "demand": 1,
    "image": "images/pets/wolf.webp"
  },
  {
    "id": "pets-mechapup",
    "name": "Mechapup",
    "category": "pets",
    "value": 5.95,
    "demand": 2,
    "image": "images/pets/mechapup.webp"
  },
  {
    "id": "vehicles-glass-skateboard",
    "name": "Glass Skateboard",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/glass-skateboard.webp"
  },
  {
    "id": "pets-kirin",
    "name": "Kirin",
    "category": "pets",
    "value": 0.315,
    "demand": 1,
    "image": "images/pets/kirin.webp"
  },
  {
    "id": "petwear-sandwich-hat",
    "name": "Sandwich Hat",
    "category": "petwear",
    "value": 1.05,
    "demand": 2,
    "image": "images/petwear/sandwich-hat.webp"
  },
  {
    "id": "stickers-shark-puppy-sticker",
    "name": "Shark Puppy Sticker",
    "category": "stickers",
    "value": 0.14,
    "demand": 1,
    "image": "images/stickers/shark-puppy-sticker.webp"
  },
  {
    "id": "vehicles-bethink-skateboard",
    "name": "Bethink Skateboard",
    "category": "vehicles",
    "value": 0.455,
    "demand": 1,
    "image": "images/vehicles/bethink-skateboard.webp"
  },
  {
    "id": "petwear-chef-hat",
    "name": "Chef Hat",
    "category": "petwear",
    "value": 0.84,
    "demand": 2,
    "image": "images/petwear/chef-hat.webp"
  },
  {
    "id": "pets-trex",
    "name": "T-Rex",
    "category": "pets",
    "value": 0.665,
    "demand": 2,
    "image": "images/pets/t-rex.webp"
  },
  {
    "id": "food-snowflake-potion",
    "name": "Snowflake Potion",
    "category": "food",
    "value": 2.8,
    "demand": 2,
    "image": "images/food/snowflake-potion.webp"
  },
  {
    "id": "pets-silverback-gorilla",
    "name": "Silverback Gorilla",
    "category": "pets",
    "value": 10.5,
    "demand": 3,
    "image": "images/pets/silverback-gorilla.webp"
  },
  {
    "id": "pets-brachiosaurus",
    "name": "Brachiosaurus",
    "category": "pets",
    "value": 0.2625,
    "demand": 1,
    "image": "images/pets/brachiosaurus.webp"
  },
  {
    "id": "vehicles-blue-snowboard",
    "name": "Blue Snowboard",
    "category": "vehicles",
    "value": 0.35,
    "demand": 1,
    "image": "images/vehicles/blue-snowboard.webp"
  },
  {
    "id": "pets-goat",
    "name": "Goat",
    "category": "pets",
    "value": 2.8,
    "demand": 2,
    "image": "images/pets/goat.webp"
  },
  {
    "id": "food-golden-plantain",
    "name": "Golden Plantain",
    "category": "food",
    "value": 0.455,
    "demand": 2,
    "image": "images/food/golden-plantain.webp"
  },
  {
    "id": "toys-throwing-pumpkin",
    "name": "Throwing Pumpkin",
    "category": "toys",
    "value": 0.21,
    "demand": 1,
    "image": "images/toys/throwing-pumpkin.webp"
  },
  {
    "id": "vehicles-super-jetpack",
    "name": "Super Jetpack",
    "category": "vehicles",
    "value": 11.2,
    "demand": 2,
    "image": "images/vehicles/super-jetpack.webp"
  },
  {
    "id": "pets-primal-kaijunior",
    "name": "Primal Kaijunior",
    "category": "pets",
    "value": 0.455,
    "demand": 1,
    "image": "images/pets/primal-kaijunior.webp"
  },
  {
    "id": "pets-moonbeam-peacock",
    "name": "Moonbeam Peacock",
    "category": "pets",
    "value": 6.65,
    "demand": 2,
    "image": "images/pets/moonbeam-peacock.webp"
  },
  {
    "id": "strollers-spikey-chariot-stroller",
    "name": "Spikey Chariot Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "pets-pomeranian",
    "name": "Pomeranian",
    "category": "pets",
    "value": 0.28,
    "demand": 1,
    "image": "images/pets/pomeranian.webp"
  },
  {
    "id": "pets-ghost-wolf",
    "name": "Ghost Wolf",
    "category": "pets",
    "value": 0.245,
    "demand": 1,
    "image": "images/pets/ghost-wolf.webp"
  },
  {
    "id": "toys-flying-broomstick",
    "name": "Flying Broomstick",
    "category": "toys",
    "value": 33.25,
    "demand": 2,
    "image": "images/toys/flying-broomstick.webp"
  },
  {
    "id": "strollers-hatched-egg-stroller",
    "name": "Hatched Egg Stroller",
    "category": "strollers",
    "value": 0.04,
    "demand": 3,
    "image": ""
  },
  {
    "id": "gifts-lunar-tiger-box",
    "name": "Lunar Tiger Box",
    "category": "gifts",
    "value": 0.1875,
    "demand": 1,
    "image": "images/gifts/lunar-tiger-box.webp"
  },
  {
    "id": "toys-frosty-glow-paint",
    "name": "Frosty Glow Mega Neon Paint",
    "category": "toys",
    "value": 0.315,
    "demand": 3,
    "image": "images/toys/frosty-glow-mega-neon-paint.webp"
  }
];
