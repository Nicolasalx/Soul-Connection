export default function Forbidden() {
  return (
    <div className="flex flex-col h-full w-[500px] md:w-[80%] justify-center p-14">
      <div className='bg-white border border-gray-300 flex flex-col items-center p-14 rounded-lg shadow-lg'>
        <h1 className='m-6 text-5xl md:text-6xl'>
          403 - Forbidden
        </h1>
        <p className='text-3xl md:text-4xl'>You don&apos;t have access to this page.</p>
      </div>
    </div>
  )
}
