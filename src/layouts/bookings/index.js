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
import partnersTableData from "layouts/partners/data/partnersTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import { Chip, Grid, Icon } from "@mui/material";
import SoftButton from "components/SoftButton";
// import partnersTableData from "./data/partnersTableData";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import courtena from "api/courtena";

function Bookings() {
  const [bookings,setBookings] = useState()
  // const { columns, rows } = partnersTableData;
  // const { columns: prCols, rows: prRows } = projectsTableData;
  let navigate = useNavigate();
  const partnersTableData = {
    columns: [
      { name: "partner", align: "center" },
      { name: "customer", align: "center" },
      { name: "venue", align: "center" },
      { name: "court", align: "center" },
      { name: "duration", align: "center" },
      { name: "date", align: "center" },
      { name: "payment", align: "center" },
      { name: "payment_status", align: "center" },
    ],
  };
  const { columns } = partnersTableData;
  const getBookings = async() => {
    var partnerInfoString = localStorage.getItem("admin")
    var partnerInfo = JSON.parse(partnerInfoString)
    await courtena.get("/admin/get-bookings",{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Authorization': partnerInfo.token
    }
    }).then((res) => {
      console.log(res.data)
      let newBookings = []
        res.data.result.map((item) => {
          newBookings.push({
            partner:((
              <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
                <SoftBox display="flex" flexDirection="column">
                  <SoftTypography variant="button" fontWeight="medium">
                    {item.partner.username}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="secondary">
                    {item.partner.email}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="secondary">
                    {item.partner.phone}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            )),
            customer:((
              <SoftBox display="flex" alignItems="center" px={1} py={0.5}>
                <SoftBox display="flex" flexDirection="column">
                  <SoftTypography variant="button" fontWeight="medium">
                    {item.customer.username}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="secondary">
                    {item.customer.email}
                  </SoftTypography>
                  <SoftTypography variant="caption" color="secondary">
                    {item.customer.phone}
                  </SoftTypography>
                </SoftBox>
              </SoftBox>
            )),
            venue:(<Chip label={item.venue.name}/>),
            court:(<Chip label={item.court.title}/>),
            duration:(<Chip label={item.booking.duration}/>),
            date:(<Chip label={item.booking.date}/>),
            payment:(<Chip label={item.booking.paymentAmount + "SAR"}/>),
            payment_status:(<Chip label={item.booking.paymentStatus}/>),
        })
        })
        setBookings(newBookings)
    }).catch((err) => {

    })
  }
  useEffect(() => {
    getBookings()
  },[])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card> 
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <Grid item xs={6} md={6}>
                    <SoftTypography variant="h6">Bookings Data</SoftTypography>
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
              <Table columns={columns} rows={bookings} />
            </SoftBox>
          </Card>
        </SoftBox>
        
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Bookings;
