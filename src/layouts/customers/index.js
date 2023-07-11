/**
=========================================================
* Soft UI Dashboard React - v4.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/soft-ui-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Table from "examples/Tables/Table";

// Data
// import partnersTableData from "layouts/partners/data/partnersTableData";
// import projectsTableData from "layouts/tables/data/projectsTableData";
import { Chip, Grid, Icon } from "@mui/material";
import SoftButton from "components/SoftButton";
// import partnersTableData from "./data/partnersTableData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import courtena from "api/courtena";

function Customers() {
  const [customers,setCustomers] = useState()
  // const { columns, rows } = partnersTableData;
  // const { columns: prCols, rows: prRows } = projectsTableData;
  let navigate = useNavigate();
  const partnersTableData = {
    columns: [
      { name: "name", align: "center" },
      { name: "phone", align: "center" },
      { name: "email", align: "center" },
      { name: "country", align: "center" },
      { name: "city", align: "center" },
    ],
  };
const { columns } = partnersTableData;
  const getCustomers = async() => {
    var partnerInfoString = localStorage.getItem("admin")
    var partnerInfo = JSON.parse(partnerInfoString)
    await courtena.get("/admin/get-customers",{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Authorization': partnerInfo.token
    }
    }).then((res) => {
      console.log(res.data)
      let newCustomers = []
        res.data.result.map((item) => {
          newCustomers.push({
            name:(<Chip label={item.username}/>),
            phone:(<Chip label={item.phone}/>),
            email:(<Chip label={item.email}/>),
            country:(<Chip label={item.country}/>),
            city:(<Chip label={item.city}/>),
        })
        })
        setCustomers(newCustomers)
      
    }).catch((err) => {

    })
  }
  useEffect(() => {
    getCustomers()
  },[])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card> 
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <Grid item xs={6} md={6}>
                    <SoftTypography variant="h6">Customers Data</SoftTypography>
                </Grid>
              {/* <Grid item xs={6} md={6}>
                <SoftButton onClick={() => navigate("/partners/add-partners")} variant="gradient" color="dark">
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Add Partner
                </SoftButton>
                </Grid> */}
            </SoftBox>

            <SoftBox
              sx={{
                "& .MuiTableRow-root:not(:last-child)": {
                  "& td": {
                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                      `${borderWidth[1]} solid ${borderColor}`,
                  },
                },
              }}
            >
              <Table columns={columns} rows={customers} />
            </SoftBox>
          </Card>
        </SoftBox>
        
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Customers;
