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
import { DeleteForeverOutlined, EditOutlined,ViewAgenda,EyeArrowLeft } from "@mui/icons-material";
import { red } from "@mui/material/colors";
import Bill from "layouts/billing/components/Bill";
import CustomBill from "layouts/billing/components/Bill/CustomBill";
function PartnerSubscription() {
    const [sports,setSports] = useState([])
    const [partnerSub,setPartnerSub] = useState({})
    const [partnerInfo,setPartnerInfo] = useState({})
    const [subscriptionType,setSubscriptionType] = useState({})
    const [backdrop,setBackdrop] = useState(false)
    let navigate = useNavigate();
    let location = useLocation();
    const partnersTableData = {
        columns: [
          { name: "name", align: "center" },
          { name: "email", align: "center" },
          { name: "details", align: "center" },
          { name: "action", align: "center" },
        ],
      };
  const { columns } = partnersTableData;

      async function getSports (){
        var partnerInfoString = localStorage.getItem("admin")
        var partnerInfo = JSON.parse(partnerInfoString)
        setBackdrop(true)
        // const data = {name:name,city:city,address:address,description:description,cheapestPrice:price,venuePhone:contactNum,postalCode:1234,amenities:{cafeteria:cafeteria,changeRoom:changingRoom,disabledAccess:disabledAccess,freeParking:freeParking,lockers:lockers,materialRenting:materialRenting,privateParking:privateParking,restaurant:restaurant,snackbar:snackbar,store:store,vendingMachine:vendingMachine,wifi:wifi},timing:{mondayOn:mondayOpen,mondayFrom:mondayFrom,mondayTo:mondayTo,tuesdayOn:tuesdayOpen,tuesdayFrom:tuesdayFrom,tuesdayTo:tuesdayTo,wedOn:wednesdayOpen,wedFrom:wedFrom,wedTo:wedTo,thursdayOn:thursdayOpen,thursdayFrom:thursdayFrom,thursdayTo:thursdayTo,fridayOn:fridayOpen,fridayFrom:friFrom,fridayTo:friTo,satOn:saturdayOpen,satFrom:satFrom,satTo:satTo,sunOn:sundayOpen,sunFrom:sunFrom,sunTo:sunTo,holidayOn:holidayOpen,holidayFrom:holidayFrom,holidayTo:holidayTo},partner:partnerInfo._id}
        await courtena.get("/partner/subscription/get-partner-subscription-info/"+location.state.partnerId,{
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
              setPartnerSub(response.data.result.partnerSubscription)
              setPartnerInfo(response.data.result.partner)
              setSubscriptionType(response.data.result.subscriptionType)

          }
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
    getSports()

  },[])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          {/* <Card>  */}
            {/* <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}> */}
                {/* <Grid item xs={6} md={6}>
                    <SoftTypography variant="h6">Partner Subscription</SoftTypography>
                </Grid> */}
              {/* <Grid item xs={6} md={6}>
                <SoftButton onClick={() => navigate("/partners/add-partner")} variant="gradient" color="dark">
                <Icon sx={{ fontWeight: "bold" }}>add</Icon>
                &nbsp;Add Partner
                </SoftButton>
                </Grid> */}
            {/* </SoftBox> */}

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
              <SoftBox
        component="li"
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
        bgColor="grey-100"
        borderRadius="lg"
        p={3}
        mt={2}
      >
        <SoftBox width="100%" display="flex" flexDirection="column">
          <SoftBox
            display="flex"
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
            flexDirection={{ xs: "column", sm: "row" }}
            mb={2}
          >
            <SoftTypography variant="button" fontWeight="medium" textTransform="capitalize">
              {partnerInfo.username ? partnerInfo.username : null}
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} lineHeight={0}>
            <SoftTypography variant="caption" color="text">
              Subscription Name:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium" textTransform="capitalize">
                {subscriptionType.name}
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} lineHeight={0}>
            <SoftTypography variant="caption" color="text">
              Subscription Price:&nbsp;&nbsp;&nbsp;
              <SoftTypography variant="caption" fontWeight="medium">
                {subscriptionType.price}
              </SoftTypography>
            </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Subscription Tier:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {subscriptionType.tier}
            </SoftTypography>
          </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Created at:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
              {new Date(partnerSub.createdAt).toLocaleString('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})}
              {/* {new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(partnerSub.createdAt)} */}
            </SoftTypography>
          </SoftTypography>
          </SoftBox>
          <SoftBox mb={1} lineHeight={0}>
          <SoftTypography variant="caption" color="text">
            Updated at:&nbsp;&nbsp;&nbsp;
            <SoftTypography variant="caption" fontWeight="medium">
            {new Date(partnerSub.updatedAt).toLocaleString('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'})}
            </SoftTypography>
          </SoftTypography>
          </SoftBox>
        </SoftBox>
      </SoftBox>
              {/* <CustomBill
              name={partnerInfo.username}
              company="viking burrito"
              email="oliver@burrito.com"
              vat="FRB1235476"/> */}
              
            </SoftBox>
          {/* </Card> */}
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

export default PartnerSubscription;
