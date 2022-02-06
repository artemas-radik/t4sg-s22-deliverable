import React from "react";
import Button from "react-bootstrap/Button";
import { Container } from "reactstrap";
import Grid, { GridSpacing } from "@material-ui/core/Grid";
import "../../styles/casemanagement.module.css";
import Footer from "./Footer";
import CaseCategory from "./CaseCategory";
import AddCaseModal from "./Modals/AddCaseModal";
import { useQuery } from "urql";
import AddCategoryModal from "./Modals/AddCategoryModal";
import AddTagModal from "./Modals/AddTagModal";
import DeleteCaseModal from "./Modals/DeleteCaseModal";
import DeleteCategoryModal from "./Modals/DeleteCategoryModal";

/* 
  FEATURE 1 TODO:
  Write a query that will get the name AND id of 
  every category. Build this query, and verify it 
  works in Hasura, and then paste the query here.

  Make sure to replace the string that is currently
  in this variable 
*/
export const ManagementContainerQuery = `
query ManagementContainerQuery {
  category {
    name
    id
  }
}
`;
// END TODO

export type ManagementCategory = {
  id: number;
  name: string;
};

const CaseManagementContainer: React.FC = (props) => {
  const [addCaseModalOpen, setAddCaseModalOpen] =
    React.useState<boolean>(false);
  const [addCategoryModalOpen, setAddCategoryModalOpen] =
    React.useState<boolean>(false);
    const [deleteCaseModalOpen, setDeleteCaseModalOpen] =
    React.useState<boolean>(false);
    const [deleteCategoryModalOpen, setDeleteCategoryModalOpen] =
    React.useState<boolean>(false);
  const [addTagModalOpen, setAddTagModalOpen] = React.useState<boolean>(false);

  /* NOTE: This uses */
  const [{ data, fetching, error }, executeQuery] = useQuery({
    query: ManagementContainerQuery,
  });

  return (
    <>
      <h5 className="title">Home Page</h5>
      <Container
        style={{
          width: "100%",
          borderStyle: "none",
          padding: "0.75rem",
          marginTop: "0.75rem",
          textAlign: "center",
        }}
      >
        <Button variant="dark" onClick={() => setAddCategoryModalOpen(true)}>
          Add Category
        </Button>
        {/* <Button variant="dark" onClick={() => setAddTagModalOpen(true)}>
          Add Tag To A Case
        </Button> */}
        <Button variant="dark" onClick={() => setAddCaseModalOpen(true)}>
          Add Case
        </Button>
        <Button variant="dark" onClick={() => setDeleteCaseModalOpen(true)}>
          Delete Case
        </Button>
        <Button variant="dark" onClick={() => setDeleteCategoryModalOpen(true)}>
          Delete Category
        </Button>
      </Container>
      <Grid container spacing={3}>
        {/*
          FEATURE 1 TODO:
          Use the data from the result of the query to render 
          a CaseCategory for every category in the response.
          Remember, the response is stored in the "data" variable!
        */}
        {data
          ? data.category.map((c: ManagementCategory, index: number) => {
              return <CaseCategory key={index} category_id={c.id} />;
            })
          : "Something went wrong"}
        {/* END TODO */}
      </Grid>

      <AddCaseModal
        onClose={() => setAddCaseModalOpen(false)}
        open={addCaseModalOpen}
      />

      <DeleteCaseModal
        onClose={() => setDeleteCaseModalOpen(false)}
        open={deleteCaseModalOpen}
      />

      <AddCategoryModal
        onClose={() => setAddCategoryModalOpen(false)}
        open={addCategoryModalOpen}
      />

      <DeleteCategoryModal
        onClose={() => setDeleteCategoryModalOpen(false)}
        open={deleteCategoryModalOpen}
      />

      <AddTagModal
        onClose={() => setAddTagModalOpen(false)}
        open={addTagModalOpen}
      />
    </>
  );
};
export default CaseManagementContainer;
