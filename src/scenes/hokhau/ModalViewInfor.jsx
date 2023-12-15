import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Modal, Box, Typography } from "@mui/material";
import _ from 'lodash';
import { getBenefitPlansById, getEmergency_ContactsById, getEmploymentById, getJobHistoryById } from '../../services/apiServices';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { formatDate } from '@fullcalendar/core';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    borderRadius: 8,
    outline: 'none',
    boxShadow: 24,
    p: 4,
};
const ModalViewInfor = (props) => {
    function createData(
        Employee_ID, First_Name, Middle_Initial, Last_Name, Address1, Address2,
        City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License,
        Marital_Status, Gender, Shareholder_Status, Ethnicity, Plan_Name, Pay_Rate_Name,
        Benefit_Plan_ID, idPay_Rates, Vacation_Days, Paid_To_Date, Paid_Last_Year, Pay_Rate
    ) {
        return {
            Employee_ID, First_Name, Middle_Initial, Last_Name, Address1, Address2,
            City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License,
            Marital_Status, Gender, Shareholder_Status, Ethnicity, Plan_Name, Pay_Rate_Name,
            Benefit_Plan_ID, idPay_Rates, Vacation_Days, Paid_To_Date, Paid_Last_Year, Pay_Rate
        };
    }

    const { show, dataView, handleClose, id ,idBenefit} = props;
    const [Employee_ID, setEmployee_ID] = useState("");
    const [First_Name, setFirst_Name] = useState("");
    const [Middle_Initial, setMiddle_Initial] = useState("");
    const [Last_Name, setLast_Name] = useState("");
    const [Address1, setAddress1] = useState("");
    const [Address2, setAddress2] = useState("");
    const [City, setCity] = useState("");
    const [State, setState] = useState("");
    const [Zip, setZip] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone_Number, setPhone_Number] = useState("");
    const [Social_Security_Number, setSocial_Security_Number] = useState("");
    const [Drivers_License, setDrivers_License] = useState("");
    const [Marital_Status, setMarital_Status] = useState("");
    const [Gender, setGender] = useState("");
    const [Shareholder_Status, setShareholder_Status] = useState("");
    const [Ethnicity, setEthnicity] = useState("");
    const [Plan_Name, setPlan_Name] = useState("");
    const [Pay_Rate_Name, setPay_Rate_Name] = useState("");
    const [Benefit_Plan_ID, setBenefit_Plan_ID] = useState("");
    const [idPay_Rates, setIdPay_Rates] = useState("");
    const [Vacation_Days, setVacation_Days] = useState("");
    const [Paid_To_Date, setPaid_To_Date] = useState("");
    const [Paid_Last_Year, setPaid_Last_Year] = useState("");
    const [Pay_Rate, setPay_Rate] = useState("");
    const [dataJob_His, setDataJob_His] = useState([]);
    const [dataEContacts, setDataEContacts] = useState([]);
    const [dataEployment, setDataEployment] = useState([]);
    const [dataBenefit, setDataBenefit] = useState([]);
    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setEmployee_ID(dataView.Employee_ID)
            setFirst_Name(dataView.First_Name)
            setLast_Name(dataView.Last_Name)
            setMiddle_Initial(dataView.Middle_Initial)
            setAddress1(dataView.Address1)
            setAddress2(dataView.Address2)
            setCity(dataView.City)
            setState(dataView.State)
            setZip(dataView.Zip)
            setEmail(dataView.Email)
            setPhone_Number(dataView.Phone_Number)
            setSocial_Security_Number(dataView.Social_Security_Number)
            setDrivers_License(dataView.Drivers_License)
            setMarital_Status(dataView.Marital_Status)
            setGender(dataView.Gender)
            setShareholder_Status(dataView.Shareholder_Status)
            setEthnicity(dataView.Ethnicity)
            setPlan_Name(dataView.Plan_Name)
            setPay_Rate_Name(dataView.Pay_Rate_Name)
            setBenefit_Plan_ID(dataView.Benefit_Plan_ID)
            setIdPay_Rates(dataView.idPay_Rates)
            setVacation_Days(dataView.Vacation_Days)
            setPaid_To_Date(dataView.Paid_To_Date)
            setPaid_Last_Year(dataView.Paid_Last_Year)
            setPay_Rate(dataView.Pay_Rate)
        }
        fetchListJobhistoryById();
        fetchListEmergency_ContactsById();
        fetchListEmploymentById();
        fetchListBenefitPlansById();
    }, [dataView])
    const rows = [
        createData(Employee_ID, First_Name, Middle_Initial, Last_Name, Address1, Address2,
            City, State, Zip, Email, Phone_Number, Social_Security_Number, Drivers_License,
            Marital_Status, Gender, Shareholder_Status, Ethnicity, Plan_Name, Pay_Rate_Name,
            Benefit_Plan_ID, idPay_Rates, Vacation_Days, Paid_To_Date, Paid_Last_Year, Pay_Rate
        ),
    ];

    const fetchListJobhistoryById = async () => {
        try {
            if (id) {
                const res = await getJobHistoryById(id);
                if (res && res.data) {
                    const usersWithId = res.data.map((user) => ({
                        ...user,
                        id: user.Employee_ID.toString(), // Sử dụng Employee_ID làm id
                    }));
                    setDataJob_His(usersWithId);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchListEmergency_ContactsById = async () => {
        try {
            if (id) {
                const res = await getEmergency_ContactsById(id);
                if (res && res.data) {
                    const usersWithId = res.data.map((user) => ({
                        ...user,
                        id: user.Employee_ID.toString(), // Sử dụng Employee_ID làm id
                    }));
                    setDataEContacts(usersWithId);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchListEmploymentById = async () => {
        try {
            if (id) {
                const res = await getEmploymentById(id);
                if (res && res.data) {
                    const usersWithId = res.data.map((user) => ({
                        ...user,
                        id: user.Employee_ID.toString(), // Sử dụng Employee_ID làm id
                    }));
                    setDataEployment(usersWithId);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    const fetchListBenefitPlansById = async () => {
        try {
            if (idBenefit) {
                const res = await getBenefitPlansById(idBenefit);
                if (res && res.data) {
                    const usersWithId = res.data.map((user) => ({
                        ...user,
                        id: user.Benefit_Plan_ID.toString(), // Sử dụng Employee_ID làm id
                    }));
                    setDataBenefit(usersWithId);
                }
            }
        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <>
            <Modal
                open={show}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        <div>
                            Modal View Infomation Staff
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, maxHeight: '60vh', overflow: 'auto' }}>
                        <TableContainer component={Paper}>
                        <h1>Table View Infor Personal</h1>
                            <Table sx={{ minWidth: 650, border: '1px solid black', marginBottom: '40px' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Employee_Id</TableCell>
                                        <TableCell>First_Name</TableCell>
                                        <TableCell>Middle_Initial</TableCell>
                                        <TableCell>Last_Name</TableCell>
                                        <TableCell>Address1</TableCell>
                                        <TableCell>Address2</TableCell>
                                        <TableCell>City</TableCell>
                                        <TableCell>State</TableCell>
                                        <TableCell>Zip</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone_Number</TableCell>
                                        <TableCell>Social_Security_Number</TableCell>
                                        <TableCell>Drivers_License</TableCell>
                                        <TableCell>Marital_Status</TableCell>
                                        <TableCell>Gender</TableCell>
                                        <TableCell>Shareholder_Status</TableCell>
                                        <TableCell>Ethnicity</TableCell>
                                        <TableCell>Plan_Name</TableCell>
                                        <TableCell>Pay_Rate_Name</TableCell>
                                        <TableCell>Benefit_Plan_ID</TableCell>
                                        <TableCell>idPay_Rates</TableCell>
                                        <TableCell>Vacation_Days</TableCell>
                                        <TableCell>Paid_To_Date</TableCell>
                                        <TableCell>Paid_Last_Year</TableCell>
                                        <TableCell>Pay_Rate</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.map((row) => (
                                        <TableRow
                                            key={row.id + 'ddd'}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.Employee_ID}
                                            </TableCell>
                                            <TableCell>{row.First_Name}</TableCell>
                                            <TableCell>{row.Middle_Initial}</TableCell>
                                            <TableCell>{row.Last_Name}</TableCell>
                                            <TableCell>{row.Address1}</TableCell>
                                            <TableCell>{row.Address2}</TableCell>
                                            <TableCell>{row.City}</TableCell>
                                            <TableCell>{row.State}</TableCell>
                                            <TableCell>{row.Zip}</TableCell>
                                            <TableCell>{row.Email}</TableCell>
                                            <TableCell>{row.Phone_Number}</TableCell>
                                            <TableCell>{row.Social_Security_Number}</TableCell>
                                            <TableCell>{row.Drivers_License}</TableCell>
                                            <TableCell>{row.Marital_Status}</TableCell>
                                            <TableCell>{row.Gender ? "Nam" : "Nữ"}</TableCell>
                                            <TableCell>{row.Shareholder_Status ? "True" : "False"}</TableCell>
                                            <TableCell>{row.Ethnicity}</TableCell>
                                            <TableCell>{row.Plan_Name}</TableCell>
                                            <TableCell>{row.Pay_Rate_Name}</TableCell>
                                            <TableCell>{row.Benefit_Plan_ID}</TableCell>
                                            <TableCell>{row.idPay_Rates}</TableCell>
                                            <TableCell>{row.Vacation_Days}</TableCell>
                                            <TableCell>{row.Paid_To_Date}</TableCell>
                                            <TableCell>{row.Paid_Last_Year}</TableCell>
                                            <TableCell>{row.Pay_Rate}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TableContainer component={Paper}>
                        <h1>Table View Infor Job History</h1>
                            <Table sx={{ minWidth: 650, border: '1px solid black', marginBottom: '40px' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Employee_Id</TableCell>
                                        <TableCell>Department</TableCell>
                                        <TableCell>Departmen_Code</TableCell>
                                        <TableCell>Division</TableCell>
                                        <TableCell>Start_Date</TableCell>
                                        <TableCell>End_Date</TableCell>
                                        <TableCell>Hazardous_Training</TableCell>
                                        <TableCell>Hours_per_Week</TableCell>
                                        <TableCell>ID</TableCell>
                                        <TableCell>Job_Category</TableCell>
                                        <TableCell>Job_Title</TableCell>
                                        <TableCell>Location</TableCell>
                                        <TableCell>Pay_Period</TableCell>
                                        <TableCell>Salary_Type</TableCell>
                                        <TableCell>Supervisor</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataJob_His.map((row) => (
                                        <TableRow
                                            key={row.id + 'ccc'}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.Employee_ID}
                                            </TableCell>
                                            <TableCell>{row.Department}</TableCell>
                                            <TableCell>{row.Departmen_Code}</TableCell>
                                            <TableCell>{row.Division}</TableCell>
                                            <TableCell>{formatDate(row.Start_Date)}</TableCell>
                                            <TableCell>{formatDate(row.End_Date)}</TableCell>
                                            <TableCell>{row.Hazardous_Training ? "true" : "false"}</TableCell>
                                            <TableCell>{row.Hours_per_Week}</TableCell>
                                            <TableCell>{row.ID}</TableCell>
                                            <TableCell>{row.Job_Category}</TableCell>
                                            <TableCell>{row.Job_Title}</TableCell>
                                            <TableCell>{row.Location}</TableCell>
                                            <TableCell>{row.Pay_Period}</TableCell>
                                            <TableCell>{row.Salary_Type}</TableCell>
                                            <TableCell>{row.Supervisor}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TableContainer component={Paper}>
                        <h1>Table View Infor Emergency_Contacts</h1>
                            <Table sx={{ minWidth: 650, border: '1px solid black', marginBottom: '40px' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Employee_Id</TableCell>
                                        <TableCell>Emergency_Contact_Name</TableCell>
                                        <TableCell>Phone_Number</TableCell>
                                        <TableCell>Relationship</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataEContacts.map((row) => (
                                        <TableRow
                                            key={row.id + 'bbb'}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.Employee_ID}
                                            </TableCell>
                                            <TableCell>{row.Emergency_Contact_Name}</TableCell>
                                            <TableCell>{row.Phone_Number}</TableCell>
                                            <TableCell>{row.Relationship}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TableContainer component={Paper}>
                        <h1>Table View Infor Employment</h1>
                            <Table sx={{ minWidth: 650, border: '1px solid black', marginBottom: '40px' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Employee_Id</TableCell>
                                        <TableCell>Employment_Status</TableCell>
                                        <TableCell>Hire_Date</TableCell>
                                        <TableCell>Last_Review_Date</TableCell>
                                        <TableCell>Rehire_Date</TableCell>
                                        <TableCell>Termination_Date</TableCell>
                                        <TableCell>Workers_Comp_Code</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataEployment.map((row) => (
                                        <TableRow
                                            key={row.id + 'aaa'}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.Employee_ID}
                                            </TableCell>
                                            <TableCell>{row.Employment_Status}</TableCell>
                                            <TableCell>{formatDate(row.Hire_Date)}</TableCell>
                                            <TableCell>{formatDate(row.Last_Review_Date)}</TableCell>
                                            <TableCell>{formatDate(row.Rehire_Date)}</TableCell>
                                            <TableCell>{formatDate(row.Termination_Date)}</TableCell>
                                            <TableCell>{row.Workers_Comp_Code}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                        <TableContainer component={Paper}>
                        <h1>Table View Infor Benefit Plans</h1>
                            <Table sx={{ minWidth: 650, border: '1px solid black', marginBottom: '40px' }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Benefit_Plan_ID</TableCell>
                                        <TableCell>Deductable</TableCell>
                                        <TableCell>Percentage_CoPay</TableCell>
                                        <TableCell>Plan_Name</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataBenefit.map((row) => (
                                        <TableRow
                                            key={row.id + 'ggg'}
                                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                        >
                                            <TableCell component="th" scope="row">
                                                {row.Benefit_Plan_ID}
                                            </TableCell>
                                            <TableCell>{row.Deductable}</TableCell>
                                            <TableCell>{row.Percentage_CoPay}</TableCell>
                                            <TableCell>{row.Plan_Name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}

export default ModalViewInfor;