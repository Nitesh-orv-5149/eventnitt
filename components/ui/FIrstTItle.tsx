export default function FirstTitle({title, color} : {title:string, color:string}) {
    return (
        <h3 className={`${color} text-5xl uppercase font-extrabold`}>{title}</h3>
    );
}