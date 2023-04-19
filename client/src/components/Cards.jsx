import React from "react";
import "./Cards.css";
import CardItem from "./CardItem";

function Cards() {
  return (
    <div className="cards">
      <h1>Онцлох бараанууд</h1>
      <div className="cards__container">
        <div className="cards__wrapper">
          <ul className="cards__items">
            <CardItem
              src="https://i.ibb.co/vqhS1mx/DALL-E-2023-04-18-22-30-19-Lumber-and-wood-products-A-rustic-wooden-fence-surrounding-a-beautiful-ga.png"
              text="Explore the hidden waterfall deep inside the Amazon Jungle"
              label="Adventure"
              path="/services"
            />
            <CardItem
              src="https://i.ibb.co/BBKDfqN/DALL-E-2023-04-18-22-30-30-Lumber-and-wood-products-A-rustic-wooden-fence-surrounding-a-beautiful-ga.png"
              text="Travel through the Islands of Bali in a Private Cruise"
              label="Luxury"
              path="/services"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="https://i.ibb.co/MnWSp0p/DALL-E-2023-04-18-22-56-12-Flooring-materials-A-beautiful-wooden-floor-with-intricate-patterns-surro.png"
              text="Set Sail in the Atlantic Ocean visiting Uncharted Waters"
              label="Mystery"
              path="/services"
            />
            <CardItem
              src="https://i.ibb.co/xHgZpQK/DALL-E-2023-04-18-22-31-48-Flooring-materials-A-beautiful-wooden-floor-with-intricate-patterns-surro.png"
              text="Experience Football on Top of the Himilayan Mountains"
              label="Adventure"
              path="/products"
            />
            <CardItem
              src="https://i.ibb.co/4sSdZR1/DALL-E-2023-04-18-22-31-51-Flooring-materials-A-beautiful-wooden-floor-with-intricate-patterns-surro.png"
              text="Ride through the Sahara Desert on a guided camel tour"
              label="Adrenaline"
              path="/sign-up"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
