import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Index = () => {
  return (
    <AuthenticatedLayout>
      <Head title="Tasks" />
      Tasks
    </AuthenticatedLayout>
  );
};

export default Index;
