import { useCheckout } from "../../states/Checkout";
import type { CheckoutState } from "../../states/Checkout";
import { useShopCart, type ShopCartState } from "../../states/Shopcart";
import css from "./Checkout.module.css";
import { CheckoutItemCard } from "../checkout-item-card/CheckoutItemCard";
import { useQuery, useMutation } from "@tanstack/react-query";

function Input({ inputInfo }) {
  return (
    <label>
      <h5>{inputInfo.title}</h5>
      <input
        name={inputInfo.name}
        type={inputInfo.type}
        placeholder={inputInfo.placeholder}
      />
    </label>
  );
}

export function Checkout() {
  const isCheckoutOpen = useCheckout(
    (state: CheckoutState) => state.isCheckoutOpen,
  );
  const closeCheckout = useCheckout(
    (state: CheckoutState) => state.closeCheckout,
  );
  const shopCart = useShopCart((state: ShopCartState) => state.items);
  const totalPrice = useShopCart((state: ShopCartState) => state.totalPrice);
  const setShopCart = useShopCart((state: ShopCartState) => state.setState);
  const setTotalPrice = useShopCart(
    (state: ShopCartState) => state.setTotalPrice,
  );

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["orderItems", shopCart],
    queryFn: async () => {
      const shopCartEntries = Array.from(shopCart.values());
      const url = import.meta.env.VITE_API_URL + "/api/products";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ products: shopCartEntries }),
      });
      if (!response.ok) {
        const result = await response.json();
        if (Array.isArray(result.message))
          throw new Error(result.message.join(", "));
        throw new Error("Возникла непредвиденная ошибка");
      }
      return response.json();
    },
    enabled: isCheckoutOpen && shopCart.size > 0,
  });

  const postOrder = useMutation({
    mutationFn: async (order) => {
      const url = import.meta.env.VITE_API_URL + "/api/orders";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      });
      if (!response.ok) {
        const result = await response.json();
        if (Array.isArray(result.message))
          throw new Error(result.message.join(", "));
        throw new Error("Возникла непредвиденная ошибка");
      }

      return response.json();
    },
    onSuccess: (data) => {
      setShopCart(new Map());
      setTotalPrice(0);
    },
  });

  function handleSubmit(event) {
    event.preventDefault();
    console.log(event);
    const formData = new FormData(event.target);
    const post = {
      customer_name: formData.get("name"),
      customer_contact: formData.get("tel"),
      delivery_address: formData.get("address"),
      products: Array.from(shopCart.values()),
      total_amount: totalPrice,
    };
    postOrder.mutate(post);
  }

  return (
    <>
      <div className={`${css.checkoutWrap} ${isCheckoutOpen ? css.open : ""}`}>
        <div onClick={closeCheckout} className={css.shadowWrap}></div>
        <div className={css.checkoutArea}>
          <div className={css.checkoutHeader}>
            <button onClick={closeCheckout} className={css.btn}>
              х
            </button>
            <h1>Оформление заказа</h1>
          </div>
          <div className={css.items}>
            {shopCart.size < 1 ? (
              <p>Пока товаров нет!</p>
            ) : (
              <>
                {isPending && <p>Загрузка...</p>}
                {isError && <p>Возникла ошибка {error.message}</p>}
                {!(isPending || isError) &&
                  data.map((item) => (
                    <CheckoutItemCard
                      key={item.id}
                      itemInfo={item}
                    ></CheckoutItemCard>
                  ))}
                <div>Итого: {totalPrice}</div>
              </>
            )}
          </div>
          <div>
            {postOrder.isPending ? (
              "Отправка..."
            ) : (
              <>
                {postOrder.isError && (
                  <div>Ошибка: {postOrder.error.message}</div>
                )}

                {postOrder.isSuccess && (
                  <div>
                    Заказ N {postOrder.data.id} на общую сумм{" "}
                    {postOrder.data.total_amount}Р успешно оформлен
                  </div>
                )}

                <form
                  id="post-form"
                  className={css.form}
                  onSubmit={() => handleSubmit(event)}
                >
                  <Input
                    inputInfo={{
                      title: "Имя",
                      name: "name",
                      placeholder: "Имя",
                      type: "text",
                    }}
                  ></Input>
                  <Input
                    inputInfo={{
                      title: "Телефон",
                      name: "tel",
                      placeholder: "Ваш телефон",
                      type: "tel",
                    }}
                  ></Input>
                  <Input
                    inputInfo={{
                      title: "Адрес доставки",
                      name: "address",
                      placeholder: "адрес доставки",
                      type: "text",
                    }}
                  ></Input>
                  <button type="submit" className={css.button}>
                    Оформить
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
