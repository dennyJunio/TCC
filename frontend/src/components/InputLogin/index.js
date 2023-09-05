function InputLogin({label, placeholder, type, name, handleChange, value }) {
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
            />
        </div>
    )
}

export default InputLogin