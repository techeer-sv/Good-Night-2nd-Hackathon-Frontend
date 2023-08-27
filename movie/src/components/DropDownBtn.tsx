type DropDownBtnProps = {
  items: string[];
  setting: any;
};
export default function DropDownBtn({ items, setting }: DropDownBtnProps) {
  const isAdmin = localStorage.getItem('admin') === 'true';
  return (
    <>
      {items.map((item, index) => (
        <li
          className={`${isAdmin ? 'text-white' : 'text-black'} cursor-pointer`}
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
