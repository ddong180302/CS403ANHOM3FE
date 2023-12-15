import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getAllBenefitPlan } from "../../services/apiServices";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BenefitPlan = () => {
  const [dataBenefitPlan, setDataBenefitPlan] = useState([]);


  useEffect(() => {
    fetchListBenefitPlan();
  }, [])

  const fetchListBenefitPlan = async () => {
    try {
      const res = await getAllBenefitPlan();
      if (res && res.data) {
        const usersWithId = res.data.map((benefitplan) => ({
          ...benefitplan,
          id: benefitplan.Benefit_Plan_ID.toString(), // Sử dụng Employee_ID làm id
        }));
        setDataBenefitPlan(usersWithId);
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

  const handleCreateBenefitPlan = () => {
  }

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    {
      field: "Benefit_Plan_ID",
      headerName: "Benefit_Plan_ID",
      flex: 0.5
    },
    {
      field: "Plan_Name",
      headerName: "Plan_Name",
      flex: 1,
    },
    {
      field: "Deductable",
      headerName: "Deductable",
      flex: 1,
    },
    {
      field: "Percentage_CoPay",
      headerName: "Percentage_CoPay",
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
      <ToastContainer />
      <Box m="20px">
        <Header title="BENEFIT PLANS" subtitle="Quản lý Benefit plans" />
        <Box>
          <Button variant="contained" onClick={() => handleCreateBenefitPlan()}>Add BenefitPlan</Button>
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
          <DataGrid checkboxSelection rows={dataBenefitPlan} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default BenefitPlan;
