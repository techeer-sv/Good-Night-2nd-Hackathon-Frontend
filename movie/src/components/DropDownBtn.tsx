type DropDownBtnProps = {
  items: string[];
  setGenre: any;
};
export default function DropDownBtn({ items, setGenre }: DropDownBtnProps) {
  return (
    <>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            setGenre(item);
            // console.log(item);
          }}
        >
          {item}
        </li>
      ))}
    </>
  );
}
