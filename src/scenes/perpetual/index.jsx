import { Box, Button, Modal, Typography, useTheme } from "@mui/material";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../../components/Header";
import Form from "../../components/Form";
import { useEffect, useState } from "react";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import FileUploadOutlinedIcon from "@mui/icons-material/FileUploadOutlined";

const Perpetual = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "_id", headerName: "Id", hide: true },
    { field: "symbol", headerName: "Symbol" },
    { field: "tradeType", headerName: "Trade Type" },
    {
      type: "number",
      field: "amount",
      headerName: "Amount",
      // flex: 1,
      headerAlign: "left",
      align: "left",
      cellClassName: "name-column--cell",
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} USDT`;
      },
    },
    {
      field: "oc",
      headerName: "OC",
      type: "number",
      headerAlign: "left",
      align: "left",
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    {
      field: "interval",
      headerName: "Interval",
      flex: 1,
    },
    {
      field: "extend",
      headerName: "Extend",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    {
      field: "tp",
      headerName: "TP",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    {
      field: "autoOc",
      headerName: "Auto OC",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    {
      field: "reduceMode",
      headerName: "Reduce Mode",
      flex: 1,
    },
    {
      field: "reduce",
      headerName: "Reduce",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    {
      field: "ignore",
      headerName: "Ignore",
      flex: 1,
      valueFormatter: (params) => {
        if (params.value == null) {
          return "";
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} %`;
      },
    },
    {
      field: "actions",
      type: "actions",
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          onClick={() => deleteConfig(params.id)}
          label="Delete"
        />,
      ],
    },
  ];

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = (newData) => {
    setOpen(false);
    if (newData._id) {
      setData([...data, newData]);
    }
  };

  const [data, setData] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}/configs`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const deleteConfig = async (configId) => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/configs/${configId}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const deletedConfig = await res.json();
    const newData = data.filter((e) => {
      console.log(e);
      console.log(deletedConfig);
      return e._id !== configId;
    });
    setData(newData);
  };

  const downloadConfigs = async () => {
    const res = await fetch(
      `${process.env.REACT_APP_BASE_URL}/configs/download`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const blob = await res.blob();
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "configs.json");
    document.body.appendChild(link);
    link.click();
    link.parentNode.removeChild(link);
  };

  const handleFileSelect = (event) => {
    const selectedFile = event.target.files[0];
    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch(`${process.env.REACT_APP_BASE_URL}/configs/upload`, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  return (
    <Box m="20px">
      <Header title="Perpetual Market" subtitle="Config trade" />
      <Box display="flex" justifyContent="end">
        <Button
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
            margin: "0 20px",
          }}
          onClick={downloadConfigs}
        >
          <DownloadOutlinedIcon sx={{ mr: "10px" }} />
          Download Configs
        </Button>
        <Button
          component="label"
          sx={{
            backgroundColor: colors.blueAccent[700],
            color: colors.grey[100],
            fontSize: "14px",
            fontWeight: "bold",
            padding: "10px 20px",
          }}
          // onClick={handleFileUpload}
        >
          <FileUploadOutlinedIcon sx={{ mr: "10px" }} />
          Upload Configs
          <input
            hidden
            accept="application/json"
            multiple
            type="file"
            onChange={handleFileSelect}
          />
        </Button>
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
        <DataGrid
          checkboxSelection
          rows={data}
          columns={columns}
          getRowId={(row) => row._id}
        />
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button onClick={handleOpen} color="secondary" variant="contained">
          Create New Config
        </Button>
        <Modal open={open} onClose={handleClose}>
          <Box sx={style}>
            <Form handleClose={handleClose} />
          </Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Perpetual;
