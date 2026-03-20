import { db, collection, addDoc } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const venueForm = document.getElementById('addVenueForm');
    const submitBtn = document.getElementById('submitVenueBtn');

    if (venueForm) {
        venueForm.addEventListener('submit', async (e) => {
            e.preventDefault(); // Prevent default page jump

            // Disable button and show loading state
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Saving...';
            submitBtn.disabled = true;

            try {
                // Collect form data
                const venueData = {
                    name: document.getElementById('venueName').value,
                    type: document.getElementById('venueType').value,
                    capacity: Number(document.getElementById('capacity').value),
                    description: document.getElementById('description').value,
                    
                    location: {
                        city: document.getElementById('city').value,
                        area: document.getElementById('area').value,
                        fullAddress: document.getElementById('fullAddress').value,
                        googleMapsLink: document.getElementById('googleMapsLink').value,
                    },
                    
                    pricing: {
                        hourlyRate: Number(document.getElementById('hourlyRate').value),
                        fullDayRate: Number(document.getElementById('fullDayRate').value),
                        cancellationPolicy: document.getElementById('cancellationPolicy').value,
                    },
                    
                    amenities: {
                        ac: document.getElementById('amenityAc').checked,
                        wifi: document.getElementById('amenityWifi').checked,
                        projector: document.getElementById('amenityProjector').checked,
                        soundSystem: document.getElementById('amenitySound').checked,
                    },
                    
                    parkingCapacity: Number(document.getElementById('parkingCapacity').value) || 0,
                    
                    createdAt: new Date().toISOString(),
                    status: 'pending_approval' // Since it says "Submit for Approval"
                };

                console.log("Saving venue data:", venueData);

                // Add to Firestore database
                const docRef = await addDoc(collection(db, "venues"), venueData);
                
                alert(`Venue successfully added! ID: ${docRef.id}\nCheck your Firebase console!`);
                venueForm.reset(); // clear form
                
            } catch (error) {
                console.error("Error adding venue: ", error);
                alert("Failed to save venue. Check console for details: " + error.message);
            } finally {
                // Restore button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }
});
