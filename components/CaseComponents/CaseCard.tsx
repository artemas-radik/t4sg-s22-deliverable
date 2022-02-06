import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardSubtitle,
  CardText,
} from "reactstrap";
import { useQuery } from "urql";
import { Box } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

type CaseCardProps = {
  data: CaseData;
};

export type TagData = {
  name: string;
  id?: number;
};

export type CaseData = {
  name: string;
  status: string;
  description: string;
  id: number;
  cases_tags?: [TagData];
};

const CaseCard: React.FC<CaseCardProps> = (props) => {
  const caseData = props.data;

  return (
    <Container>
      <div style={{ width: "100%", padding: "0px" }}>
        <Card body style={{ backgroundColor: "#e4ebf5" }}>
          <Box
            display="flex"
            justifyContent="left"
            alignItems="left"
            width="100%"
          >
            <CardTitle tag="h3">{caseData.name}</CardTitle>
          </Box>

          <CardSubtitle tag="h6" className="mb-2 text-muted">
            {caseData.status}
          </CardSubtitle>
          <CardText>{caseData.description}</CardText>
          {/*
            ALTERNATE FEATURE 1 TODO:
            Use the data on tags found in props to render out all
            of the tags associated with every case.
          */}

          {/* END TODO */}
        </Card>
      </div>
    </Container>
  );
};
export default CaseCard;
