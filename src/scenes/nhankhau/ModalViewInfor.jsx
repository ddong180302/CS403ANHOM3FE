import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { Modal, Box, Typography, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import _ from 'lodash';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '60%',
    bgcolor: 'background.paper',
    borderRadius: 8,
    outline: 'none',
    boxShadow: 24,
    p: 4,
};
const ModalViewInfor = (props) => {
    const { show, dataView, handleClose } = props;
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
    const [HoKhauID, setHoKhauID] = useState("");
    const [DiaChiTruocKhiChuyenDen, setDiaChiTruocKhiChuyenDen] = useState("");
    const [DanToc, setDanToc] = useState("");
    const [NgayCapCCND_CCDC, setNgayCapCCND_CCDC] = useState("");

    useEffect(() => {
        if (!_.isEmpty(dataView)) {
            setMaSoDinhDanh(dataView.MaSoDinhDanh)
            setHoTen(dataView.HoTen)
            setBiDanh(dataView.BiDanh)
            setNgayThangNamSinh(dataView.NgayThangNamSinh)
            setNoiSinh(dataView.NoiSinh)
            setNguyenQuan(dataView.NguyenQuan)
            setNoiLamViec(dataView.NoiLamViec)
            setQuanHeVoiChuHo(dataView.QuanHeVoiChuHo)
            setSoCMND_CCDC(dataView.SoCMND_CCDC)
            setNgheNghiep(dataView.NgheNghiep)
            setHoKhauID(dataView.HoKhauID)
            setDiaChiTruocKhiChuyenDen(dataView.DiaChiTruocKhiChuyenDen)
            setDanToc(dataView.DanToc)
            setNgayCapCCND_CCDC(dataView.NgayCapCCND_CCDC)
        }
    }, [dataView])

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
                            Thông Tin Chi Tiết Của Nhân Khẩu
                        </div>
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2, maxHeight: '60vh', overflow: 'auto' }}>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell>
                                        <strong>Mã Số Định Danh</strong>
                                    </TableCell>
                                    <TableCell>{MaSoDinhDanh}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Họ Tên</strong>
                                    </TableCell>
                                    <TableCell>{HoTen}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Bí Danh</strong>
                                    </TableCell>
                                    <TableCell>{BiDanh}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Ngày Tháng Năm Sinh</strong>
                                    </TableCell>
                                    <TableCell>{NgayThangNamSinh}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Nơi Sinh</strong>
                                    </TableCell>
                                    <TableCell>{NoiSinh}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Nguyên Quán</strong>
                                    </TableCell>
                                    <TableCell>{NguyenQuan}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Nơi Làm Việc</strong>
                                    </TableCell>
                                    <TableCell>{NoiLamViec}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Quan Hệ Với Chủ Hộ</strong>
                                    </TableCell>
                                    <TableCell>{QuanHeVoiChuHo}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Số CMND/CCDC</strong>
                                    </TableCell>
                                    <TableCell>{SoCMND_CCDC}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Nghề Nghiệp</strong>
                                    </TableCell>
                                    <TableCell>{NgheNghiep}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Hộ Khẩu ID</strong>
                                    </TableCell>
                                    <TableCell>{HoKhauID}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Địa Chỉ Trước Khi Chuyển Đến</strong>
                                    </TableCell>
                                    <TableCell>{DiaChiTruocKhiChuyenDen}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Dân Tộc</strong>
                                    </TableCell>
                                    <TableCell>{DanToc}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Ngày Cấp CCND_CCDC</strong>
                                    </TableCell>
                                    <TableCell>{NgayCapCCND_CCDC}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
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