import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllApprovedPosts,approvePost,rejectPost } from "../../store/action/createpost.action";

export default function AdminPosts() {
  const dispatch = useDispatch();
  const { items = [], loading } = useSelector((state) => state.posts);
  const pendingPosts = items.filter(post => post.status === "pending");
  console.log(items)

 useEffect(() => {
  dispatch(getAllApprovedPosts("pending"));

  const interval = setInterval(() => {
    dispatch(getAllApprovedPosts("pending"));
  }, 5000); // every 5 seconds

  return () => clearInterval(interval);
}, [dispatch]);

//  const handleApprove = (id) => {
//     // console.log("kjdskljsklskdjldskj")
//   dispatch(approvePost(id));
// };

const handleApprove = (id) => {
  dispatch(approvePost(id)).then(() => {
    dispatch(getAllApprovedPosts("pending"));
  });
};

// const handleReject = (id) => {
//   dispatch(rejectPost(id));
// };
const handleReject = (id) => {
  dispatch(rejectPost(id)).then(() => {
    dispatch(getAllApprovedPosts("pending"));
  });
};

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <div className="flex justify-between items-center mb-4">
  <h2 className="text-2xl font-bold">Manage Posts</h2>

  {pendingPosts.length > 0 && (
    <div className="bg-red-500 text-white px-4 py-2 rounded-full">
      🔔 {pendingPosts.length} New Post
      {pendingPosts.length > 1 ? "s" : ""}
    </div>
  )}
</div>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage Posts</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-300">
            <th className="p-2">Title</th>
            <th className="p-2">Author</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((post) => (
            <tr key={post._id}>
              <td className="p-2 text-center">{post.title}</td>
              <td className="p-2 text-center">{post.author?.name}</td>
              <td className="p-2 text-center">{post.status}</td>
              <td className="p-2 flex gap-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => handleApprove(post._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleReject(post._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </>
  );
}
