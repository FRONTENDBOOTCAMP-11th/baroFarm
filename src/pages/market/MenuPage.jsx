import fruitImage from "/images/menu/Fruit.svg";
import vegetableImage from "/images/menu/Vegetable.svg";
import kimchiImage from "/images/menu/Kimchi.svg";
import liveStockImage from "/images/menu/Livestock.svg";
import seafoodImage from "/images/menu/Seafood.svg";
import simpleImage from "/images/menu/Simple.svg";
import riceImage from "/images/menu/Rice.svg";
import riceCakeImage from "/images/menu/Ricecake.svg";

import MenuItem from "@components/MenuItem";

export default function MenuPage() {
  return (
    <>
      <MenuItem to="/menu/fruit" image={fruitImage} title="제철과일" />
      <MenuItem to="/menu/vegetable" image={vegetableImage} title="채소" />
      <MenuItem to="/menu/kimchi" image={kimchiImage} title="김치" />
      <MenuItem to="/menu/liveStock" image={liveStockImage} title="축산물" />
      <MenuItem to="/menu/seafood" image={seafoodImage} title="수산물" />
      <MenuItem to="/menu/simple" image={simpleImage} title="간편식" />
      <MenuItem to="/menu/rice" image={riceImage} title="떡" />
      <MenuItem to="/menu/riceCake" image={riceCakeImage} title="쌀 / 잡곡" />
    </>
  );
}
