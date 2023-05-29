import * as React from "react";
import {
    Checkbox,
    FormControlLabel,
    FormGroup,
    Box,
    FormControl,
    FormLabel,
} from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

type SideMenuProps = {
    sort: {
        field: "alphabetical" | "dateAdded" | "";
        order: "asc" | "desc";
    };
    groupBy: "isFinished"  | "";
    onSortChange: (
        field: "alphabetical" | "dateAdded" | "",
        order: "asc" | "desc"
    ) => void;
    onGroupByChange: (groupBy: "isFinished"  | "") => void;
};

const SideMenu: React.FC<SideMenuProps> = ({
                                               sort,
                                               groupBy,
                                               onSortChange,
                                               onGroupByChange,
                                           }) => {
    const handleSortChange = (field: "alphabetical" | "dateAdded" | "") => {
        const newOrder =
            sort.field === field && sort.order === "asc" ? "desc" : "asc";
        onSortChange(field, newOrder);
    };

    return (
        <Box>
            <Box>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Sort</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={sort.field === "alphabetical"}
                                    onChange={() => handleSortChange("alphabetical")}
                                />
                            }
                            label={
                                <Box display={'flex'}>
                                    <Box>Alphabetical</Box>
                                    {sort.field === "alphabetical" &&
                                        (sort.order === "asc" ? (
                                            <KeyboardArrowUpIcon/>
                                        ) : (
                                            <KeyboardArrowDownIcon/>
                                        ))}
                                </Box>
                            }
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={sort.field === "dateAdded"}
                                    onChange={() => handleSortChange("dateAdded")}
                                />
                            }
                            label={
                                <Box display={'flex'}>
                                    <Box>Date Added</Box>
                                    {sort.field === "dateAdded" &&
                                        (sort.order === "asc" ? (
                                            <KeyboardArrowUpIcon/>
                                        ) : (
                                            <KeyboardArrowDownIcon/>
                                        ))}
                                </Box>
                            }
                        />
                    </FormGroup>
                </FormControl>
            </Box>
            <hr/>
            <Box>
                <FormControl component="fieldset">
                    <FormLabel component="legend">Group By</FormLabel>
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={groupBy === "isFinished"}
                                    onChange={() => onGroupByChange("isFinished")}
                                />
                            }
                            label="Completed"
                        />
                    </FormGroup>
                </FormControl>
            </Box>
        </Box>
    );
};

export default SideMenu;
