import { Box, TextField, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getAllNhanKhau, deleteNhanKhau } from "../../services/apiServices";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalViewInfor from "./ModalViewInfor";
import ModalCreateNhanKhau from "./ModalCreateNhanKhau";
import ModalEditNhanKhau from "./ModalEditNhanKhau";


const NhanKhau = () => {
  const [dataNhanKhau, setDataNhanKhau] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [dataView, setDataView] = useState({});
  const [dataEdit, setDataEdit] = useState({});
  const [showModalViewInfo, setShowModalViewInfo] = useState(false);
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [showModalEidt, setShowModalEidt] = useState(false);


  useEffect(() => {
    fetchListNhanKhau();
  }, [])

  const fetchListNhanKhau = async () => {
    try {
      const res = await getAllNhanKhau();
      console.log(res)
      if (res && res.data) {
        const usersWithId = res.data.map((nhankhau) => ({
          ...nhankhau,
          id: nhankhau.MaSoDinhDanh.toString(), // Sử dụng MaSoDinhDanh làm id
        }));
        setDataNhanKhau(usersWithId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (row) => {
    setDataEdit(row);
    setShowModalEidt(true);
  };
  const handleDelete = async (row) => {
    const confirmed = window.confirm('Bạn có chắc chắn muốn xóa?');
    // Xử lý sự kiện xóa
    if (confirmed) {
      let data = await deleteNhanKhau(row.MaSoDinhDanh);
      if (data) {
        toast.success(data.message);
        await fetchListNhanKhau();
      } else {
        toast.error('Đã có lỗi xảy ra!')
      }
    } else {
      toast.success("Xóa Không Được!");
    }
  };

  const handleCloseModalView = () => setShowModalViewInfo(false);
  const handleCloseModalCreate = () => setShowModalCreate(false);
  const handleCloseModalEdit = () => setShowModalEidt(false);

  const handleView = (row) => {
    setDataView(row);
    setShowModalViewInfo(true);
  };

  const handleSearch = () => {
    // Xử lý tìm kiếm dựa trên searchText
  };

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };
  const handleCreateNhanKhau = () => {
    setShowModalCreate(true)
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "MaSoDinhDanh",
      headerName: "Mã Số Định Danh",
      flex: 0.5
    },
    {
      field: "HoTen",
      headerName: "Họ Tên",
      flex: 1,
    },
    {
      field: "NgayThangNamSinh",
      headerName: "Ngày Tháng Năm Sinh",
      flex: 1,
    },
    {
      field: "NoiSinh",
      headerName: "Nơi Sinh",
      flex: 1,
    },
    {
      field: "NguyenQuan",
      headerName: "Nguyên Quán",
      flex: 1,
    },

    {
      field: "NoiLamViec",
      headerName: "Nơi Làm Việc",
      flex: 1,
    },
    {
      field: "QuanHeVoiChuHo",
      headerName: "Quan Hệ Với Chủ Hộ",
      flex: 1,
    },
    {
      field: "SoCMND_CCDC",
      headerName: "Số CMND/CCDC",
      flex: 1,
    },
    {
      field: "NgheNghiep",
      headerName: "Nghề Nghiệp",
      flex: 1,
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1.4,
      renderCell: (params) => (
        <div>
          <IconButton onClick={() => handleView(params.row)}>
            <VisibilityIcon />
          </IconButton>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => handleDelete(params.row)}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <>
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
      <Box m="20px">
        <Header title="Nhân Khẩu" subtitle="Quản lý Nhân Khẩu" />
        <Box style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box>
            <Button variant="contained" onClick={() => handleCreateNhanKhau()}>Thêm Nhân Khẩu</Button>
          </Box>
          <Box>
            <TextField
              label="Tìm kiếm"
              variant="outlined"
              value={searchText}
              onChange={handleSearchTextChange}
            />
            <Button style={{ padding: "16px", marginLeft: "20px" }} variant="contained" onClick={handleSearch}>
              Tìm kiếm
            </Button>
          </Box>
        </Box>
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .name-column--cell": {
              color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: colors.blueAccent[700],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",
              backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
            },
          }}
        >
          <DataGrid checkboxSelection rows={dataNhanKhau} columns={columns} />
        </Box>
      </Box>
      <ModalViewInfor
        show={showModalViewInfo}
        setShow={setShowModalViewInfo}
        dataView={dataView}
        handleClose={handleCloseModalView}
      />
      <ModalCreateNhanKhau
        show={showModalCreate}
        setShow={setShowModalCreate}
        handleClose={handleCloseModalCreate}
        fetchListNhanKhau={fetchListNhanKhau}
      />

      <ModalEditNhanKhau
        show={showModalEidt}
        setShow={setShowModalEidt}
        handleClose={handleCloseModalEdit}
        dataEdit={dataEdit}
        fetchListNhanKhau={fetchListNhanKhau}
      />
    </>
  );
};

export default NhanKhau;
