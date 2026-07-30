import axios from 'axios';
import './CreateEvent.css'
import { useState } from 'react';

function CreateEvent() {
 
    const [uploading, setUploading] = useState(false);

    async   function handleSubmit(e){
        e.preventDefault();
        setUploading(true);
        const formData = new FormData(e.target);

        const response = await axios.post('api/events',formData);
        console.log(response.data.message);
        setUploading(false);
    }
 
  return (
        <form onSubmit={handleSubmit} className='create-event'>
            <input type="text" required  name="title" placeholder='title' />
            <input type="text" required  name="discription" placeholder='discription' />
            <input type="text" required  name="venue" placeholder='venue' />
            <input type="date" required  name="startDate" placeholder='startDate' />
            <input type="date" required  name="endDate" placeholder='endDate' />
            <input type="text" required  name="status" placeholder='status' />
            <input type="text" required  name="filename" placeholder='filename' />
            <input type="file" required  name="banner" accept='image' />
            <button type='submit' className={uploading ? 'uploadingSubmit' : ''}>Submit</button>
        </form>
  );
}

export default CreateEvent;