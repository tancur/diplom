import styles from './History.module.css'
export function HistoryItemDetails(details) {
  const itemDetails = Object.values(details);

  console.log(itemDetails);
  return (
    <>
      
      {itemDetails.map((item,index) => {
        // console.log(item);
        return (
          <tr key={index}>
            <td className={styles.small}>{item.count}</td>
            <td className={styles.big}>{item.good.name}</td>
            <td className={styles.small}>{item.good.price} </td>{" "}
          </tr>
        );
      })}
    </>
  );
}
