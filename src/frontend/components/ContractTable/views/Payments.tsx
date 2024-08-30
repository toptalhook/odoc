import DataGridSheet from "../../DataGrid";
import React from "react";
import { textEditor } from "react-data-grid";
import { senderDropDown } from "../renders/senderDropDown";
import { statusDropDown } from "../renders/statusDropDown";
import { receiverDropDown } from "../renders/receiverDropDown";
import { CPayment } from "../../../../declarations/backend/backend.did";
import { renderUser } from "../renders/renderUser";

function Payments(props) {
  console.log("contract in payments: ", props.contract);
  let rows = [];

  let columns = [
    // SelectColumn,
    // {
    //     key: 'id',
    //     name: 'ID',
    //     width: 30,
    //     resizable: true,
    //     frozen: true,
    // },
    {
      key: "receiver",
      name: "receiver",
      width: "max-content",
      renderCell: renderUser,
      renderEditCell: receiverDropDown,
      frozen: true,
    },
    {
      key: "sender",
      name: "sender",
      width: "max-content",
      frozen: true,
      renderCell: renderUser,
      renderEditCell: senderDropDown,
    },
    {
      key: "amount",
      name: "amount",
      width: "max-content",
      renderEditCell: textEditor,
      frozen: true,
    },
    {
      key: "status",
      name: "status",
      width: "max-content",
      renderEditCell: statusDropDown,
      frozen: true,
      // resizable: true,
      // sortable: true,
      // draggable: true
    },
  ];

  props.contract.payments.forEach((payment: CPayment) => {
    let status = Object.keys(payment.status)[0];
    rows.push({
      sender: payment.sender.toString(),
      receiver: payment.receiver.toString(),
      status,
      amount: payment.amount,
      id: payment.id,
    });
  });

  return (
    <DataGridSheet
      initRows={rows}
      initColumns={columns}
      contract={props.contract}
    />
  );
}

export default Payments;
