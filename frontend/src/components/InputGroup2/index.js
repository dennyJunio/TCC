function InputGroup2({placeholder, type, name, handleChange, value, style }) {
    return (
        <div className='mb-3 input-group'>
            <input
                type={type}
                placeholder={placeholder}
                className='form-control'
                name={name}
                // toda vez que for lidar com eventos utilizar handle
                onChange={handleChange}
                value={value}
                style={style}
            />
        </div>
    )
}

export default InputGroup2