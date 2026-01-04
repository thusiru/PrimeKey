import React from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import DOMPurify from "dompurify";

const PropertyTabs = ({ property }) => {
  return (
    <div className="details-tabs">
      <Tabs>
        <TabList>
          <Tab>Description</Tab>
          <Tab>Floor Plan</Tab>
          <Tab>Map</Tab>
        </TabList>

        <TabPanel>
          <div className="tab-content">
            <h3>Property Description</h3>
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(property.description),
              }}
            />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content">
            <h3>Floor Plan</h3>
            <img
              src={property.floorPlan}
              alt="Floor Plan"
              className="floor-plan-img"
            />
          </div>
        </TabPanel>

        <TabPanel>
          <div className="tab-content">
            <h3>Location</h3>
            <iframe
              src={property.mapUrl}
              className="map-frame"
              allowFullScreen=""
              loading="lazy"
              title="Google Map"
            ></iframe>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default PropertyTabs;
