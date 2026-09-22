import { useShopCart } from "../../states/Shopcart";
import css from "./Header.module.css";
import type { ShopCartState } from "../../states/Shopcart";

export function Header() {
  const shopCartCount = useShopCart((state: ShopCartState) => state.items);
  const increaseCount = useShopCart((state: ShopCartState) => state.addItem);

  return (
    <header className={css.header}>
      <h1 className={css.companyName}>
        Магазин магазиныч!
      </h1>
      <button className={css.shopCartBtn}>
        <img src="/images/shopcart.svg" alt="Корзина" />
        <div onClick={increaseCount}>
          {shopCartCount.length}
        </div>
      </button>
    </header>
  )
}
