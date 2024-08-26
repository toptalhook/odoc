import { useSelector } from "react-redux";
import List from "@mui/material/List";
import { Exchange } from "../../../declarations/backend/backend.did";
import ContractItem from "./ContractItem";

interface TransactionProps {
  transactionRecords: Array<Exchange>;
}

const TransactionHistory = () => {
  const { wallet } = useSelector((state: any) => state.filesState);
  const transactionRecords = wallet?.balance?.exchanges || [];

  console.log(
    "Transaction Records in transaction component: ",
    transactionRecords,
  );
  return (
    <div style={{ height: "300px", overflowY: "auto" }}>
      <List dense>
        {transactionRecords.map((item: any, index: number) => {
          return (
            <ContractItem
              {...item}
              id={index}
              sender={item.from}
              receiver={item.to}
            />
          );
        })}
      </List>
    </div>
  );
};

export default TransactionHistory;
