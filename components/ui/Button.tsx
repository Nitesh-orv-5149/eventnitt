import { IButton } from "@/types/uiTypes";

export default function Button({text, ...props} : IButton) {
    return (
        <button 
            className={``}
            {...props}
        >
            {text}
        </button>
    );
}