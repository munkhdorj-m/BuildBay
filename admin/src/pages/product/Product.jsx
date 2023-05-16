import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import { updateProduct } from "../../redux/apiCalls";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase";
export default function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const [file, setFile] = useState(null);
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);

  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const [productObj, setProductObj] = useState({ ...product });

  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  const handleUpdate = (id, product) => {
    toast.success("Амжилттай шинэчлэлээ", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    updateProduct(id, product, dispatch);
  };

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);
  console.log(productObj);
  return (
    <>
      {product ? (
        <div className="product">
          <div className="productTitleContainer">
            <h1 className="productTitle">Бүтээгдэхүүн</h1>
            <Link to="/newproduct">
              <button className="productAddButton">Үүсгэх</button>
            </Link>
          </div>
          <div className="productTop">
            <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Зарагдсан байдал" />
            </div>
            <div className="productTopRight">
              <div className="productInfoTop">
                <img src={product.img} alt="" className="productInfoImg" />
                <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                <div className="productInfoItem">
                  <span className="productInfoKey">id: </span>
                  <span className="productInfoValue">{product._id}</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Зарсан:</span>
                  <span className="productInfoValue">5</span>
                </div>
                <div className="productInfoItem">
                  <span className="productInfoKey">Агуулахад байгаа:</span>
                  <span className="productInfoValue">{product.inStock}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="productBottom">
            <form className="productForm">
              <div className="productFormLeft">
                <label>Бүтээгдэхүүний нэр</label>
                <input
                  type="text"
                  placeholder={product.title}
                  onChange={(e) =>
                    setProductObj({ ...productObj, title: e.target.value })
                  }
                />
                <label>Бүтээгдэхүүний тайлбар</label>
                <input
                  type="text"
                  placeholder={product.desc}
                  onChange={(e) =>
                    setProductObj({ ...productObj, desc: e.target.value })
                  }
                />
                <label>Үнэ</label>
                <input
                  type="text"
                  placeholder={product.price}
                  onChange={(e) =>
                    setProductObj({ ...productObj, price: e.target.value })
                  }
                />
                <label>Агуулахад байгаа</label>
                <select name="inStock" id="idStock">
                  <option value="true">Тийм</option>
                  <option value="false">Үгүй</option>
                </select>
              </div>
              <div className="productFormRight">
                <div className="productUpload">
                  <img
                    src={product.img}
                    alt=""
                    className="productUploadImg"
                    onChange={(e) => setProductObj({ img: e.target.value })}
                  />
                  <label for="file">
                    <Publish />
                  </label>
                  <input
                    type="file"
                    id="file"
                    style={{ display: "none" }}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                </div>
                <button
                  className="productButton"
                  onClick={(e) => {
                    e.preventDefault();
                    handleUpdate(product._id, productObj);
                  }}
                >
                  Шинэчлэх
                </button>
              </div>
            </form>
          </div>
          <ToastContainer />
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
}
