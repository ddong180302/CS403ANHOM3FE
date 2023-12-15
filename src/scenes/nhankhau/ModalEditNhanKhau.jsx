import React, { useEffect, useState } from 'react';
//import Button from '@mui/material/Button';
import './ModalCreateNhanKhau.css';
import { updateNhanKhau } from "../../services/apiServices";
import _ from 'lodash';
import {
    Modal,
    Button,
    Typography,
    Box,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
const ModalEditNhanKhau = (props) => {
    const { show, setShow, handleClose, dataEdit } = props;
    const [MaSoDinhDanh, setMaSoDinhDanh] = useState("");
    const [HoTen, setHoTen] = useState("");
    const [BiDanh, setBiDanh] = useState("");
    const [NgayThangNamSinh, setNgayThangNamSinh] = useState("");
    const [NoiSinh, setNoiSinh] = useState("");
    const [NguyenQuan, setNguyenQuan] = useState("");
    const [NoiLamViec, setNoiLamViec] = useState("");
    const [QuanHeVoiChuHo, setQuanHeVoiChuHo] = useState("");
    const [SoCMND_CCDC, setSoCMND_CCDC] = useState("");
    const [NgheNghiep, setNgheNghiep] = useState("");
    const [HoKhauID, setHoKhauID] = useState();
    const [DiaChiTruocKhiChuyenDen, setDiaChiTruocKhiChuyenDen] = useState("");
    const [DanToc, setDanToc] = useState("");
    const [NgayCapCCND_CCDC, setNgayCapCCND_CCDC] = useState("");

    useEffect(() => {
        console.log(dataEdit)
        if (!_.isEmpty(dataEdit)) {
            setMaSoDinhDanh(dataEdit.MaSoDinhDanh)
            setHoTen(dataEdit.HoTen)
            setBiDanh(dataEdit.BiDanh)
            if (dataEdit.NgayThangNamSinh) {
                const formattedDateNTNS = new Date(dataEdit.NgayThangNamSinh).toISOString().split("T")[0];
                setNgayThangNamSinh(formattedDateNTNS)
            }
            //setNgayThangNamSinh(dataEdit.NgayThangNamSinh)
            setNoiSinh(dataEdit.NoiSinh)
            setNguyenQuan(dataEdit.NguyenQuan)
            setNoiLamViec(dataEdit.NoiLamViec)
            setQuanHeVoiChuHo(dataEdit.QuanHeVoiChuHo)
            setSoCMND_CCDC(dataEdit.SoCMND_CCDC)
            setNgheNghiep(dataEdit.NgheNghiep)
            setHoKhauID(dataEdit.HoKhauID)
            setDiaChiTruocKhiChuyenDen(dataEdit.DiaChiTruocKhiChuyenDen)
            setDanToc(dataEdit.DanToc)
            if (dataEdit.NgayCapCCND_CCDC) {
                const formattedDateNCCCCD = new Date(dataEdit.NgayCapCCND_CCDC).toISOString().split("T")[0];
                setNgayCapCCND_CCDC(formattedDateNCCCCD)
            }
            //setNgayCapCCND_CCDC(dataEdit.NgayCapCCND_CCDC)
        }
    }, [dataEdit])

    const handleEditNhanKhau = async () => {
        const dataUpdateNhanKhau = {
            MaSoDinhDanh,
            HoTen,
            BiDanh,
            NgayThangNamSinh,
            NoiSinh,
            NguyenQuan,
            NoiLamViec,
            QuanHeVoiChuHo,
            SoCMND_CCDC,
            NgheNghiep,
            HoKhauID: parseFloat(HoKhauID),
            DiaChiTruocKhiChuyenDen,
            DanToc,
            NgayCapCCND_CCDC
        }

        if (HoTen === "") {
            toast.warning('Họ Tên không được để trống')
            return;
        }
        if (BiDanh === "") {
            toast.warning('Bí Danh không được để trống')
            return;
        }
        if (NgayThangNamSinh === "") {
            toast.warning('Ngày Tháng Năm Sinh không được để trống')
            return;
        }
        if (NoiSinh === "") {
            toast.warning('Nơi Sinh không được để trống')
            return;
        }
        if (NguyenQuan === "") {
            toast.warning('Nguyên Quán không được để trống')
            return;
        }
        if (NoiLamViec === "") {
            toast.warning('Nơi Làm Việc không được để trống')
            return;
        }
        if (QuanHeVoiChuHo === "") {
            toast.warning('Quan Hệ Với Chủ Hộ không được để trống')
            return;
        }
        if (SoCMND_CCDC === "") {
            toast.warning('Số CMND/CCDC không được để trống')
            return;
        }

        if (isNaN(SoCMND_CCDC) || (SoCMND_CCDC.length !== 9 && SoCMND_CCDC.length !== 12)) {
            toast.warning('Số CMND/CCDC không hợp lệ');
            return;
        }

        if (NgheNghiep === "") {
            toast.warning('Nghề Nghiệp không được để trống')
            return;
        }
        if (HoKhauID === '' || isNaN(HoKhauID)) {
            toast.warning('Hộ Khẩu ID không được để trống')
            return;
        }
        if (DiaChiTruocKhiChuyenDen === "") {
            toast.warning('Địa Chỉ Trước Khi Chuyển Đến không được để trống')
            return;
        }

        if (DanToc === "") {
            toast.warning('Dân Tộc không được để trống')
            return;
        }
        if (NgayCapCCND_CCDC === "") {
            toast.warning('Ngày Câp CMND_CCCD không được để trống')
            return;
        }

        let data = await updateNhanKhau(dataUpdateNhanKhau);
        if (data) {
            toast.success(data.message);
            setShow(false);
            await props.fetchListNhanKhau();
        } else {
            toast.error('Đã có lỗi xảy ra!')
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
                            <h3>Modal Thêm Mới Nhân Khẩu</h3>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, maxHeight: '60vh', overflow: 'auto' }}>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Mã Số Định Danh:</label>
                            </div>
                            <div className='div-input'>
                                <input disabled className='input' value={MaSoDinhDanh} type="text" />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Họ Tên:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' value={HoTen} type="text" onChange={(event) => setHoTen(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Bí Danh:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' value={BiDanh} type="text" onChange={(event) => setBiDanh(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Ngày Tháng Năm Sinh:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="date" value={NgayThangNamSinh} onChange={(event) => {
                                    const selectedDate = new Date(event.target.value);
                                    const formattedDate = selectedDate.toISOString().split('T')[0];
                                    setNgayThangNamSinh(formattedDate);
                                }} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="">Nơi Sinh:</label>
                            </div>
                            <div className='div-input'>
                                <select id="NoiSinh" className='input' type="text" value={NoiSinh} onChange={(event) => setNoiSinh(event.target.value)} >
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                    <option value="Hải Phòng">Hải Phòng</option>
                                    <option value="Cần Thơ">Cần Thơ</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="An Giang">An Giang</option>
                                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                    <option value="Bắc Giang">Bắc Giang</option>
                                    <option value="Bắc Kạn">Bắc Kạn</option>
                                    <option value="Bạc Liêu">Bạc Liêu</option>
                                    <option value="Bắc Ninh">Bắc Ninh</option>
                                    <option value="Bến Tre">Bến Tre</option>
                                    <option value="Bình Định">Bình Định</option>
                                    <option value="Bình Dương">Bình Dương</option>
                                    <option value="Bình Phước">Bình Phước</option>
                                    <option value="Bình Thuận">Bình Thuận</option>
                                    <option value="Cà Mau">Cà Mau</option>
                                    <option value="Cao Bằng">Cao Bằng</option>
                                    <option value="Đắk Lắk">Đắk Lắk</option>
                                    <option value="Đắk Nông">Đắk Nông</option>
                                    <option value="Điện Biên">Điện Biên</option>
                                    <option value="Đồng Nai">Đồng Nai</option>
                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                    <option value="Gia Lai">Gia Lai</option>
                                    <option value="Hà Giang">Hà Giang</option>
                                    <option value="Hà Nam">Hà Nam</option>
                                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                                    <option value="Hải Dương">Hải Dương</option>
                                    <option value="Hậu Giang">Hậu Giang</option>
                                    <option value="Hòa Bình">Hòa Bình</option>
                                    <option value="Hưng Yên">Hưng Yên</option>
                                    <option value="Khánh Hòa">Khánh Hòa</option>
                                    <option value="Kiên Giang">Kiên Giang</option>
                                    <option value="Kon Tum">Kon Tum</option>
                                    <option value="Lai Châu">Lai Châu</option>
                                    <option value="Lâm Đồng">Lâm Đồng</option>
                                    <option value="Lạng Sơn">Lạng Sơn</option>
                                    <option value="Lào Cai">Lào Cai</option>
                                    <option value="Long An">Long An</option>
                                    <option value="Nam Định">Nam Định</option>
                                    <option value="Nghệ An">Nghệ An</option>
                                    <option value="Ninh Bình">Ninh Bình</option>
                                    <option value="Ninh Thuận">Ninh Thuận</option>
                                    <option value="Phú Thọ">Phú Thọ</option>
                                    <option value="Phú Yên">Phú Yên</option>
                                    <option value="Quảng Bình">Quảng Bình</option>
                                    <option value="Quảng Nam">Quảng Nam</option>
                                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                                    <option value="Quảng Ninh">Quảng Ninh</option>
                                    <option value="Quảng Trị">Quảng Trị</option>
                                    <option value="Sóc Trăng">Sóc Trăng</option>
                                    <option value="Sơn La">Sơn La</option>
                                    <option value="Tây Ninh">Tây Ninh</option>
                                    <option value="Thái Bình">Thái Bình</option>
                                    <option value="Thái Nguyên">Thái Nguyên</option>
                                    <option value="Thanh Hóa">Thanh Hóa</option>
                                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                    <option value="Tiền Giang">Tiền Giang</option>
                                    <option value="Trà Vinh">Trà Vinh</option>
                                    <option value="Tuyên Quang">Tuyên Quang</option>
                                    <option value="Vĩnh Long">Vĩnh Long</option>
                                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                    <option value="Yên Bái">Yên Bái</option>
                                </select>
                            </div>
                        </div>

                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Nguyên Quán:</label>
                            </div>
                            <div className='div-input'>
                                <select id="NguyenQuan" className='input' type="text" value={NguyenQuan} onChange={(event) => setNguyenQuan(event.target.value)} >
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                    <option value="Hải Phòng">Hải Phòng</option>
                                    <option value="Cần Thơ">Cần Thơ</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="An Giang">An Giang</option>
                                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                    <option value="Bắc Giang">Bắc Giang</option>
                                    <option value="Bắc Kạn">Bắc Kạn</option>
                                    <option value="Bạc Liêu">Bạc Liêu</option>
                                    <option value="Bắc Ninh">Bắc Ninh</option>
                                    <option value="Bến Tre">Bến Tre</option>
                                    <option value="Bình Định">Bình Định</option>
                                    <option value="Bình Dương">Bình Dương</option>
                                    <option value="Bình Phước">Bình Phước</option>
                                    <option value="Bình Thuận">Bình Thuận</option>
                                    <option value="Cà Mau">Cà Mau</option>
                                    <option value="Cao Bằng">Cao Bằng</option>
                                    <option value="Đắk Lắk">Đắk Lắk</option>
                                    <option value="Đắk Nông">Đắk Nông</option>
                                    <option value="Điện Biên">Điện Biên</option>
                                    <option value="Đồng Nai">Đồng Nai</option>
                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                    <option value="Gia Lai">Gia Lai</option>
                                    <option value="Hà Giang">Hà Giang</option>
                                    <option value="Hà Nam">Hà Nam</option>
                                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                                    <option value="Hải Dương">Hải Dương</option>
                                    <option value="Hậu Giang">Hậu Giang</option>
                                    <option value="Hòa Bình">Hòa Bình</option>
                                    <option value="Hưng Yên">Hưng Yên</option>
                                    <option value="Khánh Hòa">Khánh Hòa</option>
                                    <option value="Kiên Giang">Kiên Giang</option>
                                    <option value="Kon Tum">Kon Tum</option>
                                    <option value="Lai Châu">Lai Châu</option>
                                    <option value="Lâm Đồng">Lâm Đồng</option>
                                    <option value="Lạng Sơn">Lạng Sơn</option>
                                    <option value="Lào Cai">Lào Cai</option>
                                    <option value="Long An">Long An</option>
                                    <option value="Nam Định">Nam Định</option>
                                    <option value="Nghệ An">Nghệ An</option>
                                    <option value="Ninh Bình">Ninh Bình</option>
                                    <option value="Ninh Thuận">Ninh Thuận</option>
                                    <option value="Phú Thọ">Phú Thọ</option>
                                    <option value="Phú Yên">Phú Yên</option>
                                    <option value="Quảng Bình">Quảng Bình</option>
                                    <option value="Quảng Nam">Quảng Nam</option>
                                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                                    <option value="Quảng Ninh">Quảng Ninh</option>
                                    <option value="Quảng Trị">Quảng Trị</option>
                                    <option value="Sóc Trăng">Sóc Trăng</option>
                                    <option value="Sơn La">Sơn La</option>
                                    <option value="Tây Ninh">Tây Ninh</option>
                                    <option value="Thái Bình">Thái Bình</option>
                                    <option value="Thái Nguyên">Thái Nguyên</option>
                                    <option value="Thanh Hóa">Thanh Hóa</option>
                                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                    <option value="Tiền Giang">Tiền Giang</option>
                                    <option value="Trà Vinh">Trà Vinh</option>
                                    <option value="Tuyên Quang">Tuyên Quang</option>
                                    <option value="Vĩnh Long">Vĩnh Long</option>
                                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                    <option value="Yên Bái">Yên Bái</option>
                                </select>
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Nơi Làm Việc:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={NoiLamViec} onChange={(event) => setNoiLamViec(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Quan Hệ Với Chủ Hộ:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={QuanHeVoiChuHo} onChange={(event) => setQuanHeVoiChuHo(event.target.value)} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Số CMND/CCDC:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={SoCMND_CCDC} onChange={(event) => setSoCMND_CCDC(event.target.value)} />
                            </div>
                        </div>

                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Nghề Nghiệp:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="text" value={NgheNghiep} onChange={(event) => setNgheNghiep(event.target.value)} />
                            </div>
                        </div>

                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Hộ Khẩu ID:</label>
                            </div>
                            <div className='div-input'>
                                <input disabled className='input' type="text" value={HoKhauID} />
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Địa chỉ trước khi chuyển đến:</label>
                            </div>
                            <div className='div-input'>
                                <select id="DiaChiTruocKhiChuyenDen" className='input' type="text" value={DiaChiTruocKhiChuyenDen} onChange={(event) => setDiaChiTruocKhiChuyenDen(event.target.value)} >
                                    <option value="Hà Nội">Hà Nội</option>
                                    <option value="Hồ Chí Minh">Hồ Chí Minh</option>
                                    <option value="Hải Phòng">Hải Phòng</option>
                                    <option value="Cần Thơ">Cần Thơ</option>
                                    <option value="Đà Nẵng">Đà Nẵng</option>
                                    <option value="An Giang">An Giang</option>
                                    <option value="Bà Rịa - Vũng Tàu">Bà Rịa - Vũng Tàu</option>
                                    <option value="Bắc Giang">Bắc Giang</option>
                                    <option value="Bắc Kạn">Bắc Kạn</option>
                                    <option value="Bạc Liêu">Bạc Liêu</option>
                                    <option value="Bắc Ninh">Bắc Ninh</option>
                                    <option value="Bến Tre">Bến Tre</option>
                                    <option value="Bình Định">Bình Định</option>
                                    <option value="Bình Dương">Bình Dương</option>
                                    <option value="Bình Phước">Bình Phước</option>
                                    <option value="Bình Thuận">Bình Thuận</option>
                                    <option value="Cà Mau">Cà Mau</option>
                                    <option value="Cao Bằng">Cao Bằng</option>
                                    <option value="Đắk Lắk">Đắk Lắk</option>
                                    <option value="Đắk Nông">Đắk Nông</option>
                                    <option value="Điện Biên">Điện Biên</option>
                                    <option value="Đồng Nai">Đồng Nai</option>
                                    <option value="Đồng Tháp">Đồng Tháp</option>
                                    <option value="Gia Lai">Gia Lai</option>
                                    <option value="Hà Giang">Hà Giang</option>
                                    <option value="Hà Nam">Hà Nam</option>
                                    <option value="Hà Tĩnh">Hà Tĩnh</option>
                                    <option value="Hải Dương">Hải Dương</option>
                                    <option value="Hậu Giang">Hậu Giang</option>
                                    <option value="Hòa Bình">Hòa Bình</option>
                                    <option value="Hưng Yên">Hưng Yên</option>
                                    <option value="Khánh Hòa">Khánh Hòa</option>
                                    <option value="Kiên Giang">Kiên Giang</option>
                                    <option value="Kon Tum">Kon Tum</option>
                                    <option value="Lai Châu">Lai Châu</option>
                                    <option value="Lâm Đồng">Lâm Đồng</option>
                                    <option value="Lạng Sơn">Lạng Sơn</option>
                                    <option value="Lào Cai">Lào Cai</option>
                                    <option value="Long An">Long An</option>
                                    <option value="Nam Định">Nam Định</option>
                                    <option value="Nghệ An">Nghệ An</option>
                                    <option value="Ninh Bình">Ninh Bình</option>
                                    <option value="Ninh Thuận">Ninh Thuận</option>
                                    <option value="Phú Thọ">Phú Thọ</option>
                                    <option value="Phú Yên">Phú Yên</option>
                                    <option value="Quảng Bình">Quảng Bình</option>
                                    <option value="Quảng Nam">Quảng Nam</option>
                                    <option value="Quảng Ngãi">Quảng Ngãi</option>
                                    <option value="Quảng Ninh">Quảng Ninh</option>
                                    <option value="Quảng Trị">Quảng Trị</option>
                                    <option value="Sóc Trăng">Sóc Trăng</option>
                                    <option value="Sơn La">Sơn La</option>
                                    <option value="Tây Ninh">Tây Ninh</option>
                                    <option value="Thái Bình">Thái Bình</option>
                                    <option value="Thái Nguyên">Thái Nguyên</option>
                                    <option value="Thanh Hóa">Thanh Hóa</option>
                                    <option value="Thừa Thiên Huế">Thừa Thiên Huế</option>
                                    <option value="Tiền Giang">Tiền Giang</option>
                                    <option value="Trà Vinh">Trà Vinh</option>
                                    <option value="Tuyên Quang">Tuyên Quang</option>
                                    <option value="Vĩnh Long">Vĩnh Long</option>
                                    <option value="Vĩnh Phúc">Vĩnh Phúc</option>
                                    <option value="Yên Bái">Yên Bái</option>
                                </select>
                            </div>
                        </div>
                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Dân Tộc:</label>
                            </div>
                            <div className='div-input'>
                                <select id="DanToc" className='input' type="text" value={DanToc} onChange={(event) => setDanToc(event.target.value)} >
                                    <option value="Kinh">Kinh</option>
                                    <option value="Tày">Tày</option>
                                    <option value="Thái">Thái</option>
                                    <option value="Mường">Mường</option>
                                    <option value="Khơ Mú">Khơ Mú</option>
                                    <option value="H'Mông">H'Mông</option>
                                    <option value="Dao">Dao</option>
                                    <option value="Gia Rai">Gia Rai</option>
                                    <option value="Ê Đê">Ê Đê</option>
                                    <option value="Ba Na">Ba Na</option>
                                    <option value="Xơ Đăng">Xơ Đăng</option>
                                    <option value="Sán Chay">Sán Chay</option>
                                    <option value="Cơ Ho">Cơ Ho</option>
                                    <option value="Chăm">Chăm</option>
                                    <option value="Sán Dìu">Sán Dìu</option>
                                    <option value="Hrê">Hrê</option>
                                    <option value="Ra Glai">Ra Glai</option>
                                    <option value="M'nông">M'nông</option>
                                    <option value="Thổ">Thổ</option>
                                    <option value="Xtiêng">Xtiêng</option>
                                    <option value="Kháng">Kháng</option>
                                    <option value="Co">Co</option>
                                    <option value="Bố Y">Bố Y</option>
                                    <option value="Giáy">Giáy</option>
                                    <option value="Cơ Tu">Cơ Tu</option>
                                    <option value="Giẻ Triêng">Giẻ Triêng</option>
                                    <option value="Ta Ôi">Ta Ôi</option>
                                    <option value="Mạ">Mạ</option>
                                    <option value="Cờ Lao">Cờ Lao</option>
                                    <option value="La Chí">La Chí</option>
                                    <option value="La Ha">La Ha</option>
                                    <option value="Pu Péo">Pu Péo</option>
                                    <option value="Lự">Lự</option>
                                    <option value="Ngái">Ngái</option>
                                    <option value="La Hủ">La Hủ</option>
                                    <option value="Lô Lô">Lô Lô</option>
                                    <option value="Chơ Ro">Chơ Ro</option>
                                    <option value="Xinh Mun">Xinh Mun</option>
                                    <option value="Hà Nhì">Hà Nhì</option>
                                    <option value="Chu Ru">Chu Ru</option>
                                    <option value="Lào">Lào</option>
                                    <option value="Khơ Lăng">Khơ Lăng</option>
                                    <option value="Mảng">Mảng</option>
                                    <option value="Cờ Đỏ">Cờ Đỏ</option>
                                    <option value="Chứt">Chứt</option>
                                    <option value="X' Tiêng">X' Tiêng</option>
                                    <option value="Phù Lá">Phù Lá</option>
                                    <option value="La">La</option>
                                    <option value="Lự">Lự</option>
                                    <option value="Mảng">Mảng</option>
                                    <option value="Pa Then">Pa Then</option>
                                    <option value="La Ha">La Ha</option>
                                    <option value="Khúc">Khúc</option>
                                    <option value="Xê Đăng">Xê Đăng</option>
                                </select>
                            </div>
                        </div>

                        <div className='infor'>
                            <div className='div-label'>
                                <label htmlFor="active">Ngày Cấp Căn Cước Công Dân:</label>
                            </div>
                            <div className='div-input'>
                                <input className='input' type="date" value={NgayCapCCND_CCDC} onChange={(event) => setNgayCapCCND_CCDC(event.target.value)} />
                            </div>
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                        <Button variant="contained" onClick={() => handleEditNhanKhau()} sx={{ marginRight: '10px' }}>Cập Nhật</Button>
                        <Button variant="contained" onClick={handleClose}>Đóng</Button>
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

export default ModalEditNhanKhau;