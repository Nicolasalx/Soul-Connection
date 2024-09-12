import NavBar from "@/components/NavBar";

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
        <div className="flex flex-col h-full w-full p-6">
          <div className="bg-white border text-black rounded-small p-12">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
