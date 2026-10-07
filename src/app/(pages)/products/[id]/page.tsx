import ProductDetailsView from "@/components/product-details-view";
import getProductDetails from "@/services/getProductDetalis.service";
import { ProductDetailsType } from "@/types/productDetails.types";
import { notFound } from "next/navigation";

type ProductDetailsPageProps = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { id } = await params;
  const response = await getProductDetails(id);
  const product: ProductDetailsType = response?.data;

  if (!product) {
    notFound();
  }

  return <ProductDetailsView product={product} />;
}
