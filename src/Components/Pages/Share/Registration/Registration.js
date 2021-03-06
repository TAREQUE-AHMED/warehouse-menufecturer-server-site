import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
// import useToken from '../../CustomHooks/UserToken';
import Loading from '../Loading/Loading';

const Registration = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);
    
    const [updateProfile, updating, updatedError] = useUpdateProfile(auth);
    
    const { register, formState: { errors }, handleSubmit } = useForm();
    
    const onSubmit = async (data) => {
        const user = {
            userName: data.name,
            userEmail: data.email
        }
        fetch('http://localhost:5000/users', {
            method: "POST",
            headers: {
                'content-type' : 'application/json'
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json()) 
            .then(data => {
            console.log(data);
        })
        
        console.log(data);
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name ,});
        toast.success('Profile Updated');
    }

    // const [token] = useToken(user);

    if (loading || updating) {
        return <Loading></Loading>
    };

    if (user) {
        navigate('/home');
    }

    let signInError;
    if (error || updatedError) {
        signInError = <p className='text-red-500 mb-2'><small>{error?.message}</small></p>
    }
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto md:mt-32">
            <div className="card-body">
                <h2 className="text-center text-2xl font-bold">Sign up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* name */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Name</span>
                        </label>
                        <input type="text" className="input input-bordered w-full max-w-xs"
                            {...register("name", { 
                                required: {
                                    value: true,
                                    message: "Name is require"
                                  }
                             })} />
                        <label className="label">
                            {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                        </label>
                    </div>
                    
                    {/* email */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Email</span>
                        </label>
                        <input type="email" className="input input-bordered w-full max-w-xs"
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
                            {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                        </label>
                    </div>

                    {/* password */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Password</span>
                        </label>
                        <input type="password" className="input input-bordered w-full max-w-xs"
                            {...register("password", { 
                                required: {
                                    value: true,
                                    message: "Password is require"
                                  },
                                minLength: {
                                    value: 6,
                                    message: 'Must be use 6 characters password'
                                }
                             })} />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                    </div>

                    {/* phone */}
                    <div className="form-control w-full max-w-xs">
                        <label className="label">
                            <span className="label-text font-bold">Phone</span>
                        </label>
                        <input type="tel" className="input input-bordered w-full max-w-xs"
                            {...register("phoneNumber", { 
                                required: {
                                    value: true,
                                    message: "Phone is require"
                                  }
                             })} />
                        <label className="label">
                            {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                        </label>
                    </div>
                    {signInError}
                    <input className='btn w-full max-w-xs' type="submit" value="Login"/>
                    <p>You have already an account <Link to={'/login'}><small className='text-primary'>Login</small></Link></p>
                </form>
            </div>    
        </div>
    )
};

export default Registration;