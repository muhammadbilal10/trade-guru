import React from "react";

export default function OverviewCard() {

    return (
        <>
            <div className="p-6">

                <div className="bg-gray-50 shadow-md p-6 rounded-lg w-80">
                    <div className="text-lg font-semibold mb-2">Account Summary</div>

                    <div className="mb-2 ">
                        <p className="text-lg text-gray-600">Account Value:</p>
                        <span className="text-black">$55555</span>
                    </div>
                    <div className="mb-2">
                        <p className="text-lg text-gray-600">Today's Profit:</p>
                        <span className="text-green-600">$5555555</span>
                    </div>
                    <div>
                        <p className="text-gray-600">Today's Loss:</p>
                        <span className="text-red-600">$555</span>
                    </div>
                </div>

            </div>


        </>
    );
}