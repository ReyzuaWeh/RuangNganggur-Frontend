import { RoleType } from "@/dataType/khusus";
import Sidebar from "@components/Sidebar";
import SidebarEmployer from "@components/SidebarEmployer";
import React from "react";

const DashboardLayout = ({ children, role }: { children: React.ReactNode, role: RoleType }) => {
    return (
        <div className="flex">
            {role === "jobseeker" ? <Sidebar /> : <SidebarEmployer />}
            <section className="py-8 px-7 w-full h-screen relative">{children}</section>
        </div>
    );
};

export default DashboardLayout;
