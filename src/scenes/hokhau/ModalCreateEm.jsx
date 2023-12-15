import React, { useEffect, useState } from 'react';
//import Button from '@mui/material/Button';
import {
    Modal,
    Button,
    Typography,
    Box,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ModalEditEmployee.css';
import { createPersonal } from '../../services/apiServices';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    bgcolor: 'background.paper',
    borderRadius: 8,
    outline: 'none',
    boxShadow: 24,
    p: 4,
};
const ModalCreateEmployee = (props) => {
    const { show, setShow, dataPay, listBenefit, handleClose } = props;
    const [Employee_ID, setEmployee_ID] = useState();
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
    const [Benefit_Plan_ID, setBenefit_Plan_ID] = useState("");
    const [idPay_Rates, setIdPay_Rates] = useState("");
    const [Vacation_Days, setVacation_Days] = useState();
    const [Paid_To_Date, setPaid_To_Date] = useState();
    const [Paid_Last_Year, setPaid_Last_Year] = useState();
    const [Pay_Rate, setPay_Rate] = useState("");
    const [Employee_Number, setEmployee_Number] = useState();
    useEffect(() => {
        generateRandomID();
        generateRandomNumber_E();
    }, [])
    const generateRandomID = () => {
        const min = 1;
        const max = 999999;
        let randomID = Math.floor(Math.random() * (max - min + 1)) + min;
        setEmployee_ID(randomID);
    }

    const generateRandomNumber_E = () => {
        const min = 1;
        const max = 999999;
        let randomID = Math.floor(Math.random() * (max - min + 1)) + min;
        setEmployee_Number(randomID);
    }


    const validateEmail = (Email) => {
        return String(Email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };

    const handleCreate = async () => {
        const dataPersonal = {
            Employee_Number,
            Employee_ID,
            First_Name,
            Middle_Initial,
            Last_Name,
            Address1,
            Address2,
            City,
            State,
            Zip,
            Email,
            Phone_Number,
            Social_Security_Number,
            Drivers_License,
            Marital_Status,
            Gender,
            Shareholder_Status,
            Benefit_Plan_ID,
            Ethnicity,
            Pay_Rate,
            idPay_Rates: parseFloat(idPay_Rates),
            Vacation_Days: parseFloat(Vacation_Days),
            Paid_Last_Year: parseFloat(Paid_Last_Year),
            Paid_To_Date: parseFloat(Paid_To_Date),
        };

        if (First_Name === "") {
            toast.warning('First_Name không được để trống')
            return;
        }
        if (Middle_Initial === "") {
            toast.warning('Middle_Initial không được để trống')
            return;
        }
        if (Last_Name === "") {
            toast.warning('Last_Name không được để trống')
            return;
        }
        if (Address1 === "") {
            toast.warning('Address1 không được để trống')
            return;
        }
        if (Address2 === "") {
            toast.warning('Address2 không được để trống')
            return;
        }

        if (City === "") {
            toast.warning('City không được để trống')
            return;
        }
        if (State === "") {
            toast.warning('State không được để trống')
            return;
        }
        if (Zip === "") {
            toast.warning('Zip không được để trống')
            return;
        }

        const isValidEmail = validateEmail(Email);
        if (!isValidEmail) {
            toast.error('Email đang để trống hoặc không đúng định dạng');
            return;
        }
        // if (Email === "") {
        //     toast.warning('Email không được để trống')
        //     return;
        // }

        
        if (Phone_Number === "") {
            toast.warning('Phone_Number không được để trống')
            return;
        }
        if (Social_Security_Number === "") {
            toast.warning('Social_Security_Number không được để trống')
            return;
        }
        if (Drivers_License === "") {
            toast.warning('Drivers_License không được để trống')
            return;
        }
        if (Marital_Status === "") {
            toast.warning('Marital_Status không được để trống')
            return;
        }

        if (idPay_Rates === "") {
            toast.warning('Pay_Rate_Name không được để trống')
            return;
        }

        if (Gender === "") {
            toast.warning('Gender không được để trống')
            return;
        }

        if (Shareholder_Status === "") {
            toast.warning('Shareholder_Status không được để trống')
            return;
        }

        if (Benefit_Plan_ID === "") {
            toast.warning('Benefit_Plan_ID không được để trống')
            return;
        }

        if (Ethnicity === "") {
            toast.warning('Ethnicity không được để trống')
            return;
        }
        if (Pay_Rate === '') {
            toast.warning('Pay_Rate không được để trống');
            return;
        }

        if (idPay_Rates === '') {
            toast.warning('idPay_Rates không được để trống');
            return;
        }

        if (Vacation_Days === '' || isNaN(Vacation_Days)) {
            toast.warning('Vacation_Days không được để trống');
            return;
        }
        if (Paid_Last_Year === '' || isNaN(Paid_Last_Year)) {
            toast.warning('Paid_Last_Year không được để trống');
            return;
        }
        if (Paid_To_Date === '' || isNaN(Paid_To_Date)) {
            toast.warning('Paid_To_Date không được để trống')
            return;
        }
        let data = await createPersonal(dataPersonal);
        if (data) {
            toast.success(data.message);
            setShow(false);
            await props.fetchListStaff();
        } else {
            toast.error('Đã có lỗi xảy ra!')
        }
        console.log(dataPersonal);
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
                            Modal Create Infomation Staff
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, maxHeight: '60vh', overflow: 'auto' }}>
                        {/* <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Employee_ID:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Employee_ID} onChange={(event) => setEmployee_ID(event.target.value)} />
                            </div>
                        </div> */}
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">First_Name:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={First_Name} onChange={(event) => setFirst_Name(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Middle_Initial:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Middle_Initial} onChange={(event) => setMiddle_Initial(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Last_Name:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Last_Name} onChange={(event) => setLast_Name(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Address1:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Address1} onChange={(event) => setAddress1(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Address2:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Address2} onChange={(event) => setAddress2(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">City:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={City} onChange={(event) => setCity(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">State:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={State} onChange={(event) => setState(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Zip:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="number" value={Zip} onChange={(event) => setZip(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Email:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Email} onChange={(event) => setEmail(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Phone_Number:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Phone_Number} onChange={(event) => setPhone_Number(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Social_Security_Number:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' placeholder='Nhập số nhé' type="number" value={Social_Security_Number} onChange={(event) => setSocial_Security_Number(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Drivers_License:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Drivers_License} onChange={(event) => setDrivers_License(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Marital_Status:</label>
                            </div>
                            <div className='div-input'>
                                <select id="Marital_Status" className='input' type="text" value={Marital_Status} onChange={(event) => setMarital_Status(event.target.value)} >
                                    <option value="">-- Select Marital Status --</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widowed">Widowed</option>
                                    <option value="Separated">Separated</option>
                                    <option value="Engaged">Engaged</option>
                                    <option value="In_Relationship">In a relationship</option>
                                    <option value="Complicated">It's complicated</option>
                                    <option value="Not_Say">Prefer not to say</option>
                                </select>
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="gender">Gender:</label>
                            </div>
                            <div className='div-input'>
                                <select className='input' id="gender" value={Gender} onChange={(event) => setGender(event.target.value)}>
                                    <option value="">-- Select Gender --</option>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Shareholder_Status:</label>
                            </div>
                            <div className='div-input'>
                                <select className='input' id="gender" value={Shareholder_Status} onChange={(event) => setShareholder_Status(event.target.value)}>
                                    <option value="">-- Select Shareholder_Status --</option>
                                    <option value="1">True</option>
                                    <option value="0">False</option>
                                </select>
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Benefit_Plans:</label>
                            </div>
                            <div className='div-input'>
                                <select className='input' onChange={(event) => setBenefit_Plan_ID(parseInt(event.target.value, 10))}>
                                    <option value="">-- Select Benefit_Plans --</option>
                                    {listBenefit
                                        .map((plan, index) => (
                                            <option key={index} value={plan.value}>
                                                {plan.label}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Ethnicity:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Ethnicity} onChange={(event) => setEthnicity(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Pay_Rate_Name:</label>
                            </div>
                            <div className='div-input'>
                                <select className='input' onChange={(event) => setIdPay_Rates(event.target.value)}>
                                    <option value="">-- Select Pay_Rate_Name --</option>
                                    {dataPay
                                        .map((pay, index) => (
                                            <option key={index} value={pay.value}>
                                                {pay.label}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        </div>

                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Paid_To_Date:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' placeholder='Nhập số nhé' type="number" value={Paid_To_Date} onChange={(event) => setPaid_To_Date(event.target.value)} />
                            </div>
                        </div>

                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Vacation_Days:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' placeholder='Nhập số nhé' type="number" value={Vacation_Days} onChange={(event) => setVacation_Days(event.target.value)} />
                            </div>
                        </div>

                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Paid_Last_Year:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' placeholder='Nhập số nhé' type="number" value={Paid_Last_Year} onChange={(event) => setPaid_Last_Year(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Pay_Rate:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={Pay_Rate} onChange={(event) => setPay_Rate(event.target.value)} />
                            </div>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button variant="contained" onClick={() => handleCreate()} sx={{ marginRight: '10px' }}>Create</Button>
                        <Button variant="contained" onClick={handleClose}>Close</Button>
                    </Typography>
                </Box>
            </Modal>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />
        </>
    );
}

export default ModalCreateEmployee;