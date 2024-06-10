import axios from 'axios';
import React, { useContext, useEffect, useState, useCallback } from 'react';
import MasonryGrid from '../MasonryGrid.jsx';
import { UserContext } from '../UserContext.jsx';
import { Navigate } from 'react-router-dom';

const IndexPage = () => {
  const { user, ready } = useContext(UserContext);

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [note, setNote] = useState('');
  const [redirect, setRedirect] = useState(false);

  const fetchData = useCallback(async () => {
    const source = axios.CancelToken.source();
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/', { cancelToken: source.token });
      setItems(response.data);
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled:', error.message);
      } else {
        setError('Error fetching data. Please try again later.');
        console.error('Error fetching data:', error);
      }
    } finally {
      setLoading(false);
    }
    return () => {
      source.cancel('Operation canceled by the user.');
    };
  }, []);

  useEffect(() => {
    if (ready) {
      fetchData();
    }
  }, [ready, fetchData]);

  const handleNote = async (ev) => {
    ev.preventDefault();
    if (!note.trim()) {
      setError('Note cannot be empty.');
      return;
    }
    setError(null);

    if (!user) {
      setError('User is not authenticated.');
      setTimeout(() => {
        setRedirect(true);
      }, 3000);
      return;
    }
    try {
      console.log('Sending note:', note); // Debug log
      await axios.post('/note', {
        owner: user._id,
        note,
      });
      setNote('');
      fetchData();
    } catch (error) {
      setError('Error sending note. Please try again later.');
      console.error('Error sending note:', error);
    }
  }

  if (redirect) {
    return <Navigate to="/login" />;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div className="mt-8 2xl:w-8/12 mx-auto">
        <h3 className="text-center w-full font-semibold border-b border-black">Global Notes</h3>
        <div className="grid grid-cols-1 2xl:w-7/12 mx-auto sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 auto-rows-auto">
          {items?.length > 0 ? (
            items.map((item, index) => (
              <MasonryGrid key={index} item={item.note} name={item.owner?.name || 'unkwown'} />
            ))
          ) : (
            <p>No items available.</p> // Fallback if items array is empty
          )}
        </div>
        <form className="2xl:w-11/12 mx-auto" onSubmit={handleNote}>
          <div className="flex flex-col mt-4">
            <label>Add a new Note</label>
            <textarea
              name="note"
              className='border border-black rounded-xl px-2 py-1'
              rows={3}
              value={note}
              onChange={ev => setNote(ev.target.value)} />
            <button
              type='submit'
              className='self-end p-2 font-bold bg-black mt-2 rounded-xl text-white '>Submit</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default IndexPage;
