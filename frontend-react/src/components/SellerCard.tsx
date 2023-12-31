import * as React from "react";
import { Seller } from "../types";
import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, IconButtonProps, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { green } from "@mui/material/colors";
import { TransactionsTable } from "./TransactionsTable";


export interface ISellerCardProps {
  seller: Seller;
}

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SellerCard({ seller }: ISellerCardProps) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return <Card>
  <CardHeader
    title={seller.name}
    subheader={`Cargo: ${seller.type}`}
  />
  <CardContent>
    <Typography variant="h6" color={green[700]}>
    Total: {seller.total}
    </Typography>
  </CardContent>
  <CardActions disableSpacing>
    <ExpandMore
      expand={expanded}
      onClick={handleExpandClick}
      aria-expanded={expanded}
      aria-label="show more"
    >
      <ExpandMoreIcon />
    </ExpandMore>
  </CardActions>
  <Collapse in={expanded} timeout="auto" unmountOnExit>
    <CardContent>
      <TransactionsTable transactions={seller.transactions} />
    </CardContent>
  </Collapse>
</Card>;
}
