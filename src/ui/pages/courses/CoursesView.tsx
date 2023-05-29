import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  CardComponentGrid,
  CardComponentList,
  CardInfo,
} from "./CardComponent";
import { Link } from "react-router-dom";

export type CardListProps = {
  title: string;
  data: CardInfo[];
};

export const ListView: React.FC<CardListProps> = ({ title, data }) => (
  <div>
    <Typography
      variant="h4"
      component="h1"
      marginBottom={"10px"}
      color="primary"
    >
      {title}
    </Typography>
    {data.map((info, index) => (
      <Link to={`/courses/${index+1}`} style={{ textDecoration: "none" }} key={index}>
        <CardComponentList  info={info} />
      </Link>
    ))}
  </div>
);

export const GridView: React.FC<CardListProps> = ({ title, data }) => {
  const theme = useTheme();


  return (
    <div>
      <Typography
        variant="h4"
        component="h1"
        marginBottom={"10px"}
        color="primary"
      >
        {title}
      </Typography>
      <Grid container spacing={2}>
        {data.map((info,index) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
            <Link to={`/courses/${index+1}`} style={{ textDecoration: "none" }}>
              <CardComponentGrid info={info} />
            </Link>
          </Grid>
        ))}
      </Grid>
    </div>
    
  );
};
