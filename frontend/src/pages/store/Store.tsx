import { useQuery } from "@tanstack/react-query"
import { ItemCard } from "../../components/item-card/ItemCard";
import css from "./Store.module.css"

export function Store() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ['storeItems'],
    queryFn: async () => {
      const url = import.meta.env.VITE_API_URL + "/api/products";
      const response = await fetch(url);
      if (!response.ok) {
            throw new Error('Network response was not ok')
          }
      return response.json()
    }
    })

  console.log(data);
  console.log(error);

  return (
    <div className={css.storeWrap} >
      {isPending && (
        <p>Загрузка...</p>
        )}
      {isError && (
        <p>Возникла ошибка { error.message }</p>
        )}
      {!(isPending || isError) && data.map((item) => (
        <ItemCard key={item.id} itemInfo={item}></ItemCard>
      ))}
    </div>
  )
}
