import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import Cards from "../components/Cards";
import Card from "../components/Card";
import CardList from "../components/CardList";
import { animateScroll as scroll } from "react-scroll";
import axios from "axios";
import dayjs from "dayjs";

import "../index.css";

function Top() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const main = async () => {
      try {
        const now = dayjs().format("YYYY-MM-DD");

        const res = await axios.get(
          `https://api.nhk.or.jp/v2/pg/list/130/g1/${now}.json?key=v7p6iqUGenYxuaH4Kkhl0TK6YGHABRZe`
        );
        setCards(res.data.list.g1);
      } catch (e) {
        console.log(e);
      }

    };
    main();
  }, []);
  console.log(cards)
  return (
    <Layout>
      <CardList>
      {cards.map(card => (
          <Card
          title={card.title}
          />
        ))}
      </CardList>
      <div
        className="button button--totop"
        onClick={() => scroll.scrollToTop()}
      ></div>
    </Layout>
  );
}
export default Top;