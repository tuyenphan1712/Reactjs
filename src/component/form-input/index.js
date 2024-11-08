import clsx from 'clsx';

const FormInput = ({className, label, type, placeholder, value, onChange, err, register}) => {



    return (
        <div className="flex items-center justify-start mb-4">
            <label className="w-40 text-right mr-4"> {label} </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                {...register}
                className={clsx("flex-1 p-2 border border-gray-300 rounded-md", className)}
            />
            {err && <p className="ml-4 text-red-600">{err}</p>}
        </div>
    );
}

export {FormInput}