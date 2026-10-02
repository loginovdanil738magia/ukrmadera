import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import AbreraPage from "@/components/products/AbreraPage";

export const metadata: Metadata = {
  title: "Casa de madera ABRERA | UkrMadera",
  description: "Casa de madera ABRERA de 4 dormitorios. Consulta el modelo y solicita información a UkrMadera.",
};

export default function AbreraProductPage() {
  return (
    <main>
      <Header />
      <AbreraPage />
    </main>
  );
}
