import "./updateUser.css";
import AddImage from "@mui/icons-material/AddAPhoto";
import Cancel from "@mui/icons-material/Cancel";
import { useContext, useState } from "react";
import { useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

//import { useFormControl } from "../../../../../expense-manager/client/node_modules/@mui/material";

export const UpdateUser = ({ userc }) => {
  // console.log(userc.username);
  const { user } = useContext(AuthContext);
  const username = useRef();
  const city = useRef();
  const desc = useRef();
  const password = useRef();
  const relation = useRef();
  const { dispatch } = useContext(AuthContext);

  let relationship;

  if (userc.relationship === 1) {
    relationship = "single";
  } else if (userc.relationship === 2) {
    relationship = "married";
  } else {
    relationship = "others";
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username: username.current.value
        ? username.current.value
        : userc.username,
      city: city.current.value ? city.current.value : userc.city,
      desc: desc.current.value ? desc.current.value : userc.desc,
      relation: relation.current.value
        ? relation.current.value
        : userc.relationship,
      userId: userc._id,
    };
    if (file) {
      const data = new FormData();
      const FileName = Date.now() + file.name;
      data.append("name", FileName);
      data.append("file", file);
      updatedUser.profilePicture = FileName;
      try {
        await axios.post("/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios.put("/users/" + user._id, updatedUser);
      //updateUserInfo = { updateUserInfo };
      try {
        const res = await axios.get(`/users?userId=${userc._id}`);
        dispatch({ type: "UPDATE_USER", payload: res.data });
      } catch (err) { }
      window.location.reload();
    } catch (err) { }
  };
  // useEffect(() => {
  //   const updateUserInfo = async () => {
  //     const res = await axios.get("/users/" + userc.username);
  //     dispatch({ type: "UPDATE_USER", payload: res.data });
  //   };
  //   updateUserInfo();
  // }, []);
  return (
    <div className="updateUser">
      <div className="updateUserWrapper">
        <div className="updateUserTop">
          <div className="updateUserTopLeft">
            <h1 className="userDetailsText">User Details</h1>
            <div className="updateUserItem">
              <label className="updateUserKey">Username:-</label>
              <span className="updateUserValue">{userc.username}</span>
            </div>
            <div className="updateUserItem">
              <label className="updateUserKey">From:-</label>
              <span className="updateUserValue">{userc.city}</span>
            </div>
            <div className="updateUserItem">
              <label className="updateUserKey">Desc:-</label>
              <span className="updateUserValue">{userc.desc}</span>
            </div>
            <div className="updateUserItem">
              <label className="updateUserKey">RelationShip Stats:-</label>
              <span className="updateUserValue">{relationship}</span>
            </div>
          </div>
          <div className="updateUserTopRight">
            <img
              src={
                userc.profilePicture
                  ? PF + userc.profilePicture
                  : PF + "noprofile.jpg"
              }
              alt=""
              className="imgContainer"
            />
          </div>
        </div>
        <hr className="updateHr" />
        <form className="updateUserBottom" onSubmit={submitHandler}>
          <div className="updateUserBottomLeft">
            <input
              type="text"
              placeholder="change username.."
              className="inputChange"
              ref={username}
            />
            <input
              type="text"
              placeholder="change desc.."
              className="inputChange"
              ref={desc}
            />
            <input
              type="text"
              placeholder="change Address.."
              className="inputChange"
              ref={city}
            />
            <input
              type="password"
              placeholder="change Password.."
              className="inputChange"
              ref={password}
            />
            <div className="radioContainer" id="relation" ref={relation}>
              <label className="input Label">
                <input
                  type="radio"
                  id="1"
                  name="inputRadio"
                  value="1"
                  className="inputRadio"
                />
                Single
              </label>
              <label className="input Label">
                <input
                  type="radio"
                  id="2"
                  value="2"
                  name="inputRadio"
                  className="inputRadio"
                />
                Married
              </label>
              <label className="input Label">
                <input
                  type="radio"
                  id="3"
                  value="3"
                  name="inputRadio"
                  className="inputRadio"
                />
                Complex
              </label>
            </div>
            <button className="updateButton" type="submit">
              Update
            </button>
          </div>

          <label htmlFor="file" className="updateUserBottomRight">
            {file && (
              <div className="fileImgContainer">
                <img
                  className="shareImg"
                  src={URL.createObjectURL(file)}
                  alt=""
                />
                <Cancel
                  className="shareCancelImg"
                  onClick={() => setFile(null)}
                />
              </div>
            )}
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <AddImage className="registerIconAdd" />
          </label>
        </form>
      </div>
    </div>
  );
};
