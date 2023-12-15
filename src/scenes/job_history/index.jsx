import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getAllJobHistory } from "../../services/apiServices";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from "@fullcalendar/core";

const JobHistory = () => {

  const [dataJobHistory, setDataJobHistory] = useState([]);
  useEffect(() => {
    fetchListJobHistory();
  }, [])
  
  const fetchListJobHistory = async () => {
    try {
      const res = await getAllJobHistory();
      if (res && res.data) {
        const JobHistoryWithId = res.data.map((JobHistory, index) => ({
          ...JobHistory,
          id: index + 1,
        }));
        setDataJobHistory(JobHistoryWithId);
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
      field: "ID",
      headerName: "ID",
      flex: 0.5
    },
    {
      field: "Employee_ID",
      headerName: "Employee_ID",
      flex: 0.5
    },
    { 
      field: "Departmen_Code",
      headerName: "Departmen_Code",
      flex: 0.5,
    },
    {
      field: "Department",
      headerName: "Department",
      flex: 1,
    },
    {
      field: "Division",
      headerName: "Division",
      flex: 1,
    },
    {
      field: "Start_Date",
      headerName: "Start_Date",
      flex: 1,
      valueFormatter: (params) => formatDate(params.value), // Sử dụng formatDate ở đây
    },
    {
      field: "End_Date",
      headerName: "End_Date",
      flex: 1,
      valueFormatter: (params) => formatDate(params.value), // Sử dụng formatDate ở đây
    },
    {
      field: "Hazardous_Training",
      headerName: "Hazardous_Training",
      flex: 1,
    },
    {
      field: "Hours_per_Week",
      headerName: "Hours_per_Week",
      flex: 0.5,
    },
    {
      field: "Job_Category",
      headerName: "Job_Category",
      flex: 1,
    },
    {
      field: "Job_Title",
      headerName: "Job_Title",
      flex: 1,
    },
    {
      field: "Location",
      headerName: "Location",
      flex: 1,
    },
    {
      field: "Pay_Period",
      headerName: "Pay_Period",
      flex: 1,
    },
    {
      field: "Salary_Type",
      headerName: "Salary_Type",
      flex: 0.4,
    },
    {
      field: "Supervisor",
      headerName: "Supervisor",
      flex: 0.5,
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
        <Header title="Job History" subtitle="Quản lý Job History" />
        <Box>
          <Button variant="contained" onClick={() => handleCreatePayrate()}>Add Job History</Button>
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
          <DataGrid checkboxSelection rows={dataJobHistory} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default JobHistory;
