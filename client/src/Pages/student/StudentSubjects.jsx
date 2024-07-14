import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getSubjectList } from '../../redux/sclassRelated/sclassHandle';
import { getUserDetails } from '../../redux/userRelated/userHandle';
import CustomBarChart from '../../components/CustomBarChart';
import { BottomNavigation, BottomNavigationAction, Container, Paper, Table, TableBody, TableHead, Typography, Grid, Box } from '@mui/material';
import InsertChartIcon from '@mui/icons-material/InsertChart';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import TableChartIcon from '@mui/icons-material/TableChart';
import TableChartOutlinedIcon from '@mui/icons-material/TableChartOutlined';
import { StyledTableCell, StyledTableRow } from '../../components/styles';
import styled from 'styled-components';

const StudentSubjects = () => {
    const dispatch = useDispatch();
    const { subjectsList, sclassDetails } = useSelector((state) => state.sclass);
    const { userDetails, currentUser, loading, response, error } = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(getUserDetails(currentUser._id, "Student"));
    }, [dispatch, currentUser._id])

    if (response) { console.log(response) }
    else if (error) { console.log(error) }

    const [subjectMarks, setSubjectMarks] = useState([]);
    const [selectedSection, setSelectedSection] = useState('table');

    useEffect(() => {
        if (userDetails) {
            setSubjectMarks(userDetails.examResult || []);
        }
    }, [userDetails])

    useEffect(() => {
        if (subjectMarks.length === 0) {
            dispatch(getSubjectList(currentUser.sclassName._id, "ClassSubjects"));
        }
    }, [subjectMarks, dispatch, currentUser.sclassName._id]);

    const handleSectionChange = (event, newSection) => {
        setSelectedSection(newSection);
    };

    const renderTableSection = () => {
        return (
            <StyledPaper elevation={3}>
                <Typography variant="h4" align="center" gutterBottom>
                    Subject Marks
                </Typography>
                <Table>
                    <TableHead>
                        <StyledTableRow>
                            <StyledTableCell>Subject</StyledTableCell>
                            <StyledTableCell>Marks</StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {subjectMarks.map((result, index) => {
                            if (!result.subName || !result.marksObtained) {
                                return null;
                            }
                            return (
                                <StyledTableRow key={index}>
                                    <StyledTableCell>{result.subName.subName}</StyledTableCell>
                                    <StyledTableCell>{result.marksObtained}</StyledTableCell>
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </StyledPaper>
        );
    };

    const renderChartSection = () => {
        return (
            <StyledPaper elevation={3}>
                <CustomBarChart chartData={subjectMarks} dataKey="marksObtained" />
            </StyledPaper>
        );
    };

    const renderClassDetailsSection = () => {
        return (
            <Container>
                <StyledPaper elevation={3}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" gutterBottom>
                                Class Details
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h5" gutterBottom>
                                You are currently in Class {sclassDetails && sclassDetails.sclassName}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                And these are the subjects:
                            </Typography>
                            {subjectsList &&
                                subjectsList.map((subject, index) => (
                                    <Box key={index}>
                                        <Typography variant="subtitle1">
                                            {subject.subName} ({subject.subCode})
                                        </Typography>
                                    </Box>
                                ))}
                        </Grid>
                    </Grid>
                </StyledPaper>
            </Container>
        );
    };

    return (
        <Container maxWidth="md">
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    {subjectMarks && Array.isArray(subjectMarks) && subjectMarks.length > 0
                        ?
                        (<>
                            {selectedSection === 'table' && renderTableSection()}
                            {selectedSection === 'chart' && renderChartSection()}

                            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                                <BottomNavigation value={selectedSection} onChange={handleSectionChange} showLabels>
                                    <BottomNavigationAction
                                        label="Table"
                                        value="table"
                                        icon={selectedSection === 'table' ? <TableChartIcon /> : <TableChartOutlinedIcon />}
                                    />
                                    <BottomNavigationAction
                                        label="Chart"
                                        value="chart"
                                        icon={selectedSection === 'chart' ? <InsertChartIcon /> : <InsertChartOutlinedIcon />}
                                    />
                                </BottomNavigation>
                            </Paper>
                        </>)
                        :
                        (<>
                            {renderClassDetailsSection()}
                        </>)
                    }
                </div>
            )}
        </Container>
    );
};

export default StudentSubjects;

const StyledPaper = styled(Paper)`
  padding: 20px;
  margin-bottom: 20px;
`;