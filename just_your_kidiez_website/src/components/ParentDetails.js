const ParentDetails = ({ parentDetails }) => {
    return (
        <div>
            <p>Parent Details:</p>
            <ul>
                <li>ID: {parentDetails.id}</li>
                <li>Name: {parentDetails.name}</li>
                <li>Last name: {parentDetails.lastName}</li>
                <li>Age: {parentDetails.age}</li>
                <li>Phone number: {parentDetails.phone_number}</li>
                <li>Email address: {parentDetails.email_address}</li>
                <li>Country: {parentDetails.country}</li>
            </ul>
        </div>
    );
};

export default ParentDetails;