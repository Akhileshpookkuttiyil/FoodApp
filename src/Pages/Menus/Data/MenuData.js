// src/data/menuData.js
import pizzaImg from "../../../assets/img/pizza.avif";
import burgerImg from "../../../assets/img/burger.jpg";
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
  },
];
