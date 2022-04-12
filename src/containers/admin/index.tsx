import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import React, { useState } from "react";
import { firebaseDB, firebaseStorage } from "../../firebase/firebase_Config";

const AdminComponent = () => {
  const [file, setFile] = useState<any>(undefined);
  const [descriptionBox, setDescriptionBox] = useState<any[]>([1]);
  const [data, setData] = useState<any>({
    name: "",
    brand: "",
    price: "",
    description: [""],
    category: "electronics",
    subCategory: "",
    discount: "",
    rating: "",
  });
  const onFileLoad = (e: any) => {
    setFile(e.target.files[0]);
  };
  const onChangeHandler = (e: any, type: string, index?: any) => {
    let value = e.target.value;
    switch (type) {
      case "name":
        setData((prev: any) => ({ ...prev, name: value }));
        break;
      case "brand":
        setData((prev: any) => ({ ...prev, brand: value }));
        break;
      case "price":
        setData((prev: any) => ({ ...prev, price: value }));
        break;
      case "description":
        {
          let temp: any[] = [...data.description];
          temp[index] = value;
          setData((prev: any) => ({ ...prev, description: temp }));
        }

        break;
      case "category":
        setData((prev: any) => ({ ...prev, category: value }));

        break;
      case "subCategory":
        setData((prev: any) => ({ ...prev, subCategory: value }));
        break;
      case "discount":
        setData((prev: any) => ({ ...prev, discount: value }));
        break;
      case "rating":
        setData((prev: any) => ({ ...prev, rating: value }));
    }
  };
  const onSubmitHandler = async () => {
    const storageRef = ref(firebaseStorage, `products/${file?.name}`);
    const firebaseDataBaseRef = collection(firebaseDB, "products");
    try {
      await uploadBytes(storageRef, file);
      const downloadUrl = await getDownloadURL(storageRef);
      const docs = await doc(firebaseDataBaseRef);
      const docRef = await setDoc(docs, {
        ...data,
        id: docs.id,
        imageUrl: downloadUrl,
      });
    } catch (error) {
      console.log(error);
    }
    setData({
      name: "",
      brand: "",
      price: "",
      description: [""],
      category: "electronics",
      subCategory: "",
      discount: "",
      rating: "",
    });
    setFile(undefined);
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography style={{ color: "red" }}>
          Welcome to Admin Pannel
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="name"
          fullWidth
          variant="outlined"
          placeholder="Name"
          value={data.name}
          onChange={(e) => onChangeHandler(e, "name")}
          style={{ margin: "20px 0" }}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="brand"
          fullWidth
          variant="outlined"
          placeholder="brand"
          value={data.brand}
          onChange={(e) => onChangeHandler(e, "brand")}
          style={{ margin: "20px 0" }}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="price"
          fullWidth
          variant="outlined"
          type="number"
          placeholder="Price"
          value={data.price}
          onChange={(e) => onChangeHandler(e, "price")}
          style={{ margin: "20px 0" }}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="discount"
          fullWidth
          variant="outlined"
          type="number"
          placeholder="discount"
          value={data.discount}
          onChange={(e) => onChangeHandler(e, "discount")}
          style={{ margin: "20px 0" }}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        {data.description.map((el: any, i: any) => (
          <TextField
            key={i}
            label="description"
            fullWidth
            variant="outlined"
            placeholder="description"
            value={data.description[i]}
            onKeyPress={(e) =>
              e.key === "Enter" &&
              setData((prev: any) => ({
                ...prev,
                description: [...prev.description, ""],
              }))
            }
            onChange={(e) => onChangeHandler(e, "description", i)}
            style={{ margin: "20px 0" }}
          ></TextField>
        ))}

        <Button
          onClick={() =>
            setData((prev: any) => ({
              ...prev,
              description: [...prev.description, ""],
            }))
          }
        >
          Add More
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Select
          fullWidth
          label="category"
          onChange={(e) => onChangeHandler(e, "category")}
          value={data.category}
        >
          <MenuItem value={"electronics"}>Electronics</MenuItem>
          <MenuItem value={"grocery"}>Grocery</MenuItem>
          <MenuItem value={"footwear"}>Footwear</MenuItem>
          <MenuItem value={"household"}>Household</MenuItem>
          <MenuItem value={"clothing"}>Clothing</MenuItem>
          <MenuItem value={"kitchen"}>Kitchen</MenuItem>
          <MenuItem value={"clothing"}>Clothing</MenuItem>
          <MenuItem value={"garden"}>Garden</MenuItem>
          <MenuItem value={"book"}>Book</MenuItem>
        </Select>
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="SubCategory"
          fullWidth
          variant="outlined"
          placeholder="Sub-Category"
          value={data.subCategory}
          onChange={(e) => onChangeHandler(e, "subCategory")}
          style={{ margin: "20px 0" }}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="rating"
          fullWidth
          variant="outlined"
          type="number"
          placeholder="rating"
          value={data.rating}
          onChange={(e) => onChangeHandler(e, "rating")}
          style={{ margin: "20px 0" }}
        ></TextField>
      </Grid>
      <Grid item xs={12}>
        <p>{file?.name}</p>
        <input type={"file"} onChange={onFileLoad} />
      </Grid>
      <Grid item xs={12}>
        <Button
          onClick={onSubmitHandler}
          variant="contained"
          fullWidth
          disabled={
            (!data.name && !data.price) ||
            !data.brand ||
            !data.category ||
            !data.subCategory ||
            !data.description ||
            !data.rating ||
            !file
          }
        >
          Submit
        </Button>
      </Grid>
    </Grid>
  );
};

export default AdminComponent;
