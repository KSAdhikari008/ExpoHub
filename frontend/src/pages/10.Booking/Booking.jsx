import axios from "axios";
import './Booking.css'


function Booking({setIsBooked, setOverlay, booth}) {

  async function unbook(){
    try{
      await axios.patch(`/api/booths/removeBooking/${booth._id}`);
      setIsBooked?.(false);
      setOverlay?.(false);
    }catch(err){
      console.log(err);
    }
  }
 
  return (
    <div className="overlay">
      <div className="booking-container" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <button className="booking-close" onClick={()=>{setOverlay(false)}} aria-label="Close booking details">&times;</button>
        <div className="booking-heading">
          <span className="booking-eyebrow">EXHIBITOR BOOKING</span>
          <h1 id="booking-title">Booth reserved</h1>
          <p>Your exhibition space is ready for the event.</p>
        </div>

        <div className="booking-details">
          <div className="booking-icon" aria-hidden="true">B</div>
          <div className="booking-copy">
            <h2>{booth?.boothName || 'Booth booking'}</h2>
            <p>{booth?.description || 'Your selected booth has been reserved.'}</p>
          </div>
          <div className="booking-meta">
            <div><span>Booth number</span><strong>{booth?.boothNumber || '—'}</strong></div>
            <div><span>Size</span><strong>{booth?.size || '—'}</strong></div>
            <div><span>Status</span><strong className="booking-status">{booth?.status || 'Booked'}</strong></div>
          </div>
        </div>

        <div className="booking-actions">
          <button className="booking-secondary" onClick={()=>{setOverlay(false)}}>Close</button>
          <button className="booking-danger" onClick={unbook} disabled={!booth}>Release booth</button>
        </div>
      </div>
    </div>
  );
}

export default Booking;