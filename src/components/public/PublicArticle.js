import React, { useEffect, useId, useRef, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Box, Link, Typography, useMediaQuery, useTheme } from '@mui/material';
import ExpandMoreRounded from '@mui/icons-material/ExpandMoreRounded';
import PublicPage from './PublicPage';
const PublicArticle = ({ title, intro, children }) => {
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down('md'));
  const content = useRef(null);
  const prefix = useId();
  const [headings, setHeadings] = useState([]);
  useEffect(() => {
    setHeadings(Array.from(content.current.querySelectorAll('h2,h3')).map((heading, index) => {
      heading.id = `${prefix}-section-${index}`;
      return { id: heading.id, text: heading.textContent };
    }));
  }, [children, prefix]);
  return <PublicPage {...{ title, intro }}><Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: '220px minmax(0, 1fr)' }, gap: 3, alignItems: 'start' }}>
    <Accordion defaultExpanded={!mobile} sx={{ position: { md: 'sticky' }, top: 88, minWidth: 0 }}><AccordionSummary expandIcon={<ExpandMoreRounded />}><Typography component="h2" variant="body1" fontWeight={600}>Mục lục</Typography></AccordionSummary><AccordionDetails><Box component="nav" aria-label="Mục lục trang" sx={{ display: 'grid', gap: 1 }}>{headings.map((heading) => <Link key={heading.id} href={`#${heading.id}`} sx={{ display: 'flex', alignItems: 'center', minHeight: 44 }}>{heading.text}</Link>)}</Box></AccordionDetails></Accordion>
    <Box component="article" ref={content} sx={{ minWidth: 0, maxWidth: '76ch', overflowWrap: 'anywhere', '& h2,& h3': { fontWeight: 600, scrollMarginTop: 100 }, '& p,& li,& .MuiTypography-body2': { fontSize: '1rem', lineHeight: 1.8 }, '& .MuiPaper-root': { boxShadow: 'none' }, '& > .MuiPaper-root': { p: { xs: 2, md: 3 }, border: 1, borderColor: 'divider' }, '& img': { maxWidth: '100%', height: 'auto' } }}>{children}</Box>
  </Box></PublicPage>;
};
export default PublicArticle;
