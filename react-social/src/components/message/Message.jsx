import "./message.css";
import { format } from "timeago.js";
import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { AuthContext } from "../../context/AuthContext";

export default function Message({ message, own, friend }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friendst, setFriendst] = useState([])
  const { user } = useContext(AuthContext)


  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/users?userId=${friend && friend}`)
      setFriendst(res.data)
    }; getUser();
  }, [])

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src={own ? PF + user.profilePicture : PF + friendst.profilePicture}
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}