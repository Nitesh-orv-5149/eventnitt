export default function ThirdTitle({title, color} : {title:string, color:string}) {
    return (
        <h3 className={`${color} text-2xl capitalize font-bold`}>{title}</h3>
    );
}