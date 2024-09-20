import PostCreate from "@/components/PostCreate";

// 19. React Project Setup
// 20. Building Post Submission

export default function Home() {
  return (
    <div className={"flex flex-col gap-7 p-10"}>
      <h1 className={"text-3xl"}>Create post</h1>
      <PostCreate />
    </div>
  );
}
