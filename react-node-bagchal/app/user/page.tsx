"use client"
import React, {useEffect,useState} from 'react';

export default function page() {
  const [data, setData] = useState("")

  //Grabs and sets data to API 
  useEffect(() => {
    fetch("/api/test")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, [])

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {data}
    </div>
  );
}
