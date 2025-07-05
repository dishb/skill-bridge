export default interface DynamicPageProps {
  params: Promise<{ id: string }>;
}
