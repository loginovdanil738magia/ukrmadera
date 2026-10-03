import Image from "next/image";

type LogoProps = {
    priority?: boolean;
};

export default function Logo({ priority = false }: LogoProps) {
    return (
        <div className="brand-logo">
            <Image
                src="/images/brand/ukrmadera-logov2.png"
                alt="UkrMadera · Arquitectura en madera"
                width={1745}
                height={399}
                priority={priority}
                className="brand-logo-image"
            />
        </div>
    );
}
