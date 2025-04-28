/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import Heading from "../Components/Heading";
import AdminPannel from "../Components/AdminPannel";
import UserList from "../Components/UserList";
<<<<<<< HEAD
import AdminResources from "../Components/AdminResources";

=======
import ConsultantList from "../Components/ConsultantList"
import AdminResources from "../Components/AdminResources"
>>>>>>> 035e236ac20b86d82f2293e0a3d55dc583f2c5de
const Admin = () => {
  const [selectedItem, setSelectedItem] = useState("Dashboard");

  const renderContent = () => {
    switch (selectedItem) {
      case "Users":
        return <div><UserList/></div>
      case "Consultants":
<<<<<<< HEAD
        return <div>Consultants management tools.</div>;
=======
        return <div><ConsultantList/></div>;
>>>>>>> 035e236ac20b86d82f2293e0a3d55dc583f2c5de
      case "Appointment Booking":
        return <div>Appointments list and booking management.</div>;
      case "Manage Resources":
        return <div><AdminResources/></div>;
      case "View Reviews":
        return <div>User reviews and comments overview.</div>;
      case "Helpline Messages":
        return <div>Messages sent through helpline appear here.</div>;
      default:
        return <div>Welcome to the admin dashboard! Select an option from the menu.</div>;
    }
  };

  return (
    <>
      <Heading Headline={"Welcome to Admin Dashboard"} pagename={"Admin"} />
      <div className="mx-auto flex">
        <AdminPannel setSelectedItem={setSelectedItem} />
        <div className="p-6 w-full">
          <h1 className="text-3xl font-bold mb-6 text-blue-700">
            {selectedItem}
          </h1>
          <div className="bg-white p-4 rounded shadow">{renderContent()}</div>
        </div>
      </div>
    </>
  );
};

export default Admin;