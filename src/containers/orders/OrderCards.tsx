//@ts-nocheck
import React from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import css from "./style.module.css";
import ReactPDF from "@react-pdf/renderer";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
} from "@mui/material";
import moment from "moment";
import MyDocument from "./MyDocument";
import { PDFViewer } from "@react-pdf/renderer";

interface props {
  expanded: boolean;
  items?: any;
  children?: any;
  onHandleChange: any;
  date: any;
}

const OrderCards = (props: props) => {
  const ref: any = React.createRef();

  return (
    <Accordion expanded={true} ref={ref}>
      <AccordionSummary
        // expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        className="MuiAccordionSummary-content"
      >
        <div
          style={{
            height: 50,
            boxSizing: "border-box",
            overflow: "hidden",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            {props.items.slice(0, 3)?.map((el: any, i: any) => (
              <div
                key={i}
                style={{
                  height: 50,
                  overflow: "hidden",
                  width: 50,
                  boxSizing: "border-box",
                }}
              >
                <img
                  style={{
                    height: "100%",

                    width: "100%",
                    imageRendering: "pixelated",
                    objectFit: "contain",
                  }}
                  src={el.imageUrl}
                  alt="product"
                ></img>
              </div>
            ))}

            {props.items.length - 3 > 0 && (
              <div>
                <p>+ {props.items?.slice(3).length} more</p>
              </div>
            )}
          </div>
        </div>
        <div>
          <p>
            Placed on: <span>{moment(props.date).format("DD-MM-YY")}</span>
          </p>
        </div>
      </AccordionSummary>

      <AccordionDetails>
        {props.items?.map((el: any, i: number) => (
          <div
            style={{
              display: "flex",
            }}
          >
            <p style={{ flex: 0.1 }}>{el.count}</p>
            <p style={{ flex: 0.1 }}>&times; </p>
            <p style={{ flex: 0.8 }}>{el.name}</p>
          </div>
        ))}
        <div className={css.invoiceButtonContainer}>
          <Button variant="outlined">Invoice</Button>
        </div>

        {/* <ReactToPdf targetRef={ref} filename="div-blue.pdf">
          {({ toPdf }: any) => <button onClick={toPdf}>Generate pdf</button>}
        </ReactToPdf> */}
        {/* <PDFViewer>
          <MyDocument />
        </PDFViewer> */}
      </AccordionDetails>
    </Accordion>
  );
};

export default OrderCards;
