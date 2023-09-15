function SelectGroup({label, children, handleChange, name}) {
    return (
        <div className='mb-3 input-group'>
            <label className='input-group-text'>{label}</label>
            <select
                onChange={handleChange}
                name={name}
            >
                {children}
            </select> 
        </div>
    )
}

export default SelectGroup