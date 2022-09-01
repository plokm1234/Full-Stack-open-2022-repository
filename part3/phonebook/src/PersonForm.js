const PersonForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
            name: <input name="name"/>
            </div>
            <div>
            number: <input name="number"/>
            </div>
            <div>
            <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm