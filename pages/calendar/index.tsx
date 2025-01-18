import { Metadata } from "next";
import Layout from "../../components/Layouts/Layout";
import Breadcrumb from "../../components/Breadcrumbs";
import CalendarBox from "../../components/Calendar/CalendarBox";

export const metadata: Metadata = {
  title: "PgAGI Dashboard",
  description:
    "This is Dashboard page for PgAGI ",
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
