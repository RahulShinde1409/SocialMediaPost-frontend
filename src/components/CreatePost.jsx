import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../store/action/createpost.action';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Header from './Header';
import { useNavigate } from 'react-router-dom';


const PostSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
});

export default function CreatePost() {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.posts);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files?.[0] || null;
        setImageFile(file);
        if (!file) return setImagePreview(null);
        const reader = new FileReader();
        reader.onload = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
    };

    return (
        <>
            <Header />
            <div className='bg-[#eff6e0]'>
                <div className="px-6 py-12 sm:py-16 lg:px-8 shadow-md rounded-2xl max-w-4xl mx-auto mt-20 sm:mt-14">
                    <div className="mx-auto max-w-2xl text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Create a New Post
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-600">
                            Share your thoughts with the world.
                        </p>
                    </div>

                    <Formik
                        initialValues={{ title: '', description: ''}}
                        validationSchema={PostSchema}
                     onSubmit={(values, { resetForm }) => {
//   const formData = new FormData();
//   formData.append("title", values.title);
//   formData.append("description", values.description);
//   if (imageFile) formData.append("images", imageFile);

//   dispatch(createPost(formData))
const formData = new FormData();
formData.append("title", values.title);
formData.append("description", values.description);

if (imageFile) {
  formData.append("image", imageFile); // FIXED
}

dispatch(updatePost({ id: post_id, formData }));

    .unwrap()
    .then(() => {
      setSuccessMessage("Post published successfully!");
      navigate("/view-post");
    })
    .catch((err) => {
      console.error("Post creation failed:", err);
      setSuccessMessage("Failed to publish post");
    });

  resetForm();
  setImageFile(null);
  setImagePreview(null);
}}

                    >
                        {() => (
                            <Form className="mx-auto mt-14 max-w-xl space-y-6">
                                
                                <div>
                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                        Title
                                    </label>
                                    <div className="mt-2.5">
                                        <Field
                                            name="title"
                                            type="text"
                                            className="block w-full rounded-md border-0 bg-white px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Enter your post title"
                                        />
                                        <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                
                                {/* <div>
                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                        Tags
                                    </label>
                                    <div className="mt-2.5">
                                        <Field
                                            name="tags"
                                            type="text"
                                            className="block w-full rounded-md bg-white border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="react, hooks, redux"
                                        />
                                    </div>
                                </div> */}

                                
                                <div>
                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <div className="mt-2.5">
                                        <Field
                                            as="textarea"
                                            name="description"
                                            rows={6}
                                            className="block w-full rounded-md border-0 bg-white px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                            placeholder="Write your post here..."
                                        />
                                        <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                    </div>
                                </div>

                                
                                <div>
                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                        Feature Image
                                    </label>
                                    <div className="mt-2.5">
                                        <input type="file" accept="image/*" onChange={handleImageChange} />
                                        {imagePreview && (
                                            <div className="mt-3">
                                                <img
                                                    src={imagePreview}
                                                    alt="preview"
                                                    className="max-h-40 rounded-md object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>

                               
                                <div className="mt-10">
                                    {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                    >
                                        {loading ? 'Submitting...' : 'Publish Post'}
                                    </button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                     {successMessage && (
                        <div className="mt-6 text-center text-green-600 font-semibold">
                            {successMessage}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
