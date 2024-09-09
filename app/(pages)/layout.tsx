import NavBar from "@/components/NavBar";

export default function RootLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <>
        <div className="flex-none w-0 md:flex-2 md:w-[20%]">
          <NavBar />
        </div>
        <div className="flex flex-auto md:flex-3 justify-center w-full md:w-[80%]">
          <div className="flex flex-col h-full w-full p-6">
            <div className="bg-white border border-gray-300 p-12 rounded-lg">
              {children}
            </div>
          </div>
        </div>
      </>
    );
  }
