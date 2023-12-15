import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import { getAllEmergency } from "../../services/apiServices";
import { useState, useEffect } from "react";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { formatDate } from "@fullcalendar/core";

const Contacts = () => {
  const [dataContacts, setDataContacts] = useState([]);
  useEffect(() => {
    fetchListContacts();
  }, [])
  
  const fetchListContacts = async () => {
    try {
      const res = await getAllEmergency();
      if (res && res.data) {
        const ContactsWithId = res.data.map((Contacts, index) => ({
          ...Contacts,
          id: index + 1,
        }));
        setDataContacts(ContactsWithId);
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
      field: "Emergency_Contact_Name",
      headerName: "Emergency_Contact_Name",
      flex: 1,
    },
    {
      field: "Phone_Number",
      headerName: "Phone_Number",
      flex: 1,
    },
    {
      field: "Relationship",
      headerName: "Relationship",
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
        <Header title="Emergency Contacts" subtitle="Quản lý Emergency Contacts" />
        <Box>
          <Button variant="contained" onClick={() => handleCreatePayrate()}>Add Emergency Contacts</Button>
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
          <DataGrid checkboxSelection rows={dataContacts} columns={columns} />
        </Box>
      </Box>
    </>
  );
};

export default Contacts;
