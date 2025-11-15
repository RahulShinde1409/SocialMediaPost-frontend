// import { useState } from 'react';
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
    const { loading, error } = useSelector((state) => state.posts);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [successMessage, setSuccessMessage] = useState("");

    const navigate = useNavigate();

    // ------------------------------------------
    // CLOUDINARY UPLOAD
    // ------------------------------------------
    const uploadToCloudinary = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "your_preset"); // ← CHANGE THIS
        data.append("cloud_name", "your_cloud_name"); // ← CHANGE THIS

        const res = await fetch(
            "https://api.cloudinary.com/v1_1/your_cloud_name/image/upload",
            { method: "POST", body: data }
        );

        return await res.json();
    };

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
                        initialValues={{ title: '', description: '' }}
                        validationSchema={PostSchema}
                        onSubmit={async (values, { resetForm }) => {

                            let imageUrl = null;

                            // Upload image if selected
                            if (imageFile) {
                                const uploadResult = await uploadToCloudinary(imageFile);
                                imageUrl = uploadResult.secure_url;
                            }

                            // SEND JSON ONLY — NOT FORM DATA
                            const payload = {
                                title: values.title,
                                description: values.description,
                                image: imageUrl,
                            };

                            dispatch(createPost(payload))
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
                                    <Field
                                        name="title"
                                        type="text"
                                        className="block w-full rounded-md border-0 bg-white px-3.5 py-2"
                                        placeholder="Enter your post title"
                                    />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        name="description"
                                        rows={6}
                                        className="block w-full rounded-md border-0 bg-white px-3.5 py-2"
                                        placeholder="Write your post here..."
                                    />
                                    <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold leading-6 text-gray-900">
                                        Feature Image
                                    </label>
                                    <input type="file" accept="image/*" onChange={handleImageChange} />
                                    {imagePreview && (
                                        <img
                                            src={imagePreview}
                                            alt="preview"
                                            className="mt-3 max-h-40 rounded-md object-cover"
                                        />
                                    )}
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white"
                                >
                                    {loading ? "Submitting..." : "Publish Post"}
                                </button>

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
