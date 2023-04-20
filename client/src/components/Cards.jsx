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
              text="Манай дээд зэрэглэлийн модон сандлаар хэв маягаа тайвшруулаарай"
              label="Сандал"
              path="/products"
            />
            <CardItem
              src="https://i.ibb.co/BBKDfqN/DALL-E-2023-04-18-22-30-30-Lumber-and-wood-products-A-rustic-wooden-fence-surrounding-a-beautiful-ga.png"
              text="Дээд зэрэглэлийн модон сандал ашиглан гадаа тав тухтай өнгөрүүлээрэй"
              label="Сандал"
              path="/products"
            />
          </ul>
          <ul className="cards__items">
            <CardItem
              src="https://i.ibb.co/MnWSp0p/DALL-E-2023-04-18-22-56-12-Flooring-materials-A-beautiful-wooden-floor-with-intricate-patterns-surro.png"
              text="Таныг суугаад алжаалаа тайлахыг урьж байна"
              label="Шал"
              path="/products"
            />
            <CardItem
              src="https://i.ibb.co/xHgZpQK/DALL-E-2023-04-18-22-31-48-Flooring-materials-A-beautiful-wooden-floor-with-intricate-patterns-surro.png"
              text="Тав тухтай түшлэгтэй сандалын хамт"
              label="Шал"
              path="/products"
            />
            <CardItem
              src="https://i.ibb.co/4sSdZR1/DALL-E-2023-04-18-22-31-51-Flooring-materials-A-beautiful-wooden-floor-with-intricate-patterns-surro.png"
              text="Нарийн хээ угалз бүхий гоёмсог модон шал."
              label="Шал"
              path="/products"
            />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
