import React from "react";

const PremiumUI = () => {
  return (
    <div className=" min-w-screen bg-gradient-to-b from-purple-600 to-blue-800 text-white flex flex-col  items-center">
      {/* Premium Banner */}
      <div className="w-full bg-gradient-to-r from-purple-700 to-pink-600 py-16 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4">
          Listen Without Limits. Try 3 Months of Premium for ₹59.
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-8">
          Only ₹119/month after. Cancel anytime. Offer ends December 31, 2024.
        </p>
        <div className="space-x-4 flex justify-center">
          <button className="bg-green-500 hover:bg-green-600 px-6 py-3 text-lg font-semibold rounded-full transition duration-300 ease-in-out">
            Get Premium Individual
          </button>
          <button className="bg-white text-black hover:bg-gray-200 px-6 py-3 text-lg font-semibold rounded-full transition duration-300 ease-in-out">
            View All Plans
          </button>
        </div>
      </div>

      {/* Subscription Plans */}
      <div className="container mx-auto  mt-16  text-center">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          Affordable Plans for Every Need
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "Individual",
              price: "₹119/month",
              description:
                "Ad-free music listening on all devices. Enjoy all Premium features.",
            },
            {
              title: "Duo",
              price: "₹149/month",
              description:
                "Two Premium accounts for you and your partner. Share the music experience.",
            },
            {
              title: "Family",
              price: "₹179/month",
              description:
                "Up to 6 Premium accounts for family members. Enjoy music without interruption.",
            },
          ].map((plan, index) => (
            <div
              key={index}
              className="bg-white text-black p-6 rounded-lg shadow-lg hover:scale-105 transition transform duration-300 ease-in-out"
            >
              <h3 className="text-2xl sm:text-3xl font-bold mb-2">{plan.title}</h3>
              <p className="text-xl sm:text-2xl font-semibold mb-4">{plan.price}</p>
              <p className="text-gray-700 text-base sm:text-lg">{plan.description}</p>
              <button className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full transition duration-300 ease-in-out">
                Get {plan.title}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-black py-8 mt-16 text-center">
        <p className="text-gray-400 text-sm sm:text-base">
          Pay using multiple methods. Cancel anytime. All prices are inclusive of taxes.
        </p>
        <div className="mt-4 text-gray-500">
          <p className="text-sm">© 2024 Premium Music. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PremiumUI;
