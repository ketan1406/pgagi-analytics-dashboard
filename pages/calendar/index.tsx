import { Metadata } from "next";
import Layout from "../../components/Layouts/Layout";
import Breadcrumb from "../../components/Breadcrumbs";
import CalendarBox from "../../components/Calendar/CalendarBox";

export const metadata: Metadata = {
  title: "Next.js Calender Page | NextAdmin - Next.js Dashboard Kit",
  description:
    "This is Next.js Calender page for NextAdmin  Tailwind CSS Admin Dashboard Kit",
  // other metadata
};

const CalendarPage = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Calendar" />

        <CalendarBox />
      </div>
    </Layout>
  );
};

export default CalendarPage;
