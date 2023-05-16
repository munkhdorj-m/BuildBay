import "./productList.css";
import { DataGrid } from "@mui/x-data-grid";
import { DeleteOutline } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, getProducts } from "../../redux/apiCalls";
import { userRequest } from "../../requestMethods";

const AllOrder = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get("orders");
        setOrders(res.data);
      } catch {}
    };
    getOrders();
  }, []);
  const columns = [
    { field: "userId", headerName: "ID", width: 120 },
    {
      field: "number",
      headerName: "Утасны дугаар",
      width: 140,
      // renderCell: (params) => {
      //   return (
      //     <div className="productListItem">
      //       <img className="productListImg" src={params.row.img} alt="" />
      //       {params.row.title}
      //     </div>
      //   );
      // },
    },
    { field: "description", headerName: "Тэмдэглэл", width: 200 },
    {
      field: "amount",
      headerName: "Үнэ",
      width: 120,
    },
    {
      field: "address",
      headerName: "Дэлгэрэнгүй хаяг",
      width: 160,
    },
    {
      field: "city",
      headerName: "Хот/Аймаг",
      width: 120,
    },
    {
      field: "district",
      headerName: "Сум/Дүүрэг",
      width: 120,
    },
    {
      field: "status",
      headerName: "Төлөв",
      width: 160,
    },
    {
      field: "products",
      headerName: "Барааны мэдээлэл",
      width: 300,
      renderCell: (params) => {
        return (
          <>
            {params.value.map((value) => (
              <div>
                {value.productId} - {value.quantity}ш .
              </div>
            ))}
          </>
        );
      },
    },
    {
      //   field: "action",
      //   headerName: "Үйлдэл",
      //   width: 150,
      //   renderCell: (params) => {
      //     return (
      //       <>
      //         <Link to={"/product/" + params.row._id}>
      //           <button className="productListEdit">Засах</button>
      //         </Link>
      //         <DeleteOutline
      //           className="productListDelete"
      //           onClick={() => handleDelete(params.row._id)}
      //         />
      //       </>
      //     );
      //   },
    },
  ];

  return (
    <div className="productList">
      <DataGrid
        rows={orders}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
};

export default AllOrder;
