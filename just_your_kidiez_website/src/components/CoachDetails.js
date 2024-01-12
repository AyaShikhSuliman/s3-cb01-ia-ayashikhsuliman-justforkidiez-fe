const CoachDetails = ({ coachDetails }) => {
    return (
        <div>
            <p>Coach Details:</p>
            <ul>
                <li>ID: {coachDetails.id}</li>
                <li>Name: {coachDetails.name}</li>
                <li>Last name: {coachDetails.lastName}</li>
                <li>Age: {coachDetails.age}</li>
                <li>Phone number: {coachDetails.phone_number}</li>
                <li>Email address: {coachDetails.email_address}</li>
            </ul>
        </div>
    );
};

export default CoachDetails;