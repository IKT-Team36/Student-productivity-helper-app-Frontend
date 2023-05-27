import * as React from "react";
import { CardListProps, GridView, ListView } from "./CourseView";
import { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import { Grid } from "@mui/material";
import SideMenu from "./SideMenu";
import { useTheme, useMediaQuery } from "@mui/material";
import { Theme } from "@mui/system";

const SwitchableView: React.FC<CardListProps> = ({ title, data }) => {
  const [view, setView] = useState<"list" | "grid">("list");
  const [sort, setSort] = useState<{
    field: "alphabetical" | "dateAdded" | "";
    order: "asc" | "desc";
  }>({ field: "", order: "asc" });
  const [groupBy, setGroupBy] = useState<"isFinished" | "createdDate" | "">("");

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Grid container spacing={7}>
      <Grid item xs={12} md={9} order={isMediumScreen ? 2 : 1}>
        {view === "grid" ? (
          <GridView title={title} data={data} />
        ) : (
          <ListView title={title} data={data} />
        )}
      </Grid>
      <Grid item xs={12} md={3} order={isMediumScreen ? 1 : 2}>
        <IconButton onClick={() => setView("list")}>
          <ViewListIcon color={view === "list" ? "primary" : "action"} />
        </IconButton>
        <IconButton onClick={() => setView("grid")}>
          <ViewModuleIcon color={view === "grid" ? "primary" : "action"} />
        </IconButton>
        <SideMenu
          sort={sort}
          groupBy={groupBy}
          onSortChange={(field, order) =>
            setSort((prev) => ({
              field: prev.field === field ? "" : field,
              order: prev.field === field ? "asc" : order,
            }))
          }
          onGroupByChange={(val) => {
            setGroupBy((prev) => {
              return prev === val ? "" : val;
            });
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SwitchableView;
