import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getAllEmployment } from "../../services/apiServices";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from "@fullcalendar/core";

const Employment = () => {
  const [dataEmployment, setDataEmployment] = useState([]);
  const [idE, setIdE] = useState();


  useEffect(() => {
    fetchListEmployment();
  }, [])
  
  const fetchListEmployment = async () => {
    try {
      const res = await getAllEmployment();
      if (res && res.data) {
        const EmploymentWithId = res.data.map((employment, index) => ({
          ...employment,
          id: index + 1,
        }));
        setDataEmployment(EmploymentWithId);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (row) => {
    // Xử lý sự kiện sửa

  };
  const handleDelete = (id) => {
    // Xử lý sự kiện xóa
    toast.warning('Không xóa được đâu, đừng cố chấp!')
  };
  const handleView = (row) => {
    // Xử lý sự kiện xóa

  };

  const handleCreatePayrate = () => {
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "Employee_ID",
      headerName: "Employee_ID",
      flex: 0.5
    },
    { 
      field: "Employment_Status",
      headerName: "Employment_Status",
      flex: 1,
    },
    {
      field: "Hire_Date",
      headerName: "Hire_Date",
      flex: 1,
      valueFormatter: (params) => formatDate(params.value), // Sử dụng formatDate ở đây
    },
    {
      field: "Workers_Comp_Code",
      headerName: "Workers_Comp_Code",
      flex: 1,
    },
    {
      field: "Termination_Date",
      headerName: "Termination_Date",
      flex: 1,
      valueFormatter: (params) => formatDate(params.value), // Sử dụng formatDate ở đây
    },

    {
      field: "Rehire_Date",
      headerName: "Rehire_Date",
      flex: 1,
      valueFormatter: (params) => formatDate(params.value), // Sử dụng formatDate ở đây
    },
    {
      field: "Last_Review_Date",
      headerName: "Last_Review_Date",
      flex: 1,
      valueFormatter: (params) => formatDate(params.value), // Sử dụng formatDate ở đây
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
      <ToastContainer />
      <Box m="20px">
        <Header title="Employment" subtitle="Quản lý Employment" />
        <Box>
          <Button variant="contained" onClick={() => handleCreatePayrate()}>Add Employment</Button>
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
          <DataGrid checkboxSelection rows={dataEmployment} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default Employment;
