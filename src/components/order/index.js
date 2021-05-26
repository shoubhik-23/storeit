import { Box, Button, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Component } from "react";
import { useHistory } from "react-router";
import { Token } from "../../constant/Api";
import { getOrders } from "../../service/dataService";
import OrderCards from "./orderCards";
const EmptyProfile = (props) => {
  const history = useHistory();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Typography style={{fontSize:18, opacity:0.7,fontWeight:600}}>
          Please Login to your account first.
        </Typography>
      </Grid>
      <Grid item xs={12} style={{ display: "flex", justifyContent: "center" }}>
        <Button variant="outlined" color="primary"  onClick={() => history.push("/login")}>
          Login
        </Button>
      </Grid>
    </Grid>
  );
};
class Order extends Component {
  state={
    data:[]
    
  }
  componentDidMount() {
    getOrders()
      .then((resp) => resp.json()).then((data)=>{
       data?.message==="success"&& this.setState({data:[...data.data]})
      })
      .catch((err) => console.log(err));
  }

  render() {
    
    return <> {Token()?<Grid container spacing={2} style={{padding:"0px 1rem"}}>
    {this.state.data.length>0&&this.state.data.map((el)=><Grid item xs={12}><OrderCards data={el}></OrderCards></Grid>)}
    </Grid>:<EmptyProfile></EmptyProfile>} </>
  }
}

export default Order;