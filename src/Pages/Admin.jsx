import React, { useState } from "react";
import { CheckCircle, X, Eye } from "lucide-react";
import consultant1 from "../assets/consultant_img/consultant1.jpg";
import consultant2 from "../assets/consultant_img/consultant2.jpg";
import Heading from "../Components/Heading";
import AdminPannel from "../Components/AdminPannel";




const Admin = () => {
  

  return (
    <>
    
      <Heading
        Headline={"Welcome to Admin Dashboard"}
        pagename={"Admin Dashboard"}
      />
       <div className="mx-auto flex">
        <AdminPannel/>
        <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-700">
          Dashboard
        </h1></div>
        
        </div>

        
     

      
      
    </>
  );
};

export default Admin;
