import clsx from 'clsx';

const FormInput = ({className, label, type, placeholder, value, onChange, err}) => {



    return (
        <div>
            <label> {label} </label>
            <input
                // className="border-2 m-3 p-2"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={clsx("border-2 m-3 p-2", className)}
            />

            <p className="text-red-600">{err}</p>

        </div>
    );
}

export { FormInput }