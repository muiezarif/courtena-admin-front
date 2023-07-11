

import { useState, useEffect, useMemo } from "react";
// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";

// Soft UI Dashboard React base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import BuildByDevelopers from "layouts/dashboard/components/BuildByDevelopers";
import WorkWithTheRockets from "layouts/dashboard/components/WorkWithTheRockets";
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
// Soft UI Dashboard React contexts
import { useSoftUIController, setMiniSidenav, setOpenConfigurator } from "context";
import routes from "routes";
// Images
import brand from "assets/images/courtena-logo-black-nobg.png";
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";
import { useNavigate,useLocation } from "react-router-dom";
function ViewPartnerDetails() {
  const { size } = typography;
  const { chart, items } = reportsBarChartData;
  const [controller, dispatch] = useSoftUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  let navigate = useNavigate();
  let location = useLocation()
  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };
  useEffect(() => {
    console.log(location.state.partnerId)
  },[])
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);
  const configsButton = (
    <SoftBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.5rem"
      height="3.5rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="default" color="inherit">
        settings
      </Icon>
    </SoftBox>
  );
  return (
    <DashboardLayout>
     
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Grid container spacing={3}>
            <Grid className="cursor-pointer" onClick={() => {navigate("/partners/partner-details/subscription",{state:{partnerId:location.state.partnerId}})}} item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Subscription" }}
                icon={{ color: "info", component: "card_membership" }}
                
              />
            </Grid>
            <Grid className="cursor-pointer" onClick={() => {navigate("/partners/partner-details/venues",{state:{partnerId:location.state.partnerId}})}} item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Venue" }}
                icon={{ color: "info", component: "business" }}
                
              />
            </Grid>
            <Grid className="cursor-pointer" onClick={() => {navigate("/partners/partner-details/courts",{state:{partnerId:location.state.partnerId}})}} item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Courts" }}
                count=""
                percentage={{ color: "", text: "" }}
                icon={{ color: "info", component: "sports_tennis" }}
                
              />
            </Grid>
            <Grid className="cursor-pointer" onClick={() => {navigate("/partners/partner-details/bookings",{state:{partnerId:location.state.partnerId}})}} item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Bookings" }}
                count=""
                percentage={{ color: "", text: "" }}
                icon={{ color: "info", component: "book_online" }}
                
              />
            </Grid>
            <Grid className="cursor-pointer" onClick={() => {navigate("/partners/partner-details/pricing",{state:{partnerId:location.state.partnerId}})}} item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Pricing" }}
                count=""
                percentage={{ color: "", text: "" }}
                icon={{ color: "info", component: "price_change" }}
                
              />
            </Grid>
            <Grid className="cursor-pointer" onClick={() => {navigate("/partners/partner-details/settlements",{state:{partnerId:location.state.partnerId}})}} item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Settlements" }}
                count=""
                percentage={{ color: "", text: "" }}
                icon={{ color: "info", component: "request_quote" }}
                
              />
            </Grid>
            <Grid className="cursor-pointer" onClick={() => {navigate("/partners/partner-details/customer-feedbacks",{state:{partnerId:location.state.partnerId}})}} item xs={12} sm={6} xl={3}>
              <MiniStatisticsCard
                title={{ text: "Customer Feedback" }}
                count=""
                percentage={{ color: "", text: "" }}
                icon={{ color: "info", component: "feedback" }}
                
              />
            </Grid>

          </Grid>
        </SoftBox>
      </SoftBox>
      <Footer />
    </DashboardLayout>
  );
}

export default ViewPartnerDetails;
