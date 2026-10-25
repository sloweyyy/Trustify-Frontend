import React, { useCallback, useEffect, useState, useRef } from 'react';
import { Box, useTheme } from '@mui/material';
import Header from './Header';
import DocumentByField from './DocumentByField';
import { revenueChartData, revenueChartOptions } from './metricPresentation';
import RevenueByServiceSection from './RevenueByServiceSection';
import RevenueByFieldSection from './RevenueByFieldSection';
import AdminService from '../../../services/admin.service';
import StatisticSection from './StatisticSection';

const AdminDashboard = () => {
  const theme = useTheme();
  const metricsRequest = useRef(0);
  const chartRequests = useRef({});
  const [chartState, setChartState] = useState({ service: { loading: true }, field: { loading: true }, documents: { loading: true } });
  const [metricsLoading, setMetricsLoading] = useState(true);
  const [metricsError, setMetricsError] = useState(false);
  const [period, setPeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [paymentServicePeriod, setPaymentServicePeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [paymentFieldPeriod, setPaymentFieldPeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [documentFieldPeriod, setDocumentFieldPeriod] = useState({ id: 'today', name: 'Hôm nay' });
  const [documentMetrics, setDocumentMetrics] = useState({});
  const [sessionMetrics, setSessionMetrics] = useState({});
  const [paymentMetrics, setPaymentMetrics] = useState({});
  const [paymentService, setPaymentService] = useState({});
  const [paymentField, setPaymentField] = useState({});
  const [documentField, setDocumentField] = useState({});
  const [paginationModel, setPaginationModel] = useState({ pageSize: 5, page: 0 });

  const fetchMetrics = useCallback(async (selectedPeriod) => {
    const request = ++metricsRequest.current;
    setMetricsLoading(true);
    setMetricsError(false);
    try {
      const [docMetrics, sessMetrics, payMetrics] = await Promise.all([
        AdminService.getDocumentMetricsByPeriod(selectedPeriod.id),
        AdminService.getSessionMetricsByPeriod(selectedPeriod.id),
        AdminService.getPaymentMetricsByPeriod(selectedPeriod.id),
      ]);

      if (request !== metricsRequest.current) return;
      setDocumentMetrics(docMetrics);
      setSessionMetrics(sessMetrics);
      setPaymentMetrics(payMetrics);
    } catch (error) {
      if (request === metricsRequest.current) setMetricsError(true);
    } finally {
      if (request === metricsRequest.current) setMetricsLoading(false);
    }
  }, []);

  const fetchData = useCallback(async (serviceMethod, setState, selectedPeriod, key) => {
    const request = (chartRequests.current[key] || 0) + 1;
    chartRequests.current[key] = request;
    setChartState((state) => ({ ...state, [key]: { loading: true, error: false } }));
    try {
      const data = await serviceMethod(selectedPeriod.id);
      if (request !== chartRequests.current[key]) return;
      setState(data);
      setChartState((state) => ({ ...state, [key]: { loading: false, error: false } }));
    } catch (error) {
      if (request === chartRequests.current[key]) setChartState((state) => ({ ...state, [key]: { loading: false, error: true } }));
    }
  }, []);
  const buildChartData = (data, accessor) => revenueChartData(data, accessor, [theme.palette.text.secondary, theme.palette.primary.main]);

  useEffect(() => {
    fetchMetrics(period);
  }, [period, fetchMetrics]);

  useEffect(() => {
    fetchData(AdminService.getPaymentServiceByPeriod, setPaymentService, paymentServicePeriod, 'service');
  }, [paymentServicePeriod, fetchData]);

  useEffect(() => {
    fetchData(AdminService.getPaymentFieldByPeriod, setPaymentField, paymentFieldPeriod, 'field');
  }, [paymentFieldPeriod, fetchData]);

  useEffect(() => {
    fetchData(AdminService.getDocumentFieldByPeriod, setDocumentField, documentFieldPeriod, 'documents');
  }, [documentFieldPeriod, fetchData]);

  return (
    <Box sx={{ display: 'flex', minWidth: 0, flexDirection: 'column' }}>
      <Header />
      <Box sx={{ flex: 1, p: 2, backgroundColor: 'background.default', display: 'flex', flexDirection: 'column', gap: 2 }}>
        <StatisticSection
          loading={metricsLoading}
          error={metricsError}
          onRetry={() => fetchMetrics(period)}
          period={period}
          setPeriod={setPeriod}
          documentMetrics={documentMetrics}
          sessionMetrics={sessionMetrics}
          paymentMetrics={paymentMetrics}
        />
        <DocumentByField
          {...chartState.documents}
          onRetry={() => fetchData(AdminService.getDocumentFieldByPeriod, setDocumentField, documentFieldPeriod, 'documents')}
          period={documentFieldPeriod}
          setPeriod={setDocumentFieldPeriod}
          paginationModel={paginationModel}
          setPaginationModel={setPaginationModel}
          documentFieldData={documentField.currentPeriod?.totals?.map((item, index) => ({
            id: index + 1,
            category: item.notarizationFieldName,
            data: item.amount,
          }))}
        />
        <RevenueByServiceSection
          {...chartState.service}
          onRetry={() => fetchData(AdminService.getPaymentServiceByPeriod, setPaymentService, paymentServicePeriod, 'service')}
          period={paymentServicePeriod}
          setPeriod={setPaymentServicePeriod}
          notaryServiceBarChartData={buildChartData(paymentService, (item) => item.serviceName)}
          notaryServiceBarChartOptions={revenueChartOptions(theme, 'Dịch vụ')}
        />
        <RevenueByFieldSection
          {...chartState.field}
          onRetry={() => fetchData(AdminService.getPaymentFieldByPeriod, setPaymentField, paymentFieldPeriod, 'field')}
          period={paymentFieldPeriod}
          setPeriod={setPaymentFieldPeriod}
          notaryFieldBarChartData={buildChartData(paymentField, (item) => item.fieldName)}
          notaryFieldBarChartOptions={revenueChartOptions(theme, 'Lĩnh vực')}
        />
      </Box>
    </Box>
  );
};

export default AdminDashboard;
