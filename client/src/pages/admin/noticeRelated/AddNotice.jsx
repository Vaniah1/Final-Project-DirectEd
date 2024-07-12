import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addStuff } from '../../../redux/userRelated/userHandle';
import { underControl } from '../../../redux/userRelated/userSlice';
import { CircularProgress } from '@mui/material';
import Popup from '../../../components/Popup';

const AddNotice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, response, error } = useSelector(state => state.user);
  const { currentUser } = useSelector(state => state.user);

  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState('');
  const adminID = currentUser._id;

  const [loader, setLoader] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [message, setMessage] = useState("");

  const fields = { title, details, date, adminID };
  const address = "Notice";

  const submitHandler = (event) => {
    event.preventDefault();
    setLoader(true);
    dispatch(addStuff(fields, address));
  };

  useEffect(() => {
    if (status === 'added') {
      navigate('/Admin/notices');
      dispatch(underControl());
    } else if (status === 'error') {
      setMessage("Network Error");
      setShowPopup(true);
      setLoader(false);
    }
  }, [status, navigate, error, response, dispatch]);

  return (
    <>
      <div className="block p-4 m-8 justify-center items-center bg-gray h-full">
        <form className="registerForm inline-block" onSubmit={submitHandler} aria-label="Add Notice Form">
          <span className="registerTitle">Add Notice</span>
          <label htmlFor="notice-title">Title</label>
          <input id="notice-title" className="registerInput p-2 rounded-lg m-2" type="text" placeholder="Enter notice title..."
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required 
            aria-label="Notice Title"
          />

          <label htmlFor="notice-details">Details</label>
          <input id="notice-details" className="registerInput p-2 rounded-lg m-2" type="text" placeholder="Enter notice details..."
            value={details}
            onChange={(event) => setDetails(event.target.value)}
            required 
            aria-label="Notice Details"
          />

          <label htmlFor="notice-date">Date</label>
          <input id="notice-date" className="registerInput p-2 rounded-lg m-2" type="date" placeholder="Enter notice date..."
            value={date}
            onChange={(event) => setDate(event.target.value)}
            required 
            aria-label="Notice Date"
          />

          <button className="registerButton bg-blue2 rounded-lg hover:text-black text-white w-full p-3 left-0 m-2" type="submit" disabled={loader} aria-label="Add Notice Button">
            {loader ? (
              <CircularProgress size={24} color="inherit" aria-label="Loading" />
            ) : (
              'Add'
            )}
          </button> 
        </form>
      </div>
      <Popup message={message} setShowPopup={setShowPopup} showPopup={showPopup} aria-label="Popup Message" />
    </>
  );
};

export default AddNotice;
