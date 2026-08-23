import PostDetails from "@/components/postdetails";

export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
 
  const {id} = await params

  return <PostDetails id={ id }/>
}

