import { getInitials } from "@/utils/hosterAvatar";
import Image from "next/image";

interface IAvatarCircle {
    name: string;
}

export default function AvatarCircle({
    name,
}: IAvatarCircle) {

    const initials = getInitials(name)

    return (
        <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            {/* Avatar Container */}
            <div className="relative">
                <div className="flex justify-center items-center bg-primary-2 w-20 h-20 rounded-full overflow-hidden border-2 border-secondary-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    {initials}
                </div>
                
            </div>

            {/* Name and Post Count */}
            <div className="text-center">
                <h4 className="text-sm font-semibold transition-colors duration-200 truncate max-w-20">
                    {name}
                </h4>
            </div>
        </div>
    );
}