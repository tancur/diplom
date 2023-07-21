import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

export function Count(){
  const goodsToBuy = useSelector((state) => state.basket);
  
  const [count, setCount] = useState(0);
  
  const goods = Object.values(goodsToBuy);

  useEffect(() => {
    

    const totalCount = goods.reduce((accumulator, good) => {
      return accumulator + good.count;
    }, 0);
    setCount(totalCount);
  }, [goods]);
  return(
    <><ShoppingCartIcon />{count}</>

  )
}