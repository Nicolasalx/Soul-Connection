'use client'
import { useState, useEffect } from "react"

function DateTime() {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formattedDate = currentDateTime.toLocaleDateString();
  const formattedTime = currentDateTime.toLocaleTimeString();

  return (
    <div>
      <p>Date: {formattedDate}</p>
      <p>Heure: {formattedTime}</p>
    </div>
  );
}

export default DateTime;
