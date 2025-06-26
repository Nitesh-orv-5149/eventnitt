import Image from "next/image";

interface IAvatarCircle {
    name: string;
    avatar: string;
    postsCount?: number;
    isVerified?: boolean;
}

export default function AvatarCircle({
    name,
    avatar,
    postsCount,
    isVerified = false
}: IAvatarCircle) {
    return (
        <div className="flex flex-col items-center space-y-2 group cursor-pointer">
            {/* Avatar Container */}
            <div className="relative">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-secondary-2 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                    <Image 
                        src={avatar} 
                        alt={name}
                        width={80}
                        height={80}
                        className="object-cover w-full h-full"
                    />
                </div>
                
            </div>

            {/* Name and Post Count */}
            <div className="text-center">
                <h4 className="text-sm font-semibold transition-colors duration-200 truncate max-w-20">
                    {name}
                </h4>
                {postsCount !== undefined && (
                    <p className="text-xs mt-1">
                        {postsCount} posts
                    </p>
                )}
            </div>
        </div>
    );
}