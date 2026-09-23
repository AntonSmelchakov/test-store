import { useShopCart } from "../../states/Shopcart";
import css from "./Header.module.css";
import type { ShopCartState } from "../../states/Shopcart";

export function Header() {
  const shopCartCount = useShopCart((state: ShopCartState) => state.items.size);

  return (
    <header className={css.header}>
      <h1 className={css.companyName}>
        Магазин магазиныч!
      </h1>
      <button className={css.shopCartBtn}>
        <img src="/images/shopcart.svg" alt="Корзина" />
        <div>
          {shopCartCount}
        </div>
      </button>
    </header>
  )
}
