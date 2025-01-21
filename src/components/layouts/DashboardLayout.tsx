import { RoleType } from "@/dataType/khusus";
import SidebarJobseeker from "@components/Sidebar";
import SidebarEmployer from "@components/SidebarEmployer";
import React from "react";

const DashboardLayout = ({ children, role }: { children: React.ReactNode, role: RoleType }) => {
    return (
        <div className="flex h-fit">
            {role === "jobseeker" ? <SidebarJobseeker /> : <SidebarEmployer />}
            <section className="py-8 px-7 w-full min-h-screen relative">{children}</section>
        </div>
    );
};

export default DashboardLayout;
