import "../resources/css/dashboard-view.css";

import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from "react-redux";

import {setRelocation} from "../redux/dashboardUISlice";
import {setBlockData} from "../redux/blockDataSlice";

import {getBlockId, getBlockData, getStatusData, getGatewayData} from "./MockAPI";
import BlockLights from "./BlockLights";
import ActiveLights from "./ActiveLights";
import EnergyConsumption from "./EnergyConsumption";
import LightControl from "./LightControl";
import ActivityLog from "./ActivityLog";
import GatewayInfo from "./GatewayInfo";
import LightStatus from "./LightStatus";
import Relocation from "./Relocation";

import ExportButton from "../resources/view/view-export.svg";
import Map from "../resources/dashboard/map-sg.png";

function DashboardView(props)
{
    const dispatch = useDispatch();
    const locationData = useSelector((state) => state.locationData.value);
    const blockData = useSelector((state) => state.blockData.value);
    const location = useSelector((state) => state.selectedLocation.value);
    const area = useSelector((state) => state.selectedArea.value);
    const block = useSelector((state) => state.selectedBlock.value);
    const relocation = useSelector((state) => state.relocation.value);

    // store data used in cards
    const [gatewayData, setGatewayData] = useState(null);
    const [statusData, setStatusData] = useState(null);

    // current light relocation data
    const [currName, setCurrName] = useState("");
    const [currLocation, setCurrLocation] = useState("");

    useEffect(() =>
    {
        // simulate getting data
        if (area && block && locationData)
        {
            let id = getBlockId(area, block, locationData);

            getBlockData(id)
            .then((res) => {
                dispatch(setBlockData(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
        }

        setGatewayData(getGatewayData());
        setStatusData(getStatusData());
    }, [dispatch, area, block, locationData]);

    // relocation pop-up handling
    function handleRelocationClick(name, location)
    {
        // toggle popup, update current selected light
        dispatch(setRelocation(!relocation));
        setCurrName(name);
        setCurrLocation(location);
    }

    // editing data
    function relocate(name, location)
    {
        let updatedArray = statusData.map(light =>
            {
                if (light.name === name)
                    return {...light, location: location};

                return light;
            });

        // modify data specific to status card for now
        setStatusData(updatedArray);
    }

    // export button (placeholder for now)
    function handleExportClick()
    {
        console.log("clicked export");
    }

    return(
        <div>
            {block ?
                <div className="view-page">
                    {/* cards */}
                    {blockData && <BlockLights />}
                    {blockData && <ActiveLights />}
                    {blockData && <EnergyConsumption />}
                    {blockData && <LightControl />}
                    {blockData && <ActivityLog />}
                    {gatewayData &&
                    <GatewayInfo
                        data={gatewayData}
                        location = {location}
                        area = {area}
                        block = {block} 
                    />}
                    {statusData &&
                    <LightStatus
                        data={statusData}
                        location = {location}
                        area = {area}
                        block = {block}
                        relocation = {handleRelocationClick}
                    />}
                    {/* relocation popup - placed below due to css issues */}
                    {relocation && 
                        <Relocation
                            relocate={relocate}
                            name={currName}
                            location={currLocation}
                        />
                    }
                    {/* export button */}
                    <img 
                        alt="" 
                        src={ExportButton} 
                        className="export-btn"
                        onClick={handleExportClick}
                    ></img>
                </div> :
                <div>{location && <img alt="" src={Map} className="map"></img>}</div>
            }
        </div>

    );
}

export default DashboardView;