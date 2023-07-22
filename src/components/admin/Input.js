import { useState } from "react"
import { useDispatch } from "react-redux";
import { actionPromise } from "../../store/promiseReduser";
import {gqlCategoryEdit } from "../../sql/request";

export function Input({inputText,item}){
  // console.log(item)
  const dispatch = useDispatch();
  const [text, setText] = useState(inputText)
  return(
   <> <input type="text" value ={text} onChange={(e)=>{setText(e.target.value)}}/>
   <button onClick={() =>
                        dispatch(
                        actionPromise(
                          "editCategories",
                          gqlCategoryEdit({item,text})
                         
                        )
                        )
                        // console.log(item)
                      }>edit</button>
   
</>
  )
}