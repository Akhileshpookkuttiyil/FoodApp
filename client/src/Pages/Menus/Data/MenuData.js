// src/data/menuData.js
import pizzaImg from "../../../assets/img/pizza.png";
import burgerImg from "../../../assets/img/burger.png";
import sushiImg from "../../../assets/img/sushi.png";
import cakeImg from "../../../assets/img/cake.png";
import coffeeImg from "../../../assets/img/coffee.png";

// Updated images based on the new ones you provided
import Chicken from "../../../assets/img/hero2.png";
import Momos from "../../../assets/img/hero4.png";
import Biriyani from "../../../assets/img/hero3.png";
import chickenBiriyani from "../../../assets/img/chickenBiryani.png";
import beefBiriyani from "../../../assets/img/beeef.png";
import Fish from "../../../assets/img/hero5.png";
import FriedRice from "../../../assets/img/rice.png";
import Sandwich from "../../../assets/img/sandwich.png";

export const menuItems = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 349,
    rating: 4.2,
    hotel: "Pizza Mahal",
    image: pizzaImg,
    deliveryTime: 30,
    desc: "A classic pepperoni pizza with extra cheese and herbs.",
    longDesc:
      "A classic pepperoni pizza with extra cheese and herbs. The crust is crispy on the edges and soft in the center, topped with a rich marinara sauce, melty mozzarella cheese, and spicy pepperoni slices. A perfect balance of savory and spicy, sure to satisfy your pizza cravings. Each bite brings a delightful mix of flavors, making this pizza a timeless favorite.",
    inStock: true,
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burgers",
    price: 249,
    rating: 3.5,
    hotel: "Burger Darbar",
    image: burgerImg,
    deliveryTime: 25,
    desc: "Juicy grilled patty with melted cheese in a soft bun.",
    longDesc:
      "Juicy grilled patty with melted cheese in a soft bun. This burger is loaded with fresh lettuce, tomatoes, pickles, and a tangy sauce. The beef patty is cooked to perfection, juicy and flavorful, making each bite a satisfying experience. It's the ultimate comfort food, combining the richness of the cheese with the savory beef and fresh vegetables.",
    inStock: false,
  },
  {
    id: 3,
    name: "Salmon Sushi",
    category: "Sushi",
    price: 799,
    rating: 4.8,
    hotel: "Sushi Vihar",
    image: sushiImg,
    deliveryTime: 40,
    desc: "Fresh salmon wrapped in seasoned rice and seaweed.",
    longDesc:
      "Fresh salmon wrapped in seasoned rice and seaweed. This sushi is carefully crafted with top-quality salmon, bringing a perfect balance of flavors. The smooth texture of the salmon complements the slightly tangy rice, making each piece a delightful bite. Ideal for sushi lovers, this dish offers a taste of freshness and elegance with every roll.",
    inStock: true,
  },
  {
    id: 4,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 199,
    rating: 3.9,
    hotel: "Mithai Bhavan",
    image: cakeImg,
    deliveryTime: 20,
    desc: "Rich and moist chocolate cake topped with ganache.",
    longDesc:
      "Rich and moist chocolate cake topped with decadent ganache. Every slice of this cake offers a melt-in-your-mouth experience, with layers of smooth chocolate and a rich cocoa flavor that’s perfectly balanced with a touch of sweetness. It's a delightful dessert, perfect for chocolate lovers who seek a luxurious and indulgent treat.",
    inStock: true,
  },
  {
    id: 5,
    name: "Iced Coffee",
    category: "Drinks",
    price: 149,
    rating: 4.0,
    hotel: "Madras Coffee House",
    image: coffeeImg,
    deliveryTime: 15,
    desc: "Chilled coffee brewed to perfection with a splash of milk.",
    longDesc:
      "Chilled coffee brewed to perfection with a splash of milk. This refreshing iced coffee is ideal for a hot day, offering a robust coffee flavor with a smooth finish. It’s the perfect combination of bold and creamy, ideal for a quick pick-me-up. Whether you’re working or relaxing, it’s a refreshing way to energize your day.",
    inStock: false,
  },
  {
    id: 6,
    name: "Full Grilled Chicken",
    category: "Chicken",
    price: 800,
    rating: 4.3,
    hotel: "Grill House",
    image: Chicken,
    deliveryTime: 35,
    desc: "Juicy grilled chicken seasoned with spices.",
    longDesc:
      "Juicy grilled chicken seasoned with a unique blend of spices. The chicken is marinated to perfection, ensuring every bite is packed with flavor. Grilled to a golden brown, the crispy skin gives way to tender, juicy meat that is absolutely irresistible. This dish is perfect for those craving bold flavors and tender, smoky grilled chicken.",
    inStock: true,
  },
  {
    id: 7,
    name: "Steamed Momos",
    category: "Momos",
    price: 120,
    rating: 4.0,
    hotel: "Tibetan Treats",
    image: Momos,
    deliveryTime: 20,
    desc: "Soft dumplings filled with vegs or chicken.",
    longDesc:
      "Soft dumplings filled with your choice of vegetables or chicken, steamed to perfection. These momos are the ideal snack, offering a delicate balance of flavors. The dough is light and fluffy, while the filling is savory and satisfying. Steamed momos are a popular snack across Asia, loved for their delicate texture and bold flavors.",
    inStock: true,
  },
  {
    id: 8,
    name: "Hyderabadi Biriyani",
    category: "Biryani",
    price: 300,
    rating: 4.6,
    hotel: "Biriyani Bhavan",
    image: Biriyani,
    deliveryTime: 30,
    desc: "Flavorful rice with tender chicken pieces.",
    longDesc:
      "Flavorful rice with tender chicken pieces, cooked with aromatic spices and herbs. This Biriyani is a feast for the senses, with each bite offering a burst of flavor. The rice is perfectly cooked, and the chicken is tender, making this dish a true classic of Indian cuisine. The blend of spices is subtle yet bold, creating a harmonious and aromatic experience.",
    inStock: true,
  },
  {
    id: 9,
    name: "Grilled Fish",
    category: "Fish",
    price: 500,
    rating: 4.1,
    hotel: "Seafood Point",
    image: Fish,
    deliveryTime: 28,
    desc: "Fresh fish fillet grilled to perfection.",
    longDesc:
      "Fresh fish fillet grilled to perfection with a blend of spices. The fish is lightly seasoned to enhance its natural flavor, while the grilling process imparts a smoky finish. Grilled fish is a healthy yet flavorful option for seafood lovers, offering a satisfying and nutritious meal without compromising on taste.",
    inStock: true,
  },
  {
    id: 10,
    name: "Veg Fried Rice",
    category: "Fried Rice",
    price: 150,
    rating: 3.9,
    hotel: "Rice Bowl",
    image: FriedRice,
    deliveryTime: 22,
    desc: "Classic fried rice with vegetables.",
    longDesc:
      "Classic fried rice with vegetables, cooked in aromatic spices and seasoned perfectly. This dish is the perfect balance of crunchy vegetables and fragrant rice, offering a satisfying meal that can be enjoyed as a main dish or a side. The rice is stir-fried with fresh vegetables, making it light yet flavorful.",
    inStock: true,
  },
  {
    id: 11,
    name: "Club Sandwich",
    category: "Sandwich",
    price: 250,
    rating: 4.0,
    hotel: "Snack Shack",
    image: Sandwich,
    deliveryTime: 18,
    desc: "Triple-layer sandwich with a variety of fillings.",
    longDesc:
      "Triple-layer sandwich with a variety of fillings, including crisp lettuce, juicy tomatoes, tender chicken, and creamy mayonnaise. Each bite offers a wonderful crunch, making it a delightful and satisfying snack or meal. This club sandwich is a perfect combination of textures and flavors, ideal for lunch or a quick snack.",
    inStock: true,
  },
  {
    id: 12,
    name: "Chicken Biriyani",
    category: "Biriyani",
    price: 280,
    rating: 4.4,
    hotel: "Biriyani Bhavan",
    image: chickenBiriyani,
    deliveryTime: 32,
    desc: "Spicy chicken cooked with fragrant basmati rice and herbs.",
    longDesc:
      "Spicy chicken cooked with fragrant basmati rice and a blend of aromatic spices. The chicken is marinated to absorb the flavors of the spices, and when cooked, the rice and chicken come together to create an unforgettable Biriyani experience. It’s a hearty and flavorful dish that will transport you straight to the heart of Indian cuisine.",
    inStock: true,
  },
  {
    id: 13,
    name: "Beef Biriyani",
    category: "Biriyani",
    price: 320,
    rating: 4.5,
    hotel: "Biriyani Darbar",
    image: beefBiriyani,
    deliveryTime: 35,
    desc: "Rich and flavorful beef layered with aromatic rice.",
    longDesc:
      "Rich and flavorful beef layered with aromatic rice and slow-cooked to perfection. This Biriyani is a hearty and robust dish, with the tender beef soaking in the spices, making each bite rich in flavor and full of depth. The beef is cooked until tender, absorbing the fragrant spices, making this a truly comforting and fulfilling meal.",
    inStock: true,
  },
];
