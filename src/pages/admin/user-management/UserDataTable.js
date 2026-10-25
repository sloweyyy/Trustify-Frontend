import * as React from 'react';
import { useState } from 'react';
import ManagementRecords from '../../../components/admin/ManagementRecords';
import UserDetailModal from './UserDetailModal';

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

const UserDataTable = ({ filterStatus, searchText, rows, count, headCells, filterList, paginationModel, setPaginationModel, loading }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('profile');
  const [selected, setSelected] = React.useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [userId, setUserId] = useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event, id, userId) => {
    let newSelected = [];
    newSelected = newSelected.concat(selected, id);
    setSelected(newSelected);
    setUserId(userId);

    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelected([]);
  };
  const handlePageChange = (_, newPage) => {
    setPaginationModel((prev) => ({ ...prev, page: newPage + 1 }));
  };

  const handleRowsPerPageChange = (event) => {
    const newPageSize = parseInt(event.target.value, 10);
    setPaginationModel((prev) => ({ ...prev, pageSize: newPageSize, page: 1 }));
  };

  const visibleRows = React.useMemo(() => {
    let filteredRows = rows;

    if (filterStatus !== filterList.All) {
      filteredRows = rows.filter((row) => row.userType === filterStatus);
    }

    if (searchText) {
      filteredRows = filteredRows.filter(
        (row) =>
          row.ordinalNumber?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.name?.toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.email?.toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.status?.toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.notaryCount?.toString().toLowerCase().includes(searchText.toLowerCase()) ||
          '' ||
          row.userType?.toLowerCase().includes(searchText.toLowerCase()) ||
          '',
      );
    }
    setSelected([]);
    return filteredRows.slice().sort(getComparator(order, orderBy));
  }, [filterStatus, searchText, order, orderBy, rows, filterList.All]);

  return <>
    <ManagementRecords title="Danh sách người dùng" rows={visibleRows} columns={headCells} order={order} orderBy={orderBy} onSort={handleRequestSort} onOpen={(event, row) => handleClick(event, row.ordinalNumber, row.id)} paginationModel={paginationModel} count={count} onPageChange={handlePageChange} onRowsPerPageChange={handleRowsPerPageChange} loading={loading} />
    <UserDetailModal open={openModal} handleClose={handleCloseModal} userId={userId} />
  </>;
};
export default UserDataTable;
