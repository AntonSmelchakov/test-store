import { useShopCart } from "../../states/Shopcart";
import css from "./Header.module.css";
import type { ShopCartState } from "../../states/Shopcart";
import cartSvg from "../../assets/shopping_cart.svg"
import { useCheckout } from "../../states/Checkout";
import type { CheckoutState } from "../../states/Checkout";

export function Header() {
  const shopCartCount = useShopCart((state: ShopCartState) => state.items.size);
  const openCheckout = useCheckout((state: CheckoutState) => state.openCheckout);

  return (
    <header className={css.header}>
      <h1 className={css.companyName}>
        Бубльгум
      </h1>
      <button className={css.shopCartBtn} onClick={openCheckout}>
        <img src={cartSvg} alt="Корзина" />
        <div className={css.shopCartCount}>
          <span>{shopCartCount}</span>
          <span>{shopCartCount}</span>
        </div>
      </button>
    </header>
  )
}
