import * as React from "react";
import {CardListProps, GridView, ListView} from "./CoursesView";
import {useState} from "react";
import {Box, Button, ButtonGroup} from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import {Grid} from "@mui/material";
import SideMenu from "./SideMenu";
import {useTheme, useMediaQuery} from "@mui/material";
import {CardInfo} from "./CardComponent";

const SwitchableView: React.FC<CardListProps> = ({title, data}) => {
    const [view, setView] = useState<"list" | "grid">("list");
    const [sort, setSort] = useState<{
        field: "alphabetical" | "dateAdded" | "";
        order: "asc" | "desc";
    }>({field: "", order: "asc"});

    const [groupBy, setGroupBy] = useState<"isFinished" | "createdDate" | "">("");

    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

    function getSortFunction(a: CardInfo, b: CardInfo): number {
        if (sort.field === "alphabetical") {
            if (sort.order === "asc") {
                return a.title.localeCompare(b.title);
            } else {
                return b.title.localeCompare(a.title);
            }
        } else if (sort.field === "dateAdded") {
            const dateA = new Date(a.createdDate);
            const dateB = new Date(b.createdDate);
            if (sort.order === "asc") {
                return dateA.getTime() - dateB.getTime();
            } else {
                return dateB.getTime() - dateA.getTime();
            }
        }
        return 0;
    }

    const getGroupedByField = (): Record<string, CardInfo[]> => {
        if (groupBy === "isFinished") {
            return data.reduce((result, item) => {
                const key = item.isFinished ? "Completed" : "In Progress";
                if (!result[key]) {
                    result[key] = [];
                }
                result[key].push(item);
                return result;
            }, {} as Record<string, CardInfo[]>);
        } else if (groupBy === "createdDate") {
            return data.reduce((result, item) => {
                const key = new Date(item.createdDate).toDateString();
                if (!result[key]) {
                    result[key] = [];
                }
                result[key].push(item);
                return result;
            }, {} as Record<string, CardInfo[]>);
        } else {
            return {};
        }
    };
    const groupedItems: Record<string, CardInfo[]> = getGroupedByField();

    return (
        <Grid container spacing={4}>
            <Grid item xs={12} md={9} order={isMediumScreen ? 2 : 1}>
                {view === "grid" ? (
                    !groupBy ? (
                        <GridView
                            title={title}
                            data={sort.field ? [...data].sort(getSortFunction) : data}
                        />
                    ) : (
                        Object.keys(groupedItems).map((k) => (
                            <GridView
                                key={k}
                                title={k}
                                data={
                                    sort.field
                                        ? [...groupedItems[k]].sort(getSortFunction)
                                        : groupedItems[k]
                                }
                            />
                        ))
                    )
                ) : !groupBy ? (
                    <ListView
                        title={title}
                        data={sort.field ? [...data].sort(getSortFunction) : data}
                    />
                ) : (
                    Object.keys(groupedItems).map((k) => (
                        <ListView
                            key={k}
                            title={k}
                            data={
                                sort.field
                                    ? [...groupedItems[k]].sort(getSortFunction)
                                    : groupedItems[k]
                            }
                        />
                    ))
                )}
            </Grid>
            <Grid item xs={12} md={3} order={isMediumScreen ? 1 : 2}>
                <Box display={'flex'} justifyContent={'center'}>
                    <ButtonGroup size="large">
                        <Button onClick={() => setView("list")} disabled={view === 'list'}>
                            <ViewListIcon color={view === "list" ? "action" : "primary"}/>
                        </Button>
                        <Button onClick={() => setView("grid")} disabled={view === 'grid'}>
                            <ViewModuleIcon color={view === "grid" ? "action" : "primary"}/>
                        </Button>
                    </ButtonGroup>
                </Box>
                <SideMenu
                    sort={sort}
                    groupBy={groupBy}
                    onSortChange={(field, order) =>
                        setSort((prev) => ({
                            field: prev.field === field && order === "asc" ? "" : field,
                            order: prev.field === field && order === "asc" ? "asc" : order,
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
