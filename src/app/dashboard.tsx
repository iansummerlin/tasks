import { Page } from "@/components/page";

export default function Dashboard() {
  return (
    <Page>
      <div className="flex flex-1 flex-col gap-4 px-4 pb-4">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
          <div className="aspect-video rounded-xl bg-muted/50" />
        </div>
        <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
      </div>
    </Page>
  );
}
