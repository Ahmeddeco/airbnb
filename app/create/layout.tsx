export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="mt-10">{children}</section>;
}