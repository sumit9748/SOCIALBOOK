import React, { useContext, useState } from 'react'
import "./tagUser.css"
import axios from "axios";
import { Avatar } from '@mui/material';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Topbar from "../topbar/Topbar"
import { AuthContext } from '../../context/AuthContext';
const TagUser = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const [search, setSearch] = useState("first");
    const [allusers, setAllusers] = useState([])
    const { user: currentUser } = useContext(AuthContext);


    useEffect(() => {
        const getAll = async () => {
            const res = await axios.get("/users/all");
            setAllusers(res.data.filter((r) => r._id !== currentUser._id));
        }; getAll();
    }, [search])

    const handleChange = (e) => {
        e.preventDefault();
        const res = allusers.filter((user) => user.username === search);
        setAllusers(res);
    }


    return (
        <>
            <Topbar />
            <div classNameName='tagUser'>
                <h1>Search Users</h1>
                <form className='searchUserBody' onSubmit={handleChange}>
                    <input className='searchuser' value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button type="submit" >search</button>
                </form>
                <div >
                    {allusers?.map((all) => (
                        <Link to={`/profile/${all._id}`}>  <div className='tagUserEdit'>
                            <Avatar alt={all.username} src={all.profilePicture ? PF + all.profilePicture : PF + "search.png"} />
                            <span>{all.username}</span>

                        </div>
                        </Link>

                    ))}
                </div>

            </div >
        </>
    )
}

export default TagUser;