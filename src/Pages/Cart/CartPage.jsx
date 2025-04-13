
import { useCart } from '../../Context/CartContext';

const CartPage = () => {
  const {
    cartItems,
    incrementQty,
    decrementQty,
    removeFromCart,
    totalAmount,
  } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 rounded object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <button
                      onClick={() => decrementQty(item.id)}
                      className="px-2 border rounded"
                    >
                      −
                    </button>
                    <span>{item.qty}</span>
                    <button
                      onClick={() => incrementQty(item.id)}
                      className="px-2 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ₹{item.qty * item.price}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-sm text-red-500 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right">
            <h3 className="text-xl font-bold">Total: ₹{totalAmount}</h3>
            <button className="mt-3 bg-orange-500 text-white py-2 px-4 rounded">
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
