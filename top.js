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

        const api = await axios.get(
          `https://api.nhk.or.jp/v2/pg/list/130/g1/${now}.json?key=v7p6iqUGenYxuaH4Kkhl0TK6YGHABRZe`
        );

        console.log(api);
      } catch (e) {
        console.log(e);
      }

      setCards([
        {
          title: "カード1",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード2",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード3",
          description: "Lorem ipsum dolor sit amet. ",
          color: "yellow",
          hasError: false,
        },
        {
          title: "カード4",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード5",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: true,
        },
        {
          title: "カード6",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード7",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード8",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード9",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード10",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード11",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
        {
          title: "カード12",
          description: "Lorem ipsum dolor sit amet. ",
          color: "",
          hasError: false,
        },
      ]);
    };
    main();
  }, []);
  return (
    <Layout>
      <CardList>
        {cards.map((card) => (
          <Card
            title={card.title}
            description={card.description}
            color={card.color}
            hasError={card.hasError}
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
