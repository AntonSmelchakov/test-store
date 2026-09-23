import { useShopCart } from "../../states/Shopcart";
import type { ShopCartState } from "../../states/Shopcart";

export function ItemCard({ itemInfo }) {
  const addItemToShopCart = useShopCart((state: ShopCartState) => state.addItem);
  const removeItem = useShopCart((state: ShopCartState) => state.removeItem);
  const shopCartCount = useShopCart(
    (state: ShopCartState) => state.items.get(itemInfo.id)?.quantity
  );

  return (
    <div>
      <div>
        <img src={itemInfo.image_url} alt={itemInfo.name} />
      </div>
      <h5>{itemInfo.name}</h5>
      <p>{itemInfo.description}</p>
      <p>{itemInfo.price}</p>
      {!shopCartCount ? (
      <button onClick={()=>addItemToShopCart(itemInfo.id)}>Добавить в корзину</button>
      ) : (
          <div>
            <button onClick={()=> removeItem(itemInfo.id)}>-</button>
            <p>{ shopCartCount}</p>
            <button onClick={() => addItemToShopCart(itemInfo.id)}>+</button>
          </div>
      )}

    </div>
  )

}
