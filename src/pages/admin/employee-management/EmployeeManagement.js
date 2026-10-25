import React, { useCallback, useEffect, useState } from 'react';
import Header from './Header';
import { Box, TextField, InputAdornment } from '@mui/material';
import Overview from './Overview';
import DataTable from './DataTable';
import FilterButton from './FilterButton';
import AppsIcon from '@mui/icons-material/Apps';
import DifferenceIcon from '@mui/icons-material/Difference';
import WorkIcon from '@mui/icons-material/Work';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RuleIcon from '@mui/icons-material/Rule';
import SearchIcon from '@mui/icons-material/Search';
import AdminService from '../../../services/admin.service';
import { ErrorState, LoadingState } from '../../../components/shared/PageFeedback';

const headCells = [
  {
    id: 'ordinalNumber',
    disablePadding: true,
    label: 'Số thứ tự',
  },
  {
    id: 'name',
    disablePadding: true,
    label: 'Tên nhân viên',
  },
  {
    id: 'position',
    disablePadding: true,
    label: 'Chức vụ',
  },
  {
    id: 'status',
    disablePadding: false,
    label: 'Trạng thái',
  },
];

const filterList = {
  All: 'Tất cả',
  notary: 'Công chứng viên',
  secretary: 'Thư ký',
  NotaryOfficeAssistant: 'Trợ lý VPCC',
  LegalSpecialist: 'Chuyên viên pháp lý',
};

const iconMap = {
  [filterList.All]: <AppsIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.notary]: <DifferenceIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.secretary]: <WorkIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.NotaryOfficeAssistant]: <AssessmentIcon sx={{ height: '18px', width: '18px' }} />,
  [filterList.LegalSpecialist]: <RuleIcon sx={{ height: '18px', width: '18px' }} />,
};

function createData(id, ordinalNumber, name, position, status) {
  return {
    id,
    ordinalNumber,
    name,
    position,
    status,
  };
}

const EmployeeManagement = () => {
  const [filterOption, setFilterOption] = useState(filterList.All);
  const [filterClicked, setFilterClicked] = useState(filterList.All);
  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState([]);
  const [paginationModel, setPaginationModel] = useState({
    pageSize: 5,
    page: 1,
  })
  const [loadingStatus, setLoadingStatus] = useState(true);
  const [listError, setListError] = useState(false);
  const [countsLoading, setCountsLoading] = useState(true);
  const [countsError, setCountsError] = useState(false);
  const [employeeCount, setEmployeeCount] = useState(null);
  const [notaryCount, setNotaryCount] = useState(null);
  const [secretaryCount, setSecretaryCount] = useState(null);

  const getEmployeesCount = useCallback(async () => {
    setCountsLoading(true);
    setCountsError(false);
    try{
      const response = await AdminService.getEmployeesCount ();
               
      setNotaryCount(response.notaryCount);
      setSecretaryCount(response.secretaryCount);
    }
    catch (error) { setCountsError(true); }
    finally{
      setCountsLoading(false);
    }
  }, []);

  const getEmployeesList = useCallback(async () => {
    setLoadingStatus(true);
    setListError(false);
    try{
      const {page, pageSize} = paginationModel;
      const response = await AdminService.getEmployeesMetrics(null,pageSize,page-1);      
          
      const rows = await Promise.all(
        response.results.map(async (item, index) => {
          let role, status;

          if(item.role === 'notary') role = 'Công chứng viên';
          if(item.role === 'secretary') role ='Thư ký';

          if(item.status === 'inactive') status = 'Ngoại tuyến';
          if(item.status === 'active') status = 'Trực tuyến';
          if(item.status === 'suspended') status = 'Bị cấm';
          if(item.status === 'deleted') status = 'Đã bị xóa ';

          return createData(item.id,(index+1)+((page-1)*pageSize),item.name,role,status);
        })
      )
      setData(rows);
      setEmployeeCount(response.totalResults);
    }
    catch (error) { setListError(true); }
    finally{
      setLoadingStatus(false);
    }
  }, [paginationModel]) 

  useEffect(() => {
    getEmployeesCount();
  }, [getEmployeesCount])

  useEffect(() => {
    getEmployeesList();
  }, [paginationModel, getEmployeesList])

  return (
    <Box
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', minWidth: 0, bgcolor: 'background.default', gap: '16px' }}
    >
      <Header />

      <Box sx={{ p: '0px 16px' }}>
        <Overview count={employeeCount} notaryCount={notaryCount} secretaryCount={secretaryCount} loading={countsLoading} error={countsError} onRetry={getEmployeesCount}/>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          p: '10px',
          gap: '10px'
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
              gap: '8px',
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
                setFilterOption(filterList.notary);
                setFilterClicked(filterList.notary);
              }}
              option={filterList.notary}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.secretary);
                setFilterClicked(filterList.secretary);
              }}
              option={filterList.secretary}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.NotaryOfficeAssistant);
                setFilterClicked(filterList.NotaryOfficeAssistant);
              }}
              option={filterList.NotaryOfficeAssistant}
              iconMap={iconMap}
            />
            <FilterButton
              clickedButton={filterClicked}
              handleFilter={() => {
                setFilterOption(filterList.LegalSpecialist);
                setFilterClicked(filterList.LegalSpecialist);
              }}
              option={filterList.LegalSpecialist}
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
              width: { xs: '100%', sm: '20%' },
              minWidth: { xs: 0, sm: 150 },
              '& .MuiInputBase-input': {
                fontSize: 16,
              },
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
            borderRadius: 1,
            bgcolor: 'background.paper',
            p: '8px',
            paddingBottom: 2
          }}
        >
          {loadingStatus ? (
            <LoadingState label="Đang tải danh sách nhân viên…" />
          ) : listError ? <ErrorState title="Chưa thể tải danh sách nhân viên" onRetry={getEmployeesList} /> : (
            <DataTable
            filterStatus={filterOption}
            searchText={searchText}
            rows={data}
            headCells={headCells}
            filterList={filterList}
            paginationModel={paginationModel}
            setPaginationModel={setPaginationModel}
            loading={loadingStatus}
            count={employeeCount}
          ></DataTable>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default EmployeeManagement;
