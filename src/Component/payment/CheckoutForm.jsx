import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";

const CheckoutForm = ({ courseDetails }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      setLoading(false);
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: `http://localhost:5173/payment-confirmation/${courseDetails.courseId}`,
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
      setLoading(false);
    } else {
      alert("Payment Successfull");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  };

  return (
    <form onSubmit={handleSubmit} className="">
      <div>
        <div class="flex flex-col items-center border-b bg-white py-4 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
          <h1 href="#" class="text-2xl font-bold text-gray-800">
            Checkout
          </h1>
        </div>
        <div class="grid gap-10 sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div class="px-4 pt-8">
            <p class="text-xl font-medium">Order Summary</p>
            <p class="text-gray-400">Check your item.</p>
            <div class="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div class="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src={courseDetails.formData?.imageUrl}
                  alt=""
                />
                <div class="flex w-full flex-col px-4 py-4">
                  <span class="font-semibold">
                    {courseDetails.formData?.title}
                  </span>

                  <p class="text-lg font-bold">
                    ${courseDetails.formData?.price}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p class="text-xl font-medium">Payment Details</p>
            <p class="text-gray-400 mb-4">
              Complete your order by providing your payment details.
            </p>

            <PaymentElement />

            <div class="mt-6 border-t border-b py-2">
              <div class="flex items-center justify-between">
                <p class="text-sm font-medium text-gray-900">Original Price</p>
                <p class="font-semibold text-gray-900">
                  {" "}
                  ${courseDetails.formData?.price}
                </p>
              </div>
            </div>

            <div class="mt-6 flex items-center justify-between">
              <p class="text-sm font-medium text-gray-900">Total</p>
              <p class="text-2xl font-semibold text-gray-900">
                {" "}
                ${courseDetails.formData?.price}
              </p>
            </div>

            <button
              disabled={!stripe || loading}
              className={`mt-4 mb-8 w-full rounded-md ${
                !loading
                  ? " bg-secondary hover:bg-secondary-600"
                  : "bg-gray-400"
              } px-6 py-3 font-medium text-white relative`}
            >
              {loading ? (
                <div className="flex justify-center items-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                </div>
              ) : (
                "Complete Checkout"
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default CheckoutForm;
