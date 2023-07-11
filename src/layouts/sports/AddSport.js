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
import React from "react";
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
// import partnersTableData from "layouts/tables/data/partnersTableData";

import { Backdrop, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, Grid, Icon, InputLabel, MenuItem, Select, Switch,  } from "@mui/material";
import SoftButton from "components/SoftButton";

import { useNavigate } from "react-router-dom";
import SoftInput from "components/SoftInput";
import { useEffect, useState } from "react";
import { Dropzone, FileMosaic} from "@dropzone-ui/react"
import courtena from "api/courtena";
// import OpeningHours from "./components/OpeningHours";
import "../../global.css"
import { ArrowDropDown } from "@mui/icons-material";
function AddSport() {
  const [name,setName] = useState("")
  const [backdrop,setBackdrop] = useState(false)
  let navigate = useNavigate();

  useEffect(() => {
    var partnerInfoString = localStorage.getItem("admin")
    var partnerInfo = JSON.parse(partnerInfoString)
    
  },[])
  const handleSubmit = async (e) => {
    var partnerInfoString = localStorage.getItem("admin")
    var partnerInfo = JSON.parse(partnerInfoString)
    console.log(partnerInfo)
    setBackdrop(true)
    const data = {name:name}
    await courtena.post("/sports/create/",{...data},{
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': '*/*',
        'Authorization': partnerInfo.token
    }
    }).then((response) => {
      console.log(response.data)
      if(response.data.success){
        setBackdrop(false)
        setSuccess(true)
        setSuccessMessage(response.data.message)
      }else{
        setBackdrop(false)
        setError(true)
        setErrorMessage(response.data.message)
      }
      
    }).catch(err => console.log(err.message));

  }

  


  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card> 
          <SoftBox p={3} mb={1} textAlign="center">
          <SoftTypography variant="h5" fontWeight="medium">
            Sport Info
          </SoftTypography>
        </SoftBox>
        {/* <SoftBox mb={2}>
          <Socials />
        </SoftBox>
        <Separator /> */}
        <SoftBox pt={2} pb={3} px={3}>
          <SoftBox component="form" role="form">
          {/* {error ? <SoftAlert color="error" dismissible onClick={() => setError(false)} > {errorMessage}</SoftAlert> : null} */}
          {/* {success ? <SoftAlert color="success" dismissible onClick={() => setSuccess(false)} > {successMessage}</SoftAlert> : null} */}
          <Grid container spacing={2}>
                <Grid item xs={12} md={6} xl={4}>
                <SoftBox mb={2}>
                    <SoftInput name="name" value={name}  onChange={(val) => setName(val.target.value)} type="text" placeholder="Name" />
                </SoftBox>
                </Grid>
          </Grid>
          
            <SoftBox mt={4} mb={1}>
              <SoftButton onClick={() => handleSubmit()} variant="gradient" color="dark" >
                Save
              </SoftButton>
            </SoftBox>

          </SoftBox>
          <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdrop}>
        <CircularProgress color="inherit" />
        </Backdrop>
        </SoftBox>
          </Card>
        </SoftBox>
        
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default AddSport;
