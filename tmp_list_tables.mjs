import { pocketbaseList } from "./src/services/pocketbase/server";

async function checkCycleAccountIds() {
  try {
    const res = await pocketbaseList("cashback_cycles", { perPage: 10 });
    console.log("Sample Cycles:", res.items.map(i => ({ id: i.id, account_id: i.account_id, tag: i.cycle_tag })));
  } catch (err) {
    console.error("Error:", err);
  }
}

checkCycleAccountIds();
