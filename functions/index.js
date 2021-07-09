const functions = require("firebase-functions");
const Client = require("shopify-buy/index.unoptimized.umd");

exports.emptyCart = functions.https.onCall((data, context) => {
  const client = Client.buildClient(
      {
        domain: "o-p-veteran.myshopify.com",
        storefrontAccessToken: "76c1fba5d995f6b7dbb1eb1c1c3c5745",
      },
  );
  const id = data.id;
  if (typeof id != "string") {
    throw new functions.https.HttpsError("incorrect id",
        `id was of type ${typeof id}`);
  }
  client.checkout.fetch(id).then((checkout) => {
    const lineItems = checkout.lineItems;
    const toRemove = lineItems.map((item) => item.id);
    console.log("New Message written");
    return {removable: toRemove};
  }).catch((err) => {
    throw new functions.https.HttpsError("unknown", err.message);
  });
});

