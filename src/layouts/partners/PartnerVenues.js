/* eslint-disable react/prop-types */
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

import { Avatar, Backdrop, Chip, CircularProgress, Grid, Icon } from "@mui/material";
import SoftButton from "components/SoftButton";
// import partnersTableData from "./data/partnersTableData";
import { useNavigate,useLocation } from "react-router-dom";
import { useEffect,useState } from "react";
import courtena from "api/courtena";
import SoftAvatar from "components/SoftAvatar";
import SoftBadge from "components/SoftBadge";
import { DeleteForeverOutlined, EditOutlined,ViewAgenda,EyeArrowLeft, Visibility } from "@mui/icons-material";
import { red } from "@mui/material/colors";
function PartnerVenues() {
    const [sports,setSports] = useState([])
    const [backdrop,setBackdrop] = useState(false)
    let navigate = useNavigate();
    let location = useLocation();
    const partnersTableData = {
        columns: [
          { name: "name", align: "center" },
          { name: "city", align: "center" },
          { name: "phone", align: "center" },
          // { name: "action", align: "center" },
        ],
      };
  const { columns } = partnersTableData;

      async function getSports (){
        var partnerInfoString = localStorage.getItem("admin")
        var partnerInfo = JSON.parse(partnerInfoString)
        setBackdrop(true)
        // const data = {name:name,city:city,address:address,description:description,cheapestPrice:price,venuePhone:contactNum,postalCode:1234,amenities:{cafeteria:cafeteria,changeRoom:changingRoom,disabledAccess:disabledAccess,freeParking:freeParking,lockers:lockers,materialRenting:materialRenting,privateParking:privateParking,restaurant:restaurant,snackbar:snackbar,store:store,vendingMachine:vendingMachine,wifi:wifi},timing:{mondayOn:mondayOpen,mondayFrom:mondayFrom,mondayTo:mondayTo,tuesdayOn:tuesdayOpen,tuesdayFrom:tuesdayFrom,tuesdayTo:tuesdayTo,wedOn:wednesdayOpen,wedFrom:wedFrom,wedTo:wedTo,thursdayOn:thursdayOpen,thursdayFrom:thursdayFrom,thursdayTo:thursdayTo,fridayOn:fridayOpen,fridayFrom:friFrom,fridayTo:friTo,satOn:saturdayOpen,satFrom:satFrom,satTo:satTo,sunOn:sundayOpen,sunFrom:sunFrom,sunTo:sunTo,holidayOn:holidayOpen,holidayFrom:holidayFrom,holidayTo:holidayTo},partner:partnerInfo._id}
        await courtena.get("/users/admin/partner/"+location.state.partnerId+"/venues",{
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': '*/*',
            'Authorization': partnerInfo.token
        }
        }).then((response) => {
          console.log(response.data)
          if(response.data.success){
            
            let newSports = []
            if(response.data.result){
            response.data.result.map((item) => {
                console.log(item._id)
                newSports.push({
                    name:(<Chip label={item.name}/>),
                    city:(<Chip label={item.city}/>),
                    phone:(<Chip label={item.venuePhone}/>),
                    details:(<Grid item xs={6} md={6} lg={6}>
                      <SoftTypography
                        component="a"
                        variant="caption"
                        color="secondary"
                        fontWeight="medium"
                          onClick={() => {navigate("/partners/partner-details",{state:{partnerId:item._id}})}}
                      >
                        <ViewAgenda fontSize="medium" color="secondary"/>
                      </SoftTypography></Grid>),
                    action: (
                        <SoftBox>
                            <Grid container spacing={2}>
                                <Grid item xs={6} md={6} lg={6}>
                            <SoftTypography
                          component="a"
                          variant="caption"
                          color="secondary"
                          fontWeight="medium"
                            onClick={async() => {
                                setBackdrop(true)
                                await courtena.delete("/users/partner/"+item._id+"/delete/",{
                                    headers: {
                                      'Content-Type': 'application/x-www-form-urlencoded',
                                      'Accept': '*/*',
                                      'Authorization': partnerInfo.token
                                  }
                                  }).then((response) => {
                                    console.log(response.data)
                                        if(response.data.success){
                                            setBackdrop(false)
                                            getSports()
                                        }else{
                                            setBackdrop(false)
                                        }
                                  }).catch((err) => {
                                    console.log(err)
                                  })
                            }}
                        >
                          <Visibility fontSize="medium" sx={{ color: '' }}/>
                        </SoftTypography></Grid>
                        {/* <Grid item xs={6} md={6} lg={6}>
                        <SoftTypography
                          component="a"
                          variant="caption"
                          color="secondary"
                          fontWeight="medium"
                            onClick={() => {navigate("/sports/edit-sport",{state:{sportId:item._id}})}}
                        >
                          <EditOutlined fontSize="medium" color="secondary"/>
                        </SoftTypography></Grid> */}
                        </Grid>
                        </SoftBox>
                        
                      ),
                })
            })}
            setSports(newSports)
            setBackdrop(false)
            
          }else{
            setBackdrop(false)
            setError(true)
            setErrorMessage(response.data.message)
          }
          
        }).catch(err => console.log(err));
      }
  useEffect( () => {
    console.log(location.state.partnerId)
    getSports()
    // return
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card> 
            <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                <Grid item xs={6} md={6}>
                    <SoftTypography variant="h6">Partner Venues Data</SoftTypography>
                </Grid>
              {/* <Grid item xs={6} md={6}>
                <SoftButton onClick={() => navigate("/partners/add-partner")} variant="gradient" color="dark">
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
              <Table columns={columns} rows={sports} />
              
            </SoftBox>
          </Card>
        </SoftBox>
        <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}>
        <CircularProgress color="inherit" />
        </Backdrop>
      </SoftBox>
      
      <Footer />
    </DashboardLayout>
  );
}

export default PartnerVenues;
