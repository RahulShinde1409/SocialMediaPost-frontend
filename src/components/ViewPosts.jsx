import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserPosts, updatePost, deletePost } from "../../store/action/createpost.action";
import Header from "./Header";

export default function ViewPost() {
  const dispatch = useDispatch();
  const { items: data, loading, error } = useSelector((state) => state.posts);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({ title: "", description: "" });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    dispatch(UserPosts());
  }, [dispatch]);

  const openModal = (post) => {
    setSelectedPost(post);
    setFormData({ title: post.title, description: post.description });
    setSelectedFile(null);
    setModalOpen(true);
  };

  const handleUpdate = () => {
    const dataToSend = new FormData();
    dataToSend.append("title", formData.title);
    dataToSend.append("description", formData.description);
    if (selectedFile) {
      dataToSend.append("images", selectedFile);
    }

    dispatch(updatePost({ id: selectedPost._id, formData: dataToSend }));
    setModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      dispatch(deletePost(id));
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;



  const posts = Array.isArray(data) ? data : [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-[#eff6e0] py-14 px-6">
        <h2 className="text-2xl font-bold text-center mb-6 mt-18 sm:mt-14">My Posts</h2>
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts yet</p>
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
                      src={`http://localhost:8000/static/${post.images[0]}`}
                      alt={post.title}
                      className="w-full h-60 object-cover"
                    />
                    <span
                      className={`absolute top-2 right-2 text-xs px-2 py-1 rounded ${post.status === "approved"
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

                <h3 className="text-xl font-semibold mb-2 text-gray-800 p-3">
                  {post.title}
                </h3>
                <p className="text-gray-600 text-sm p-3 truncate">
                  {post.description}
                </p>
                <p className="text-gray-600 text-sm px-3">
                  Posted by : <span className="font-semibold">{post.author?.name}</span>
                </p>


                <div className="flex justify-between items-center mt-4 p-3">
                  <span className="text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>

                </div>


                <div className="flex justify-between items-center mt-2 p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => openModal(post)}
                      className="text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-md"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 🔹 MODAL */}
        {modalOpen && (
          <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md">
              <h3 className="text-xl font-bold mb-4">Update Post</h3>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
                placeholder="Title"
              />
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full border p-2 mb-3 rounded"
                placeholder="Description"
              />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setSelectedFile(e.target.files[0])}
                className="w-full border p-2 mb-3 rounded"
              />
              {selectedPost.images?.length > 0 && (
                <img
                  src={`http://localhost:8000/static/${selectedPost.images[0]}`}
                  alt="Current"
                  className="w-full h-40 object-cover mb-3"
                />
              )}
              <div className="flex justify-end gap-2">

                <button
                  onClick={() => setModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
