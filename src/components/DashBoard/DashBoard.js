import styles from "./DashBoard.module.css";
import ShoppingCart from "../../assets/DashBoard/shopping_cart.png";
import Value from "../../assets/DashBoard/money.png";
import OutOfStock from "../../assets/DashBoard/sold_out.png";
import Categories from "../../assets/DashBoard/category.png";
import StatsBoard from "../StatsBoard/StatsBoard";
import ActionButton from "../ActionButton/ActionButton";
import { useState, useEffect } from "react";
import axios from "axios";
import StatsTable from "../StatsTable/StatsTable";
import SearchField from "../SearchField/SearchField";
import EditModal from "../EditModal/EditModal";

const DashBoard = () => {
  const [searchText, setSearchText] = useState("");
  const [units_statsTable_data, setUnitStatsTableData] = useState([]);
  const [editModalState, setEditModalState] = useState(false);
  const [id, setId] = useState("");
  const [elementData, setElementData] = useState();
  const [totalProducts, setTotalProduct] = useState(0);
  const [totalMoney, setTotalMoney] = useState("");
  const [outOfStockCount, setOutOfStockCount] = useState(0);

  const dashboard_icons = [ShoppingCart, Value, OutOfStock, Categories];

  const dashboard_details = [
    "Total Products",
    "Total Store Value",
    "Out of Stock",
    "All Categories",
  ];

  const dashboard_details_values = [totalProducts, totalMoney, outOfStockCount, "5"];

  const handleGetMoreDetails = (type, id, data) => {
    if (type === "Delete") {
      axios
        .delete("https://inventory-backend-6068.onrender.com/dashboardRoute/delete-item/" + id)
        .then((res) => {
          if (res.status === 200) {
            alert("Record Deleted Successfully");
            window.location.reload();
          } else {
            Promise.reject();
          }
        })
        .catch((err) => alert(err));
    } else if (type === "Edit") {
      setEditModalState(true);
      setId(id);
      setElementData(data);
    }
  };

  useEffect(() => {
    axios
      .get("https://inventory-backend-6068.onrender.com/dashboardRoute")
      .then((res) => {
        if (res.status === 200) {
          let amount = 0;
          let outOfStockCount = 0;
          const updatedData = res.data.map((item, index) => {
            item.sr_no = index + 1;
            amount += item.price * item.stock;
            if (item.stock === "0") {
              outOfStockCount++; // Increment out-of-stock count
            }
            return {
              ...item,
              action: (
                <div className={styles.action_buttons_wrapper}>
                  <ActionButton
                    buttonText={"Delete"}
                    click={() => handleGetMoreDetails("Delete", item._id)}
                  />
                  <ActionButton
                    buttonText={"Edit"}
                    click={() => handleGetMoreDetails("Edit", item._id, item)}
                  />
                </div>
              ),
            };
          });

          setTotalProduct(res.data.length);
          setTotalMoney("₹" + amount);
          setOutOfStockCount(outOfStockCount); // Set the outOfStockCount state
          setUnitStatsTableData(
            searchText === ""
              ? updatedData
              : updatedData.filter(
                  (item) =>
                    item.name.includes(searchText) ||
                    item.stock.toString().includes(searchText) ||
                    item.category.includes(searchText)
                )
          );
        } else {
          return Promise.reject();
        }
      })
      .catch((err) => alert(err));
  }, [searchText]);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  const units_statsTable_headers = ["Sr no", "Name", "Category", "Stock", "Price", "Action"];

  const units_tableFieldMapping = ["sr_no", "name", "category", "stock", "price", "action"];

  return (
    <>
      <div className={styles.dashboard_wrap}>
        <StatsBoard
          boardName="Inventory Status"
          statIcons={dashboard_icons}
          statNames={dashboard_details}
          statValues={dashboard_details_values}
        />
        <StatsTable
          tableTitle={"DashBoard"}
          tableHeaders={units_statsTable_headers}
          tableData={units_statsTable_data}
          tableFieldMapping={units_tableFieldMapping}
          tableActionsElement={
            <div className={styles.approvals_stats_table_actions}>
              <SearchField searchText={searchText} onSearch={handleSearch} />
            </div>
          }
        />
      </div>
      {editModalState && <EditModal state={setEditModalState} id={id} data={elementData} />}
    </>
  );
};

export default DashBoard;
