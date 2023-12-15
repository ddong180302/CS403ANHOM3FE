import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getAllHoKhau} from "../../services/apiServices";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const HoKhau = () => {
  const [arrHoKhau, setArrHoKhau] = useState([]);


  useEffect(() => {
    fetchListHoKhau();
  }, [])

  const fetchListHoKhau = async () => {
    try {
      const res = await getAllHoKhau();
      console.log(res)
      if (res && res.data) {
        const usersWithId = res.data.map((user) => ({
          ...user,
          id: user.HoKhauID.toString(), // Sử dụng HoKhauID làm id
        }));
        setArrHoKhau(usersWithId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (row) => {
    
  };
  


  // Random UUID
  const handleDelete = (id) => {
    // Xử lý sự kiện xóa
    //alert(uid.rnd());
    toast.warning('Không xóa được đâu, đừng cố chấp!')
  };
  const handleView = (row) => {
   
  };

  const handleCreateHoKhau = () => {
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "HoKhauID",
      headerName: "HoKhauID",
      flex: 0.5
    },
    {
      field: "HoTenChuHo",
      headerName: "HoTenChuHo",
      flex: 1,
    },
    {
      field: "SoNha",
      headerName: "SoNha",
      flex: 1,
    },
    {
      field: "DuongPho",
      headerName: "DuongPho",
      flex: 1,
    },
    {
      field: "PhuongXa",
      headerName: "PhuongXa",
      flex: 1,
    },
    {
      field: "QuanHuyen",
      headerName: "QuanHuyen",
      flex: 1,
    },
   
    {
      field: "SoHoKhau",
      headerName: "SoHoKhau",
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
          <IconButton onClick={() => handleDelete(params.row.id)}>
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
      {/* Same as */}
      <ToastContainer />
      <Box m="20px">
        <Header title="HỘ KHẨU" subtitle="Quản lý hộ khẩu" />
        <Box>
          <Button variant="contained" onClick={() => handleCreateHoKhau()}>Add Hộ Khẩu</Button>
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
          <DataGrid checkboxSelection rows={arrHoKhau} columns={columns} />
        </Box>
      </Box>
    </>

  );
};

export default HoKhau;
