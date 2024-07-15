import React, { useEffect } from 'react';
import { getTeacherDetails } from '../../../redux/teacherRelated/teacherHandle';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container, Typography, Card, CardContent, Grid, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/system';

const StyledCard = styled(Card)(({ theme }) => ({
  marginTop: theme.spacing(3),
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
  borderRadius: theme.shape.borderRadius,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const TeacherDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const { loading, teacherDetails, error } = useSelector((state) => state.teacher);

    const teacherID = params.id;

    useEffect(() => {
        dispatch(getTeacherDetails(teacherID));
    }, [dispatch, teacherID]);

    if (error) {
        console.error(error);
    }

    const isSubjectNamePresent = teacherDetails?.teachSubject?.subName;

    const handleAddSubject = () => {
        navigate(`/Admin/teachers/choosesubject/${teacherDetails?.teachSclass?._id}/${teacherDetails?._id}`);
    };

    return (
        <Container maxWidth="md">
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
                    <CircularProgress />
                </Box>
            ) : (
                <>
                    <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4, mb: 3 }}>
                        Teacher Details
                    </Typography>
                    <StyledCard>
                        <CardContent>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" gutterBottom>
                                        Teacher Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {teacherDetails?.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <Typography variant="h6" gutterBottom>
                                        Class Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {teacherDetails?.teachSclass?.sclassName}
                                    </Typography>
                                </Grid>
                                {isSubjectNamePresent && (
                                    <>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6" gutterBottom>
                                                Subject Name
                                            </Typography>
                                            <Typography variant="body1">
                                                {teacherDetails?.teachSubject?.subName}
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Typography variant="h6" gutterBottom>
                                                Subject Sessions
                                            </Typography>
                                            <Typography variant="body1">
                                                {teacherDetails?.teachSubject?.sessions}
                                            </Typography>
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                            {!isSubjectNamePresent && (
                                <Box display="flex" justifyContent="center">
                                    <StyledButton variant="contained" onClick={handleAddSubject} color="primary">
                                        Add Subject
                                    </StyledButton>
                                </Box>
                            )}
                        </CardContent>
                    </StyledCard>
                </>
            )}
        </Container>
    );
};

export default TeacherDetails;