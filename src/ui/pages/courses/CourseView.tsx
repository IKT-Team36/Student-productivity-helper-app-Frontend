import * as React from "react";
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  CardComponentGrid,
  CardComponentList,
  CardInfo,
} from "./CardComponent";

export type CardListProps = {
  title: string;
  data: CardInfo[];
};

export const ListView: React.FC<CardListProps> = ({ title, data }) => (
  <div>
    <Typography variant="h4" component="h1">
      {title}
    </Typography>
    {data.map((info) => (
      <CardComponentList key={info.id} info={info} />
    ))}
  </div>
);

export const GridView: React.FC<CardListProps> = ({ title, data }) => {
  const theme = useTheme();
  const matches = {
    sm: useMediaQuery(theme.breakpoints.down("sm")),
    md: useMediaQuery(theme.breakpoints.between("sm", "md")),
    lg: useMediaQuery(theme.breakpoints.up("md")),
  };

  return (
    <div>
      <Typography variant="h4" component="h1">
        {title}
      </Typography>
      <Grid container spacing={2}>
        {data.map((info) => (
          <Grid item xs={12} sm={12} md={6} lg={4} xl={4} key={info.id}>
            <CardComponentGrid info={info} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
