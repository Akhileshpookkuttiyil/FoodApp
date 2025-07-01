import butterChicken from "../../assets/img/butterChicken.png";
import paneerTikka from "../../assets/img/paneerTikka.png";
import masalaDosa from "../../assets/img/masalaDosa.png";
import chickenBiryani from "../../assets/img/chickenBiryani.png";

const GetOrders = () => {
  const orders = [
    {
      id: 15,
      items: [
        {
          product: { name: "Butter Chicken", image: butterChicken },
          quantity: 1,
        },
      ],
      address: {
        firstName: "John",
        lastName: "Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipcode: "10001",
        country: "USA",
      },
      amount: 299,
      paymentType: "Credit Card",
      orderDate: "10/10/2022",
      isPaid: true,
    },
    {
      id: 16,
      items: [
        { product: { name: "Paneer Tikka", image: paneerTikka }, quantity: 2 },
      ],
      address: {
        firstName: "Jane",
        lastName: "Smith",
        street: "456 Park Ave",
        city: "Chicago",
        state: "IL",
        zipcode: "60601",
        country: "USA",
      },
      amount: 498,
      paymentType: "UPI",
      orderDate: "12/10/2022",
      isPaid: false,
    },
    {
      id: 17,
      items: [
        { product: { name: "Masala Dosa", image: masalaDosa }, quantity: 3 },
      ],
      address: {
        firstName: "Alice",
        lastName: "Brown",
        street: "789 Elm St",
        city: "San Francisco",
        state: "CA",
        zipcode: "94102",
        country: "USA",
      },
      amount: 447,
      paymentType: "Cash",
      orderDate: "15/10/2022",
      isPaid: true,
    },
    {
      id: 18,
      items: [
        {
          product: { name: "Chicken Biryani", image: chickenBiryani },
          quantity: 1,
        },
      ],
      address: {
        firstName: "Bob",
        lastName: "Lee",
        street: "321 Oak St",
        city: "Austin",
        state: "TX",
        zipcode: "73301",
        country: "USA",
      },
      amount: 349,
      paymentType: "Credit Card",
      orderDate: "18/10/2022",
      isPaid: true,
    },
  ];

  return (
    <div className="md:p-10 p-4 space-y-4">
      <h2 className="text-lg font-medium">Orders List</h2>
      {orders.map((order, index) => (
        <div
          key={index}
          className="flex flex-col md:grid md:grid-cols-[2fr_1fr_1fr_1fr] md:items-center gap-5 p-5 max-w-4xl rounded-md border border-gray-300 text-gray-800"
        >
          <div className="flex gap-5">
            <img
              className="w-12 h-12 object-cover rounded"
              src={order.items[0].product.image}
              alt={order.items[0].product.name}
            />
            <div className="flex flex-col justify-center">
              <p className="font-medium">
                {order.items[0].product.name}
                <span
                  className={`text-orange-500 px-4 ${
                    order.items[0].quantity < 2 && "hidden"
                  }`}
                >
                  x {order.items[0].quantity}
                </span>
              </p>
            </div>
          </div>

          <div className="text-sm">
            <p className="font-medium mb-1">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p>
              {order.address.street}, {order.address.city},{" "}
              {order.address.state}, {order.address.zipcode},{" "}
              {order.address.country}
            </p>
          </div>

          <p className="font-medium text-base my-auto text-black/70">
            ₹{order.amount}
          </p>

          <div className="flex flex-col text-sm">
            <p>Method: {order.paymentType}</p>
            <p>Date: {order.orderDate}</p>
            <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GetOrders;
