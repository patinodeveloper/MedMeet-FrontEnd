export const RowDoctorView = ({ id, firstName, lastName, email, specialty }) => {

    return (
        <>
            <tr>
                <td>{id}</td>
                <td>{firstName}</td>
                <td>{lastName}</td>
                <td>{email}</td>
                <td>{specialty.name}</td>
            </tr>
        </>
    )
}