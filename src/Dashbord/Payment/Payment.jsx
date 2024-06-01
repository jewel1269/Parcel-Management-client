import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { AuthContext } from '../../Componant/AuthProvider/AuthProvider';

// Load your Stripe public key
// const stripePromise = loadStripe('your_stripe_public_key');

const Payment = () => {
  const { user } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [transaction, setTransaction] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = true;
  const [paymentDetails, setPaymentDetails] = useState({
    email: user?.email,
    name: user?.displayName,
    price: 50, // example total price, replace with actual data
    date: new Date().toLocaleString(),
    transactionId: transaction,
    status: 'pending',
  });

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {isModalOpen && (
        <div
          className="fixed inset-0 z-10 overflow-y-auto"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="relative inline-block p-4 overflow-hidden text-left align-middle transition-all transform bg-gray-100 shadow-xl lg:w-[700px] rounded-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:p-6">
              <div className="w-full flex items-center justify-center bg-gray-100">
                <div className="w-full lg:w-[700px] p-8 bg-gray-100 rounded-lg shadow-md">
                  <h2 className="text-center text-2xl font-semibold mb-6">
                    PAYMENT
                  </h2>
                  <form>
                    <div className="mb-4">
                      <label className="block text-gray-700">
                        Payment Method
                      </label>
                      <div className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600">
                        Credit/Debit Card
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="sr-only">Card number</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 10h18M3 6h18M3 14h18m-9 4h9M3 18h6"
                            />
                          </svg>
                        </span>
                        <div className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600" />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="sr-only">Email</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M16 12H8m0 0H4m4 0h4m0 0V8m0 4v4"
                            />
                          </svg>
                        </span>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email"
                          value={paymentDetails.email}
                          readOnly
                          className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="sr-only">Name</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 14v8m0-14V2M6 10v12M18 10v12"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="name"
                          placeholder="Name"
                          value={paymentDetails.name}
                          readOnly
                          className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="sr-only">Total Price</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M3 18h18M3 6h18M3 12h18m-9 6h9M3 18h6"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="totalPrice"
                          placeholder="Total Price"
                          value={`$${paymentDetails.price.toFixed(2)}`}
                          readOnly
                          className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <label className="sr-only">Date</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <svg
                            className="h-5 w-5 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M8 7v6h4M12 7h4v6h-4M4 6h16v14H4V6zm5 1v6M11 9h2"
                            />
                          </svg>
                        </span>
                        <input
                          type="text"
                          name="date"
                          placeholder="Date"
                          value={paymentDetails.date}
                          readOnly
                          className="w-full pl-10 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center items-center">
                      <button
                        type="submit"
                        disabled={!stripe || !clientSecret}
                        className={`w-full py-3 font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 ${
                          !stripe || !clientSecret
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-purple-600 hover:bg-purple-700 text-white'
                        }`}
                      >
                        Pay
                      </button>

                      <button
                        type="button"
                        onClick={closeModal}
                        className="px-4 bg-orange-400 sm:mx-2 w-full py-2.5 text-sm font-medium dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
                      >
                        Calcel
                      </button>

                      {message && (
                        <p className="mt-4 text-center text-green-600">
                          {message}
                        </p>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;
