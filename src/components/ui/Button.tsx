export default function Button({ children, onClick, disabled, className, type }: { children: React.ReactNode, onClick?: () => void, disabled?: boolean, className?: string, type?: "button" | "submit" | "reset" }) {
  return (
    <button onClick={onClick} disabled={disabled} className={`${className} text-white h-[40px] px-2.5 rounded-xl bg-[#1C2620] flex items-center justify-center hover:bg-[#2A3830] transition-colors cursor-pointer`} type={type}>
      {children}
    </button>
  )
}