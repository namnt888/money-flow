import { pocketbaseList } from "./src/services/pocketbase/server";

async function inspectSchema() {
  try {
    const res = await pocketbaseList("transactions", {
      perPage: 1,
    });
    console.log("Transaction keys:", Object.keys(res.items[0] || {}));
    console.log("Full record:", JSON.stringify(res.items[0], null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

inspectSchema();
