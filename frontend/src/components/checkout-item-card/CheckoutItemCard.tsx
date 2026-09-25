import { useShopCart } from "../../states/Shopcart";
import type { ShopCartState } from "../../states/Shopcart";
import css from "./CheckoutItemCard.module.css";

export function CheckoutItemCard({ itemInfo }) {
  const addItemToShopCart = useShopCart(
    (state: ShopCartState) => state.addItem,
  );
  const removeItemToShopCart = useShopCart(
    (state: ShopCartState) => state.removeItem,
  );
  const shopCartCount = useShopCart(
    (state: ShopCartState) => state.items.get(itemInfo.id)?.quantity || 0,
  );
  const setTotalPrice = useShopCart(
    (state: ShopCartState) => state.setTotalPrice,
  );
  const totalPrice = useShopCart((state: ShopCartState) => state.totalPrice);

  const unreservedStock = itemInfo.stock - itemInfo.reserved;
  const noImageImage = "/image/no-image.png";

  return (
    <div className={css.cardWrap}>
      {itemInfo.noStock && (
        <div className={css.noStock}>
          <h1>Упс, закончилось!</h1>
        </div>
      )}
      <div className={css.imageWrap}>
        <img
          src={itemInfo.image_url}
          alt={itemInfo.name}
          onError={(e) => (e.currentTarget.src = noImageImage)}
        />
      </div>
      <h5 className={css.name}>{itemInfo.name}</h5>
      <p className={css.stock}>В наличии {unreservedStock} шт.</p>
      <p className={css.price}>{itemInfo.price * shopCartCount} Р</p>
      <div className={css.buttonWrap}>
        {!shopCartCount ? (
          <button
            className={css.button}
            onClick={() => {
              addItemToShopCart(itemInfo.id);
              setTotalPrice(totalPrice + itemInfo.price);
            }}
          >
            Добавить в корзину
          </button>
        ) : (
          <>
            <button
              className={css.btnCtrl}
              onClick={() => {
                removeItemToShopCart(itemInfo.id);
                setTotalPrice(totalPrice - itemInfo.price);
              }}
            >
              -
            </button>
            <p className={css.count}>{shopCartCount}</p>
            <button
              className={css.btnCtrl}
              disabled={shopCartCount >= unreservedStock}
              onClick={() => {
                addItemToShopCart(itemInfo.id);
                setTotalPrice(totalPrice + itemInfo.price);
              }}
            >
              +
            </button>
          </>
        )}
      </div>
    </div>
  );
}
