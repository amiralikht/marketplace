import { useQuery } from "@tanstack/react-query";
import Main from "../components/templates/Main"
import SideBar from "../components/templates/SideBar"
import { getAllPosts } from "../services/user";
import Loader from "../components/modules/loader";
import { getCategory } from "../services/admin";


function HomePage() {
  const {data:posts, isLoading: postLoading} = useQuery({queryKey:["post-list"], queryFn: getAllPosts});
  const { data:categories, isLoading: categoriesLoading } = useQuery({queryKey:["get-categories"], queryFn:getCategory});


  return (
    <>
      {postLoading || categoriesLoading ? <Loader/>
      :(
        <div className="flex w-full h-full">
          <SideBar categories={categories}/>
          <Main posts={posts}/>
        </div>
      )}
    </>
  )
}

export default HomePage