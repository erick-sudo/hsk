<CreditCardForm
                errors={cardErrors}
                submitButton={
                  <button
                    type="submit"
                    className=" disabled:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50 flex items-center gap-4 bg-purple-700 px-8 py-2 font-bold rounded-full text-[#fff] hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700 duration-300"
                  >
                    Acknowledge Order
                  </button>
                }
                onSubmit={receiveCardDetails}
              />