import BlockEditor from "./components/BlockEditor";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex justify-center items-start p-10">
      <div className="w-full max-w-5xl">
        <BlockEditor />
      </div>
    </div>
  );
}
