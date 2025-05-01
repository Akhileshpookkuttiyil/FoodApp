// src/data/menuData.js
import pizzaImg from "../../../assets/img/pizza.avif";
import burgerImg from "../../../assets/img/Burgers.png";
import sushiImg from "../../../assets/img/sushi.jpg";
import cakeImg from "../../../assets/img/cake.jpeg";
import coffeeImg from "../../../assets/img/coffee.jpeg";

export const menuItems = [
  {
    id: 1,
    name: "Pepperoni Pizza",
    category: "Pizza",
    price: 349,
    rating: 4.2,
    hotel: "Pizza Mahal",
    img: pizzaImg,
    deliveryTime: 30,
    desc: "A classic pepperoni pizza with extra cheese and herbs.",
    inStock: true,
  },
  {
    id: 2,
    name: "Cheese Burger",
    category: "Burgers",
    price: 249,
    rating: 3.5,
    hotel: "Burger Darbar",
    img: burgerImg,
    deliveryTime: 25,
    desc: "Juicy grilled patty with melted cheese in a soft bun.",
    inStock: false,
  },
  {
    id: 3,
    name: "Salmon Sushi",
    category: "Sushi",
    price: 799,
    rating: 4.8,
    hotel: "Sushi Vihar",
    img: sushiImg,
    deliveryTime: 40,
    desc: "Fresh salmon wrapped in seasoned rice and seaweed.",
    inStock: true,
  },
  {
    id: 4,
    name: "Chocolate Cake",
    category: "Desserts",
    price: 199,
    rating: 3.9,
    hotel: "Mithai Bhavan",
    img: cakeImg,
    deliveryTime: 20,
    desc: "Rich and moist chocolate cake topped with ganache.",
    inStock: true,
  },
  {
    id: 5,
    name: "Iced Coffee",
    category: "Drinks",
    price: 149,
    rating: 4.0,
    hotel: "Madras Coffee House",
    img: coffeeImg,
    deliveryTime: 15,
    desc: "Chilled coffee brewed to perfection with a splash of milk.",
    inStock: false,
  },
];
