export default function Forbidden() {
  return (
    <div className='flex flex-col justify-start p-14'>
      <div className='bg-white rounded flex flex-col items-start p-14 shadow-lg'>
        <h1 className='m-6 text-5xl md:text-6xl'>
          403 - Forbidden:
        </h1>
        <p className='text-3xl md:text-4xl'>You don&apos;t have access to this page.</p>
      </div>
    </div>
  )
}
