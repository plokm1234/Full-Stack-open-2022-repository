const error = {
    color: 'red',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
}

const successful = {
    color: 'green',
    background: 'lightgrey',
    fontSize: '20px',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    marginBottom: '10px'
}

const Notification = ({ message, successfulMessage }) => {
    let result = null

    if (message !== null) {
        result = (
            <div style={error}>
                {message}
            </div>
        )
    }else if (successfulMessage !== null) {
        result = (
            <div style={successful}>
                {successfulMessage}
            </div>
        )
    }
    return result
}

export default Notification