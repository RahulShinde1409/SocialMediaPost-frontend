import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllApprovedPosts } from "../../store/action/createpost.action";
import Header from "./Header";

export default function OtherPost() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.posts);

  const {user} = useSelector(state=>state.login)
  console.log(user)




  useEffect(() => {
    dispatch(getAllApprovedPosts("approved")); 
  }, [dispatch]);

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const posts = Array.isArray(items)
    ? items.filter((post) => post.author?._id !== user._id)
    : [];


  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#eff6e0] py-14 px-6">
        <h2 className="text-2xl font-bold text-center mb-6 mt-18 sm:mt-14">
          All Other User's Approved Posts
        </h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No approved posts found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300"
              >

               {post.images?.length > 0 && (
  <div className="relative">
    <img
      src={post.images[0]}  // ✅ Direct Cloudinary URL
      alt={post.title}
      className="w-full h-60 object-cover"
      onError={(e) => { e.target.src = "/fallback.jpg"; }} // optional fallback
    />
    <span
      className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${
        post.status === "approved"
          ? "bg-green-500 text-green-700"
          : post.status === "pending"
          ? "bg-yellow-400 text-yellow-700"
          : "bg-red-500 text-red-700"
      }`}
    >
      {post.status}
    </span>
  </div>
)}


                <h3 className="text-[22px] font-semibold mb-2 text-gray-800 p-3">
                  {post.title}
                </h3>


                <p className="text-gray-600 text-[18px] p-3 truncate">
                  {post.description}
                </p>


                <div className="flex justify-between items-center mt-4 p-3">
                  <span className="text-xs text-gray-500">
                     <p className="text-gray-600 text-sm pb-2">
                  Posted by : <span className="font-semibold">{post.author?.name}</span>
                </p>
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
