import React, { FC } from "react";
import { ScreenLayout } from "@src/ui/layout/main-layout/ScreenLayout";
import { Box, Button } from "@mui/material";
import { AddRounded } from "@mui/icons-material";
import { Breadcrumb } from "@src/routing/Routes";
import SwitchableView from "./SwitchableView";


interface Prop {
  breadcrumbs: Breadcrumb[];
}

const cardData = [
  {
    id: "1",
    image: "https://via.placeholder.com/150",
    title: "Card 1",
    description: "This is card 1",
    createdDate: "2023-01-01",
    isFinished: true,
  },
  {
    id: "2",
    image: "https://via.placeholder.com/150",
    title: "Card 2",
    description: "This is card 2",
    createdDate: "2023-02-01",
    isFinished: false,
  },
  {
    id: "3",
    image: "https://via.placeholder.com/150",
    title: "Card 3",
    description: "This is card 3",
    createdDate: "2023-03-01",
    isFinished: true,
  },
  {
    id: "4",
    image: "https://via.placeholder.com/150",
    title: "Card 4",
    description: "This is card 4",
    createdDate: "2023-04-01",
    isFinished: false,
  },
  {
    id: "5",
    image: "https://via.placeholder.com/150",
    title: "Card 5",
    description: "This is card 5",
    createdDate: "2023-05-01",
    isFinished: true,
  },
  {
    id: "6",
    image: "https://via.placeholder.com/150",
    title: "Card 6",
    description: "This is card 6",
    createdDate: "2023-06-01",
    isFinished: false,
  },
  {
    id: "7",
    image: "https://via.placeholder.com/150",
    title: "Card 7",
    description: "This is card 7",
    createdDate: "2023-07-01",
    isFinished: true,
  },
  {
    id: "8",
    image: "https://via.placeholder.com/150",
    title: "Card 8",
    description: "This is card 8",
    createdDate: "2023-08-01",
    isFinished: false,
  },
  {
    id: "9",
    image: "https://via.placeholder.com/150",
    title: "Card 9",
    description: "This is card 9",
    createdDate: "2023-09-01",
    isFinished: true,
  },
  {
    id: "10",
    image: "https://via.placeholder.com/150",
    title: "Card 10",
    description: "This is card 10",
    createdDate: "2023-10-01",
    isFinished: false,
  },
];

export const Courses: FC<Prop> = ({ breadcrumbs }) => {
  const createButton = (
    <Button variant="outlined" startIcon={<AddRounded />}>
      Create new
    </Button>
  );

  return (
    <ScreenLayout
      title={"Courses"}
      action={createButton}
      breadcrumbs={breadcrumbs}
    >
      <SwitchableView title="Courses" data={cardData} />
    </ScreenLayout>
  );
};
