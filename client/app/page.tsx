"use client"
import Image from "next/image"
import { useRouter } from 'next/navigation'
import './board.css'
export default function Home() {
  const router = useRouter()
  //Opens page on click

  
  const handleClick = async () => {    
    router.push('/user')
  } 

  const handleButtonClick = (id) => {
    console.log("Button " + id + " was clicked")
  } 

  return (
    <div className = "board">
      <div className = "line1"></div>
      <div className = "line2"></div>
      <div className = "line3"></div>
      <div className = "line4"></div>
      <div className = "line5"></div>
      <div className = "rectangle"></div>
      <button id = "A1" onClick = {() => handleButtonClick("A1")} className = "button" style = {{left: '613px', top: '90px'}}></button>
      <button id = "B1" onClick = {() => handleButtonClick("B1")} className = "button" style = {{left: '294px', top: '270px'}}></button>
      <button id = "B2" onClick = {() => handleButtonClick("B2")} className = "button" style = {{left: '508px', top: '270px'}}></button>
      <button id = "B3" onClick = {() => handleButtonClick("B3")} className = "button" style = {{left: '580px', top: '270px'}}></button>
      <button id = "B4" onClick = {() => handleButtonClick("B4")} className = "button" style = {{left: '644px', top: '270px'}}></button>
      <button id = "B5" onClick = {() => handleButtonClick("B5")} className = "button" style = {{left: '716px', top: '270px'}}></button>
      <button id = "B6" onClick = {() => handleButtonClick("B6")} className = "button" style = {{left: '930px', top: '270px'}}></button>
      <button id = "C1" onClick = {() => handleButtonClick("C1")} className = "button" style = {{left: '294px', top: '435px'}}></button>
      <button id = "C2" onClick = {() => handleButtonClick("C2")} className = "button" style = {{left: '415px', top: '435px'}}></button>
      <button id = "C3" onClick = {() => handleButtonClick("C3")} className = "button" style = {{left: '552px', top: '435px'}}></button>
      <button id = "C4" onClick = {() => handleButtonClick("C4")} className = "button" style = {{left: '673px', top: '435px'}}></button>
      <button id = "C5" onClick = {() => handleButtonClick("C5")} className = "button" style = {{left: '810px', top: '435px'}}></button>
      <button id = "C6" onClick = {() => handleButtonClick("C6")} className = "button" style = {{left: '930px', top: '435px'}}></button>
      <button id = "D1" onClick = {() => handleButtonClick("D1")} className = "button" style = {{left: '325px', top: '590px'}}></button>
      <button id = "D2" onClick = {() => handleButtonClick("D2")} className = "button" style = {{left: '525px', top: '590px'}}></button>
      <button id = "D3" onClick = {() => handleButtonClick("D3")} className = "button" style = {{left: '700px', top: '590px'}}></button>
      <button id = "D4" onClick = {() => handleButtonClick("D4")} className = "button" style = {{left: '900px', top: '590px'}}></button>
    </div>
  );
}

