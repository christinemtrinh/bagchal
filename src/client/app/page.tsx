"use client"
import { useRouter } from 'next/navigation'
import Board from './components/Board/Board'
import Rules from './components/Rules/Rules'


export default function Home() {
  const router = useRouter()
  var tempTigerLocation

  //Opens page on click
  const handleClickToUser = async () => {    
    router.push('/user')
  } 

  return (
    <div>
      <Rules/>
      <Board/>
      <Rules/>
  </div>
  );
}

