type DropDownBtnProps = {
  items: string[];
  setting: any;
};
export default function DropDownBtn({ items, setting }: DropDownBtnProps) {
  return (
    <>
      {items.map((item, index) => (
        <li
          key={index}
          onClick={() => {
            setting(item);
            // console.log(item);
          }}
        >
          {item}
        </li>
      ))}
    </>
  );
}
