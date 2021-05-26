import { makeStyles } from "@material-ui/core";

export const style = makeStyles(() => ({
  pageTitle: {
    fontSize: 22,
    fontWeight: 500,
    color: "#35332B",
  },
  pageSubTitle: {
    fontSize: 10,
    fontWeight: 500,
    color: "#35332B",
    opacity: 0.5,
  },

  // ------------------------------------------------------
  active:{
    backgroundColor:'rgba(0, 0, 0, 0.08)',
    borderRadius:'5px'
  },
 
  paginationButton:{
    border:'none',
    outline:'none',
    backgroundColor:'white',
    padding:'5px 8px',
    fontSize:'12px',
    cursor:'pointer',
  },
 
}));
