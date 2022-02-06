import React, { useState } from "react";
import StyledModal from "./StyledModal";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { useMutation, useQuery } from "urql";
import {
  ManagementCategory,
  ManagementContainerQuery,
} from "../CaseManagementContainer";
import { CaseData } from "../CaseCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      flexWrap: "wrap",
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: "25ch",
    },
  })
);

type AddCaseModalProps = {
  open: boolean;
  onClose: () => void;
};

/* 
  FEATURE 2 TODO:
  Write a mutation that will insert (add) a new case given the
  description, name, status, and category_id.
  
  Make sure to replace the string that is currently
  in this variable 
*/
const DeleteCaseMutation = `
mutation DeleteCaseMutation($id: bigint = 0) {
  delete_cases_by_pk(id: $id) {
    id
  }
}
`;

const CasesQuery = `
query CasesQuery {
  cases {
    id
    name
  }
}
`;
// END TODO

const DeleteCaseModal: React.FC<AddCaseModalProps> = (props) => {
  const classes = useStyles();
  const [id, setCaseId] = useState<number | null>(null);
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: CasesQuery,
  });

  const [result, executeMutation] = useMutation(DeleteCaseMutation);

  return (
    <StyledModal open={props.open} onClose={props.onClose}>
      <Typography variant="h4" align="center">
        Delete Case
      </Typography>
      <Box>
        {data ? (
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Case</InputLabel>
            <Select
              labelId="category-select-label"
              fullWidth
              value={id}
              onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                setCaseId(event.target.value as number);
              }}
            >
              {/*
                FEATURE 2 TODO:
                Use the data from the result of the query ManagementContainerQuery
                to render a MenuItem with category id as the value, and the 
                category name as the text.
              */}
              {data
                ? data.cases.map((c: CaseData, index: number) => {
                    return <MenuItem key={index} value={c.id}> {c.name} </MenuItem>;
                  })
                : "Something went wrong"}
              {/* END TODO */}
            </Select>
          </FormControl>
        ) : fetching ? (
          "Loading Cases"
        ) : null}
      </Box>
      <Box mt="10px" display="flex" justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => {
            executeMutation({
              id: id,
            });
            props.onClose();
          }}
        >
          Delete
        </Button>
      </Box>
    </StyledModal>
  );
};
export default DeleteCaseModal;
