import "../resources/css/dashboardview.css";

import React, {useEffect} from "react";

import ExportButton from "../resources/view/view-export.svg";
import Map from "../resources/dashboard/map-sg.png";

import BlockLights from "./BlockLights";
import ActiveLights from "./ActiveLights";
import EnergyConsumption from "./EnergyConsumption";
import LightControl from "./LightControl";
import ActivityLog from "./ActivityLog";
import GatewayInfo from "./GatewayInfo";
import LightStatus from "./LightStatus";

function DashboardView(props)
{
    useEffect(() =>
    {
        // simulate getting data

    }, []);

    function handleExportClick()
    {
        console.log("clicked export");
    }

    return(
        <div>
            {props.block ?
                <div className = "view-page">
                    {/* cards */}
                    <BlockLights    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <ActiveLights    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <EnergyConsumption    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <LightControl    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <ActivityLog    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <GatewayInfo    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    <LightStatus    
                        location = {props.location}
                        area = {props.area}
                        block = {props.block} 
                    />
                    {/* export button */}
                    <img 
                        alt = "" 
                        src = {ExportButton} 
                        className = "export-btn"
                        onClick = {handleExportClick}
                    ></img>
                </div> :
                <div>
                    {props.location && <img alt = "" src = {Map} className = "map"></img>}
                </div>
            }
        </div>

    );
}

export default DashboardView;