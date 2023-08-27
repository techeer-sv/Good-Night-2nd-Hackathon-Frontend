import { useRouter } from "next/router";

function GNB() {
  const router = useRouter();

  return (
    <div className="mx-10 flex h-24 max-w-full place-items-center tablet:w-full tablet:max-w-screen-xl">
      <nav
        className="flex w-full space-x-2 self-center"
        onClick={() => {
          router.replace("/");
        }}
      >
        <img
          className="h-12 w-fit cursor-pointer rounded-full"
          src={"png/logo.png"}
          alt={"logoImg"}
        />
        <button
          className={"hidden tablet:block tablet:text-xl tablet:font-semibold"}
        >
          GoodNight 2nd Hackathon
        </button>
      </nav>
    </div>
  );
}

export default GNB;
