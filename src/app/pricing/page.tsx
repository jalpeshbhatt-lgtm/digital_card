export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      price: "199",
    },
    {
      name: "Professional",
      price: "499",
    },
    {
      name: "Business",
      price: "999",
    },
    {
      name: "Reseller",
      price: "4999",
    },
  ];

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-5xl font-bold text-center">
        Pricing
      </h1>

      <div className="grid grid-cols-4 gap-6 mt-10">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className="border rounded p-6"
          >
            <h2>{plan.name}</h2>

            <p className="text-3xl mt-4">
              ₹{plan.price}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}