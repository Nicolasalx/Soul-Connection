import { redirect } from 'next/navigation';

export default async function Home()
{
  const response = await fetch('http://localhost:3000/api/employees', { cache: 'no-store' });

  if (!response.ok) {
    console.log('db response nest pas OKKKKKKKKKKK ??!!');
    redirect('/login');
  }

  const employees = await response.json();

  console.log('db response est OK !!');
  console.log(employees);

  redirect('/login');
}
