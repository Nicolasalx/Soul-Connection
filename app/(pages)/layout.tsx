import NavBar from "@/components/NavBar";
import ContentWrapper from "../../components/ContentWrapper";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className=" w-0 mt-2 md:flex-2 ">
        <NavBar />
      </div>
      <div className="flex justify-center w-full h-full mt-32">
        <div className="flex flex-col h-full w-full p-6">{children}</div>
      </div>
    </>
  );
}
