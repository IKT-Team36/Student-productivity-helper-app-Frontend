import { Breadcrumb } from "@src/routing/Routes";
import { ScreenLayout } from "@src/ui/layout/main-layout/ScreenLayout";
import React, { FC } from "react";
import { Card, CardContent, Typography, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const StyledAccordionSummary = styled(AccordionSummary)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const StyledAccordionDetails = styled(AccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface Course {
  name: string;
  semester: string;
  description: string;
  courseStatus: string;
  user: User;
}

interface User {
  name: string;
}

interface Attachment {
  name: string;
  date: string;
  subject: string;
  type: string;
  byteContent: string;
  user_id: number;
}

interface EventDto {
  eventName: string;
  eventLocation: string;
  eventDate: string;
  user: number;
  course: number;
}

interface Prop {
  breadcrumbs: Breadcrumb[];
  course: Course;
  attachments: Attachment[];
  events: EventDto[];
}

export const SingleCourse: FC<Prop> = ({
  breadcrumbs,
  course,
  attachments,
  events,
}) => {
  const dummyAttachments: Attachment[] = [
    {
      name: "Attachment 1",
      date: "2023-05-28",
      subject: "Subject 1",
      type: "Type 1",
      byteContent: "Content 1",
      user_id: 1,
    },
    {
      name: "Attachment 2",
      date: "2023-05-29",
      subject: "Subject 2",
      type: "Type 2",
      byteContent: "Content 2",
      user_id: 2,
    },
  ];

  const dummyEvents: EventDto[] = [
    {
      eventName: "Event 1",
      eventLocation: "Location 1",
      eventDate: "2023-06-01",
      user: 1,
      course: 1,
    },
    {
      eventName: "Event 2",
      eventLocation: "Location 2",
      eventDate: "2023-06-02",
      user: 2,
      course: 1,
    },
  ];

  return (
    <ScreenLayout title={"Course Name"} breadcrumbs={breadcrumbs}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="div">
                Semester: course.semester
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Description: course.description
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Course Status: course.courseStatus
              </Typography>
              <Typography variant="body1" color="text.secondary">
                User: course.user.name
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                align="center"
                color="primary"
                sx={{ marginBottom: 3 }}
              >
                Attachments
              </Typography>
              <div>
                {dummyAttachments.length > 0 ? (
                  dummyAttachments.map((attachment, index) => (
                    <StyledAccordion key={index}>
                      <StyledAccordionSummary
                        expandIcon={
                          <ArrowForwardIosSharpIcon
                            sx={{ fontSize: "0.9rem" }}
                          />
                        }
                        aria-controls={`panel${index + 1}d-content`}
                        id={`panel${index + 1}d-header`}
                      >
                        <Typography>{attachment.name}</Typography>
                      </StyledAccordionSummary>
                      <StyledAccordionDetails>
                        <Typography>
                          Date: {attachment.date}
                          <br />
                          Subject: {attachment.subject}
                          <br />
                          Type: {attachment.type}
                          <br />
                          Byte Content: {attachment.byteContent}
                          <br />
                          User ID: {attachment.user_id}
                        </Typography>
                      </StyledAccordionDetails>
                    </StyledAccordion>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    No attachments found.
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography
                variant="h5"
                component="div"
                align="center"
                color="primary"
                sx={{ marginBottom: 3 }}
              >
                Events
              </Typography>
              <div>
                {dummyEvents.length > 0 ? (
                  dummyEvents.map((event, index) => (
                    <StyledAccordion key={index}>
                      <StyledAccordionSummary
                        expandIcon={
                          <ArrowForwardIosSharpIcon
                            sx={{ fontSize: "0.9rem" }}
                          />
                        }
                        aria-controls={`panel${index + 1}d-content`}
                        id={`panel${index + 1}d-header`}
                      >
                        <Typography>{event.eventName}</Typography>
                      </StyledAccordionSummary>
                      <StyledAccordionDetails>
                        <Typography>
                          Date: {event.eventDate}
                          <br />
                          Course: {event.course}
                          <br />
                          Location: {event.eventLocation}
                          <br />
                          User ID: {event.user}
                        </Typography>
                      </StyledAccordionDetails>
                    </StyledAccordion>
                  ))
                ) : (
                  <Typography variant="body1" color="text.secondary">
                    No events found.
                  </Typography>
                )}
              </div>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </ScreenLayout>
  );
};
