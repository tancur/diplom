import { HistoryItemDetails } from "./HistoryItemDetails";
import styles from './History.module.css'
export function HistoryItem(good) {
  console.log(good.good.orderGoods);

  let createdAt = new Date(parseInt(good.good.createdAt)).toLocaleString();
  // console.log(createdAt)
  return (
    <>
      <div className={styles.item}>
        <p>order № {good.good._id}</p>
        <p>от {createdAt}</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <td className={styles.small}>Count</td>
              <td className={styles.big}>Good</td>
              <td className={styles.small}>Price</td>
            </tr>
          </thead>
          <tbody>
            {good.good.orderGoods.map((details) => {
              //  console.log(details);

              return <HistoryItemDetails details={details} />;
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
