import { useSelector } from "react-redux";
import { IAuthState } from "../../types";
import { Link } from "react-router-dom";


const CheckoutPage = () => {

  const user = useSelector((state: IAuthState) => state.auth?.user);
  const cart = useSelector((state) => state.cart?.cart);


  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <Link to={`/course/${cart.id}`} className="w-[200px] block mb-5 border border-transparent underline">Back to course page</Link>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-4">
              <div className="flex justify-between items-baseline">
                <h2 className="text-lg leading-6 font-medium text-gray-900">Learn Online</h2>
                <p className="text-sm text-gray-500">TEST MODE</p>
              </div>
              <div className="mt-4">
                <div className="">
                  <img src={`http://localhost:3003/public/course/${cart.banner}`} alt={cart.title} />
                  <div>
                    <h3 className="text-md leading-6 font-medium text-gray-900 mt-4">{cart.title}</h3>
                    <p className="text-md font-medium text-gray-900">${cart.price}</p>
                  </div>
                </div>

                <div className="mt-6">
                  <span className="block text-lg leading-6 font-medium text-gray-900">Total: ${cart.price}</span>
                </div>
              </div>
            </div>

            <div className="md:w-1/2 p-4 bg-gray-50">
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Enter your email"
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                  />
                </div>
                <div>
                  <h4 className="block text-sm font-medium text-gray-700">
                    Card information
                  </h4>
                  <label htmlFor="card" className="block text-sm font-medium text-gray-700 mt-3">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="card"
                    placeholder="Enter your card number"
                    className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                  />
                  <div className="flex gap-2">
                    <div>
                      <label htmlFor="exp-date" className="block text-sm font-medium text-gray-700 mt-3">
                        Expiration Date
                      </label>
                      <input
                        type="text"
                        id="exp-date"
                        placeholder="01/26"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                      />
                    </div>
                    <div>
                      <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mt-3">
                        CVV
                      </label>
                      <input
                        type="text"
                        id="cvv"
                        placeholder="CVV"
                        className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                  >
                    Pay
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutPage;
