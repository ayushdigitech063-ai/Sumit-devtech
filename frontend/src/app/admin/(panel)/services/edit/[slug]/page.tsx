import ServiceFormPage from "../../ServiceForm";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function EditServicePage({ params }: Props) {
  const { slug } = await params;
  return <ServiceFormPage editSlug={slug} />;
}
