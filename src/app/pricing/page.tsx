import Link from "next/link";

export default function PricingPage() {
  const plans = [
    {
      name: "Basic",
      price: 999,
      launchPrice: 499,
      cards: 1,
      customDomain: false,
      popular: false,
    },
    {
      name: "Pro",
      price: 2999,
      launchPrice: 1499,
      cards: 5,
      customDomain: false,
      popular: true,
    },
    {
      name: "Premium",
      price: 4999,
      launchPrice: 2499,
      cards: 10,
      customDomain: true,
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}

        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold">
            Pricing Plans
          </h1>

          <p className="text-gray-400 mt-4 text-xl">
            Launch Offer – 50% Discount
          </p>
        </div>

        {/* Plans */}

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-3xl border p-8 relative ${
                plan.popular
                  ? "border-violet-500 bg-violet-500/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-violet-600 px-3 py-1 rounded-full text-sm">
                  Most Popular
                </div>
              )}

              <h2 className="text-3xl font-bold">
                {plan.name}
              </h2>

              <div className="mt-6">
                <span className="text-gray-500 line-through text-xl">
                  ₹{plan.price}
                </span>

                <div className="text-5xl font-bold mt-2">
                  ₹{plan.launchPrice}
                </div>

                <p className="text-gray-400 mt-2">
                  Per Year
                </p>
              </div>

              <ul className="mt-8 space-y-4">
                <li>
                  ✅ {plan.cards} Card
                  {plan.cards > 1 ? "s" : ""}
                </li>

                <li>
                  ✅ Lead Management
                </li>

                <li>
                  ✅ Analytics Dashboard
                </li>

                <li>
                  ✅ QR Payments
                </li>

                <li>
                  ✅ Social Links
                </li>

                <li>
                  {plan.customDomain
                    ? "✅ Custom Domain Included"
                    : "❌ Custom Domain"}
                </li>
              </ul>

              <Link
                href={`/checkout?plan=${plan.name}`}
                className="
                  mt-8
                  block
                  text-center
                  bg-violet-600
                  hover:bg-violet-700
                  rounded-2xl
                  py-4
                  font-semibold
                "
              >
                Choose Plan
              </Link>
            </div>
          ))}
        </div>

        {/* Extra Card */}

        <div className="mt-16 rounded-3xl bg-white/5 border border-white/10 p-8 text-center">
          <h2 className="text-3xl font-bold">
            Extra Cards
          </h2>

          <p className="mt-4 text-gray-400">
            Need more cards?
          </p>

          <div className="text-5xl font-bold mt-4">
            ₹999
          </div>

          <p className="text-gray-400">
            Launch Offer ₹499 / Card / Year
          </p>
        </div>
      </div>
    </div>
  );
}