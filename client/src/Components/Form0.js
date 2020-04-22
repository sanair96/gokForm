import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import React, { useEffect, useState } from "react";
import { Backdrop, CircularProgress, TablePagination } from "@material-ui/core";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function Form0({handleInputChange, data}) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [error, setError] = useState(false);

  const fetchGroupData = async () => {
    const response = await fetch('/data/getgroups', {method: 'get' });
    const data = await response.json();
    if (data.success) {
      setRows(data.data);
      setTotalCount(data.data.length);
      setLoading(false);
    } else {
      setError(true);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchGroupData();
  }, []);

  const handlePageChange = (event, newPage) => {
    setPageNo(newPage);
  };

  return (
    <>
      <Backdrop className={classes.backdrop} open={loading}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Leader Name</TableCell>
              <TableCell align="right">Leader Mobile</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(pageNo * 30, pageNo * 30 + 30).map((row) => (
              <TableRow selected={row.id === data.groupId} hover onClick={() => handleInputChange("groupId", row.id)} key={row.name}>
                <TableCell component="th" scope="row">
                  {row.leader_name || row.name_of_shelter}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TablePagination
          rowsPerPageOptions={[30]}
            rowsPerPage={30}
            page={pageNo}
            count={totalCount}
            onChangePage={handlePageChange}
          />
        </Table>
      </TableContainer>
    </>
  );
}
