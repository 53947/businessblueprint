const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

async function setup() {
  console.log("Creating Stripe products and prices...\n");
  const results = {};

  const plans = [
    { name: "Compass Bundle", amount: 9900, key: "COMPASS_BUNDLE" },
    { name: "Anchor Bundle", amount: 7900, key: "ANCHOR_BUNDLE" },
    { name: "/ promote standalone", amount: 2900, key: "PROMOTE" },
    { name: "/ respond standalone", amount: 2900, key: "RESPOND" },
    { name: "/ engage standalone", amount: 2900, key: "ENGAGE" },
    { name: "/ post standalone", amount: 2900, key: "POST" },
    { name: "/ list standalone", amount: 2900, key: "LIST" },
    { name: "/ review standalone", amount: 2900, key: "REVIEW" },
    { name: "/ amplify standalone", amount: 2900, key: "AMPLIFY" },
    { name: "/ connect Performance", amount: 2900, key: "CONNECT" },
  ];

  for (const plan of plans) {
    const product = await stripe.products.create({ name: plan.name });
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: plan.amount,
      currency: "usd",
      recurring: { interval: "month" },
    });
    results[plan.key] = price.id;
    console.log(`${plan.name}`);
    console.log(`  Product ID: ${product.id}`);
    console.log(`  Price ID:   ${price.id}`);
    console.log("");
  }

  console.log("=== COPY THESE INTO YOUR REPLIT ENVIRONMENT VARIABLES ===\n");
  for (const [key, val] of Object.entries(results)) {
    console.log(`STRIPE_PRICE_${key}=${val}`);
  }
  console.log("\nDone.");
}

setup().catch(console.error);
