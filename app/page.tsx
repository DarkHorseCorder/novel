import Editor from "@/ui/editor";
import Menu from "./menu";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center sm:px-5 sm:pt-[calc(20vh)]">
      {/* <a
        href="https://www.gwcustom.com/"
        target="_blank"
        className="absolute bottom-5 left-5 z-10 max-h-fit rounded-lg p-2 transition-colors duration-200 hover:bg-stone-100 sm:bottom-auto sm:top-5"
      >
        <img src="https://media.licdn.com/dms/image/D560BAQF2bdUryR3OEg/company-logo_200_200/0/1691582372782?e=1700092800&v=beta&t=N3cMSOWDkFmUsIygctqCNYIB4IiLeBXA67nRKuBQLLQ" className="h-28 mr-3" alt="company Logo" />
      </a> */}
      <Menu />
      <Editor />
    </div>
  );
}
