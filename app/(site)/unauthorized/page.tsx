import FirstTitle from "@/components/ui/FIrstTitle";
import Link from "next/link";

export default function unAuthorizedPage() {
    return (
        <div className="h-screen flex flex-col justify-center items-center gap-8">
            <FirstTitle title="you are unauthorized to this page" color="text-light"/>
            <Link className="underline" href={'/'}>go to home page </Link>
        </div>
    );
}