import { AddCircleOutline, RemoveCircleOutline } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";

import { useDispatch } from "react-redux";
import {
  setDecreaseCartQty,
  setIncreaseCartQty,
  setRemoveCartProduct,
} from "../../redux/ProductSlice";

const CartTableRow = ({ cartProd }) => {
  const dispatch = useDispatch();

  function ccyFormat(num) {
    return `${num.toFixed(2)}`;
  }
  return (
    <TableRow key={cartProd.id}>
      <TableCell>
        <Card sx={{ maxWidth: 700 }}>
          <Stack direction="row">
            <CardMedia
              sx={{ height: 90, width: 90 }}
              image={cartProd.thumbnail}
              title={cartProd.title}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {cartProd.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {cartProd.description.slice(0, 60)}
              </Typography>
            </CardContent>
          </Stack>
        </Card>
      </TableCell>
      <TableCell align="right">{`${cartProd.price} Rs.`}</TableCell>
      <TableCell align="right">
        <Button
          endIcon={<AddCircleOutline />}
          onClick={() => dispatch(setIncreaseCartQty({ id: cartProd.id }))}
          sx={{ color: "#E40144" }}
        ></Button>
        <Button>{cartProd.qty}</Button>
        <Button
          endIcon={<RemoveCircleOutline />}
          onClick={() => {
            if (cartProd.qty === 1) {
              dispatch(setRemoveCartProduct({ id: cartProd.id }));
            } else {
              dispatch(setDecreaseCartQty({ id: cartProd.id }));
            }
          }}
          sx={{ color: "#E40144" }}
        ></Button>
      </TableCell>
      <TableCell align="right">
        {ccyFormat(cartProd.qty * cartProd.price)}
      </TableCell>
    </TableRow>
  );
};

export default CartTableRow;
