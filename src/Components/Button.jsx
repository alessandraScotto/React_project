export default function Button({ label, onClick, type }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="btn-grad font-main inline-flex justify-center rounded-md px-3 py-1 text-center text-white shadow-[0px_3px_50px_1px_#f7fafc] dark:shadow-[0_10px_50px_rgba(8,_112,_184,_0.7)]"
      // className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-r from-[#4776E6] to-[#8E54E9] p-0.5 text-sm font-medium text-gray-900 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-cyan-200 dark:text-white dark:focus:ring-cyan-800"
    >
      {/* <span className="relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900"> */}
      {label}
      {/* </span> */}
    </button>
  );
}
