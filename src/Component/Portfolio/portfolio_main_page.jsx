import React from "react";
import OverviewCard from "./overviewcard";
import Navbar from "../navbar/navbar";
import Chart from "../Charts/chart";
import TradingViewWidget from "../Charts/tempchart"

export default function Portfolio_Main_Page() {

    return (
        <>
            <Navbar />
            <div class="flex flex-row">
                <div class="basis-1/2">
                    <OverviewCard />
                </div>

                <div class="basis-1/2">
                    <TradingViewWidget />
                </div>
                
            </div>




        </>


    );
}