import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { _id } = useParams();

  const [selecteProductItem, setSelectedProductItem] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://mocki.io/v1/bd4f5f35-83cd-428f-92fd-cd61f7cd7a24`
        );
        const data = await response.json();

        const product = data
          .map((category) => category?.list)
          .flat()
          .find((item) => item._id === _id);
        console.log("Selected Product:", product);

        setSelectedProductItem(product);
        setSelectedSize("");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [_id]);

  const handleSizeChange = (e) => {
    setSelectedSize(e.target.value);
  };

  return (
    <div className="container m-auto">
      {selecteProductItem && (
        <div className="my-6 md:flex bg-mainBg rounded-md">
          <img
            alt=""
            src={selecteProductItem?.image}
            className="md:w-1/2 rounded-md"
          />
          <div className="flex flex-col justify-start m-6 p-2 items-start text-white">
            <h3 className="text-4xl font-bold">{selecteProductItem?.title}</h3>
            <h4 className="text-md text-white">
              {selecteProductItem?.description}
            </h4>
            <a
              href="/"
              className="text-md text-white bg-black mt-2 p-2 capitalize"
            >
              {selecteProductItem?.cta}
            </a>
            <div className="mt-4">
              <h5 className="bg-white rounded-md p-2  w-full md:w-20 text-center text-black">
                {selecteProductItem?.prize}
              </h5>
              <div className="mt-2">
                <label htmlFor={`sizeDropdown`} className="mt-4">
                  Choose Your Size:
                </label>
                <select
                  id={`sizeDropdown`}
                  value={selectedSize}
                  onChange={handleSizeChange}
                  className="m-2 text-black"
                >
                  <option value="">Select Size</option>
                  {selecteProductItem?.sizesDropdown?.map((size, index) => (
                    <option key={index} value={size?.value}>
                      {size?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
