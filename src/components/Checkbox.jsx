export default function Checkbox({ id, name, register, onClick }) {
  return (
    <>
      <input
        type="checkbox"
        className="peer size-4 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-btn-primary checked:border-btn-primary"
        id={id}
        name={name}
        {...register}
        onClick={onClick}
      />
      <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-[8px] transform -translate-x-1/2 -translate-y-1/2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="1"
        >
          <path
            fillRule="evenodd"
            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </span>
    </>
  );
}
