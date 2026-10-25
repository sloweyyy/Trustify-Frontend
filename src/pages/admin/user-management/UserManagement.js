import React, { useCallback, useEffect, useState } from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import UserOverview from './UserOverview';
import UserDataTable from './UserDataTable';
import Header from './Header';
import FilterButton from './FilterButton';
import AppsIcon from '@mui/icons-material/Apps';
import { ErrorState, LoadingState } from '../../../components/shared/PageFeedback';
import FiberNewRoundedIcon from '@mui/icons-material/FiberNewRounded';
import AccessTimeFilledRoundedIcon from '@mui/icons-material/AccessTimeFilledRounded';
import WaterfallChartRoundedIcon from '@mui/icons-material/WaterfallChartRounded';
import SearchIcon from '@mui/icons-material/Search';
import UserService from '../../../services/user.service';

const headCells = [
  {
    id: 'ordinalNumber',
    disablePadding: true,
    label: 'Số thứ tự',
  },
  {
    id: 'name',
    disablePadding: true,
    label: 'Tên người dùng',
  },
  {
    id: 'email',
    disablePadding: true,
    label: 'Email',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Trạng thái',
  },
  {
    id: 'notaryCount',
    disablePadding: true,
    label: 'Lịch sử công chứng',
  },
];

const filterList = {
  All: 'Tất cả',
  NewUser: 'Người dùng mới',
  LongTimeUser: 'Người dùng lâu năm',
  PotentialUser: 'Người dùng tiềm năng',
};

const iconMap = {
  [filterList.All]: <AppsIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.NewUser]: <FiberNewRoundedIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.LongTimeUser]: <AccessTimeFilledRoundedIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.PotentialUser]: <WaterfallChartRoundedIcon sx={{ height: '18px', width: '18px' }} />,
};

const createData = (id, ordinalNumber, name, email, status, notaryCount, userType) => {
  return {
    id,
    ordinalNumber,
    name,
    email,
    status,
    notaryCount,
    userType,
  };
};

const UserManagement = () => {
  const [filterOption, setFilterOption] = useState(filterList.All);
  const [filterClicked, setFilterClicked] = useState(filterList.All);
  const [searchText, setSearchText] = useState('');
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState([]);
  const [userCount, setUserCount] = useState(null);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 10,
    page: 1,
  });

  const fetchAllUsers = useCallback(async () => {
    setLoadingStatus(true);
    setError(false);
    try {
      const { page, pageSize } = paginationModel;
      const response = await UserService.getAllUsers('user', null, pageSize, page);
      if (!Array.isArray(response?.results)) throw new Error('Invalid user response');
      const users = response.results;
      setUserCount(response.totalResults);

      const rows = await Promise.all(
        users.map(async (item, index) => {
          let status;

          if (item.status === 'inactive') status = 'Ngoại tuyến';
          if (item.status === 'active') status = 'Trực tuyến';
          if (item.status === 'suspended') status = 'Bị cấm';
          if (item.status === 'deleted') status = 'Đã bị xóa ';

          return createData(
            item.id,
            index + 1 + (page - 1) * pageSize,
            item.name || '',
            item.email || '',
            status,
            item.documentCount ?? 'Chưa có số liệu',
            item.userType || '',
          );
        }),
      );
      setData(rows);
    } catch (error) {
      setError(true);
    } finally {
      setLoadingStatus(false);
    }
  }, [paginationModel]);

  useEffect(() => {
    fetchAllUsers();
  }, [paginationModel, fetchAllUsers]);

  return (
    <Box
      sx={{
        display: 'flex',
        minWidth: 0,
        flexDirection: 'column',
        backgroundColor: 'background.default',
      }}
    >
      {/* Header Section */}
      <Header />

      {/* User Overview Section */}
      <UserOverview userCount={userCount} />

      {/* User Data Table Section */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '10px',
          gap: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 1,
            borderRadius: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              gap: 1,
              alignSelf: 'stretch',
              flexWrap: 'wrap',
              maxWidth: '100%',
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.All);
                setFilterClicked(filterList.All);
              }}
              option={filterList.All}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.NewUser);
                setFilterClicked(filterList.NewUser);
              }}
              option={filterList.NewUser}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.LongTimeUser);
                setFilterClicked(filterList.LongTimeUser);
              }}
              option={filterList.LongTimeUser}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.PotentialUser);
                setFilterClicked(filterList.PotentialUser);
              }}
              option={filterList.PotentialUser}
              iconMap={iconMap}
            />
          </Box>

          <Box flex={1} sx={{ display: { xs: 'none', sm: 'block' } }} />

          <TextField
            variant="outlined"
            size="small"
            label="Tìm trong trang hiện tại"
            inputProps={{ 'aria-label': 'Tìm trong trang hiện tại' }}
            onChange={(e) => setSearchText(e.target.value)}
            sx={{
              borderRadius: 1,
              width: { xs: '100%', sm: 280 },
              maxWidth: '100%',
              minWidth: 0,
              '& .MuiInputBase-input': {
                fontSize: 16,
              },
              backgroundColor: 'background.paper',
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Box
          sx={{
            border: 0,
            borderRadius: 2,
            background: 'background.paper',
            p: 1,
            paddingBottom: 2,
          }}
        >
          {loadingStatus ? (
            <LoadingState label="Đang tải danh sách người dùng…" />
          ) : error ? <ErrorState title="Chưa thể tải danh sách người dùng" onRetry={fetchAllUsers} /> : (
            <UserDataTable
              filterStatus={filterOption}
              searchText={searchText}
              rows={data}
              count={userCount}
              headCells={headCells}
              filterList={filterList}
              paginationModel={paginationModel}
              setPaginationModel={setPaginationModel}
              loading={loadingStatus}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default UserManagement;
