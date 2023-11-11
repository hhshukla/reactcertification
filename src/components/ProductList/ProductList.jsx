import React, { useEffect, useState } from "react";
import clsx from "clsx";
// import { ProductListData } from "./ProductList";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [activeList, setActiveList] = useState([]);
  const [selectedTitle, setSelectedTitle] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://mocki.io/v1/0885679c-a329-44f4-9685-5334fe1a3e92"
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
      if (activeTab) {
        const products = data?.find((a) => activeTab === a.title);
        setActiveList(products?.list || []);
        setSelectedTitle([]);
      } else {
        const allProducts = Object.values(data).flatMap(
          (category) => category.list
        );
        setActiveList(allProducts);
        setSelectedTitle([]);
      }
    };

    fetchData();
  }, [activeTab, data]);

  const TitleClick = (title) => {
    setActiveTab((selected) => (selected === title ? null : title));
    if (activeTab == title) {
      setSelectedTitle([]);
    }
  };

  const renderProductListData = () => {
    return activeList?.map((card, i) => {
      return (
        <div key={i}>
          <div
            tabIndex={0}
            onClick={() => TitleClick(card.title)}
            className="mx-4 my-6 bg-subColor p-5 rounded-md transition ease-in-out delay-50  hover:-translate-y-1 hover:scale-110  duration-300"
          >
            <img src={card?.image} />

            <h3
              className={clsx("flex mt-5 text-white ", {
                "text-green font-raleway ": selectedTitle?.includes(card.title),
                "text-red font-raleway": !selectedTitle?.includes(card.title),
                "text-blue": !card.isActive,
              })}
            >
              {card?.title}
            </h3>
            <h4 className=" text-md text-white">{card?.description}</h4>
            <Link to={`/${card._id}`} className="text-md text-white capitalize">
              {card?.cta}
            </Link>
            <div className=" mt-4">
              <h5 className="bg-white rounded-md p-2  md:w-20 text-center">
                {card?.prize}
              </h5>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderCardList = () => {
    if (!Array.isArray(data)) {
      return null;
    }
    return data?.map((card, index) => (
      <li
        className={clsx("", {
          "text-white hover:border-b-2": activeTab === card?.title,
          "text-mainBg": activeTab !== card?.title,
        })}
        key={index}
        onClick={() => {
          TitleClick(card?.title);
        }}
        tabIndex={0}
      >
        <h2>{card?.title}</h2>
      </li>
    ));
  };

  return (
    <div className="container m-auto">
      {loading && <p className="text-black text-md3">Loading...</p>}
      {error && <p className="text-red text-md3">Error: {error}</p>}
      <div className="mt-4">
        <p className="text-xl font-bold text-center  ">
          {selectedTitle.join(",") || "Select your Choice"}
        </p>
      </div>
      <ul className="flex justify-around items-center text-2xl font-md m-4 cursor-pointer bg-subColor hover:text-white rounded-lg">
        {renderCardList()}
      </ul>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-4">
        {renderProductListData()}
      </div>
    </div>
  );
};

export default ProductList;
