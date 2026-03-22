import { pocketbaseList } from "./src/services/pocketbase/server";

async function checkCollections() {
  try {
    const res = await pocketbaseList("transactions", { perPage: 1 });
    console.log("Record:", JSON.stringify(res.items[0], null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

checkCollections();
