import TableImage from "../../../assets/img/table.jpg";

const BookTable = () => {
  const currentDateTime = new Date().toISOString().slice(0, 16);

  return (
    <div className="w-full  lg:px-11 md:px-8 sm:px-4 px-4 pb-6">
      <div className="flex flex-col lg:flex-row items-stretch gap-0">
        {/* Image Section */}
        <div className="lg:w-1/2 w-full flex items-center justify-center">
          <img
            src={TableImage}
            alt="Table setup"
            className="w-full h-full object-cover lg:rounded-l-lg"
          />
        </div>

        {/* Booking Form Section */}
        <div className="lg:w-1/2 w-full bg-zinc-800 p-6 lg:p-8 flex items-center justify-center lg:rounded-r-lg">
          <div className="w-full space-y-6">
            <div className="space-y-1">
              <h5 className="text-sm text-orange-500 font-medium">
                Reservation
              </h5>
              <h1 className="text-xl text-neutral-100 font-bold">
                Book A Table Online
              </h1>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
              <div className="space-y-1.5">
                <label
                  htmlFor="fullname"
                  className="text-sm text-neutral-400 block"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  id="fullname"
                  className="w-full h-12 border border-neutral-600 bg-zinc-700 px-3 rounded-md text-sm text-neutral-300 placeholder:text-neutral-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="text-sm text-neutral-400 block"
                >
                  Email ID
                </label>
                <input
                  type="email"
                  placeholder="example@gmail.com"
                  id="email"
                  className="w-full h-12 border border-neutral-600 bg-zinc-700 px-3 rounded-md text-sm text-neutral-300 placeholder:text-neutral-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6">
              <div className="space-y-1.5">
                <label
                  htmlFor="datetime"
                  className="text-sm text-neutral-400 block"
                >
                  Date & Time
                </label>
                <input
                  type="datetime-local"
                  id="datetime"
                  defaultValue={currentDateTime}
                  className="w-full h-12 border border-neutral-600 bg-zinc-700 px-3 rounded-md text-sm text-neutral-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  required
                />
              </div>
              <div className="space-y-1.5">
                <label
                  htmlFor="no-of-people"
                  className="text-sm text-neutral-400 block"
                >
                  No. of People
                </label>
                <select
                  id="no-of-people"
                  className="w-full h-12 border border-neutral-600 bg-zinc-700 px-3 rounded-md text-sm text-neutral-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                  defaultValue="2"
                >
                  {[1, 2, 3, 4, 5].map((num) => (
                    <option key={num} value={num}>
                      {num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-1.5">
              <label
                htmlFor="special-request"
                className="text-sm text-neutral-400 block"
              >
                Any Special Request?
              </label>
              <textarea
                id="special-request"
                placeholder="E.g., corner table, high chair needed, etc."
                className="w-full h-24 border border-neutral-600 bg-zinc-700 px-3 py-2 rounded-md text-sm text-neutral-300 placeholder:text-neutral-500 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
              ></textarea>
            </div>

            <button
              className="w-full h-12 rounded-md bg-orange-600 hover:bg-orange-500 text-lg text-neutral-100 font-medium transition ease-in-out"
              onClick={() => alert("Table booked successfully!")}
            >
              Book A Table Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookTable;
