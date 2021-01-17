
import React, { useEffect, useState } from 'react';
import Layout from './components/Layout'
import Card from './components/Card';

export default function App() {
  const [cards, setCards] = useState([
//オブジェクトが６つ入った配列
    { title: "カード1", description: "Lorem ipsum dolor sit amet. ", color: "", hasError: false, hidden:false, id:"01" },
    { title: "カード2", description: "Lorem ipsum dolor sit amet. ", color: "", hasError: false, hidden:false, id:"02" },
    { title: "カード3", description: "Lorem ipsum dolor sit amet. ", color: "", hasError: false, hidden:false, id:"03" },
    { title: "カード4", description: "Lorem ipsum dolor sit amet. ", color: "", hasError: false, hidden:false, id:"04" },
    { title: "カード5", description: "Lorem ipsum dolor sit amet. ", color: "", hasError: false, hidden:false, id:"05" },
    { title: "カード6", description: "Lorem ipsum dolor sit amet. ", color: "", hasError: false, hidden:false, id:"06" },
  ])
//ID取得（ボタンを押したらIDを取得している）
  const clickButton = (id) => {
//ボタンを押したらconsoleにID番号が出るか確認　
    console.log(id)
    const newCards = cards.map(card => {
//上記のcardsがmapを使って、返したものがnewCardsになる
      if (card.id != id) return card
//もしも、cardの中のidがボタンを押したオブジェクトのIDじゃなかったら返却し、ボタンのIDだったらオブジェクトをNewcardへ。
      const newCard = {
        ...card,
//...の意味：cardの中身（オブジェクトを省略）
        hidden: true
//hidden:falseをtrueに変更する
      }
      return newCard
    })
      //Newcardに返す
    setCards(newCards)
  }

  return (
    <Layout>
      {cards.map(card => (
        <>
          {card.hidden == false &&
                 <ul className="grid md:grid-cols-3 gap-4 my-4">
                   <li className="flex justify-center items-center bg-indigo-900 h-64">
                    <h2 className="text-white uppercase text-xl">{card.title}</h2>
                    <button onClick={() => clickButton(card.id)}>閉じる</button>
                  </li>
               </ul>
          }
        </>
      ))}
    </Layout>
  );
}

