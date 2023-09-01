//input group
// import Styles from './InputGroup.module.css'

function SelectGroup({children, handleChange, name}) {
    return (
        <div className='mb-3 input-group'>
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