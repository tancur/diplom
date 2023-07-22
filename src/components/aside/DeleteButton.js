export function Button({ item, text, onClick }) {
  console.log(item, text);
  return (
    // <button onClick={()=>{console.log(item)}}>{text}</button>
    <button onClick={onClick}>{text}</button>
    // <button >{text}</button>
  );
}
