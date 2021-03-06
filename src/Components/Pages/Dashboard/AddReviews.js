import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const AddReview = () => {
    const { register, formState: { errors }, handleSubmit, reset } = useForm();

    const imageStorageKey = '4b59068e70b6c045448e7caa48248aec';
    
    const onSubmit = async data => {
        const image = data.image[0];
        const formData = new FormData();
        formData.append('image', image);
        


        const url = `https://api.imgbb.com/1/upload?key=${imageStorageKey}`;
        fetch(url, {
            method: 'POST',
            body: formData,
        })
        .then(res => res.json())
        .then(result => {
            if (result.success) {
                const docImg = result.data.url;
                const review = {
                    name: data.name,
                    email: data.email,
                    specialty: data.specialty,
                    img: docImg
                }

                // send to server
                fetch('http://localhost:5000/comments', {
                    method: "POST",
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify(review)
                })
                .then(res => res.json())
                .then(inserted => {
                    if (inserted.insertedId) {
                        toast.success('Comment added successfully')
                        reset();
                    }
                    else {
                        toast.error('Failed to add Comment')
                    }
                })
            }
        })
    };
    return (
        <div className='pl-5 h-screen my-5'>
            <h2 className='text-5xl text-primary font-semibold'>Add A Review</h2>
            <form className='grid grid-cols-1 gap-2' onSubmit={handleSubmit(onSubmit)}>
                    {/* name */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-2xl font-bold">Name</span>
                        </label>
                        <input type="text" className="input input-bordered text-base w-full max-w-xs"
                            {...register("name", { 
                                required: {
                                    value: true,
                                    message: "Name is require"
                                  }
                             })} />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text text-2xl-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>

                    {/* email */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-2xl font-bold">Email</span>
                        </label>
                        <input type="email" className="input input-bordered text-base w-full max-w-xs"
                            {...register("email", { 
                                required: {
                                    value: true,
                                    message: "Email is require"
                                  },
                                pattern: {
                                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                    message: 'Provide a valid email'
                                }
                             })} />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text text-2xl-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text text-2xl-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>
                
                    {/* comment */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-2xl font-bold">Comment</span>
                        </label>
                        <input type="text" className="input input-bordered text-base w-full max-w-xs"
                            {...register("comment", { 
                                required: {
                                    value: true,
                                    message: "Comment is require"
                                  },
                             })} />
                        <label className="label">
                            {errors.email?.type === 'required' && <span className="label-text text-2xl-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    {/* photo */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text text-2xl font-bold">Photo</span>
                        </label>
                        <input type="file" className="input input-bordered text-base w-full max-w-xs"
                            {...register("image", { 
                                required: {
                                    value: true,
                                    message: "image is require"
                                }
                            })} />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text text-2xl-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>
                    <input className='btn w-full max-w-xs' type="submit" value="ADD REVIEW" />
                </form>
        </div>
    );
};

export default AddReview;