import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Index = () => {
  return (
    <AuthenticatedLayout>
      <Head title="Projects" />
      Projects
    </AuthenticatedLayout>
  );
};

export default Index;
