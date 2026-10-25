import * as React from 'react';
import ManagementRecords from '../../../components/admin/ManagementRecords';
import EmployeeDetailModal from './EmployeeDetailModal';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

const DataTable = ({ filterStatus, searchText, rows, count, headCells, filterList, paginationModel, setPaginationModel, loading }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('profile');
  const [selected, setSelected] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [employeeId, setEmployeeId] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id, employeeId) => {
    let newSelected = [];
    newSelected = newSelected.concat(selected, id); 
    setSelected(newSelected);
    setEmployeeId(employeeId);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
    setSelected([]);
  }

  const handleChangePage = (_, newPage) => {
    setPaginationModel((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const visibleRows = React.useMemo(() => {
    let filteredRows = rows;

    if (filterStatus !== filterList.All) {
      filteredRows = rows.filter((row) => row.position === filterStatus);
    }

    if (searchText) {
      filteredRows = filteredRows.filter(
        (row) =>
          row.ordinalNumber?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
          row.name?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
          row.position?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
          row.status?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
          row.salary?.toString().toLowerCase().includes(searchText.toLowerCase()),
      );
    }
    setSelected([]);

    return filteredRows.slice().sort(getComparator(order, orderBy));
  }, [filterStatus, searchText, order, orderBy, rows, filterList.All]);

  return <>
    <ManagementRecords title="Danh sách nhân viên" rows={visibleRows} columns={headCells} order={order} orderBy={orderBy} onSort={handleRequestSort} onOpen={(event, row) => handleClick(event, row.ordinalNumber, row.id)} paginationModel={paginationModel} count={count} onPageChange={handleChangePage} loading={loading} />
    <EmployeeDetailModal open={open} handleClose={handleCloseModal} employeeId={employeeId} />
  </>;
};
export default DataTable;
