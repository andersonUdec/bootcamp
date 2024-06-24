import Image from "next/image";
export default function HeaderComponent() {
    return (
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
            <h1 className="text-4xl">ProductWeb Bootcamp Full Stack Intermedio</h1>
            <Image 
                src="/Assets/Img/FooterImg/imageFooter.png" 
                alt="ProductWeb image header" 
                width={70} 
                height={70} 
                priority 
            />
        </header>
    );
}
